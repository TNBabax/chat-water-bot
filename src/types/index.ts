export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  category?: 'emergency' | 'maintenance' | 'general' | 'admin';
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  category: 'emergency' | 'maintenance' | 'general';
  status: 'open' | 'in-progress' | 'resolved';
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
  updatedAt: Date;
  studentName?: string;
  contactInfo?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  keywords: string[];
}