angular.module('tasks.list', [])

.controller('TasksCtrl', function($scope, $ionicModal, $localstorage) {


  $scope.tasks = [];

  var setTasks = function(){
    var user = $localstorage.getObject('storage');
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
    if (task.id != null)
      $scope.updateTask(task);
    else
      $scope.createTask(task);
  };

  // Called if the task has no id
  $scope.createTask = function(task) {

    var temp = '';
    var date = task.due;
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
    } else {
      temp = date.toLocaleDateString();
    }


    $scope.tasks.push({
      title: task.title,
      due: temp,
      important: task.priority,
      complete: false,
    });
    $scope.taskModal.hide();
    task.title = "";
    task.due = "";
    task.priority = false;
    $localstorage.setObject('storage', {tasks: $scope.tasks});
  };

  $scope.removeTask = function(index) {
    $scope.tasks.splice(index, 1);
     $localstorage.setObject('storage', {tasks: $scope.tasks});
  };

  // Update task called if the task has an id
  $scope.updateTask = function(task) {
    $scope.tasks[task.id] = angular.copy(task);
    $localstorage.setObject('storage', {tasks: $scope.tasks});  
    $scope.taskModal.hide();
    console.log($scope.tasks);
    task.title = "";
    task.due = "";
    task.priority = false;
  };

  // Open our new task modal
  $scope.newTask = function() {
    $scope.taskModal.show();
  };

  // Edit our task
  $scope.editTask = function(task) {
    $scope.task = task;
    $scope.taskModal.show();
  }

  // Close the new task modal
  $scope.closeNewTask = function() {
    $scope.taskModal.hide();
  };

});