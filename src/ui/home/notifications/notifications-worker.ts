import { isNotificationMessage, NotificationPayload } from './NotificationMessage';

let timeoutIds: Array<number> = [];

onmessage = (event: MessageEvent) => {
	const message = event.data;
	if (!isNotificationMessage(message)) {
		return;
	}

	clearAllSchedules();
	scheduleNotifications(message.notifications);
}

function clearAllSchedules() {
	for (let timeoutId of timeoutIds) {
		clearTimeout(timeoutId);
	}
}

function scheduleNotifications(notifications: Array<NotificationPayload>) {
	for (let notification of notifications) {
		timeoutIds.push(setTimeout(() => {
			new Notification(notification.title, {
				body: notification.body,
				tag: notification.tag,
				silent: notification.silent
			});
		}, notification.scheduledAt - Date.now()) as unknown as number);
	}
}