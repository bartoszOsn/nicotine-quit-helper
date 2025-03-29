import { ScheduledNotification } from '../model/ScheduledNotification';

export interface ScheduledNotificationRegistrationMessage {
	type: 'ScheduledNotificationRegistration';
	notification: ScheduledNotification;
}