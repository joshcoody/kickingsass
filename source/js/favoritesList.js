import domUtils from "domUtils";

let favoritesList = function() {

	let eventsUrl = 'http://localhost:5555/events/',
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
		let request = new XMLHttpRequest();
		request.open('GET', url, true);

		request.onload = function() {
			if (request.status >= 200 && request.status < 400) {
				let data = JSON.parse(request.responseText);
				if (data.length > 0) {
					callback(data);
				} else {
					renderError(noResultsMsg);
				}
			} else {
				renderError(ajaxErrorMsg);
			}
		};

		request.onerror = function() {
			renderError(ajaxErrorMsg);
		};

		request.send();
	};

	function renderEvent(events) {
		let output = '';
		events.forEach(function(event, i) {
			if (savedFavorites.indexOf(event.id.toString()) !== -1) {
				output += `<div class="event" id="${event.id}">
					<div class="event__column">
						<div class="event__favorite-trigger icon--star is-active"><span>Favorite</span></div>
						<a class="event__name" href="event-detail.html?eventid=${event.id}">${event.title}</a>
						<ul class="event__festival-types">
							<li class="event__festival-type event__festival-type--${event.festivalType}">${event.festivalType}</li>
						</ul>
					</div>
					<div class="event__column">
						<ul class="event__types">
							<li class="event__types--type">${event.eventTypeDisplay}</li>
							<li class="event__types--format"><a href="#">${event.format}</a></li>
							<li class="event__types--category">${event.trackDisplay}</li>
						</ul>
					</div>
					<div class="event__column">
						<ul class="event__location">
							<li><a href="#">${event.location1}</a></li>
							<li><strong>${event.location2}</strong></li>
						</ul>
					</div>
					<div class="event__column">
						<div class="event__date">${event.date}</div>
						<div class="event__time">${event.time}</div>
					</div>
				</div>`;
			}
		});
		domUtils.emptyElement(resultsPlaceholder);
		resultsPlaceholder.insertAdjacentHTML('afterbegin', output);
	};

	function renderError(msg) {
		domUtils.emptyElement(resultsPlaceholder);
		resultsPlaceholder.insertAdjacentHTML('afterbegin', `<p>${msg}</p>`);
	};

	function getFavorites() {
		let output = [],
			faves = localStorage.getItem('kickingsass_favorites');
		if (faves !== null) {
			output = JSON.parse(faves);
		}
		return output;
	};

	init();

};

export default favoritesList;