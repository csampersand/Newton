angular.module('tasks.list', [])

.controller('TasksCtrl', function($scope, $ionicModal) {
  $scope.tasks = [
    {'id': 0, 'due': '', 'title': 'Assignment', 'complete': false, 'important': true}
  ];

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
    $scope.tasks.push({
      title: task.title,
      due: task.due,
      important: task.priority,
      complete: false,
    });
    $scope.taskModal.hide();
    task.title = "";
    task.due = "";
    task.priority = false;
  };

  // Update task called if the task has an id
  $scope.updateTask = function(task) {
    $scope.tasks[task.id] = angular.copy(task);
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