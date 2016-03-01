$(document).ready(function() {

	var eventsUrl = 'http://localhost:5555/events/',
		presentersUrl = 'http://localhost:5555/presenters/',
		noEventIdMsg = 'No event ID given in the URL.',
		ajaxErrorMsg = 'There was an error retrieving event info. Please try again.',
		resultsPlaceholder = $('.js-event-detail-placeholder'),
		eventId = getParameterByName('eventid', window.location);

	function init() {
		if ((eventId === null) || (eventId === '')) {
			renderError(noEventIdMsg);
		} else {
			getAjaxData(eventsUrl, renderEvent, eventId);
		}
	};

	function getAjaxData(url, callback, id) {
		var id = typeof id !== 'undefined' ? id : '';

		$.ajax({
			url: url + id,
		}).success(function(data) {
			callback(data);
		}).error(function() {
			renderError(ajaxErrorMsg);
		});
	};

	function renderEvent(data) {
		document.title = data.title + ' | SXSW';
		resultsPlaceholder.html(tmpl('event_detail_tmpl', data));
		if (data.presenterIds.length > 0) {
			renderPresenters(data.presenterIds);
		}
	};

	function renderPresenters(presenterIds) {
		var presentersPlaceholder = $('.js-presenters-placeholder');

		getAjaxData(presentersUrl, function(presenters) {
			var output = '';
			for (var i = 0; i < presenterIds.length; i++) {
				for (var j = 0; j < presenters.length; j++) {
					if (presenters[j].id === presenterIds[i]) {
						output += tmpl('presenter_tmpl', presenters[j]);
					}
				}
			}
			presentersPlaceholder.html(output);
		});
		
	};

	function renderError(msg) {
		resultsPlaceholder.html('<p>' + msg + '</p>');
	};

	function getParameterByName(name, url) {
	    if (!url) url = window.location.href;
	    name = name.replace(/[\[\]]/g, "\\$&");
	    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
	        results = regex.exec(url);
	    if (!results) return null;
	    if (!results[2]) return '';
	    return decodeURIComponent(results[2].replace(/\+/g, " "));
	};

	init();

});