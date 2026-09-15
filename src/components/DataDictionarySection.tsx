import React, { useState } from 'react';
import { CORE_DATA_DOMAINS } from '../data/nationalDataArchitecture';
import { 
  Database, 
  Key, 
  Search, 
  ShieldAlert, 
  CheckCircle2, 
  FileCode, 
  Layers, 
  Lock, 
  Sparkles,
  ArrowRightLeft,
  AlertCircle
} from 'lucide-react';

export const DataDictionarySection: React.FC = () => {
  const [selectedDomainId, setSelectedDomainId] = useState<string>('domain-person');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const selectedDomain = CORE_DATA_DOMAINS.find(d => d.id === selectedDomainId) || CORE_DATA_DOMAINS[0];

  const filteredDomains = CORE_DATA_DOMAINS.filter(d => 
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.identifierKey.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.sampleFields.some(f => f.field.toLowerCase().includes(searchQuery.toLowerCase()) || f.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-8">
      {/* Top Banner: Quy tắc 100% Tuyệt đối cho Định danh */}
      <div className="bg-gradient-to-r from-red-900 via-rose-900 to-amber-950 rounded-2xl p-6 text-white border border-red-500/40 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-red-500/20 text-red-200 border border-red-400/30 text-xs font-bold">
              <ShieldAlert className="w-4 h-4 text-amber-300" />
              <span>YÊU CẦU BẮT BUỘC THEO CÔNG VĂN 4856 & QUYẾT ĐỊNH 2439</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Tiêu chuẩn định danh dữ liệu & ngưỡng DQI 100% tuyệt đối
            </h3>
            <p className="text-xs sm:text-sm text-rose-100/90 leading-relaxed">
              Các trường dữ liệu định danh, dữ liệu khóa liên kết (Số ĐDCN/CCCD, Mã số doanh nghiệp, Mã đơn vị hành chính, Mã địa chỉ số) 
              <strong> bắt buộc áp dụng ngưỡng DQI 100% đối với Đúng, Đủ và Sạch</strong>. 
              <strong> Tuyệt đối không cho phép sai số trên phạm vi toàn quốc</strong>. Nếu phát hiện vi phạm, phải lập tức kích hoạt 
              <em> "Cảnh báo sự cố nghiêm trọng"</em> và xử lý khẩn cấp tại gốc, không chờ đến kỳ rà soát định kỳ.
            </p>
          </div>
          <div className="bg-black/30 border border-amber-400/40 rounded-xl p-4 text-center shrink-0 min-w-[200px]">
            <span className="text-xs font-bold text-amber-300 block uppercase">Ngưỡng sai số cho phép</span>
            <span className="text-3xl sm:text-4xl font-black text-white my-1 block">0%</span>
            <span className="text-[11px] text-slate-300 block">DQI Định danh = 100%</span>
          </div>
        </div>
      </div>

      {/* 4 Nguyên tắc kỹ thuật về định danh dữ liệu */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-2">
          <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-sm">
            01
          </div>
          <h4 className="text-xs font-bold text-slate-900">Một dữ liệu - Một nguồn tạo lập</h4>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            Dữ liệu do cơ quan có thẩm quyền tạo lập theo luật là căn cứ gốc. Địa phương không tự ý xác lập dữ liệu gốc song song khi dữ liệu đã có nguồn thẩm quyền.
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm">
            02
          </div>
          <h4 className="text-xs font-bold text-slate-900">Chuẩn hóa khóa chính (Primary Key)</h4>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            Áp dụng thống nhất mã định danh duy nhất: Số CCCD (12 chữ số), Mã số doanh nghiệp (10-13 số), Mã ĐVHC quốc gia. Cấu hình kiểm tra trùng lặp trước lệnh INSERT.
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-2">
          <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-sm">
            03
          </div>
          <h4 className="text-xs font-bold text-slate-900">Bảo toàn dữ liệu lịch sử ĐVHC</h4>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            Khi sắp xếp ĐVHC và tổ chức chính quyền 2 cấp: giữ nguyên dữ liệu gốc, mã lịch sử; không sửa đổi hồi tố; thiết lập bảng ánh xạ mã trước và sau sắp xếp.
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-800 flex items-center justify-center font-bold text-sm">
            04
          </div>
          <h4 className="text-xs font-bold text-slate-900">Đối chiếu trực tuyến Master Data</h4>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            Tuyệt đối không dùng ô nhập Textbox tự do cho các trường danh mục; thay bằng Dropdown API lấy trực tiếp từ Nền tảng NDOP / Dữ liệu danh mục dùng chung quốc gia.
          </p>
        </div>
      </div>

      {/* Bảng chuyển đổi Quy tắc nghiệp vụ -> Quy tắc kỹ thuật (Technical Rules) */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-2">
          <ArrowRightLeft className="w-5 h-5 text-blue-600" />
          <span>Bảng đối chiếu chuyển đổi quy tắc nghiệp vụ sang quy tắc kỹ thuật (Phụ lục 3 Mục VI.2)</span>
        </h3>
        <p className="text-xs text-slate-500 mb-4">
          Chất lượng dữ liệu chỉ được kiểm soát hiệu quả khi các quy tắc nghiệp vụ pháp luật được chuyển hóa thành ràng buộc kỹ thuật tự động trên phần mềm một cửa và nghiệp vụ.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-200 rounded-lg overflow-hidden">
            <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
              <tr>
                <th className="p-3 w-12 text-center">STT</th>
                <th className="p-3 w-32">Tiêu chí</th>
                <th className="p-3">Quy tắc nghiệp vụ (Business Rule)</th>
                <th className="p-3">Quy tắc kỹ thuật tương ứng (Technical Rule)</th>
                <th className="p-3 w-40">Biện pháp trên phần mềm</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr className="hover:bg-slate-50">
                <td className="p-3 text-center font-semibold text-slate-500">1</td>
                <td className="p-3 font-bold text-slate-800">Tính đầy đủ (Completeness)</td>
                <td className="p-3 text-slate-700">Hồ sơ cấp Giấy phép kinh doanh phải có đầy đủ số điện thoại liên hệ của người đại diện theo pháp luật.</td>
                <td className="p-3 font-mono text-blue-700 font-medium">Cột So_Dien_Thoai được gán thuộc tính NOT NULL.</td>
                <td className="p-3 text-slate-600">Giao diện web vô hiệu hóa nút "Lưu/Nộp" nếu trường nhập liệu bị bỏ trống.</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3 text-center font-semibold text-slate-500">2</td>
                <td className="p-3 font-bold text-slate-800">Tính chính xác (Accuracy)</td>
                <td className="p-3 text-slate-700">Thông tin ngày sinh của người đề nghị cấp thẻ căn cước phải khớp tuyệt đối với CSDL Quốc gia về dân cư.</td>
                <td className="p-3 font-mono text-blue-700 font-medium">Đối chiếu giá trị trường Ngay_Sinh với CSDLQG Dân cư theo Số định danh cá nhân.</td>
                <td className="p-3 text-slate-600">Nếu không khớp, hệ thống ghi nhận lỗi tính chính xác và chặn cấp duyệt, chuyển hồ sơ xác minh.</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3 text-center font-semibold text-slate-500">3</td>
                <td className="p-3 font-bold text-slate-800">Tính duy nhất (Uniqueness)</td>
                <td className="p-3 text-slate-700">Mỗi doanh nghiệp chỉ được cấp một mã số doanh nghiệp duy nhất trên toàn quốc.</td>
                <td className="p-3 font-mono text-blue-700 font-medium">Trường Ma_So_Doanh_Nghiep cấu hình Primary Key (Khóa chính).</td>
                <td className="p-3 text-slate-600">Thuật toán kiểm tra trùng lặp kích hoạt tự động trước lệnh INSERT vào cơ sở dữ liệu.</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3 text-center font-semibold text-slate-500">4</td>
                <td className="p-3 font-bold text-slate-800">Tính nhất quán (Consistency)</td>
                <td className="p-3 text-slate-700">Tên đơn vị hành chính cấp xã, huyện, tỉnh phải thống nhất tuyệt đối theo danh mục địa giới hành chính quốc gia.</td>
                <td className="p-3 font-mono text-blue-700 font-medium">Không dùng ô nhập văn bản tự do (Textbox). Thay thế bằng Dropdown API.</td>
                <td className="p-3 text-slate-600">Giao diện gọi trực tiếp API danh mục mã chuẩn từ Nền tảng điều phối dữ liệu quốc gia (NDOP).</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3 text-center font-semibold text-slate-500">5</td>
                <td className="p-3 font-bold text-slate-800">Toàn vẹn tham chiếu (Referential)</td>
                <td className="p-3 text-slate-700">Hồ sơ thu tiền phạt vi phạm hành chính phải tham chiếu đến Quyết định xử phạt hợp lệ đã có trước đó.</td>
                <td className="p-3 font-mono text-blue-700 font-medium">Ràng buộc Khóa ngoại (Foreign Key Constraint) liên kết bảng ThuTien &amp; QDXuPhat.</td>
                <td className="p-3 text-slate-600">Từ chối thao tác tạo mới bản ghi nếu mã quyết định xử phạt không tồn tại hoặc không hợp lệ.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Tra cứu Từ điển 06 Miền Dữ Liệu Dùng Chung */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Database className="w-5 h-5 text-indigo-600" />
              <span>Từ điển 06 miền dữ liệu dùng chung cốt lõi (Quyết định 2439)</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Quy định cấu trúc trường thông tin, cơ quan chủ quản, khóa định danh và phương thức tiếp cận DaaS/API cho địa phương
            </p>
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm kiếm trường, mã định danh..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Domain Navigation Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-6">
          {CORE_DATA_DOMAINS.map((domain) => {
            const isSelected = domain.id === selectedDomainId;
            return (
              <button
                key={domain.id}
                onClick={() => setSelectedDomainId(domain.id)}
                className={`p-3 rounded-xl text-left transition-all border ${
                  isSelected
                    ? 'bg-indigo-600 text-white border-indigo-700 shadow-md ring-2 ring-indigo-300'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                <div className={`text-[10px] font-bold uppercase tracking-wider ${isSelected ? 'text-indigo-200' : 'text-slate-400'}`}>
                  {domain.code}
                </div>
                <div className="font-bold text-xs mt-1 leading-snug line-clamp-2">
                  {domain.name.replace(/^\d+\.\s*/, '')}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Domain View */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-slate-900">{selectedDomain.name}</span>
                <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-indigo-100 text-indigo-800 rounded">
                  {selectedDomain.code}
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1">{selectedDomain.description}</p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[11px] px-2.5 py-1 rounded bg-blue-100 text-blue-800 font-semibold">
                Tiếp cận: {selectedDomain.accessMode}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="bg-white p-3 rounded-lg border border-slate-200">
              <span className="text-[11px] font-medium text-slate-500 block">Cơ quan chủ quản gốc:</span>
              <span className="font-bold text-slate-900">{selectedDomain.authority}</span>
            </div>
            <div className="bg-white p-3 rounded-lg border border-slate-200">
              <span className="text-[11px] font-medium text-slate-500 block">Cơ sở dữ liệu nguồn:</span>
              <span className="font-bold text-slate-900">{selectedDomain.sourceDb}</span>
            </div>
            <div className="bg-white p-3 rounded-lg border border-slate-200">
              <span className="text-[11px] font-medium text-slate-500 block">Khóa định danh liên kết:</span>
              <span className="font-bold text-red-700 flex items-center gap-1">
                <Key className="w-3.5 h-3.5 text-red-600 shrink-0" />
                {selectedDomain.identifierKey}
              </span>
            </div>
          </div>

          {/* Fields Schema Table */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <FileCode className="w-4 h-4 text-indigo-600" />
              Đặc tả trường dữ liệu & ràng buộc kỹ thuật (Từ điển v1.0)
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs bg-white border border-slate-200 rounded-lg overflow-hidden">
                <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-2.5">Trường dữ liệu</th>
                    <th className="p-2.5">Kiểu dữ liệu</th>
                    <th className="p-2.5">Mô tả nghiệp vụ</th>
                    <th className="p-2.5 text-center">Bắt buộc</th>
                    <th className="p-2.5">Quy tắc kỹ thuật / Kiểm tra tự động</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {selectedDomain.sampleFields.map((field, fidx) => (
                    <tr key={fidx} className={`hover:bg-slate-50 ${field.isKeyIdentifier ? 'bg-red-50/40' : ''}`}>
                      <td className="p-2.5 font-mono font-bold text-slate-900 flex items-center gap-1.5">
                        {field.isKeyIdentifier && <Key className="w-3.5 h-3.5 text-red-600" title="Khóa định danh trọng yếu (DQI 100%)" />}
                        {field.field}
                      </td>
                      <td className="p-2.5 font-mono text-blue-700 font-medium">{field.type}</td>
                      <td className="p-2.5 text-slate-700">{field.description}</td>
                      <td className="p-2.5 text-center">
                        {field.required ? (
                          <span className="px-1.5 py-0.5 rounded bg-red-100 text-red-700 font-bold text-[10px]">NOT NULL</span>
                        ) : (
                          <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 text-[10px]">Tùy chọn</span>
                        )}
                      </td>
                      <td className="p-2.5 font-mono text-[11px] text-slate-600">
                        {field.technicalRule}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-indigo-50/70 p-3 rounded-lg border border-indigo-200 text-xs text-indigo-950 flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
            <div>
              <strong>Ứng dụng tại địa phương:</strong> {selectedDomain.purposeAtProvince} 
              <span className="block text-[11px] text-indigo-800 mt-0.5">
                (Địa phương không sao chép toàn bộ CSDL nguồn về kho tỉnh; chỉ khai thác thông qua dịch vụ API/DaaS của NDOP).
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
