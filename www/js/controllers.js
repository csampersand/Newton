angular.module('tasks.list', [])

.controller('TasksCtrl', function($scope) {
  $scope.tasks = [
    { id: 1, title: 'Task #', due: 'Jan 5', complete: 0 },
    { id: 2, title: 'Task #', due: 'Jan 5', complete: 0 },
    { id: 3, title: 'Task #', due: 'Jan 5', complete: 0 },
    { id: 4, title: 'Task #', due: 'Jan 5', complete: 0 },
    { id: 5, title: 'Task #', due: 'Jan 5', complete: 0 },
    { id: 6, title: 'Task #', due: 'Jan 5', complete: 0 }
  ];
})
