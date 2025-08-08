import React from 'react';
import { ChatBot } from './components/ChatBot';
import { Droplets } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100" dir="rtl">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <Droplets className="w-7 h-7 text-white" />
              </div>
              <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-900">
                  مدرسة مياه الشرب والصرف الصحي
                </h1>
                <p className="text-sm text-gray-600">قنا - مصر</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="h-[600px]">
          <ChatBot />
        </div>
      </div>

      {/* Simple Footer */}
      <div className="bg-white border-t py-4">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-600 text-sm">
            © 2025 مدرسة مياه الشرب والصرف الصحي - قنا
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;