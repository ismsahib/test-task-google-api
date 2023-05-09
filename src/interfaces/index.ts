import { GenerateData } from "@root/utils/generateData";

export interface Data {
  status: "loading" | "success" | "error";
  generateData?: GenerateData;
}
