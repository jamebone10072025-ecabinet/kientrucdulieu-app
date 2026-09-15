import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  X, 
  Sparkles, 
  ArrowRight, 
  BookOpen, 
  Database, 
  Network, 
  ShieldCheck, 
  BarChart3, 
  Layers, 
  FileText, 
  CheckCircle2, 
  CornerDownLeft,
  Command,
  Info,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { NavigationTab } from '../types';
import { 
  SearchCategory, 
  SearchItem, 
  searchKnowledgeBase, 
  SEARCH_ITEMS 
} from '../data/searchIndex';

interface SmartSearchBarProps {
  onNavigateTab: (tab: NavigationTab) => void;
  onOpenAssistantWithPrompt: (prompt: string) => void;
}

const CATEGORY_TABS: { id: SearchCategory; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'all', label: 'Tất cả', icon: Layers },
  { id: 'legal', label: 'Văn bản pháp lý', icon: BookOpen },
  { id: 'dictionary', label: 'Từ điển dữ liệu', icon: Database },
  { id: 'connection', label: 'Tiêu chuẩn kết nối', icon: Network },
  { id: 'quality', label: 'Chỉ số DQI & 8 Lỗi', icon: BarChart3 },
  { id: 'governance', label: 'Khung 05 Bộ phận', icon: ShieldCheck },
];

const POPULAR_TAGS = [
  'Nghị định 278',
  'Công văn 4856',
  'DOM-ORG (Sở Tài chính)',
  'Số định danh CCCD',
  'Agent Node C12',
  'Chỉ số DQI 100%',
  'SLA 5-10-15 ngày',
  'Mô hình 34 tỉnh',
  'Khung 05 bộ phận'
];

export const SmartSearchBar: React.FC<SmartSearchBarProps> = ({
  onNavigateTab,
  onOpenAssistantWithPrompt,
}) => {
  const [query, setQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<SearchCategory>('all');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedDetailItem, setSelectedDetailItem] = useState<SearchItem | null>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Filter search items
  const results = searchKnowledgeBase(query, selectedCategory);

  // Keyboard shortcut Ctrl+K or /
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      } else if (e.key === '/' && document.activeElement !== inputRef.current && !(document.activeElement instanceof HTMLInputElement) && !(document.activeElement instanceof HTMLTextAreaElement)) {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      } else if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        setSelectedDetailItem(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectTag = (tag: string) => {
    setQuery(tag);
    setIsOpen(true);
    inputRef.current?.focus();
  };

  const handleNavigate = (item: SearchItem) => {
    onNavigateTab(item.targetTab);
    setIsOpen(false);
  };

  const handleAskAI = (item: SearchItem) => {
    const prompt = item.aiPrompt || `Hãy hướng dẫn chi tiết về nội dung: "${item.title}" theo đúng căn cứ pháp lý ${item.legalCitation}.`;
    onOpenAssistantWithPrompt(prompt);
    setIsOpen(false);
  };

  const getCategoryBadgeClass = (category: SearchCategory) => {
    switch (category) {
      case 'legal':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'dictionary':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'connection':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'quality':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'governance':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Search Input Bar */}
      <div 
        className={`relative flex items-center w-full bg-slate-950/80 hover:bg-slate-950 text-white rounded-xl border transition-all duration-200 shadow-inner ${
          isOpen 
            ? 'border-amber-400 ring-2 ring-amber-400/30 bg-slate-950' 
            : 'border-slate-700 hover:border-slate-600'
        }`}
      >
        <div className="pl-3.5 pr-2 flex items-center pointer-events-none text-amber-400">
          <Search className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (!isOpen) setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Tra cứu nhanh văn bản (NĐ 278, CV 4856), từ điển dữ liệu (DOM-ORG, CCCD), chuẩn kết nối NDOP, chỉ số DQI..."
          className="w-full py-2.5 sm:py-3 pr-20 text-xs sm:text-sm bg-transparent text-white placeholder-slate-400 focus:outline-none"
        />

        <div className="absolute right-2.5 flex items-center gap-1.5">
          {query && (
            <button
              onClick={() => {
                setQuery('');
                inputRef.current?.focus();
              }}
              className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Xóa tìm kiếm"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}

          <div className="hidden sm:flex items-center gap-1 px-2 py-1 rounded bg-slate-800/90 border border-slate-700 text-[10px] font-mono text-slate-400 select-none">
            <span className="text-[11px]">⌘</span>
            <span>K</span>
          </div>
        </div>
      </div>

      {/* Dropdown Results Box */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-300 text-slate-900 z-50 overflow-hidden max-h-[80vh] flex flex-col animate-in fade-in slide-in-from-top-2 duration-150">
          {/* Category Filter Tabs */}
          <div className="p-2.5 bg-slate-50 border-b border-slate-200 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            {CATEGORY_TABS.map((tab) => {
              const Icon = tab.icon;
              const isSelected = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                    isSelected
                      ? 'bg-amber-500 text-white font-semibold shadow-sm'
                      : 'text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-slate-500'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Quick Suggestions Chips when no or short query */}
          {!query && (
            <div className="p-3 bg-amber-50/50 border-b border-amber-200/60 flex flex-wrap items-center gap-1.5 text-xs">
              <span className="text-amber-900 font-semibold flex items-center gap-1 text-[11px] uppercase tracking-wider mr-1">
                <Sparkles className="w-3 h-3 text-amber-600" />
                Gợi ý tra cứu:
              </span>
              {POPULAR_TAGS.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleSelectTag(tag)}
                  className="px-2.5 py-1 rounded-full bg-white border border-amber-300/80 text-slate-700 hover:text-amber-900 hover:bg-amber-100 hover:border-amber-400 font-medium text-[11px] transition-all shadow-xs"
                >
                  {tag}
                </button>
              ))}
            </div>
          )}

          {/* Results List */}
          <div className="overflow-y-auto flex-1 divide-y divide-slate-100 p-2 space-y-1">
            <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-500 uppercase tracking-wider flex items-center justify-between">
              <span>Kết quả tra cứu ({results.length})</span>
              <span className="text-slate-400 font-normal lowercase">Nhấn vào mục để điều hướng</span>
            </div>

            {results.length === 0 ? (
              <div className="py-12 px-4 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                  <Search className="w-6 h-6" />
                </div>
                <div className="text-sm font-semibold text-slate-800">
                  Không tìm thấy kết quả phù hợp cho "{query}"
                </div>
                <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                  Đồng chí có thể chuyển sang tab danh mục khác hoặc gửi câu hỏi trực tiếp cho <strong>Trợ lý AI Gemini</strong> để được phân tích tự động từ văn bản gốc.
                </p>
                <button
                  onClick={() => {
                    onOpenAssistantWithPrompt(query);
                    setIsOpen(false);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm transition-colors"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Hỏi Trợ lý AI Gemini về "{query}"</span>
                </button>
              </div>
            ) : (
              results.map((item) => (
                <div
                  key={item.id}
                  className="group rounded-xl p-3 hover:bg-slate-50 transition-all border border-transparent hover:border-slate-200"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                    <div className="space-y-1.5 flex-1 cursor-pointer" onClick={() => handleNavigate(item)}>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getCategoryBadgeClass(item.category)}`}>
                          {item.categoryLabel}
                        </span>
                        {item.code && (
                          <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 font-mono text-[10px] border border-slate-200 font-semibold">
                            {item.code}
                          </span>
                        )}
                        {item.highlightTag && (
                          <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
                            {item.highlightTag}
                          </span>
                        )}
                      </div>

                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-amber-700 transition-colors flex items-center gap-1.5">
                        <span>{item.title}</span>
                      </h4>

                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                        {item.summary}
                      </p>

                      <div className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                        <BookOpen className="w-3 h-3 text-slate-400" />
                        <span>Căn cứ: {item.legalCitation}</span>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-1.5 sm:self-center shrink-0 pt-2 sm:pt-0">
                      <button
                        onClick={() => setSelectedDetailItem(item)}
                        className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1 transition-colors border border-slate-200"
                        title="Xem chi tiết nội dung quy định"
                      >
                        <FileText className="w-3.5 h-3.5 text-slate-600" />
                        <span className="hidden sm:inline">Chi tiết</span>
                      </button>

                      <button
                        onClick={() => handleAskAI(item)}
                        className="px-2.5 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center gap-1 transition-colors border border-indigo-200"
                        title="Hỏi trợ lý AI Gemini về mục này"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        <span>Hỏi AI</span>
                      </button>

                      <button
                        onClick={() => handleNavigate(item)}
                        className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold flex items-center gap-1 shadow-sm transition-colors"
                        title="Chuyển đến chuyên mục này trên trang"
                      >
                        <span>Mở</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Bottom Bar info */}
          <div className="px-4 py-2.5 bg-slate-100 border-t border-slate-200 text-[11px] text-slate-600 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Tra cứu toàn văn QĐ 2439/QĐ-TTg, CV 4856/BCA-TTDLQG, NĐ 278/2025/NĐ-CP & Mô hình 02 cấp</span>
            </div>
            <div className="flex items-center gap-2 text-slate-500">
              <span>Phím tắt:</span>
              <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-300 font-mono text-[10px] text-slate-700 font-bold">ESC</kbd>
              <span>để đóng</span>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal when user clicks "Chi tiết" */}
      {selectedDetailItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-slate-900 to-indigo-950 p-5 text-white flex items-start justify-between gap-4 border-b border-slate-800">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getCategoryBadgeClass(selectedDetailItem.category)}`}>
                    {selectedDetailItem.categoryLabel}
                  </span>
                  {selectedDetailItem.code && (
                    <span className="px-2 py-0.5 rounded bg-white/10 text-amber-200 font-mono text-[10px] border border-white/20">
                      {selectedDetailItem.code}
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-bold text-white leading-snug">
                  {selectedDetailItem.title}
                </h3>
                <p className="text-xs text-slate-300 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Căn cứ pháp lý: {selectedDetailItem.legalCitation}</span>
                </p>
              </div>
              <button
                onClick={() => setSelectedDetailItem(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto space-y-5 text-slate-800 text-xs sm:text-sm">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                <div className="font-bold text-slate-900 uppercase text-[11px] tracking-wider flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-amber-600" />
                  <span>Tóm tắt quy định & nguyên tắc cốt lõi</span>
                </div>
                <p className="leading-relaxed text-slate-700">
                  {selectedDetailItem.summary}
                </p>
              </div>

              <div className="space-y-2.5">
                <div className="font-bold text-slate-900 uppercase text-[11px] tracking-wider">
                  Các điểm chỉ đạo & tiêu chuẩn kỹ thuật bắt buộc:
                </div>
                <ul className="space-y-2">
                  {selectedDetailItem.keyPoints.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-amber-50/40 border border-amber-200/50">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-slate-800 leading-relaxed font-medium">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => handleAskAI(selectedDetailItem)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white text-xs font-semibold shadow-sm transition-all"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Hỏi sâu hơn với Trợ lý AI Gemini</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedDetailItem(null)}
                  className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-300 transition-colors"
                >
                  Đóng
                </button>

                <button
                  onClick={() => {
                    handleNavigate(selectedDetailItem);
                    setSelectedDetailItem(null);
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-sm transition-all"
                >
                  <span>Chuyển tới chuyên mục</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
