import React, { useState } from 'react';
import { CHECKLIST_ITEMS, INITIAL_ISSUE_LOGS } from '../data/nationalDataArchitecture';
import { IssueLogItem } from '../types';
import { 
  FileCheck2, 
  CheckSquare, 
  Square, 
  AlertTriangle, 
  Plus, 
  Clock, 
  ShieldCheck, 
  Search, 
  CheckCircle2,
  XCircle,
  AlertOctagon,
  Filter
} from 'lucide-react';

export const ChecklistAndLogSection: React.FC = () => {
  // Checklist State
  const [checkedIds, setCheckedIds] = useState<Record<string, boolean>>({
    c1: true,
    c2: true,
    c3: true,
    c4: true,
    c5: true,
    c6: true,
    c7: true,
    c8: true,
    c9: true,
    c10: true,
  });

  // Issue Log State
  const [logs, setLogs] = useState<IssueLogItem[]>(INITIAL_ISSUE_LOGS);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  // New Issue Form
  const [newCode, setNewCode] = useState<string>('ERR-004');
  const [newErrorType, setNewErrorType] = useState<string>('Trùng lặp dữ liệu');
  const [newSeverity, setNewSeverity] = useState<'Đỏ' | 'Vàng' | 'Xanh'>('Đỏ');
  const [newViolatingField, setNewViolatingField] = useState<string>('Mã số doanh nghiệp');
  const [newUnit, setNewUnit] = useState<string>('Sở Kế hoạch và Đầu tư');
  const [newSource, setNewSource] = useState<string>('Rà soát định kỳ TTDLQG');
  const [newDeadline, setNewDeadline] = useState<string>('5 ngày làm việc');

  const totalChecklistItems = CHECKLIST_ITEMS.reduce((acc, g) => acc + g.items.length, 0);
  const checkedCount = Object.values(checkedIds).filter(Boolean).length;
  const readinessPercent = Math.round((checkedCount / totalChecklistItems) * 100);

  const toggleCheck = (id: string) => {
    setCheckedIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddIssue = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: IssueLogItem = {
      id: `log-${Date.now()}`,
      code: newCode,
      discoveredDate: new Date().toLocaleDateString('vi-VN'),
      errorType: newErrorType,
      severityLevel: newSeverity,
      warningSource: newSource,
      violatingField: newViolatingField,
      responsibleUnit: newUnit,
      slaDeadline: newDeadline,
      status: 'Mới',
      actionTaken: 'Đã tiếp nhận vào Sổ tay theo dõi, đang phân công rà soát hồ sơ gốc.',
    };
    setLogs([newItem, ...logs]);
    setShowAddModal(false);
  };

  const updateStatus = (id: string, newStatus: IssueLogItem['status']) => {
    setLogs(logs.map(log => log.id === id ? { ...log, status: newStatus } : log));
  };

  const filteredLogs = statusFilter === 'all' ? logs : logs.filter(l => l.status === statusFilter);

  return (
    <div className="space-y-8">
      {/* Checklist trước khi đồng bộ NDOP */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold mb-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Biểu mẫu bắt buộc Phụ lục 3 Mục VIII.1
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              Checklist 11 tiêu chí kiểm tra chất lượng dữ liệu trước khi đồng bộ NDOP
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Áp dụng cho Bộ phận Kỹ thuật dữ liệu trước khi truyền tải dữ liệu qua Nền tảng chia sẻ, điều phối dữ liệu lên CSDL Tổng hợp quốc gia
            </p>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto bg-slate-50 p-2.5 rounded-xl border border-slate-200">
            <div className="text-right">
              <div className="text-[11px] text-slate-500 font-medium">Độ sẵn sàng đồng bộ</div>
              <div className="text-base font-black text-slate-900">{checkedCount}/{totalChecklistItems} tiêu chí ({readinessPercent}%)</div>
            </div>
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm text-white ${
              readinessPercent === 100 ? 'bg-emerald-600' : readinessPercent >= 80 ? 'bg-amber-500' : 'bg-rose-600'
            }`}>
              {readinessPercent}%
            </div>
          </div>
        </div>

        {/* Checklist Groups */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {CHECKLIST_ITEMS.map((group, gidx) => (
            <div key={gidx} className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-3">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-200">
                {group.group}
              </h4>
              <div className="space-y-2.5">
                {group.items.map((item) => {
                  const isChecked = !!checkedIds[item.id];
                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleCheck(item.id)}
                      className={`p-3 rounded-lg border text-xs cursor-pointer transition-all flex items-start gap-2.5 ${
                        isChecked 
                          ? 'bg-white border-emerald-300 text-slate-800 shadow-xs' 
                          : 'bg-white/60 border-slate-200 text-slate-500 hover:bg-white'
                      }`}
                    >
                      <span className="mt-0.5 shrink-0">
                        {isChecked ? (
                          <CheckSquare className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-400" />
                        )}
                      </span>
                      <span className={isChecked ? 'font-medium' : ''}>{item.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {readinessPercent === 100 ? (
          <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-lg text-xs text-emerald-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              <strong>ĐẠT ĐIỀU KIỆN ĐỒNG BỘ:</strong> Toàn bộ 11/11 tiêu chí kỹ thuật, pháp lý và an ninh kết nối đã được kiểm tra đạt chuẩn. Hệ thống sẵn sàng truyền tải qua NDOP.
            </span>
          </div>
        ) : (
          <div className="p-3 bg-amber-50 border border-amber-300 rounded-lg text-xs text-amber-800 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              <strong>CHƯA ĐỦ ĐIỀU KIỆN:</strong> Vui lòng rà soát và tích kiểm tra các hạng mục còn lại trước khi gửi hồ sơ đồng bộ lên Trung tâm Dữ liệu quốc gia.
            </span>
          </div>
        )}
      </div>

      {/* Sổ tay theo dõi sự cố chất lượng dữ liệu (Issue Log) */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[11px] font-bold mb-1">
              <Clock className="w-3.5 h-3.5" />
              Sổ tay tác nghiệp Phụ lục 3 Mục VIII.2
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              Sổ tay theo dõi &amp; xử lý sự cố chất lượng dữ liệu (Issue Log)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Bộ phận Tuân thủ giám sát thời hạn SLA; Bộ phận Tạo lập dữ liệu chịu trách nhiệm rà soát và làm sạch tại gốc
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg text-xs">
              <Filter className="w-3.5 h-3.5 text-slate-500 ml-1.5" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-transparent text-slate-700 font-semibold text-xs border-none focus:outline-none pr-2"
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="Mới">Mới</option>
                <option value="Đang xử lý">Đang xử lý</option>
                <option value="Hoàn thành">Hoàn thành</option>
              </select>
            </div>

            <button
              onClick={() => setShowAddModal(true)}
              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Ghi nhận sự cố</span>
            </button>
          </div>
        </div>

        {/* Table of Issue Logs */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-200 rounded-lg overflow-hidden">
            <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
              <tr>
                <th className="p-3 w-20">Mã sự cố</th>
                <th className="p-3 w-24">Ngày phát hiện</th>
                <th className="p-3">Phân loại lỗi</th>
                <th className="p-3 w-16 text-center">Mức độ</th>
                <th className="p-3">Nguồn cảnh báo</th>
                <th className="p-3">Trường vi phạm</th>
                <th className="p-3">Bộ phận khắc phục</th>
                <th className="p-3 w-24">Hạn xử lý (SLA)</th>
                <th className="p-3 w-28 text-center">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50">
                  <td className="p-3 font-mono font-bold text-blue-800">{log.code}</td>
                  <td className="p-3 text-slate-600">{log.discoveredDate}</td>
                  <td className="p-3 font-semibold text-slate-800">{log.errorType}</td>
                  <td className="p-3 text-center">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      log.severityLevel === 'Đỏ' 
                        ? 'bg-red-100 text-red-800 border border-red-200' 
                        : 'bg-amber-100 text-amber-800 border border-amber-200'
                    }`}>
                      {log.severityLevel}
                    </span>
                  </td>
                  <td className="p-3 text-slate-600">{log.warningSource}</td>
                  <td className="p-3 font-mono text-slate-700 font-medium">{log.violatingField}</td>
                  <td className="p-3 text-slate-600">{log.responsibleUnit}</td>
                  <td className="p-3 font-bold text-red-700">{log.slaDeadline}</td>
                  <td className="p-3 text-center">
                    <select
                      value={log.status}
                      onChange={(e) => updateStatus(log.id, e.target.value as any)}
                      className={`text-[11px] font-semibold px-2 py-1 rounded border focus:outline-none ${
                        log.status === 'Hoàn thành'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                          : log.status === 'Đang xử lý'
                          ? 'bg-blue-50 text-blue-800 border-blue-300'
                          : 'bg-amber-50 text-amber-800 border-amber-300'
                      }`}
                    >
                      <option value="Mới">Mới</option>
                      <option value="Đang xử lý">Đang xử lý</option>
                      <option value="Hoàn thành">Hoàn thành</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Issue Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h4 className="text-base font-bold text-slate-900">Ghi nhận sự cố dữ liệu mới (Issue Log)</h4>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddIssue} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Mã sự cố</label>
                  <input
                    type="text"
                    value={newCode}
                    onChange={(e) => setNewCode(e.target.value)}
                    className="w-full p-2 border border-slate-300 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Mức độ cảnh báo</label>
                  <select
                    value={newSeverity}
                    onChange={(e) => setNewSeverity(e.target.value as any)}
                    className="w-full p-2 border border-slate-300 rounded-lg"
                  >
                    <option value="Đỏ">Mức Đỏ (Trọng yếu / Khóa định danh)</option>
                    <option value="Vàng">Mức Vàng (Nghiệp vụ thông thường)</option>
                    <option value="Xanh">Mức Xanh</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Phân loại lỗi</label>
                <input
                  type="text"
                  value={newErrorType}
                  onChange={(e) => setNewErrorType(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Trường dữ liệu vi phạm</label>
                <input
                  type="text"
                  value={newViolatingField}
                  onChange={(e) => setNewViolatingField(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-lg"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Bộ phận khắc phục</label>
                  <input
                    type="text"
                    value={newUnit}
                    onChange={(e) => setNewUnit(e.target.value)}
                    className="w-full p-2 border border-slate-300 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Hạn xử lý (SLA)</label>
                  <input
                    type="text"
                    value={newDeadline}
                    onChange={(e) => setNewDeadline(e.target.value)}
                    className="w-full p-2 border border-slate-300 rounded-lg"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-slate-900 text-white font-bold hover:bg-slate-800"
                >
                  Lưu vào sổ tay
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
