;(function() {
	"use strict";

	angular.module('myApp.filters', [])
		.filter('dateConverter', function() {

			function converter(ms) {
				if (!ms) {
					return "";
				}

				var seconds = ms / 1000;

				var hours = "" + parseInt(seconds / 3600);
				seconds = seconds % 3600;

				var minutes = "" + parseInt(seconds / 60);
				seconds = "" + parseInt(seconds % 60);

				hours = hours.length < 2? "0" + hours : hours;
				minutes = minutes.length < 2? "0" + minutes : minutes;
				seconds = seconds.length < 2? "0" + seconds : seconds;

				return `${hours}:${minutes}:${seconds}`;
			};

			return converter;

		});
	})();
	
