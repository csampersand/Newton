angular.module('tasks.list', [])

.controller('TasksCtrl', function($scope) {
  $scope.tasks = [
    {'id': 0, 'due': 'Monday', 'title': 'Assignment', 'complete': false, 'important': true}
  ];

  $scope.toggleComplete = function(index) {
    
    if($scope.tasks[index].complete == true)
      $scope.tasks[index].complete = false;
    else
       $scope.tasks[index].complete = true;

  }


});