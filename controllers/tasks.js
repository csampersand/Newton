angular.module('tasks.list', [])

.controller('TasksCtrl', function($scope, $ionicModal, $localstorage, $ionicListDelegate) {


  $scope.tasks = [];
  $scope.i = -1;

  var setTasks = function(){
    var user = $localstorage.getObject('storage');
    if (user.tasks != undefined)
      $scope.tasks = user.tasks;
  }

  setTasks();

  // toggle modal being complete
  $scope.toggleComplete = function(task) {
      task.complete = !task.complete;
  }


  // Create and load the Modal
  $ionicModal.fromTemplateUrl('templates/tasks/task-form.html', function(modal) {
    $scope.taskModal = modal;
  }, {
    scope: $scope,
    animation: 'slide-in-up',
    focusFirstInput: true
  });

  // Called when the form is submitted
  $scope.submitTask = function(task) {
    if ($scope.i > -1) {
      $scope.updateTask(task, $scope.i);
      $scope.i = -1;
    }
    else
      $scope.createTask(task);
  };

  $scope.convert = function(day){
    
    var temp = '';
    var date = new Date(day); 
    var today = new Date();
    var weekday = new Array(7);
    weekday[0]=  "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    if(date.getTime() < today.getTime() + 605000000){
      temp = weekday[date.getDay()];
    } else{
      temp = date.toLocaleDateString();
    }

    return temp;
  }


  // Called if the task has no id
  $scope.createTask = function(task) {

    $scope.tasks.push({
      title: task.title,
      due: task.due,
      important: task.important,
      complete: false,
    });
    $scope.taskModal.hide();
    task.title = "";
    task.due = "";
    task.important = false;
    $localstorage.setObject('storage', {tasks: $scope.tasks});
  };

  $scope.removeTask = function(index) {
    $ionicListDelegate.closeOptionButtons();
    $scope.tasks.splice(index, 1);
     $localstorage.setObject('storage', {tasks: $scope.tasks});
  };

  // Update task called if the task has an id
  $scope.updateTask = function(task, i) {
    $scope.tasks[i] = angular.copy(task);
    $localstorage.setObject('storage', {tasks: $scope.tasks});  
    $scope.taskModal.hide();

    task.title = "";
    task.due = "";
    task.important = false;
  };

  // Open our new task modal
  $scope.newTask = function() {
    $scope.taskModal.show();
  };

  // Edit our task
  $scope.editTask = function(task, i) {
   
    $ionicListDelegate.closeOptionButtons();
    $scope.i = i;
    $scope.task = angular.copy(task);
    $scope.taskModal.show();
  }

  // Close the new task modal
  $scope.closeNewTask = function() {
    $scope.taskModal.hide();
  };

  $scope.doRefresh = function(){
    $scope.$broadcast('scroll.refreshComplete');
    for(var i = 0; i < $scope.tasks.length; i++){
      if($scope.tasks[i].complete == true){
        $scope.removeTask(i);
      }
    }
  };

});