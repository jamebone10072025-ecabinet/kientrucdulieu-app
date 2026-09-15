import React, { useState } from 'react';
import { 
  Building2, 
  Layers, 
  ShieldCheck, 
  Network, 
  Database, 
  Lock, 
  ArrowRight, 
  ArrowLeftRight, 
  RefreshCw, 
  CheckCircle2, 
  AlertTriangle, 
  Server, 
  Cpu, 
  Zap, 
  Info, 
  Eye, 
  Play, 
  Pause, 
  RotateCcw,
  Radio,
  FileCheck,
  HardDrive,
  Workflow
} from 'lucide-react';

export type FlowScenarioId = 'overview' | 'sync_push' | 'verify_pull' | 'iot_stream';

interface FlowStep {
  stepNumber: number;
  fromNode: string;
  toNode: string;
  actionTitle: string;
  description: string;
  protocol: string;
  securityNote: string;
  latencyEstimate: string;
}

interface ArchitectureNode {
  id: string;
  name: string;
  shortCode: string;
  zone: 'local' | 'provincial' | 'dmz' | 'network' | 'national_ndop' | 'national_ndc';
  authority: string;
  icon: any;
  techStack: string[];
  securityLevel: string;
  roleDescription: string;
  legalBasis: string;
  keyFunctions: string[];
}

export const DataFlowArchitectureDiagram: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<FlowScenarioId>('overview');
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>('ldop');
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Nodes Definition
  const nodes: Record<string, ArchitectureNode> = {
    dept_sokhdt: {
      id: 'dept_sokhdt',
      name: 'Sở Kế hoạch và Đầu tư (Sở KH&ĐT)',
      shortCode: 'SỞ KH&ĐT',
      zone: 'local',
      authority: 'Sở Kế hoạch và Đầu tư tỉnh',
      icon: Building2,
      techStack: ['CSDL Đăng ký DN', 'PostgreSQL / Oracle', 'REST API', 'Định dạng JSON chuẩn QĐ 2439'],
      securityLevel: 'Cấp độ 2 - 3 (Nghị định 85/2016/NĐ-CP)',
      roleDescription: 'Chủ trì quản lý nhà nước về CSDL Doanh nghiệp, Hộ kinh doanh, Hợp tác xã và CSDL Dự án đầu tư trên địa bàn tỉnh; tiếp nhận và phê duyệt hồ sơ ĐKKD.',
      legalBasis: 'Quyết định 2439/QĐ-TTg (Miền DOM-ORG) & Luật Doanh nghiệp',
      keyFunctions: [
        'Cấp mới, thay đổi đăng ký kinh doanh và giấy chứng nhận đầu tư',
        'Quản lý dữ liệu người đại diện pháp luật (liên kết CCCD)',
        'Đồng bộ tức thời dữ liệu doanh nghiệp mới lên CSDL quốc gia',
        'Phối hợp với Sở Tài chính và Cục Thuế chia sẻ thông tin doanh nghiệp',
      ],
    },
    dept_sotc: {
      id: 'dept_sotc',
      name: 'Sở Tài chính',
      shortCode: 'SỞ TÀI CHÍNH',
      zone: 'local',
      authority: 'Sở Tài chính tỉnh',
      icon: Building2,
      techStack: ['Hệ thống QL Ngân sách (Tabmis)', 'Hệ thống Quản lý Tài sản công', 'RESTful API'],
      securityLevel: 'Cấp độ 3 (Bảo mật tài chính nhà nước)',
      roleDescription: 'Chủ trì quản trị CSDL Ngân sách nhà nước địa phương, CSDL Tài sản công (đất công, trụ sở, xe công), phối hợp phân bổ ngân sách cho chuyển đổi số.',
      legalBasis: 'Luật Ngân sách Nhà nước & QĐ 2439/QĐ-TTg (Miền DOM-ASSET)',
      keyFunctions: [
        'Quản lý danh mục tài sản công toàn tỉnh (Mã định danh tài sản)',
        'Đối soát số liệu thu chi ngân sách, quyết toán dự án đầu tư',
        'Kết nối dữ liệu hóa đơn điện tử, nghĩa vụ tài chính đất đai',
      ],
    },
    dept_sotp: {
      id: 'dept_sotp',
      name: 'Sở Tư pháp & Cấp Xã',
      shortCode: 'SỞ TƯ PHÁP / XÃ',
      zone: 'local',
      authority: 'Sở Tư pháp & UBND cấp xã',
      icon: Building2,
      techStack: ['Hệ thống Đăng ký Hộ tịch Điện tử', 'CSDL Lý lịch tư pháp', 'e-Office'],
      securityLevel: 'Cấp độ 3 (Dữ liệu hộ tịch công dân)',
      roleDescription: 'Cơ quan khởi tạo dữ liệu hộ tịch (khai sinh, kết hôn, khai tử, chứng thực) từ cấp xã đến tỉnh, là nguồn dữ liệu sống cho CSDL quốc gia về dân cư.',
      legalBasis: 'Luật Hộ tịch & QĐ 2439/QĐ-TTg (Miền DOM-HUMAN)',
      keyFunctions: [
        'Cấp Số định danh cá nhân (Số ĐDCN) cho trẻ em mới sinh',
        'Cập nhật tình trạng hôn nhân và biến động hộ tịch',
        'Khai thác xác thực công dân tại Bộ phận Một cửa cấp xã',
      ],
    },
    mot_cua: {
      id: 'mot_cua',
      name: 'Hệ thống Một cửa & Cổng DVC Tỉnh',
      shortCode: 'MỘT CỬA / DVC',
      zone: 'local',
      authority: 'Trung tâm Phục vụ Hành chính công tỉnh',
      icon: Building2,
      techStack: ['Cổng Dịch vụ công tỉnh', 'Hệ thống Thông tin giải quyết TTHC', 'VNeID Login SSO'],
      securityLevel: 'Cấp độ 3 (Bảo vệ thông tin người dân)',
      roleDescription: 'Đầu mối tiếp nhận hồ sơ thủ tục hành chính của công dân, doanh nghiệp; tích hợp xác thực tài khoản VNeID và tra cứu dữ liệu không yêu cầu nộp lại giấy tờ.',
      legalBasis: 'Nghị định 42/2022/NĐ-CP & Đề án 06/CP',
      keyFunctions: [
        'Tiếp nhận và số hóa 100% hồ sơ TTHC đầu vào',
        'Tra cứu tự động thông tin cư trú, doanh nghiệp qua LDOP/NDOP',
        'Tái sử dụng kết quả giải quyết TTHC đã được số hóa',
      ],
    },
    ldop: {
      id: 'ldop',
      name: 'Nền tảng Tích hợp & Chia sẻ dữ liệu cấp Tỉnh (LDOP)',
      shortCode: 'TRỤC LDOP TỈNH',
      zone: 'provincial',
      authority: 'Sở Thông tin và Truyền thông / Trung tâm CNTT-TT tỉnh',
      icon: Layers,
      techStack: ['Enterprise Service Bus (ESB)', 'API Management Gateway', 'Message Queue (Kafka/RabbitMQ)', 'OAuth2 / mTLS'],
      securityLevel: 'Cấp độ 3 - 4 (Hạ tầng chia sẻ trọng yếu của tỉnh)',
      roleDescription: 'Đầu mối tích hợp, điều phối và phân luồng dữ liệu duy nhất trong toàn tỉnh. Kế thừa và nâng cấp từ nền tảng LGSP hiện hữu; liên kết tất cả phần mềm sở ngành, UBND cấp huyện/xã với nhau và kết nối ra ngoài qua Agent Node.',
      legalBasis: 'Nghị định 278/2025/NĐ-CP & Công văn 4856/BCA-TTDLQG',
      keyFunctions: [
        'Định tuyến và chuyển đổi khuôn dạng dữ liệu giữa các Sở ngành',
        'Quản lý phiên xác thực, định danh API và giới hạn lưu lượng (Rate Limiting)',
        'Kết nối nội bộ với Kho dữ liệu tỉnh (Kho Dùng chung, Kho IoT, Kho IOC)',
        'Điều phối gói tin gửi/nhận bảo mật với máy chủ Agent Node C12',
      ],
    },
    provincial_store: {
      id: 'provincial_store',
      name: 'Kho Dữ liệu Tỉnh & Bộ phận Quản trị DQI',
      shortCode: 'KHO DỮ LIỆU TỈNH',
      zone: 'provincial',
      authority: 'Hội đồng Quản trị Dữ liệu tỉnh (CDO & Công an tỉnh)',
      icon: Database,
      techStack: ['Data Lakehouse (MinIO/Ceph)', 'PostgreSQL Partitioned', 'Engine Kiểm tra DQI', 'Elasticsearch / OpenSearch'],
      securityLevel: 'Cấp độ 3',
      roleDescription: 'Lưu trữ logic 06 miền dữ liệu cốt lõi, kho dữ liệu IoT 3 cấp và kho dữ liệu chỉ đạo điều hành (IOC). Bộ phận Tuân thủ (Công an tỉnh chủ trì) rà soát DQI 5 tiêu chuẩn trước khi đồng bộ lên quốc gia.',
      legalBasis: 'Phụ lục 2 & Phụ lục 3 Công văn 4856/BCA-TTDLQG',
      keyFunctions: [
        'Quản lý Từ điển dữ liệu tỉnh và Danh mục dữ liệu (Data Catalog)',
        'Kiểm tra chất lượng dữ liệu (DQI) - Ngưỡng 100% đối với CCCD & Mã số DN',
        'Khử nhận dạng / Ẩn danh hóa dữ liệu cá nhân trước khi nạp vào Kho IOC',
        'Ghi nhật ký hệ thống (Audit Log) không thể chỉnh sửa',
      ],
    },
    agent_node: {
      id: 'agent_node',
      name: 'Máy chủ Bảo mật Điểm kết nối (Agent Node)',
      shortCode: 'AGENT NODE (C12)',
      zone: 'dmz',
      authority: 'Trung tâm Dữ liệu quốc gia (C12 - Bộ Công an)',
      icon: Lock,
      techStack: ['Hardware Security Module (HSM)', 'Dedicated Linux Hardened Appliance', 'Mutual TLS (mTLS) 1.3', 'Chữ ký số C12'],
      securityLevel: 'Cấp độ 4 - 5 (Bảo mật tối mật cấp quốc gia)',
      roleDescription: 'Điểm kết nối trung gian bảo mật bắt buộc đặt tại phân vùng DMZ Trung tâm dữ liệu của tỉnh. Do C12 trực tiếp bàn giao, cài đặt phần mềm độc quyền, ký chứng thư số và giám sát an ninh mạng 24/7. Mọi luồng dữ liệu vào/ra tỉnh bắt buộc phải đi qua thiết bị này.',
      legalBasis: 'Điều 14 Nghị định 278/2025/NĐ-CP & Phụ lục 4 CV 4856',
      keyFunctions: [
        'Mã hóa toàn bộ lưu lượng dữ liệu trước khi phát lên kênh truyền TSLCD',
        'Xác thực tính toàn vẹn và chống giả mạo gói tin bằng khóa HSM',
        'Bộ lọc tường lửa ứng dụng chuyên biệt, ngăn chặn rò rỉ dữ liệu và tấn công trung gian',
        'Ghi log bảo mật và truyền telemetry thời gian thực về Trung tâm SOC C12',
      ],
    },
    tslcd_network: {
      id: 'tslcd_network',
      name: 'Mạng Truyền số liệu Chuyên dùng (TSLCD)',
      shortCode: 'MẠNG TSLCD',
      zone: 'network',
      authority: 'Cục Bưu điện Trung ương & Bộ Thông tin và Truyền thông',
      icon: Radio,
      techStack: ['Cáp quang chuyên dùng độc lập', 'Băng thông ≥ 10 Gbps', 'Mã hóa đường truyền IPsec / MACsec', 'SLA 99.99%'],
      securityLevel: 'Hạ tầng mạng truyền dẫn dùng riêng cho cơ quan Đảng, Nhà nước',
      roleDescription: 'Hạ tầng đường truyền vật lý độc lập kết nối từ Agent Node tại tỉnh về Cụm Trung tâm Dữ liệu quốc gia, cách ly hoàn toàn với Internet công cộng.',
      legalBasis: 'Quyết định 08/2023/QĐ-TTg & Nghị định 278/2025/NĐ-CP',
      keyFunctions: [
        'Bảo đảm độ trễ cực thấp (<15ms) và băng thông cao liên tục',
        'Dự phòng kép (Dual-homing) 2 đường cáp vật lý riêng biệt',
        'Cô lập hoàn toàn lưu lượng, chống nghe lén và tấn công xâm nhập',
      ],
    },
    ndop: {
      id: 'ndop',
      name: 'Nền tảng Chia sẻ, Điều phối Dữ liệu Quốc gia (NDOP)',
      shortCode: 'TRỤC NDOP QUỐC GIA',
      zone: 'national_ndop',
      authority: 'Trung tâm Dữ liệu quốc gia (C12 - Bộ Công an)',
      icon: Network,
      techStack: ['Quốc gia High-Throughput Service Mesh', 'Central API Gateway', 'Enterprise Kafka Cluster', 'Dynamic RBAC Router'],
      securityLevel: 'Cấp độ 5 (Hạ tầng thông tin trọng yếu quốc gia)',
      roleDescription: 'Trục điều phối dữ liệu tối cao của đất nước, kết nối tất cả các Bộ, ban, ngành, 63 tỉnh/thành phố và các tổ chức chính trị - xã hội. Kiểm soát toàn bộ giao dịch, chia sẻ 03 loại yêu cầu kết nối theo Nghị định 278.',
      legalBasis: 'Nghị định 278/2025/NĐ-CP & Quyết định 2439/QĐ-TTg',
      keyFunctions: [
        'Điều phối lưu lượng truy vấn, xử lý hàng triệu transaction/giây',
        'Thực thi chính sách phân quyền tập trung (Data Policy & Access Rights)',
        'Xử lý 03 loại yêu cầu (Khai thác tự động, Theo yêu cầu, Khai thác đặc biệt AI)',
        'Lưu vết Audit Log toàn quốc phục vụ thanh tra, giám sát tuân thủ',
      ],
    },
    ndc: {
      id: 'ndc',
      name: 'Cụm 03 Trung tâm Dữ liệu Quốc gia (NDC 1, NDC 2, NDC 3)',
      shortCode: 'CỤM 03 TTDLQG (NDC)',
      zone: 'national_ndc',
      authority: 'Bộ Công an (C12)',
      icon: HardDrive,
      techStack: ['Distributed Exabyte Storage', '20 CSDL Quốc gia cốt lõi', 'HPC GPU Clusters (AI/Big Data)', 'Active-Active-Standby'],
      securityLevel: 'Cấp độ 5 (Đặc biệt quan trọng đối với an ninh quốc gia)',
      roleDescription: 'Nơi lưu trữ CSDL Tổng hợp quốc gia, CSDL Dân cư, CSDL Doanh nghiệp, CSDL Đất đai, CSDL Tài sản công, CSDL Địa chính... Hạ tầng siêu tính toán AI quốc gia.',
      legalBasis: 'Nghị quyết 175/NQ-CP & Luật Dữ liệu',
      keyFunctions: [
        'Lưu trữ duy nhất một nguồn sự thật (Single Source of Truth) toàn quốc',
        'Dự phòng thảm họa tức thì giữa NDC 1 (Hà Nội), NDC 2 (Hòa Lạc), NDC 3 (TP.HCM)',
        'Cung cấp dịch vụ phân tích dữ liệu lớn, phát hiện gian lận và hỗ trợ chính sách',
      ],
    },
  };

  // Scenarios and Steps
  const scenarioData: Record<FlowScenarioId, { title: string; subtitle: string; steps: FlowStep[] }> = {
    overview: {
      title: 'Toàn cảnh Luồng Dữ liệu Đa tầng (End-to-End Multi-Tier)',
      subtitle: 'Mô hình liên thông 5 tầng từ hệ thống các Sở, ngành địa phương đến Trung tâm Dữ liệu quốc gia theo Nghị định 278/2025/NĐ-CP',
      steps: [
        {
          stepNumber: 1,
          fromNode: 'dept_sokhdt',
          toNode: 'ldop',
          actionTitle: '1. Khởi tạo & Đẩy dữ liệu Sở ngành',
          description: 'Sở KH&ĐT (hoặc Sở Tài chính, Tư pháp) đẩy bản ghi đăng ký doanh nghiệp mới qua API nội bộ tỉnh.',
          protocol: 'REST API / JSON (mTLS nội bộ tỉnh)',
          securityNote: 'Mã hóa nội bộ, xác thực tài khoản dịch vụ API key Sở ngành',
          latencyEstimate: '< 20 ms',
        },
        {
          stepNumber: 2,
          fromNode: 'ldop',
          toNode: 'provincial_store',
          actionTitle: '2. Kiểm định DQI & Lưu kho tỉnh',
          description: 'Trục LDOP chuyển tiếp bản ghi vào Kho dữ liệu tỉnh; Bộ phận Tuân thủ (Công an tỉnh) kiểm tra tính "Đúng - Đủ - Sạch - Sống", đối soát khóa định danh đạt ngưỡng 100%.',
          protocol: 'gRPC / Kafka Event Stream',
          securityNote: 'Kiểm tra Rule Engine tự động, ký số xác nhận tính hợp lệ',
          latencyEstimate: '< 50 ms',
        },
        {
          stepNumber: 3,
          fromNode: 'ldop',
          toNode: 'agent_node',
          actionTitle: '3. Chuyển tiếp tới Vùng biên DMZ',
          description: 'Gói tin đạt chuẩn DQI được LDOP đóng gói gửi sang máy chủ bảo mật Agent Node do C12 quản lý đặt tại DMZ.',
          protocol: 'HTTPS / REST qua Tường lửa NGFW nội bộ',
          securityNote: 'Phân vùng mạng DMZ cách ly, kiểm tra chứng thư số mTLS 1.3',
          latencyEstimate: '< 15 ms',
        },
        {
          stepNumber: 4,
          fromNode: 'agent_node',
          toNode: 'ndop',
          actionTitle: '4. Ký số HSM & Truyền tải TSLCD',
          description: 'Agent Node áp dụng chữ ký số phần cứng HSM C12, mã hóa gói tin và truyền qua Mạng truyền số liệu chuyên dùng (TSLCD) ≥10Gbps về Trục NDOP quốc gia.',
          protocol: 'Chuyên dụng bảo mật C12 qua mạng TSLCD riêng',
          securityNote: 'Mã hóa đường truyền IPsec kênh riêng, hoàn toàn cách ly Internet',
          latencyEstimate: '< 10 ms',
        },
        {
          stepNumber: 5,
          fromNode: 'ndop',
          toNode: 'ndc',
          actionTitle: '5. Phân luồng & Cập nhật CSDL Quốc gia',
          description: 'NDOP xác thực phiên, đối chiếu phân quyền RBAC và nạp dữ liệu vào Cụm 03 Trung tâm Dữ liệu quốc gia (NDC 1, 2, 3) kiến trúc Active-Active.',
          protocol: 'Internal High-Speed Bus (NDC Cluster)',
          securityNote: 'Ghi Audit Log trọn đời, đồng bộ đa vùng thời gian thực',
          latencyEstimate: '< 30 ms',
        },
      ],
    },
    sync_push: {
      title: 'Kịch bản 1: Đồng bộ dữ liệu Doanh nghiệp / Hộ tịch lên CSDL Quốc gia (Push Sync)',
      subtitle: 'Quy trình đẩy dữ liệu mới phát sinh tại địa phương (Sở KH&ĐT, Sở Tư pháp) lên CSDL Quốc gia theo Phụ lục 4 CV 4856',
      steps: [
        {
          stepNumber: 1,
          fromNode: 'dept_sokhdt',
          toNode: 'ldop',
          actionTitle: '1. Tiếp nhận hồ sơ ĐKKD hợp lệ',
          description: 'Cán bộ Sở KH&ĐT phê duyệt Giấy chứng nhận đăng ký doanh nghiệp trên phần mềm Một cửa chuyên ngành.',
          protocol: 'POST /api/v1/enterprises/register',
          securityNote: 'Ký số cá nhân/cơ quan của Sở KH&ĐT trên văn bản điện tử',
          latencyEstimate: '< 25 ms',
        },
        {
          stepNumber: 2,
          fromNode: 'ldop',
          toNode: 'provincial_store',
          actionTitle: '2. Kiểm định chuẩn DQI & Ghi nhận Kho Tỉnh',
          description: 'LDOP nạp vào Kho Dữ liệu tỉnh; kiểm tra Regex Mã số doanh nghiệp (10-13 số) và CCCD đại diện pháp luật (12 số). Đạt 100% mới cho phép gửi tiếp.',
          protocol: 'SQL Insert & Data Quality Validation Job',
          securityNote: 'Chặn đứng dữ liệu rác/thiếu trường ngay tại nguồn',
          latencyEstimate: '< 40 ms',
        },
        {
          stepNumber: 3,
          fromNode: 'ldop',
          toNode: 'agent_node',
          actionTitle: '3. Đóng gói bảo mật vào Agent Node',
          description: 'LDOP đẩy payload JSON đã làm sạch qua Agent Node tại phân vùng DMZ với mã giao dịch duy nhất (Transaction ID).',
          protocol: 'mTLS Client Authentication',
          securityNote: 'Chứng thư số chuyên biệt được C12 cấp riêng cho tỉnh',
          latencyEstimate: '< 10 ms',
        },
        {
          stepNumber: 4,
          fromNode: 'agent_node',
          toNode: 'ndop',
          actionTitle: '4. Đẩy gói tin qua kênh TSLCD về NDOP',
          description: 'Agent Node ký số HSM, truyền qua mạng cáp quang chuyên dùng TSLCD về cụm máy chủ NDOP tại Trung tâm Dữ liệu quốc gia.',
          protocol: 'Encrypted Tunnel (IPsec / Dedicated Leased Line)',
          securityNote: 'Kiểm tra chống phát lại (Anti-Replay Attack)',
          latencyEstimate: '< 12 ms',
        },
        {
          stepNumber: 5,
          fromNode: 'ndop',
          toNode: 'ndc',
          actionTitle: '5. Cập nhật CSDL Quốc gia về Đăng ký Doanh nghiệp',
          description: 'NDOP nạp bản ghi vào CSDL Quốc gia, phát sinh thông báo thành công (ACK) gửi ngược về Sở KH&ĐT tỉnh.',
          protocol: 'Distributed ACID Transaction Commit',
          securityNote: 'Lưu trữ bất biến, phân quyền các Bộ/ngành khác khai thác',
          latencyEstimate: '< 35 ms',
        },
      ],
    },
    verify_pull: {
      title: 'Kịch bản 2: Tra cứu xác thực thời gian thực phục vụ Một cửa / Cổng DVC (Real-time Query)',
      subtitle: 'Quy trình cán bộ Một cửa hoặc Cổng DVC tra cứu CSDL Dân cư, Doanh nghiệp để giải quyết TTHC mà không bắt công dân nộp lại giấy tờ',
      steps: [
        {
          stepNumber: 1,
          fromNode: 'mot_cua',
          toNode: 'ldop',
          actionTitle: '1. Gửi yêu cầu xác thực công dân / doanh nghiệp',
          description: 'Cán bộ Một cửa tiếp nhận hồ sơ, hệ thống tự động quét mã QR trên CCCD hoặc nhập Mã số doanh nghiệp gửi yêu cầu tra cứu.',
          protocol: 'GET /api/v1/identity/verify?cccd=00120000xxxx',
          securityNote: 'Gắn kèm Token cán bộ Một cửa và Mã hồ sơ thủ tục hành chính',
          latencyEstimate: '< 15 ms',
        },
        {
          stepNumber: 2,
          fromNode: 'ldop',
          toNode: 'agent_node',
          actionTitle: '2. Định tuyến qua Agent Node DMZ',
          description: 'LDOP xác thực thẩm quyền tra cứu của đơn vị, lập tức đẩy yêu cầu sang Agent Node để chuẩn bị gửi ra mạng quốc gia.',
          protocol: 'High-speed Proxy Request',
          securityNote: 'Kiểm soát hạn mức truy vấn (Rate Limiting) tránh spam',
          latencyEstimate: '< 8 ms',
        },
        {
          stepNumber: 3,
          fromNode: 'agent_node',
          toNode: 'ndop',
          actionTitle: '3. Truy vấn Trục NDOP (Loại 1 - Khai thác tự động)',
          description: 'Agent Node truyền yêu cầu qua kênh TSLCD về NDOP. NDOP kiểm tra danh mục dữ liệu chia sẻ bắt buộc theo Nghị định 278, cho phép truy xuất tự động.',
          protocol: 'mTLS REST Query',
          securityNote: 'Xác thực chữ ký số Agent Node tỉnh trong micro-giây',
          latencyEstimate: '< 15 ms',
        },
        {
          stepNumber: 4,
          fromNode: 'ndop',
          toNode: 'ndc',
          actionTitle: '4. Đọc dữ liệu từ CSDL Quốc gia về Dân cư / Doanh nghiệp',
          description: 'Hệ thống tra cứu chỉ mục trong NDC, trích xuất các trường thông tin hợp pháp (Họ tên, ngày sinh, nơi thường trú, tình trạng pháp lý).',
          protocol: 'Sub-millisecond In-Memory Cache & DB Query',
          securityNote: 'Che giấu các trường dữ liệu nhạy cảm theo Luật 91/2025/QH15',
          latencyEstimate: '< 20 ms',
        },
        {
          stepNumber: 5,
          fromNode: 'ndop',
          toNode: 'mot_cua',
          actionTitle: '5. Trả kết quả về giao diện Một cửa (< 0.2s)',
          description: 'Dữ liệu xác thực đi ngược qua NDOP -> Agent Node -> LDOP hiển thị trực tiếp lên màn hình Một cửa; cán bộ bấm duyệt ngay không cần giấy tờ giấy.',
          protocol: 'Secure JSON Response Payload',
          securityNote: 'Ghi log giao dịch: Cán bộ nào tra cứu, mục đích gì, thời gian nào',
          latencyEstimate: '< 40 ms',
        },
      ],
    },
    iot_stream: {
      title: 'Kịch bản 3: Luồng Dữ liệu IoT & Phân tích Chỉ đạo điều hành IOC (Stream & Anonymize)',
      subtitle: 'Quy trình thu thập dữ liệu cảm biến/camera giao thông, xử lý biên Edge, nạp Kho IOC phục vụ Chủ tịch UBND tỉnh chỉ đạo điều hành',
      steps: [
        {
          stepNumber: 1,
          fromNode: 'dept_sotc',
          toNode: 'provincial_store',
          actionTitle: '1. Thu thập dữ liệu IoT & Camera tại Hạ tầng biên (Cấp 1)',
          description: 'Camera AI giao thông và cảm biến đô thị xử lý thô tại biên (Edge Computing): nhận diện biển số xe, đếm lưu lượng, cảnh báo tắc đường.',
          protocol: 'RTSP / MQTT / Webhook',
          securityNote: 'Không truyền toàn bộ video thô về trung tâm để tiết kiệm băng thông',
          latencyEstimate: '< 100 ms',
        },
        {
          stepNumber: 2,
          fromNode: 'provincial_store',
          toNode: 'provincial_store',
          actionTitle: '2. Lưu kho IoT Tỉnh (Cấp 2) & Ẩn danh hóa bảo vệ DLCN',
          description: 'Dữ liệu sự kiện lưu vào Kho IoT Tỉnh; hệ thống tự động băm/khử nhận dạng thông tin cá nhân (biển số xe, khuôn mặt) theo Luật 91/2025/QH15.',
          protocol: 'Real-time Stream Processing (Flink / Spark)',
          securityNote: 'Bảo vệ quyền riêng tư: Tuyệt đối không đưa dữ liệu cá nhân thô vào IOC',
          latencyEstimate: '< 50 ms',
        },
        {
          stepNumber: 3,
          fromNode: 'provincial_store',
          toNode: 'ldop',
          actionTitle: '3. Nạp vào Data Warehouse / Data Lakehouse IOC',
          description: 'Dữ liệu dẫn xuất, thống kê tổng hợp được đẩy sang Kho IOC để vẽ biểu đồ mật độ giao thông, dự báo xu hướng thời gian thực.',
          protocol: 'Batch / Micro-batch ETL',
          securityNote: 'Chỉ các lãnh đạo và chuyên viên được ủy quyền mới xem được dashboard',
          latencyEstimate: '< 80 ms',
        },
        {
          stepNumber: 4,
          fromNode: 'ldop',
          toNode: 'agent_node',
          actionTitle: '4. Báo cáo tổng hợp số liệu về NDOP (Loại 2)',
          description: 'Báo cáo thống kê kinh tế - xã hội định kỳ được đóng gói qua Agent Node gửi về Bộ Công an và Văn phòng Chính phủ.',
          protocol: 'mTLS Scheduled Sync',
          securityNote: 'Dữ liệu cấp vĩ mô, không chứa thông tin định danh cá nhân',
          latencyEstimate: '< 20 ms',
        },
        {
          stepNumber: 5,
          fromNode: 'agent_node',
          toNode: 'ndc',
          actionTitle: '5. Phục vụ Hệ thống Thông tin Chỉ đạo điều hành Quốc gia',
          description: 'Số liệu tỉnh hòa vào bức tranh tổng thể kinh tế - xã hội toàn quốc trên Dashboard của Thủ tướng Chính phủ và các Bộ ngành.',
          protocol: 'National Data Aggregation Bus',
          securityNote: 'Lưu trữ dự phòng, phục vụ hoạch định chính sách vĩ mô',
          latencyEstimate: '< 50 ms',
        },
      ],
    },
  };

  const currentScenario = scenarioData[selectedScenario];
  const activeStep = currentScenario.steps[activeStepIndex] || currentScenario.steps[0];
  const selectedNode = selectedNodeId ? nodes[selectedNodeId] : null;

  const handleNextStep = () => {
    setActiveStepIndex((prev) => (prev + 1) % currentScenario.steps.length);
  };

  const handlePrevStep = () => {
    setActiveStepIndex((prev) => (prev - 1 + currentScenario.steps.length) % currentScenario.steps.length);
  };

  const handleReset = () => {
    setActiveStepIndex(0);
    setIsPlaying(false);
  };

  // Helper to check if a node is currently active in the step
  const isNodeActiveInStep = (nodeId: string) => {
    return activeStep.fromNode === nodeId || activeStep.toNode === nodeId;
  };

  return (
    <div id="data-flow-architecture-diagram" className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 shadow-sm space-y-6">
      {/* Header & Scenario Selector */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-semibold">
            <Workflow className="w-3.5 h-3.5" />
            <span>Sơ đồ Động Kiến trúc &amp; Luồng Dữ liệu Liên thông</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            Luồng dữ liệu giữa Hệ thống Địa phương &amp; Nền tảng NDOP / LDOP
          </h3>
          <p className="text-xs text-slate-500 max-w-3xl">
            Trực quan hóa cấu trúc truyền dẫn, cơ chế bảo mật DMZ Agent Node và kiểm định chất lượng dữ liệu DQI theo Nghị định 278/2025/NĐ-CP &amp; Công văn 4856/BCA-TTDLQG.
          </p>
        </div>

        {/* Scenario Tabs */}
        <div className="flex flex-wrap gap-1.5 p-1 bg-slate-100 rounded-xl">
          <button
            onClick={() => { setSelectedScenario('overview'); setActiveStepIndex(0); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              selectedScenario === 'overview' 
                ? 'bg-white text-indigo-900 shadow-sm' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Toàn cảnh Đa tầng
          </button>
          <button
            onClick={() => { setSelectedScenario('sync_push'); setActiveStepIndex(0); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              selectedScenario === 'sync_push' 
                ? 'bg-emerald-600 text-white shadow-sm' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Kịch bản 1: Đồng bộ (Push)
          </button>
          <button
            onClick={() => { setSelectedScenario('verify_pull'); setActiveStepIndex(0); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              selectedScenario === 'verify_pull' 
                ? 'bg-blue-600 text-white shadow-sm' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Kịch bản 2: Tra cứu (Pull)
          </button>
          <button
            onClick={() => { setSelectedScenario('iot_stream'); setActiveStepIndex(0); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              selectedScenario === 'iot_stream' 
                ? 'bg-purple-600 text-white shadow-sm' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Kịch bản 3: IoT &amp; IOC
          </button>
        </div>
      </div>

      {/* Interactive Step Playback Controller Banner */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border border-indigo-900/50 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-indigo-900/60">
          <div>
            <div className="text-[11px] font-mono text-indigo-300 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Đang mô phỏng bước {activeStep.stepNumber} / {currentScenario.steps.length}: {activeStep.actionTitle}
            </div>
            <div className="text-sm font-bold text-white mt-0.5">
              {currentScenario.title}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevStep}
              className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium border border-slate-700 flex items-center gap-1 text-slate-300"
            >
              Bước trước
            </button>
            <button
              onClick={handleNextStep}
              className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white shadow-sm flex items-center gap-1"
            >
              <span>Bước tiếp theo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleReset}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700"
              title="Khởi động lại bước đầu"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Current Step Description & Meta Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-3 text-xs">
          <div className="md:col-span-2 space-y-1">
            <div className="text-slate-200 leading-relaxed">
              {activeStep.description}
            </div>
            <div className="text-[11px] text-amber-300 flex items-center gap-1.5 pt-0.5">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span><strong>Cơ chế an toàn:</strong> {activeStep.securityNote}</span>
            </div>
          </div>
          <div className="bg-slate-800/80 rounded-lg p-2.5 border border-slate-700/80 space-y-1 text-[11px]">
            <div className="flex justify-between text-slate-300">
              <span className="text-slate-400">Giao thức:</span>
              <span className="font-mono text-indigo-300 font-semibold">{activeStep.protocol}</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span className="text-slate-400">Độ trễ ước tính:</span>
              <span className="font-mono text-emerald-400 font-bold">{activeStep.latencyEstimate}</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span className="text-slate-400">Luồng:</span>
              <span className="font-medium text-amber-200">{nodes[activeStep.fromNode]?.shortCode} ➔ {nodes[activeStep.toNode]?.shortCode}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Diagram Canvas */}
      <div className="space-y-4">
        <div className="text-xs text-slate-500 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-indigo-600 ring-4 ring-indigo-100" />
            <span className="font-medium text-slate-700">Nhấp vào bất kỳ khối nào bên dưới để xem đặc tả kỹ thuật chuyên sâu</span>
          </div>
          <div className="hidden sm:flex items-center gap-3 text-[11px] text-slate-500">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500" /> Vùng Địa phương</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500" /> Nền tảng Tỉnh LDOP</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-rose-500" /> Vùng biên DMZ (Agent Node C12)</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Trục NDOP &amp; NDC</span>
          </div>
        </div>

        {/* 5-Zone Interactive Flow Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-stretch">
          {/* ZONE 1: HỆ THỐNG ĐỊA PHƯƠNG (3 Cols) */}
          <div className="lg:col-span-3 bg-amber-50/40 rounded-xl p-3.5 border-2 border-amber-200/80 flex flex-col justify-between space-y-3">
            <div className="border-b border-amber-200 pb-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                Tầng 1 • Cấp Tỉnh &amp; Xã
              </span>
              <h4 className="text-xs font-bold text-slate-900 mt-1">Hệ thống Nghiệp vụ Sở Ngành</h4>
              <p className="text-[10px] text-slate-500">Nguồn khởi tạo dữ liệu nghiệp vụ</p>
            </div>

            <div className="space-y-2">
              {/* Node: Sở KH&ĐT */}
              <button
                type="button"
                onClick={() => setSelectedNodeId('dept_sokhdt')}
                className={`w-full p-2.5 rounded-lg text-left transition-all border ${
                  selectedNodeId === 'dept_sokhdt'
                    ? 'bg-amber-100 border-amber-500 ring-2 ring-amber-400 shadow-sm'
                    : isNodeActiveInStep('dept_sokhdt')
                    ? 'bg-white border-amber-400 ring-2 ring-indigo-400 shadow-md animate-pulse'
                    : 'bg-white hover:bg-amber-50/60 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900">
                    <Building2 className="w-3.5 h-3.5 text-amber-600" />
                    <span>Sở Kế hoạch &amp; Đầu tư</span>
                  </div>
                  {isNodeActiveInStep('dept_sokhdt') && (
                    <span className="w-2 h-2 rounded-full bg-indigo-600 animate-ping" />
                  )}
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">CSDL Doanh nghiệp, Hộ KD, Đầu tư</div>
              </button>

              {/* Node: Sở Tài chính */}
              <button
                type="button"
                onClick={() => setSelectedNodeId('dept_sotc')}
                className={`w-full p-2.5 rounded-lg text-left transition-all border ${
                  selectedNodeId === 'dept_sotc'
                    ? 'bg-amber-100 border-amber-500 ring-2 ring-amber-400 shadow-sm'
                    : isNodeActiveInStep('dept_sotc')
                    ? 'bg-white border-amber-400 ring-2 ring-indigo-400 shadow-md animate-pulse'
                    : 'bg-white hover:bg-amber-50/60 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900">
                    <Building2 className="w-3.5 h-3.5 text-amber-600" />
                    <span>Sở Tài chính</span>
                  </div>
                  {isNodeActiveInStep('dept_sotc') && (
                    <span className="w-2 h-2 rounded-full bg-indigo-600 animate-ping" />
                  )}
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">CSDL Ngân sách, Tài sản công, Thuế</div>
              </button>

              {/* Node: Sở Tư pháp */}
              <button
                type="button"
                onClick={() => setSelectedNodeId('dept_sotp')}
                className={`w-full p-2.5 rounded-lg text-left transition-all border ${
                  selectedNodeId === 'dept_sotp'
                    ? 'bg-amber-100 border-amber-500 ring-2 ring-amber-400 shadow-sm'
                    : isNodeActiveInStep('dept_sotp')
                    ? 'bg-white border-amber-400 ring-2 ring-indigo-400 shadow-md animate-pulse'
                    : 'bg-white hover:bg-amber-50/60 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900">
                    <Building2 className="w-3.5 h-3.5 text-amber-600" />
                    <span>Sở Tư pháp &amp; Cấp Xã</span>
                  </div>
                  {isNodeActiveInStep('dept_sotp') && (
                    <span className="w-2 h-2 rounded-full bg-indigo-600 animate-ping" />
                  )}
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">CSDL Hộ tịch điện tử, Khai sinh, Kết hôn</div>
              </button>

              {/* Node: Một cửa & DVC */}
              <button
                type="button"
                onClick={() => setSelectedNodeId('mot_cua')}
                className={`w-full p-2.5 rounded-lg text-left transition-all border ${
                  selectedNodeId === 'mot_cua'
                    ? 'bg-amber-100 border-amber-500 ring-2 ring-amber-400 shadow-sm'
                    : isNodeActiveInStep('mot_cua')
                    ? 'bg-white border-amber-400 ring-2 ring-indigo-400 shadow-md animate-pulse'
                    : 'bg-white hover:bg-amber-50/60 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900">
                    <Building2 className="w-3.5 h-3.5 text-amber-600" />
                    <span>Một cửa &amp; Cổng DVC Tỉnh</span>
                  </div>
                  {isNodeActiveInStep('mot_cua') && (
                    <span className="w-2 h-2 rounded-full bg-indigo-600 animate-ping" />
                  )}
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">Tra cứu tức thời, không nộp lại giấy tờ</div>
              </button>
            </div>

            <div className="text-[10px] text-amber-900/80 bg-amber-100/70 p-2 rounded text-center font-mono">
              Mạng LAN/WAN Tỉnh • mTLS Nội bộ
            </div>
          </div>

          {/* ZONE 2: NỀN TẢNG DỮ LIỆU TỈNH (3 Cols) */}
          <div className="lg:col-span-3 bg-blue-50/40 rounded-xl p-3.5 border-2 border-blue-200/80 flex flex-col justify-between space-y-3">
            <div className="border-b border-blue-200 pb-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-800 bg-blue-100 px-2 py-0.5 rounded">
                Tầng 2 • Trục Tỉnh (LDOP)
              </span>
              <h4 className="text-xs font-bold text-slate-900 mt-1">Nền tảng Chia sẻ &amp; Kho Tỉnh</h4>
              <p className="text-[10px] text-slate-500">Điều phối nội bộ &amp; Kiểm soát DQI</p>
            </div>

            <div className="space-y-2.5">
              {/* Node: Trục LDOP */}
              <button
                type="button"
                onClick={() => setSelectedNodeId('ldop')}
                className={`w-full p-3 rounded-xl text-left transition-all border ${
                  selectedNodeId === 'ldop'
                    ? 'bg-blue-100 border-blue-600 ring-2 ring-blue-400 shadow-sm'
                    : isNodeActiveInStep('ldop')
                    ? 'bg-white border-blue-500 ring-2 ring-indigo-400 shadow-md animate-pulse'
                    : 'bg-white hover:bg-blue-50/60 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-bold text-xs text-blue-900">
                    <Layers className="w-4 h-4 text-blue-600" />
                    <span>Nền tảng Tỉnh (LDOP)</span>
                  </div>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-blue-200 text-blue-800">LGSP+</span>
                </div>
                <div className="text-[11px] text-slate-600 mt-1">
                  API Gateway, ESB định tuyến, điều phối dữ liệu duy nhất toàn tỉnh
                </div>
              </button>

              {/* Node: Kho Dữ liệu tỉnh */}
              <button
                type="button"
                onClick={() => setSelectedNodeId('provincial_store')}
                className={`w-full p-3 rounded-xl text-left transition-all border ${
                  selectedNodeId === 'provincial_store'
                    ? 'bg-blue-100 border-blue-600 ring-2 ring-blue-400 shadow-sm'
                    : isNodeActiveInStep('provincial_store')
                    ? 'bg-white border-blue-500 ring-2 ring-indigo-400 shadow-md animate-pulse'
                    : 'bg-white hover:bg-blue-50/60 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-bold text-xs text-indigo-900">
                    <Database className="w-4 h-4 text-indigo-600" />
                    <span>Kho Dữ liệu &amp; Bộ phận DQI</span>
                  </div>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800">DQI 100%</span>
                </div>
                <div className="text-[11px] text-slate-600 mt-1">
                  Kho 06 miền logic, Kho IoT 3 cấp, Kho IOC, rà soát chất lượng dữ liệu
                </div>
              </button>
            </div>

            <div className="text-[10px] text-blue-900/80 bg-blue-100/70 p-2 rounded text-center font-mono">
              Next-Gen Firewall • Kiểm tra DQI
            </div>
          </div>

          {/* ZONE 3: VÙNG BIÊN DMZ & AGENT NODE (2 Cols) */}
          <div className="lg:col-span-2 bg-rose-50/50 rounded-xl p-3.5 border-2 border-rose-300 flex flex-col justify-between space-y-3 ring-1 ring-rose-300">
            <div className="border-b border-rose-200 pb-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-rose-800 bg-rose-100 px-2 py-0.5 rounded">
                Tầng 3 • Vùng Biên DMZ
              </span>
              <h4 className="text-xs font-bold text-rose-950 mt-1">Máy chủ Bảo mật</h4>
              <p className="text-[10px] text-rose-600">Điểm chốt an ninh C12</p>
            </div>

            <div className="my-auto space-y-2">
              <button
                type="button"
                onClick={() => setSelectedNodeId('agent_node')}
                className={`w-full p-3 rounded-xl text-left transition-all border ${
                  selectedNodeId === 'agent_node'
                    ? 'bg-rose-100 border-rose-600 ring-2 ring-rose-400 shadow-md'
                    : isNodeActiveInStep('agent_node')
                    ? 'bg-white border-rose-500 ring-2 ring-indigo-500 shadow-lg animate-pulse'
                    : 'bg-white hover:bg-rose-50 border-rose-200 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-bold text-xs text-rose-900">
                    <Lock className="w-4 h-4 text-rose-600" />
                    <span>Agent Node</span>
                  </div>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-rose-200 text-rose-900">C12 BCA</span>
                </div>
                <div className="text-[11px] text-slate-700 font-medium mt-1">
                  Máy chủ vật lý biệt lập
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  Ký số HSM, mã hóa mTLS, giám sát 24/7 bởi C12
                </div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedNodeId('tslcd_network')}
                className={`w-full p-2.5 rounded-lg text-left transition-all border ${
                  selectedNodeId === 'tslcd_network'
                    ? 'bg-rose-100 border-rose-500 ring-1 ring-rose-400'
                    : 'bg-white/80 hover:bg-white border-slate-200'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold text-[11px] text-slate-800">
                  <Radio className="w-3.5 h-3.5 text-rose-600" />
                  <span>Mạng TSLCD</span>
                </div>
                <div className="text-[10px] text-slate-500">Cáp quang riêng ≥10Gbps</div>
              </button>
            </div>

            <div className="text-[10px] text-rose-900 bg-rose-100 p-2 rounded text-center font-mono font-semibold">
              Kênh truyền riêng biệt • Chống xâm nhập
            </div>
          </div>

          {/* ZONE 4: TRỤC QUỐC GIA NDOP & NDC (4 Cols) */}
          <div className="lg:col-span-4 bg-emerald-50/40 rounded-xl p-3.5 border-2 border-emerald-200/80 flex flex-col justify-between space-y-3">
            <div className="border-b border-emerald-200 pb-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                Tầng 4 &amp; 5 • Cấp Quốc Gia
              </span>
              <h4 className="text-xs font-bold text-slate-900 mt-1">Trục NDOP &amp; Cụm 03 TTDL Quốc Gia (NDC)</h4>
              <p className="text-[10px] text-slate-500">Bộ Công an vận hành (C12) theo NĐ 278 &amp; NQ 175</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {/* Node: NDOP */}
              <button
                type="button"
                onClick={() => setSelectedNodeId('ndop')}
                className={`p-3 rounded-xl text-left transition-all border ${
                  selectedNodeId === 'ndop'
                    ? 'bg-emerald-100 border-emerald-600 ring-2 ring-emerald-400 shadow-sm'
                    : isNodeActiveInStep('ndop')
                    ? 'bg-white border-emerald-500 ring-2 ring-indigo-400 shadow-md animate-pulse'
                    : 'bg-white hover:bg-emerald-50/60 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 font-bold text-xs text-emerald-900">
                    <Network className="w-4 h-4 text-emerald-600" />
                    <span>Trục NDOP</span>
                  </div>
                  <span className="text-[9px] font-bold px-1 py-0.5 rounded bg-emerald-200 text-emerald-800">QG</span>
                </div>
                <div className="text-[10px] text-slate-600 mt-1">
                  Nền tảng chia sẻ, điều phối dữ liệu quốc gia (Data Router)
                </div>
                <div className="text-[9px] text-emerald-700 font-mono mt-1 font-bold">
                  03 Loại Yêu Cầu Kết Nối
                </div>
              </button>

              {/* Node: NDC */}
              <button
                type="button"
                onClick={() => setSelectedNodeId('ndc')}
                className={`p-3 rounded-xl text-left transition-all border ${
                  selectedNodeId === 'ndc'
                    ? 'bg-emerald-100 border-emerald-600 ring-2 ring-emerald-400 shadow-sm'
                    : isNodeActiveInStep('ndc')
                    ? 'bg-white border-emerald-500 ring-2 ring-indigo-400 shadow-md animate-pulse'
                    : 'bg-white hover:bg-emerald-50/60 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 font-bold text-xs text-emerald-900">
                    <HardDrive className="w-4 h-4 text-emerald-600" />
                    <span>Cụm 03 NDC</span>
                  </div>
                  <span className="text-[9px] font-bold px-1 py-0.5 rounded bg-indigo-100 text-indigo-800">Active-Active</span>
                </div>
                <div className="text-[10px] text-slate-600 mt-1">
                  CSDL Tổng hợp QG, 20 CSDL quốc gia, hạ tầng siêu tính toán AI
                </div>
                <div className="text-[9px] text-slate-500 mt-1">
                  NDC 1, NDC 2, NDC 3
                </div>
              </button>
            </div>

            <div className="text-[10px] text-emerald-900/90 bg-emerald-100/80 p-2 rounded text-center font-mono">
              Audit Log Bất Biến • Cân Bằng Tải Quốc Gia
            </div>
          </div>
        </div>
      </div>

      {/* Selected Node Technical Inspector Drawer */}
      {selectedNode && (
        <div className="bg-slate-900 text-white rounded-xl p-5 border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-indigo-600/30 text-indigo-300 border border-indigo-500/40">
                <selectedNode.icon className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm sm:text-base font-bold text-white tracking-tight">{selectedNode.name}</h4>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                    {selectedNode.shortCode}
                  </span>
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  Cơ quan chủ quản: <span className="text-slate-200 font-medium">{selectedNode.authority}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="px-2.5 py-1 rounded-full bg-slate-800 text-amber-300 border border-slate-700 font-mono text-[11px]">
                {selectedNode.securityLevel}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            {/* Left: Role & Legal */}
            <div className="md:col-span-2 space-y-3">
              <div>
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Chức năng &amp; Vai trò trong Kiến trúc:
                </div>
                <p className="text-slate-300 leading-relaxed text-xs">
                  {selectedNode.roleDescription}
                </p>
              </div>

              <div>
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Nhiệm vụ trọng tâm:
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-slate-300">
                  {selectedNode.keyFunctions.map((fn, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{fn}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700 text-[11px] text-slate-300 flex items-center gap-2">
                <Info className="w-4 h-4 text-indigo-400 shrink-0" />
                <span><strong>Căn cứ pháp lý:</strong> {selectedNode.legalBasis}</span>
              </div>
            </div>

            {/* Right: Tech Stack */}
            <div className="bg-slate-800/60 rounded-xl p-3.5 border border-slate-700/80 space-y-2.5">
              <div className="text-[11px] font-semibold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5" />
                <span>Công nghệ &amp; Giao thức</span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {selectedNode.techStack.map((tech, i) => (
                  <span 
                    key={i} 
                    className="px-2 py-1 rounded bg-slate-700/80 text-slate-200 text-[11px] font-mono border border-slate-600"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="pt-2 border-t border-slate-700/80 space-y-1 text-[11px] text-slate-400">
                <div className="flex justify-between">
                  <span>Phân vùng mạng:</span>
                  <span className="text-slate-200 uppercase font-mono">{selectedNode.zone}</span>
                </div>
                <div className="flex justify-between">
                  <span>Trạng thái kết nối:</span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Sẵn sàng 24/7
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
