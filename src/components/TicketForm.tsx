import React, { useState } from 'react';
import { X, Send } from 'lucide-react';
import { Ticket } from '../types';

interface TicketFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (ticket: Omit<Ticket, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => void;
  category: 'emergency' | 'maintenance' | 'general';
}

export const TicketForm: React.FC<TicketFormProps> = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  category 
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    studentName: '',
    contactInfo: '',
    priority: 'medium' as 'low' | 'medium' | 'high'
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      category
    });
    setFormData({
      title: '',
      description: '',
      studentName: '',
      contactInfo: '',
      priority: 'medium'
    });
    onClose();
  };

  const categoryLabels = {
    emergency: 'بلاغ طوارئ',
    maintenance: 'طلب صيانة',
    general: 'استفسار عام'
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800" dir="rtl">
            {categoryLabels[category]}
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" dir="rtl">
              عنوان المشكلة *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="اكتب عنوان مختصر للمشكلة"
              dir="rtl"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" dir="rtl">
              وصف المشكلة *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="اشرح المشكلة بالتفصيل..."
              dir="rtl"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" dir="rtl">
              اسم الطالب/الموظف
            </label>
            <input
              type="text"
              value={formData.studentName}
              onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="الاسم (اختياري)"
              dir="rtl"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" dir="rtl">
              معلومات الاتصال
            </label>
            <input
              type="text"
              value={formData.contactInfo}
              onChange={(e) => setFormData({ ...formData, contactInfo: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="رقم الهاتف أو الإيميل (اختياري)"
              dir="rtl"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" dir="rtl">
              درجة الأولوية
            </label>
            <select
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              dir="rtl"
            >
              <option value="low">منخفضة</option>
              <option value="medium">متوسطة</option>
              <option value="high">عالية</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            إرسال التذكرة
          </button>
        </form>
      </div>
    </div>
  );
};