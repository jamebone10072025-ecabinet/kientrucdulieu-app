import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { 
  BarChart3, 
  PieChart as PieChartIcon, 
  CheckCircle2, 
  Clock, 
  AlertOctagon, 
  Building2, 
  ShieldCheck, 
  Search, 
  Filter, 
  Sparkles,
  Info,
  RefreshCw,
  Layers,
  FileCheck,
  TrendingUp,
  Cpu,
  MapPin,
  ExternalLink,
  ChevronRight,
  Database,
  Lock
} from 'lucide-react';

export interface DepartmentGroupBreakdown {
  target: number;
  completed: number;
  testing: number;
  pending: number;
  blocked: number;
}

export interface DepartmentIntegrationStat {
  id: string;
  name: string;
  shortName: string;
  sector: 'economy' | 'internal_affairs' | 'social' | 'infrastructure';
  sectorLabel: string;
  allProvinces: DepartmentGroupBreakdown; // 63 provinces
  nhom1: DepartmentGroupBreakdown;        // 8 key cities (HN, HCM, HP, ĐN, CT, Huế, ĐNai, QNinh)
  nhom2: DepartmentGroupBreakdown;        // 55 remaining provinces
  dqiScore: number;                      // %
  avgLatencyMs: number;
  dailyTransactions: string;
  primaryDomain: string;
  ndopProtocol: string;                  // REST / gRPC / Kafka
  agentNodeStatus: 'active' | 'configuring' | 'pending';
  legalMandate: string;
  responsibleLead: string;
  highlightNote: string;
  sampleAPIs: string[];
}

export const DEPARTMENT_INTEGRATION_DATA: DepartmentIntegrationStat[] = [
  {
    id: 'sokhdt',
    name: 'Sở Tài chính (Đăng ký Doanh nghiệp & Đầu tư)',
    shortName: 'Sở Tài chính (ĐKKD)',
    sector: 'economy',
    sectorLabel: 'Kinh tế & Đầu tư',
    allProvinces: { target: 63, completed: 54, testing: 6, pending: 2, blocked: 1 },
    nhom1: { target: 8, completed: 8, testing: 0, pending: 0, blocked: 0 },
    nhom2: { target: 55, completed: 46, testing: 6, pending: 2, blocked: 1 },
    dqiScore: 98.6,
    avgLatencyMs: 14.2,
    dailyTransactions: '4.8M',
    primaryDomain: 'DOM-ORG (Miền Tổ chức)',
    ndopProtocol: 'REST API & Kafka Stream qua Agent Node',
    agentNodeStatus: 'active',
    legalMandate: 'Nghị định 45/2025/NĐ-CP, Quyết định 2439/QĐ-TTg & Luật Doanh nghiệp',
    responsibleLead: 'Sở Tài chính (Bộ phận ĐKKD theo mô hình chính quyền 02 cấp) chủ trì CSDL Đăng ký doanh nghiệp, Hộ kinh doanh, Đầu tư',
    highlightNote: 'Tiếp nhận toàn bộ chức năng kế hoạch, đầu tư và ĐKKD theo Nghị định 45/2025/NĐ-CP, bảo lưu mã số doanh nghiệp lịch sử và bảng ánh xạ ĐVHC.',
    sampleAPIs: [
      'GET /ndop/v1/org/business-registry/{taxCode}',
      'POST /ndop/v1/org/investment-projects/sync',
      'GET /ndop/v1/org/household-business/validate'
    ]
  },
  {
    id: 'congan',
    name: 'Công an Tỉnh / Thành phố (QLHC & Đề án 06)',
    shortName: 'Công an Tỉnh',
    sector: 'internal_affairs',
    sectorLabel: 'Nội chính & An ninh',
    allProvinces: { target: 63, completed: 62, testing: 1, pending: 0, blocked: 0 },
    nhom1: { target: 8, completed: 8, testing: 0, pending: 0, blocked: 0 },
    nhom2: { target: 55, completed: 54, testing: 1, pending: 0, blocked: 0 },
    dqiScore: 99.8,
    avgLatencyMs: 8.5,
    dailyTransactions: '14.2M',
    primaryDomain: 'DOM-HUMAN (Miền Con người)',
    ndopProtocol: 'gRPC mTLS 1.3 qua Kênh TSLCD & HSM C12',
    agentNodeStatus: 'active',
    legalMandate: 'Đề án 06/CP, Luật Căn cước 2023 & Quyết định 11/2026/QĐ-TTg',
    responsibleLead: 'Công an tỉnh chủ trì CSDL Dân cư, Định danh VNeID và điều phối Bộ phận Tuân thủ',
    highlightNote: 'Đạt ngưỡng DQI 100% bắt buộc đối với Số định danh cá nhân (Số ĐDCN) theo QĐ 2439.',
    sampleAPIs: [
      'POST /ndop/v1/citizen/verify-identity (CCCD + Sinh trắc)',
      'GET /ndop/v1/citizen/vneid-profile/{citizenId}',
      'POST /ndop/v1/compliance/audit-log/stream'
    ]
  },
  {
    id: 'sotaichinh',
    name: 'Sở Tài chính & Cục Thuế tỉnh',
    shortName: 'Sở Tài chính',
    sector: 'economy',
    sectorLabel: 'Kinh tế & Tài chính',
    allProvinces: { target: 63, completed: 49, testing: 8, pending: 4, blocked: 2 },
    nhom1: { target: 8, completed: 7, testing: 1, pending: 0, blocked: 0 },
    nhom2: { target: 55, completed: 42, testing: 7, pending: 4, blocked: 2 },
    dqiScore: 94.2,
    avgLatencyMs: 16.8,
    dailyTransactions: '3.6M',
    primaryDomain: 'DOM-ASSET (Miền Tài sản)',
    ndopProtocol: 'REST API & Batch ISO 20022 Sync',
    agentNodeStatus: 'active',
    legalMandate: 'Luật Ngân sách Nhà nước & Quyết định 2439/QĐ-TTg',
    responsibleLead: 'Sở Tài chính chủ trì CSDL Ngân sách, Tài sản công, liên thông số liệu Thuế điện tử',
    highlightNote: 'Chuẩn hóa danh mục mã định danh tài sản công cấp tỉnh theo kiến trúc DOM-ASSET.',
    sampleAPIs: [
      'GET /ndop/v1/finance/public-assets/{assetId}',
      'POST /ndop/v1/finance/budget-execution/daily-sync',
      'GET /ndop/v1/tax/obligation-status/{taxCode}'
    ]
  },
  {
    id: 'sotuphap',
    name: 'Sở Tư pháp & Bộ phận Hộ tịch cấp xã',
    shortName: 'Sở Tư pháp',
    sector: 'internal_affairs',
    sectorLabel: 'Nội chính & Tư pháp',
    allProvinces: { target: 63, completed: 57, testing: 4, pending: 2, blocked: 0 },
    nhom1: { target: 8, completed: 8, testing: 0, pending: 0, blocked: 0 },
    nhom2: { target: 55, completed: 49, testing: 4, pending: 2, blocked: 0 },
    dqiScore: 97.4,
    avgLatencyMs: 12.1,
    dailyTransactions: '2.5M',
    primaryDomain: 'DOM-HUMAN (Miền Con người)',
    ndopProtocol: 'REST API ký số token CA Chuyên dùng',
    agentNodeStatus: 'active',
    legalMandate: 'Luật Hộ tịch & Nghị định 278/2025/NĐ-CP',
    responsibleLead: 'Sở Tư pháp quản lý phần mềm Đăng ký hộ tịch điện tử và Lý lịch tư pháp trực tuyến',
    highlightNote: 'Tự động cấp Số ĐDCN khi đăng ký khai sinh trong 0,5 giây từ cấp xã lên CSDL Quốc gia.',
    sampleAPIs: [
      'POST /ndop/v1/vital/birth-registration/issue-id',
      'GET /ndop/v1/vital/marital-status/{citizenId}',
      'POST /ndop/v1/judicial/criminal-record/request'
    ]
  },
  {
    id: 'sotnmt',
    name: 'Sở Tài nguyên và Môi trường (Đất đai)',
    shortName: 'Sở TN&MT',
    sector: 'infrastructure',
    sectorLabel: 'Kỹ thuật & Đất đai',
    allProvinces: { target: 63, completed: 38, testing: 14, pending: 7, blocked: 4 },
    nhom1: { target: 8, completed: 6, testing: 2, pending: 0, blocked: 0 },
    nhom2: { target: 55, completed: 32, testing: 12, pending: 7, blocked: 4 },
    dqiScore: 88.5,
    avgLatencyMs: 24.5,
    dailyTransactions: '1.9M',
    primaryDomain: 'DOM-CADASTRAL & DOM-GEO',
    ndopProtocol: 'OGC WFS/WMS & REST GeoJSON qua Agent Node',
    agentNodeStatus: 'configuring',
    legalMandate: 'Luật Đất đai 2024 & Quyết định 2439/QĐ-TTg',
    responsibleLead: 'Sở TN&MT quản trị CSDL Đất đai (VBDLIS), bản đồ địa chính và thông tin thửa đất',
    highlightNote: 'Đang chuẩn hóa, khử trùng lặp dữ liệu thửa đất lịch sử và liên thông nghĩa vụ tài chính đất đai với cơ quan Thuế.',
    sampleAPIs: [
      'GET /ndop/v1/land/cadastral-parcel/{parcelCode}',
      'POST /ndop/v1/land/tax-obligation/notify',
      'GET /ndop/v1/geo/spatial-boundary/{provinceCode}'
    ]
  },
  {
    id: 'soyte',
    name: 'Sở Y tế (Bệnh viện & Hồ sơ Sức khỏe)',
    shortName: 'Sở Y tế',
    sector: 'social',
    sectorLabel: 'Xã hội & Y tế',
    allProvinces: { target: 63, completed: 46, testing: 10, pending: 5, blocked: 2 },
    nhom1: { target: 8, completed: 8, testing: 0, pending: 0, blocked: 0 },
    nhom2: { target: 55, completed: 38, testing: 10, pending: 5, blocked: 2 },
    dqiScore: 92.3,
    avgLatencyMs: 17.5,
    dailyTransactions: '4.2M',
    primaryDomain: 'DOM-HUMAN & CSDL Y tế',
    ndopProtocol: 'HL7 FHIR v4.0 & REST API',
    agentNodeStatus: 'active',
    legalMandate: 'Quyết định 11/2026/QĐ-TTg & Đề án 06/CP',
    responsibleLead: 'Sở Y tế kết nối Hồ sơ sức khỏe điện tử (Sổ SKĐT VNeID), cấp phép hành nghề Y-Dược',
    highlightNote: 'Khám chữa bệnh BHYT bằng thẻ Căn cước/CCCD và đồng bộ dữ liệu giấy chứng sinh, giấy báo tử điện tử.',
    sampleAPIs: [
      'POST /ndop/v1/health/ehr/sync-summary',
      'GET /ndop/v1/health/practitioner-license/{licenseId}',
      'POST /ndop/v1/vital/birth-death-certificate'
    ]
  },
  {
    id: 'sogddt',
    name: 'Sở Giáo dục và Đào tạo (Văn bằng & Học bạ)',
    shortName: 'Sở GD&ĐT',
    sector: 'social',
    sectorLabel: 'Xã hội & Giáo dục',
    allProvinces: { target: 63, completed: 49, testing: 8, pending: 4, blocked: 2 },
    nhom1: { target: 8, completed: 8, testing: 0, pending: 0, blocked: 0 },
    nhom2: { target: 55, completed: 41, testing: 8, pending: 4, blocked: 2 },
    dqiScore: 93.8,
    avgLatencyMs: 15.1,
    dailyTransactions: '1.6M',
    primaryDomain: 'CSDL Ngành GD&ĐT (DOM-HUMAN)',
    ndopProtocol: 'REST API & Batch Verified Credential (W3C)',
    agentNodeStatus: 'active',
    legalMandate: 'Quyết định 2439/QĐ-TTg & Kế hoạch Chuyển đổi số Quốc gia',
    responsibleLead: 'Sở GD&ĐT quản trị CSDL Trường - Lớp - Học sinh, Học bạ số và Văn bằng chứng chỉ',
    highlightNote: 'Xác thực văn bằng, chứng chỉ tốt nghiệp phục vụ tiếp nhận hồ sơ Một cửa, không yêu cầu nộp bản sao chứng thực.',
    sampleAPIs: [
      'GET /ndop/v1/edu/diploma-verification/{serialNumber}',
      'POST /ndop/v1/edu/digital-transcript/sync',
      'GET /ndop/v1/edu/student-status/{studentId}'
    ]
  },
  {
    id: 'soxaydung_gtvt',
    name: 'Sở Giao thông Vận tải & Sở Xây dựng',
    shortName: 'Sở GTVT & Xây dựng',
    sector: 'infrastructure',
    sectorLabel: 'Kỹ thuật & Hạ tầng',
    allProvinces: { target: 63, completed: 43, testing: 11, pending: 6, blocked: 3 },
    nhom1: { target: 8, completed: 7, testing: 1, pending: 0, blocked: 0 },
    nhom2: { target: 55, completed: 36, testing: 10, pending: 6, blocked: 3 },
    dqiScore: 90.1,
    avgLatencyMs: 19.3,
    dailyTransactions: '3.1M',
    primaryDomain: 'DOM-GEO & CSDL GTVT',
    ndopProtocol: 'REST API & Webhook Thông báo',
    agentNodeStatus: 'active',
    legalMandate: 'Nghị định 278/2025/NĐ-CP & Luật Trật tự, an toàn giao thông đường bộ 2024',
    responsibleLead: 'Sở GTVT & Sở Xây dựng quản trị CSDL Giấy phép lái xe, Đăng kiểm phương tiện, Quy hoạch xây dựng đô thị',
    highlightNote: 'Liên thông Giấy phép lái xe tích hợp trên ứng dụng VNeID và chia sẻ dữ liệu xử lý vi phạm giao thông ("phạt nguội").',
    sampleAPIs: [
      'GET /ndop/v1/transport/driver-license/{licenseNo}',
      'POST /ndop/v1/urban/planning-permit/sync',
      'GET /ndop/v1/transport/vehicle-inspection/{plateNo}'
    ]
  },
  {
    id: 'mot_cua_hcc',
    name: 'Trung tâm Phục vụ Hành chính công / Một cửa',
    shortName: 'Một cửa & Cổng DVC',
    sector: 'internal_affairs',
    sectorLabel: 'Hành chính công',
    allProvinces: { target: 63, completed: 61, testing: 2, pending: 0, blocked: 0 },
    nhom1: { target: 8, completed: 8, testing: 0, pending: 0, blocked: 0 },
    nhom2: { target: 55, completed: 53, testing: 2, pending: 0, blocked: 0 },
    dqiScore: 99.4,
    avgLatencyMs: 9.2,
    dailyTransactions: '9.8M',
    primaryDomain: 'Hệ thống TTHC Tỉnh (Trục LDOP)',
    ndopProtocol: 'REST OpenAPI 3.0 & SAML 2.0 / OpenID Connect',
    agentNodeStatus: 'active',
    legalMandate: 'Nghị định 42/2022/NĐ-CP & Đề án 06/CP',
    responsibleLead: 'Văn phòng UBND tỉnh chỉ đạo, điều phối số hóa hồ sơ TTHC và tái sử dụng kết quả giải quyết',
    highlightNote: '100% thủ tục đủ điều kiện được tra cứu tự động qua Trục NDOP, thực hiện triệt để nguyên tắc không yêu cầu nộp lại giấy tờ đã được số hóa.',
    sampleAPIs: [
      'POST /ndop/v1/public-service/dossier/submit',
      'GET /ndop/v1/public-service/e-result/{resultCode}',
      'POST /ndop/v1/public-service/lookup-reused-data'
    ]
  },
  {
    id: 'bhxh_tinh',
    name: 'Bảo hiểm Xã hội Tỉnh / Thành phố (BHXH)',
    shortName: 'Bảo hiểm Xã hội',
    sector: 'social',
    sectorLabel: 'Xã hội & An sinh',
    allProvinces: { target: 63, completed: 60, testing: 2, pending: 1, blocked: 0 },
    nhom1: { target: 8, completed: 8, testing: 0, pending: 0, blocked: 0 },
    nhom2: { target: 55, completed: 52, testing: 2, pending: 1, blocked: 0 },
    dqiScore: 99.1,
    avgLatencyMs: 10.8,
    dailyTransactions: '7.2M',
    primaryDomain: 'CSDL Quốc gia về Bảo hiểm',
    ndopProtocol: 'REST API & Batch Đối soát TSLCD',
    agentNodeStatus: 'active',
    legalMandate: 'Quyết định 11/2026/QĐ-TTg & Luật BHXH',
    responsibleLead: 'BHXH tỉnh quản lý thông tin tham gia BHXH, BHYT, BHTN liên thông với Số ĐDCN',
    highlightNote: '100% cơ sở khám chữa bệnh thực hiện tra cứu thông tin thẻ BHYT bằng thẻ Căn cước/CCCD hoặc ứng dụng VNeID.',
    sampleAPIs: [
      'GET /ndop/v1/insurance/social-policy/{citizenId}',
      'POST /ndop/v1/insurance/health-claim/validate',
      'GET /ndop/v1/insurance/contribution-history/{ssn}'
    ]
  },
];

export const NationalIntegrationDashboard: React.FC = () => {
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [selectedGroup, setSelectedGroup] = useState<'all' | 'nhom1' | 'nhom2'>('all');
  const [sortBy, setSortBy] = useState<'completed' | 'dqi' | 'name'>('completed');
  const [activeDeptId, setActiveDeptId] = useState<string>('sokhdt');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Chart SVG references & responsive container
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const donutChartRef = useRef<SVGSVGElement | null>(null);
  const barChartRef = useRef<SVGSVGElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>(640);

  // ResizeObserver for responsive D3 charts
  useEffect(() => {
    if (!chartContainerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width > 0) {
          setContainerWidth(entry.contentRect.width);
        }
      }
    });
    observer.observe(chartContainerRef.current);
    return () => observer.disconnect();
  }, []);

  // Helper to extract breakdown based on selectedGroup
  const getDeptBreakdown = (dept: DepartmentIntegrationStat): DepartmentGroupBreakdown => {
    if (selectedGroup === 'nhom1') return dept.nhom1;
    if (selectedGroup === 'nhom2') return dept.nhom2;
    return dept.allProvinces;
  };

  // Filter & sort data
  const filteredData = DEPARTMENT_INTEGRATION_DATA.filter((item) => {
    if (selectedSector !== 'all' && item.sector !== selectedSector) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = item.name.toLowerCase().includes(q) || item.shortName.toLowerCase().includes(q);
      const matchDomain = item.primaryDomain.toLowerCase().includes(q);
      const matchLead = item.responsibleLead.toLowerCase().includes(q);
      if (!matchName && !matchDomain && !matchLead) return false;
    }
    return true;
  }).sort((a, b) => {
    const statA = getDeptBreakdown(a);
    const statB = getDeptBreakdown(b);
    if (sortBy === 'completed') {
      return (statB.completed / statB.target) - (statA.completed / statA.target);
    }
    if (sortBy === 'dqi') {
      return b.dqiScore - a.dqiScore;
    }
    return a.shortName.localeCompare(b.shortName);
  });

  // Calculate National Aggregate Stats based on selected group
  const totalTarget = DEPARTMENT_INTEGRATION_DATA.reduce((acc, cur) => acc + getDeptBreakdown(cur).target, 0);
  const totalCompleted = DEPARTMENT_INTEGRATION_DATA.reduce((acc, cur) => acc + getDeptBreakdown(cur).completed, 0);
  const totalTesting = DEPARTMENT_INTEGRATION_DATA.reduce((acc, cur) => acc + getDeptBreakdown(cur).testing, 0);
  const totalPending = DEPARTMENT_INTEGRATION_DATA.reduce((acc, cur) => acc + getDeptBreakdown(cur).pending, 0);
  const totalBlocked = DEPARTMENT_INTEGRATION_DATA.reduce((acc, cur) => acc + getDeptBreakdown(cur).blocked, 0);
  
  const nationalCompletionRate = totalTarget > 0 ? ((totalCompleted / totalTarget) * 100).toFixed(1) : '0';
  const nationalTestingRate = totalTarget > 0 ? ((totalTesting / totalTarget) * 100).toFixed(1) : '0';
  const nationalPendingRate = totalTarget > 0 ? (((totalPending + totalBlocked) / totalTarget) * 100).toFixed(1) : '0';

  const activeDept = DEPARTMENT_INTEGRATION_DATA.find((d) => d.id === activeDeptId) || filteredData[0] || DEPARTMENT_INTEGRATION_DATA[0];
  const activeBreakdown = getDeptBreakdown(activeDept);

  // Render D3 Donut Chart
  useEffect(() => {
    if (!donutChartRef.current) return;

    const svg = d3.select(donutChartRef.current);
    svg.selectAll('*').remove();

    const width = 280;
    const height = 280;
    const margin = 10;
    const radius = Math.min(width, height) / 2 - margin;
    const innerRadius = radius * 0.65;

    const g = svg
      .attr('viewBox', `0 0 ${width} ${height}`)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    const donutData = [
      { label: 'Đã hoàn thành đồng bộ', value: totalCompleted, color: '#10b981' }, // Emerald
      { label: 'Đang kiểm thử DQI / Nghiệm thu', value: totalTesting, color: '#3b82f6' }, // Blue
      { label: 'Đang chuẩn bị hồ sơ / Chờ kết nối', value: totalPending, color: '#f59e0b' }, // Amber
      { label: 'Vướng mắc kỹ thuật / Pháp lý', value: totalBlocked, color: '#f43f5e' }, // Rose
    ];

    const pie = d3
      .pie<{ label: string; value: number; color: string }>()
      .value((d) => d.value)
      .sort(null)
      .padAngle(0.025);

    const arc = d3
      .arc<d3.PieArcDatum<{ label: string; value: number; color: string }>>()
      .innerRadius(innerRadius)
      .outerRadius(radius)
      .cornerRadius(4);

    const arcHover = d3
      .arc<d3.PieArcDatum<{ label: string; value: number; color: string }>>()
      .innerRadius(innerRadius - 2)
      .outerRadius(radius + 6)
      .cornerRadius(4);

    const paths = g
      .selectAll('path')
      .data(pie(donutData))
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', (d) => d.data.color)
      .attr('stroke', '#ffffff')
      .attr('stroke-width', 2)
      .style('cursor', 'pointer')
      .style('transition', 'all 0.2s ease');

    // Tooltip and hover behavior
    paths
      .on('mouseover', function (event, d) {
        d3.select(this)
          .transition()
          .duration(150)
          .attr('d', arcHover as any);

        if (tooltipRef.current) {
          const tooltip = tooltipRef.current;
          const pct = totalTarget > 0 ? ((d.data.value / totalTarget) * 100).toFixed(1) : '0';
          tooltip.innerHTML = `
            <div class="font-bold text-xs text-white mb-0.5">${d.data.label}</div>
            <div class="flex items-center justify-between gap-3 text-[11px] text-slate-200">
              <span>Số hệ thống: <strong>${d.data.value} / ${totalTarget}</strong></span>
              <span class="font-mono text-emerald-400 font-bold">(${pct}%)</span>
            </div>
          `;
          tooltip.style.opacity = '1';
          tooltip.style.left = `${event.pageX + 10}px`;
          tooltip.style.top = `${event.pageY - 28}px`;
        }
      })
      .on('mousemove', function (event) {
        if (tooltipRef.current) {
          tooltipRef.current.style.left = `${event.pageX + 10}px`;
          tooltipRef.current.style.top = `${event.pageY - 28}px`;
        }
      })
      .on('mouseout', function () {
        d3.select(this)
          .transition()
          .duration(150)
          .attr('d', arc as any);

        if (tooltipRef.current) {
          tooltipRef.current.style.opacity = '0';
        }
      });

    // Center text - percentage
    g.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '-0.15em')
      .attr('font-size', '28px')
      .attr('font-weight', '800')
      .attr('fill', '#0f172a')
      .text(`${nationalCompletionRate}%`);

    g.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '1.3em')
      .attr('font-size', '11px')
      .attr('font-weight', '600')
      .attr('fill', '#64748b')
      .text('HOÀN TẤT KẾT NỐI');

    g.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '2.8em')
      .attr('font-size', '10px')
      .attr('font-weight', '600')
      .attr('fill', '#10b981')
      .text(`${totalCompleted} / ${totalTarget} hệ thống`);

  }, [totalCompleted, totalTesting, totalPending, totalBlocked, totalTarget, nationalCompletionRate, selectedGroup]);

  // Render D3 Horizontal Stacked Bar Chart for Departments
  useEffect(() => {
    if (!barChartRef.current) return;

    const width = Math.max(containerWidth - 30, 520);
    const rowHeight = 36;
    const margin = { top: 25, right: 85, bottom: 25, left: 140 };
    const height = Math.max(filteredData.length * rowHeight + margin.top + margin.bottom, 140);

    const svg = d3.select(barChartRef.current);
    svg.selectAll('*').remove();

    svg
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('width', '100%')
      .attr('height', height);

    const g = svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`);
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const maxTarget = selectedGroup === 'nhom1' ? 8 : selectedGroup === 'nhom2' ? 55 : 63;

    // X Scale: 0 to maxTarget
    const xScale = d3.scaleLinear().domain([0, maxTarget]).range([0, innerWidth]);

    // Y Scale: departments
    const yScale = d3
      .scaleBand()
      .domain(filteredData.map((d) => d.id))
      .range([0, innerHeight])
      .padding(0.24);

    // Gridlines
    g.append('g')
      .attr('class', 'grid')
      .attr('transform', `translate(0, ${innerHeight})`)
      .call(
        d3
          .axisBottom(xScale)
          .ticks(maxTarget <= 8 ? 8 : 6)
          .tickSize(-innerHeight)
          .tickFormat((d) => `${d}`)
      )
      .call((axis) => {
        axis.select('.domain').remove();
        axis.selectAll('.tick line').attr('stroke', '#e2e8f0').attr('stroke-dasharray', '2,2');
        axis.selectAll('.tick text').attr('font-size', '10px').attr('fill', '#94a3b8');
      });

    // Top Header marker
    g.append('text')
      .attr('x', innerWidth)
      .attr('y', -8)
      .attr('text-anchor', 'end')
      .attr('font-size', '10px')
      .attr('font-weight', '600')
      .attr('fill', '#64748b')
      .text(`Mục tiêu quy hoạch: ${maxTarget} / ${maxTarget} địa bàn`);

    // Render Rows
    filteredData.forEach((dept) => {
      const breakdown = getDeptBreakdown(dept);
      const yPos = yScale(dept.id) || 0;
      const barH = yScale.bandwidth();
      const isSelected = dept.id === activeDeptId;

      // Group for this department
      const rowG = g
        .append('g')
        .attr('class', 'dept-row')
        .style('cursor', 'pointer')
        .on('click', () => setActiveDeptId(dept.id));

      // Row background hover highlight
      rowG
        .append('rect')
        .attr('x', -margin.left)
        .attr('y', yPos - 2)
        .attr('width', width)
        .attr('height', barH + 4)
        .attr('fill', isSelected ? '#eff6ff' : 'transparent')
        .attr('rx', 6)
        .style('transition', 'fill 0.15s ease');

      // Department Label
      rowG
        .append('text')
        .attr('x', -10)
        .attr('y', yPos + barH / 2)
        .attr('dy', '0.35em')
        .attr('text-anchor', 'end')
        .attr('font-size', '11.5px')
        .attr('font-weight', isSelected ? '700' : '600')
        .attr('fill', isSelected ? '#1d4ed8' : '#1e293b')
        .text(dept.shortName);

      // Background Track (Total maxTarget)
      rowG
        .append('rect')
        .attr('x', 0)
        .attr('y', yPos)
        .attr('width', xScale(maxTarget))
        .attr('height', barH)
        .attr('fill', '#f1f5f9')
        .attr('rx', 4);

      // Completed Segment (Emerald)
      const wCompleted = xScale(breakdown.completed);
      rowG
        .append('rect')
        .attr('x', 0)
        .attr('y', yPos)
        .attr('width', wCompleted)
        .attr('height', barH)
        .attr('fill', isSelected ? '#059669' : '#10b981')
        .attr('rx', breakdown.testing === 0 && breakdown.pending === 0 && breakdown.blocked === 0 ? 4 : 0);

      // Testing Segment (Blue)
      const wTesting = xScale(breakdown.testing);
      if (breakdown.testing > 0) {
        rowG
          .append('rect')
          .attr('x', wCompleted)
          .attr('y', yPos)
          .attr('width', wTesting)
          .attr('height', barH)
          .attr('fill', '#3b82f6');
      }

      // Pending Segment (Amber)
      const wPending = xScale(breakdown.pending);
      if (breakdown.pending > 0) {
        rowG
          .append('rect')
          .attr('x', wCompleted + wTesting)
          .attr('y', yPos)
          .attr('width', wPending)
          .attr('height', barH)
          .attr('fill', '#f59e0b');
      }

      // Blocked Segment (Rose)
      const wBlocked = xScale(breakdown.blocked);
      if (breakdown.blocked > 0) {
        rowG
          .append('rect')
          .attr('x', wCompleted + wTesting + wPending)
          .attr('y', yPos)
          .attr('width', wBlocked)
          .attr('height', barH)
          .attr('fill', '#f43f5e')
          .attr('rx', 4);
      }

      // Value Label on the right
      const pct = breakdown.target > 0 ? ((breakdown.completed / breakdown.target) * 100).toFixed(0) : '0';
      rowG
        .append('text')
        .attr('x', innerWidth + 10)
        .attr('y', yPos + barH / 2)
        .attr('dy', '0.35em')
        .attr('font-size', '11px')
        .attr('font-weight', '700')
        .attr('fill', breakdown.completed >= (maxTarget * 0.85) ? '#059669' : '#1e293b')
        .text(`${breakdown.completed}/${breakdown.target} (${pct}%)`);

      // Tooltip triggers
      rowG
        .on('mouseover', function (event) {
          if (tooltipRef.current) {
            const tooltip = tooltipRef.current;
            tooltip.innerHTML = `
              <div class="font-bold text-xs text-white pb-1 border-b border-slate-700">${dept.name}</div>
              <div class="pt-1.5 space-y-1 text-[11px] text-slate-200">
                <div class="flex justify-between gap-3">
                  <span class="text-emerald-400">Đã hoàn thành kết nối:</span>
                  <span class="font-bold">${breakdown.completed} / ${breakdown.target} đơn vị</span>
                </div>
                <div class="flex justify-between gap-3">
                  <span class="text-blue-400">Đang kiểm thử DQI:</span>
                  <span class="font-bold">${breakdown.testing} đơn vị</span>
                </div>
                <div class="flex justify-between gap-3">
                  <span class="text-amber-400">Chờ kết nối / Chuẩn hóa:</span>
                  <span class="font-bold">${breakdown.pending} đơn vị</span>
                </div>
                ${breakdown.blocked > 0 ? `
                <div class="flex justify-between gap-3">
                  <span class="text-rose-400 font-semibold">Vướng mắc / Cần tháo gỡ:</span>
                  <span class="font-bold text-rose-300">${breakdown.blocked} đơn vị</span>
                </div>` : ''}
                <div class="flex justify-between gap-3 pt-1 border-t border-slate-700 text-slate-300">
                  <span>Chỉ số DQI trung bình:</span>
                  <span class="font-bold text-amber-300">${dept.dqiScore}%</span>
                </div>
                <div class="flex justify-between gap-3 text-slate-300">
                  <span>Độ trễ Agent Node:</span>
                  <span class="font-mono text-emerald-300">${dept.avgLatencyMs} ms</span>
                </div>
              </div>
            `;
            tooltip.style.opacity = '1';
            tooltip.style.left = `${event.pageX + 12}px`;
            tooltip.style.top = `${event.pageY - 35}px`;
          }
        })
        .on('mousemove', function (event) {
          if (tooltipRef.current) {
            tooltipRef.current.style.left = `${event.pageX + 12}px`;
            tooltipRef.current.style.top = `${event.pageY - 35}px`;
          }
        })
        .on('mouseout', function () {
          if (tooltipRef.current) {
            tooltipRef.current.style.opacity = '0';
          }
        });
    });

  }, [filteredData, activeDeptId, containerWidth, selectedGroup]);

  return (
    <div id="national-data-integration-dashboard" className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 shadow-sm space-y-7">
      {/* Floating Tooltip Container */}
      <div
        ref={tooltipRef}
        className="fixed z-50 pointer-events-none px-3 py-2.5 rounded-lg bg-slate-900/95 text-white shadow-2xl border border-slate-700 text-xs transition-opacity duration-150 max-w-xs backdrop-blur-sm"
        style={{ opacity: 0 }}
      />

      {/* Header & Context */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
            <BarChart3 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Giám sát Tiến độ Tích hợp Dữ liệu Quốc gia (Trực quan hóa D3 Engine)</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            Bảng Điều phối Tích hợp Hệ thống Sở, Ngành qua Trục NDOP
          </h3>
          <p className="text-xs text-slate-500 max-w-3xl leading-relaxed">
            Theo dõi trực quan tỷ lệ <strong>Hoàn thành đồng bộ</strong> so với <strong>Đang kiểm thử / Chờ kết nối</strong> của 10 nhóm hệ thống sở, ngành then chốt vào Cụm Trung tâm Dữ liệu Quốc gia theo Nghị định số 278/2025/NĐ-CP và Quyết định số 2439/QĐ-TTg.
          </p>
        </div>

        {/* Global Summary Badge with Group Selector */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-semibold">
            <button
              onClick={() => setSelectedGroup('all')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                selectedGroup === 'all'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Toàn quốc (63 tỉnh/thành)
            </button>
            <button
              onClick={() => setSelectedGroup('nhom1')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                selectedGroup === 'nhom1'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Nhóm 1: 08 Đô thị hạt nhân ưu tiên
            </button>
            <button
              onClick={() => setSelectedGroup('nhom2')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                selectedGroup === 'nhom2'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Nhóm 2: 55 Tỉnh, thành phố còn lại
            </button>
          </div>
        </div>
      </div>

      {/* 4 Summary Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4 space-y-1">
          <div className="flex items-center justify-between text-xs text-emerald-800 font-semibold">
            <span>Đã hoàn thành đồng bộ</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-emerald-900">
            {totalCompleted} <span className="text-xs font-normal text-emerald-700">hệ thống</span>
          </div>
          <div className="text-[11px] text-emerald-700">
            Chiếm <strong>{nationalCompletionRate}%</strong> trên tổng số {totalTarget} mục tiêu kết nối ({selectedGroup === 'all' ? 'Toàn quốc' : selectedGroup === 'nhom1' ? '08 Đô thị hạt nhân ưu tiên' : '55 Tỉnh, thành phố còn lại'})
          </div>
        </div>

        <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-4 space-y-1">
          <div className="flex items-center justify-between text-xs text-blue-800 font-semibold">
            <span>Đang kiểm thử DQI</span>
            <Clock className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-blue-900">
            {totalTesting} <span className="text-xs font-normal text-blue-700">hệ thống</span>
          </div>
          <div className="text-[11px] text-blue-700">
            Chiếm <strong>{nationalTestingRate}%</strong> đang kiểm thử nghiệm thu kỹ thuật qua Agent Node
          </div>
        </div>

        <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4 space-y-1">
          <div className="flex items-center justify-between text-xs text-amber-800 font-semibold">
            <span>Chờ tích hợp & Vướng mắc</span>
            <Layers className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-amber-900">
            {totalPending + totalBlocked} <span className="text-xs font-normal text-amber-700">hệ thống</span>
          </div>
          <div className="text-[11px] text-amber-700">
            Gồm <strong>{totalPending}</strong> hệ thống chờ kết nối, <strong>{totalBlocked}</strong> hệ thống gặp vướng mắc kỹ thuật/pháp lý
          </div>
        </div>

        <div className="bg-slate-900 text-white rounded-xl p-4 space-y-1 border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-300 font-semibold">
            <span>Độ trễ Agent Node trung bình</span>
            <Cpu className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400">
            14.8 <span className="text-xs font-normal text-slate-300">ms</span>
          </div>
          <div className="text-[11px] text-slate-400">
            Lưu lượng đồng bộ <strong>~52,4 triệu</strong> giao dịch/ngày
          </div>
        </div>
      </div>

      {/* Main Interactive Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: D3 Donut Chart & Legend (4 Cols) */}
        <div className="lg:col-span-4 bg-slate-50/80 rounded-xl p-5 border border-slate-200 flex flex-col items-center justify-between space-y-4">
          <div className="w-full text-left">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <PieChartIcon className="w-4 h-4 text-indigo-600" />
              Tỷ trọng Trạng thái Tích hợp ({selectedGroup === 'all' ? 'Toàn quốc' : selectedGroup === 'nhom1' ? 'Nhóm 1 (08 Đô thị)' : 'Nhóm 2 (55 Tỉnh, thành phố)'})
            </h4>
            <p className="text-[11px] text-slate-500 mt-0.5">Biểu đồ hình vành khuyên (Donut Chart) phân bổ trên tổng số {totalTarget} điểm kết nối</p>
          </div>

          {/* D3 Donut SVG Container */}
          <div className="relative flex items-center justify-center">
            <svg ref={donutChartRef} className="w-60 h-60" />
          </div>

          {/* Interactive Legend with values */}
          <div className="w-full space-y-2 pt-2 border-t border-slate-200/80 text-xs">
            <div className="flex items-center justify-between p-1.5 rounded hover:bg-white transition-colors">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500 shrink-0" />
                <span className="text-slate-700 font-medium">Đã hoàn thành đồng bộ</span>
              </div>
              <span className="font-bold text-slate-900">{totalCompleted} ({nationalCompletionRate}%)</span>
            </div>

            <div className="flex items-center justify-between p-1.5 rounded hover:bg-white transition-colors">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-500 shrink-0" />
                <span className="text-slate-700 font-medium">Đang kiểm thử DQI</span>
              </div>
              <span className="font-bold text-slate-900">{totalTesting} ({nationalTestingRate}%)</span>
            </div>

            <div className="flex items-center justify-between p-1.5 rounded hover:bg-white transition-colors">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-amber-500 shrink-0" />
                <span className="text-slate-700 font-medium">Đang chuẩn bị hồ sơ</span>
              </div>
              <span className="font-bold text-slate-900">{totalPending} ({totalTarget > 0 ? (totalPending / totalTarget * 100).toFixed(1) : 0}%)</span>
            </div>

            <div className="flex items-center justify-between p-1.5 rounded hover:bg-white transition-colors">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500 shrink-0" />
                <span className="text-slate-700 font-medium">Vướng mắc / Cần tháo gỡ</span>
              </div>
              <span className="font-bold text-slate-900">{totalBlocked} ({totalTarget > 0 ? (totalBlocked / totalTarget * 100).toFixed(1) : 0}%)</span>
            </div>
          </div>
        </div>

        {/* Right: D3 Stacked Horizontal Bar Chart by Department (8 Cols) */}
        <div ref={chartContainerRef} className="lg:col-span-8 bg-slate-50/80 rounded-xl p-5 border border-slate-200 space-y-4">
          {/* Controls Bar: Filters, Search & Sorters */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs font-semibold text-slate-600 flex items-center gap-1 mr-1">
                <Filter className="w-3.5 h-3.5" /> Lĩnh vực:
              </span>
              <button
                onClick={() => setSelectedSector('all')}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                  selectedSector === 'all'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                Tất cả (10 sở, ngành)
              </button>
              <button
                onClick={() => setSelectedSector('economy')}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                  selectedSector === 'economy'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                Kinh tế (Sở Tài chính)
              </button>
              <button
                onClick={() => setSelectedSector('internal_affairs')}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                  selectedSector === 'internal_affairs'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                Nội chính (Công an, Tư pháp, DVC)
              </button>
              <button
                onClick={() => setSelectedSector('social')}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                  selectedSector === 'social'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                Xã hội (Y tế, GD&ĐT, BHXH)
              </button>
              <button
                onClick={() => setSelectedSector('infrastructure')}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                  selectedSector === 'infrastructure'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                Đất đai & Hạ tầng
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm sở, ngành..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-2.5 py-1 rounded-lg bg-white border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 w-32 sm:w-40"
                />
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-white border border-slate-200 rounded-lg px-2 py-1 text-slate-700 font-medium text-xs focus:outline-none"
              >
                <option value="completed">Tỷ lệ hoàn thành</option>
                <option value="dqi">Chỉ số DQI</option>
                <option value="name">Tên (A-Z)</option>
              </select>
            </div>
          </div>

          {/* D3 Bar Chart Sub-header and Legend */}
          <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-500">
            <span>Tiến độ hoàn thành của từng sở, ngành trên địa bàn ({selectedGroup === 'all' ? '63 Tỉnh, thành phố' : selectedGroup === 'nhom1' ? '08 Đô thị hạt nhân ưu tiên' : '55 Tỉnh, thành phố còn lại'}):</span>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded bg-emerald-500" /> Hoàn thành
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded bg-blue-500" /> Kiểm thử DQI
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded bg-amber-500" /> Chờ kết nối
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded bg-rose-500" /> Vướng mắc
              </span>
            </div>
          </div>

          {/* SVG Canvas */}
          <div className="w-full overflow-x-auto">
            <svg ref={barChartRef} className="min-w-[500px]" />
          </div>

          <p className="text-[11px] text-slate-400 italic">
            * Gợi ý: Nhấp chọn bất kỳ thanh sở, ngành nào trên biểu đồ để xem chi tiết thông số kỹ thuật, căn cứ pháp lý và cam kết thời hạn hoàn thành bên dưới.
          </p>
        </div>
      </div>

      {/* Deep-Dive Inspection Panel for Selected Department */}
      <div className="bg-slate-900 text-white rounded-xl p-5 sm:p-6 border border-slate-800 shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[11px] font-mono font-semibold mb-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{activeDept.primaryDomain}</span>
            </div>
            <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <Building2 className="w-5 h-5 text-amber-400 shrink-0" />
              <span>{activeDept.name}</span>
            </h4>
            <p className="text-xs text-slate-300 mt-1">{activeDept.responsibleLead}</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-right">
              <div className="text-[10px] text-slate-400">Tiến độ theo nhóm địa bàn</div>
              <div className="text-base font-extrabold text-emerald-400">
                {activeBreakdown.completed} / {activeBreakdown.target} địa bàn ({activeBreakdown.target > 0 ? (activeBreakdown.completed / activeBreakdown.target * 100).toFixed(0) : 0}%)
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {/* Box 1: Technical & DQI */}
          <div className="bg-slate-800/80 rounded-lg p-3.5 border border-slate-700/80 space-y-2">
            <span className="text-[11px] font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1">
              <Cpu className="w-3.5 h-3.5" />
              Thông số Kỹ thuật & Chất lượng
            </span>
            <div className="flex justify-between text-slate-300">
              <span className="text-slate-400">Chỉ số DQI trung bình:</span>
              <span className="font-bold text-amber-300">{activeDept.dqiScore}%</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span className="text-slate-400">Độ trễ phản hồi Agent Node:</span>
              <span className="font-mono text-emerald-300 font-semibold">{activeDept.avgLatencyMs} ms</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span className="text-slate-400">Giao thức NDOP:</span>
              <span className="font-mono text-slate-200 text-[11px]">{activeDept.ndopProtocol}</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span className="text-slate-400">Trạng thái Agent Node:</span>
              <span className="font-bold text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                {activeDept.agentNodeStatus === 'active' ? 'Đã kích hoạt khóa HSM C12' : 'Đang triển khai cấu hình'}
              </span>
            </div>
          </div>

          {/* Box 2: Legal & SLA Mandate */}
          <div className="bg-slate-800/80 rounded-lg p-3.5 border border-slate-700/80 space-y-2">
            <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1">
              <FileCheck className="w-3.5 h-3.5" />
              Căn cứ Pháp lý & Phân loại Kết nối
            </span>
            <div className="text-slate-300 leading-relaxed">
              <strong>Căn cứ:</strong> {activeDept.legalMandate}
            </div>
            <div className="text-slate-300 leading-relaxed">
              <strong>Phân loại (NĐ 278):</strong> Loại 1 (Khai thác tự động qua API) kết hợp Loại 2 (Chia sẻ có điều kiện).
            </div>
            <div className="text-slate-300">
              <strong>Thời hạn hoàn thành 100%:</strong> Quý IV/2026 (Nhóm 1 ưu tiên hoàn thành trước 30/10/2026).
            </div>
          </div>

          {/* Box 3: Governance & Sample Endpoints */}
          <div className="bg-slate-800/80 rounded-lg p-3.5 border border-slate-700/80 space-y-2">
            <span className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1">
              <Database className="w-3.5 h-3.5" />
              Đặc tả API & Nguyên tắc Bảo toàn Dữ liệu
            </span>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              {activeDept.highlightNote}
            </p>
            <div className="pt-1.5 border-t border-slate-700/80 space-y-1">
              <span className="text-[10px] text-slate-400 font-mono block">Danh mục Endpoint API mẫu qua Trục NDOP:</span>
              {activeDept.sampleAPIs.map((api, idx) => (
                <div key={idx} className="bg-slate-950/80 px-2 py-0.5 rounded text-[10.5px] font-mono text-emerald-300 truncate">
                  {api}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
