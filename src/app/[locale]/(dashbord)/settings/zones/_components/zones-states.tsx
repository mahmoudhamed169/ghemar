import React from "react";
import StatCard, { StatCardProps } from "./stat-card";

// ── Icons (inline SVG — no extra deps needed) ──────────────────────────────

const UsersIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const AlertIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const ActivityIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

const MapPinIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

// ── Dummy data ─────────────────────────────────────────────────────────────

const stats: StatCardProps[] = [
  {
    label: "إجمالي الساكنين",
    value: 10,
    icon: <UsersIcon />,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-400",
  },
  {
    label: "المناطق المعطلة",
    value: 2,
    icon: <AlertIcon />,
    iconBg: "bg-red-100",
    iconColor: "text-red-400",
  },
  {
    label: "المناطق النشطة",
    value: 4,
    icon: <ActivityIcon />,
    iconBg: "bg-green-100",
    iconColor: "text-green-500",
  },
  {
    label: "إجمالي المناطق",
    value: 6,
    icon: <MapPinIcon />,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-400",
  },
];

// ── Section component ──────────────────────────────────────────────────────

export default function ZonesStates() {
  return (
    <section className="w-full">
    
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>
    </section>
  );
}
