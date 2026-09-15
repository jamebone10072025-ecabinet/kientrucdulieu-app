import React, { useState } from 'react';
import { 
  GOVERNANCE_DEPARTMENTS, 
  KEY_ROLES, 
  PROVINCIAL_DEPLOYMENT_MODELS, 
  LEGAL_BASIS 
} from '../data/nationalDataArchitecture';
import { 
  ShieldCheck, 
  Users, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  Clock, 
  Compass, 
  Building2, 
  ChevronRight,
  Info,
  CalendarDays,
  Target
} from 'lucide-react';
import { NationalIntegrationDashboard } from './NationalIntegrationDashboard';

export const OverviewSection: React.FC = () => {
  const [selectedDeptId, setSelectedDeptId] = useState<string>('compliance');
  const [selectedModelId, setSelectedModelId] = useState<string>('model-1');

  const selectedDept = GOVERNANCE_DEPARTMENTS.find(d => d.id === selectedDeptId) || GOVERNANCE_DEPARTMENTS[0];
  const selectedModel = PROVINCIAL_DEPLOYMENT_MODELS.find(m => m.id === selectedModelId) || PROVINCIAL_DEPLOYMENT_MODELS[0];

  return (
    <div className="space-y-8">
      {/* Hero / Executive Summary */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-6 sm:p-8 text-white border border-slate-700/60 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 text-xs font-semibold">
            <Compass className="w-3.5 h-3.5" />
            <span>Chỉ đạo thống nhất theo Công văn 4856/BCA-TTDLQG ngày 14/9/2026</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-snug">
            Khung Quản trị & Quản lý dữ liệu Quốc gia
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Thiết lập mô hình tổ chức, quản trị, quản lý dữ liệu xuyên suốt từ Trung tâm Dữ liệu quốc gia đến các Bộ, ngành và 
            địa phương theo <strong>Quyết định 2439/QĐ-TTg</strong> và <strong>Nghị định 278/2025/NĐ-CP</strong>. Nguyên tắc cốt lõi: 
            <strong> "Đúng, Đủ, Sạch, Sống, Thống nhất, Dùng chung"</strong>, kết nối qua Nền tảng chia sẻ, điều phối dữ liệu quốc gia (NDOP), 
            không đầu tư phân tán, bảo đảm an ninh an toàn tuyệt đối.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-3">
              <div className="text-xl sm:text-2xl font-black text-amber-400">05</div>
              <div className="text-xs text-slate-300 mt-0.5">Bộ phận chức năng bắt buộc</div>
            </div>
            <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-3">
              <div className="text-xl sm:text-2xl font-black text-emerald-400">03</div>
              <div className="text-xs text-slate-300 mt-0.5">Mô hình tổ chức địa phương</div>
            </div>
            <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-3">
              <div className="text-xl sm:text-2xl font-black text-blue-400">06</div>
              <div className="text-xs text-slate-300 mt-0.5">Miền dữ liệu lõi dùng chung</div>
            </div>
            <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-3">
              <div className="text-xl sm:text-2xl font-black text-rose-400">100%</div>
              <div className="text-xs text-slate-300 mt-0.5">DQI trường định danh (Không sai số)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bảng Giám sát Tiến độ Tích hợp Dữ liệu Quốc gia (D3 Charts) */}
      <NationalIntegrationDashboard />

      {/* Căn cứ pháp lý then chốt */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-4">
          <FileText className="w-5 h-5 text-red-600" />
          <span>Hệ thống căn cứ pháp lý trọng tâm</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {LEGAL_BASIS.map((item, idx) => (
            <div key={idx} className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/80 hover:border-slate-300 transition-colors">
              <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5 text-blue-900">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0" />
                {item.code}
              </div>
              <div className="text-xs font-semibold text-slate-800 mt-1">{item.title}</div>
              <div className="text-[11px] text-slate-500 mt-1 leading-relaxed">{item.role}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Mô hình 05 Bộ phận Quản trị dữ liệu theo QĐ 2439 */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-amber-600" />
              <span>Mô hình 05 bộ phận quản trị, quản lý dữ liệu</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Quy định tại Quyết định 2439/QĐ-TTg & Phụ lục 1 Công văn 4856/BCA-TTDLQG (Không bắt buộc thành lập đơn vị hành chính mới)
            </p>
          </div>
          <div className="px-2.5 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-md text-xs font-medium self-start sm:self-auto">
            Sắp xếp trong biên chế hiện có
          </div>
        </div>

        {/* Department Selector Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-6">
          {GOVERNANCE_DEPARTMENTS.map((dept) => {
            const isSelected = dept.id === selectedDeptId;
            return (
              <button
                key={dept.id}
                onClick={() => setSelectedDeptId(dept.id)}
                className={`p-3 rounded-xl text-left transition-all border ${
                  isSelected
                    ? 'bg-amber-500 text-white border-amber-600 shadow-md ring-2 ring-amber-400/40'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                <div className={`text-[10px] font-bold uppercase tracking-wider ${isSelected ? 'text-amber-100' : 'text-slate-400'}`}>
                  {dept.code}
                </div>
                <div className="font-bold text-xs mt-1 leading-snug">{dept.name}</div>
              </button>
            );
          })}
        </div>

        {/* Selected Department Details */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
            <div>
              <div className="inline-block text-[11px] font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-800 mr-2">
                {selectedDept.code}
              </div>
              <span className="text-base font-bold text-slate-900">{selectedDept.vietnameseTitle}</span>
              <p className="text-xs text-slate-600 mt-1 font-medium">{selectedDept.shortRole}</p>
            </div>
            {selectedDept.notes && (
              <div className="bg-red-50 text-red-700 text-xs px-2.5 py-1 rounded-md border border-red-200 font-medium flex items-center gap-1.5 shrink-0">
                <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
                {selectedDept.notes}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Chức năng & Nhiệm vụ */}
            <div>
              <h4 className="text-xs font-bold uppercase text-slate-500 tracking-wider mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Chức năng & quyền hạn trọng tâm
              </h4>
              <ul className="space-y-2">
                {selectedDept.functions.map((fn, idx) => (
                  <li key={idx} className="text-xs text-slate-700 flex items-start gap-2 bg-white p-2.5 rounded-lg border border-slate-200/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                    <span>{fn}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Phân công thực tế & Nhân sự */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase text-slate-500 tracking-wider mb-2 flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-blue-600" />
                Phân công triển khai thực tế
              </h4>
              
              <div className="bg-white p-3 rounded-lg border border-slate-200/80 space-y-1">
                <div className="text-[11px] font-bold text-slate-500">Tại các Bộ, Cơ quan Trung ương:</div>
                <div className="text-xs text-slate-800 font-medium">{selectedDept.responsibilitiesAtMinistry}</div>
              </div>

              <div className="bg-white p-3 rounded-lg border border-slate-200/80 space-y-1">
                <div className="text-[11px] font-bold text-slate-500">Tại Địa phương (Cấp Tỉnh):</div>
                <div className="text-xs text-slate-800 font-medium">{selectedDept.responsibilitiesAtProvince}</div>
                <div className="text-[11px] text-amber-700 font-semibold mt-1">Đầu mối phụ trách: {selectedDept.provincialInCharge}</div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <div className="bg-white p-2.5 rounded-lg border border-slate-200 text-xs">
                  <span className="text-[11px] text-slate-500 block font-medium">Khuyến nghị nhân sự:</span>
                  <span className="font-bold text-slate-800">{selectedDept.recommendedStaff}</span>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-slate-200 text-xs">
                  <span className="text-[11px] text-slate-500 block font-medium">Khung đào tạo (QĐ 1555):</span>
                  <span className="font-bold text-blue-700">{selectedDept.trainingProgram}</span>
                </div>
              </div>

              <div className="bg-amber-50/70 p-2.5 rounded-lg border border-amber-200/80 text-[11px] text-amber-900">
                <strong>Tiêu chuẩn năng lực:</strong> {selectedDept.qualification}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Các vai trò then chốt */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-4">
          <Users className="w-5 h-5 text-indigo-600" />
          <span>Các chức danh & vai trò then chốt trong hệ thống quản trị</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {KEY_ROLES.map((role, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <h4 className="text-xs font-bold text-slate-900">{role.role}</h4>
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                    {role.titleEn}
                  </span>
                </div>
                <div className="text-[11px] font-semibold text-slate-500 mb-2">Phạm vi: {role.scope}</div>
                <p className="text-xs text-slate-600 leading-relaxed">{role.description}</p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-200 flex items-center justify-between text-[11px]">
                <span className="text-slate-500 font-medium">Bố trí nhân sự:</span>
                <span className="font-bold text-slate-800">{role.staffing}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 03 Mô hình tổ chức khuyến nghị tại địa phương */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-emerald-600" />
              <span>03 mô hình tổ chức khuyến nghị tại địa phương (cấp Tỉnh)</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Căn cứ Phụ lục 1 Mục III.4 (Chủ tịch UBND tỉnh quyết định áp dụng linh hoạt, bắt buộc đầy đủ 5 bộ phận và Công an tỉnh làm Tuân thủ)
            </p>
          </div>
        </div>

        {/* Model Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          {PROVINCIAL_DEPLOYMENT_MODELS.map((model) => {
            const isSelected = model.id === selectedModelId;
            return (
              <button
                key={model.id}
                onClick={() => setSelectedModelId(model.id)}
                className={`p-4 rounded-xl text-left transition-all border ${
                  isSelected
                    ? 'bg-emerald-700 text-white border-emerald-800 shadow-md'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
                }`}
              >
                <div className={`text-xs font-bold ${isSelected ? 'text-emerald-200' : 'text-emerald-700'}`}>
                  {model.title.split(':')[0]}
                </div>
                <div className="font-bold text-sm mt-1 leading-snug">
                  {model.title.split(':')[1] || model.title}
                </div>
                <div className={`text-xs mt-2 line-clamp-2 ${isSelected ? 'text-emerald-100' : 'text-slate-500'}`}>
                  {model.subtitle}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Model Deep Dive */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4">
          <div className="border-b border-slate-200 pb-3">
            <h4 className="text-base font-bold text-slate-900">{selectedModel.title}</h4>
            <p className="text-xs text-slate-600 mt-1">{selectedModel.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="bg-white p-3 rounded-lg border border-slate-200">
                <span className="text-[11px] font-bold uppercase text-slate-500 block mb-1">Điều kiện áp dụng:</span>
                <p className="text-xs text-slate-800 leading-relaxed">{selectedModel.applicableCondition}</p>
              </div>

              <div className="bg-white p-3 rounded-lg border border-slate-200">
                <span className="text-[11px] font-bold uppercase text-slate-500 block mb-1">Cấu trúc bộ máy & phân công:</span>
                <p className="text-xs text-slate-800 leading-relaxed">{selectedModel.structureDescription}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="bg-white p-3.5 rounded-lg border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">Người chịu trách nhiệm (CDO tỉnh):</span>
                  <span className="font-bold text-slate-900">{selectedModel.cdoRole}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">Bộ phận Tuân thủ (bắt buộc):</span>
                  <span className="font-bold text-red-700">{selectedModel.complianceLead}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">Bộ phận Kỹ thuật dữ liệu:</span>
                  <span className="font-bold text-blue-700">{selectedModel.dataEngineeringLead}</span>
                </div>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
                <span className="text-xs font-bold text-emerald-900 block mb-1.5">Ưu điểm & đặc trưng:</span>
                <ul className="space-y-1">
                  {selectedModel.pros.map((pro, pidx) => (
                    <li key={pidx} className="text-xs text-emerald-800 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>

              {selectedModel.transitionCondition && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-900">
                  <strong>Tiêu chí chuyển đổi:</strong> {selectedModel.transitionCondition}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Lộ trình triển khai & Phân nhóm ưu tiên */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-blue-600" />
          <span>Lộ trình triển khai 3 giai đoạn & phân nhóm ưu tiên</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-200">
            <div className="flex items-center gap-2 text-blue-900 font-bold text-sm mb-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
              Nhóm 1 – Nhóm ưu tiên triển khai
            </div>
            <p className="text-xs text-slate-700 leading-relaxed mb-2">
              <strong>Bộ ngành:</strong> Các cơ quan chủ quản 20 CSDL Quốc gia (QĐ 11/2026/QĐ-TTg) như Bộ Công an, Bộ Tài chính, Bộ NN&PTNT, Bộ Nội vụ, Bộ Tư pháp, Bộ Xây dựng, Bộ Y tế, Bộ GD&ĐT...
            </p>
            <p className="text-xs text-slate-700 leading-relaxed">
              <strong>Địa phương:</strong> 08 Thành phố trực thuộc Trung ương gồm: Hà Nội, TP. Hồ Chí Minh, Hải Phòng, Đà Nẵng, Cần Thơ, Huế, Đồng Nai, Quảng Ninh.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm mb-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-500" />
              Nhóm 2 – Triển khai theo lộ trình chung
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              Gồm các Bộ, cơ quan ngang Bộ còn lại và các tỉnh, thành phố trực thuộc Trung ương không thuộc Nhóm 1. TTDLQG theo dõi tiến độ và hỗ trợ kỹ thuật đồng bộ.
            </p>
          </div>
        </div>

        {/* 3 Phases Timeline */}
        <div className="relative border-l-2 border-slate-200 ml-4 space-y-6">
          <div className="relative pl-6">
            <span className="absolute -left-2 top-1.5 w-4 h-4 rounded-full bg-amber-500 border-2 border-white ring-2 ring-amber-200" />
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700">Giai đoạn 1</span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs font-semibold text-slate-600">Nhóm 1: 30 ngày | Nhóm 2: 45 ngày</span>
            </div>
            <h4 className="text-sm font-bold text-slate-900 mt-1">Rà soát, kiện toàn mô hình tổ chức & phân công trách nhiệm</h4>
            <p className="text-xs text-slate-600 mt-1">
              Rà soát hiện trạng trong vòng 15 ngày; phân công CDO, ban hành quyết định kiện toàn 05 Bộ phận, chỉ định mạng lưới Data Steward và đầu mối cấp xã; gửi danh sách về TTDLQG.
            </p>
          </div>

          <div className="relative pl-6">
            <span className="absolute -left-2 top-1.5 w-4 h-4 rounded-full bg-blue-500 border-2 border-white ring-2 ring-blue-200" />
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700">Giai đoạn 2</span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs font-semibold text-slate-600">Nhóm 1: 04 tháng | Nhóm 2: 06 tháng</span>
            </div>
            <h4 className="text-sm font-bold text-slate-900 mt-1">Chuẩn hóa năng lực nhân sự & thiết lập cơ chế phối hợp</h4>
            <p className="text-xs text-slate-600 mt-1">
              Tham gia đào tạo theo Quyết định 1555/QĐ-TTg; thiết lập kênh phối hợp song song giữa CDO, 5 bộ phận, Data Steward và TTDLQG; giải quyết khoảng trống trách nhiệm.
            </p>
          </div>

          <div className="relative pl-6">
            <span className="absolute -left-2 top-1.5 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white ring-2 ring-emerald-200" />
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Giai đoạn 3</span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs font-semibold text-slate-600">Thường xuyên, liên tục (Định kỳ rà soát &ge; 01 lần/năm)</span>
            </div>
            <h4 className="text-sm font-bold text-slate-900 mt-1">Vận hành thường xuyên, rà soát và củng cố mô hình</h4>
            <p className="text-xs text-slate-600 mt-1">
              Duy trì vận hành hệ thống, kiểm soát thường xuyên, liên tục thay vì làm sạch theo đợt; chuyển đổi từ Mô hình 3 sang Mô hình 2 hoặc Mô hình 1 khi đủ năng lực.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
