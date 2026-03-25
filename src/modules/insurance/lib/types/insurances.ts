export interface CreateInsuranceBody {
  userId: number;
  planId: number;
  loanId: number;
  initiationType: string;
  startDate: string;
  endDate: string;
  nomineeName: string;
  nomineeRelationship: string;
  assetType: string;
  assetDetails: AssetDetails;
}

export interface AssetDetails {
  branchId: number;
  province: string;
  cifId: string;
  segment: string;
  losId: string;
  policyType: string;
  additionalRemarks?: string;
  assetDetail?: string;
  name: string;
  contactNumber: string;
  address?: string;
  insuranceProvider: string;
  uploadDocuments: File[];
  houseAssetDetails: HouseAssetDetails;
  vehicleAssetDetails: VehicleAssetDetails;
}

export interface HouseAssetDetails {
  plotNumber: string;
  buildingLocation?: string;
  nameOfBuildingOwner?: string;
  noOfStorey: number;
  riskCoverage?: string;
  sumInsured: number;
  buildingType?: string;
  fmv: number;
  ownerType: string;
  valuationReport?: File;
  constructionCompletionCertificate?: File;
  lorc: string;
  others: string;
}

export interface VehicleAssetDetails {
  vehicleRegistrationNumber: string;
  vehicleType: string;
  chassisNumber: string;
  engineNumber: string;
  manufacturerCompany: string;
  modelName: string;
  color: string;
  manufacturedYear: number;
  sumInsured: number;
  ownerType: string;
  taxInvoice?: File;
  blueBook?: File;
  registration: string;
  panVat: string;
}

export interface CreateInsuranceResponse {
  message?: string;
}
