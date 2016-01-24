angular.module('tasks.list', [])

.controller('TasksCtrl', function($scope, $ionicModal) {
  // $scope.tasks = [];
    $scope.tasks = [{
      title: 'Test',
      due: 'Jan 5',
      priority: false
    }];
    console.log($scope.tasks);


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