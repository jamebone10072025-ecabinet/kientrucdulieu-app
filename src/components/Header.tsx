import React from 'react';
import { 
  ShieldCheck, 
  Database, 
  Layers, 
  Network, 
  FileCheck2, 
  BarChart3, 
  Calculator, 
  HelpCircle,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { NavigationTab } from '../types';
import { SmartSearchBar } from './SmartSearchBar';

interface HeaderProps {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  onOpenDqiCalc: () => void;
  onOpenAssistant: () => void;
  onOpenAssistantWithPrompt?: (prompt: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenDqiCalc,
  onOpenAssistant,
  onOpenAssistantWithPrompt,
}) => {
  const tabs = [
    { id: 'overview' as NavigationTab, label: 'Khung Quản trị 5 Bộ phận', icon: Layers },
    { id: 'dictionary' as NavigationTab, label: 'Từ điển & Chuẩn Định danh', icon: Database },
    { id: 'integration' as NavigationTab, label: 'Nền tảng NDOP & Kho Tỉnh', icon: Network },
    { id: 'security' as NavigationTab, label: 'Hạ tầng & Bảo mật Agent Node', icon: ShieldCheck },
    { id: 'quality' as NavigationTab, label: 'Đo lường DQI & 8 Nhóm Lỗi', icon: BarChart3 },
    { id: 'checklist' as NavigationTab, label: 'Checklist & Nhật ký Sự cố', icon: FileCheck2 },
  ];

  return (
    <header className="relative z-30 bg-slate-900 text-white border-b border-slate-800 shadow-md">
      {/* Top Banner with Official Emblem Style - Mobile Standardized */}
      <div className="bg-gradient-to-r from-red-900 via-red-800 to-amber-950 px-3 sm:px-4 py-1.5 sm:py-2 text-xs border-b border-amber-500/30 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-amber-400 text-red-900 font-bold text-[10px] shadow-sm shrink-0">
            ★
          </span>
          <span className="font-bold tracking-wide uppercase text-amber-200 text-[10px] sm:text-xs truncate sm:whitespace-normal">
            <span className="sm:hidden">BỘ CÔNG AN • TRUNG TÂM DỮ LIỆU QUỐC GIA</span>
            <span className="hidden sm:inline">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM • BỘ CÔNG AN • TRUNG TÂM DỮ LIỆU QUỐC GIA</span>
          </span>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 text-amber-100/90 text-[10px] sm:text-[11px] shrink-0">
          <span className="bg-black/30 px-2 py-0.5 rounded border border-amber-500/30 font-medium">
            CV 4856/BCA (14/9/2026)
          </span>
          <span className="bg-black/30 px-2 py-0.5 rounded border border-amber-500/30 hidden md:inline-block">
            QĐ 2439/QĐ-TTg &amp; NĐ 278/2025
          </span>
        </div>
      </div>

      {/* Main App Title and Action Bar - Mobile Optimized Layout */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-3.5 flex flex-col md:flex-row md:items-center md:justify-between gap-3 sm:gap-4">
        <div className="flex items-start sm:items-center gap-3">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-amber-500 to-red-600 flex items-center justify-center shadow-lg shadow-red-900/30 border border-amber-400/40 shrink-0 mt-0.5 sm:mt-0">
            <Database className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <h1 className="text-base sm:text-xl font-bold tracking-tight text-white leading-snug sm:leading-tight">
                Khung Kiến trúc &amp; Quản trị Dữ liệu Quốc gia
              </h1>
              <span className="px-2 py-0.5 text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-500/30 hidden xs:inline-block sm:inline-block">
                Chuẩn hóa 2026
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5 leading-normal">
              Cẩm nang kết nối NDOP, từ điển dữ liệu, chuẩn định danh số &amp; giải pháp an ninh mạng cho Bộ ngành, Địa phương
            </p>
          </div>
        </div>

        {/* Quick Tools - Touch-friendly Mobile Grid (Min 44px Touch Targets) */}
        <div className="grid grid-cols-2 gap-2 w-full md:w-auto md:flex md:items-center md:gap-2 shrink-0 pt-0.5 md:pt-0">
          <button
            onClick={onOpenDqiCalc}
            className="min-h-[44px] flex items-center justify-center gap-1.5 px-3 py-2 bg-blue-600 hover:bg-blue-500 active:scale-[0.98] text-white rounded-xl text-xs font-semibold shadow-sm transition-all border border-blue-400/30 touch-manipulation"
            title="Tính toán chỉ số chất lượng dữ liệu DQI chuẩn theo công thức"
          >
            <Calculator className="w-4 h-4 text-blue-200 shrink-0" />
            <span className="whitespace-nowrap">Tính chỉ số DQI</span>
          </button>
          <button
            onClick={onOpenAssistant}
            className="min-h-[44px] flex items-center justify-center gap-1.5 px-3 py-2 bg-gradient-to-r from-amber-600 via-indigo-600 to-indigo-700 hover:from-amber-500 hover:to-indigo-600 active:scale-[0.98] text-white rounded-xl text-xs font-semibold shadow-sm transition-all border border-amber-300/40 touch-manipulation"
            title="Trợ lý AI Gemini 3.8 Flash tư vấn nghiệp vụ, pháp lý & ánh xạ từ điển dữ liệu"
          >
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse shrink-0" />
            <span className="whitespace-nowrap">Trợ lý AI Gemini</span>
          </button>
        </div>
      </div>

      {/* Smart Search Bar Container */}
      <div className="border-t border-slate-800/80 bg-slate-900/60 px-3 sm:px-6 lg:px-8 py-2 sm:py-2.5">
        <div className="max-w-7xl mx-auto">
          <SmartSearchBar
            onNavigateTab={setActiveTab}
            onOpenAssistantWithPrompt={onOpenAssistantWithPrompt || ((prompt: string) => onOpenAssistant())}
          />
        </div>
      </div>

      {/* Navigation Tabs - Non-Fixed (không cố định), Smooth Mobile Swiping */}
      <div className="border-t border-slate-800 bg-slate-900/95">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <nav 
            className="flex space-x-1.5 overflow-x-auto py-2 scrollbar-none touch-pan-x overscroll-contain" 
            aria-label="Tabs"
          >
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`min-h-[42px] flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-all touch-manipulation shrink-0 ${
                    isActive
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-sm font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/80 active:bg-slate-800'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};
