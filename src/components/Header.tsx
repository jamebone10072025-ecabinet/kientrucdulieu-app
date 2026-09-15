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

interface HeaderProps {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  onOpenDqiCalc: () => void;
  onOpenAssistant: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenDqiCalc,
  onOpenAssistant,
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
    <header className="sticky top-0 z-40 bg-slate-900 text-white border-b border-slate-800 shadow-md">
      {/* Top Banner with Official Emblem Style */}
      <div className="bg-gradient-to-r from-red-900 via-red-800 to-amber-950 px-4 py-2 text-xs border-b border-amber-500/30 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-amber-400 text-red-900 font-bold text-[10px] shadow-sm">
            ★
          </span>
          <span className="font-bold tracking-wide uppercase text-amber-200">
            CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM • BỘ CÔNG AN • TRUNG TÂM DỮ LIỆU QUỐC GIA
          </span>
        </div>
        <div className="flex items-center gap-3 text-amber-100/90 text-[11px]">
          <span className="bg-black/25 px-2 py-0.5 rounded border border-amber-500/30">
            Công văn 4856/BCA-TTDLQG (14/9/2026)
          </span>
          <span className="bg-black/25 px-2 py-0.5 rounded border border-amber-500/30 hidden sm:inline-block">
            Quyết định 2439/QĐ-TTg & Nghị định 278/2025/NĐ-CP
          </span>
        </div>
      </div>

      {/* Main App Title and Action Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500 to-red-600 flex items-center justify-center shadow-lg shadow-red-900/30 border border-amber-400/40 shrink-0">
            <Database className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white leading-tight">
                Khung Kiến trúc & Quản trị dữ liệu Quốc gia
              </h1>
              <span className="px-2 py-0.5 text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-500/30 hidden sm:inline-block">
                Phiên bản 1.0 chuẩn hóa
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Cẩm nang triển khai kết nối, chia sẻ, chuẩn định danh dữ liệu và giải pháp an ninh mạng cho Bộ ngành &amp; Địa phương
            </p>
          </div>
        </div>

        {/* Quick Tools */}
        <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
          <button
            onClick={onOpenDqiCalc}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold shadow-sm transition-all border border-blue-400/30"
            title="Tính toán chỉ số chất lượng dữ liệu DQI chuẩn theo công thức"
          >
            <Calculator className="w-4 h-4 text-blue-200" />
            <span>Tính chỉ số DQI</span>
          </button>
          <button
            onClick={onOpenAssistant}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-600 via-indigo-600 to-indigo-700 hover:from-amber-500 hover:to-indigo-600 text-white rounded-lg text-xs font-semibold shadow-sm transition-all border border-amber-300/40"
            title="Trợ lý AI Gemini 3.8 Flash tư vấn nghiệp vụ, pháp lý & ánh xạ từ điển dữ liệu"
          >
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            <span>Trợ lý AI Gemini</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-t border-slate-800 bg-slate-900/90 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-1 overflow-x-auto py-2 scrollbar-none" aria-label="Tabs">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-md whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
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
