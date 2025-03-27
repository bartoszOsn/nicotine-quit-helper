let timeoutIds = [];
let allClients = null;

onmessage = (event) => {
	const message = event.data;
	if (!isNotificationMessage(message)) {
		return;
	}
	self.clients.matchAll().then(c => {
		allClients = c;
	}).then(() => {
		clearAllSchedules();
		scheduleNotifications(message.notifications);
	})
}

function clearAllSchedules() {
	for (let timeoutId of timeoutIds) {
		clearTimeout(timeoutId);
	}
}

function isNotificationMessage(message) {
	return message?.type === 'notification';
}

function scheduleNotifications(notifications) {
	for (let notification of notifications) {
		timeoutIds.push(setTimeout(() => {
			for (const client of allClients) {
				client.postMessage(notification);
			}
		}, notification.scheduledAt - Date.now()));
	}
}