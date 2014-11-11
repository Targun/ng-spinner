var app = angular.module('myApp', []);


app.controller('mainCtrl', function($scope, mainService){

$scope.getData = function () {
        mainService.getData($scope.query).then(function (data) {
           return $scope.data = data;
        });
        $scope.query = '';
        //This clears the ng-model
    };
});



app.service('mainService', function($http){
	this.getData = function(artist) {
        return $http({'method': 'JSONP', 'url': 'https://itunes.apple.com/search?term=' + artist + '&callback=JSON_CALLBACK' })
            .then(function (data) {
                return data;
            });
    };
});

app.directive('pending', function($q){
	return {
		restrict: 'A',
		//Says where you can use the directive in the html

		scope: {
			request: '&'
			//request is the attribute name that you want to bind to inside the directive scope
		},


		link: function(scope, elem, attrs){
			// console.log(scope, elem, attrs);

			var spinner = angular.element("<button class='btn disabled'><i class='ion-loading-c'></i> Loading...</button>").hide();
			elem.after(spinner);

			var dynamicFunc = function(){
				var deferred = $q.defer();
				deferred.resolve(scope.request());

				return deferred.promise;
			};

			elem.click(function(){
				spinner.show();
				elem.hide();
				dynamicFunc()
					.then(function(data){
						setTimeout(function(){
							spinner.hide();
							elem.show();
						}, 1000);
					})
			});

		},
	}

});