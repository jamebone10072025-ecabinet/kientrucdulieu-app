import React, { useState } from 'react';
import { DATA_QUALITY_SCENARIOS } from '../data/nationalDataArchitecture';
import { 
  BarChart3, 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  Clock, 
  HelpCircle, 
  ShieldAlert, 
  CheckCircle2, 
  Calculator, 
  ChevronRight, 
  Layers, 
  ArrowRight,
  Database
} from 'lucide-react';

interface QualityManagementSectionProps {
  onOpenDqiCalc: () => void;
}

export const QualityManagementSection: React.FC<QualityManagementSectionProps> = ({ onOpenDqiCalc }) => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<number>(1);
  const selectedScenario = DATA_QUALITY_SCENARIOS.find(s => s.id === selectedScenarioId) || DATA_QUALITY_SCENARIOS[0];

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 rounded-2xl p-6 sm:p-8 text-white border border-blue-500/30 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-semibold">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Phương Pháp Đo Lường Chuẩn Hóa Theo Phụ Lục 3 Công Văn 4856</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            Bộ tiêu chí chất lượng 5 tiêu chuẩn &amp; chỉ số DQI Quốc gia
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Hệ thống đo lường <strong>Chỉ số chất lượng dữ liệu (Data Quality Index - DQI)</strong> là thước đo bắt buộc 
            được tổng hợp toán học từ dưới lên để xếp hạng CSDL theo Điều 15 Nghị định 278/2025/NĐ-CP.
          </p>
        </div>

        <button
          onClick={onOpenDqiCalc}
          className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg flex items-center gap-2 shrink-0 border border-blue-400/40 transition-all self-start md:self-auto"
        >
          <Calculator className="w-4 h-4" />
          <span>Mở máy tính DQI tương tác</span>
        </button>
      </div>

      {/* 5 Tiêu chuẩn chất lượng: Đúng, Đủ, Sạch, Sống, Thống nhất */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>05 tiêu chí đo lường chất lượng dữ liệu ("Đúng, Đủ, Sạch, Sống, Thống nhất")</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
            <div className="text-[10px] font-bold uppercase text-blue-700">Tiêu chí 1</div>
            <h4 className="text-xs font-bold text-slate-900">Dữ liệu "ĐÚNG"</h4>
            <div className="text-[11px] text-slate-500 font-mono">Accuracy</div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Phản ánh chính xác sự thật khách quan, đối chiếu với nguồn dữ liệu gốc có tính pháp lý (CSDLQG Dân cư).
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
            <div className="text-[10px] font-bold uppercase text-emerald-700">Tiêu chí 2</div>
            <h4 className="text-xs font-bold text-slate-900">Dữ liệu "ĐỦ"</h4>
            <div className="text-[11px] text-slate-500 font-mono">Completeness</div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Không bỏ sót trường bắt buộc (NOT NULL), số hóa đầy đủ 100% đối tượng nghiệp vụ được giao quản lý.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
            <div className="text-[10px] font-bold uppercase text-amber-700">Tiêu chí 3</div>
            <h4 className="text-xs font-bold text-slate-900">Dữ liệu "SẠCH"</h4>
            <div className="text-[11px] text-slate-500 font-mono">Uniqueness &amp; Validity</div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Loại bỏ trùng lặp (Deduplication), loại bỏ giá trị rác, chuẩn hóa định dạng theo Từ điển dùng chung.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
            <div className="text-[10px] font-bold uppercase text-purple-700">Tiêu chí 4</div>
            <h4 className="text-xs font-bold text-slate-900">Dữ liệu "SỐNG"</h4>
            <div className="text-[11px] text-slate-500 font-mono">Timeliness</div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Được cập nhật tự động system-to-system, độ trễ thấp, bắt kịp biến động thực tế (kết hôn, chuyển hộ khẩu...).
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
            <div className="text-[10px] font-bold uppercase text-rose-700">Tiêu chí 5</div>
            <h4 className="text-xs font-bold text-slate-900">Dữ liệu "THỐNG NHẤT"</h4>
            <div className="text-[11px] text-slate-500 font-mono">Consistency</div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Đồng nhất cấu trúc, mã định danh, mô hình dữ liệu giữa các cơ quan, kết nối xuyên suốt qua nền tảng NDOP.
            </p>
          </div>
        </div>
      </div>

      {/* Công thức tính toán DQI & Ngưỡng chất lượng */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Mathematical aggregation */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Calculator className="w-5 h-5 text-indigo-600" />
            <span>Công thức toán học tính DQI tổng hợp từ dưới lên</span>
          </h3>
          <p className="text-xs text-slate-500">
            DQI được tính toán theo 4 cấp bậc: Quy tắc &rarr; Tiêu chí &rarr; Trường dữ liệu &rarr; Toàn bộ CSDL
          </p>

          <div className="space-y-2.5 font-mono text-xs">
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
              <span className="text-[11px] font-sans font-bold text-slate-500 block mb-1">1. DQI của Quy tắc chất lượng:</span>
              <div className="text-indigo-700 font-bold">
                DQI_Quy_tắc (%) = (Số đối tượng đáp ứng / Tổng số đối tượng đánh giá) × 100
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
              <span className="text-[11px] font-sans font-bold text-slate-500 block mb-1">2. DQI của Tiêu chí tại Trường dữ liệu:</span>
              <div className="text-blue-700 font-bold">
                DQI_Tiêu_chí = Σ(DQI_Quy_tắc × W_Quy_tắc) / ΣW_Quy_tắc
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
              <span className="text-[11px] font-sans font-bold text-slate-500 block mb-1">3. DQI của Trường dữ liệu:</span>
              <div className="text-purple-700 font-bold">
                DQI_Trường = Σ(DQI_Tiêu_chí × W_Tiêu_chí) / ΣW_Tiêu_chí
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
              <span className="text-[11px] font-sans font-bold text-slate-500 block mb-1">4. DQI Tổng hợp của Toàn CSDL / Hệ thống:</span>
              <div className="text-emerald-700 font-bold">
                DQI_CSDL = Σ(DQI_Trường × W_Trường) / ΣW_Trường
              </div>
            </div>
          </div>
        </div>

        {/* Right: Ngưỡng Xanh / Vàng / Đỏ & Ngưỡng 100% */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-amber-600" />
            <span>Phân cấp ngưỡng chất lượng &amp; kích hoạt xử lý</span>
          </h3>

          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-emerald-900">Mức Xanh – Đáp ứng yêu cầu</span>
                  <span className="font-mono font-bold text-xs text-emerald-700">DQI &ge; 90%</span>
                </div>
                <p className="text-[11px] text-emerald-800 mt-1">
                  Đạt chuẩn chất lượng vận hành an toàn. Tiếp tục duy trì giám sát định kỳ và cải thiện liên tục.
                </p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-amber-50 border border-amber-300 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-amber-900">Mức Vàng – Cần cảnh báo &amp; khắc phục</span>
                  <span className="font-mono font-bold text-xs text-amber-700">75% &le; DQI &lt; 90%</span>
                </div>
                <p className="text-[11px] text-amber-800 mt-1">
                  Cơ quan chủ quản phải xác định nguyên nhân, phạm vi ảnh hưởng và lập kế hoạch khắc phục có thời hạn rõ ràng.
                </p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-red-50 border border-red-300 flex items-start gap-3">
              <XCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-red-900">Mức Đỏ – Không đáp ứng yêu cầu</span>
                  <span className="font-mono font-bold text-xs text-red-700">DQI &lt; 75%</span>
                </div>
                <p className="text-[11px] text-red-800 mt-1">
                  Đánh giá mức độ ảnh hưởng, ưu tiên xử lý lỗi trọng yếu. Nguy cơ tạm dừng đồng bộ hoặc ngắt quyền khai thác dịch vụ.
                </p>
              </div>
            </div>

            {/* Đặc biệt 100% */}
            <div className="p-3.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-700 text-white shadow-sm space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-xs">
                <ShieldAlert className="w-4 h-4 text-amber-300" />
                <span>QUY ĐỊNH BẮT BUỘC NGƯỠNG DQI 100% CHO TRƯỜNG ĐỊNH DANH</span>
              </div>
              <p className="text-[11px] text-red-100 leading-relaxed">
                Đối với Số CCCD/ĐDCN, Mã số thuế/DN, Mã ĐVHC: <strong>bắt buộc đạt 100% Đúng, Đủ, Sạch</strong>. 
                Tuyệt đối không cho phép sai số. Vi phạm &rarr; kích hoạt ngay Cảnh báo sự cố nghiêm trọng, xử lý tại gốc tức thì.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Cam kết thời hạn xử lý sự cố chất lượng dữ liệu (SLA) */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Clock className="w-5 h-5 text-red-600" />
          <span>Cam kết thời hạn xử lý sự cố chất lượng dữ liệu &amp; chế tài (SLA - Phụ lục 3 Mục IV.3)</span>
        </h3>
        <p className="text-xs text-slate-500">
          Khung pháp lý ràng buộc kỷ luật đối với người đứng đầu cơ quan, đơn vị để duy trì độ tin cậy của hạ tầng quốc gia
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="text-2xl font-black text-blue-600 block">05 Ngày</span>
            <div className="text-xs font-bold text-slate-900">Giai đoạn Rà soát &amp; Xác minh</div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Thời hạn tối đa để cơ quan chủ quản tổ chức rà soát hồ sơ gốc, kiểm tra tàng thư, xác định nguyên nhân và gửi kết luận sơ bộ kể từ khi nhận Phiếu cảnh báo từ TTDLQG.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="text-2xl font-black text-amber-600 block">+05 Ngày</span>
            <div className="text-xs font-bold text-slate-900">Giai đoạn Khắc phục &amp; Đồng bộ lại</div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Áp dụng khi dữ liệu nguồn bị sai/lỗi thời (Trường hợp 2). Cơ quan tổ chức đính chính tại gốc và hoàn thành đồng bộ lại lên CSDL Tổng hợp quốc gia (Tổng thời gian &le; 10 ngày).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="text-2xl font-black text-purple-600 block">15 Ngày</span>
            <div className="text-xs font-bold text-slate-900">Xử lý Sự cố Mâu thuẫn Phức tạp</div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Chỉ áp dụng cho trường hợp chưa đủ cơ sở xác định đúng sai (Trường hợp 3), cần làm việc trực tiếp với người dân, kiểm tra thực địa hoặc hội đồng chuyên môn liên ngành.
            </p>
          </div>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-xs text-red-900 leading-relaxed">
          <strong>Chế tài quá hạn xử lý:</strong> Báo cáo trực tiếp Ban Chỉ đạo dữ liệu quốc gia, đưa vào tiêu chí đánh giá mức độ chuyển đổi số hàng năm. 
          Trong tình huống nghiêm trọng gây sai lệch luồng nghiệp vụ hoặc an ninh mạng, TTDLQG có quyền <strong>tạm dừng luồng đồng bộ hoặc ngắt quyền khai thác dịch vụ</strong> để cô lập rủi ro.
        </div>
      </div>

      {/* 08 Nhóm Lỗi Chất Lượng Dữ Liệu Phổ Biến & Kịch Bản Khắc Phục */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-5">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <span>08 nhóm lỗi dữ liệu phổ biến &amp; kịch bản khắc phục (Phụ lục 3 Mục VII)</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Nhận diện đúng bản chất, nguyên nhân gốc rễ và giải pháp khắc phục từ kỹ thuật đến nghiệp vụ
          </p>
        </div>

        {/* Scenario Selectors */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {DATA_QUALITY_SCENARIOS.map((sc) => {
            const isSelected = sc.id === selectedScenarioId;
            return (
              <button
                key={sc.id}
                onClick={() => setSelectedScenarioId(sc.id)}
                className={`p-2.5 rounded-lg text-left border transition-all text-xs ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-950 font-bold shadow-md'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                <div className={`text-[10px] ${isSelected ? 'text-amber-300' : 'text-slate-400'}`}>
                  Nhóm {sc.id}
                </div>
                <div className="line-clamp-2 mt-0.5 leading-tight">{sc.name.split(':')[1] || sc.name}</div>
              </button>
            );
          })}
        </div>

        {/* Selected Scenario Deep Dive */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4">
          <div className="border-b border-slate-200 pb-3">
            <h4 className="text-sm font-bold text-slate-900">{selectedScenario.name}</h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="space-y-3">
              <div className="bg-white p-3 rounded-lg border border-slate-200">
                <span className="font-bold text-[11px] text-red-700 block mb-1">Biểu hiện thực tế:</span>
                <p className="text-slate-700 leading-relaxed">{selectedScenario.symptom}</p>
              </div>

              <div className="bg-white p-3 rounded-lg border border-slate-200">
                <span className="font-bold text-[11px] text-amber-700 block mb-1">Nguyên nhân gốc rễ:</span>
                <p className="text-slate-700 leading-relaxed">{selectedScenario.rootCause}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="bg-emerald-50/70 p-3 rounded-lg border border-emerald-200">
                <span className="font-bold text-[11px] text-emerald-900 block mb-1">Biện pháp kỹ thuật (Phần mềm &amp; CSDL):</span>
                <p className="text-emerald-800 leading-relaxed">{selectedScenario.technicalRemedy}</p>
              </div>

              <div className="bg-blue-50/70 p-3 rounded-lg border border-blue-200">
                <span className="font-bold text-[11px] text-blue-900 block mb-1">Biện pháp nghiệp vụ (Hồ sơ &amp; Tác nghiệp):</span>
                <p className="text-blue-800 leading-relaxed">{selectedScenario.businessRemedy}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
