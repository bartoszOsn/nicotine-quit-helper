export interface NotificationMessage {
	type: 'notification';
	notifications: Array<NotificationPayload>;
}

export function isNotificationMessage(message: any): message is NotificationMessage {
	return message?.type === 'notification';
}

export interface NotificationPayload {
	title: string;
	body: string;
	tag: string;
	silent: boolean;
	scheduledAt: number;
}