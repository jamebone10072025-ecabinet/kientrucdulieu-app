// Client utility to communicate with Gemini API via backend proxy or direct fallback (for GitHub Pages static hosting)

const SYSTEM_INSTRUCTION = `Bạn là Chuyên gia Trợ lý AI Cấp cao về Khung Kiến trúc & Quản trị dữ liệu Quốc gia Việt Nam.
Bạn nắm vững các văn bản quy phạm pháp luật và tiêu chuẩn kỹ thuật trọng tâm:
1. Quyết định số 2439/QĐ-TTg của Thủ tướng Chính phủ: Phê duyệt Kiến trúc dữ liệu quốc gia (Từ điển 06 miền dữ liệu dùng chung cốt lõi: Con người DOM-HUMAN, Tổ chức DOM-ORG, Tài sản DOM-ASSET, Địa chính DOM-CADASTRAL, Địa chỉ DOM-ADDRESS, Nền địa lý DOM-GEO).
2. Công văn số 4856/BCA-TTDLQG ngày 14/9/2026 của Bộ Công an: Hướng dẫn khung quản trị, quản lý dữ liệu (Mô hình 05 bộ phận; 03 mô hình tổ chức tại tỉnh; Bộ phận Tuân thủ BẮT BUỘC do Công an tỉnh chủ trì và TUYỆT ĐỐI không thuê ngoài; CDO; Data Steward; Đầu mối cấp xã; Chỉ số DQI 5 tiêu chuẩn "Đúng, Đủ, Sạch, Sống, Thống nhất"; Ngưỡng DQI 100% tuyệt đối cho khóa định danh; SLA 5-10-15 ngày; 08 nhóm lỗi dữ liệu phổ biến).
3. Nghị định số 278/2025/NĐ-CP: Quy định kết nối, chia sẻ dữ liệu qua Trục Nền tảng điều phối quốc gia (NDOP), Nền tảng chia sẻ dữ liệu cấp tỉnh (LDOP/LGSP), máy chủ bảo mật Agent Node do C12 Bộ Công an quản lý, 03 loại yêu cầu kết nối và Quy trình 05 bước kết nối đồng bộ.
4. Nghị quyết số 175/NQ-CP: Cụm 03 Trung tâm Dữ liệu quốc gia (NDC 1, NDC 2, NDC 3) kiến trúc Active-Active-Standby.
5. Vị trí, vai trò của Sở Kế hoạch và Đầu tư (KH&ĐT): Sở KH&ĐT vẫn duy trì hoạt động và chức năng độc lập, là cơ quan chuyên môn thuộc UBND cấp tỉnh chủ trì quản lý nhà nước về CSDL Đăng ký doanh nghiệp, CSDL Đăng ký hộ kinh doanh, CSDL Đầu tư kinh doanh trên địa bàn tỉnh; kết nối và đồng bộ trực tiếp với CSDL Quốc gia về Đăng ký doanh nghiệp và NDOP; phối hợp chặt chẽ với Sở Tài chính (quản lý ngân sách, tài chính công, thuế) và Cục Thuế. Khi sắp xếp địa giới hành chính, bảo lưu nguyên trạng mã định danh lịch sử, không sửa đổi hồi tố và thiết lập Bảng ánh xạ mã ĐVHC trước - sau sắp xếp.

Hãy trả lời bằng tiếng Việt trang trọng, chuẩn xác theo ngôn ngữ hành chính - kỹ thuật, trích dẫn rõ điều khoản/phụ lục căn cứ pháp lý.`;

async function callDirectGemini(prompt: string, contents?: any[]): Promise<string> {
  const apiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('Dịch vụ backend không khả dụng và chưa cấu hình VITE_GEMINI_API_KEY trên máy chủ tĩnh.');
  }

  const payloadContents = contents && contents.length > 0 
    ? contents 
    : [{ role: 'user', parts: [{ text: prompt }] }];

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: SYSTEM_INSTRUCTION }],
        },
        contents: payloadContents,
        generationConfig: {
          temperature: 0.3,
        },
      }),
    }
  );

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error?.message || 'Lỗi gọi trực tiếp Google Gemini API.');
  }
  return data.candidates?.[0]?.content?.parts?.[0]?.text || 'Không nhận được văn bản phản hồi.';
}

export async function sendChatMessage(
  message: string,
  history: Array<{ role: 'user' | 'model'; content: string }>
): Promise<string> {
  try {
    const res = await fetch('/api/gemini/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message,
        conversationHistory: history,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.reply) return data.reply;
    }
  } catch {
    // Network or static host without backend
  }

  // Fallback direct call for static hosting (GitHub Pages)
  const formattedContents = history.map((m) => ({
    role: m.role,
    parts: [{ text: m.content }],
  }));
  formattedContents.push({
    role: 'user',
    parts: [{ text: message }],
  });

  return callDirectGemini(message, formattedContents);
}

export async function sendDiagnoseIssue(params: {
  errorType: string;
  violatingField: string;
  responsibleUnit: string;
  description: string;
}): Promise<string> {
  try {
    const res = await fetch('/api/gemini/diagnose-issue', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.diagnosis) return data.diagnosis;
    }
  } catch {
    // Fallback for static hosting
  }

  const prompt = `Phân tích chuyên sâu sự cố chất lượng dữ liệu:
- Phân loại lỗi: ${params.errorType || "Chưa xác định"}
- Trường dữ liệu vi phạm: ${params.violatingField || "Chưa xác định"}
- Bộ phận khắc phục: ${params.responsibleUnit || "Sở Kế hoạch và Đầu tư"}
- Mô tả chi tiết: ${params.description || "Phát hiện lỗi không nhất quán dữ liệu"}

Yêu cầu xuất kết quả theo cấu trúc:
1. [Nguyên nhân gốc rễ (Root Cause)]: Xác định nguyên nhân nghiệp vụ hoặc lỗi kỹ thuật phần mềm Một cửa/chuyên ngành.
2. [Căn cứ pháp lý & SLA]: Mức độ ưu tiên (Đỏ/Vàng/Xanh), thời hạn cam kết SLA xử lý theo Phụ lục 3 Công văn 4856.
3. [Câu lệnh kỹ thuật kiểm tra (SQL Check Query)]: Viết câu lệnh SQL mẫu để Bộ phận Kỹ thuật dữ liệu rà quét phát hiện tất cả các bản ghi vi phạm tương tự.
4. [Kịch bản xử lý tại gốc]: Các bước cụ thể cho đơn vị chịu trách nhiệm (ví dụ: Sở Kế hoạch và Đầu tư, Sở Tài chính, Phòng Cảnh sát QLHC, Sở Tư pháp) và cơ chế bảo toàn dữ liệu lịch sử.`;

  return callDirectGemini(prompt);
}

export async function sendSchemaSuggest(params: {
  tableName: string;
  columnsDescription: string;
}): Promise<string> {
  try {
    const res = await fetch('/api/gemini/schema-suggest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.suggestion) return data.suggestion;
    }
  } catch {
    // Fallback for static hosting
  }

  const prompt = `Đối chiếu và ánh xạ bảng dữ liệu nguồn sau vào Kiến trúc 06 Miền Dữ liệu Dùng chung Cốt lõi (Quyết định 2439/QĐ-TTg):
- Tên bảng/Hệ thống nghiệp vụ: ${params.tableName}
- Cấu trúc các trường/cột: ${params.columnsDescription}

Yêu cầu phân tích:
1. Xác định Miền dữ liệu dùng chung cốt lõi phù hợp nhất trong 06 miền (DOM-HUMAN, DOM-ORG, DOM-ASSET, DOM-CADASTRAL, DOM-ADDRESS, DOM-GEO).
2. Chỉ định rõ: Trường nào làm Khóa chính (Primary Key), trường nào liên kết Khóa ngoại (Foreign Key) với Miền dữ liệu quốc gia (ví dụ: liên kết Số ĐDCN, Mã số DN).
3. Đề xuất quy tắc kỹ thuật DQI bắt buộc (Regex, NOT NULL, Format chuẩn ngày tháng/CCCD/Mã số DN).
4. Khuyến nghị chuẩn giao diện DaaS / API để đồng bộ qua Nền tảng NDOP.`;

  return callDirectGemini(prompt);
}
