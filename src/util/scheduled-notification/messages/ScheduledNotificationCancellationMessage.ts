import { ScheduledNotificationId } from '../model/ScheduledNotificationId';

export interface ScheduledNotificationCancellationMessage {
	type: 'ScheduledNotificationCancellation';
	notificationId: ScheduledNotificationId;
}