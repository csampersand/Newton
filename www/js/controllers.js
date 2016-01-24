angular.module('tasks.list', [])

.controller('TasksCtrl', function($scope) {
  $scope.tasks = [
    { title: 'Task #', due: 'Jan 5' },
    { title: 'Task #', due: 'Jan 5' },
    { title: 'Task #', due: 'Jan 5' },
    { title: 'Task #', due: 'Jan 5' },
    { title: 'Task #', due: 'Jan 5' },
    { title: 'Task #', due: 'Jan 5' }
  ];
})
