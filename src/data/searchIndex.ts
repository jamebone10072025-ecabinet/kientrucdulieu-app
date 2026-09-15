import { NavigationTab } from '../types';

export type SearchCategory = 
  | 'all'
  | 'legal'       // Văn bản & Pháp lý
  | 'dictionary'  // Từ điển & Chuẩn định danh
  | 'connection'  // Tiêu chuẩn kết nối & Nền tảng
  | 'quality'     // Tiêu chuẩn chất lượng DQI & 8 Lỗi
  | 'governance'; // Cơ cấu 05 Bộ phận & Vận hành

export interface SearchItem {
  id: string;
  title: string;
  category: SearchCategory;
  categoryLabel: string;
  code?: string;
  summary: string;
  legalCitation: string;
  keyPoints: string[];
  targetTab: NavigationTab;
  highlightTag?: string;
  keywords: string[];
  aiPrompt?: string; // Pre-formatted prompt for Gemini AI
}

export function removeVietnameseTones(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
    .trim();
}

export const SEARCH_ITEMS: SearchItem[] = [
  // ==========================================
  // 1. VĂN BẢN PHÁP LÝ & QUY ĐỊNH
  // ==========================================
  {
    id: 'legal-nd278',
    title: 'Nghị định số 278/2025/NĐ-CP: Kết nối, chia sẻ dữ liệu bắt buộc',
    category: 'legal',
    categoryLabel: 'Văn bản pháp lý',
    code: 'NĐ 278/2025/NĐ-CP',
    summary: 'Quy định bắt buộc kết nối, chia sẻ dữ liệu qua Trục Nền tảng điều phối quốc gia (NDOP), xếp hạng các CSDL, phân định 03 loại yêu cầu kết nối và chế tài xử lý cơ quan chậm trễ.',
    legalCitation: 'Nghị định số 278/2025/NĐ-CP ngày 22/10/2025 của Chính phủ',
    keyPoints: [
      'Bắt buộc kết nối qua Nền tảng chia sẻ, điều phối dữ liệu quốc gia (NDOP) và Agent Node C12.',
      'Phân loại 03 loại yêu cầu kết nối: Đồng bộ định kỳ/thời gian thực (Loại 1), Tra cứu trực tiếp (Loại 2), Chia sẻ dữ liệu tổng hợp/báo cáo (Loại 3).',
      'Quy trình 05 bước kiểm thử và nghiệm thu kết nối liên thông bắt buộc.',
      'Chế tài xử lý trách nhiệm người đứng đầu nếu chậm trễ mở cổng chia sẻ dữ liệu.'
    ],
    targetTab: 'integration',
    highlightTag: 'Bắt buộc toàn quốc',
    keywords: ['nghi dinh 278', 'nd 278', 'nd278', 'ket noi chia se du lieu', 'ndop', 'bat buoc', 'che tai', '3 loai yeu cau', 'quy trinh 5 buoc'],
    aiPrompt: 'Giải thích chi tiết các quy định bắt buộc về kết nối, chia sẻ dữ liệu theo Nghị định 278/2025/NĐ-CP, bao gồm 03 loại yêu cầu kết nối và chế tài đối với cơ quan chậm trễ.'
  },
  {
    id: 'legal-cv4856',
    title: 'Công văn số 4856/BCA-TTDLQG: Hướng dẫn triển khai Khung dữ liệu quốc gia',
    category: 'legal',
    categoryLabel: 'Văn bản pháp lý',
    code: 'CV 4856/BCA-TTDLQG',
    summary: 'Hướng dẫn toàn diện của Bộ Công an về thiết lập mô hình 05 bộ phận quản trị dữ liệu, quy hoạch kho dữ liệu tỉnh, an ninh Agent Node và giám sát 8 nhóm lỗi chất lượng dữ liệu.',
    legalCitation: 'Công văn số 4856/BCA-TTDLQG ngày 14/9/2026 của Bộ Công an',
    keyPoints: [
      'Thiết lập Khung quản trị dữ liệu 05 bộ phận (Tuân thủ, Quản trị, Kỹ thuật, Tạo lập, Đổi mới sáng tạo).',
      'Bộ phận Tuân thủ bắt buộc do Công an tỉnh trực tiếp chủ trì theo ngành dọc; tuyệt đối không thuê ngoài.',
      'Quy định chỉ số chất lượng dữ liệu DQI theo 5 tiêu chí: Đúng - Đủ - Sạch - Sống - Thống nhất; ngưỡng 100% tuyệt đối cho trường định danh.',
      'Quy định khung cam kết SLA xử lý sự cố chất lượng: 5 ngày - 10 ngày - tối đa 15 ngày.'
    ],
    targetTab: 'overview',
    highlightTag: 'Hướng dẫn Bộ Công an',
    keywords: ['cong van 4856', 'cv 4856', 'cv4856', 'bo cong an', 'ttdlqg', '5 bo phan', 'khung quan tri', 'sla 5-10-15', 'dqi', 'tuan thu cong an'],
    aiPrompt: 'Trình bày các nội dung cốt lõi của Công văn 4856/BCA-TTDLQG ngày 14/9/2026 của Bộ Công an về hướng dẫn triển khai kiến trúc và quản trị dữ liệu quốc gia.'
  },
  {
    id: 'legal-qd2439',
    title: 'Quyết định số 2439/QĐ-TTg: Phê duyệt Khung kiến trúc dữ liệu quốc gia',
    category: 'legal',
    categoryLabel: 'Văn bản pháp lý',
    code: 'QĐ 2439/QĐ-TTg',
    summary: 'Văn bản nền tảng của Thủ tướng Chính phủ ban hành Khung kiến trúc dữ liệu quốc gia, Khung quản trị dữ liệu quốc gia và Từ điển dữ liệu dùng chung (Phiên bản 1.0).',
    legalCitation: 'Quyết định số 2439/QĐ-TTg ngày 04/11/2025 của Thủ tướng Chính phủ',
    keyPoints: [
      'Xác lập 06 Miền dữ liệu quốc gia cốt lõi (Con người, Tổ chức, Tài sản, Địa chính, Địa chỉ, Nền địa lý).',
      'Xác lập Từ điển dữ liệu dùng chung phiên bản 1.0 thống nhất trên toàn quốc.',
      'Quy định 04 cấp độ bảo đảm an ninh, an toàn dữ liệu từ vùng công cộng đến vùng lõi chuyên dụng.',
      'Nguyên tắc dữ liệu thu thập một lần, chia sẻ nhiều lần, lấy định danh điện tử làm trung tâm.'
    ],
    targetTab: 'dictionary',
    highlightTag: 'Quyết định Thủ tướng',
    keywords: ['quyet dinh 2439', 'qd 2439', 'qd2439', 'thu tuong', 'khung kien truc', 'tu dien du lieu', '6 mien', 'v1.0'],
    aiPrompt: 'Phân tích ý nghĩa và nội dung trọng tâm của Quyết định số 2439/QĐ-TTg của Thủ tướng Chính phủ về Khung kiến trúc dữ liệu quốc gia và Từ điển dữ liệu dùng chung.'
  },
  {
    id: 'legal-nd45',
    title: 'Nghị định số 45/2025/NĐ-CP & Mô hình chính quyền 02 cấp (34 Tỉnh/Thành)',
    category: 'legal',
    categoryLabel: 'Văn bản pháp lý',
    code: 'NĐ 45/2025/NĐ-CP',
    summary: 'Quy định tổ chức chính quyền địa phương 02 cấp tinh gọn thành 34 tỉnh, thành phố; sáp nhập Sở Kế hoạch và Đầu tư vào Sở Tài chính; bảo lưu nguyên trạng mã ĐVHC lịch sử.',
    legalCitation: 'Nghị định số 45/2025/NĐ-CP của Chính phủ & Đề án sắp xếp ĐVHC',
    keyPoints: [
      'Toàn quốc sắp xếp thành 34 tỉnh, thành phố trực thuộc Trung ương (08 đô thị hạt nhân ưu tiên và 26 tỉnh còn lại).',
      'Sở Kế hoạch và Đầu tư hợp nhất vào Sở Tài chính; Sở Tài chính chủ trì CSDL Đăng ký doanh nghiệp và Đầu tư.',
      'Bảo lưu nguyên trạng mã định danh lịch sử (không sửa đổi hồi tố dữ liệu cũ).',
      'Thiết lập Bảng ánh xạ mã ĐVHC trước và sau sắp xếp để kết nối thông suốt với NDOP.'
    ],
    targetTab: 'overview',
    highlightTag: 'Chính quyền 02 cấp',
    keywords: ['nghi dinh 45', 'nd 45', 'chinh quyen 2 cap', '34 tinh thanh', 'so tai chinh', 'sap nhap so khdt', 'anh xa ma dvhc', 'bao luu ma lich su'],
    aiPrompt: 'Theo mô hình chính quyền 02 cấp (Nghị định 45/2025/NĐ-CP) và quy mô 34 tỉnh thành, vai trò quản trị dữ liệu doanh nghiệp của Sở Tài chính và phương án ánh xạ mã ĐVHC như thế nào?'
  },
  {
    id: 'legal-luat-dulieu',
    title: 'Luật Dữ liệu số 60/2024/QH15',
    category: 'legal',
    categoryLabel: 'Văn bản pháp lý',
    code: 'Luật 60/2024/QH15',
    summary: 'Đạo luật tối cao xác lập địa vị pháp lý của dữ liệu số, quyền và nghĩa vụ của cơ quan nhà nước, tổ chức, cá nhân; thành lập Trung tâm Dữ liệu Quốc gia và Sàn giao dịch dữ liệu.',
    legalCitation: 'Luật Dữ liệu số 60/2024/QH15 thông qua ngày 30/11/2024',
    keyPoints: [
      'Xác định dữ liệu là tài sản quốc gia chiến lược.',
      'Cơ chế kết nối, mở dữ liệu, phân loại dữ liệu cốt lõi và dữ liệu quan trọng.',
      'Thành lập Trung tâm Dữ liệu Quốc gia đóng vai trò hạ tầng thông tin trọng yếu quốc gia Cấp độ 5.',
      'Quy chế vận hành Sàn dữ liệu quốc gia phục vụ phát triển kinh tế số.'
    ],
    targetTab: 'overview',
    highlightTag: 'Luật Quốc hội',
    keywords: ['luat du lieu', 'luat 60', '60/2024/qh15', 'tai san quoc gia', 'san du lieu', 'ttdlqg'],
    aiPrompt: 'Những điểm mới quan trọng nhất của Luật Dữ liệu số 60/2024/QH15 tác động đến công tác số hóa và chia sẻ dữ liệu của địa phương?'
  },
  {
    id: 'legal-luat-dlcn',
    title: 'Luật Bảo vệ dữ liệu cá nhân số 91/2025/QH15',
    category: 'legal',
    categoryLabel: 'Văn bản pháp lý',
    code: 'Luật 91/2025/QH15',
    summary: 'Quy định quyền của chủ thể dữ liệu cá nhân, trách nhiệm bảo mật, nghĩa vụ ẩn danh hóa, khử nhận dạng dữ liệu khi liên thông, khai thác và chuyển giao dữ liệu.',
    legalCitation: 'Luật Bảo vệ dữ liệu cá nhân số 91/2025/QH15',
    keyPoints: [
      'Nghiêm cấm chia sẻ dữ liệu cá nhân thô trái thẩm quyền.',
      'Bắt buộc áp dụng cơ chế phân quyền RBAC và kiểm tra tính tuân thủ định kỳ.',
      'Khai thác dữ liệu cá nhân phục vụ thống kê phân tích phải thực hiện khử nhận dạng (Anonymization/Pseudonymization).',
      'Cơ quan vi phạm chịu trách nhiệm hình sự, hành chính nghiêm ngặt.'
    ],
    targetTab: 'security',
    highlightTag: 'Bảo vệ DLCN',
    keywords: ['luat bao ve du lieu ca nhan', 'luat 91', 'dlcn', 'an danh hoa', 'khu nhan dang', 'quyen chu the'],
    aiPrompt: 'Các quy định bắt buộc về bảo vệ dữ liệu cá nhân và kỹ thuật ẩn danh hóa theo Luật Bảo vệ dữ liệu cá nhân số 91/2025/QH15 khi chia sẻ qua NDOP?'
  },
  {
    id: 'legal-nq175',
    title: 'Nghị quyết số 175/NQ-CP: Đề án Trung tâm Dữ liệu quốc gia (Cụm 03 NDC)',
    category: 'legal',
    categoryLabel: 'Văn bản pháp lý',
    code: 'NQ 175/NQ-CP',
    summary: 'Quy hoạch cụm 03 Trung tâm Dữ liệu quốc gia kiến trúc Active-Active-Standby (NDC 1 Hòa Lạc, NDC 2 dự phòng địa lý, NDC 3 Hot Standby phía Nam Tier IV).',
    legalCitation: 'Nghị quyết số 175/NQ-CP của Chính phủ & Quyết định 11/2026/QĐ-TTg',
    keyPoints: [
      'NDC 1 (Hòa Lạc, Hà Nội): Tier III+, 20 ha, Active-Active, vận hành NDOP và CSDL Tổng hợp.',
      'NDC 2: Active-Active song song với NDC 1, chuyển đổi failover < 1 giây, điện toán lượng tử và HPC.',
      'NDC 3 (Phía Nam): Tier IV cao nhất, Hot Standby, RPO <= 15 phút, RTO <= 60 phút chống thảm họa.',
      'Địa phương không đầu tư phân tán trung tâm dữ liệu vật lý riêng, tập trung dùng chung hạ tầng TTDLQG.'
    ],
    targetTab: 'security',
    highlightTag: 'Cụm 03 NDC',
    keywords: ['nghi quyet 175', 'nq 175', 'trung tam du lieu quoc gia', 'ndc 1', 'ndc 2', 'ndc 3', 'tier iv', 'hoa lac', 'active active'],
    aiPrompt: 'Trình bày quy hoạch cụm 03 Trung tâm Dữ liệu quốc gia theo Nghị quyết 175/NQ-CP và tiêu chuẩn an toàn kỹ thuật Tier III/Tier IV.'
  },

  // ==========================================
  // 2. TỪ ĐIỂN DỮ LIỆU & MIỀN ĐỊNH DANH
  // ==========================================
  {
    id: 'dict-dom-human',
    title: 'Miền dữ liệu về Con người (DOM-HUMAN / DOM-PER)',
    category: 'dictionary',
    categoryLabel: 'Từ điển dữ liệu',
    code: 'DOM-HUMAN',
    summary: 'Chứa thông tin cốt lõi về công dân, nhân khẩu học, định danh điện tử và quan hệ thân nhân; lấy Số định danh cá nhân / Căn cước (12 số) làm khóa định danh duy nhất.',
    legalCitation: 'Quyết định 2439/QĐ-TTg & CSDLQG về Dân cư',
    keyPoints: [
      'Khóa định danh chính: Số định danh cá nhân / Căn cước công dân (12 chữ số chuẩn, Regex: ^[0-9]{12}$).',
      'Ngưỡng chất lượng bắt buộc: DQI = 100% đối với Đúng, Đủ và Sạch (0% sai số cho phép).',
      'Cơ quan chủ quản cấp Trung ương: Bộ Công an (C12/C06).',
      'Phương thức khai thác tại tỉnh: API/DaaS thời gian thực qua Agent Node, không tạo bản sao lưu cục bộ trái phép.'
    ],
    targetTab: 'dictionary',
    highlightTag: 'DQI 100% Khóa chính',
    keywords: ['dom-human', 'dom-per', 'con nguoi', 'can cuoc cong dan', 'cccd', 'so dinh danh ca nhan', '12 so', 'dan cu', 'nguong 100'],
    aiPrompt: 'Quy định kỹ thuật và tiêu chuẩn chất lượng DQI 100% đối với Miền dữ liệu về Con người (DOM-HUMAN) theo Quyết định 2439 và Công văn 4856?'
  },
  {
    id: 'dict-dom-org',
    title: 'Miền dữ liệu về Tổ chức & Doanh nghiệp (DOM-ORG)',
    category: 'dictionary',
    categoryLabel: 'Từ điển dữ liệu',
    code: 'DOM-ORG',
    summary: 'Chứa dữ liệu pháp lý về doanh nghiệp, hợp tác xã, hộ kinh doanh và tổ chức; do Sở Tài chính chủ trì quản trị tại cấp tỉnh theo mô hình chính quyền 02 cấp.',
    legalCitation: 'Quyết định 2439/QĐ-TTg & Nghị định 45/2025/NĐ-CP',
    keyPoints: [
      'Khóa định danh chính: Mã số doanh nghiệp / Mã số thuế (10 hoặc 13 chữ số, Regex: ^[0-9]{10}(-[0-9]{3})?$).',
      'Cơ quan chủ trì cấp tỉnh: Sở Tài chính (tiếp nhận chức năng từ Sở KH&ĐT theo mô hình 02 cấp).',
      'Liên kết thực thể: Khóa ngoại trỏ sang người đại diện pháp luật (DOM-HUMAN.So_Dinh_Danh).',
      'Đồng bộ trực tiếp qua NDOP lên CSDL Quốc gia về Đăng ký doanh nghiệp và liên thông dữ liệu Thuế.'
    ],
    targetTab: 'dictionary',
    highlightTag: 'Sở Tài chính quản trị',
    keywords: ['dom-org', 'to chuc', 'doanh nghiep', 'ma so thue', 'ma so doanh nghiep', 'so tai chinh', 'hop tac xa', 'dang ky kinh doanh'],
    aiPrompt: 'Cấu trúc trường và quy tắc quản trị Miền dữ liệu về Tổ chức (DOM-ORG) của Sở Tài chính theo mô hình chính quyền 02 cấp?'
  },
  {
    id: 'dict-dom-asset',
    title: 'Miền dữ liệu về Tài sản công & Phương tiện (DOM-ASSET)',
    category: 'dictionary',
    categoryLabel: 'Từ điển dữ liệu',
    code: 'DOM-ASSET',
    summary: 'Dữ liệu quản lý tài sản công, phương tiện giao thông, máy móc thiết bị và tài sản có đăng ký quyền sở hữu của cơ quan nhà nước và xã hội.',
    legalCitation: 'Quyết định 2439/QĐ-TTg & Bộ Tài chính / Bộ GTVT / Bộ Công an',
    keyPoints: [
      'Khóa định danh chính: Mã tài sản công / Biển số xe / Số khung số máy.',
      'Khóa ngoại liên kết: Chu_So_Huu_Id trỏ về DOM-HUMAN (cá nhân) hoặc DOM-ORG (cơ quan/doanh nghiệp).',
      'Mục đích tại địa phương: Quản lý trụ sở, tài sản công các sở ngành, theo dõi phương tiện giao thông thông minh.'
    ],
    targetTab: 'dictionary',
    highlightTag: 'Tài sản & Phương tiện',
    keywords: ['dom-asset', 'tai san', 'tai san cong', 'phuong tien', 'bien so xe', 'so khung', 'so tai chinh'],
    aiPrompt: 'Quy chuẩn trường và phương thức liên kết dữ liệu của Miền dữ liệu Tài sản (DOM-ASSET) với Miền Con người và Tổ chức?'
  },
  {
    id: 'dict-dom-cadastre',
    title: 'Miền dữ liệu về Địa chính & Thửa đất (DOM-CADASTRE)',
    category: 'dictionary',
    categoryLabel: 'Từ điển dữ liệu',
    code: 'DOM-CADASTRE',
    summary: 'Dữ liệu hồ sơ địa chính, thửa đất, số tờ bản đồ, ranh giới pháp lý và giấy chứng nhận quyền sử dụng đất; do Sở Tài nguyên & Môi trường quản trị.',
    legalCitation: 'Quyết định 2439/QĐ-TTg & CSDLQG về Đất đai (VILIS/MPLIS)',
    keyPoints: [
      'Khóa định danh chính: Mã định danh thửa đất duy nhất (Cấu trúc: [MaDVHC]_[SoTo]_[SoThua]).',
      'Khóa ngoại liên kết: Mã người sử dụng đất trỏ về Số ĐDCN/CCCD hoặc Mã số doanh nghiệp.',
      'Mục đích tại địa phương: Tính thuế đất, quy hoạch sử dụng đất, bồi thường giải phóng mặt bằng, cấp sổ đỏ.'
    ],
    targetTab: 'dictionary',
    highlightTag: 'Đất đai & Địa chính',
    keywords: ['dom-cadastre', 'dia chinh', 'thua dat', 'so to so thua', 'dat dai', 'tnmt', 'vilis', 'mplis', 'so do'],
    aiPrompt: 'Cấu trúc mã định danh thửa đất và các quy tắc nghiệp vụ trong Miền dữ liệu Địa chính (DOM-CADASTRE) theo Quyết định 2439?'
  },
  {
    id: 'dict-dom-address',
    title: 'Miền dữ liệu về Địa chỉ số quốc gia (DOM-ADDRESS)',
    category: 'dictionary',
    categoryLabel: 'Từ điển dữ liệu',
    code: 'DOM-ADDRESS',
    summary: 'Hệ thống địa chỉ số gắn biển số nhà, ngõ ngách, tên đường phố với tọa độ địa lý WGS-84 và mã bưu chính quốc gia.',
    legalCitation: 'Quyết định 2439/QĐ-TTg & Nền tảng Địa chỉ số quốc gia',
    keyPoints: [
      'Khóa định danh chính: Mã địa chỉ số quốc gia duy nhất (Ma_Dia_Chi_So).',
      'Thuộc tính tọa độ: Vĩ độ (Latitude), Kinh độ (Longitude) chuẩn WGS-84.',
      'Khóa ngoại liên kết: Ma_DVHC_Xa trỏ về Danh mục ĐVHC chuẩn cấp xã.',
      'Mục đích tại địa phương: Phục vụ chuyển phát logistics, bản đồ cứu nạn 114/115, quy hoạch giao thông.'
    ],
    targetTab: 'dictionary',
    highlightTag: 'Địa chỉ số & Tọa độ',
    keywords: ['dom-address', 'dia chi so', 'toa do', 'wgs84', 'bien so nha', 'vi do kinh do', 'logistics'],
    aiPrompt: 'Phương pháp tích hợp và khai thác dữ liệu Miền Địa chỉ số quốc gia (DOM-ADDRESS) trong ứng dụng đô thị thông minh cấp tỉnh?'
  },
  {
    id: 'dict-dom-geography',
    title: 'Miền dữ liệu về Nền địa lý không gian (DOM-GEO)',
    category: 'dictionary',
    categoryLabel: 'Từ điển dữ liệu',
    code: 'DOM-GEO',
    summary: 'Khung bản đồ nền quốc gia, không gian địa lý, địa hình, thủy hệ, giao thông nền tảng tỉ lệ chuẩn theo chuẩn quốc tế OGC/ISO 19115.',
    legalCitation: 'Quyết định 2439/QĐ-TTg & Hệ thống Dữ liệu Đo đạc Bản đồ GIS',
    keyPoints: [
      'Khóa định danh chính: Mã đối tượng địa lý (Feature ID GIS duy nhất).',
      'Kiểu dữ liệu: Geometry (Point, Polyline, Polygon) chuẩn hệ quy chiếu EPSG:4326/VN-2000.',
      'Mục đích tại địa phương: Nền tảng không gian GIS tích hợp cho IOC tỉnh, bản đồ ngập lụt, quy hoạch hạ tầng.'
    ],
    targetTab: 'dictionary',
    highlightTag: 'GIS & Không gian',
    keywords: ['dom-geo', 'nen dia ly', 'gis', 'khong gian', 'ogc', 'iso 19115', 'ban do nen', 'vn-2000', 'ioc'],
    aiPrompt: 'Yêu cầu kỹ thuật chuẩn hóa dữ liệu GIS không gian trong Miền dữ liệu Nền địa lý (DOM-GEO) phục vụ trung tâm IOC tỉnh?'
  },

  // ==========================================
  // 3. TIÊU CHUẨN KẾT NỐI & NỀN TẢNG KỸ THUẬT
  // ==========================================
  {
    id: 'conn-ndop',
    title: 'Nền tảng chia sẻ, điều phối dữ liệu quốc gia (NDOP)',
    category: 'connection',
    categoryLabel: 'Tiêu chuẩn kết nối',
    code: 'NDOP Central',
    summary: 'Trục điều phối dữ liệu trung tâm tối cao do C12 Bộ Công an vận hành tại Trung tâm Dữ liệu quốc gia, kết nối liên thông tất cả Bộ ngành và 34 tỉnh, thành phố.',
    legalCitation: 'Nghị định 278/2025/NĐ-CP & Công văn 4856/BCA-TTDLQG',
    keyPoints: [
      'High-Throughput Service Mesh, Central API Gateway, Enterprise Kafka Cluster.',
      'Kiểm soát toàn bộ phiên giao dịch, điều phối 03 loại yêu cầu kết nối.',
      'Chặn đứng kiến trúc kết nối điểm - điểm (Point-to-Point) phân tán gây mất an toàn thông tin.',
      'Tự động ghi nhận Audit Log và tính điểm DQI của từng địa phương theo thời gian thực.'
    ],
    targetTab: 'integration',
    highlightTag: 'Trục Quốc gia C12',
    keywords: ['ndop', 'national data orchestration platform', 'truc quoc gia', 'c12', 'dieu phoi', 'kafka', 'service mesh', 'api gateway'],
    aiPrompt: 'Kiến trúc kỹ thuật và phương thức kết nối an toàn từ hệ thống cơ sở dữ liệu cấp tỉnh lên Nền tảng NDOP quốc gia?'
  },
  {
    id: 'conn-ldop',
    title: 'Nền tảng tích hợp, chia sẻ dữ liệu cấp tỉnh (LDOP / LGSP nâng cấp)',
    category: 'connection',
    categoryLabel: 'Tiêu chuẩn kết nối',
    code: 'LDOP / LGSP',
    summary: 'Mỗi tỉnh tổ chức DUY NHẤT 01 nền tảng chia sẻ dữ liệu cấp tỉnh (kế thừa từ LGSP), là đầu mối kỹ thuật tập trung kết nối với NDOP qua máy chủ Agent Node.',
    legalCitation: 'Công văn 4856/BCA-TTDLQG Phụ lục 2 & Phụ lục 5',
    keyPoints: [
      'Tuyệt đối không để từng sở, ngành kết nối phân tán lên NDOP.',
      'Tích hợp toàn bộ dữ liệu chuyên ngành nội bộ của các sở, ban, ngành, UBND cấp xã trong tỉnh.',
      'Chuyển tiếp và đồng bộ dữ liệu với Agent Node thông qua mạng truyền số liệu chuyên dùng (TSLCD).',
      'Được trang bị cơ chế tự bảo vệ Rate Limiting và Circuit Breaker chống quá tải.'
    ],
    targetTab: 'integration',
    highlightTag: 'Đầu mối duy nhất cấp tỉnh',
    keywords: ['ldop', 'lgsp', 'nen tang cap tinh', 'dau moi duy nhat', 'kho tinh', 'so nganh', 'tslcd'],
    aiPrompt: 'Vai trò của Nền tảng LDOP cấp tỉnh và vì sao Công văn 4856 nghiêm cấm các sở, ngành tự ý kết nối phân tán lên NDOP?'
  },
  {
    id: 'conn-agent-node',
    title: 'Máy chủ bảo mật điểm kết nối Agent Node (C12 Bộ Công an cấp)',
    category: 'connection',
    categoryLabel: 'Tiêu chuẩn kết nối',
    code: 'Agent Node C12',
    summary: 'Thiết bị máy chủ bảo mật vật lý do C12 Bộ Công an cấp và cài đặt phần mềm chuyên dụng, đặt tại vùng biên DMZ của tỉnh để kiểm soát lưu lượng mTLS vào ra NDOP.',
    legalCitation: 'Công văn 4856/BCA-TTDLQG Phụ lục 4 & Phụ lục 5',
    keyPoints: [
      'Vị trí triển khai: Đặt tại vùng mạng biên (DMZ), cách ly vật lý độc lập với mạng nội bộ tỉnh.',
      'Tích hợp mô-đun phần cứng bảo mật chuyên dụng HSM (Hardware Security Module) FIPS 140-2 Level 3.',
      'Mã hóa đường truyền cấp cao qua mTLS (Mutual TLS) và TLS 1.3 với chứng thư số của Ban Cơ yếu Chính phủ.',
      'Kết nối trực tiếp về Trung tâm SOC/SIEM của Trung tâm Dữ liệu quốc gia để giám sát an ninh 24/7.'
    ],
    targetTab: 'security',
    highlightTag: 'Bảo mật C12 cấp',
    keywords: ['agent node', 'may chu agent node', 'c12', 'dmz', 'hsm', 'mtls', 'soc', 'siem', 'ban co yeu', 'vung bien'],
    aiPrompt: 'Yêu cầu kỹ thuật, phân vùng mạng DMZ và quy trình vận hành máy chủ bảo mật Agent Node do C12 cấp cho các tỉnh?'
  },
  {
    id: 'conn-3-types',
    title: '03 Loại yêu cầu kết nối chia sẻ dữ liệu theo Nghị định 278',
    category: 'connection',
    categoryLabel: 'Tiêu chuẩn kết nối',
    code: 'Req Types 1, 2, 3',
    summary: 'Nghị định 278 phân định rõ 3 hình thức kết nối nhằm tối ưu hóa băng thông, an ninh và mục đích sử dụng giữa Trung ương và địa phương.',
    legalCitation: 'Nghị định số 278/2025/NĐ-CP & Công văn 4856',
    keyPoints: [
      'Loại 1 - Đồng bộ dữ liệu định kỳ/thời gian thực (Push/Pull): Dùng cho dữ liệu biến động liên tục (dân cư, đăng ký doanh nghiệp, đất đai).',
      'Loại 2 - Tra cứu trực tiếp theo nhu cầu (Synchronous Query): Dùng cho xác thực tức thời trong giải quyết TTHC (xác thực CCCD, tra cứu mã số thuế).',
      'Loại 3 - Chia sẻ dữ liệu tổng hợp/phân tích (Batch Analytical): Dùng cho xuất báo cáo vĩ mô, chỉ đạo điều hành IOC, dữ liệu vi mô đã ẩn danh hóa.'
    ],
    targetTab: 'integration',
    highlightTag: 'Quy chế kết nối',
    keywords: ['3 loai yeu cau ket noi', 'loai 1', 'loai 2', 'loai 3', 'push pull', 'dong bo', 'tra cuu truc tiep', 'batch', 'nghi dinh 278'],
    aiPrompt: 'Phân tích chi tiết 03 loại yêu cầu kết nối chia sẻ dữ liệu theo Nghị định 278/2025/NĐ-CP và trường hợp áp dụng thực tế tại cấp tỉnh.'
  },
  {
    id: 'conn-5-steps',
    title: 'Quy trình 05 bước kết nối tích hợp dữ liệu lên NDOP',
    category: 'connection',
    categoryLabel: 'Tiêu chuẩn kết nối',
    code: '5 Steps Process',
    summary: 'Quy trình chuẩn hóa bắt buộc để một cơ sở dữ liệu chuyên ngành địa phương được cấp phép mở cổng liên thông chính thức lên Trục NDOP.',
    legalCitation: 'Công văn 4856/BCA-TTDLQG Phụ lục 5',
    keyPoints: [
      'Bước 1: Rà soát, ánh xạ cấu trúc CSDL nguồn với Từ điển dữ liệu dùng chung (QĐ 2439).',
      'Bước 2: Kiểm thử chất lượng DQI nội bộ (phải đạt 100% trường định danh, >90% trường phụ trợ).',
      'Bước 3: Gửi hồ sơ đăng ký kết nối điện tử lên Cổng điều phối NDOP (do CDO ký duyệt).',
      'Bước 4: Kiểm thử liên thông trong môi trường Sandbox qua Agent Node C12.',
      'Bước 5: Ký số biên bản nghiệm thu điện tử, cấp phép mở cổng và phân quyền RBAC chính thức.'
    ],
    targetTab: 'integration',
    highlightTag: 'Quy trình chuẩn',
    keywords: ['quy trinh 5 buoc', '5 buoc ket noi', 'kiem thu dqi', 'dang ky ndop', 'sandbox', 'nghiem thu', 'mo cong'],
    aiPrompt: 'Chi tiết từng bước trong Quy trình 05 bước kết nối, tích hợp dữ liệu từ Kho dữ liệu cấp tỉnh lên NDOP theo Công văn 4856?'
  },

  // ==========================================
  // 4. TIÊU CHUẨN CHẤT LƯỢNG DQI & 8 NHÓM LỖI
  // ==========================================
  {
    id: 'dqi-standard',
    title: 'Chỉ số Chất lượng Dữ liệu (DQI) & Ngưỡng 100% Tuyệt đối',
    category: 'quality',
    categoryLabel: 'Chất lượng DQI',
    code: 'DQI Metric',
    summary: 'Bộ chỉ số đo lường chất lượng dữ liệu quốc gia theo 5 tiêu chí: Đúng, Đủ, Sạch, Sống, Thống nhất; nghiêm cấm dung sai (0% sai số) đối với trường định danh.',
    legalCitation: 'Công văn 4856/BCA-TTDLQG Phụ lục 3',
    keyPoints: [
      'Công thức tính: DQI = w1*Đúng + w2*Đủ + w3*Sạch + w4*Sống + w5*Thống nhất (Tổng trọng số = 1.0).',
      'Ngưỡng bắt buộc cho khóa chính định danh (CCCD, Mã số thuế, Mã thửa đất): Đúng = 100%, Đủ = 100%, Sạch = 100%.',
      'Nếu vi phạm trường định danh: Kích hoạt ngay cảnh báo sự cố nghiêm trọng (Mức Đỏ), dừng đồng bộ bản ghi lỗi.',
      'Tự động quét Data Profiling hàng đêm để chấm điểm bảng xếp hạng chất lượng dữ liệu của từng tỉnh.'
    ],
    targetTab: 'quality',
    highlightTag: 'Ngưỡng 100% bắt buộc',
    keywords: ['dqi', 'data quality index', 'chat luong du lieu', 'dung du sach song', 'thong nhat', 'nguong 100', 'sai so 0', 'cong thuc dqi'],
    aiPrompt: 'Giải thích công thức tính chỉ số DQI và nguyên tắc xử lý khi trường khóa chính định danh không đạt ngưỡng 100% theo Công văn 4856?'
  },
  {
    id: 'dqi-sla',
    title: 'Khung cam kết thời hạn xử lý sự cố chất lượng (SLA 5-10-15 ngày)',
    category: 'quality',
    categoryLabel: 'Chất lượng DQI',
    code: 'SLA 5-10-15',
    summary: 'Thời hạn bắt buộc các cơ quan chủ quản dữ liệu phải phản hồi và khắc phục sự cố dữ liệu khi Trung tâm Dữ liệu quốc gia hoặc địa phương khác cảnh báo.',
    legalCitation: 'Công văn 4856/BCA-TTDLQG Phụ lục 3 Mục IV',
    keyPoints: [
      'Mốc 1 (Trong 05 ngày làm việc): Cơ quan chủ quản tổ chức rà soát hồ sơ gốc, xác định nguyên nhân và thông báo phương án xử lý.',
      'Mốc 2 (Trong 05 ngày làm việc tiếp theo): Hoàn thành đính chính tại gốc và đồng bộ lại lên CSDL Quốc gia (tổng không quá 10 ngày).',
      'Mốc 3 (Tối đa 15 ngày làm việc): Chỉ áp dụng đối với trường hợp có mâu thuẫn phức tạp cần kiểm tra thực địa hoặc làm việc trực tiếp với người dân/doanh nghiệp.',
      'Bộ phận Tuân thủ (Công an tỉnh) giám sát tiến độ xử lý; nếu quá hạn chuyển báo cáo vi phạm lên Chủ tịch UBND tỉnh.'
    ],
    targetTab: 'quality',
    highlightTag: 'SLA Nghiêm ngặt',
    keywords: ['sla', 'sla 5 10 15', 'thoi han xu ly su co', '5 ngay', '10 ngay', '15 ngay', 'dinh chinh tai goc', 'canh bao do'],
    aiPrompt: 'Quy định về khung thời hạn SLA xử lý sự cố chất lượng dữ liệu 5 - 10 - 15 ngày và trách nhiệm của cơ quan chủ quản dữ liệu?'
  },
  {
    id: 'dqi-8-errors',
    title: '8 Nhóm lỗi dữ liệu phổ biến & Giải pháp khắc phục kỹ thuật',
    category: 'quality',
    categoryLabel: 'Chất lượng DQI',
    code: '8 Error Groups',
    summary: 'Danh mục 8 nhóm lỗi điển hình khi tích hợp dữ liệu cơ sở lên NDOP, nguyên nhân gốc rễ và giải pháp xử lý ở cả góc độ phần mềm và nghiệp vụ.',
    legalCitation: 'Công văn 4856/BCA-TTDLQG Phụ lục 3 Mục III',
    keyPoints: [
      'Lỗi 1: Khuyết thiếu thông tin bắt buộc (Null / Blank / Placeholder N/A).',
      'Lỗi 2: Giá trị bất thường, ngoại lai (Outliers, vi phạm miền giá trị Min-Max).',
      'Lỗi 3: Trùng lặp dữ liệu (Deduplication, trùng khóa chính).',
      'Lỗi 4: Sai định dạng, chưa chuẩn hóa (Formatting & Standards).',
      'Lỗi 5: Mất toàn vẹn tham chiếu khóa ngoại (Foreign Key Constraint).',
      'Lỗi 6: Mâu thuẫn logic giữa các trường (Cross-field validation).',
      'Lỗi 7: Dữ liệu lỗi thời, chưa cập nhật kịp thời (Stale data).',
      'Lỗi 8: Không khớp với nguồn dữ liệu tham chiếu quốc gia (Data Reconciliation).'
    ],
    targetTab: 'quality',
    highlightTag: 'Cẩm nang sửa lỗi',
    keywords: ['8 nhom loi', '8 loi du lieu', 'null', 'duplicate', 'trung lap', 'ngoai lai', 'logic lien truong', 'khoa ngoai', 'loi thoi'],
    aiPrompt: 'Trình bày 8 nhóm lỗi dữ liệu phổ biến theo Công văn 4856 và phương pháp kỹ thuật để chặn lỗi ngay tại giao diện nhập liệu phần mềm?'
  },

  // ==========================================
  // 5. CƠ CẤU 05 BỘ PHẬN & MÔ HÌNH VẬN HÀNH
  // ==========================================
  {
    id: 'gov-5-depts',
    title: 'Mô hình Khung quản trị dữ liệu 05 Bộ phận',
    category: 'governance',
    categoryLabel: 'Cơ cấu tổ chức',
    code: '5 Departments',
    summary: 'Mô hình chuẩn hóa phân định rõ chức năng, trách nhiệm của 05 bộ phận trong quản trị, vận hành và khai thác dữ liệu số tại cấp Bộ và cấp Tỉnh.',
    legalCitation: 'Công văn 4856/BCA-TTDLQG Phụ lục 1',
    keyPoints: [
      'BP-01: Bộ phận Kiểm soát Tuân thủ và An ninh An toàn Dữ liệu (Công an tỉnh chủ trì).',
      'BP-02: Bộ phận Quản trị, Chính sách & Chuẩn hóa Dữ liệu (Sở KH&CN chủ trì, thường trực CDO).',
      'BP-03: Bộ phận Vận hành Hạ tầng, Nền tảng & Kỹ thuật Dữ liệu (Trung tâm CNTT&TT tỉnh).',
      'BP-04: Bộ phận Tạo lập, Thu thập, Số hóa & Làm sạch Dữ liệu tại Nguồn (Một cửa / Các Sở ngành).',
      'BP-05: Bộ phận Phân tích Dữ liệu, Trí tuệ Nhân tạo & Đổi mới Sáng tạo (IOC tỉnh).'
    ],
    targetTab: 'overview',
    highlightTag: 'Khung 05 Bộ phận',
    keywords: ['5 bo phan', 'khung quan tri 5 bo phan', 'bp-01', 'bp-02', 'bp-03', 'bp-04', 'bp-05', 'tuan thu', 'quan tri', 'ky thuat', 'tao lap', 'doi moi'],
    aiPrompt: 'Chức năng, nhiệm vụ và phân công trách nhiệm của 05 Bộ phận trong Khung quản trị dữ liệu cấp tỉnh theo Công văn 4856?'
  },
  {
    id: 'gov-compliance',
    title: 'Bộ phận Tuân thủ (BP-01): Bắt buộc Công an tỉnh chủ trì',
    category: 'governance',
    categoryLabel: 'Cơ cấu tổ chức',
    code: 'BP-01 Compliance',
    summary: 'Cơ quan giám sát độc lập tối cao về an ninh mạng, bảo vệ DLCN và thực thi chuẩn DQI tại địa phương. Do Công an tỉnh chủ trì theo ngành dọc BCA, tuyệt đối cấm thuê ngoài.',
    legalCitation: 'Công văn 4856/BCA-TTDLQG Phụ lục 1 Mục III',
    keyPoints: [
      'Bắt buộc do Công an tỉnh, thành phố trực tiếp chủ trì thực hiện.',
      'CDO tỉnh và các cơ quan khác không được can thiệp vào kết luận giám sát độc lập của Bộ phận Tuân thủ.',
      'Có quyền thanh tra đột xuất, đình chỉ luồng chia sẻ dữ liệu vi phạm và báo cáo vượt cấp lên Chủ tịch tỉnh.',
      'Tuyệt đối không được thuê chuyên gia bên ngoài (kể cả trong Mô hình 3 chuyển tiếp).'
    ],
    targetTab: 'overview',
    highlightTag: 'Công an tỉnh chủ trì',
    keywords: ['bo phan tuan thu', 'bp-01', 'cong an tinh', 'doc lap', 'khong thue ngoai', 'giam sat an ninh', 'an ninh mang', 'bao ve dlcn'],
    aiPrompt: 'Tại sao Bộ phận Tuân thủ tại địa phương bắt buộc phải do Công an tỉnh chủ trì và có quyền hạn báo cáo vượt cấp như thế nào?'
  },
  {
    id: 'gov-cdo',
    title: 'Giám đốc Dữ liệu (CDO) & Mạng lưới Data Steward',
    category: 'governance',
    categoryLabel: 'Cơ cấu tổ chức',
    code: 'CDO & Steward',
    summary: 'Thiết lập chức danh lãnh đạo dữ liệu toàn quyền và mạng lưới chuyên viên dữ liệu chuyên ngành tại từng sở, ngành, UBND cấp xã.',
    legalCitation: 'Công văn 4856/BCA-TTDLQG Phụ lục 1 Mục II',
    keyPoints: [
      'CDO tỉnh: Do Chủ tịch UBND tỉnh ủy quyền (thường là Giám đốc Sở KH&CN hoặc Lãnh đạo UBND tỉnh phụ trách CNTT).',
      'Chỉ đạo toàn diện 05 bộ phận, ký duyệt yêu cầu cấp quyền kết nối NDOP gửi TTDLQG.',
      'Data Steward: Mỗi sở ngành có ít nhất 01 nhân sự phụ trách dữ liệu chuyên ngành (báo cáo kép về nghiệp vụ và dữ liệu).',
      'Đầu mối cấp xã: Công chức kiêm nhiệm trực tiếp số hóa và đối soát tại nguồn.'
    ],
    targetTab: 'overview',
    highlightTag: 'Chỉ huy & Điều hành',
    keywords: ['cdo', 'chief data officer', 'giam doc du lieu', 'data steward', 'dau moi cap xa', 'chu tich tinh', 'so khcn'],
    aiPrompt: 'Quyền hạn và trách nhiệm của Giám đốc Dữ liệu (CDO) cấp tỉnh và cơ chế báo cáo song song của mạng lưới Data Steward theo Công văn 4856?'
  }
];

export function searchKnowledgeBase(
  query: string, 
  category: SearchCategory = 'all'
): SearchItem[] {
  const trimmed = query.trim();
  if (!trimmed) {
    if (category === 'all') return SEARCH_ITEMS;
    return SEARCH_ITEMS.filter(item => item.category === category);
  }

  const normalizedQuery = removeVietnameseTones(trimmed);
  const queryTokens = normalizedQuery.split(/\s+/).filter(Boolean);

  const scored = SEARCH_ITEMS.map(item => {
    // Filter category if not all
    if (category !== 'all' && item.category !== category) {
      return { item, score: -1 };
    }

    const normTitle = removeVietnameseTones(item.title);
    const normSummary = removeVietnameseTones(item.summary);
    const normCode = removeVietnameseTones(item.code || '');
    const normCitation = removeVietnameseTones(item.legalCitation);
    const normKeywords = item.keywords.map(k => removeVietnameseTones(k));
    const normKeyPoints = item.keyPoints.map(kp => removeVietnameseTones(kp)).join(' ');

    let score = 0;

    // Exact title match
    if (normTitle.includes(normalizedQuery)) score += 50;
    // Exact code match (e.g. ND 278, DOM-ORG)
    if (normCode.includes(normalizedQuery)) score += 60;
    // Exact keyword match
    if (normKeywords.some(k => k === normalizedQuery || k.includes(normalizedQuery))) score += 40;
    // Summary match
    if (normSummary.includes(normalizedQuery)) score += 20;
    // Citation match
    if (normCitation.includes(normalizedQuery)) score += 25;
    // Key points match
    if (normKeyPoints.includes(normalizedQuery)) score += 15;

    // Token match check
    let tokenMatches = 0;
    for (const token of queryTokens) {
      if (
        normTitle.includes(token) || 
        normCode.includes(token) || 
        normSummary.includes(token) || 
        normKeywords.some(k => k.includes(token)) ||
        normKeyPoints.includes(token)
      ) {
        tokenMatches += 1;
      }
    }

    score += tokenMatches * 10;

    return { item, score };
  });

  return scored
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(s => s.item);
}
