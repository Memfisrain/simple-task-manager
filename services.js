;(function() {
	"use strict";

	angular.module("myApp.services", [])
	  .factory('taskService', ['$interval', function($interval) {
	
			var tasks, timer;
	
			function init() {
				var storage = window.localStorage;
					
				if (storage["tasks"]) {
	
					tasks = JSON.parse(storage["tasks"]);
					
					tasks = tasks.filter(function(task) {
						if (task.expire - new Date <= 0) {
							return false;
						}
	
						return true;
					});
	
					if (tasks.length) {
						storage["tasks"] = JSON.stringify(tasks);
	
						timer = startTimer(); // save timer promise for further work
					} else {
						storage.removeItem("tasks");
					}
	
				} else {
					tasks = [];
				}
	
	
			}
	
			init();
	
			//definition of Task constructor and his prototype
			function Task(obj) {
				this.title = obj.title;
				this.description = obj.description || "";
				this.remaining = obj.remaining;
				this.expire = obj.expire;
				this.expired = false;
				this.id = obj.id;
	
				Task._init(this);
			}
	
			Task._init = function(task) {
				tasks.push(task);
				window.localStorage["tasks"] = JSON.stringify(tasks);
	
				if (!timer) {
					timer = startTimer();
				}
			}
	
	
			function startTimer() {
				var timer = $interval(function() {
					console.log("tick");
					tasks.forEach(function(task, i) {
						if (task.remaining <= 0) {
	
							task.expired = true;
							removeTask(task);
							return;
						}
	
						task.remaining = task.expire - new Date;
					});
				}, 1000);
	
				return timer;
			}
	
			function resetTimer() {
				$interval.cancel(timer);
				timer = null;
			}
			
	
			// exports methods
			function getTasks() {
				return tasks;
			}
	
			function removeTask(task) {
				var ind = tasks.indexOf(task);
	
				if (ind < 0) {
					return false;
				}
	
				tasks.splice(ind, 1);
	
				if(tasks.length) {
					window.localStorage["tasks"] = JSON.stringify(tasks);
				} else {
					resetTimer();
					window.localStorage.removeItem("tasks");
				}
			}
	
			function setExpireOfTask(task, time) {
				time = time || 0;
				task.expire += time;
	
				window.localStorage["tasks"] = JSON.stringify(tasks);
			}
	
			return {
				getTasks: getTasks,
				createTask: Task,
				removeTask: removeTask,
				setExpireOfTask: setExpireOfTask
			}
			
		}])
		.factory('setDefaultValues', function() {
	
			function setDefaultValues(scope) {
				var now = new Date, yy, mon, dd, hh, mins;
	
				now.setMinutes(now.getMinutes() + 10);
				now.setSeconds(0);
				now.setMilliseconds(0);
	
				yy = now.getFullYear();
				mon =  now.getMonth() + 1;
				dd = now.getDate();
				hh = now.getHours();
				mins = now.getMinutes();
	
	
				mon = mon.length < 2? "0" + mon : mon;
				dd = dd.length < 2? "0" + dd : dd;
				hh = hh.length < 2? "0" + hh : hh;
				mins = mins.length < 2? "0" + mins : mins;
				
				scope.date = now;
				scope.time = now;
				scope.title = "";
				scope.description = "";
			}
	
			return setDefaultValues;
	
		})
		.factory('makeDate', function() {
	
			function makeDate(date, time) {
				var yy = date.getFullYear(),
					mon = date.getMonth(),
					dd = date.getDate(),
					hh = time.getHours(),
					mins = time.getMinutes(),
					secs = new Date().getSeconds();
	
				return new Date(yy, mon, dd, hh, mins, secs);
			}
	
			return makeDate;
		});

})();