"use client";

import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui";
import { Badge } from "@/components/ui";
import { Button } from "@/components/ui";
import { cn } from "@/lib";
import {
  Bell,
  ChevronRight,
  HelpCircle,
  LogOut,
  Search,
  User,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  CalendarIcon,
  ContactsIcon,
  DashboardIcon,
  DealsIcon,
  InboxIcon,
  LeadsIcon,
  MarketingIcon,
  ProfileArrowIcon,
  PropertiesIcon,
  ReportsIcon,
  SettingsIcon,
  TasksIcon,
  TeamIcon,
} from "../ui/icons";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  hasArrow?: boolean;
}

interface NavGroup {
  heading?: string;
  items: NavItem[];
}

const topItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <DashboardIcon size={15} />,
  },
];

const navGroups: NavGroup[] = [
  {
    heading: "CRM",
    items: [
      { label: "Inbox", href: "/inbox", icon: <InboxIcon size={15} /> },
      { label: "Leads", href: "/leads", icon: <LeadsIcon size={15} /> },
      { label: "Deals", href: "/deals", icon: <DealsIcon size={15} /> },
      {
        label: "Contacts",
        href: "/contacts",
        icon: <ContactsIcon size={15} />,
      },
      { label: "Tasks", href: "/Tasks-crm", icon: <TasksIcon size={15} /> },
      {
        label: "Calendar",
        href: "/calendar",
        icon: <CalendarIcon size={15} />,
      },
    ],
  },
  {
    heading: "Workspace",
    items: [
      {
        label: "Properties",
        href: "/properties",
        icon: <PropertiesIcon size={15} />,
        hasArrow: true,
      },
      {
        label: "Marketing",
        href: "/marketing",
        icon: <MarketingIcon size={15} />,
        hasArrow: true,
      },
      {
        label: "Reports",
        href: "/reports",
        icon: <ReportsIcon size={15} />,
        hasArrow: true,
      },
    ],
  },
];

const bottomItems: NavItem[] = [
  { label: "Team", href: "/team", icon: <TeamIcon size={15} /> },
  { label: "Settings", href: "/settings", icon: <SettingsIcon size={15} /> },
];

interface SidebarProps {
  mobileOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ mobileOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const [search, setSearch] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const profileBtnRef = useRef<HTMLButtonElement>(null);

  const handleProfileToggle = () => {
    if (profileOpen) {
      setDropdownVisible(false);
      setTimeout(() => setProfileOpen(false), 180);
    } else {
      setProfileOpen(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setDropdownVisible(true));
      });
    }
  };

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        profileBtnRef.current &&
        !profileBtnRef.current.contains(e.target as Node)
      ) {
        setDropdownVisible(false);
        setTimeout(() => setProfileOpen(false), 180);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 bg-black/50 z-30 sm:hidden transition-opacity duration-300",
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        )}
        onClick={onClose}
      />

      <aside
        className={cn(
          "fixed top-0 left-0 h-screen w-52 flex flex-col",
          "z-40 transition-transform duration-300 ease-in-out",
          "overflow-visible",
          mobileOpen
            ? "translate-x-0 bg-[var(--color-bg-muted)]"
            : "-translate-x-full sm:translate-x-0",
        )}
      >
        {/*  Profile */}
        <div className="px-3 pt-4 pb-3 relative">
          <button
            ref={profileBtnRef}
            onClick={handleProfileToggle}
            className="flex items-center gap-2.5 w-full rounded-lg px-2 py-1.5 transition-colors hover:bg-[var(--color-bg-subtle)]"
          >
            <Avatar size="md">
              <AvatarImage
                src="/assets/images/user-image.jpg"
                alt="Lina Rahman"
              />
              <AvatarFallback className="bg-[var(--color-brand-bg-default)] text-white">
                LR
              </AvatarFallback>
              <AvatarBadge className="w-5 h-5 p-0 overflow-hidden">
                <Image
                  src="/assets/images/atlas-estates.png"
                  alt="Atlas Estates"
                  width={14}
                  height={14}
                  className="w-full h-full object-cover"
                />
              </AvatarBadge>
            </Avatar>

            <div className="flex-1 min-w-0 text-left">
              <p className="text-[12px] font-semibold text-[var(--color-content-emphasis)] truncate leading-tight">
                Lina Rahman
              </p>
              <div className="flex items-center gap-1">
                <p className="text-[10px] text-[var(--color-content-muted)] truncate leading-tight">
                  Atlas Estates
                </p>
                <Badge variant="brand" className="text-[9px] h-4 px-1.5">
                  Pro
                </Badge>
              </div>
            </div>
            <ProfileArrowIcon
              size={13}
              className={cn(
                "text-[var(--color-content-muted)] shrink-0 transition-transform duration-200",
              )}
            />
          </button>

          {/* ── Dropdown overlay ── */}
          {profileOpen && (
            <div
              ref={dropdownRef}
              className={cn(
                "absolute top-20 z-50",
                "w-52 rounded-xl bg-[var(--color-bg-default)] overflow-hidden",
                "border border-[var(--color-border-subtle)]",
                "shadow-[0_8px_32px_rgba(0,0,0,0.10),0_2px_8px_rgba(0,0,0,0.06)]",
                "transition-all duration-[180ms] ",
                dropdownVisible
                  ? "opacity-100 scale-100 translate-y-0"
                  : "opacity-0 scale-95 -translate-y-1 pointer-events-none",
              )}
              style={{ transformOrigin: "top left" }}
            >
              {/* Company header */}
              <div className="flex items-center gap-2.5 px-3.5 py-3 border-b border-[var(--color-border-subtle)]">
                <div className="w-9 h-9 rounded-full overflow-hidden shrink-0 border border-[var(--color-border-subtle)]">
                  <Image
                    src="/assets/images/atlas-estates.png"
                    alt="Atlas Estates"
                    width={32}
                    height={32}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-[12.5px] font-semibold text-[var(--color-content-emphasis)] leading-tight">
                    Atlas Estates
                  </p>
                  <p className="text-[10.5px] text-[var(--color-content-muted)] leading-tight">
                    Business · 12 members
                  </p>
                </div>
              </div>

              {/* Online status */}
              <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-[var(--color-border-subtle)]">
                <div className="flex items-center gap-1.5 text-[12px] text-[var(--color-content-default)]">
                  <span className="w-2 h-2 rounded-full bg-green-500 shrink-0" />
                  Online
                </div>
                <Badge variant="success" className="uppercase tracking-wide">
                  Active
                </Badge>
              </div>

              {/* Menu items */}
              <div className="py-1">
                <button className="flex items-center gap-2.5 w-full px-3.5 py-2 text-[12.5px] text-[var(--color-content-default)] hover:bg-[var(--color-bg-subtle)] transition-colors text-left">
                  <User size={13} className="shrink-0" />
                  My Profile
                </button>
                <button className="flex items-center justify-between w-full px-3.5 py-2 text-[12.5px] text-[var(--color-content-default)] hover:bg-[var(--color-bg-subtle)] transition-colors text-left">
                  <span className="flex items-center gap-2.5">
                    <Bell size={13} className="shrink-0" />
                    Notifications
                  </span>
                  <Badge
                    variant="destructive"
                    className="w-[18px] h-[18px] px-0 rounded-full text-[9px]"
                  >
                    2
                  </Badge>
                </button>
                <button className="flex items-center gap-2.5 w-full px-3.5 py-2 text-[12.5px] text-[var(--color-content-default)] hover:bg-[var(--color-bg-subtle)] transition-colors text-left">
                  <HelpCircle size={13} className="shrink-0" />
                  Help & Support
                </button>
              </div>

              {/* Sign out — separated with border only */}
              <div className="border-t border-[var(--color-border-subtle)]">
                <button className="flex items-center gap-2.5 w-full px-3.5 py-2 text-[12.5px] text-[var(--color-content-default)] hover:bg-[var(--color-bg-subtle)] transition-colors text-left">
                  <LogOut size={13} className="shrink-0" />
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>

        {/*  Search  */}
        <div className="px-3 pb-2">
          <div className="flex items-center gap-2 px-2.5 py-1.5 bg-white rounded-lg border border-[var(--color-border-subtle)]">
            <Search
              size={12}
              className="text-[var(--color-content-muted)] shrink-0"
            />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-transparent text-[12px] text-[var(--color-content-default)] placeholder:text-[var(--color-content-muted)] outline-none min-w-0"
            />
            <span className="text-[10px] text-[var(--color-content-muted)] shrink-0 font-mono bg-white border  px-1 rounded">
              ⌘K
            </span>
          </div>
        </div>

        {/*  Nav  */}
        <nav className="flex-1 overflow-y-auto px-2 py-1 scrollbar-none">
          {topItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm mb-0.5",
                  active
                    ? "bg-[var(--color-brand-bg-subtle)] text-brand-700"
                    : "text-[var(--color-content-default)] hover:bg-[var(--color-bg-subtle)]",
                )}
              >
                <span
                  className={
                    active
                      ? "text-brand-700"
                      : "text-[var(--color-content-muted)]"
                  }
                >
                  {item.icon}
                </span>
                <span className="flex-1 font-medium">{item.label}</span>
              </Link>
            );
          })}

          {navGroups.map((group, i) => (
            <div key={i} className={i > 0 ? "mt-4" : "mt-3"}>
              {group.heading && (
                <p className="px-2.5 mb-1 text-[var(--color-content-subtle)] text-xs uppercase tracking-widest">
                  {group.heading}
                </p>
              )}
              {group.items.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      "flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] font-medium transition-colors mb-0.5",
                      active
                        ? "bg-[var(--color-content-default)] text-[var(--color-brand-bg-default)]"
                        : "text-[var(--color-content-default)] hover:bg-[var(--color-bg-subtle)]",
                    )}
                  >
                    <span
                      className={
                        active
                          ? "text-[var(--color-content-default)]"
                          : "text-[var(--color-content-muted)]"
                      }
                    >
                      {item.icon}
                    </span>
                    <span className="flex-1">{item.label}</span>
                    {item.hasArrow && (
                      <ChevronRight
                        size={12}
                        className={
                          active
                            ? "text-[var(--color-content-default)]"
                            : "text-[var(--color-content-muted)]"
                        }
                      />
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        <div className="px-2 py-3 border-t border-[var(--color-border-subtle)]">
          {bottomItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] font-medium transition-colors mb-0.5",
                  active
                    ? "bg-[var(--color-content-default)] text-[var(--color-brand-bg-default)]"
                    : "text-[var(--color-content-default)] hover:bg-[var(--color-bg-subtle)]",
                )}
              >
                <span
                  className={
                    active
                      ? "text-[var(--color-content-default)]"
                      : "text-[var(--color-content-muted)]"
                  }
                >
                  {item.icon}
                </span>
                {item.label}
              </Link>
            );
          })}
        </div>

        <Button
          variant="ghost"
          size="icon-sm"
          className="absolute top-3 right-3 sm:hidden"
          onClick={onClose}
        >
          <X size={14} />
        </Button>
      </aside>
    </>
  );
}
