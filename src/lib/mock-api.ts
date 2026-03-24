import type { DashboardData, Period } from "@/types/dashboard";
import { mockDataByPeriod } from "./mock-data";

const delay = () =>
  new Promise((r) => setTimeout(r, 300 + Math.random() * 500));

export async function fetchDashboardData(params: {
  period: Period;
  simulateError?: boolean;
}): Promise<DashboardData> {
  await delay();
  if (params.simulateError) throw new Error("Failed to load data");
  return mockDataByPeriod[params.period] ?? mockDataByPeriod.today;
}
