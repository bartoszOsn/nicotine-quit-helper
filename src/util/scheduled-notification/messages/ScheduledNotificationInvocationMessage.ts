import { ScheduledNotification } from '../model/ScheduledNotification';

export interface ScheduledNotificationInvocationMessage {
	type: 'ScheduledNotificationInvocation';
	notification: ScheduledNotification;
}