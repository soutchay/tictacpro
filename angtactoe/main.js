var app = angular.module("myApp", []);

app.controller("BoxController", function ($scope){
	console.log('shit works');
	$scope.boxArray = 
	[{player: 0}, {player: 0}, {player: 0},
	 {player: 0}, {player: 0}, {player: 0},
	 {player: 0}, {player: 0}, {player: 0}];
	$scope.cellOnClick = function () {
		console.log("clicked " + this.cell.player);
	};

});