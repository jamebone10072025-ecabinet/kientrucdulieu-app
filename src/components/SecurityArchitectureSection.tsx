import React, { useState } from 'react';
import { NATIONAL_DATA_CENTERS } from '../data/nationalDataArchitecture';
import { 
  ShieldCheck, 
  Lock, 
  Server, 
  Network, 
  HardDrive, 
  Cpu, 
  AlertOctagon, 
  CheckCircle2, 
  Layers, 
  Radio, 
  ArrowRightLeft,
  KeyRound,
  FileBadge,
  EyeOff
} from 'lucide-react';

export const SecurityArchitectureSection: React.FC = () => {
  const [selectedCenterId, setSelectedCenterId] = useState<string>('ndc-1');
  const selectedCenter = NATIONAL_DATA_CENTERS.find(c => c.id === selectedCenterId) || NATIONAL_DATA_CENTERS[0];

  return (
    <div className="space-y-8">
      {/* Top Banner: Bảo Mật & An Toàn Thông Tin Cấp Độ */}
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-red-950 rounded-2xl p-6 sm:p-8 text-white border border-red-500/30 shadow-xl">
        <div className="max-w-4xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 text-red-300 border border-red-400/30 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Yêu cầu kỹ thuật &amp; giải pháp bảo mật cấp Quốc gia (Phụ lục 4 &amp; 5)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            Kiến trúc an ninh mạng, máy chủ Agent Node &amp; hạ tầng đám mây Quốc gia
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Hệ thống bảo đảm an ninh mạng theo mô hình <strong>Zero Trust &amp; Defense in Depth</strong>, tuân thủ Luật An ninh mạng, 
            Luật Dữ liệu 2024, Luật Bảo vệ dữ liệu cá nhân 2025 và Tiêu chuẩn an toàn thông tin Cấp độ 4 - Cấp độ 5 (TCVN 14423, ISO 27001, Tier IV). 
            Mọi điểm kết nối từ địa phương về Trung ương đều được kiểm soát nghiêm ngặt qua <strong>Máy chủ bảo mật Agent Node</strong>.
          </p>
        </div>
      </div>

      {/* Thành phần Máy chủ bảo mật điểm kết nối (Agent Node) */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Lock className="w-5 h-5 text-red-600" />
              <span>Thành phần bảo mật điểm kết nối "Agent Node" (Phụ lục 4 Mục C)</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Cổng bảo mật duy nhất được bố trí tại vùng mạng biên của cơ quan, kết nối trực tiếp với Nền tảng NDOP
            </p>
          </div>
          <span className="px-2.5 py-1 bg-red-50 text-red-800 border border-red-200 rounded text-xs font-bold self-start sm:self-auto">
            Quản lý tập trung 24/7 bởi C12 BCA
          </span>
        </div>

        {/* 4 Nguyên tắc vàng về Agent Node */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
              <Layers className="w-4 h-4 text-amber-600" />
              Vùng mạng biên (DMZ)
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Triển khai tại vùng mạng biên, <strong>độc lập về mặt vật lý</strong> với mạng nghiệp vụ nội bộ của địa phương, ngăn ngừa nguy cơ tấn công lan truyền.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
              <Server className="w-4 h-4 text-blue-600" />
              01 đầu mối duy nhất
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Bố trí tập trung tại 01 đầu mối kết nối của Bộ/Tỉnh. <strong>Không yêu cầu triển khai riêng lẻ</strong> trên từng CSDL hoặc ứng dụng thành phần.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
              <KeyRound className="w-4 h-4 text-emerald-600" />
              Chữ ký số &amp; mã hóa HSM
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Tích hợp chứng thư số cơ quan, xác thực mutual TLS (mTLS), cơ chế giới hạn tần suất (Rate Limiting) và ghi nhật ký tự động (Audit Log).
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
              <ShieldCheck className="w-4 h-4 text-red-600" />
              Trách nhiệm C12 BCA
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              TTDLQG (C12) chủ trì cấp máy chủ, trực tiếp cài đặt, rà quét lỗ hổng định kỳ, cập nhật bản vá và giám sát an ninh mạng 24/7.
            </p>
          </div>
        </div>

        {/* Kiến trúc kỹ thuật bên trong Agent Node */}
        <div className="p-4 rounded-xl bg-slate-900 text-slate-100 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-amber-300">
            <span>CẤU TRÚC KỸ THUẬT PHẦN MỀM MÁY CHỦ AGENT NODE</span>
            <span className="text-slate-400 font-mono text-[11px]">Bảo mật theo tiêu chuẩn FIPS 140-3</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
            <div className="p-2.5 rounded-lg bg-slate-800 border border-slate-700">
              <div className="font-mono text-amber-400 font-bold">Agent Proxy</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Xác thực mTLS &amp; Định tuyến</div>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-800 border border-slate-700">
              <div className="font-mono text-blue-400 font-bold">XML / JSON Engine</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Kiểm tra cú pháp &amp; Schema</div>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-800 border border-slate-700">
              <div className="font-mono text-rose-400 font-bold">WAF &amp; Anti-DDoS</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Chặn injection, Rate limiting</div>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-800 border border-slate-700">
              <div className="font-mono text-emerald-400 font-bold">Audit Log Daemon</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Lưu vết số hóa bất biến</div>
            </div>
          </div>
        </div>
      </div>

      {/* Mạng Truyền Số Liệu Chuyên Dùng (TSLCD) & Kiến Trúc 3 Lớp */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Network className="w-5 h-5 text-blue-600" />
          <span>Hạ tầng mạng truyền dẫn 3 lớp &amp; nâng cấp TSLCD (2026 - 2028)</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-200 text-blue-900">
              Lớp 1: Core – Backbone
            </span>
            <h4 className="text-xs font-bold text-slate-900">Liên kết các Trung tâm Dữ liệu Quốc gia</h4>
            <ul className="text-xs text-slate-700 space-y-1">
              <li>• Băng thông tối thiểu: <strong>400 Gbps</strong></li>
              <li>• Độ trễ mạng: <strong>dưới 10ms</strong></li>
              <li>• Tuyến TT1 &amp; TT2: 2x100G TSLCD + 2x100G cáp biển IAE dự phòng</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-200 space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-200 text-indigo-900">
              Lớp 2: Distribution
            </span>
            <h4 className="text-xs font-bold text-slate-900">Kết nối TTDLQG tới Bộ ngành &amp; Tỉnh</h4>
            <ul className="text-xs text-slate-700 space-y-1">
              <li>• Trục Bắc - Nam: Nâng cấp lên <strong>100 Gbps</strong></li>
              <li>• Kết nối từng tỉnh/thành: Tối thiểu <strong>10 Gbps</strong></li>
              <li>• Hỗ trợ SD-WAN điều phối tự động tối ưu đường truyền</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-200 text-emerald-900">
              Lớp 3: Access
            </span>
            <h4 className="text-xs font-bold text-slate-900">Kết nối từ Agent Node tới Cấp Xã</h4>
            <ul className="text-xs text-slate-700 space-y-1">
              <li>• Kết nối qua mạng LDOP/LGSP nội bộ của địa phương</li>
              <li>• Đảm bảo đường truyền từ xã/phường nhập liệu về tỉnh</li>
              <li>• Cấp xã không đầu tư kho dữ liệu riêng, dùng chung hạ tầng tỉnh</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Cụm 03 Trung Tâm Dữ Liệu Quốc Gia (Nghị quyết 175/NQ-CP) */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Server className="w-5 h-5 text-emerald-600" />
              <span>Quy hoạch Cụm 03 Trung tâm Dữ liệu Quốc gia (Nghị quyết 175/NQ-CP)</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Mô hình kiến trúc Active - Active - Standby bảo đảm tính sẵn sàng cao và dự phòng thảm họa quốc gia
            </p>
          </div>
          <span className="px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded text-xs font-bold">
            Kiến trúc Active-Active-Standby
          </span>
        </div>

        {/* Center Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {NATIONAL_DATA_CENTERS.map((center) => {
            const isSelected = center.id === selectedCenterId;
            return (
              <button
                key={center.id}
                onClick={() => setSelectedCenterId(center.id)}
                className={`p-4 rounded-xl text-left border transition-all ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-950 shadow-md ring-2 ring-amber-400'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                    center.mode === 'Active-Active' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                  }`}>
                    {center.mode}
                  </span>
                  <span className="text-xs font-mono font-bold text-amber-400">{center.tier}</span>
                </div>
                <div className="font-bold text-xs sm:text-sm mt-2 leading-snug">{center.name}</div>
                <div className={`text-[11px] mt-1 ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                  {center.location}
                </div>
              </button>
            );
          })}
        </div>

        {/* Center Details */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
            <div>
              <h4 className="text-sm font-bold text-slate-900">{selectedCenter.name}</h4>
              <p className="text-xs text-slate-600 mt-0.5">{selectedCenter.location}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs font-semibold rounded">
                Tiêu chuẩn: {selectedCenter.tier}
              </span>
              <span className="px-2 py-0.5 bg-purple-100 text-purple-800 text-xs font-semibold rounded">
                {selectedCenter.securityLevel}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="text-[11px] font-bold uppercase text-slate-500 block mb-2">Chức năng &amp; Nhiệm vụ cốt lõi:</span>
              <ul className="space-y-1.5">
                {selectedCenter.keyFunctions.map((fn, idx) => (
                  <li key={idx} className="text-xs text-slate-700 flex items-start gap-2 bg-white p-2 rounded-lg border border-slate-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                    <span>{fn}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <span className="text-[11px] font-bold uppercase text-slate-500 block">Thông số kỹ thuật &amp; Tiêu chuẩn:</span>
              <div className="bg-white p-3.5 rounded-lg border border-slate-200 space-y-2 text-xs">
                {selectedCenter.specifications.rackCount && (
                  <div className="flex justify-between">
                    <span className="text-slate-500">Quy mô tủ rack:</span>
                    <span className="font-bold text-slate-800">{selectedCenter.specifications.rackCount}</span>
                  </div>
                )}
                {selectedCenter.specifications.failoverTime && (
                  <div className="flex justify-between">
                    <span className="text-slate-500">Thời gian failover:</span>
                    <span className="font-bold text-emerald-700">{selectedCenter.specifications.failoverTime}</span>
                  </div>
                )}
                {selectedCenter.specifications.rpo && (
                  <div className="flex justify-between">
                    <span className="text-slate-500">Chỉ số mất mát dữ liệu (RPO):</span>
                    <span className="font-bold text-blue-700">{selectedCenter.specifications.rpo}</span>
                  </div>
                )}
                {selectedCenter.specifications.rto && (
                  <div className="flex justify-between">
                    <span className="text-slate-500">Thời gian phục hồi (RTO):</span>
                    <span className="font-bold text-rose-700">{selectedCenter.specifications.rto}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-slate-100">
                  <span className="text-slate-500 block mb-1">Bộ tiêu chuẩn áp dụng:</span>
                  <div className="flex flex-wrap gap-1">
                    {selectedCenter.standards.map((st, sidx) => (
                      <span key={sidx} className="px-2 py-0.5 bg-slate-100 text-slate-700 font-mono text-[10px] rounded font-medium">
                        {st}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Nguyên tắc tập trung hóa hạ tầng */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-[11px] text-amber-900 leading-relaxed">
                <strong>Nguyên tắc tiết kiệm ngân sách:</strong> Địa phương không đầu tư xây mới các Trung tâm dữ liệu vật lý riêng lẻ. Hệ thống IOC của tỉnh chỉ đặt cảm biến tại hiện trường, toàn bộ phần mềm và kho dữ liệu lưu trữ tại TTDLQG.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bảng Phân Định Trách Nhiệm Đầu Tư (Phụ lục 5 Mục F) */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <HardDrive className="w-5 h-5 text-indigo-600" />
          <span>Bảng Phân định Trách nhiệm Đầu tư giữa TTDLQG, Bộ/Ngành &amp; Địa phương</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-200 rounded-lg overflow-hidden">
            <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
              <tr>
                <th className="p-3 w-44">Hạng mục</th>
                <th className="p-3">Trung tâm Dữ liệu Quốc gia (BCA)</th>
                <th className="p-3">Đơn vị Bộ, ngành, địa phương</th>
                <th className="p-3">Khối Đảng, Quốc hội, Tư pháp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr className="hover:bg-slate-50">
                <td className="p-3 font-bold text-slate-900">Hạ tầng CNTT phục vụ QLNN &amp; DVC</td>
                <td className="p-3 text-slate-700">Chủ trì đầu tư phần cứng máy chủ, thiết bị mạng, license ATTT cấp độ 3 trở lên cung cấp dùng chung.</td>
                <td className="p-3 text-slate-700">Chủ trì đầu tư phần mềm thương mại, phần mềm nghiệp vụ chuyên ngành.</td>
                <td className="p-3 text-slate-700">Chủ đầu tư toàn bộ hạ tầng, thiết bị và phần mềm theo cấp độ; dùng TTDLQG làm dự phòng.</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3 font-bold text-slate-900">Hệ thống tính toán hiệu năng cao (HPC/AI)</td>
                <td className="p-3 text-slate-700">Chủ trì đầu tư cụm máy chủ siêu tính toán, GPU, hạ tầng lượng tử và kho dữ liệu đào tạo AI quốc gia.</td>
                <td className="p-3 text-slate-700">Chủ trì đầu tư mô hình AI chuyên ngành chạy trên hạ tầng TTDLQG đã cấp.</td>
                <td className="p-3 text-slate-700">Chủ trì đầu tư mô hình đặc thù chạy trên hạ tầng TTDLQG.</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3 font-bold text-slate-900">Đô thị thông minh (Smart City / IOC)</td>
                <td className="p-3 text-slate-700">Cung cấp hạ tầng máy chủ đám mây chạy "não bộ" IOC, bảo đảm ATTT cấp độ 3 trở lên.</td>
                <td className="p-3 text-slate-700">Chủ trì đầu tư thiết bị cảm biến (sensors &amp; actuators) tại chỗ và hệ thống chuyển tiếp.</td>
                <td className="p-3 text-slate-500">-</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3 font-bold text-slate-900">Máy chủ Agent Node</td>
                <td className="p-3 text-slate-700 font-semibold text-emerald-800">Cấp hạ tầng máy chủ Agent Node và cài đặt, giám sát ATTT 24/7 (miễn phí cho cơ quan nhà nước).</td>
                <td className="p-3 text-slate-700">Bố trí mặt bằng, nguồn điện và vùng mạng biên (DMZ) để đặt Agent Node.</td>
                <td className="p-3 text-slate-700">Bố trí khu vực, địa điểm triển khai Agent Node để kết nối.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
