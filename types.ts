export interface Product {
  id: string;
  name: string;
  reference: string;
  category: string;
  price: number;
  originalPrice?: number;
  stock: number;
  description: string;
  specs: Record<string, string>;
  imageUrl: string;
  badge?: string; // e.g., "-87%"
}

export enum Sender {
  USER = 'user',
  BOT = 'bot'
}

export interface Message {
  id: string;
  text: string;
  sender: Sender;
  timestamp: Date;
}

export interface ChatState {
  isOpen: boolean;
  messages: Message[];
  isLoading: boolean;
}