$(document).ready(function() {

	var eventsUrl = 'http://localhost:5555/events/',
		ajaxErrorMsg = 'There was an error retrieving events info. Please try again.',
		noResultsMsg = 'No events found. Please refine your filter criteria.',
		resultsPlaceholder = $('.js-events-placeholder'),
		savedFavorites = getFavorites(),
		filters = {
			festivalType: 'all',
			day: 'all',
			eventType: 'all',
			track: 'all'
		};

	function init() {
		getAjaxData(eventsUrl, renderEvent);

		bindEvents();
	};

	function bindEvents() {
		$(document).on('click', '.js-favorite-trigger', function(e) {
			e.preventDefault();
			toggleFavorite($(this));
		});
		$('.js-conference-filter').on('click', function(e) {
			e.preventDefault();
			$('.js-conference-filter').removeClass('is-active');
			$(this).addClass('is-active');
			filterEvents('festivalType', $(this).attr('data-conference'));
			$('.js-festival-title').text($(this).text());
		});
		$('.js-select-filter').on('change', function(e) {
			filterEvents($(this).attr('data-filter'), $(this).val());
		});
	};

	function getAjaxData(url, callback) {
		$.ajax({
			url: url,
		}).success(function(data) {
			if (data.length > 0) {
				callback(data);
			} else {
				renderError(noResultsMsg);
			}
		}).error(function() {
			renderError(ajaxErrorMsg);
		});
	};

	function filterEvents(filterType, value) {
		filters[filterType] = value;
		var queryStringArr = [];
		for (var filter in filters) {
			if ((filters.hasOwnProperty(filter)) && (filters[filter] !== 'all')) {
				queryStringArr.push(filter + '=' + filters[filter]);
			}
		}

		var url = eventsUrl + '?' + queryStringArr.join('&');
		getAjaxData(url, renderEvent);
	};

	function renderEvent(events) {
		var output = '';
		for (var i = 0; i < events.length; i++) {
			events[i]['favoritesTriggerClass'] = (savedFavorites.indexOf(events[i].id.toString()) !== -1) ? 'is-active' : '';
			output += tmpl('event_tmpl', events[i]);
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

	function toggleFavorite(triggerEl) {
		var eventId = $(triggerEl).closest('.event').attr('id');
		if (triggerEl.hasClass('is-active')) {
			triggerEl.removeClass('is-active');
			var index = savedFavorites.indexOf(eventId);
			if (index !== -1) {
				savedFavorites.splice(index, 1);
			}
		} else {
			triggerEl.addClass('is-active');
			if (savedFavorites.indexOf(eventId) === -1) {
				savedFavorites.push(eventId);
			}
		}
		localStorage.setItem('kickingsass_favorites', JSON.stringify(savedFavorites));
	};

	init();

});