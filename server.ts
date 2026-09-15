import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;

// Lazy initialization of Gemini client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is not configured. Please set your key in Settings > Secrets.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

const SYSTEM_INSTRUCTION = `Bạn là Chuyên gia Trợ lý AI Cấp cao về Khung Kiến trúc & Quản trị dữ liệu Quốc gia Việt Nam.
Bạn nắm vững các văn bản quy phạm pháp luật và tiêu chuẩn kỹ thuật trọng tâm:
1. Quyết định số 2439/QĐ-TTg của Thủ tướng Chính phủ: Phê duyệt Kiến trúc dữ liệu quốc gia (Từ điển 06 miền dữ liệu dùng chung cốt lõi: Con người DOM-HUMAN, Tổ chức DOM-ORG, Tài sản DOM-ASSET, Địa chính DOM-CADASTRAL, Địa chỉ DOM-ADDRESS, Nền địa lý DOM-GEO).
2. Công văn số 4856/BCA-TTDLQG ngày 14/9/2026 của Bộ Công an: Hướng dẫn khung quản trị, quản lý dữ liệu (Mô hình 05 bộ phận; 03 mô hình tổ chức tại tỉnh; Bộ phận Tuân thủ BẮT BUỘC do Công an tỉnh chủ trì và TUYỆT ĐỐI không thuê ngoài; CDO; Data Steward; Đầu mối cấp xã; Chỉ số DQI 5 tiêu chuẩn "Đúng, Đủ, Sạch, Sống, Thống nhất"; Ngưỡng DQI 100% tuyệt đối cho khóa định danh; SLA 5-10-15 ngày; 08 nhóm lỗi dữ liệu phổ biến).
3. Nghị định số 278/2025/NĐ-CP: Quy định kết nối, chia sẻ dữ liệu qua Trục Nền tảng điều phối quốc gia (NDOP), Nền tảng chia sẻ dữ liệu cấp tỉnh (LDOP/LGSP), máy chủ bảo mật Agent Node do C12 Bộ Công an quản lý, 03 loại yêu cầu kết nối và Quy trình 05 bước kết nối đồng bộ.
4. Nghị quyết số 175/NQ-CP: Cụm 03 Trung tâm Dữ liệu quốc gia (NDC 1, NDC 2, NDC 3) kiến trúc Active-Active-Standby.
5. Vị trí, vai trò của Sở Tài chính theo mô hình chính quyền 02 cấp (Nghị định 45/2025/NĐ-CP): Theo mô hình chính quyền địa phương 02 cấp, Sở Kế hoạch và Đầu tư đã được hợp nhất vào Sở Tài chính để trở thành SỞ TÀI CHÍNH thống nhất cấp tỉnh. Sở Tài chính là cơ quan chuyên môn thuộc UBND cấp tỉnh chủ trì quản lý nhà nước về kế hoạch, đầu tư, ngân sách, tài sản công, đồng thời trực tiếp quản trị CSDL Đăng ký doanh nghiệp, CSDL Đăng ký hộ kinh doanh, CSDL Đầu tư kinh doanh trên địa bàn tỉnh; kết nối và đồng bộ trực tiếp với CSDL Quốc gia về Đăng ký doanh nghiệp và NDOP; phối hợp chặt chẽ với Cục Thuế. Khi sắp xếp địa giới hành chính theo mô hình 02 cấp, bảo lưu nguyên trạng mã định danh lịch sử, không sửa đổi hồi tố và thiết lập Bảng ánh xạ mã ĐVHC trước - sau sắp xếp.
6. Quy mô hành chính cấp tỉnh theo mô hình chính quyền 02 cấp: Toàn quốc hiện nay được tổ chức tinh gọn thành 34 tỉnh, thành phố trực thuộc Trung ương (thay vì 63 trước đây, gồm 08 đô thị hạt nhân ưu tiên và 26 tỉnh, thành phố còn lại). Toàn bộ 34 địa phương đều kết nối trực tiếp qua Trục NDOP và cụm máy chủ Agent Node C12.

Hãy trả lời bằng tiếng Việt trang trọng, chuẩn xác theo ngôn ngữ hành chính - kỹ thuật, trích dẫn rõ điều khoản/phụ lục căn cứ pháp lý.`;

async function generateWithFallback(params: {
  contents: any;
  systemInstruction?: string;
  temperature?: number;
}): Promise<{ text: string; model: string }> {
  const ai = getGeminiClient();
  const models = ["gemini-3.6-flash", "gemini-3.8-flash", "gemini-3.1-pro-preview"];
  let lastError: any = null;

  for (const model of models) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents: params.contents,
        config: {
          systemInstruction: params.systemInstruction,
          temperature: params.temperature ?? 0.3,
        },
      });
      return { text: response.text || "", model };
    } catch (err: any) {
      console.warn(`Model ${model} failed, attempting next model fallback:`, err?.message || err);
      lastError = err;
    }
  }

  throw lastError || new Error("Tất cả mô hình AI đang tạm thời bận. Vui lòng thử lại sau ít phút.");
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: "10mb" }));

  // API Check Status
  app.get("/api/health", (req, res) => {
    res.json({
      status: "ok",
      hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
      model: "gemini-3.6-flash / gemini-3.8-flash",
    });
  });

  // API: Ask Legal & Architecture Copilot
  app.post("/api/gemini/chat", async (req, res) => {
    try {
      const { message, conversationHistory = [] } = req.body;
      if (!message || typeof message !== "string") {
        return res.status(400).json({ error: "Tham số 'message' không hợp lệ." });
      }

      // Format contents
      const contents: Array<{ role: "user" | "model"; parts: Array<{ text: string }> }> = [];

      if (Array.isArray(conversationHistory)) {
        for (const item of conversationHistory.slice(-8)) {
          if (item.role === "user" || item.role === "model") {
            contents.push({
              role: item.role,
              parts: [{ text: item.content || item.text || "" }],
            });
          }
        }
      }

      contents.push({
        role: "user",
        parts: [{ text: message }],
      });

      const result = await generateWithFallback({
        contents,
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.3,
      });

      res.json({
        reply: result.text || "Không có phản hồi từ mô hình AI.",
        model: result.model,
      });
    } catch (error: any) {
      console.error("Gemini chat error:", error);
      res.status(500).json({
        error: error?.message || "Lỗi khi giao tiếp với Gemini API. Vui lòng thử lại.",
      });
    }
  });

  // API: Diagnose Data Quality Issue & Generate Remediation Script
  app.post("/api/gemini/diagnose-issue", async (req, res) => {
    try {
      const { errorType, violatingField, responsibleUnit, description } = req.body;

      const prompt = `Phân tích chuyên sâu sự cố chất lượng dữ liệu:
- Phân loại lỗi: ${errorType || "Chưa xác định"}
- Trường dữ liệu vi phạm: ${violatingField || "Chưa xác định"}
- Bộ phận khắc phục: ${responsibleUnit || "Sở Tài chính"}
- Mô tả chi tiết: ${description || "Phát hiện lỗi không nhất quán dữ liệu"}

Yêu cầu xuất kết quả theo cấu trúc:
1. [Nguyên nhân gốc rễ (Root Cause)]: Xác định nguyên nhân nghiệp vụ hoặc lỗi kỹ thuật phần mềm Một cửa/chuyên ngành.
2. [Căn cứ pháp lý & SLA]: Mức độ ưu tiên (Đỏ/Vàng/Xanh), thời hạn cam kết SLA xử lý theo Phụ lục 3 Công văn 4856.
3. [Câu lệnh kỹ thuật kiểm tra (SQL Check Query)]: Viết câu lệnh SQL mẫu để Bộ phận Kỹ thuật dữ liệu rà quét phát hiện tất cả các bản ghi vi phạm tương tự.
4. [Kịch bản xử lý tại gốc]: Các bước cụ thể cho đơn vị chịu trách nhiệm (ví dụ: Sở Tài chính, Phòng Cảnh sát QLHC, Sở Tư pháp) và cơ chế bảo toàn dữ liệu lịch sử.`;

      const result = await generateWithFallback({
        contents: [{ parts: [{ text: prompt }] }],
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.2,
      });

      res.json({
        diagnosis: result.text,
        model: result.model,
      });
    } catch (error: any) {
      console.error("Gemini diagnose error:", error);
      res.status(500).json({
        error: error?.message || "Lỗi phân tích sự cố dữ liệu.",
      });
    }
  });

  // API: Smart Schema Mapping to 6 Core Data Domains
  app.post("/api/gemini/schema-suggest", async (req, res) => {
    try {
      const { tableName, columnsDescription } = req.body;

      const prompt = `Đối chiếu và ánh xạ bảng dữ liệu nguồn sau vào Kiến trúc 06 Miền Dữ liệu Dùng chung Cốt lõi (Quyết định 2439/QĐ-TTg):
- Tên bảng/Hệ thống nghiệp vụ: ${tableName}
- Mô tả danh sách các cột/trường: ${columnsDescription}

Hãy đề xuất:
1. Ánh xạ vào Miền dữ liệu nào (DOM-HUMAN, DOM-ORG, DOM-ASSET, DOM-CADASTRAL, DOM-ADDRESS, DOM-GEO).
2. Xác định trường nào bắt buộc là Khóa chính/Khóa ngoại (Primary Key / Foreign Key) liên kết quốc gia.
3. Đề xuất quy tắc kỹ thuật DQI bắt buộc (Regex, NOT NULL, Format chuẩn ngày tháng/CCCD/Mã số DN).
4. Khuyến nghị chuẩn giao diện DaaS / API để đồng bộ qua Nền tảng NDOP.`;

      const result = await generateWithFallback({
        contents: [{ parts: [{ text: prompt }] }],
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.2,
      });

      res.json({
        suggestion: result.text,
        model: result.model,
      });
    } catch (error: any) {
      console.error("Gemini schema-suggest error:", error);
      res.status(500).json({
        error: error?.message || "Lỗi ánh xạ từ điển dữ liệu.",
      });
    }
  });

  // Vite middleware for development vs static serve for production
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
