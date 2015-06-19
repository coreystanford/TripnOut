"use strict";
// http://jsfiddle.net/ftfish/KyEr3/
//Directive for adding section on click
tripnoutApp.directive("addsection", function($compile){
	return function(scope, element, attrs) {

		element.bind("click", function(){

			if(!scope.count){scope.count = 0;}

			switch(attrs.datatype) {

				case "text":
					// add a text field
					angular.element(document.getElementById('content'))
					.append(
		                $compile("<div class='section'><input type='text' ng-model='tripdata.content["+scope.count+"].datatype' value='text'><textarea ng-model='tripdata.content["+scope.count+"].content'></textarea></div>")(scope)
		            );
				break;

				case "image":
					// upload an image with flow.js
					angular.element(document.getElementById('content'))
					.append(
		                $compile(
	                        "<div class='section'><input type='text' ng-model='tripdata.content["+scope.count+"].datatype' value='image'><input type='file' ng-model='tripdata.content["+scope.count+"].content'></div>")(scope)
		            );
				break;

				case "video":
					// embed a Youtube video
					angular.element(document.getElementById('content'))
					.append(
		                $compile(
	                        "<div class='section'><input type='text' ng-model='tripdata.content["+scope.count+"].datatype' value='image'><input type='text' ng-model='tripdata.content["+scope.count+"].content'></div>")(scope)
		            );
				break;

			}
		
			scope.count++;

		});
	}

});