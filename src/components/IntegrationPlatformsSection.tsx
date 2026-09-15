import React, { useState } from 'react';
import { 
  Network, 
  Layers, 
  Workflow, 
  Server, 
  CheckCircle2, 
  Clock, 
  Radio, 
  Cpu, 
  ShieldAlert, 
  ArrowRight,
  ChevronDown,
  Building,
  Database,
  Lock,
  GitMerge
} from 'lucide-react';

export const IntegrationPlatformsSection: React.FC = () => {
  const [activeScopeTab, setActiveScopeTab] = useState<'scope1' | 'scope2'>('scope1');
  const [activeStep, setActiveStep] = useState<number>(1);
  const [selectedRequestType, setSelectedRequestType] = useState<number>(1);

  return (
    <div className="space-y-8">
      {/* Top Banner: NDOP & LDOP Overview */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 sm:p-8 text-white border border-indigo-500/30 shadow-xl">
        <div className="max-w-4xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 text-xs font-semibold">
            <Network className="w-3.5 h-3.5" />
            <span>Trục kết nối Quốc gia - Tỉnh theo Nghị định 278/2025/NĐ-CP</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            Nền tảng tích hợp & chia sẻ dữ liệu cấp Bộ, ngành và địa phương
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Mọi hoạt động truy vấn, chia sẻ, đồng bộ dữ liệu giữa các cơ quan trong hệ thống chính trị bắt buộc phải qua 
            <strong> Nền tảng chia sẻ, điều phối dữ liệu quốc gia (NDOP)</strong> do Trung tâm Dữ liệu quốc gia (C12 - Bộ Công an) vận hành. 
            Mỗi tỉnh, thành phố chỉ tổ chức <strong>01 Nền tảng tích hợp, chia sẻ dữ liệu cấp tỉnh (LDOP - kế thừa và nâng cấp từ LGSP)</strong> 
            làm đầu mối kỹ thuật duy nhất kết nối với NDOP qua <strong>Máy chủ bảo mật điểm kết nối (Agent Node)</strong>.
          </p>
        </div>
      </div>

      {/* Sơ đồ trực quan kết nối NDOP - LDOP - Agent Node */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-4">
          <GitMerge className="w-5 h-5 text-indigo-600" />
          <span>Sơ đồ luồng kết nối tổng quát giữa địa phương &amp; Trung ương</span>
        </h3>

        <div className="p-5 rounded-xl bg-slate-900 text-white border border-slate-800 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-center text-center">
            {/* Step 1: Ứng dụng địa phương */}
            <div className="bg-slate-800/90 border border-slate-700 rounded-xl p-3.5">
              <Building className="w-6 h-6 text-amber-400 mx-auto mb-1.5" />
              <div className="text-xs font-bold text-white">Hệ thống địa phương</div>
              <div className="text-[10px] text-slate-400 mt-1">Một cửa điện tử, Cổng DVC, CSDL chuyên ngành các Sở</div>
            </div>

            <div className="hidden md:flex justify-center text-slate-500">
              <ArrowRight className="w-5 h-5 text-slate-400 animate-pulse" />
            </div>

            {/* Step 2: LDOP cấp tỉnh */}
            <div className="bg-slate-800/90 border border-slate-700 rounded-xl p-3.5">
              <Layers className="w-6 h-6 text-blue-400 mx-auto mb-1.5" />
              <div className="text-xs font-bold text-white">Nền tảng tỉnh (LDOP)</div>
              <div className="text-[10px] text-slate-400 mt-1">Nâng cấp từ LGSP hiện có, điều phối nội bộ tỉnh</div>
            </div>

            <div className="hidden md:flex justify-center text-slate-500">
              <ArrowRight className="w-5 h-5 text-slate-400 animate-pulse" />
            </div>

            {/* Step 3: Agent Node */}
            <div className="bg-rose-950/60 border border-rose-500/50 rounded-xl p-3.5 ring-1 ring-rose-500/30">
              <Lock className="w-6 h-6 text-rose-400 mx-auto mb-1.5" />
              <div className="text-xs font-bold text-white">Agent Node (Máy chủ bảo mật)</div>
              <div className="text-[10px] text-rose-200 mt-1">Đặt tại mạng biên DMZ tỉnh, do C12 BCA cài đặt &amp; giám sát 24/7</div>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="px-4 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-xs text-amber-300 font-mono flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Mạng truyền số liệu chuyên dùng (TSLCD) • Mã hóa kênh truyền • Tối thiểu 10Gbps
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slate-800">
            <div className="bg-indigo-950/60 border border-indigo-500/40 rounded-xl p-4">
              <div className="flex items-center gap-2 text-indigo-300 font-bold text-xs mb-1">
                <Network className="w-4 h-4" />
                Nền tảng điều phối quốc gia (NDOP)
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Điều phối lưu lượng, xác thực token/mã định danh, kiểm soát phân quyền RBAC, cân bằng tải và ghi log toàn bộ giao dịch.
              </p>
            </div>

            <div className="bg-emerald-950/50 border border-emerald-500/40 rounded-xl p-4">
              <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs mb-1">
                <Database className="w-4 h-4" />
                Cụm 03 Trung tâm Dữ liệu quốc gia (NDC 1, 2, 3)
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Lưu trữ CSDL Tổng hợp quốc gia, 20 CSDL quốc gia, hạ tầng tính toán hiệu năng cao HPC/AI và dự phòng thảm họa Active-Active-Standby.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quy hoạch Kho Dữ liệu địa phương (Phụ lục 2) */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-5 h-5 text-amber-600" />
              <span>Quy hoạch kho dữ liệu cấp Tỉnh (Phụ lục 2 Công văn 4856)</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Phân định rõ ràng 02 Phạm vi kho dữ liệu để tránh đầu tư trùng lặp, lãng phí ngân sách
            </p>
          </div>

          {/* Scope Tabs */}
          <div className="flex p-1 bg-slate-100 rounded-lg shrink-0">
            <button
              onClick={() => setActiveScopeTab('scope1')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                activeScopeTab === 'scope1' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Phạm vi I: Dùng chung cốt lõi
            </button>
            <button
              onClick={() => setActiveScopeTab('scope2')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                activeScopeTab === 'scope2' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Phạm vi II: Đặc thù &amp; ứng dụng (IOC)
            </button>
          </div>
        </div>

        {/* Scope Tab Content */}
        {activeScopeTab === 'scope1' ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                Cấu phần a
              </span>
              <h4 className="text-xs font-bold text-slate-900">06 Miền dữ liệu lõi dùng chung</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tổ chức dưới dạng các <strong>miền dữ liệu lô-gic</strong> (Con người, Tổ chức, Tài sản, Địa chính, Địa chỉ, Nền địa lý). 
                Địa phương <strong>không bắt buộc lập kho vật lý riêng</strong> và <strong>không sao chép toàn bộ CSDL quốc gia</strong> về tỉnh. Tiếp cận mặc định qua DaaS/API.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                Cấu phần b
              </span>
              <h4 className="text-xs font-bold text-slate-900">Kho dữ liệu IoT quản lý nhà nước (3 cấp)</h4>
              <div className="text-xs text-slate-600 space-y-1.5 leading-relaxed">
                <div>• <strong>Cấp 1 (Raw Data):</strong> Video, tín hiệu cảm biến thô xử lý trực tiếp tại hạ tầng biên (Edge Computing).</div>
                <div>• <strong>Cấp 2 (Metadata / Sự kiện):</strong> Dữ liệu đã bóc tách (biển số, nhận dạng, cảnh báo sự cố) lưu tại kho IoT tỉnh.</div>
                <div>• <strong>Cấp 3 (Tổng hợp / Ẩn danh):</strong> Dữ liệu khử nhận dạng điều phối phục vụ kinh tế và công bố Dữ liệu mở (Open Data).</div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-purple-100 text-purple-800">
                Cấu phần c
              </span>
              <h4 className="text-xs font-bold text-slate-900">Kho quản trị &amp; điều hành (Bắt buộc)</h4>
              <div className="text-xs text-slate-600 space-y-1 leading-relaxed">
                <div>(1) Từ điển dữ liệu cấp tỉnh (bản mở rộng chuẩn QĐ 2439)</div>
                <div>(2) Danh mục dữ liệu (Data Catalog)</div>
                <div>(3) Ma trận phân quyền truy cập (Access Control Matrix)</div>
                <div>(4) Nhật ký hệ thống (Audit Log) lưu vết trọn đời</div>
                <div>(5) Chính sách lưu trữ &amp; tiêu hủy (Retention Policy)</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-200 text-amber-900">
                Phân hệ chỉ đạo điều hành
              </span>
              <h4 className="text-xs font-bold text-slate-900">Kho dữ liệu chỉ đạo, điều hành (Kho IOC)</h4>
              <p className="text-xs text-slate-700 leading-relaxed">
                Được thiết kế theo mô hình <strong>Data Warehouse / Data Lakehouse</strong>, hỗ trợ truy vấn đa chiều OLAP, lập báo cáo động 
                và trực quan hóa phục vụ Lãnh đạo UBND tỉnh. 
              </p>
              <div className="bg-white p-3 rounded-lg border border-amber-200 text-xs text-slate-700 space-y-1">
                <div className="font-semibold text-red-700">Nguyên tắc bảo vệ dữ liệu cá nhân trong Kho IOC:</div>
                <div>• Dữ liệu đưa vào Kho IOC <strong>chủ yếu là dữ liệu dẫn xuất, tổng hợp và phân tích</strong>.</div>
                <div>• Dữ liệu cá nhân phải <strong>bắt buộc ẩn danh hóa</strong> hoặc tổng hợp nhóm thống kê. Hạn chế tối đa lưu trữ dữ liệu cá nhân chi tiết trong IOC.</div>
                <div>• Nếu bắt buộc lưu chi tiết (camera, y tế, khiếu nại): phải lập hồ sơ đánh giá tác động theo Luật 91/2025/QH15 và đăng ký thời hạn tiêu hủy.</div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-200 text-blue-900">
                Kinh tế số &amp; Đổi mới sáng tạo
              </span>
              <h4 className="text-xs font-bold text-slate-900">Kho IoT phát triển kinh tế (Kinh tế số)</h4>
              <p className="text-xs text-slate-700 leading-relaxed">
                Tiếp nhận, lưu trữ và chia sẻ luồng dữ liệu thời gian thực (real-time) phục vụ phát triển kinh tế số, đóng vai trò là nguồn 
                <strong> Dữ liệu mở (Open Data)</strong> thúc đẩy khởi nghiệp và đổi mới sáng tạo.
              </p>
              <div className="bg-white p-3 rounded-lg border border-blue-200 text-xs text-slate-700 space-y-1">
                <div className="font-semibold text-slate-900">2 Nguồn hình thành dữ liệu chính:</div>
                <div>• <strong>Nguồn trực tiếp:</strong> Cảm biến nông nghiệp công nghệ cao (đất, thời tiết, độ ẩm, sâu bệnh), thiết bị logistics, cảng biển, hạ tầng đô thị (chiếu sáng, cấp thoát nước, trạm quan trắc KCN).</div>
                <div>• <strong>Nguồn điều phối:</strong> Dữ liệu thống kê đã được ẩn danh hóa trích xuất từ Kho IoT quản lý nhà nước.</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 03 Loại Yêu Cầu Khai Thác Dữ Liệu Từ TTDLQG (Phụ lục 2 Mục II.11) */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Workflow className="w-5 h-5 text-indigo-600" />
          <span>03 loại yêu cầu kết nối, khai thác dữ liệu từ Trung tâm Dữ liệu quốc gia</span>
        </h3>
        <p className="text-xs text-slate-500">
          Phân định thẩm quyền: Cơ quan chủ quản dữ liệu quyết định <em>nội dung</em> khai thác; TTDLQG thẩm định <em>điều kiện kỹ thuật, an ninh mạng</em> và tổ chức kết nối.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={() => setSelectedRequestType(1)}
            className={`p-4 rounded-xl text-left border transition-all ${
              selectedRequestType === 1 
                ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-300' 
                : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
            }`}
          >
            <div className="text-xs font-bold text-emerald-800">Loại 1</div>
            <div className="font-bold text-sm text-slate-900 mt-1">Khai thác tự động</div>
            <div className="text-xs text-slate-500 mt-1">Dữ liệu chia sẻ bắt buộc theo Nghị định 278</div>
          </button>

          <button
            onClick={() => setSelectedRequestType(2)}
            className={`p-4 rounded-xl text-left border transition-all ${
              selectedRequestType === 2 
                ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-300' 
                : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
            }`}
          >
            <div className="text-xs font-bold text-blue-800">Loại 2</div>
            <div className="font-bold text-sm text-slate-900 mt-1">Khai thác theo yêu cầu</div>
            <div className="text-xs text-slate-500 mt-1">Dữ liệu chia sẻ có điều kiện / Thống kê</div>
          </button>

          <button
            onClick={() => setSelectedRequestType(3)}
            className={`p-4 rounded-xl text-left border transition-all ${
              selectedRequestType === 3 
                ? 'bg-purple-50 border-purple-500 ring-2 ring-purple-300' 
                : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
            }`}
          >
            <div className="text-xs font-bold text-purple-800">Loại 3</div>
            <div className="font-bold text-sm text-slate-900 mt-1">Khai thác đặc biệt</div>
            <div className="text-xs text-slate-500 mt-1">Dữ liệu vi mô (Micro Data), AI/Big Data</div>
          </button>
        </div>

        {/* Deep Dive of Selected Request Type */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs space-y-3">
          {selectedRequestType === 1 && (
            <div className="space-y-2">
              <div className="font-bold text-sm text-emerald-900">Quy trình Yêu cầu Loại 1 (Khai thác tự động):</div>
              <p className="text-slate-700 leading-relaxed">
                Áp dụng đối với danh mục dữ liệu chia sẻ bắt buộc được quy định tại Nghị định số 278/2025/NĐ-CP. Nội dung khai thác đã được xác định cụ thể trong danh mục, <strong>không cần phê duyệt hay chấp thuận từng lần</strong>.
              </p>
              <div className="bg-white p-3 rounded-lg border border-slate-200">
                <strong>Hồ sơ &amp; Thủ tục:</strong> Chỉ cần gửi hồ sơ đăng ký kết nối kỹ thuật. TTDLQG thẩm định an ninh mạng, cấu hình đường truyền và cấp tài khoản API/khóa truy cập trên NDOP.
              </div>
            </div>
          )}

          {selectedRequestType === 2 && (
            <div className="space-y-2">
              <div className="font-bold text-sm text-blue-900">Quy trình Yêu cầu Loại 2 (Khai thác theo yêu cầu):</div>
              <p className="text-slate-700 leading-relaxed">
                Áp dụng đối với dữ liệu thống kê tổng hợp và các dữ liệu chia sẻ có điều kiện. Cơ quan chủ quản dữ liệu xem xét, quyết định nội dung khai thác; TTDLQG thẩm định hạ tầng kỹ thuật và tổ chức kết nối.
              </p>
              <div className="bg-white p-3 rounded-lg border border-slate-200">
                <strong>Hồ sơ &amp; Thủ tục:</strong> Hồ sơ đăng ký kèm bản thuyết minh mục đích sử dụng, phạm vi trường dữ liệu, số lượng, thời hạn khai thác và SLA; gửi qua Hệ thống chia sẻ dữ liệu quốc gia. Kết quả là văn bản chấp thuận kèm phân quyền API.
              </div>
            </div>
          )}

          {selectedRequestType === 3 && (
            <div className="space-y-2">
              <div className="font-bold text-sm text-purple-900">Quy trình Yêu cầu Loại 3 (Khai thác đặc biệt - Dữ liệu vi mô / AI):</div>
              <p className="text-slate-700 leading-relaxed">
                Áp dụng đối với dữ liệu chi tiết ở cấp độ bản ghi đơn lẻ (micro data) phục vụ huấn luyện mô hình Trí tuệ nhân tạo (AI/ML), phân tích Big Data hoặc dữ liệu thuộc diện hạn chế chia sẻ.
              </p>
              <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-1.5">
                <div className="font-semibold text-red-700">Điều kiện bắt buộc:</div>
                <div>1. Phải hoàn thành <strong>ẩn danh hóa hoặc giả danh hóa (Pseudonymization)</strong>, không thể xác định con người cụ thể theo Luật Bảo vệ DLCN 91/2025/QH15.</div>
                <div>2. Lập hồ sơ đánh giá tác động xử lý dữ liệu cá nhân; cam kết bằng văn bản <strong>tuyệt đối không tái định danh</strong> và không chuyển giao cho bên thứ ba.</div>
                <div>3. Cơ quan chủ quản dữ liệu phê duyệt bằng văn bản; TTDLQG thẩm định an ninh mạng chuyên sâu.</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quy trình kết nối đồng bộ 5 bước theo Nghị định 278 (Phụ lục 4) */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-2">
          <Clock className="w-5 h-5 text-emerald-600" />
          <span>Quy trình kết nối đồng bộ dữ liệu 05 bước theo Nghị định 278 (Phụ lục 4)</span>
        </h3>
        <p className="text-xs text-slate-500 mb-6">
          Quy trình chuẩn áp dụng cho tất cả các Bộ, cơ quan ngang Bộ và UBND cấp tỉnh khi kết nối đồng bộ dữ liệu về Trung tâm Dữ liệu quốc gia
        </p>

        {/* Step Tabs */}
        <div className="grid grid-cols-5 gap-2 mb-6">
          {[
            { step: 1, name: 'Bước 1', title: 'Thống nhất nội dung & phạm vi' },
            { step: 2, name: 'Bước 2', title: 'Thẩm định hồ sơ (14 ngày)' },
            { step: 3, name: 'Bước 3', title: 'Thiết lập & cấu hình Agent Node' },
            { step: 4, name: 'Bước 4', title: 'Kiểm thử dịch vụ & hiệu năng' },
            { step: 5, name: 'Bước 5', title: 'Khai thác & ký Quy chế' },
          ].map((s) => (
            <button
              key={s.step}
              onClick={() => setActiveStep(s.step)}
              className={`p-2.5 rounded-lg text-center border transition-all ${
                activeStep === s.step
                  ? 'bg-indigo-600 text-white border-indigo-700 shadow-md'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
              }`}
            >
              <div className={`text-[10px] font-bold ${activeStep === s.step ? 'text-indigo-200' : 'text-slate-400'}`}>
                {s.name}
              </div>
              <div className="font-bold text-[11px] mt-0.5 line-clamp-1">{s.title}</div>
            </button>
          ))}
        </div>

        {/* Step Details */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-xs">
          {activeStep === 1 && (
            <div className="space-y-3">
              <h4 className="font-bold text-sm text-slate-900">Bước 1: Thống nhất nội dung, phạm vi đồng bộ dữ liệu</h4>
              <p className="text-slate-700 leading-relaxed">
                Bộ/ngành/địa phương phối hợp với Trung tâm Dữ liệu quốc gia – Bộ Công an thống nhất:
              </p>
              <ul className="list-disc list-inside space-y-1 text-slate-700">
                <li>Danh mục dữ liệu đồng bộ, cấu trúc bản ghi, trường dữ liệu, kiểu dữ liệu theo QĐ 2439.</li>
                <li>Phương thức &amp; cơ chế: Đồng bộ 1 lần, đồng bộ theo thời gian thực (real-time) hoặc theo lô, xử lý khi mất kết nối.</li>
                <li>Quy tắc xử lý và đối soát: xử lý bản ghi trùng, kiểm tra tính hợp lệ, cơ chế đối soát kết quả.</li>
                <li>Đầu mối kỹ thuật: Nghiệp vụ, kỹ thuật, an ninh mạng.</li>
                <li>Gửi kèm Biên bản xác nhận bảo đảm an toàn thông tin, an ninh mạng cho hệ thống kết nối (có hiệu lực trong 06 tháng).</li>
              </ul>
            </div>
          )}

          {activeStep === 2 && (
            <div className="space-y-3">
              <h4 className="font-bold text-sm text-slate-900">Bước 2: Thẩm định và phê duyệt phương án kết nối</h4>
              <p className="text-slate-700 leading-relaxed">
                TTDLQG chủ trì tổ chức thẩm định hồ sơ trong thời hạn tối đa <strong>14 ngày</strong>:
              </p>
              <ul className="list-disc list-inside space-y-1 text-slate-700">
                <li>Đánh giá tính đầy đủ của hồ sơ và các căn cứ pháp lý liên quan.</li>
                <li>Khả năng đáp ứng tiêu chuẩn kỹ thuật, quy chuẩn kết nối của hệ thống thông tin.</li>
                <li>Đánh giá việc đáp ứng yêu cầu an toàn thông tin theo cấp độ (Nghị định 85/2016/NĐ-CP &amp; Thông tư 12/2022/TT-BTTTT).</li>
                <li>Đánh giá năng lực chịu tải của Nền tảng NDOP, máy chủ Agent Node tại địa phương.</li>
              </ul>
            </div>
          )}

          {activeStep === 3 && (
            <div className="space-y-3">
              <h4 className="font-bold text-sm text-slate-900">Bước 3: Thiết lập và cấu hình kết nối</h4>
              <p className="text-slate-700 leading-relaxed">
                Sau khi thẩm định đạt yêu cầu, hai bên triển khai kỹ thuật:
              </p>
              <ul className="list-disc list-inside space-y-1 text-slate-700">
                <li><strong>C12 Bộ Công an</strong> triển khai, cài đặt máy chủ <strong>Agent Node</strong> tại hạ tầng của Bộ/ngành/tỉnh làm điểm kết nối trung gian bảo mật (đặt tại phân vùng DMZ).</li>
                <li>Cấu hình dịch vụ dữ liệu đồng bộ, giao diện lập trình ứng dụng (API) trên NDOP và Agent Node.</li>
                <li>Thiết lập xác thực, phân quyền RBAC, cấu hình chứng thư số và khóa bảo mật HSM.</li>
                <li>Thiết lập cơ chế giám sát, ghi nhật ký (Audit Log) và cảnh báo tự động 24/7.</li>
              </ul>
            </div>
          )}

          {activeStep === 4 && (
            <div className="space-y-3">
              <h4 className="font-bold text-sm text-slate-900">Bước 4: Kiểm thử dịch vụ trước khi đưa vào khai thác chính thức</h4>
              <p className="text-slate-700 leading-relaxed">
                Tổ chức kiểm thử toàn diện bảo đảm chất lượng trước khi go-live:
              </p>
              <ul className="list-disc list-inside space-y-1 text-slate-700">
                <li>Kiểm thử kết nối kỹ thuật giữa hệ thống thông tin đơn vị - Agent Node - Nền tảng NDOP.</li>
                <li>Kiểm thử các kịch bản cung cấp dịch vụ, đồng bộ dữ liệu thời gian thực và theo lô.</li>
                <li>Đánh giá hiệu năng xử lý, độ trễ và khả năng chịu tải cao điểm.</li>
                <li>Ký Biên bản xác nhận kết quả kiểm thử giữa TTDLQG và đơn vị đồng bộ dữ liệu.</li>
              </ul>
            </div>
          )}

          {activeStep === 5 && (
            <div className="space-y-3">
              <h4 className="font-bold text-sm text-slate-900">Bước 5: Đưa dịch vụ vào khai thác & thống nhất quy chế phối hợp</h4>
              <p className="text-slate-700 leading-relaxed">
                Hoàn tất thủ tục pháp lý để vận hành chính thức:
              </p>
              <ul className="list-disc list-inside space-y-1 text-slate-700">
                <li>Ký kết Quy chế phối hợp: phân định trách nhiệm cung cấp dịch vụ, an ninh mạng, quy trình ứng cứu sự cố.</li>
                <li>Cam kết SLA về tính sẵn sàng của dữ liệu và thời hạn khắc phục sai lệch.</li>
                <li>Kích hoạt chính thức dịch vụ trên NDOP và đưa vào phục vụ người dân, doanh nghiệp.</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
