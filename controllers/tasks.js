angular.module('tasks.list', []).controller('TasksCtrl', function($scope, $ionicModal, $localstorage, $ionicListDelegate, $http) {
    $scope.tasks = [];
    var setTasks = function() {
        var user = $localstorage.getObject('storage');
        if (user.tasks != undefined) $scope.tasks = user.tasks;
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
        if ($scope.updating) {
            $scope.updateTask(task);
        } else $scope.createTask(task);
    };
    $scope.convert = function(day) {
        var temp = '';
        var date = new Date(day);
        var today = new Date();
        var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        if (date.getTime() < today.getTime() + 7 * 24 * 60 * 60 * 1000 && date.getTime() > today.getTime()) {
            temp = weekday[date.getDay()];
        } else {
            temp = date.toLocaleDateString();
        }
        return temp;
    }
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
        $localstorage.setObject('storage', {
            tasks: $scope.tasks
        });
    };
    $scope.removeTask = function(task) {
        $ionicListDelegate.closeOptionButtons();
        var oldTasks = $scope.tasks;
        $scope.tasks = [];
        angular.forEach(oldTasks, function(oldTask) {
            if (oldTask != task) $scope.tasks.push(oldTask);
        });
        $localstorage.setObject('storage', {
            tasks: $scope.tasks
        });
    };
    // Update task called if the task has an id
    $scope.updateTask = function(task) {
        $localstorage.setObject('storage', {
            tasks: $scope.tasks
        });
        $scope.taskModal.hide();
        $scope.task = angular.copy(task);
        $scope.task.title = "";
        $scope.task.due = "";
        $scope.task.important = false;
    };
    // Open our new task modal
    $scope.newTask = function() {
        $scope.updating = false;
        $scope.taskModal.show();
    };
    // Edit our task
    $scope.editTask = function(task) {
        $scope.updating = true;
        $ionicListDelegate.closeOptionButtons();
        $scope.task = task;
        $scope.task.due = new Date(task.due);
        $scope.taskModal.show();
    }
    // Close the new task modal
    $scope.closeNewTask = function() {
        $scope.taskModal.hide();
    };
    $scope.doRefresh = function() {
        $scope.$broadcast('scroll.refreshComplete');
        var oldTasks = $scope.tasks;
        $scope.tasks = [];
        angular.forEach(oldTasks, function(task) {
            if (!task.complete) $scope.tasks.push(task);
        });
        $localstorage.setObject('storage', {
            tasks: $scope.tasks
        });
    };
});