import { GenerateData } from "@root/utils/generateData";

export interface Data {
  status: "loading" | "success" | "error";
  generateData?: GenerateData;
}

export interface GetGoogleSheetsData {
  fetchSheetsData: Array<string[]> | string;
  errorMessage: string;
}
