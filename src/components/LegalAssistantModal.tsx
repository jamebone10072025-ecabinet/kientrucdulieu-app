import React, { useState } from 'react';
import { HelpCircle, Search, Sparkles, BookOpen, CheckCircle, ChevronDown, ChevronUp, ShieldCheck } from 'lucide-react';

interface LegalAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FaqItem {
  question: string;
  category: 'Mô hình tổ chức' | 'Định danh dữ liệu' | 'Kết nối NDOP' | 'An ninh bảo mật' | 'Chất lượng DQI';
  answer: string;
  citation: string;
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
    question: 'Khi sắp xếp, sáp nhập đơn vị hành chính (tỉnh, huyện, xã), dữ liệu lịch sử xử lý ra sao?',
    category: 'Định danh dữ liệu',
    answer: 'Tiếp tục lưu giữ dữ liệu gốc, mã đơn vị hành chính và thông tin cấp huyện/xã theo giá trị lịch sử; KHÔNG sửa đổi hồi tố làm mất bối cảnh hình thành và khả năng truy xuất nguồn gốc. Cơ quan chủ quản dữ liệu có trách nhiệm thiết lập Bảng ánh xạ giữa mã đơn vị hành chính trước và sau sắp xếp.',
    citation: 'Phụ lục 3 Mục II.1.f & II.1.g',
  },
  {
    question: 'Máy chủ Agent Node được đặt ở đâu và ai chịu trách nhiệm an ninh mạng?',
    category: 'An ninh bảo mật',
    answer: 'Agent Node được triển khai tập trung tại 01 đầu mối duy nhất của Bộ/Tỉnh, đặt tại vùng mạng biên (DMZ), cách ly độc lập vật lý với mạng nội bộ. Trung tâm Dữ liệu quốc gia (C12 Bộ Công an) trực tiếp cấp hạ tầng máy chủ, cài đặt phần mềm và giám sát an ninh mạng 24/7. Địa phương phối hợp phân vùng mạng và bảo đảm an toàn thông tin cấp độ.',
    citation: 'Phụ lục 4 Mục C & Phụ lục 5 Mục F',
  },
];

export const LegalAssistantModal: React.FC<LegalAssistantModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [search, setSearch] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const filteredFaqs = FAQS.filter(faq => {
    const matchCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchSearch = faq.question.toLowerCase().includes(search.toLowerCase()) || 
                        faq.answer.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-amber-950 to-red-950 p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-amber-500/20 border border-amber-400/30">
              <BookOpen className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="text-base font-bold">Hỏi đáp nghiệp vụ &amp; giải đáp tình huống triển khai</h3>
              <p className="text-[11px] text-amber-200">Trích xuất trực tiếp từ Công văn số 4856/BCA-TTDLQG &amp; Quyết định 2439/QĐ-TTg</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-sm font-bold transition-all"
          >
            ✕
          </button>
        </div>

        {/* Search & Category Filter */}
        <div className="p-5 border-b border-slate-200 bg-slate-50 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm kiếm câu hỏi tình huống (ví dụ: Agent Node, IOC, SLA, kiêm nhiệm...)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
            />
          </div>

          <div className="flex flex-wrap gap-1.5 text-xs">
            {['all', 'Mô hình tổ chức', 'Định danh dữ liệu', 'Kết nối NDOP', 'An ninh bảo mật', 'Chất lượng DQI'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {cat === 'all' ? 'Tất cả chủ đề' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ List */}
        <div className="p-5 space-y-3 max-h-[60vh] overflow-y-auto">
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
                  className="border border-slate-200 rounded-xl overflow-hidden transition-all bg-white"
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
                      <p className="text-slate-700 leading-relaxed font-normal">
                        {faq.answer}
                      </p>
                      <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
                        <span className="font-semibold text-amber-800">Căn cứ trích dẫn: {faq.citation}</span>
                        <span className="text-[10px] text-slate-400">Công văn 4856/BCA-TTDLQG</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-100 p-4 flex justify-between items-center text-xs">
          <span className="text-slate-500 text-[11px]">
            Hỗ trợ kỹ thuật Trung tâm Dữ liệu quốc gia: 0868.260.888 / 0855.179.668 (Đường dây nóng 24/7)
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-900 text-white rounded-lg font-bold text-xs hover:bg-slate-800"
          >
            Đóng Cửa Sổ
          </button>
        </div>
      </div>
    </div>
  );
};
