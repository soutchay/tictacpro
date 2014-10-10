var app = angular.module("myApp", []);

app.controller("BoxController", function ($scope){
	console.log('shit works');
	$scope.boxArray = 
	[{player: 0}, {player: 0}, {player: 0},
	 {player: 0}, {player: 0}, {player: 0},
	 {player: 0}, {player: 0}, {player: 0}];
	//an array used to make the board
	console.log($scope.boxArray);
	$scope.turn = 0;
	$scope.cellOnClick = function () {
		console.log("clicked " + this.$index);
		$scope.turn ++;
		while (this.cell.player == 0) {
			if ($scope.turn % 2 == 0) {
				this.cell.player = 1;
				console.log(this.cell.player + " this is what it is");
			}
			else {
				this.cell.player = 2;
				console.log(this.cell.player + " this is what it is");
			};
		};
		//alternate between player 1 and player 2
	};
	$scope.cellOnHover = function () {
		console.log('shit');
		console.log(angular.srcElement);
		//  if (this.cell.player ==0) {
		// 		angular.element(e.srcElement).addClass('tHi');
		// }
	};
// 		    // return function(scope, element) {
//       //   element.bind('mouseenter', function(){
//       //       element.addClass('hover');
//       //   }).bind('mouseleave', function(){
//       //     element.removeClass('hover');
//       //   })
//     }
// })
// 	}

});
app.directive('myRotate', function($scope){
    return function( element) {
        element.bind('mouseenter', function(){
            element.addClass('rotatebox');
        }).bind('mouseleave', function(){
          element.removeClass('rotatebox');
        })
    }
});