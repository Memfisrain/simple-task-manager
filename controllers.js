;(function() {
	"use strict";

	angular.module('myApp.controllers', [
		"myApp.services"
	])
		.controller('MyCtrl', ['$scope', '$interval', 'taskService', 'setDefaultValues', 'makeDate', function($scope, $interval ,taskService, setDefaultValues, makeDate){
			
			//inception
			var additionalTime = 600000; // 10 min in milliseconds
			setDefaultValues($scope);

			function addTask(e) {
				var date, remaining, expire, id, obj, task;

				if (!$scope.title || !$scope.date || !$scope.time) {
					return false;
				}

				date = makeDate($scope.date, $scope.time);

				if (date - new Date <= 0) {
					return false;
				}

				remaining = new Date(date - new Date()).getTime(),
				expire = date.getTime();
				id = ( "" + Math.random() ).slice(2);

				obj = {
					title: $scope.title,
					description: $scope.description,
					remaining: remaining,
					expire: expire,
					id: id
				};

				task = new taskService.createTask(obj);

				// set default scope values (e.g title, date, time)
				setDefaultValues($scope);
			}

			function addTimeToTask(task) {
				taskService.setExpireOfTask(task, additionalTime);
			}

			$scope.tasks = taskService.getTasks();
			$scope.removeTask = taskService.removeTask;
			$scope.addTask = addTask;
			$scope.addTimeToTask = addTimeToTask;
			
		}]);
})()