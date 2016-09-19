
> 原文地址：[《温故而知新-AngularJS 1.x》](http://www.devtalking.com/articles/angularjs1x-guide/)
# AngularJS是什么
我们知道HTML是一种创建网页的静态标记语言，它很基础，但不失灵活，然而它自身并不提供对灵活性的具体实现，所以我们要创建具有可用性及赏心悦目的Web应用就需要使用其他语言与之结合去操控它的DOM、标签、标签属性、标签层级结构实现样式变换、动态数据变换、动态元素变换等，比如结合CSS和JavaScript语言。

但是越多的结合就意味着功能实现越复杂，我们需要写大量的代码去实现类似数据绑定、动态展现、远程服务请求等功能，所以jQuery这类的JS库、ember这类的框架应用而生。前者让我们在完成某些单一功能时调用它封装好的方法，从而减少代码量。后者让我们可以遵循它的规范去填充它设计好的代码结构，从而逐步完成完整的应用功能。

而AngularJS是JS库和框架的结合，它诞生于2009年，由Misko Hevery 等人创建，后为Google所收购并发扬光大。AngularJS通过为开发者呈现一个更高层次的抽象来简化应用的开发，提供了构建一个CRUD应用可能用到的全部内容包括：自定义HTML标签、事件绑定、数据绑定、基本模板标识符、表单验证、路由、深度链接、组件重用、依赖注入等。

> 文章中的所有示例均可在[这里][1]下载。

# AngularJS的特性
AngularJS有着诸多的特性，但最为核心的是其Scope概念、MVC模式、路由、模块化、依赖注入、指令系统、双向数据绑定、Service、Provider等。

## 模块化
我们先从AngularJS的模块化特性说起。什么是模块？既应用程序中不同功能的容器。在AngularJS中，我们可以按业务功能的不同将实现划分为不同的模块，这些模块可以在一个JS文件中，也可以将它们放在不同的JS文件中，既一个JS文件为一个模块。

### 模块化的优势
使用模块化在我们的编程阶段有着诸多的好处：
- 可以使我们的代码结构非常清晰，有较好的可读性。
- 可以使我们复用代码。
- 在前端编程中，我们都知道JS的引用顺序是很重要的，但使用AngularJS的模块时我们不需要关系每个模块之间的顺序。
- 可以很好的实现单元测试。

### 定义模块
定义一个模块很简单，在JS文件中申明一个模块：

```swift
var mianModule = angular.module("mianModule", []);
```

使用AngularJS的`module`方法申明一个模块，该方法有两个参数：
- 第一个参数为模块名称。
- 第二个参数为一个数组，该参数的含义为当前定义的模块所依赖的模块，如果有依赖模块则传入包含模块名称的数组，若无依赖则传入空数组。

### 使用模块
在了解如何使用定义好的模块之前，需要先清楚在AngularJS中，模块与模块之间可以是相互独立，老死不相往来的关系，也可以是依赖关系，并且可以是嵌套依赖关系：

```swift
// modules.js
// 互相独立的模块
var mainModule = angular.module("mainModule", []);
var anotherModule = angular.module("anotherModule", []);
```

```swift
// modules.js
// 有依赖关系的模块
var mainModule = angular.module("mainModule", ["secondModule"]);
var secondModule = angular.module("secondModule", ["thirdModule"]);
var thirdModule = angular.module("thirdModule", []);
```

在AngularJS中使用定义好的模块也有两种方式，对应两种不同的应用场景。

#### ngApp方式
这种方式是AngularJS团队比较推荐的使用方法，只需要在HTML标签中使用AngularJS的`ng-app`指令指定要使用的模块既可，一般指定的是应用的主模块，或者说是应用入口模块：

```html
<!-- index.html -->
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Demo for Module</title>
    <script src="../angular-1.5.8.js"></script>
    <script src="modules.js"></script>
  </head>
  <body ng-app="mainModule">

  </body>
</html>
```

`ng-app`指令的含义类似Java中的`main`方法，是当前页面中应用的唯一主入口，所以**一个页面中只能使用一次`np-app`指令**。将`ng-app`指令定义在哪个HTML的标签中就表示该标签及它的所有子标签就会被AngularJS接管，这一部分HTML代码将可以使用AngularJS所有的功能和特性，也就是使用AngularJS开发的Web应用的主入口。通常情况下都会在`body`标签中使用`ng-app`指令。

因为使用这种方式只能指定一个应用入口模块，所以为了能使用多模块的特性，就需要抽象出一个主模块，然后将其他所有模块加入主模块的依赖关系中，这里要注意的是因为AngularJS中的模块依赖可以向下穿透，类似类的继承，所以加入主模块依赖关系中的模块并不是所有的模块，而只是处于依赖层级顶层的模块。
![主模块依赖关系][image-1]
如上图所示，在主模块中只需要添加`DataHandleModule`和`NetworkModule`两个模块既可。但是这种方式的弊端是在HTML页面中并不能直观的表现出页面的哪些部分使用了何种模块，而且本身提供了模块化的特性，但最终又要抽象到一个模块中去使用，始终有点不是很舒服。

#### 手动加载方式
虽然使用`ng-app`的形式可以满足需求，但是还要考虑想抽象出主模块，然后依赖一大堆模块，如果更希望可以在HTML标签中指定使用的模块，此时就需要手动的加载模块了:

```swift
// modules.js
// 互相独立的模块
var mainModule = angular.module("mainModule", []);
var anotherModule = angular.module("anotherModule", []);

angular.element(document).ready(function() {
  var myDiv1 = document.getElementById("myDiv1");
  angular.bootstrap(myDiv1, ["mainModule"]);

  var myDiv2 = document.getElementById("myDiv2");
  angular.bootstrap(myDiv2, ["anotherModule"]);
});
```

```html
<!-- index.html -->
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Demo for Module</title>
    <script src="../angular-1.5.8.js"></script>
    <script src="modules.js"></script>
  </head>
  <body>
    <div id="myDiv1">
    </div>
    
    <div id="myDiv2">
    </div>
  </body>
</html>
```

通过上述代码可以看到，我们可以使用AngularJS的`bootstrap`方法给HTML元素指定模块。这样感觉和模块化特性更加切合，模块的隔离性也比较好，但是这种方式依然有显著的弊端。首先从HTML页面中依然不能直观的看到模块在页面中使用和分布情况，再次这种方式将视图层的HTML代码与JS代码耦合在了一起，也有点违背了AngularJS的MVC设计模式，也许这也是AngularJS不推荐该方式的原因之一吧。

### 模块的生命周期
在AngularJS中，模块有两个主要的生命周期方法，那就是`.config()`和`.run()`：

```swift
var mainModule = angular.module('mainModule', []);
mainModule.config(function(injectables) {

});

mainModule.run(function(injectables) { 

});
```

`.config()`方法的作用是在模块运行加载之前对模块进行配置，比如创建各种服务、创建自定义指令、注册过滤器等。`.run()`方法相当于AngularJS应用的`main`方法，在该方法里进行的配置都是运行时态的，比如对已经创建好的服务实例在应用运行期进行修改。

> `.config()`方法在后文还会涉及，服务、指令、过滤器也会在后文有详细的讲解。

## MVC
MVC是软件工程中的一种设计模式，既把应用系统分为模型（Model）、视图（View）和控制器（Controller）三个基本部分，并且模型层与视图层之间是相互隔离的。简单的描述每个部分的职能：
- 模型层：管理数据模型。
- 视图层：控制UI的展现更新等。
- 控制层：负责具体业务逻辑处理、请求处理转发等，是模型层和视图之间的桥梁。

AngularJS是为数不多实现了MVC设计模式的前端框架，为前端应用在开发时期的功能职责切分、代码复用及后期的维护提供了极大的便利。

### Controller
在AngularJS中，模块是万源之本，所以AngularJS中的所有东西都是通过模块创建的，Controller也不例外。我们可以使用模块对象的`.controller()`方法创建控制器：

```swift
var mainModule = angular.module("mainModule", []);

mainModule.controller("GreetingController", ["$scope", function($scope) {
  $scope.greeting = "Hello!";
}]);
```

从上面的示例代码可以看到，`.controller()`方法有两个参数：
- 第一个参数类型为字符串，为Controller的名称。
- 第二个参数类型为数组，该数组用于注入当前Controller要用到的服务及实现业务逻辑的函数，这里要注意的是实现逻辑的函数始终是作为数组的最后一个元素，并且要将前面注入的服务作为该函数的参数传入。

这里先简单描述一下`$scope`，在AngularJS中有一个重要的概念是服务，而`$scope`就是一个AngularJS内置的服务，在后面的章节中会详细讲解服务。那么`$scope`服务从字面理解是作用域的意思，其实也差不太多，如果用OO的思想将AngularJS的Controller看作是一个类，那么`$scope`服务就代表了这个类的作用域，那么就可以通过`$scope`服务给这个类添加属性或者方法，上面的代码示例中通过`$scope`服务给`GreetingController`控制器添加了字符串属性`greeting`及对象属性`person`。

所以上面代码的含义是，首先创建了名为`mainModule`的模块，然后在`mainModule`模块中创建了名为`GreetingController`的控制器，并使用`$scope`服务给该控制器添加了名为`greeting`和`person`的属性。

创建好Controller后，来看看如何使用它：

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Demo for Controller</title>
    <script src="../angular-1.5.8.js"></script>
    <script src="modules.js"></script>
  </head>
  <body ng-app="mainModule">
    <div ng-controller="GreetingController">
      {{ greeting }} {{ person.name }} !
    </div>
  </body>
</html>
```

前文中介绍过在HTML页面中，通过使用`ng-app`指令给标签绑定模块。同理，我们可以使用`ng-controller`指令给标签及它的子标签绑定Controller，绑定了Controller的标签及它的子标签都可以使用Controller中的属性或者方法。我们可以使用`{{}}`语法访问Controller的属性或调用方法。运行效果很简单，就是将这两个属性的值输出到页面。

我们再来看看如何在Controller中添加方法：

```swift
var mainModule = angular.module("mainModule", []);

mainModule.controller("GreetingController", ["$scope", function($scope) {
  $scope.personName = "Everyone";

  $scope.welcomeJason = function() {
    $scope.personName = "Jason";
  };

  $scope.welcomeGreen = function() {
    $scope.personName = "Green";
  };
}]);
```

在上面的代码中，我们给`GreetingController`添加了`personName`属性和`welcomeJason()`、`welcomeGreen()`两个方法，并在这两个方法中分别对`personName`属性的值进行修改。再来看看HTML的代码：

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Demo for Controller</title>
    <script src="../angular-1.5.8.js"></script>
    <script src="modules.js"></script>
  </head>
  <body ng-app="mainModule">
    <div ng-controller="GreetingController">
      <button ng-click="welcomeJason()">Jason</button>
      <button ng-click="welcomeGreen()">Green</button>
      <p>
        Welcome {{ personName }} !
      </p>
    </div>
  </body>
</html>
```

在HTML代码中，添加了两个按钮，此时我们又看到了一个新的AngularJS指令`ng-click`，这个指令很好理解，就是给按钮绑定点击事件，当点击按钮时调用`GreetingController`中对应的方法，然后在`p`标签中显示`personName`属性。所以Controller中的方法不仅可以通过`{{}}`语法调用，也可以通过`ng-click`指令调用。我们来看看运行的效果：
![Demo for Controller][image-2]

### Model
Model指的是数据模型，在AngularJS中使用`$scope`服务给Controller添加的属性就是数据模型:

```swift
var mainModule = angular.module("mainModule", []);

mainModule.controller("GreetingController", ["$scope", function($scope) {
  $scope.person = {
    name: "Jason",
    job: "Developer"
  };
}]);
```

上述代码示例中的`person`属性就是数据模型，下面看看如何使用：

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Demo for Model</title>
    <script src="../angular-1.5.8.js"></script>
    <script src="modules.js"></script>
  </head>
  <body ng-app="mainModule">
    <div ng-controller="GreetingController">
      <input ng-model="person.name">
      <input ng-model="person.job">
      <p>
        Welcome {{ person.name }}, He is a {{ person.job }}!
      </p>
    </div>
  </body>
</html>
```

在上述HTML代码示例中，我们又看到了新的指令`ng-model`，顾名思义，该指令就是用来将数据模型与HTML标签元素进行绑定的。上面的代码中分别将两个输入框与`person`对象的`name`和`job`属性进行了绑定，然后在`p`标签中输出，我们来看看运行效果：
![Demo for Model][image-3]

不难看出，当我们将`person`对象的属性与输入框绑定后，`person`对象属性的默认值就会显示在输入框里了，当我们修改输入框里的内容时会自动将数据通过Controller同步到`person`对象的相应属性上，所以`p`标签中的内容会实时跟着输入框的内容进行变化。

### View
View层自然就是HTML中的DOM元素了，通过AngularJS提供的各个指令将DOM元素与Controller和Model进行绑定。由Controller负责将数据模型的内容通过`{{}}`语法或`ng-model`指令展现在DOM元素上，而当DOM元素中的值发生变化时会由Controller捕获到，并更新对应的数据模型。

## 数据双向绑定
在MVC一节中，通过几个示例介绍了如何创建和使用Controller、Model，如何与View层交互，其实也引出了AngularJS的一个重要特性。在Controller小节的例子中，通过点击按钮由Controller更改数据模型并将其展示在页面中，这是通过数据模型的变化从而影响视图层的显示。在Model小节的例子中，通过修改输入框中的值，由Controller捕获并更新对应的数据模型，这是通过视图层的变化从而影响数据模型的值。这就是AngularJS的数据双向绑定特性。

## 服务（Services）
AngularJS中一个重要的概念是服务，这个服务的概念比较宽泛，比如一个常量值也算做一个服务，既提供一个不可变值的服务。变量、对象、函数都算做是服务。在AngularJS中内置了好几十个服务，这些内置的服务都以**$**符号开头，比如`$scope`、`$http`、`$log`、`$timeout`、`$interval`等等，从字面意思都不难理解它们的作用，更多的内置服务可以去AngularJS官网查看[API文档][2]。

### 服务特征
AngularJS中的服务有两个主要特点：
- 延迟加载，当应用中的其他组建使用服务时才会实例化。
- 单例，在应用的整个生命周期中，一个服务只存在一份实例，所以服务一般用来共享可复用的代码逻辑或者数据。

### 自定义服务
除了内置的服务，我们还可以创建自己的服务，在AngularJS中我们可以通过`$provide`这个内置的服务来创建我们的自定义服务，`$provide`服务提供了五个方法供我们创建不同应用场景的自定义服务，这五个方法分别是`provider(name, provider)`、`factory(name, $getFn)`、`service(name, constructor)`、`value(name, value)`、`constant(name, value)`。

#### Value
我们先从`value(name, value)`这个方法看起，该方法有两个参数：
- 第一个参数为服务的名称，类型为字符串。
- 第二个参数可以是字符串、数字、数组、对象或者函数。

假设在我们的应用中，多个Controller中都使用了相同的属性，比如都需要用到客户端ID这个属性，那么我们可以将其抽象为一个服务，该服务就专门用来获取客户端ID，来看看如何创建这个服务：

```swift
var mainModule = angular.module("mainModule", []);

mainModule.value("clientId", "qazxsw123456");
```

上面的示例代码创建了名为`clientId`的服务，该服务其实就是一个字符串。不过这和`$provide`服务有什么关系呢？其实上面这种写法并不是完整的写法，只是一个语法糖而已，真正完整的写法是在模块的`.config()`方法中通过`$provide`服务去创建：

```swift
mainModule.config(function($provide) {
    $provide.value("clientId", "qazxsw123456");
});
```

创建好服务后通过AngularJS的注入机制将其注入到Controller中：

```swift
mainModule.controller("FirstController", ["$scope", "clientId", function($scope, clientId) {
  $scope.clientId = clientId;
}]);

mainModule.controller("SecondController", ["$scope", "clientId", function($scope, clientId) {
  $scope.clientId = clientId;
}]);
```

然后在HTML页面中正常使用Controller就可以了：

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Demo for Value Service</title>
    <script src="../angular-1.5.8.js"></script>
    <script src="modules.js"></script>
  </head>
  <body ng-app="mainModule">
    <div ng-controller="FirstController">
      Client ID in FirstController: {{ clientId }}
    </div>
    <div ng-controller="SecondController">
      Client ID in SecondController: {{ clientId }}
    </div>
  </body>
</html>
```

上文中说过`$scope`服务的其中一个作用就是给Controller添加属性和方法，然后可以在绑定Controller的DOM中使用`{{}}`语法直接访问添加的属性或调用方法。然而就`$scope`服务的这一功能而言，AngularJS还提供了另一种方式，我们先来看看Controller的写法：

```swift
mainModule.controller("FirstController", ["clientId", function(clientId) {
  this.clientId = clientId;
}]);

mainModule.controller("SecondController", ["clientId", function(clientId) {
  this.clientId = clientId;
}]);
```

上述代码中我们并没有将`$scope`服务注入到这两个Controller中，而是使用`this`创建了`clientId`属性，`this`代表Controller的实例。使用这种方式后在HTML页面中使用Controller也有点变化：

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Demo for Value Service</title>
    <script src="../angular-1.5.8.js"></script>
    <script src="modules.js"></script>
  </head>
  <body ng-app="mainModule">
    <div ng-controller="FirstController as first">
      Client ID in FirstController: {{ first.clientId }}
    </div>
    <div ng-controller="SecondController as second">
      Client ID in SecondController: {{ second.clientId }}
    </div>
  </body>
</html>

```

我们看到在`ng-conroller`标签中不再是直接写Controller名称了，而是使用`as`关键字声明了Controller的实例，然后在`{{}}`中使用Controller的实例去访问属性或者调用方法。

> 使用`$scope`服务和`this`给Controller添加属性或方法的效果是一样的，所以不存在谁好谁坏的概念，只不过使用`this`的方式更贴合OO的思想，而且在HTML代码中对使用的属性或方法有更直观的可读性，能一眼看到使用了哪个Controller的属性或方法，所以使用哪种方式按个人喜好，但是不建议混用这两种方式。

这里在介绍另外一个语法糖，那就是在注入服务的时候不用繁复的在数组中和函数参数中都声明，只需要在函数的参数里声明就可以了：

```swift
mainModule.controller("FirstController", function($scope, clientId) {
  $scope.clientId = clientId;
});

// 或者

mainModule.controller("FirstController", function(clientId) {
  this.clientId = clientId;
});
```

#### Constant
我们再来看看`constant(name, value)`方法：

```swift
var mainModule = angular.module("mainModule", []);

mainModule.constant("clientId", "qazxsw123456");
```

该方法和`value(name, value)`在创建的服务内容形式上来说是一样的，但是两者创建的服务在功能性上还是有区别的：
- 从名称就可以看出用`constant(name, value)`方法创建的服务是不可修改的。
- 使用`constant(name, value)`创建的服务可以在模块的`.config()`方法中注入，也就是可以在创建其他服务时使用，而使用`value(name, value)`创建的服务不可以。

#### Service
现在又有一个需求，希望能获取到当前时间添加在客户端ID后面，那么我们可以使用`service(name, constructor)`方法来创建获取当前时间的服务：

```swift
var mainModule = angular.module("mainModule", []);

mainModule.value("clientId", "qazxsw123456");

mainModule.service("currentDate", Date);

mainModule.controller("FirstController", function(clientId, currentDate) {
  this.clientId = clientId + "-" + currentDate;
});
```

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Demo for Service Service</title>
    <script src="../angular-1.5.8.js"></script>
    <script src="modules.js"></script>
  </head>
  <body ng-app="mainModule">
    <div ng-controller="FirstController as first">
      Client ID in FirstController: {{ first.clientId }}
    </div>
  </body>
</html>
```

输出结果：
`Client ID in FirstController: qazxsw123456-Thu Sep 08 2016 17:05:30 GMT+0800 (CST)`

`service(name, constructor)`方法的第二个参数是函数构造器，也就是函数的实例，所以`currentDate`服务的实体其实就是`new Date()`。

#### Factory
现在，我们希望通过一个服务就可以完成客户端ID和当前时间的拼接，不需要给Controller注入两个服务，来看看如何用`factory(name, $getFn)`方法来实现：

```swift
var mainModule = angular.module("mainModule", []);

mainModule.constant("clientId", "qazxsw123456");

mainModule.factory("clientIdAndCurrentDate", function(clientId) {
  return clientId + "-" + new Date();
});

mainModule.controller("FirstController", function(clientIdAndCurrentDate) {
  this.clientId = clientIdAndCurrentDate;
});
```

首先我们需要用`constant(name, value)`方法创建`clientId`服务，因为需要将它注入到新的服务中，前文也介绍过`constant(name, value)`和`value(name, value)`方法的区别。然后使用`factory(name, $getFn)`方法创建`clientIdAndCurrentDate`服务，该函数的第二个参数类型是函数，我们在该函数中将`clientId`服务返回的客户端ID与`Date`构造器返回的时间进行拼接然后返回，当然运行结果还是一样的：
`Client ID in FirstController: qazxsw123456-Thu Sep 08 2016 17:05:30 GMT+0800 (CST)`

其实这个服务还可以写成这样：

```swift
mainModule.constant("clientId", "qazxsw123456");

mainModule.service("currentDate", Date);

mainModule.factory("clientIdAndCurrentDate", function(clientId, currentDate) {
  return clientId + "-" + currentDate;
});
```

这相当于`clientIdAndCurrentDate`服务对`currentDate`服务进行了进一步的配置或者说增加了功能，那么也就是说`factory(name, $getFn)`方法相比`service(name, constructor)`方法可以创建更复杂一些的服务。

#### Povider
现在又有新的需求，希望对`clientId`后面的时间进行格式化，但假设我们没有权限去更改`clientIdAndCurrentDate`服务，那么这时我们需要使用`provider(name, provider)`方法创建另外一个服务，然后对`clientIdAndCurrentDate`服务进行配置，来看看如何实现这个服务：

```swift
var mainModule = angular.module("mainModule", []);

mainModule.constant("clientId", "qazxsw123456");

mainModule.service("currentDate", Date);

mainModule.factory("clientIdAndCurrentDate", function(clientId, currentDate) {
  return clientId + "-" + currentDate;
});

mainModule.provider("clientIdAndCurrentDateByFormat", function() {
  this.formatFunc = function(str) {
    var clientId = str.substring(0, str.indexOf("-"));
    var dateStr = str.substring(str.indexOf("-"), str.length);
    var dateObj = new Date(dateStr);
    var year = dateObj.getFullYear().toString();
    var month = (dateObj.getMonth() + 1).toString();
    var day = dateObj.getDate().toString();
    var hour = dateObj.getHours().toString();
    var minute = dateObj.getMinutes().toString();
    var second = dateObj.getSeconds().toString();
    return clientId + "-" + [year, (month >= 10 ? month : 0 + month), (day > 10 ? day : 0 + day), hour, minute, second].join("");
  };
  this.$get = function(clientIdAndCurrentDate) {
    return this.formatFunc(clientIdAndCurrentDate);
  };
});

mainModule.controller("FirstController", function(clientIdAndCurrentDateByFormat) {
  this.clientId = clientIdAndCurrentDateByFormat;
});
```

首先我们创建了`formatFunc()`辅助配置函数，然后实现了`$get`方法，通过`formatFunc()`辅助函数配置`clientIdAndCurrentDate`服务，我们来看运行结果：
`Client ID in FirstController: qazxsw123456-20160909113523`

要注意的一点是，通过`provider(name, provider)`方法创建服务时必须要**显式**的实现`$get`方法，并且只有在`$get`方法中才能注入其他服务。在AngularJS中服务仅指`$get`返回的东西，所以前四种创建服务的方法其实都是`provider(name, provider)`方法根据不同应用场景实现的语法糖，比如`factory`方法其实就是把一个函数当作了`$get`方法，`service`方法其实是将一个函数构造方法或者说函数实例当作了`$get`方法，`value`和`constant`方法其实又是对`factory`方法的语法糖实现。所以在自定义服务时可按需选择不同的方法创建服务。

## 指令（Directive）
指令是AngularJS中另一个主要的特性，指令的作用可以用一句话描述，就是可以给HTML元素赋予特殊或自定义的行为，比如监听事件、视图模板代理等。在上文中我们使用过的`ng-app`、`ng-controller`、`ng-model`就是AngularJS中的指令。

### 指令的命名
指令的命名和使用写法比较有意思，一般情况下在定义指令时推荐使用驼峰命名法，比如`ngModel`、`ngApp`，但是在HTML中大小写是不敏感的，所以在HTML中使用指令时推荐使用小写字母加破折号的形式，比如`ng-model`、`ng-app`。除了使用小写破折号这种方式，还有以下几种使用写法：
- `ng:model`
- `ng_model`
- `data-ng-bind`
- `x-ng-bind`

大家可以根据自己喜好选择使用写法，但是尽量保持写法统一。

### 指令的形式
在AngularJS中，指令有四种表现形式，既标签形式、标签属性形式、标签class名称形式、注释形式：

```html
<my-dir></my-dir>
<span my-dir="exp"></span>
<!-- directive: my-dir exp -->
<span class="my-dir: exp;"></span>
```

一般情况下，推荐使用标签形式和标签属性形式。

### 使用指令
与Controller一样，指令也是通过AngularJS的Model创建的，使用`directive(name, directiveFactory)`方法创建指令，该方法有两个参数：
- 第一个参数为指令名称，命名规范在上文中已经说过了。
- 第二个参数是一个工厂函数，该函数需要返回一个对象，我们通过配置该对象中的不同属性从而告诉AngularJS内置的`$compile`服务实现指令的不同功能。

#### 指令类型
上文中说过指令的实现是通过工厂函数返回对象，然后通过配置对象的不同属性实现不同功能，所以设置指令的类型也是通过配置属性对象完成的：

```swift
var mainModule = angular.module("mainModule", []);

mainModule.directive("myDirective", function() {
  return {
    restrict: "A"
  };
});

mainModule.directive("myDirective1", function() {
  return {
    restrict: "E"
  };
});

mainModule.directive("myDirective2", function() {
  return {
    restrict: "AE"
  };
});
```

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Demo for Directive</title>
    <script src="../angular-1.5.8.js"></script>
    <script src="modules.js"></script>
  </head>
  <body ng-app="mainModule">
    <div my-directive></div>
    <my-directive1></my-directive1>
    <my-directive2></my-directive2>
    <!-- <div my-directive2></div> -->
  </body>
</html>
```

从上面的示例代码可以看出，可以通过配置返回对象的`restrict`属性设置指令的类型，可配置的值分别为：
- `"A"`：代表且仅可代表标签属性类型的指令。
- `"E"`：代表且仅可代表标签类型的指令。
- `"C"`：代表且仅可代表class名称类型的指令。
- `"M"`：代表且仅可代表注释类型的指令。

如果想设置一个多类型的指令，那么可以将类型标识写在一起，比如`"AEC"`代表既是标签属性类型，又是标签类型，还是class名称类型。如果不配置`restrict`属性，那么表示指令的类型为默认的`"AE"`类型。

#### 通过指令封装UI模板
在前端应用的开发过程中，不同的页面常有很多一样的UI元素，如果每个页面都写一遍，那么在维护时就常会牵一发而动全身，AngularJS中的指令可以很好的解决这个问题，它可以将UI片段封装为一个指令，从而可以在不同的页面中复用，那么在维护时就是四两拨千斤的效果。下面来看看如何实现模板指令：

```swift
var mainModule = angular.module("mainModule", []);

mainModule.controller("MyController", function() {
  this.name = "Jason";
  this.job = "Developer";
});

mainModule.directive("myDirective", function() {
  return {
    template: "Name: {{mc.name}}, Job: {{mc.job}}"
  };
});

```

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Demo for Directive</title>
    <script src="../angular-1.5.8.js"></script>
    <script src="modules.js"></script>
  </head>
  <body ng-app="mainModule">
    <div ng-controller="MyController as mc">
      <my-directive></my-directive>
      <!-- <div my-directive></div> -->
    </div>
  </body>
</html>

```

上面的代码示例中，我们将本该写在HTML中的展示代码设置给了返回对象的`template`属性。为了能更好的管理UI模板，我们还可以将UI展示代码提炼成单独的HTML模板文件，并可以使用指令的`templateUrl`属性设置HTML模板文件名称，这样便可以大大降低指令和UI模板的耦合度：

```swift
mainModule.directive("myDirective", function() {
  return {
    templateUrl: "myTemplate.html"
  };
});
```

```html
<!-- myTemplate.html -->
Name: {{mc.name}}, Job: {{mc.job}}
```

那么问题来了，如果UI模板文件很多的话，按上面的方法就要写很多个对应的指令，而且只是UI模板文件名称不一样而已，实在有点冗余。AngularJS提供了另外一种解决方法，那就是可以通过给模板指令设置相关属性，从而动态的加载UI模板文件，我们来看看如何实现：

```swift
// modules.js
var mainModule = angular.module("mainModule", []);

mainModule.controller("MyController", function() {
  this.name = "Jason";
  this.job = "Developer";
});

mainModule.directive("myDirective", function() {
  return {
    templateUrl: function(elem, attr) {
      return "myTemplate-" + attr.type + ".html";
    }
  };
});
```

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Demo for Directive</title>
    <script src="../angular-1.5.8.js"></script>
    <script src="modules.js"></script>
  </head>
  <body ng-app="mainModule">
    <div ng-controller="MyController as mc">
      <my-directive type="name"></my-directive>
      <my-directive type="job"></my-directive>
      <!-- <div my-directive type="name"></div> -->
      <!-- <div my-directive type="job"></div> -->
    </div>
  </body>
</html>
```

```html
<!-- myTemplate-name.html -->
Name: {{mc.name}}

<!-- myTemplate-job.html -->
Job: {{mc.job}}
```

从上面的示例代码可以看出，`template`和`templateUrl`两个属性的值不只是接受字符串，还接受函数。要注意的是该函数默认带两个参数：
- 第一个参数代表当前的HTML DOM元素。
- 第二个参数代表当前HTML DOM元素的属性对象，在函数体内可以为该对象设置任何属性。

在上面的示例中，我们给代表当前DOM元素的属性对象设置了`type`属性，用于标识UI模板文件名称，这样我们就可以通过一个专有的模板指令来控制所有的UI模板文件了。

#### 指令的作用域
上面的示例中，我们通过配置可以实现动态加载UI模板文件，但是我们无法动态指定UI模板文件中显示的内容。这一节我们来了解一下如何通过指令的隔离域达到在同一个指令中动态指定UI模板文件中要显示的内容，先看看代码示例：

```swift
var mainModule = angular.module("mainModule", []);

mainModule.controller("MyController", function() {
  this.jason = { name: "Jason", job: "Developer" };
  this.green = { name: "Green", job: "Doctor" };
});

mainModule.directive("myDirective", function() {
  return {
    restrict: "E",
    scope: {
      personInfo: "=person"
    },
    templateUrl: "myTemplate.html"
  };
});
```

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Demo for Directive</title>
    <script src="../angular-1.5.8.js"></script>
    <script src="modules.js"></script>
  </head>
  <body ng-app="mainModule">
    <div ng-controller="MyController as mc">
      <my-directive person="mc.jason"></my-directive>
      <hr>
      <my-directive person="mc.green"></my-directive>
    </div>
  </body>
</html>
```

```html
<!-- myTemplate.html -->
Name: {{personInfo.name}}, Job: {{personInfo.job}}
```

从示例中可以看到，我们给指令的返回对象又添加了一个属性`scope`，这就是指令的作用域属性，`scope`属性有三种可设置的值：
- `false`：默认值，这表示指令共享它父节点的Controller的作用域，也就是可以使用`{{}}`语法直接访问父节点Controller作用域中的属性。
- `true`：创建指令自己的作用域，但是该作用域继承父节点Controller的作用域。
- `{}`：第三种是设置一个对象，表示创建了指令自己独立的作用域，与父节点Controller的作用是完全隔离的。

如果我们希望指令的隔离作用域和父节点Controller的作用域之间进行交互，那么就需要将两者进行绑定，这里有三种绑定方式：
- 使用`@`实现单向数据绑定，但是只限于绑定Controller作用域中值为字符串的属性，因为是单向绑定，所以父节点Controller修改绑定的属性可影响到指令作用域中对应的属性，反之则不可以。在HTML中使用`{{}}`语法取值，比如`person="{{nameStr}}"`。
- 使用`=`实现双向数据绑定，在父节点Controller中修改属性和在指令中修改属性可相互影响。在HTML中直接使用属性名称，比如`person="jasonObj"`。
- 使用`&`实现函数绑定，用于绑定Controller中值为函数的属性，在HTML中直接调用函数，比如`action="click()"`。

上面的示例中我们给`myDirective`指令设置了隔离域并添加了名为`personInfo`的属性，并与父节点的`MyController`进行数据双向绑定，在HTML代码中，就可以通过`<my-directive>`指令标签的`person`属性与`MyController`的数据绑定了。另外，在进行绑定时还有一种简写的方式：

```swift
...
scope: {
  personInfo: "="
  // personInfo: "@"
  // personInfo: "&"
},
...
```

等同于：

```swift
...
scope: {
  personInfo: "=personInfo"
  // personInfo: "@personInfo"
  // personInfo: "&personInfo"
},
...
```

#### 指令的Controller
在指令中也可以创建Controller，和在Module中创建Controller很类似，既定义函数，在参数中注入需要的AngularJS服务既可：

```swift
var mainModule = angular.module("mainModule", []);

mainModule.controller("MyController", function($scope) {
  $scope.green = { name: "Green", job: "Doctor" };
});

mainModule.directive("myDirective", function() {
  return {
    restrict: "E",
    scope: {
      person: "="
    },
    controller: function($scope) {
      $scope.jason = { name: "Jason", job: "Developer" };
    },
    templateUrl: "myTemplate.html"
  };
});
```

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Demo for Directive</title>
    <script src="../angular-1.5.8.js"></script>
    <script src="modules.js"></script>
  </head>
  <body ng-app="mainModule">
    <div ng-controller="MyController">
      <my-directive person="green"></my-directive>
    </div>
  </body>
</html>
```

```html
<!-- myTemplate.html -->
Name: {{jason.name}}, Job: {{jason.job}}
Name: {{person.name}}, Job: {{person.job}}
```

在上面的示例中，我们给`myDirective`指令添加了Controller，有一点不同的是在添加Controller时不能设置名称，指令的Controller名称默认与指令名称一样，如果需要另外指定名称，需要配置`controllerAs`指定Controller的名称：

```swift
...
controller: function($scope) {
  $scope.jason = { name: "Jason", job: "Developer" };
},
controllerAs: "directiveController",
...
```

在上面示例的UI模板文件中可以看出，既可以使用指令隔离域中与父节点Controller绑定的属性，也可以使用在指令自己的Controller中定义在隔离域的属性。

#### 指令之间的交互
指令之间的交互主要是以指令的Controller为桥梁来实现的，这里的交互指的是子指令与父指令之间的交互，我们可以使用指令的`require`属性设置要引用的父指令的Controller，这里有几种配置方式：
- `require: "controllerName"`：只查找指令自己的Controller。
- `require: "^controllerName"`：查找指令自己的Controller以及父指令的Controller。
- `require: "^^controllerName"`：只查找父指令的Controller。
- `require: ["^controllerName1", "^controllerName2"]`：引用多个Controller。

如果指令查找到引用的Controller后该如何使用呢，这就要使用指令的另一个重要的属性`link`函数了。`link`函数主要用来为DOM元素添加事件监听、监视模型属性变化、以及更新DOM，该函数共有五个参数：
- `scope`：指令的作用域，默认是父节点Controller的作用域，如果指令有创建自己的作用域，那么则指指令自己的作用域。
- `element`：指令的jQLite(jQuery的子集)包装的DOM元素，可以通过该参数操作指令所在的DOM元素。
- `attrs`：指令所在DOM元素的属性对象，通过`.`语法可以获取到给DOM元素添加的属性。
- `controller`：指令通过`require`属性引用的Controller实例。
- `transcludeFn`：嵌入函数。

`link`函数的其他几个参数后面文章中都会讲到，当指令找到通过`require`属性引用的Controller后，我们就可以通过`link`函数的第四个参数访问引用的Controller了。来看一个示例：

#### 通过指令操作DOM元素
我们了解了`link`函数后就可以使用该函数实现各种有用的指令了，比如通过指令操作DOM元素：

```swift
var mainModule = angular.module("mainModule", []);

mainModule.directive("myDirective", function($interval) {
  return {
    restrict: "A",
    link: function(scope, element, attrs) {
      $interval(function() {
        element.text(new Date());
      }, 1000);
    }
  };
});

```

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Demo for Directive</title>
    <script src="../angular-1.5.8.js"></script>
    <script src="modules.js"></script>
  </head>
  <body ng-app="mainModule">
    <div>
      Current Date is: <span my-directive></span>
    </div>
  </body>
</html>
```

上面的示例中，首先我们限定了`myDirective`指令只能以标签属性的形式使用，然后注入了AngularJS的内置服务`$interval`，通过`link`函数的第二个参数获取到指令所在的DOM元素，然后周期性更新DOM元素显示的内容。
![][image-4]

#### 指令的内嵌机制
大家都知道HTML中的DOM元素是具有层级关系的，一般情况下我们使用指令封装的UI模板颗粒度都会比较小，所以就会出现指令嵌套的现象，这几需要用到指令的内嵌机制了，指令的`transclude`属性默认为`false`，如果将其设置为`true`，那么该指令就开启了内嵌机制，也就是说指令标签之间的内容可以被指定嵌入UI模板中被`ng-transclude`内置指令标记过的DOM元素中，结合之前说过的父子指令交互的内容来实现一个例子：

```swift
// modules.js
var mainModule = angular.module("mainModule", []);

mainModule.directive("myTabs", function() {
  return {
    restrict: "E",
    transclude: true,
    controller: function($scope) {
      $scope.panes = [];
      var panes = $scope.panes;
      this.addPane = function(pane) {
        if(panes.length == 0) {
          $scope.select(pane);
        };
        panes.push(pane);
      };
      $scope.select = function(pane) {
        angular.forEach(panes, function(pane) {
          pane.selected = false;
        });
        pane.selected = true;
      };
    },
    templateUrl: "myTabs.html"
  };
});

mainModule.directive("myPane", function() {
  return {
    restrict: "E",
    require: "^^myTabs",
    scope: {
      name: "@",
      job: "@"
    },
    link: function(scope, element, attrs, controller) {
      controller.addPane(scope);
    },
    templateUrl: "myPane.html"
  };
})
```

在上面的示例中，我们创建了两个指令，`myTabs`和`myPane`，在`myTabs`指令中，我们限定它只能以标签形式使用，开启了内嵌机制，并定义了它自己的Controller，在Controller中定义了`panes`变量和`addPane(pane)`，`select(pane)`两个方法，方法的具体实现内容这里就不解释了，都很简单，最后指定了UI模板文件`myTabs.html`。

在`myPane`指令中同样限定只能以标签形式使用，指定了要引用的父节点的Controller名称，后创建了自己的隔离域，定义了`name`，`job`两个属性，并进行了字符串的单向绑定，然后定义了`link`函数，通过第四个参数访问到了父节点的`myTabs`Controller，并调用`addPane(pane)`函数，将自己的隔离域作为参数传入，最后指定了UI模板文件`myPane.html`。

再来看看`index.html`和`myTabs.html`，`myPane.html`这两个模板文件：

```html
<!--index.html-->
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Demo for Directive</title>
    <script src="../angular-1.5.8.js"></script>
    <script src="modules.js"></script>
  </head>
  <body ng-app="mainModule">
    <my-tabs>
      <my-pane name="Jason" job="Developer"></my-pane>
      <my-pane name="Green" job="Doctor"></my-pane>
    </my-tabs>
  </body>
</html>

<!--myTabs.html-->
<div>
  <ul>
    <li ng-repeat="pane in panes">
      <a href="" ng-click="select(pane)">{{pane.name}}</a>
    </li>
  </ul>
  <div id="paneContainer" ng-transclude></div>
</div>

<!--myPane.html-->
<div ng-show="selected">
  I am {{name}}, my job is {{job}}!
</div>
```

在`index.html`中，`myTabs`指令包含两个`myPane`指令，这两个`myPane`指令所显示的内容将嵌入在`myTabs.html`中id为`paneContainer`的DIV中，也就是`myPane.html`中的内容会被嵌入在这个DIV里。

上面这三个文件中有几个点需要注意：
- 因为在`myPane`指令的隔离域中定义了`name`和`job`属性，并进行了字符串绑定，所以在`index.html`文件中，可以对`myPane`标签里的`name`，`job`属性直接进行字符串赋值。
- 因为在`myPane`指令中引用了`myTabs`指令的Controller，并在`link`函数中将隔离域作为参数传给了`myTabs`，既`myTabs`指令的Controller中的`select(pane)`和`addPane(pane)`函数的参数均为`myPane`指令的隔离域，所以在`myTabs.html`文件中可以直接使用`pane`访问`myPane`指令隔离域中定义的属性，比如`{{pane.name}}`，并且也可以在`myTabs`指令在`myPane`的隔离域中定义属性，比如`pane.selected = true`，给隔离域定义了`selected`的属性，然后可以在`myPane`指令中使用。
- `ng-show`是AngularJS内置的指令，用于显示或隐藏指定的DOM元素。

看看运行效果：
![][image-5]

`link`函数的第五个参数`transcludeFn`是一个函数，该函数常用的有两个参数`scope`和`function(clone){}`，既`transcludeFn(scope, function(clone){})`。前者是嵌入内容的作用域，与指令的隔离作用域是平行的，后者函数的参数`clone`是嵌入的内容的jquery封装，可以通过它对嵌入的内容进行DOM操作。

#### 指令的其他属性
**priority**用于指定指令的优先级，该属性的值从1开始。当有多个指令定义在同一个DOM元素中时就需要通过该属性明确它们的执行顺序。

**replace**用于判定是否将UI模板的内容替换掉指令标签本身，该属性默认值为`false`，既保留指令标签本身，若设置为`true`则替换指令标签。

## 组建（Component）
在AngularJS 1.5中新加了组建的概念，它的意图是希望从AngularJS 1.x向AngularJS 2.0迁移时能更加平顺，AngularJS团队也提倡使用组建化模式开发Web应用。那么组建是什么呢？其实组建就是指令的一种特性形式，它规避了一些指令中晦涩难理解的东西，比如`compile`函数，`link`函数，`scope`，`restrict`等，所以组建的目的就是能让我们更为傻瓜式的创建指令，能更好的遵循组建化的开发模式，提高性能以及更容易向AngularJS 2.0迁移。

### 创建组建
我们可以使用Module的`component`方法创建组建：

```swift
var mainModule = angular.module("mainModule", []);

mainModule.component("myComponent", {
  templateUrl: "myTemplate.html",
  controller: function() {

  },
  bindings: {
    name: "="
  }
});

```

`component`方法的第一个参数是组建名称，命名规则和使用方法与指令一样，第二个参数和创建指令有点不同，它并不是一个函数，而是一个对象，在该对象中对组建的配置和在指令中的配置方式很类似。

我们先来看看组建和指令之间有哪些区别：
- 组建中不提供手动配置作用域，默认的作用域就是隔离域。
- 组建中通过`bindings`属性进行数据绑定，除了`=`，`@`，`&`三种绑定方式以外还增加了一种`<`方式，既单向绑定，但不限于字符串。从而保证了组建有自己的清晰的输入输出API。并且通过`bindings`对象绑定的属性直接绑定在组建的Controller上。
- 组建的Controller默认名称为`$ctrl`，当然也可以使用`controllerAs`属性指定Controller的名称。
- 组建只能以标签形式使用。
- 组建中没有`link`函数，`compile`函数，`priority`属性，`restrict`属性。
- 组件只能控制自身的输入输出，组建不允许修改属于自己隔离域以外的任何数据和DOM元素。一般情况下，AngularJS通过作用域（Scope）继承的特性支持跨层级修改数据的能力，但是如果当修改数据职责不清晰或不恰当的时候就会导致各种问题，所以这也就是组建的作用域默认都是隔离域的原因。

使用起来和指令比较类似：

```swift
// modules.js
var mainModule = angular.module("mainModule", []);

mainModule.controller("MyController", function() {
  this.person = {
    name: "Jason"
  }
})

mainModule.component("myComponent", {
  templateUrl: "myTemplate.html",
  controller: function() {

  },
  bindings: {
    person: "="
  }
});
```

```html
<!--index.html-->
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Demo for Component</title>
    <script src="../angular-1.5.8.js"></script>
    <script src="modules.js"></script>
  </head>
  <body ng-app="mainModule">
    <div ng-controller="MyController as mc">
      <my-component person="mc.person"></my-component>
    </div>
  </body>
</html>

<!--myTemplate.html-->
<span>Name: {{$ctrl.person.name}}</span>
```

### 组建的生命周期
在组建的整个生命周期里，AngularJS提供了五个关键点的方法，可供我们监听到组建的运行状态：
- `$onInit()`：该方法在组件及其所有 binding 初始化之后被调用，从而我们就有了一个清晰的地方统一存放数据初始化的逻辑：

```swift
var mainModule = angular.module("mainModule", []);

mainModule.component("myComponent", {
  templateUrl: "myTemplate.html",
  controller: function() {
    this.name = "jason";
  }
});

// 将初始化数据的逻辑放在onInit方法中

mainModule.component("myComponent", {
  templateUrl: "myTemplate.html",
  controller: function() {
    this.$onInit = function() {
      this.name = "jason";
    }
  }
});
```

- `$onChanges(changesObj)`：当组建中单向绑定的属性值发生变化时被调用，这里要注意的是只有绑定属性值的引用发生变化时才能监听到，如果只是在指令内对属性进行修改，该方法是无法监听到的。通过该方法的参数可以获取到被修改数据当前的值、修改之前的值、是否时第一次修改：

```swift
mainModule.component("myComponent", {
  templateUrl: "myTemplate.html",
  controller: function() {
    this.$onChanges = function(changesObj) {
      if(changesObj.name) {
        // name当前的值
        var nameCurrentValue = changesObj.name.currentValue;
        // name修改前的值
        var namePreviousValue = changesObj.name.previousValue;
        // 是否是第一次修改
        var isFirstChange = changesObj.name.isFirstChange();
      }
    }
  },
  bindings: {
    name: "<"
  }
});
```

- `$doCheck()`：该方法和`$onChanges(changesObj)`作用类似，但是该方法可以监听到在指令内对属性进行修改的行为：

```swift
mainModule.component("myComponent", {
  templateUrl: "myTemplate.html",
  controller: function() {
    // 当name在指令内修改时
    this.name = "Green";
    this.$doCheck = function() {
      // doCheck方法会被调用
    }
  },
  bindings: {
    name: "<"
  }
});
```

- `$onDestroy()`：当作用域被销毁时调用该方法。
- `$postLink()`：当指令所在标签与子标签链接时调用该方法。

### 组建化开发
我们先来看看示例效果：
![][image-6]

既然是组建化开发，那么我们来看看上面这个示例有几个组建：
![][image-7]
从上图可以看到，整个示例一共用了三个组建，其中有两个组建进行了复用，下面我们来看看每个组建是如何定义的。

#### personList组建
该组建主要用来初始化数据源，定义对数据源操作的函数：

```swift
mainModule.component("personList", {
  templateUrl: "personList.html",
  controller: function() {
    this.$onInit = function() {
      this.list = [{
        name: "Jason",
        job: "Developer"
      },{
        name: "Green",
        job: "Doctor"
      }];
    };

    this.updatePerson = function(person, job, value) {
      person[job] = value;
    };

    this.deletePerson = function(person) {
      var idx = this.list.indexOf(person);
      if(idx >= 0) {
        this.list.splice(idx, 1);
      }
    };
  }
});
```

首先在`$onInit`函数中初始化数据源，定义了`Person`对象数组，然后定义了更新指定`Person`对象的方法`updatePerson`及删除指定`Person`对象的方法`deletePerson`。

再来看看它的UI模板文件`personList.html`：

```html
<b>Person</b><br>
<person-detail ng-repeat="person in $ctrl.list" person="person" on-update="$ctrl.updatePerson(person, job, value)" on-delete="$ctrl.deletePerson(person)"></person-detail>
```

该文件共有两部分，第一部分是用原生HTML标签定义了标题，第二部分是使用了另外一个组建`personDetail`。`ng-repeat`指令是AngularJS内置的指令，作用不言而喻，就是循环数据源，同时组建也跟据循环次数增加。`person`，`on-update`，`on-delete`是在`personDetail`组建中定义的数据绑定属性，用大白话解释就是，`personDetail`组建中的`person`变量与`personList`组建中的`Person`对象进行了绑定，`personDetail`组建中的`onUpdate`和`onDelete`方法分别与`personList`组建中的`updatePerson`和`deletePerson`方法进行了绑定。

#### personDetail组建
该组建主要用于展示Person对象的具体内容：

```swift
mainModule.component("personDetail", {
  templateUrl: "personDetail.html",
  bindings: {
    person: "<",
    onUpdate: "&",
    onDelete: "&"
  },
  controller: function() {
    this.update = function(job, value) {
      this.onUpdate({person: this.person, job: job, value: value});
    };

    this.delete = function() {
      this.onDelete(this.person);
    }
  }
});
```

```html
<hr>
<div>
  Name: {{$ctrl.person.name}}<br>
  Job: <editable-field field-value="$ctrl.person.job" on-update="$ctrl.update('job', value)"></editable-field>
  <button ng-click="$ctrl.delete()">Delete</button>
</div>
```

在`personDetail.html`文件里，首先访问了`person`对象的`name`属性，将其展示出来，注意，这里由`$ctrl.preson`访问到的其实是单向绑定的`personList`组建中的`person`对象。而且在`update`函数中调用了与`personList`组建的`updatePerson`函数绑定的`onUpdate`函数，也就是子组建调用了父组建的方法。然后使用了第三个组建`editableField`，该组建同样有一些属性和方法和`personDetail`组建中对应的属性和方法进行了绑定。最后增加了一个按钮，并使用`ng-click`指令指定了按钮的点击事件。 

#### editableField组建
该组建的主要作用是展示并修改`person`对象中的`job`属性：

```swift
mainModule.component("editableField", {
  templateUrl: "editableField.html",
  bindings: {
    fieldValue: "<",
    onUpdate: "&"
  },
  controller: function() {
    this.$onInit = function() {
      this.editMode = false;
      this.fieldValueCopy = this.fieldValue;
    };

    this.handModelChange = function() {
      if(this.editMode) {
        this.onUpdate({job: "job", value: this.fieldValue});
        this.fieldValueCopy = this.fieldValue;
      }
      this.editMode = !this.editMode;
    };

    this.reset = function() {
      this.fieldValue = this.fieldValueCopy;
    };
  }
});
```

从最开始的运行效果中可以看到`editableField`是有形态变化的，所以在`$onInit`函数中定义了是否为编辑模式的标识符`editMode`以及代表输入框内容的`fieldValue`变量，因为有`reset`功能，所以还定义存储修改之前值的变量`fieldValueCopy`。然后定义了点击`Edit`或`Save`按钮触发的函数`handModelChange`，并在该函数中调用了和`personDetail`组建的`update`函数绑定的`onUpdate`函数，同样由子组建调用了父组建的方法。还定义了点击`Reset`按钮触发的函数`reset`。

```swift
<span ng-switch="$ctrl.editMode">
  <input ng-switch-when="true" type="text" ng-model="$ctrl.fieldValue">
  <span ng-switch-default>{{$ctrl.fieldValue}}</span>
</span>
<button ng-click="$ctrl.handModelChange()">{{$ctrl.editMode ? "Save" : "Edit"}}</button>
<button ng-if="$ctrl.editMode" ng-click="$ctrl.reset()">Reset</button>
```

在`editableField.html`文件中展示了`person`对象的`job`属性，定义了修改`job`属性的输入框以及两个按钮。这里出现了一组之前没见过的AngularJS内置指令，`ng-switch`、`ng-switch-when`、`ng-switch-default`，这三个指令一般组合使用，作用类似`if else`语句，通过这组指令和`deitMode`变量就可以达到动态变换DOM元素的功能。

最后来看看简单的`index.html`文件：

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Demo for Directive</title>
    <script src="../angular-1.5.8.js"></script>
    <script src="modules.js"></script>
  </head>
  <body ng-app="mainModule">
    <person-list></person-list>
  </body>
</html>
```

从上面的这个示例中可以看出在`editableField`和`personDetail`组建中都没有真正意义上去修改数据源，而是通过函数绑定一路将修改数据源的行为传递到了定义数据源的组建`personList`中，由它最后真正完成对数据源的修改，这也遵循了组建不允许修改属于自己隔离域以外的任何数据和DOM元素的原则。

## 总结
这篇文章是对AngularJS 1.x的入门学习小记，对一些基本概念的介绍，如果想要深入了解AngularJS可以去读官方的[文档][3]和[API][4]。此刻AngularJS 2.0已正式发布，掌握AngularJS 1.x的基本知识能更快的帮助我们迈入AngularJS 2.0的怀抱，让我们不忘AngularJS 1.x初心，去拥抱AngularJS 2.0的美好未来。

[1]:	https://github.com/DevTalking/AngularJS1.x-guide.git
[2]:	https://docs.angularjs.org/api
[3]:	https://docs.angularjs.org/guide
[4]:	https://docs.angularjs.org/api

[image-1]:	http://7xpp8a.com1.z0.glb.clouddn.com/angularjs/angularjs-guide-1.png
[image-2]:	http://7xpp8a.com1.z0.glb.clouddn.com/angularjs/angularjs-guide-2.gif
[image-3]:	http://7xpp8a.com1.z0.glb.clouddn.com/angularjs/angularjs-guide-3.gif
[image-4]:	http://7xpp8a.com1.z0.glb.clouddn.com/angularjs/angularjs-guide-4.gif
[image-5]:	http://7xpp8a.com1.z0.glb.clouddn.com/angularjs/angularjs-guide-5.gif
[image-6]:	http://7xpp8a.com1.z0.glb.clouddn.com/angularjs/angularjs-guide-6.gif
[image-7]:	http://7xpp8a.com1.z0.glb.clouddn.com/angularjs/angularjs-guide-7.png