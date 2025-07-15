export interface Message {
  id: number;
  sender: string;
  content: string;
  isRead: boolean;
  isPrivate: boolean;
  timestamp: string;
}
