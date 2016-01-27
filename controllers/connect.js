angular.module('canvas.connect', ['tasks.list'])

.controller('ConnectCtrl', function($scope, $http, canvasApiEndpoint) {
    $scope.courses = [];
    $scope.assignments = [];
    $scope.today = new Date();
    $scope.connect = function(token) {

        // Get course ids
        $http.get(canvasApiEndpoint.url + '/courses', 
        {
            params: {
                access_token: token,
                enrollment_type: 'student',
                state: 'available'
            }
        })
        .then(function(response) {
            angular.forEach(response.data, function(course) {
                $scope.courses.push(course);
            });
            
            // Get assignments for each course
            angular.forEach($scope.courses, function(course) {
                $http.get(canvasApiEndpoint.url + '/courses/' + course.id + '/assignments', 
                {
                    params: {
                        access_token: token,
                        enrollment_type: 'student',
                        state: 'upcoming'
                    }
                })
                .then(function(response) {
                    angular.forEach(response.data, function(assignment) {
                        var due_at = new Date(assignment.due_at);
                        if (due_at > $scope.today) {
                            $scope.assignments.push(assignment);

                            // Temporary, get off your lazy ass and set up a ui
                            var task = {
                                title: assignment.name,
                                due: assignment.due_at,
                                important: false,
                                complete: false
                            };
                            $scope.createTask(task);

                        }
                    });
                });
            });
        });

    }
});

// curl -H "Authorization: Bearer <ACCESS-TOKEN>" https://canvas.instructure.com/api/v1/courses
// GET /api/v1/courses/:course_id/assignments