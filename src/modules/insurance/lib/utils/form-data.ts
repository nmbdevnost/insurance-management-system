import type { CreateInsuranceBody } from "../types/insurances";

export function createInsuranceFormData(
  insurance: CreateInsuranceBody
): FormData {
  const formData = new FormData();

  const { assetDetails, ...rest } = insurance;
  const {
    houseAssetDetails,
    vehicleAssetDetails,
    uploadDocuments,
    ...assetDetailsRest
  } = assetDetails;
  const { valuationReport, ...houseAssetRest } = houseAssetDetails;
  const { blueBook, taxInvoice, ...vehicleAssetRest } = vehicleAssetDetails;

  const jsonPayload: Omit<CreateInsuranceBody, "assetDetails"> & {
    assetDetails: Omit<typeof assetDetailsRest, never> & {
      houseAssetDetails: typeof houseAssetRest;
      vehicleAssetDetails: typeof vehicleAssetRest;
      uploadDocuments: never[];
    };
  } = {
    ...rest,
    assetDetails: {
      ...assetDetailsRest,
      houseAssetDetails: houseAssetRest,
      vehicleAssetDetails: vehicleAssetRest,
      uploadDocuments: [],
    },
  };

  formData.append("data", JSON.stringify(jsonPayload));

  if (valuationReport instanceof File) {
    formData.append("valuationReport", valuationReport);
  }
  if (blueBook instanceof File) {
    formData.append("blueBook", blueBook);
  }
  if (taxInvoice instanceof File) {
    formData.append("taxInvoice", taxInvoice);
  }
  uploadDocuments?.forEach((file, index) => {
    if (file instanceof File) {
      formData.append(`uploadDocuments[${index}]`, file);
    }
  });

  return formData;
}
