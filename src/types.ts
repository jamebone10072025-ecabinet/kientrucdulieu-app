export type NavigationTab = 
  | 'overview'
  | 'organization'
  | 'dictionary'
  | 'integration'
  | 'security'
  | 'quality'
  | 'checklist';

export interface DataDomain {
  id: string;
  name: string;
  code: string;
  description: string;
  authority: string;
  sourceDb: string;
  identifierKey: string;
  sampleFields: {
    field: string;
    type: string;
    description: string;
    required: boolean;
    technicalRule: string;
    isKeyIdentifier?: boolean;
  }[];
  purposeAtProvince: string;
  accessMode: 'API/DaaS' | 'Sync Copy' | 'Self-Created';
}

export interface GovernanceDepartment {
  id: string;
  code: string;
  name: string;
  vietnameseTitle: string;
  shortRole: string;
  functions: string[];
  responsibilitiesAtMinistry: string;
  responsibilitiesAtProvince: string;
  provincialInCharge: string;
  recommendedStaff: string;
  qualification: string;
  trainingProgram: string;
  notes?: string;
}

export interface DeploymentModel {
  id: string;
  title: string;
  subtitle: string;
  applicableCondition: string;
  structureDescription: string;
  cdoRole: string;
  complianceLead: string;
  dataEngineeringLead: string;
  pros: string[];
  transitionCondition?: string;
}

export interface DataQualityRule {
  id: string;
  criterion: 'Đúng (Accuracy)' | 'Đủ (Completeness)' | 'Sạch (Cleanliness & Validity)' | 'Sống (Timeliness)' | 'Thống nhất (Consistency)';
  businessRule: string;
  technicalRule: string;
  targetScope: string;
  threshold: string;
  isIdentifierKey: boolean;
  example: string;
}

export interface IssueLogItem {
  id: string;
  code: string;
  discoveredDate: string;
  errorType: string;
  severityLevel: 'Đỏ' | 'Vàng' | 'Xanh';
  warningSource: string;
  violatingField: string;
  responsibleUnit: string;
  slaDeadline: string;
  status: 'Mới' | 'Đang xử lý' | 'Chờ xác minh' | 'Hoàn thành';
  actionTaken: string;
}

export interface NationalDataCenterNode {
  id: string;
  name: string;
  location: string;
  tier: string;
  mode: 'Active' | 'Active-Active' | 'Hot Standby';
  securityLevel: string;
  standards: string[];
  keyFunctions: string[];
  specifications: {
    rackCount?: string;
    area?: string;
    failoverTime?: string;
    rpo?: string;
    rto?: string;
    networkBandwidth?: string;
  };
}

export interface DataQualityScenario {
  id: number;
  name: string;
  symptom: string;
  rootCause: string;
  technicalRemedy: string;
  businessRemedy: string;
}
