import React, { useState } from 'react';
import { Calculator, ShieldAlert, CheckCircle2, AlertTriangle, XCircle, Info, RefreshCw } from 'lucide-react';

interface DqiCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DqiCalculatorModal: React.FC<DqiCalculatorModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [fieldName, setFieldName] = useState<string>('Số Căn cước công dân / Định danh cá nhân');
  const [isIdentifier, setIsIdentifier] = useState<boolean>(true);
  const [totalRecords, setTotalRecords] = useState<number>(1000000);

  // Rule 1: Structure & Length (e.g. 12 digits)
  const [validRule1, setValidRule1] = useState<number>(995000);
  const [weightRule1, setWeightRule1] = useState<number>(20);

  // Rule 2: Business Rule (e.g. valid range, checksum)
  const [validRule2, setValidRule2] = useState<number>(985000);
  const [weightRule2, setWeightRule2] = useState<number>(30);

  // Rule 3: Cross-reference with Master DB (CSDLQG Dân cư)
  const [validRule3, setValidRule3] = useState<number>(970000);
  const [weightRule3, setWeightRule3] = useState<number>(50);

  // Calculations
  const dqiRule1 = totalRecords > 0 ? (validRule1 / totalRecords) * 100 : 0;
  const dqiRule2 = totalRecords > 0 ? (validRule2 / totalRecords) * 100 : 0;
  const dqiRule3 = totalRecords > 0 ? (validRule3 / totalRecords) * 100 : 0;

  const totalWeight = weightRule1 + weightRule2 + weightRule3;
  const weightedDqi = totalWeight > 0 
    ? (dqiRule1 * weightRule1 + dqiRule2 * weightRule2 + dqiRule3 * weightRule3) / totalWeight
    : 0;

  const roundedDqi = Number(weightedDqi.toFixed(2));

  // Determine Level
  const isGreen = roundedDqi >= 90;
  const isYellow = roundedDqi >= 75 && roundedDqi < 90;
  const isRed = roundedDqi < 75;

  // Check critical identifier violation
  const hasIdentifierViolation = isIdentifier && roundedDqi < 100;

  const resetToSample = (mode: 'perfect' | 'warning' | 'critical') => {
    if (mode === 'perfect') {
      setFieldName('Mã số định danh cá nhân');
      setIsIdentifier(true);
      setTotalRecords(1000000);
      setValidRule1(1000000);
      setValidRule2(1000000);
      setValidRule3(1000000);
    } else if (mode === 'warning') {
      setFieldName('Số điện thoại liên hệ');
      setIsIdentifier(false);
      setTotalRecords(500000);
      setValidRule1(490000);
      setValidRule2(440000);
      setValidRule3(410000);
    } else {
      setFieldName('Mã số định danh cá nhân (Phát hiện sai lệch)');
      setIsIdentifier(true);
      setTotalRecords(1000000);
      setValidRule1(998000);
      setValidRule2(995000);
      setValidRule3(980000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-blue-500/20 border border-blue-400/30">
              <Calculator className="w-5 h-5 text-blue-300" />
            </div>
            <div>
              <h3 className="text-base font-bold">Máy tính &amp; đánh giá chỉ số DQI chuẩn Quốc gia</h3>
              <p className="text-[11px] text-blue-200">Áp dụng công thức tính toán toán học theo Phụ lục 3 Mục III Công văn 4856</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-sm font-bold transition-all"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 text-xs">
          {/* Quick preset buttons */}
          <div className="flex flex-wrap items-center gap-2 pb-2 border-b border-slate-100">
            <span className="text-slate-500 font-medium">Tải nhanh ví dụ mẫu:</span>
            <button
              onClick={() => resetToSample('perfect')}
              className="px-2.5 py-1 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium hover:bg-emerald-100"
            >
              Mẫu Chuẩn 100%
            </button>
            <button
              onClick={() => resetToSample('critical')}
              className="px-2.5 py-1 rounded bg-red-50 text-red-800 border border-red-200 font-medium hover:bg-red-100"
            >
              Mẫu Vi Phạm Khóa Định Danh (&lt;100%)
            </button>
            <button
              onClick={() => resetToSample('warning')}
              className="px-2.5 py-1 rounded bg-amber-50 text-amber-800 border border-amber-200 font-medium hover:bg-amber-100"
            >
              Mẫu Trường Thông Thường (Mức Vàng)
            </button>
          </div>

          {/* Form fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Tên trường dữ liệu đánh giá</label>
              <input
                type="text"
                value={fieldName}
                onChange={(e) => setFieldName(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded-lg text-xs"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Tổng số bản ghi thuộc diện đánh giá</label>
              <input
                type="number"
                value={totalRecords}
                onChange={(e) => setTotalRecords(Number(e.target.value))}
                className="w-full p-2 border border-slate-300 rounded-lg text-xs font-mono"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-lg border border-slate-200">
            <input
              type="checkbox"
              id="isIdentifier"
              checked={isIdentifier}
              onChange={(e) => setIsIdentifier(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded"
            />
            <label htmlFor="isIdentifier" className="font-semibold text-slate-800 cursor-pointer">
              Đây là trường dữ liệu định danh hoặc dữ liệu khóa liên kết (Số ĐDCN, CCCD, Mã số DN, Mã ĐVHC...)
            </label>
          </div>

          {/* 3 Rules table */}
          <div className="space-y-2">
            <span className="font-bold text-slate-800 block">Các Quy tắc chất lượng cấu thành Tiêu chí:</span>
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-2.5">Quy tắc chất lượng</th>
                    <th className="p-2.5 w-28">Số bản ghi đạt</th>
                    <th className="p-2.5 w-20 text-center">Trọng số</th>
                    <th className="p-2.5 w-24 text-right">DQI Quy tắc</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="p-2.5">
                      <div className="font-semibold text-slate-900">Quy tắc 1: Cấu trúc &amp; Độ dài</div>
                      <div className="text-[10px] text-slate-500">Đúng 12 ký tự số, không chứa ký tự lạ</div>
                    </td>
                    <td className="p-2.5">
                      <input
                        type="number"
                        value={validRule1}
                        onChange={(e) => setValidRule1(Number(e.target.value))}
                        className="w-full p-1 border border-slate-300 rounded text-xs font-mono"
                      />
                    </td>
                    <td className="p-2.5 text-center">
                      <input
                        type="number"
                        value={weightRule1}
                        onChange={(e) => setWeightRule1(Number(e.target.value))}
                        className="w-12 p-1 border border-slate-300 rounded text-xs text-center font-mono"
                      />%
                    </td>
                    <td className="p-2.5 text-right font-mono font-bold text-blue-700">
                      {dqiRule1.toFixed(2)}%
                    </td>
                  </tr>

                  <tr>
                    <td className="p-2.5">
                      <div className="font-semibold text-slate-900">Quy tắc 2: Quy tắc nghiệp vụ</div>
                      <div className="text-[10px] text-slate-500">Quy tắc checksum, độ tuổi cấp thẻ</div>
                    </td>
                    <td className="p-2.5">
                      <input
                        type="number"
                        value={validRule2}
                        onChange={(e) => setValidRule2(Number(e.target.value))}
                        className="w-full p-1 border border-slate-300 rounded text-xs font-mono"
                      />
                    </td>
                    <td className="p-2.5 text-center">
                      <input
                        type="number"
                        value={weightRule2}
                        onChange={(e) => setWeightRule2(Number(e.target.value))}
                        className="w-12 p-1 border border-slate-300 rounded text-xs text-center font-mono"
                      />%
                    </td>
                    <td className="p-2.5 text-right font-mono font-bold text-blue-700">
                      {dqiRule2.toFixed(2)}%
                    </td>
                  </tr>

                  <tr>
                    <td className="p-2.5">
                      <div className="font-semibold text-slate-900">Quy tắc 3: Đối soát nguồn tham chiếu</div>
                      <div className="text-[10px] text-slate-500">Khớp 1:1 với CSDLQG về dân cư</div>
                    </td>
                    <td className="p-2.5">
                      <input
                        type="number"
                        value={validRule3}
                        onChange={(e) => setValidRule3(Number(e.target.value))}
                        className="w-full p-1 border border-slate-300 rounded text-xs font-mono"
                      />
                    </td>
                    <td className="p-2.5 text-center">
                      <input
                        type="number"
                        value={weightRule3}
                        onChange={(e) => setWeightRule3(Number(e.target.value))}
                        className="w-12 p-1 border border-slate-300 rounded text-xs text-center font-mono"
                      />%
                    </td>
                    <td className="p-2.5 text-right font-mono font-bold text-blue-700">
                      {dqiRule3.toFixed(2)}%
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Results Box */}
          <div className="p-4 rounded-xl bg-slate-900 text-white space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                KẾT QUẢ ĐO LƯỜNG CHỈ SỐ DQI TỔNG HỢP:
              </span>
              <span className="text-2xl font-black text-amber-400 font-mono">
                {roundedDqi}%
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Xếp loại theo ngưỡng tham chiếu:</span>
              {isGreen && (
                <span className="px-2 py-0.5 rounded bg-emerald-500/30 text-emerald-300 font-bold border border-emerald-500/40">
                  Mức XANH (≥90% - Đạt yêu cầu)
                </span>
              )}
              {isYellow && (
                <span className="px-2 py-0.5 rounded bg-amber-500/30 text-amber-300 font-bold border border-amber-500/40">
                  Mức VÀNG (75% - &lt;90% - Cần cảnh báo &amp; khắc phục)
                </span>
              )}
              {isRed && (
                <span className="px-2 py-0.5 rounded bg-red-500/30 text-red-300 font-bold border border-red-500/40">
                  Mức ĐỎ (&lt;75% - Không đạt yêu cầu)
                </span>
              )}
            </div>

            {/* Critical Identifier Violation Warning */}
            {hasIdentifierViolation && (
              <div className="p-3 bg-red-950/80 border border-red-500/60 rounded-lg text-xs text-red-200 flex items-start gap-2.5 animate-pulse">
                <ShieldAlert className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-amber-300">
                    KÍCH HOẠT CẢNH BÁO SỰ CỐ NGHIÊM TRỌNG (Phụ lục 3 Mục III.2)
                  </div>
                  <p className="mt-1 leading-relaxed text-[11px]">
                    Trường định danh bắt buộc áp dụng <strong>ngưỡng tuyệt đối 100%</strong>. Dù DQI tổng hợp đạt {roundedDqi}%, việc phát sinh sai số ({Number((100 - roundedDqi).toFixed(2))}%) 
                    buộc cơ quan chủ quản phải lập tức khắc phục, làm sạch tại gốc trong Bước 5, không chờ kỳ rà soát định kỳ!
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-100 p-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-900 text-white rounded-lg font-bold text-xs hover:bg-slate-800"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
