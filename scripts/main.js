function setLocationProperty(identifier, value) {
	const propertyElement = document.getElementById(identifier);
	if (propertyElement) {
		propertyElement.textContent = value === null ? "no value." : value;
	} else {
		throw new Error(`Could not find identifier: "${identifier}"`);
	}
}

function onSucccess(position) {
	console.log("success");
	setLocationProperty("latitude", position.coords.latitude);
	setLocationProperty("longitude", position.coords.longitude);
	setLocationProperty("altitude", position.coords.altitude);
	setLocationProperty("accuracy", position.coords.accuracy);
	setLocationProperty("altitude-accuracy", position.coords.altitudeAccuracy);
	setLocationProperty("speed", position.coords.speed);
	setLocationProperty("heading", position.coords.heading);
}

function onError(error) {
	console.error(error);
}

function startWatchingPosition() {
	const options = {
		enableHighAccuracy: true,
		timeout: 5000,
		maximumAge: 0
	};
	return navigator.geolocation.watchPosition(onSucccess, onError, options);
}

function showMessage(message, duration) {
	let messageElement = document.getElementById("message");
	if (messageElement) {
		messageElement.innerText = message;
	} else {
		messageElement = document.createElement("p");
		messageElement.id = "message";
		messageElement.innerText = message;
		document.body.append(messageElement);
	}
	setTimeout(() => {
		const messageElement = document.getElementById("message");
		messageElement.remove();
	}, 3000);
}

/**
 * This code is focused on understanding the Geolocation API.
 *
 * It is documented here:
 * https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API
 */
function main() {
	let handlerId;
	let isTracking = false;
	document.getElementById("start").addEventListener("click", () => {
		if (isTracking) {
			showMessage("Cannot start tracking because it already is.", 3000);
		} else {
			handlerId = startWatchingPosition();
			isTracking = true;
			showMessage("Started to watch the position", 3000);
		}
	});
	document.getElementById("stop").addEventListener("click", () => {
		if (isTracking) {
			navigator.geolocation.clearWatch(handlerId);
			showMessage("Stoped to watch the position", 3000);
		} else {
			showMessage("Cannot stop tracking because it isn't.", 3000);
		}
	});
}