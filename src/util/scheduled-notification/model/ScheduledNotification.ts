import { ScheduledNotificationOptions } from './ScheduledNotificationOptions';
import { ScheduledNotificationId } from './ScheduledNotificationId';

export interface ScheduledNotification extends ScheduledNotificationOptions {
	id: ScheduledNotificationId;
}