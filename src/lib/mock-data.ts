import type { DashboardData, Period } from "@/types";

const now = Date.now();
const hoursAgo = (h: number) => new Date(now - h * 3600000).toISOString();
const minsAgo = (m: number) => new Date(now - m * 60000).toISOString();

const todayData: DashboardData = {
  kpis: [
    {
      label: "Total Leads",
      value: "248",
      trend: 12.4,
      trendDirection: "up",
      sparklineData: [30, 42, 38, 55, 47, 60, 58, 72, 68, 80, 75, 90],
    },
    {
      label: "Revenue YTD",
      value: "AED 1.42M",
      trend: 24.6,
      trendDirection: "up",
      sparklineData: [20, 35, 30, 50, 45, 65, 60, 75, 70, 88, 82, 100],
    },
    {
      label: "Active Deals",
      value: "43",
      trend: 8.2,
      trendDirection: "up",
      sparklineData: [25, 30, 28, 35, 32, 40, 38, 45, 42, 50, 47, 55],
    },
    {
      label: "Completed Tasks",
      value: "156",
      trend: 24.6,
      trendDirection: "up",
      sparklineData: [40, 52, 48, 60, 55, 68, 65, 78, 72, 85, 80, 95],
    },
  ],
  revenue: {
    total: "AED 1,621,000",
    trend: 18.4,
    data: [
      { month: "Jan", thisYear: 85000, lastYear: 62000 },
      { month: "Feb", thisYear: 92000, lastYear: 71000 },
      { month: "Mar", thisYear: 108000, lastYear: 80000 },
      { month: "Apr", thisYear: 124000, lastYear: 88000 },
      { month: "May", thisYear: 118000, lastYear: 95000 },
      { month: "Jun", thisYear: 142000, lastYear: 104000 },
      { month: "Jul", thisYear: 155000, lastYear: 110000 },
      { month: "Aug", thisYear: 148000, lastYear: 118000 },
      { month: "Sep", thisYear: 168000, lastYear: 125000 },
      { month: "Oct", thisYear: 182000, lastYear: 132000 },
      { month: "Nov", thisYear: 210000, lastYear: 140000 },
      { month: "Dec", thisYear: 240000, lastYear: 148000 },
    ],
  },
  pipeline: {
    totalDeals: 106,
    totalStages: 6,
    totalValue: "AED 2.3M",
    stages: [
      { stage: "New Lead", count: 42, value: 840000, currency: "AED" },
      { stage: "Contacted", count: 28, value: 560000, currency: "AED" },
      { stage: "Qualified", count: 18, value: 450000, currency: "AED" },
      { stage: "Proposal", count: 18, value: 450000, currency: "AED" },
      { stage: "Negotiation", count: 12, value: 320000, currency: "AED" },
      { stage: "Closed Won", count: 8, value: 280000, currency: "AED" },
    ],
  },
  activities: {
    groups: [
      {
        label: "Just now",
        entries: [
          {
            id: "1",
            message: "You were assigned a new lead: Ahmed Al-Rashid",
            highlights: [{ text: "Ahmed Al-Rashid", type: "person" }],
            timestamp: new Date().toISOString(),
            relativeTime: "10 min ago",
            icon: "lead",
          },
          {
            id: "2",
            message: "System transferred deal to Negotiation stage",
            highlights: [{ text: "Negotiation stage", type: "stage" }],
            timestamp: minsAgo(25),
            relativeTime: "25 min ago",
            icon: "deal",
          },
        ],
      },
      {
        label: "Earlier today",
        entries: [
          {
            id: "3",
            message: "Nadia K. logged a call with James Chen",
            highlights: [{ text: "James Chen", type: "person" }],
            timestamp: hoursAgo(1),
            relativeTime: "1h ago",
            icon: "call",
          },
          {
            id: "4",
            message: "Proposal email sent to Sarah Mitchell",
            highlights: [{ text: "Sarah Mitchell", type: "person" }],
            timestamp: hoursAgo(4),
            relativeTime: "4h ago",
            icon: "email",
          },
          {
            id: "5",
            message: "Commission of AED 42,000 recorded for deal #1019",
            highlights: [{ text: "#1019", type: "deal" }],
            timestamp: hoursAgo(5),
            relativeTime: "5h ago",
            icon: "commission",
          },
        ],
      },
      {
        label: "Yesterday",
        entries: [
          {
            id: "6",
            message: "Note added to deal #1021 by Lina Rahman",
            highlights: [
              { text: "#1021", type: "deal" },
              { text: "Lina Rahman", type: "person" },
            ],
            timestamp: hoursAgo(26),
            relativeTime: "Yesterday",
            icon: "note",
          },
          {
            id: "7",
            message: "Task completed: Follow up with Dubai Marina client",
            highlights: [],
            timestamp: hoursAgo(28),
            relativeTime: "Yesterday",
            icon: "task",
          },
        ],
      },
    ],
  },
  tasks: {
    completed: 0,
    total: 5,
    items: [
      {
        id: "t1",
        title: "Update deal #1024 documents",
        dueLabel: "Due · 4:30 PM",
        isOverdue: false,
        type: "task",
        priority: "low",
        completed: false,
      },
      {
        id: "t2",
        title: "Send proposal to Sarah Mitchell",
        dueLabel: "Due · 11:00 AM",
        isOverdue: false,
        type: "email",
        priority: "high",
        completed: false,
      },
      {
        id: "t3",
        title: "Schedule viewing – Palm Jumeirah",
        dueLabel: "Due · 2:00 PM",
        isOverdue: false,
        type: "meeting",
        priority: "med",
        completed: false,
      },
      {
        id: "t4",
        title: "Weekly team sync",
        dueLabel: "Upcoming · 5:00 PM",
        isOverdue: false,
        type: "meeting",
        priority: "med",
        completed: false,
      },
      {
        id: "t5",
        title: "Follow up with Ahmed Al-Rashid",
        dueLabel: "Overdue · 2h ago",
        isOverdue: true,
        type: "call",
        priority: "high",
        completed: false,
      },
    ],
  },
};

function mutate(data: DashboardData, multiplier: number): DashboardData {
  return {
    ...data,
    kpis: data.kpis.map((k) => ({
      ...k,
      sparklineData: k.sparklineData.map((v) =>
        Math.round(v * multiplier * (0.85 + Math.random() * 0.3)),
      ),
    })),
    revenue: {
      ...data.revenue,
      data: data.revenue.data.map((d) => ({
        ...d,
        thisYear: Math.round(d.thisYear * multiplier),
        lastYear: Math.round(d.lastYear * multiplier),
      })),
    },
  };
}

export const mockDataByPeriod: Record<Period, DashboardData> = {
  today: todayData,
  this_week: mutate(todayData, 7),
  this_month: mutate(todayData, 30),
  this_quarter: mutate(todayData, 90),
  this_year: mutate(todayData, 365),
  custom: todayData,
};
