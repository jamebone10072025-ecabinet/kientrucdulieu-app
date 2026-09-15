import React, { useState, useRef, useEffect } from 'react';
import { 
  BookOpen, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  RefreshCw, 
  Database, 
  HelpCircle,
  CheckCircle2,
  Copy,
  AlertCircle
} from 'lucide-react';

interface LegalAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuestion?: string;
}

interface FaqItem {
  question: string;
  category: 'Mô hình tổ chức' | 'Định danh dữ liệu' | 'Kết nối NDOP' | 'An ninh bảo mật' | 'Chất lượng DQI';
  answer: string;
  citation: string;
}

interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  time?: string;
}

const FAQS: FaqItem[] = [
  {
    question: 'Tỉnh có bắt buộc thành lập Trung tâm Dữ liệu mới hoặc bộ máy hành chính mới cho 05 bộ phận không?',
    category: 'Mô hình tổ chức',
    answer: 'KHÔNG! Công văn số 4856/BCA-TTDLQG (Phụ lục 1 Mục I.2 và Phụ lục 5 Mục B.II) quy định rõ: Việc xác định 05 Bộ phận nhằm bảo đảm đầy đủ vai trò, trách nhiệm và KHÔNG mặc nhiên được hiểu là yêu cầu thành lập đơn vị tổ chức độc lập. Địa phương ưu tiên sắp xếp trong biên chế hiện có. Đặc biệt, các tỉnh KHÔNG thực hiện đầu tư mới hoặc nâng cấp mở rộng các Trung tâm dữ liệu vật lý riêng lẻ khi TTDLQG đã đủ năng lực cung cấp.',
    citation: 'Phụ lục 1 Mục I.2.a & Phụ lục 5 Mục B.II.1',
  },
  {
    question: 'Bộ phận Tuân thủ tại địa phương do cơ quan nào chủ trì và có được thuê chuyên gia ngoài không?',
    category: 'Mô hình tổ chức',
    answer: 'Tại địa phương, Bộ phận Tuân thủ BẮT BUỘC do CÔNG AN TỈNH, THÀNH PHỐ chủ trì thực hiện theo thẩm quyền ngành dọc của Bộ Công an. CDO tỉnh không can thiệp vào kết luận giám sát độc lập của Bộ phận Tuân thủ. Đặc biệt: TUYỆT ĐỐI KHÔNG ĐƯỢC THUÊ NGOÀI BỘ PHẬN TUÂN THỦ trong mọi trường hợp (kể cả Mô hình 3 chuyển tiếp).',
    citation: 'Phụ lục 1 Mục III.1, III.2, III.3 & Phụ lục 1 Mục III.4',
  },
  {
    question: 'Tiêu chuẩn kỹ thuật định danh dữ liệu (CCCD, Mã số doanh nghiệp, Mã ĐVHC) có được phép sai số không?',
    category: 'Định danh dữ liệu',
    answer: 'TUYỆT ĐỐI KHÔNG CHO PHÉP SAI SỐ! Đối với các trường định danh và dữ liệu khóa có vai trò liên kết (Số ĐDCN, CCCD 12 số, Mã số DN, Mã ĐVHC...), áp dụng thống nhất NGƯỠNG DQI 100% đối với Đúng, Đủ và Sạch trên phạm vi toàn quốc. Nếu phát hiện vi phạm, cơ quan chủ quản phải lập tức kích hoạt "Cảnh báo sự cố nghiêm trọng" và làm sạch tại gốc ngay, không chờ đến kỳ rà soát định kỳ.',
    citation: 'Phụ lục 3 Mục III.2',
  },
  {
    question: 'Hệ thống Trung tâm điều hành thông minh (IOC) cấp tỉnh triển khai theo kiến trúc mới như thế nào?',
    category: 'Kết nối NDOP',
    answer: 'Hệ thống IOC mới khác hoàn toàn mô hình trước đây: Thay vì mỗi tỉnh đầu tư phòng máy Data Center riêng, toàn bộ "não bộ" của hệ thống IOC chạy trên Nền tảng điện toán đám mây của Trung tâm Dữ liệu quốc gia; địa phương chỉ quản lý các thiết bị cảm biến và cơ cấu chấp hành (sensors & actuators) tại hiện trường và kết nối qua mạng TSLCD.',
    citation: 'Phụ lục 5 Mục D.II',
  },
  {
    question: 'Quy định về thời hạn xử lý sự cố chất lượng dữ liệu (SLA) giữa địa phương và TTDLQG?',
    category: 'Chất lượng DQI',
    answer: 'Khung thời hạn chuẩn gồm 3 mốc: (1) Trong 05 ngày làm việc: Cơ quan chủ quản tổ chức rà soát hồ sơ gốc, xác định nguyên nhân; (2) Trong 05 ngày làm việc tiếp theo: Tổ chức đính chính tại gốc và hoàn thành đồng bộ lại lên CSDL Tổng hợp quốc gia (tổng không quá 10 ngày); (3) Tối đa 15 ngày làm việc: Chỉ áp dụng cho trường hợp mâu thuẫn phức tạp cần kiểm tra thực địa hoặc làm việc trực tiếp với người dân.',
    citation: 'Phụ lục 3 Mục IV.3',
  },
  {
    question: 'Khi sắp xếp, sáp nhập đơn vị hành chính và tinh gọn bộ máy (Sở KH&ĐT sáp nhập vào Sở Tài chính, chính quyền 2 cấp), dữ liệu xử lý ra sao?',
    category: 'Định danh dữ liệu',
    answer: 'Theo mô hình chính quyền địa phương 2 cấp, chức năng quản lý doanh nghiệp, đầu tư và tài chính được hợp nhất về Sở Tài chính. Về mặt dữ liệu: (1) Tiếp tục lưu giữ dữ liệu gốc, mã định danh và thông tin đơn vị hành chính theo giá trị lịch sử; TUYỆT ĐỐI KHÔNG sửa đổi hồi tố làm mất bối cảnh; (2) Sở Tài chính tiếp nhận nguyên trạng và kế thừa toàn bộ CSDL Đăng ký kinh doanh, CSDL Đầu tư; (3) Thiết lập Bảng ánh xạ mã cơ quan và mã ĐVHC trước - sau sắp xếp để phục vụ liên thông qua NDOP.',
    citation: 'Phụ lục 3 Mục II.1.f & II.1.g & Mô hình chính quyền địa phương 2 cấp',
  },
  {
    question: 'Máy chủ Agent Node được đặt ở đâu và ai chịu trách nhiệm an ninh mạng?',
    category: 'An ninh bảo mật',
    answer: 'Agent Node được triển khai tập trung tại 01 đầu mối duy nhất của Bộ/Tỉnh, đặt tại vùng mạng biên (DMZ), cách ly độc lập vật lý với mạng nội bộ. Trung tâm Dữ liệu quốc gia (C12 Bộ Công an) trực tiếp cấp hạ tầng máy chủ, cài đặt phần mềm và giám sát an ninh mạng 24/7. Địa phương phối hợp phân vùng mạng và bảo đảm an toàn thông tin cấp độ.',
    citation: 'Phụ lục 4 Mục C & Phụ lục 5 Mục F',
  },
];

const SUGGESTED_QUESTIONS = [
  'Sở KH&ĐT sáp nhập vào Sở Tài chính: Kế thừa CSDL Doanh nghiệp và xử lý mã ĐVHC 2 cấp như thế nào?',
  'Ngưỡng DQI 100% đối với CCCD và Mã số doanh nghiệp quy định xử lý ra sao khi phát hiện lỗi?',
  'Khung cam kết thời hạn SLA xử lý sự cố dữ liệu 5-10-15 ngày áp dụng cho ai?',
  'Quy trình 05 bước kết nối, tích hợp dữ liệu từ Kho dữ liệu tỉnh lên NDOP?',
  'Yêu cầu kỹ thuật và phân vùng bảo mật của máy chủ Agent Node tại vùng biên DMZ?',
];

export const LegalAssistantModal: React.FC<LegalAssistantModalProps> = ({ isOpen, onClose, initialQuestion }) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'chat' | 'faq' | 'schema'>('chat');

  // Chat State
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      text: 'Xin chào đồng chí! Tôi là Trợ lý AI Cấp cao về Khung Kiến trúc & Quản trị dữ liệu Quốc gia (Google Gemini 3.8 Flash).\n\nTôi sẵn sàng hỗ trợ giải đáp mọi nghiệp vụ, quy chuẩn kỹ thuật theo Quyết định 2439/QĐ-TTg, Công văn 4856/BCA-TTDLQG, Nghị định 278/2025/NĐ-CP và mô hình tổ chức chính quyền địa phương 2 cấp (Sở Tài chính kế thừa chức năng Sở KH&ĐT). Đồng chí cần tra cứu nội dung gì?',
      time: 'Vừa xong',
    },
  ]);
  const [inputValue, setInputValue] = useState<string>(initialQuestion || '');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [chatError, setChatError] = useState<string | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // FAQ State
  const [search, setSearch] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  // Schema Mapper State
  const [schemaTable, setSchemaTable] = useState<string>('capphep_kinhdoanh_sotaichinh');
  const [schemaColumns, setSchemaColumns] = useState<string>(
    'ma_doanh_nghiep (text), ten_doanh_nghiep (text), nguoi_dai_dien_cccd (text), ngay_cap_phep (date), dia_chi_tru_so (text), von_dieu_le (numeric), trang_thai_hoat_dong (text)'
  );
  const [schemaResult, setSchemaResult] = useState<string | null>(null);
  const [isSchemaLoading, setIsSchemaLoading] = useState<boolean>(false);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      role: 'user',
      text,
      time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);
    setChatError(null);

    try {
      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          conversationHistory: messages.map((m) => ({
            role: m.role,
            content: m.text,
          })),
        }),
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || 'Lỗi xử lý phản hồi từ Gemini API.');
      }

      const modelMsg: ChatMessage = {
        role: 'model',
        text: data.reply || 'Đã nhận yêu cầu.',
        time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, modelMsg]);
    } catch (err: any) {
      console.error(err);
      setChatError(err.message || 'Không thể kết nối đến Gemini API. Vui lòng kiểm tra lại cấu hình hệ thống.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleRunSchemaMapper = async () => {
    if (!schemaTable || !schemaColumns || isSchemaLoading) return;
    setIsSchemaLoading(true);
    setSchemaResult(null);

    try {
      const res = await fetch('/api/gemini/schema-suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tableName: schemaTable,
          columnsDescription: schemaColumns,
        }),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || 'Lỗi phân tích ánh xạ.');
      }
      setSchemaResult(data.suggestion);
    } catch (err: any) {
      setSchemaResult(`Lỗi: ${err.message || 'Không thể thực hiện ánh xạ từ điển'}`);
    } finally {
      setIsSchemaLoading(false);
    }
  };

  const filteredFaqs = FAQS.filter((faq) => {
    const matchCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchSearch =
      faq.question.toLowerCase().includes(search.toLowerCase()) ||
      faq.answer.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[90vh] max-h-[850px]">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-4 sm:p-5 text-white flex items-center justify-between border-b border-indigo-900/50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-amber-400 to-indigo-500 shadow-md">
              <Sparkles className="w-5 h-5 text-slate-950 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold tracking-tight">Trợ lý AI Gemini • Cố vấn Kiến trúc & Quản trị dữ liệu</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/30 text-indigo-200 border border-indigo-400/30">
                  Gemini 3.6 Flash / 3.8
                </span>
              </div>
              <p className="text-[11px] text-indigo-200/90">
                Grounding chuẩn theo Quyết định 2439/QĐ-TTg, Công văn 4856/BCA-TTDLQG &amp; Mô hình chính quyền 2 cấp
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-sm font-bold transition-all"
          >
            ✕
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-5 py-2.5 bg-slate-100/80 border-b border-slate-200 shrink-0 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'chat'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Bot className="w-3.5 h-3.5" />
            <span>Hỏi đáp trực tiếp với Gemini</span>
          </button>
          <button
            onClick={() => setActiveTab('faq')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'faq'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Cẩm nang FAQ quy chuẩn ({FAQS.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('schema')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'schema'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>AI Ánh xạ từ điển dữ liệu</span>
          </button>
        </div>

        {/* TAB 1: INTERACTIVE GEMINI CHAT */}
        {activeTab === 'chat' && (
          <div className="flex-1 flex flex-col min-h-0 bg-slate-50/50">
            {/* Suggested quick chips */}
            <div className="px-5 py-2.5 bg-white border-b border-slate-200 shrink-0">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 mb-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Gợi ý câu hỏi tình huống thực tế:</span>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none text-[11px]">
                {SUGGESTED_QUESTIONS.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(q)}
                    className="whitespace-nowrap px-2.5 py-1 rounded-full bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-300 text-slate-700 border border-slate-200 transition-all shrink-0"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat message list */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              {messages.map((msg, idx) => {
                const isUser = msg.role === 'user';
                return (
                  <div
                    key={idx}
                    className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm ${
                        isUser
                          ? 'bg-slate-800 text-white'
                          : 'bg-gradient-to-br from-indigo-600 to-amber-500 text-white'
                      }`}
                    >
                      {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>

                    <div className={`max-w-[82%] space-y-1 ${isUser ? 'items-end' : 'items-start'}`}>
                      <div className="flex items-center gap-2 px-1 text-[10px] text-slate-400">
                        <span>{isUser ? 'Cán bộ hỏi' : 'Gemini 3.8 Flash Copilot'}</span>
                        {msg.time && <span>• {msg.time}</span>}
                      </div>

                      <div
                        className={`p-3.5 sm:p-4 rounded-2xl text-xs sm:text-[13px] leading-relaxed relative group ${
                          isUser
                            ? 'bg-slate-900 text-white rounded-tr-xs'
                            : 'bg-white text-slate-800 border border-slate-200/80 shadow-xs rounded-tl-xs'
                        }`}
                      >
                        <div className="whitespace-pre-wrap font-normal">{msg.text}</div>

                        {!isUser && (
                          <button
                            onClick={() => handleCopy(msg.text, idx)}
                            className="absolute top-2.5 right-2.5 p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity"
                            title="Sao chép nội dung"
                          >
                            {copiedIndex === idx ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

              {isLoading && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-600 to-amber-500 flex items-center justify-center text-white shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="p-3.5 bg-white border border-slate-200 rounded-2xl rounded-tl-xs shadow-xs text-xs text-slate-600 flex items-center gap-2.5">
                    <RefreshCw className="w-3.5 h-3.5 text-indigo-600 animate-spin" />
                    <span>Gemini đang đối chiếu căn cứ pháp lý &amp; phân tích câu trả lời...</span>
                  </div>
                </div>
              )}

              {chatError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                  <span>{chatError}</span>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Chat Input */}
            <div className="p-3 sm:p-4 bg-white border-t border-slate-200 shrink-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  placeholder="Nhập câu hỏi nghiệp vụ (ví dụ: Quy chế bàn giao CSDL cho Sở Tài chính, kiểm tra DQI, phân vùng Agent Node...)"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  disabled={isLoading}
                  className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 focus:bg-white"
                />
                <button
                  type="submit"
                  disabled={isLoading || !inputValue.trim()}
                  className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-300 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all shrink-0"
                >
                  <Send className="w-4 h-4" />
                  <span className="hidden sm:inline">Gửi câu hỏi</span>
                </button>
              </form>
              <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2 px-1">
                <span>Trợ lý sử dụng mô hình Google Gemini 3.8 Flash • Proxy bảo mật server-side</span>
                <button
                  type="button"
                  onClick={() =>
                    setMessages([
                      {
                        role: 'model',
                        text: 'Cuộc trò chuyện đã được làm mới. Đồng chí có câu hỏi nào cần giải đáp thêm không?',
                        time: 'Vừa xong',
                      },
                    ])
                  }
                  className="hover:text-slate-600 underline"
                >
                  Xóa lịch sử chat
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: STANDARD FAQ LIST */}
        {activeTab === 'faq' && (
          <div className="flex-1 flex flex-col min-h-0">
            <div className="p-4 border-b border-slate-200 bg-slate-50 space-y-3 shrink-0">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Tìm kiếm câu hỏi tình huống (ví dụ: Agent Node, IOC, SLA, kiêm nhiệm, Sở Tài chính...)"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500"
                />
              </div>

              <div className="flex flex-wrap gap-1.5 text-xs">
                {['all', 'Mô hình tổ chức', 'Định danh dữ liệu', 'Kết nối NDOP', 'An ninh bảo mật', 'Chất lượng DQI'].map(
                  (cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all ${
                        selectedCategory === cat
                          ? 'bg-indigo-600 text-white shadow-xs'
                          : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {cat === 'all' ? 'Tất cả chủ đề' : cat}
                    </button>
                  )
                )}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-3">
              {filteredFaqs.length === 0 ? (
                <div className="text-center py-8 text-slate-500 text-xs">
                  Không tìm thấy câu trả lời phù hợp với từ khóa "{search}".
                </div>
              ) : (
                filteredFaqs.map((faq, idx) => {
                  const isExpanded = expandedIndex === idx;
                  return (
                    <div
                      key={idx}
                      className="border border-slate-200 rounded-xl overflow-hidden transition-all bg-white shadow-2xs"
                    >
                      <button
                        onClick={() => setExpandedIndex(isExpanded ? null : idx)}
                        className="w-full p-3.5 text-left flex items-start justify-between gap-3 hover:bg-slate-50"
                      >
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600 mr-2">
                            {faq.category}
                          </span>
                          <span className="text-xs font-bold text-slate-900 leading-snug">
                            {faq.question}
                          </span>
                        </div>
                        <span className="text-slate-400 shrink-0 mt-0.5">
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </span>
                      </button>

                      {isExpanded && (
                        <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs space-y-2">
                          <p className="text-slate-700 leading-relaxed font-normal">{faq.answer}</p>
                          <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
                            <span className="font-semibold text-indigo-900">Căn cứ trích dẫn: {faq.citation}</span>
                            <span className="text-[10px] text-slate-400">Công văn 4856/BCA-TTDLQG</span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* TAB 3: AI SCHEMA MAPPER */}
        {activeTab === 'schema' && (
          <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50">
            <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-3 shadow-xs">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-600" />
                <h4 className="text-sm font-bold text-slate-900">
                  Công cụ AI tự động ánh xạ bảng CSDL địa phương vào 06 Miền dữ liệu dùng chung (QĐ 2439)
                </h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Nhập tên bảng và danh sách cột của hệ thống nghiệp vụ tại tỉnh/thành phố (ví dụ: phần mềm Cấp phép kinh doanh của Sở Tài chính, Hộ tịch của Sở Tư pháp). Mô hình Gemini sẽ tự động đối chiếu, chỉ định khóa chính, khóa ngoại liên kết quốc gia và quy tắc DQI cần thiết.
              </p>

              <div className="flex flex-wrap gap-2 pt-1 text-xs">
                <span className="text-slate-400 font-semibold text-[11px] self-center">Ví dụ mẫu:</span>
                <button
                  type="button"
                  onClick={() => {
                    setSchemaTable('dn_dangky_kinhdoanh_sotaichinh');
                    setSchemaColumns('ma_so_dn (text), ten_doanh_nghiep (text), cccd_nguoidaidien (text), ngay_thanhlap (date), diachi_tru_so (text), von_kinhdoanh (numeric), trangthai (text)');
                  }}
                  className="px-2.5 py-1 rounded bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 text-[11px] border border-slate-200"
                >
                  Sở Tài chính (Đăng ký kinh doanh)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSchemaTable('hotich_khaisinh_sotuphap');
                    setSchemaColumns('so_dinh_danh (text), ho_ten (text), ngay_sinh (date), gioi_tinh (text), ho_ten_cha (text), cccd_cha (text), ho_ten_me (text), cccd_me (text), noisinh_xa (text)');
                  }}
                  className="px-2.5 py-1 rounded bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 text-[11px] border border-slate-200"
                >
                  Sở Tư pháp (Khai sinh & Hộ tịch)
                </button>
              </div>

              <div className="space-y-3 pt-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Tên bảng / CSDL nghiệp vụ nguồn</label>
                  <input
                    type="text"
                    value={schemaTable}
                    onChange={(e) => setSchemaTable(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                    placeholder="ví dụ: sotaichinh_doanhnghiep"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Danh sách các trường / cột (tên cột & kiểu dữ liệu)</label>
                  <textarea
                    rows={3}
                    value={schemaColumns}
                    onChange={(e) => setSchemaColumns(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                    placeholder="ví dụ: id, ma_dn, ten_dn, ngay_cap..."
                  />
                </div>

                <button
                  type="button"
                  onClick={handleRunSchemaMapper}
                  disabled={isSchemaLoading}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-300 text-white rounded-lg text-xs font-bold flex items-center gap-2 shadow-sm transition-all"
                >
                  {isSchemaLoading ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Gemini đang đối soát từ điển...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Thực hiện ánh xạ thông minh</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {schemaResult && (
              <div className="bg-white rounded-xl border border-indigo-200 p-5 shadow-sm space-y-2">
                <div className="flex items-center justify-between border-b border-indigo-100 pb-2">
                  <span className="font-bold text-xs text-indigo-900 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                    Kết quả khuyến nghị ánh xạ từ Gemini 3.8 Flash
                  </span>
                  <button
                    onClick={() => handleCopy(schemaResult, 999)}
                    className="text-[11px] text-slate-500 hover:text-indigo-600 flex items-center gap-1"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedIndex === 999 ? 'Đã chép' : 'Sao chép kết quả'}</span>
                  </button>
                </div>
                <div className="text-xs text-slate-700 whitespace-pre-wrap leading-relaxed">
                  {schemaResult}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="bg-slate-100 p-3.5 sm:p-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs shrink-0 border-t border-slate-200">
          <span className="text-slate-500 text-[11px]">
            Hỗ trợ kỹ thuật Trung tâm Dữ liệu quốc gia: <strong>0868.260.888 / 0855.179.668</strong> (Trực 24/7)
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-900 text-white rounded-lg font-bold text-xs hover:bg-slate-800 self-end sm:self-auto"
          >
            Đóng cửa sổ
          </button>
        </div>
      </div>
    </div>
  );
};
