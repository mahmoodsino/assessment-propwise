"use client";

import { useAtom, useSetAtom } from "jotai";
import { useCallback, useEffect } from "react";
import { toast } from "sonner";
import { fetchDashboardData } from "@/lib";
import {
  activePeriodAtom,
  dashboardDataAtom,
  hasErrorAtom,
  isLoadingAtom,
} from "@/store";
import type { Period } from "@/types";

const periodLabel: Record<Period, string> = {
  today: "Today",
  this_week: "This Week",
  this_month: "This Month",
  this_quarter: "This Quarter",
  this_year: "This Year",
  custom: "Custom Range",
};

export function useDashboard() {
  const [activePeriod, setActivePeriod] = useAtom(activePeriodAtom);
  const setData = useSetAtom(dashboardDataAtom);
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom);
  const [hasError, setHasError] = useAtom(hasErrorAtom);

  const load = useCallback(
    async (period: Period, showToast = false, simulateError = false) => {
      setIsLoading(true);
      setHasError(false);
      try {
        const data = await fetchDashboardData({ period, simulateError });
        setData(data);
        if (showToast) toast(`Dashboard updated to ${periodLabel[period]}`);
      } catch {
        setHasError(true);
        toast.error("Failed to load data", {
          action: { label: "Retry", onClick: () => load(period) },
        });
      } finally {
        setIsLoading(false);
      }
    },
    [setData, setIsLoading, setHasError],
  );

  useEffect(() => {
    load(activePeriod);
  }, []); // eslint-disable-line

  const changePeriod = useCallback(
    (period: Period) => {
      setActivePeriod(period);
      load(period, true);
    },
    [setActivePeriod, load],
  );

  return { activePeriod, changePeriod, isLoading, hasError, reload: load };
}
