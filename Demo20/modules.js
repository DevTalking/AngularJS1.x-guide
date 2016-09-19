var mainModule = angular.module("mainModule", []);

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
