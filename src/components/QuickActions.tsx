import React from 'react';
import { AlertTriangle, Wrench, HelpCircle, FileText } from 'lucide-react';

interface QuickActionsProps {
  onActionClick: (action: string) => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({ onActionClick }) => {
  const actions = [
    {
      id: 'emergency',
      label: 'بلاغ طوارئ',
      icon: AlertTriangle,
      color: 'bg-red-500 hover:bg-red-600',
      description: 'تسريبات أو مشاكل عاجلة'
    },
    {
      id: 'maintenance',
      label: 'طلب صيانة',
      icon: Wrench,
      color: 'bg-orange-500 hover:bg-orange-600',
      description: 'صيانة دورية أو إصلاحات'
    },
    {
      id: 'general',
      label: 'معلومات المدرسة',
      icon: HelpCircle,
      color: 'bg-blue-500 hover:bg-blue-600',
      description: 'التخصصات والزي والحضور'
    },
    {
      id: 'admission',
      label: 'التقديم والقبول',
      icon: FileText,
      color: 'bg-purple-500 hover:bg-purple-600',
      description: 'شروط القبول ومواعيد التقديم'
    }
  ];

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-3" dir="rtl">
        كيف يمكنني مساعدتك؟
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={() => onActionClick(action.id)}
            className={`${action.color} text-white p-4 rounded-lg transition-all duration-200 hover:transform hover:scale-105 shadow-lg hover:shadow-xl`}
          >
            <div className="flex flex-col items-center text-center">
              <action.icon className="w-8 h-8 mb-2" />
              <span className="font-medium text-sm">{action.label}</span>
              <span className="text-xs opacity-90 mt-1">{action.description}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};