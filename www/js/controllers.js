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
  $ionicModal.fromTemplateUrl('templates/tasks/new-task-form.html', function(modal) {
    $scope.taskModal = modal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });

  // Called when the form is submitted
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
    console.log($scope.tasks);
    $scope.taskModal.hide();
    task.title = "";
    task.due = "";
    task.priority = false;
    $localstorage.setObject('storage', {tasks: $scope.tasks});
  };

  $scope.removeTask = function(index) {
    $scope.tasks.splice(index, 1);
     $localstorage.setObject('storage', {tasks: $scope.tasks});
  }

  // Open our new task modal
  $scope.newTask = function() {
    $scope.taskModal.show();
  };

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