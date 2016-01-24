angular.module('canvas.connect', [])

.config(function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.withCredentials = true;
    delete $httpProvider.defaults.headers.common["X-Requested-With"];
    $httpProvider.defaults.headers.common["Accept"] = "application/json";
    $httpProvider.defaults.headers.common["Content-Type"] = "application/json";
})

.controller('ConnectCtrl', function($scope, $http) {
    $scope.connect = function(token) {
        console.log('fag');
        $http.get('https://canvas.instructure.com/api/v1/courses?access_token=' + token)
            .then(function(response) {
                console.log(response);
            });
    };
});

// curl -H "Authorization: Bearer <ACCESS-TOKEN>" https://canvas.instructure.com/api/v1/courses
// GET /api/v1/courses/:course_id/assignments