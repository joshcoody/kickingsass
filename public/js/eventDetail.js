"use strict";

(function (document, window) {

	var eventsUrl = "http://localhost:5555/events/",
	    presentersUrl = "http://localhost:5555/presenters/",
	    noEventIdMsg = "No event ID given in the URL.",
	    ajaxErrorMsg = "There was an error retrieving event info. Please try again.",
	    resultsPlaceholder = document.querySelector(".js-event-detail-placeholder"),
	    eventId = getParameterByName("eventid", window.location);

	function init() {
		if (eventId === null || eventId === "") {
			renderError(noEventIdMsg);
		} else {
			getAjaxData(eventsUrl, renderEvent, eventId);
		}
	};

	function getAjaxData(url, callback, id) {
		var id = typeof id !== "undefined" ? id : "",
		    request = new XMLHttpRequest();
		request.open("GET", url + id, true);

		request.onload = function () {
			if (request.status >= 200 && request.status < 400) {
				var data = JSON.parse(request.responseText);
				if (data) {
					callback(data);
				} else {
					renderError(ajaxErrorMsg);
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

	function renderEvent(data) {
		window.title = data.title + " | SXSW";
		emptyElement(resultsPlaceholder);
		var output = "<section class=\"event-detail\">\n\t\t\t<header class=\"event-detail__header\">\n\t\t\t\t<h2>" + data.title + "</h2>\n\t\t\t\t<ul class=\"event__festival-types\">\n\t\t\t\t\t<li class=\"event__festival-type event__festival-type--" + data.festivalType + "\">" + data.festivalType + "</li>\n\t\t\t\t</ul>\n\t\t\t</header>\n\t\t\t<article class=\"event-detail__article\">\n\t\t\t\t<div class=\"event-detail__meta-wrapper\">\n\t\t\t\t\t<div class=\"event-detail__meta-column\">\n\t\t\t\t\t\t<strong>" + data.date + "</strong><br>\n\t\t\t\t\t\t" + data.time + "\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"event-detail__meta-column\">\n\t\t\t\t\t\t<a href=\"#\">" + data.location1 + "</a><br>\n\t\t\t\t\t\t" + (data.location2 ? "<strong>" + data.location2 + "</strong>" : "") + "\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"event-detail__meta-column\">\n\t\t\t\t\t\t<ul class=\"event-detail__meta-social\">\n\t\t\t\t\t\t\t<li><a class=\"event-detail__social event-detail__social--twitter icon--twitter\" href=\"#\"><span>Twitter</span></a></li>\n\t\t\t\t\t\t\t<li><a class=\"event-detail__social event-detail__social--facebook icon--facebook\" href=\"#\"><span>Facebook</span></a></li>\n\t\t\t\t\t\t</ul>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t" + (data.image ? "<img src=\"" + data.image + "\" alt=\"" + data.title + "\">" : "") + "\n\t\t\t\t<div class=\"event-detail__article-description\">\n\t\t\t\t\t<p>" + data.description + "</p>\n\t\t\t\t</div>\n\t\t\t\t" + renderHashtags(data.hashtags) + "\n\t\t\t\t<div class=\"presenters\">\n\t\t\t\t\t<div class=\"js-presenters-placeholder\"></div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"details\">\n\t\t\t\t\t<h2 class=\"section__heading\">Details</h2>\n\t\t\t\t\t<dl>\n\t\t\t\t\t\t<dt>Access</dt>\n\t\t\t\t\t\t<dd>" + (data.access ? "" + data.access : "") + "</dd>\n\t\t\t\t\t</dl>\n\t\t\t\t\t<dl>\n\t\t\t\t\t\t<dt>Format</dt>\n\t\t\t\t\t\t<dd>" + (data.format ? "" + data.format : "") + "</dd>\n\t\t\t\t\t</dl>\n\t\t\t\t\t<dl>\n\t\t\t\t\t\t<dt>Event Type</dt>\n\t\t\t\t\t\t<dd>" + (data.eventTypeDisplay ? "" + data.eventTypeDisplay : "") + "</dd>\n\t\t\t\t\t</dl>\n\t\t\t\t\t<dl>\n\t\t\t\t\t\t<dt>Track</dt>\n\t\t\t\t\t\t<dd>" + (data.trackDisplay ? "" + data.trackDisplay : "") + "</dd>\n\t\t\t\t\t</dl>\n\t\t\t\t\t<dl>\n\t\t\t\t\t\t<dt>Level</dt>\n\t\t\t\t\t\t<dd>" + (data.level ? "" + data.level : "") + "</dd>\n\t\t\t\t\t</dl>\n\t\t\t\t\t<dl>\n\t\t\t\t\t\t<dt>Online</dt>\n\t\t\t\t\t\t<dd>" + (data.slides ? "<a href=\"" + data.slides + "\" target=\"_blank\">" + data.slides + "</a>" : "") + "</dd>\n\t\t\t\t\t</dl>\n\t\t\t\t\t<dl>\n\t\t\t\t\t\t<dt>Tags</dt>\n\t\t\t\t\t\t<dd>" + renderTags(data.tags) + "</dd>\n\t\t\t\t\t</dl>\n\t\t\t\t</div>\n\t\t\t</article>\n\t\t\t<aside class=\"event-detail__sidebar\">\n\t\t\t\t<a class=\"button\" href=\"#\">Venue Info</a>\n\t\t\t\t<img src=\"https://maps.googleapis.com/maps/api/staticmap?center=Austin+Convention+Center,+Austin,+TX&size=272x272&key=AIzaSyAfvjwI0468ef7YizCbnfreOx_LjUUercU\" alt=\"Venue\">\n\t\t\t\t<a class=\"button button--blue\" href=\"#\">Find Food Nearby</a>\n\t\t\t\t<a class=\"button button--blue\" href=\"#\">Find Drinks Nearby</a>\n\t\t\t</aside>\n\t\t</section>";
		resultsPlaceholder.insertAdjacentHTML("afterbegin", output);
		if (data.presenterIds.length > 0) {
			renderPresenters(data.presenterIds);
		}
	};

	function renderPresenters(presenterIds) {
		var presentersPlaceholder = document.querySelector(".js-presenters-placeholder");
		getAjaxData(presentersUrl, function (presenters) {
			var output = "<h2 class=\"section__heading\">Presenters</h2>";
			presenterIds.forEach(function (presenterId, i) {
				presenters.forEach(function (presenter, j) {
					if (presenter.id === presenterId) {
						output += "<div class=\"presenter\">\n\t\t\t\t\t\t\t" + (presenter.image ? "<img class=\"presenter__image\" src=\"" + presenter.image + "\" alt=\"" + presenter.name + "\">" : "") + "\n\t\t\t\t\t\t\t<div class=\"presenter__content\">\n\t\t\t\t\t\t\t\t" + (presenter.name ? "<h2 class=\"presenter__name\">" + presenter.name + "</h2>" : "") + "\n\t\t\t\t\t\t\t\t" + (presenter.title ? "<h3 class=\"presenter__title\">" + presenter.title + "</h3>" : "") + "\n\t\t\t\t\t\t\t\t" + (presenter.company ? "<h4 class=\"presenter__location\">" + presenter.company + "</h4>" : "") + "\n\t\t\t\t\t\t\t\t" + (presenter.description ? "<p class=\"presenter__description\">" + presenter.description + "</p>" : "") + "\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>";
					}
				});
			});
			presentersPlaceholder.insertAdjacentHTML("afterbegin", output);
		});
	};

	function renderHashtags(hashtags) {
		var output = "";
		if (hashtags !== null && hashtags.length > 0) {
			output += "<p class=\"event-detail__tags\"><strong>Hashtags:</strong> ";
			hashtags.forEach(function (hashtag) {
				output += "#" + hashtag + " ";
			});
			output += "</p>";
		}
		return output;
	};

	function renderTags(tags) {
		var output = "";
		if (tags !== null && tags.length > 0) {
			output = tags.join(" ");
		}
		return output;
	}

	function renderError(msg) {
		emptyElement(resultsPlaceholder);
		resultsPlaceholder.insertAdjacentHTML("afterbegin", "<p>" + msg + "</p>");
	};

	function emptyElement(parentEl) {
		while (parentEl.firstChild) {
			parentEl.removeChild(parentEl.firstChild);
		}
	};

	function getParameterByName(name, url) {
		if (!url) url = window.location.href;
		name = name.replace(/[\[\]]/g, "\\$&");
		var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
		    results = regex.exec(url);
		if (!results) {
			return null;
		}if (!results[2]) {
			return "";
		}return decodeURIComponent(results[2].replace(/\+/g, " "));
	};

	init();
})(document, window);