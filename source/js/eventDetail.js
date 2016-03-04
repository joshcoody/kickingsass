import urlUtils from "urlUtils";
import domUtils from "domUtils";

let eventDetail = function() {

	let eventsUrl = 'http://localhost:5555/events/',
		presentersUrl = 'http://localhost:5555/presenters/',
		noEventIdMsg = 'No event ID given in the URL.',
		ajaxErrorMsg = 'There was an error retrieving event info. Please try again.',
		resultsPlaceholder = document.querySelector('.js-event-detail-placeholder'),
		eventId = urlUtils.getParameterByName('eventid', window.location);

	function init() {
		if ((eventId === null) || (eventId === '')) {
			renderError(noEventIdMsg);
		} else {
			getAjaxData(eventsUrl, renderEvent, eventId);
		}
	};

	function getAjaxData(url, callback, id = '') {
		let request = new XMLHttpRequest();
		request.open('GET', url + id, true);

		request.onload = function() {
			if (request.status >= 200 && request.status < 400) {
				let data = JSON.parse(request.responseText);
				if (data) {
					callback(data);
				} else {
					renderError(ajaxErrorMsg);
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

	function renderEvent(data) {
		window.title = data.title + ' | SXSW';
		domUtils.emptyElement(resultsPlaceholder);
		let output = `<section class="event-detail">
			<header class="event-detail__header">
				<h2>${data.title}</h2>
				<ul class="event__festival-types">
					<li class="event__festival-type event__festival-type--${data.festivalType}">${data.festivalType}</li>
				</ul>
			</header>
			<article class="event-detail__article">
				<div class="event-detail__meta-wrapper">
					<div class="event-detail__meta-column">
						<strong>${data.date}</strong><br>
						${data.time}
					</div>
					<div class="event-detail__meta-column">
						<a href="#">${data.location1}</a><br>
						${data.location2 ? `<strong>${data.location2}</strong>` : ''}
					</div>
					<div class="event-detail__meta-column">
						<ul class="event-detail__meta-social">
							<li><a class="event-detail__social event-detail__social--twitter icon--twitter" href="#"><span>Twitter</span></a></li>
							<li><a class="event-detail__social event-detail__social--facebook icon--facebook" href="#"><span>Facebook</span></a></li>
						</ul>
					</div>
				</div>
				${data.image ? `<img src="${data.image}" alt="${data.title}">` : ''}
				<div class="event-detail__article-description">
					<p>${data.description}</p>
				</div>
				${renderHashtags(data.hashtags)}
				<div class="presenters">
					<div class="js-presenters-placeholder"></div>
				</div>
				<div class="details">
					<h2 class="section__heading">Details</h2>
					<dl>
						<dt>Access</dt>
						<dd>${data.access ? `${data.access}` : ''}</dd>
					</dl>
					<dl>
						<dt>Format</dt>
						<dd>${data.format ? `${data.format}` : ''}</dd>
					</dl>
					<dl>
						<dt>Event Type</dt>
						<dd>${data.eventTypeDisplay ? `${data.eventTypeDisplay}` : ''}</dd>
					</dl>
					<dl>
						<dt>Track</dt>
						<dd>${data.trackDisplay ? `${data.trackDisplay}` : ''}</dd>
					</dl>
					<dl>
						<dt>Level</dt>
						<dd>${data.level ? `${data.level}` : ''}</dd>
					</dl>
					<dl>
						<dt>Online</dt>
						<dd>${data.slides ? `<a href="${data.slides}" target="_blank">${data.slides}</a>` : ''}</dd>
					</dl>
					<dl>
						<dt>Tags</dt>
						<dd>${renderTags(data.tags)}</dd>
					</dl>
				</div>
			</article>
			<aside class="event-detail__sidebar">
				<a class="button" href="#">Venue Info</a>
				<img src="https://maps.googleapis.com/maps/api/staticmap?center=Austin+Convention+Center,+Austin,+TX&size=272x272&key=AIzaSyAfvjwI0468ef7YizCbnfreOx_LjUUercU" alt="Venue">
				<a class="button button--blue" href="#">Find Food Nearby</a>
				<a class="button button--blue" href="#">Find Drinks Nearby</a>
			</aside>
		</section>`;
		resultsPlaceholder.insertAdjacentHTML('afterbegin', output);
		if (data.presenterIds.length > 0) {
			renderPresenters(data.presenterIds);
		}
	};

	function renderPresenters(presenterIds) {
		let presentersPlaceholder = document.querySelector('.js-presenters-placeholder');
		getAjaxData(presentersUrl, function(presenters) {
			let output = '<h2 class="section__heading">Presenters</h2>';
			presenterIds.forEach(function(presenterId, i) {
				presenters.forEach(function(presenter, j) {
					if (presenter.id === presenterId) {
						output += `<div class="presenter">
							${presenter.image ? `<img class="presenter__image" src="${presenter.image}" alt="${presenter.name}">` : ''}
							<div class="presenter__content">
								${presenter.name ? `<h2 class="presenter__name">${presenter.name}</h2>` : ''}
								${presenter.title ? `<h3 class="presenter__title">${presenter.title}</h3>` : ''}
								${presenter.company ? `<h4 class="presenter__location">${presenter.company}</h4>` : ''}
								${presenter.description ? `<p class="presenter__description">${presenter.description}</p>` : ''}
							</div>
						</div>`;
					}
				});
			});
			presentersPlaceholder.insertAdjacentHTML('afterbegin', output);
		});
	};

	function renderHashtags(hashtags) {
		let output = '';
		if ((hashtags !== null) && (hashtags.length > 0)) {
			output += '<p class="event-detail__tags"><strong>Hashtags:</strong> ';
			hashtags.forEach(function(hashtag) {
				output += `#${hashtag} `
			});
			output += '</p>' 
		}
		return output;
	};

	function renderTags(tags) {
		let output = '';
		if ((tags !== null) && (tags.length > 0)) {
			output = tags.join(' ');
		}
		return output;
	};

	function renderError(msg) {
		domUtils.emptyElement(resultsPlaceholder);
		resultsPlaceholder.insertAdjacentHTML('afterbegin', `<p>${msg}</p>`);
	};

	init();

};

export default eventDetail;