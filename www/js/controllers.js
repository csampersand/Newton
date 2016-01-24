angular.module('tasks.list', [])

.controller('TasksCtrl', function($scope, $ionicModal, $localstorage) {


  $scope.tasks = [
    {'id': 0, 'due': 'Monday', 'title': 'Assignment', 'complete': false, 'important': true}
  ];

  var fish = function(){
    var user = $localstorage.getObject('storage');
    $scope.tasks = user.tasks;

    console.log($localstorage.getObject('storage'));
  }

  fish();
  

  // toggle modal being complete
  $scope.toggleComplete = function(task) {
      task.complete = !task.complete;
  };


  // Create and load the Modal
  $ionicModal.fromTemplateUrl('templates/tasks/new-task-form.html', function(modal) {
    $scope.taskModal = modal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });

  // Called when the form is submitted
  $scope.createTask = function(task) {
    $scope.tasks.push({
      title: task.title,
      due: task.due,
      priority: task.priority
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
  };

  // Open our new task modal
  $scope.newTask = function() {
    $scope.taskModal.show();
  };

  // Close the new task modal
  $scope.closeNewTask = function() {
    $scope.taskModal.hide();
  };

});