System.register('favoritesList.js', [], function (_export) {
	'use strict';

	var favoritesList;
	return {
		setters: [],
		execute: function () {
			favoritesList = function favoritesList() {

				var eventsUrl = 'http://localhost:5555/events/',
				    ajaxErrorMsg = 'There was an error retrieving events info. Please try again.',
				    noResultsMsg = 'No favorites found. Return to the <a href="index.html">full events list</a>.',
				    resultsPlaceholder = document.querySelector('.js-events-placeholder'),
				    savedFavorites = getFavorites();

				function init() {
					if (savedFavorites.length > 0) {
						getAjaxData(eventsUrl, renderEvent);
					} else {
						renderError(noResultsMsg);
					}
				};

				function getAjaxData(url, callback) {
					var request = new XMLHttpRequest();
					request.open('GET', url, true);

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
					var output = '';
					events.forEach(function (event, i) {
						if (savedFavorites.indexOf(event.id.toString()) !== -1) {
							output += '<div class="event" id="' + event.id + '">\n\t\t\t\t\t<div class="event__column">\n\t\t\t\t\t\t<div class="event__favorite-trigger icon--star is-active"><span>Favorite</span></div>\n\t\t\t\t\t\t<a class="event__name" href="event-detail.html?eventid=' + event.id + '">' + event.title + '</a>\n\t\t\t\t\t\t<ul class="event__festival-types">\n\t\t\t\t\t\t\t<li class="event__festival-type event__festival-type--' + event.festivalType + '">' + event.festivalType + '</li>\n\t\t\t\t\t\t</ul>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="event__column">\n\t\t\t\t\t\t<ul class="event__types">\n\t\t\t\t\t\t\t<li class="event__types--type">' + event.eventTypeDisplay + '</li>\n\t\t\t\t\t\t\t<li class="event__types--format"><a href="#">' + event.format + '</a></li>\n\t\t\t\t\t\t\t<li class="event__types--category">' + event.trackDisplay + '</li>\n\t\t\t\t\t\t</ul>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="event__column">\n\t\t\t\t\t\t<ul class="event__location">\n\t\t\t\t\t\t\t<li><a href="#">' + event.location1 + '</a></li>\n\t\t\t\t\t\t\t<li><strong>' + event.location2 + '</strong></li>\n\t\t\t\t\t\t</ul>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="event__column">\n\t\t\t\t\t\t<div class="event__date">' + event.date + '</div>\n\t\t\t\t\t\t<div class="event__time">' + event.time + '</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>';
						}
					});
					emptyElement(resultsPlaceholder);
					resultsPlaceholder.insertAdjacentHTML('afterbegin', output);
				};

				function renderError(msg) {
					emptyElement(resultsPlaceholder);
					resultsPlaceholder.insertAdjacentHTML('afterbegin', '<p>' + msg + '</p>');
				};

				function getFavorites() {
					var output = [],
					    faves = localStorage.getItem('kickingsass_favorites');
					if (faves !== null) {
						output = JSON.parse(faves);
					}
					return output;
				};

				function emptyElement(parentEl) {
					while (parentEl.firstChild) {
						parentEl.removeChild(parentEl.firstChild);
					}
				};

				init();
			};

			_export('default', favoritesList);
		}
	};
});

System.register("favorites.js", ["favoritesList.js"], function (_export) {
  "use strict";

  var favoritesList;
  return {
    setters: [function (_favoritesListJs) {
      favoritesList = _favoritesListJs["default"];
    }],
    execute: function () {

      favoritesList();
    }
  };
});
