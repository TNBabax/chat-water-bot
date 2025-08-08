import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, MicOff } from 'lucide-react';
import { Message } from '../types';
import { ChatMessage } from './ChatMessage';
import { QuickActions } from './QuickActions';
import { TicketForm } from './TicketForm';
import { faqData } from '../data/faqData';

export const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'أهلاً وسهلاً بك في مدرسة المياه والصرف الصحي بقنا! 🎓\n\nيمكنني مساعدتك في:\n• معلومات عن التقديم والقبول\n• التخصصات المتاحة\n• الزي المدرسي والحضور\n• المواد الدراسية\n• أي استفسارات أخرى عن المدرسة\n\nكيف يمكنني مساعدتك اليوم؟',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTicketFormOpen, setIsTicketFormOpen] = useState(false);
  const [ticketCategory, setTicketCategory] = useState<'emergency' | 'maintenance' | 'general'>('general');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const findBestAnswer = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    // البحث في قاعدة المعرفة
    const matchingFAQ = faqData.find(faq => 
      faq.keywords.some(keyword => input.includes(keyword)) ||
      faq.question.toLowerCase().includes(input) ||
      input.includes(faq.question.toLowerCase()) ||
      faq.answer.toLowerCase().includes(input)
    );

    if (matchingFAQ) {
      return matchingFAQ.answer;
    }

    // البحث المتقدم بالكلمات المفتاحية المتعددة
    const multiKeywordMatch = faqData.find(faq => {
      const inputWords = input.split(' ');
      return inputWords.some(word => 
        word.length > 2 && faq.keywords.some(keyword => 
          keyword.includes(word) || word.includes(keyword)
        )
      );
    });

    if (multiKeywordMatch) {
      return multiKeywordMatch.answer;
    }

    // إجابات افتراضية للكلمات المفتاحية الشائعة
    if (input.includes('مرحبا') || input.includes('السلام') || input.includes('أهلا')) {
      return 'أهلاً وسهلاً بك في مدرسة المياه والصرف الصحي بقنا! كيف يمكنني مساعدتك اليوم؟';
    }
    
    if (input.includes('شكرا') || input.includes('شكراً')) {
      return 'عفواً، دائماً في خدمتك. لا تتردد في السؤال إذا كنت تحتاج مساعدة أخرى.';
    }

    // أسئلة شائعة إضافية
    if (input.includes('رقم') || input.includes('هاتف') || input.includes('اتصال')) {
      return 'للتواصل مع إدارة المدرسة، يمكنك التواصل مع مركز تدريب الكنوز. للاستفسارات الأكاديمية، استخدم المنصة التعليمية: https://company-of-water-school-qena.vercel.app/';
    }

    if (input.includes('مصاريف') || input.includes('رسوم') || input.includes('تكلفة')) {
      return 'بخصوص الرسوم والمصاريف، يتم دفع الرسوم المقررة طبقاً لبروتوكول التعاون الموقع بين الشركة ووزارة التربية والتعليم. للتفاصيل الدقيقة، تواصل مع إدارة المدرسة.';
    }

    // إجابة افتراضية مع اقتراحات
    return 'عذراً، لم أستطع فهم استفسارك بوضوح. يمكنك السؤال عن:\n\n• شروط القبول والتقديم\n• التخصصات المتاحة\n• الزي المدرسي والحضور\n• المواد الدراسية والمنصة التعليمية\n• معلومات عامة عن المدرسة\n\nأو استخدم الأزرار السريعة أعلاه للمساعدة.';
  };

  const handleSendMessage = (content?: string) => {
    const messageContent = content || inputValue.trim();
    if (!messageContent) return;

    // إضافة رسالة المستخدم
    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageContent,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // إنشاء رد الروبوت
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: findBestAnswer(messageContent),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'emergency':
        setTicketCategory('emergency');
        setIsTicketFormOpen(true);
        break;
      case 'maintenance':
        setTicketCategory('maintenance');
        setIsTicketFormOpen(true);
        break;
      case 'general':
        handleSendMessage('لدي استفسار عام عن المدرسة');
        break;
      case 'admission':
        handleSendMessage('أريد معلومات عن التقديم والقبول');
        break;
    }
  };

  const handleTicketSubmit = (ticket: any) => {
    const ticketId = `T${Date.now()}`;
    const confirmationMessage = `تم إنشاء التذكرة بنجاح!\n\nرقم التذكرة: ${ticketId}\nالعنوان: ${ticket.title}\nالحالة: قيد المراجعة\n\nسيتم التواصل معك قريباً من فريق الصيانة.`;
    
    const botMessage: Message = {
      id: Date.now().toString(),
      content: confirmationMessage,
      sender: 'bot',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, botMessage]);
  };

  const toggleVoice = () => {
    if (!isListening) {
      // بدء التسجيل الصوتي (محاكاة)
      setIsListening(true);
      setTimeout(() => {
        setIsListening(false);
        setInputValue('مثال على الرسالة الصوتية');
        inputRef.current?.focus();
      }, 3000);
    } else {
      setIsListening(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-xl">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 rounded-t-lg">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold" dir="rtl">الدعم الفني</h2>
            <p className="text-blue-100 text-sm" dir="rtl">
              مدرسة مياه الشرب والصرف الصحي - قنا
            </p>
          </div>
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        <QuickActions onActionClick={handleQuickAction} />
        
        <div className="bg-white rounded-lg p-4 shadow-sm">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t bg-white p-4 rounded-b-lg">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder={isListening ? 'يتم التسجيل...' : 'اكتب رسالتك هنا...'}
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            dir="rtl"
            disabled={isListening}
          />
          
          <button
            onClick={toggleVoice}
            className={`p-3 rounded-lg transition-all duration-200 ${
              isListening 
                ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
            }`}
            title={isListening ? 'إيقاف التسجيل' : 'تسجيل صوتي'}
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>
          
          <button
            onClick={() => handleSendMessage()}
            disabled={!inputValue.trim() || isListening}
            className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105"
            title="إرسال"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Ticket Form Modal */}
      <TicketForm
        isOpen={isTicketFormOpen}
        onClose={() => setIsTicketFormOpen(false)}
        onSubmit={handleTicketSubmit}
        category={ticketCategory}
      />
    </div>
  );
};