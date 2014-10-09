var boxapp = angular.module("boxApp", []);

boxapp.controller("BoxController", function($scope) {
	$scope.spinaround = function() {
		$scope.spinning = "rotatebox";
	};
	$scope.normalize = function() {
		$scope.spinning = "box";
	};
});
