export interface UserEvent {
  eventName: string;
  category: 'auth' | 'icp' | 'crm' | 'email' | 'rag';
  timestamp: number;
  metadata?: Record<string, any>;
}
