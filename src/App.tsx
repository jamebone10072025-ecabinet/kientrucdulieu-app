import React, { useState } from 'react';
import { NavigationTab } from './types';
import { Header } from './components/Header';
import { OverviewSection } from './components/OverviewSection';
import { DataDictionarySection } from './components/DataDictionarySection';
import { IntegrationPlatformsSection } from './components/IntegrationPlatformsSection';
import { SecurityArchitectureSection } from './components/SecurityArchitectureSection';
import { QualityManagementSection } from './components/QualityManagementSection';
import { ChecklistAndLogSection } from './components/ChecklistAndLogSection';
import { DqiCalculatorModal } from './components/DqiCalculatorModal';
import { LegalAssistantModal } from './components/LegalAssistantModal';
import { 
  Building, 
  FileText, 
  Phone, 
  ShieldCheck, 
  ExternalLink, 
  HelpCircle, 
  Calculator,
  Compass
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('overview');
  const [isDqiCalcOpen, setIsDqiCalcOpen] = useState<boolean>(false);
  const [isAssistantOpen, setIsAssistantOpen] = useState<boolean>(false);
  const [assistantInitialQuestion, setAssistantInitialQuestion] = useState<string>('');

  const handleOpenAssistantWithPrompt = (prompt: string) => {
    setAssistantInitialQuestion(prompt);
    setIsAssistantOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 text-slate-900 font-sans">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenDqiCalc={() => setIsDqiCalcOpen(true)}
        onOpenAssistant={() => {
          setAssistantInitialQuestion('');
          setIsAssistantOpen(true);
        }}
        onOpenAssistantWithPrompt={handleOpenAssistantWithPrompt}
      />

      {/* Main Container - Standardized for Mobile and Desktop Viewports */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
        {activeTab === 'overview' && <OverviewSection />}
        {activeTab === 'dictionary' && <DataDictionarySection />}
        {activeTab === 'integration' && <IntegrationPlatformsSection />}
        {activeTab === 'security' && <SecurityArchitectureSection />}
        {activeTab === 'quality' && <QualityManagementSection onOpenDqiCalc={() => setIsDqiCalcOpen(true)} />}
        {activeTab === 'checklist' && <ChecklistAndLogSection />}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-b border-slate-800 pb-6">
            <div>
              <div className="flex items-center gap-2 text-white font-bold text-sm mb-2">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>BỘ CÔNG AN • TRUNG TÂM DỮ LIỆU QUỐC GIA</span>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-400">
                Hệ thống hướng dẫn triển khai Khung kiến trúc dữ liệu Quốc gia, Khung quản trị, quản lý dữ liệu Quốc gia và Từ điển dữ liệu dùng chung theo Quyết định số 2439/QĐ-TTg ngày 04/11/2025 của Thủ tướng Chính phủ và Công văn số 4856/BCA-TTDLQG ngày 14/9/2026.
              </p>
            </div>

            <div>
              <div className="text-white font-bold text-sm mb-2">Đường dây hỗ trợ kỹ thuật (Trực 24/7)</div>
              <ul className="space-y-1.5 text-[11px]">
                <li className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Đại tá Nguyễn Thành Vĩnh - Phó Giám đốc TTDLQG: <strong>0868.260.888</strong></span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Trung tá Đào Đình Nam - Phó Trưởng phòng 1 / TTDLQG: <strong>0855.179.668</strong></span>
                </li>
              </ul>
            </div>

            <div>
              <div className="text-white font-bold text-sm mb-2">Văn bản pháp lý nền tảng</div>
              <ul className="space-y-1 text-[11px]">
                <li>• Luật Dữ liệu số 60/2024/QH15</li>
                <li>• Luật Bảo vệ dữ liệu cá nhân số 91/2025/QH15</li>
                <li>• Nghị định 278/2025/NĐ-CP (Kết nối, chia sẻ dữ liệu bắt buộc)</li>
                <li>• Nghị quyết 175/NQ-CP (Đề án Trung tâm Dữ liệu quốc gia)</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
            <div>© 2026 Trung tâm Dữ liệu quốc gia (TTDLQG - C12) - Bộ Công an. Tài liệu hướng dẫn phục vụ chuyển đổi số quốc gia.</div>
            <div className="flex items-center gap-3">
              <button onClick={() => setIsAssistantOpen(true)} className="hover:text-amber-300 transition-colors">
                Hỏi đáp nghiệp vụ
              </button>
              <span>•</span>
              <button onClick={() => setIsDqiCalcOpen(true)} className="hover:text-blue-300 transition-colors">
                Công cụ tính DQI
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Interactive Modals */}
      <DqiCalculatorModal 
        isOpen={isDqiCalcOpen} 
        onClose={() => setIsDqiCalcOpen(false)} 
      />
      <LegalAssistantModal 
        isOpen={isAssistantOpen} 
        onClose={() => setIsAssistantOpen(false)}
        initialQuestion={assistantInitialQuestion}
      />
    </div>
  );
}
