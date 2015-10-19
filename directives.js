;(function() {
	"use strict";

	angular.module("myApp.directives", [])
		.directive('myTooltip', function(){
			// Runs during compile
			return {
				restrict: "A",
				scope: {
					text: "@tooltipText"
				},
				link: function($scope, iElm, iAttrs, controller) {
	
					var elem = iElm[0],
						text = $scope.text,
						tooltip;
	
					if (!text) return;
	
					addEventHandlers();
	
					function createTooltip(text) {
						var tooltip = document.createElement("span");
						tooltip.textContent = text;
						tooltip.className = "my-tooltip";
						return tooltip;
					}
	
					function onMouseOver(e) {
						var scrollTop = window.pageYOffset || document.documentElement.scrollTop,
						 	elemCoords = elem.getBoundingClientRect();
	
						tooltip = createTooltip(text);
						document.body.appendChild(tooltip);
	
						tooltip.style.top = elemCoords.top + scrollTop - tooltip.offsetHeight + "px";
						tooltip.style.left = elemCoords.left - tooltip.offsetWidth / 2 + elem.offsetWidth / 2 + "px";		
					}
	
					function onMouseOut() {
						document.body.removeChild(tooltip);
					}
	
	
					function addEventHandlers() {
						elem.addEventListener("mouseover", onMouseOver, false);
						elem.addEventListener("mouseout", onMouseOut, false);
					}
	
					function removeEventHandlers() {
						elem.removeEventListener("mouseover", onMouseOver, false);
						elem.removeEventListener("mouseout", onMouseOut, false);
					}
	
					iElm.on("$destroy", function() {
						removeEventHandlers();
					});
	
				}
			};
		})

})();