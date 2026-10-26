import { UserEvent } from '../types/analytics';

export function trackEvent(event: UserEvent) {
  if (process.env.NODE_ENV !== 'production') {
    console.log('[Analytics Event]', event);
  }
}
