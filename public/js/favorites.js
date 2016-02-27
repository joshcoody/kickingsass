$(document).ready(function() {

	var eventsUrl = 'http://localhost:5555/events/',
		ajaxErrorMsg = 'There was an error retrieving events info. Please try again.',
		noResultsMsg = 'No favorites found. Return to the <a href="index.html">full events list</a>.',
		resultsPlaceholder = $('.js-events-placeholder'),
		savedFavorites = getFavorites();

	function init() {
		if (savedFavorites.length > 0) {
			getAjaxData(eventsUrl, renderEvent);
		} else {
			renderError(noResultsMsg);
		}
	};

	function getAjaxData(url, callback) {
		$.ajax({
			url: url,
		}).success(function(data) {
			callback(data);
		}).error(function() {
			renderError(ajaxErrorMsg);
		});
	};

	function renderEvent(events) {
		var output = '';
		for (var i = 0; i < events.length; i++) {
			if (savedFavorites.indexOf(events[i]['id'].toString()) !== -1) {
				output += tmpl('event_tmpl', events[i]);
			}
		}
		resultsPlaceholder.html(output);
	};

	function renderError(msg) {
		resultsPlaceholder.html('<p>' + msg + '</p>');
	};

	function getFavorites() {
		var output = [],
			faves = localStorage.getItem('kickingsass_favorites');
		if (faves !== null) {
			output = JSON.parse(faves);
		}
		return output;
	};

	init();

});