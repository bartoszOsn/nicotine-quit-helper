import { ScheduledNotificationRegistrationMessage } from './messages/ScheduledNotificationRegistrationMessage';
import { ScheduledNotificationCancellationMessage } from './messages/ScheduledNotificationCancellationMessage';
import { ScheduledNotificationInvocationMessage } from './messages/ScheduledNotificationInvocationMessage';

let scheduledMessages: Array<{ message: ScheduledNotificationRegistrationMessage, source: MessageEventSource }> = [];

onmessage = (event: MessageEvent): void => {
	if (event.data === null) {
		return;
	}

	if (event.data.type === 'ScheduledNotificationRegistration') {
		handleNotificationRegistration(event.data as ScheduledNotificationRegistrationMessage, event.source);
		return;
	}

	if (event.data.type === 'ScheduledNotificationCancellation') {
		handleNotificationCancellation(event.data as ScheduledNotificationCancellationMessage);
		return;
	}
}

self.addEventListener('periodicsync', () => {
	const currentTime = Date.now();
	const handled: Array<{ message: ScheduledNotificationRegistrationMessage, source: MessageEventSource }> = [];

	for (const message of scheduledMessages) {
		if (message.message.notification.timestamp < currentTime) {
			sendMessageToClient(message.source, message.message);
			handled.push(message);
		}
	}
	scheduledMessages = scheduledMessages.filter(message => !handled.includes(message));
})

function handleNotificationRegistration(message: ScheduledNotificationRegistrationMessage, source: MessageEventSource): void {
	scheduledMessages.push({ message: message, source: source });
}

function handleNotificationCancellation(message: ScheduledNotificationCancellationMessage): void {
	console.log(message); // TODO
}

function sendMessageToClient(source: MessageEventSource, message: ScheduledNotificationRegistrationMessage): void {
	if (source && source.postMessage) {
		const messageToBeSent: ScheduledNotificationInvocationMessage = {
			type: 'ScheduledNotificationInvocation',
			notification: message.notification
		}

		source.postMessage(messageToBeSent);
	}
}