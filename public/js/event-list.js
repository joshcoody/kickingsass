"use strict";

(function (document, window) {

	var eventsUrl = "http://localhost:5555/events/",
	    ajaxErrorMsg = "There was an error retrieving events info. Please try again.",
	    noResultsMsg = "No events found. Please refine your filter criteria.",
	    resultsPlaceholder = document.querySelector(".js-events-placeholder"),
	    savedFavorites = getFavorites(),
	    filters = {
		festivalType: "all",
		day: "all",
		eventType: "all",
		track: "all"
	};

	function init() {
		getAjaxData(eventsUrl, renderEvent);

		bindEvents();
	};

	function bindEvents() {
		document.addEventListener("click", function (e) {
			var clickedEl = e.target;
			if (isDescendentByClass("js-favorite-trigger", e.target) !== false) {
				e.preventDefault();
				toggleFavorite(clickedEl);
			}
		});

		var conferenceFilterEls = Array.prototype.slice.call(document.querySelectorAll(".js-conference-filter"));
		conferenceFilterEls.forEach(function (el) {
			el.addEventListener("click", function (e) {
				e.preventDefault();
				conferenceFilterEls.forEach(function (filterEl) {
					filterEl.classList.remove("is-active");
				});
				el.classList.add("is-active");
				filterEvents("festivalType", el.getAttribute("data-conference"));
				document.querySelector(".js-festival-title").textContent = el.textContent;
			});
		});

		var selectTriggerEls = Array.prototype.slice.call(document.querySelectorAll(".js-select-filter"));
		selectTriggerEls.forEach(function (el) {
			el.addEventListener("change", function () {
				filterEvents(el.getAttribute("data-filter"), el.value);
			});
		});
	};

	function getAjaxData(url, callback) {
		var request = new XMLHttpRequest();
		request.open("GET", url, true);

		request.onload = function () {
			if (request.status >= 200 && request.status < 400) {
				var data = JSON.parse(request.responseText);
				if (data.length > 0) {
					callback(data);
				} else {
					renderError(noResultsMsg);
				}
			} else {
				renderError(ajaxErrorMsg);
			}
		};

		request.onerror = function () {
			renderError(ajaxErrorMsg);
		};

		request.send();
	};

	function renderEvent(events) {
		var output = "";
		events.forEach(function (event, i) {
			event.favoritesTriggerClass = savedFavorites.indexOf(events[i].id.toString()) !== -1 ? "is-active" : "";
			output += "<div class=\"event\" id=\"" + event.id + "\">\n\t\t\t\t<div class=\"event__column\">\n\t\t\t\t\t<a class=\"event__favorite-trigger icon--star js-favorite-trigger " + event.favoritesTriggerClass + "\" href=\"#\"><span>Favorite</span></a>\n\t\t\t\t\t<a class=\"event__name\" href=\"event-detail.html?eventid=" + event.id + "\">" + event.title + "</a>\n\t\t\t\t\t<ul class=\"event__festival-types\">\n\t\t\t\t\t\t<li class=\"event__festival-type event__festival-type--" + event.festivalType + "\">" + event.festivalType + "</li>\n\t\t\t\t\t</ul>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"event__column\">\n\t\t\t\t\t<ul class=\"event__types\">\n\t\t\t\t\t\t" + (event.eventTypeDisplay ? "<li class=\"event__types--type\">" + event.eventTypeDisplay + "</li>" : "") + "\n\t\t\t\t\t\t" + (event.format ? "<li class=\"event__types--format\"><a href=\"#\">" + event.format + "</a></li>" : "") + "\n\t\t\t\t\t\t" + (event.trackDisplay ? "<li class=\"event__types--category\">" + event.trackDisplay + "</li>" : "") + "\n\t\t\t\t\t</ul>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"event__column\">\n\t\t\t\t\t<ul class=\"event__location\">\n\t\t\t\t\t\t<li><a href=\"#\">" + event.location1 + "</a></li>\n\t\t\t\t\t\t<li><strong>" + event.location2 + "</strong></li>\n\t\t\t\t\t</ul>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"event__column\">\n\t\t\t\t\t<div class=\"event__date\">" + event.date + "</div>\n\t\t\t\t\t<div class=\"event__time\">" + event.time + "</div>\n\t\t\t\t</div>\n\t\t\t</div>";
		});
		emptyElement(resultsPlaceholder);
		resultsPlaceholder.insertAdjacentHTML("afterbegin", output);
	};

	function filterEvents(filterType, value) {
		filters[filterType] = value;
		var queryStringArr = [];
		for (var filter in filters) {
			if (filters.hasOwnProperty(filter) && filters[filter] !== "all") {
				queryStringArr.push(filter + "=" + filters[filter]);
			}
		}
		var url = eventsUrl + "?" + queryStringArr.join("&");
		getAjaxData(url, renderEvent);
	};

	function renderError(msg) {
		emptyElement(resultsPlaceholder);
		resultsPlaceholder.insertAdjacentHTML("afterbegin", "<p>" + msg + "</p>");
	};

	function getFavorites() {
		var output = [],
		    faves = localStorage.getItem("kickingsass_favorites");
		if (faves !== null) {
			output = JSON.parse(faves);
		}
		return output;
	};

	function toggleFavorite(triggerEl) {
		var eventEl = triggerEl.parentNode.parentNode,
		    eventId = eventEl.getAttribute("id");
		if (triggerEl.classList.contains("is-active")) {
			triggerEl.classList.remove("is-active");
			var index = savedFavorites.indexOf(eventId);
			if (index !== -1) {
				savedFavorites.splice(index, 1);
			}
		} else {
			triggerEl.classList.add("is-active");
			if (savedFavorites.indexOf(eventId) === -1) {
				savedFavorites.push(eventId);
			}
		}
		localStorage.setItem("kickingsass_favorites", JSON.stringify(savedFavorites));
	};

	function emptyElement(parentEl) {
		while (parentEl.firstChild) {
			parentEl.removeChild(parentEl.firstChild);
		}
	};

	function isDescendentByClass(parentClass, el) {
		if (el.classList.contains(parentClass)) {
			return el;
		}
		var node = el.parentNode;
		while (node != null) {
			if (typeof node.classList !== "undefined" && node.classList.contains(parentClass)) {
				return node;
			}
			node = node.parentNode;
		}
		return false;
	};

	init();
})(document, window);