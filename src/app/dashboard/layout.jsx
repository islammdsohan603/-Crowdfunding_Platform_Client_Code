'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
  Bell,
  CreditCard,
  FileClock,
  Flag,
  Home,
  LayoutDashboard,
  ListChecks,
  Megaphone,
  PlusCircle,
  Receipt,
  Users,
  Wallet,
} from 'lucide-react';
import { useSession } from '@/lib/auth-client';
import { apiRequest, createAccessToken } from '@/lib/api';

const navByRole = {
  Supporter: [
    { href: '/dashboard/supporter-home', label: 'Home', icon: Home },
    { href: '/explors', label: 'Explore Campaigns', icon: Megaphone },
    { href: '/dashboard/my-contributions', label: 'My Contributions', icon: ListChecks },
    { href: '/dashboard/purchase-credit', label: 'Purchase Credit', icon: CreditCard },
    { href: '/dashboard/payment-history', label: 'Payment History', icon: Receipt },
  ],
  Creator: [
    { href: '/dashboard/creator-home', label: 'Home', icon: Home },
    { href: '/dashboard/add-campaign', label: 'Add New Campaign', icon: PlusCircle },
    { href: '/dashboard/my-campaigns', label: 'My Campaigns', icon: Megaphone },
    { href: '/dashboard/withdrawals', label: 'Withdrawals', icon: Wallet },
    { href: '/dashboard/payment-history', label: 'Payment History', icon: Receipt },
  ],
  Admin: [
    { href: '/dashboard/admin-home', label: 'Home', icon: Home },
    { href: '/dashboard/manage-users', label: 'Manage Users', icon: Users },
    { href: '/dashboard/manage-campaigns', label: 'Manage Campaigns', icon: Megaphone },
    { href: '/dashboard/withdrawal-requests', label: 'Withdrawal Requests', icon: FileClock },
    { href: '/dashboard/reports', label: 'Reports', icon: Flag },
  ],
};

const DashboardLayout = ({ children }) => {
  const { data: session, isPending } = useSession();
  const [profile, setProfile] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [openNotifications, setOpenNotifications] = useState(false);
  const popoverRef = useRef(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const loadProfile = async () => {
      if (!session?.user?.email) return;
      await createAccessToken(session.user.email);
      await apiRequest('/api/users/register', {
        method: 'POST',
        body: JSON.stringify({
          displayName: session.user.name,
          email: session.user.email,
          photoURL: session.user.image,
          role: 'Supporter',
        }),
      });
      const result = await apiRequest('/api/users/me');
      setProfile(result.data);
    };

    loadProfile().catch(() => router.push('/login'));
  }, [router, session?.user?.email, session?.user?.image, session?.user?.name]);

  useEffect(() => {
    const handleClick = event => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setOpenNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const loadNotifications = async () => {
    const result = await apiRequest('/api/notifications');
    setNotifications(result.data || []);
    setOpenNotifications(prev => !prev);
  };

  if (isPending || !profile) {
    return (
      <div className="min-h-screen bg-[#0b0f1a] flex justify-center items-center pt-24">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const navItems = navByRole[profile.role] || navByRole.Supporter;

  return (
    <div className="min-h-screen bg-[#0b0f1a] pt-24 text-white">
      <div className="mx-auto grid w-11/12 max-w-7xl grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
        <aside className="h-fit rounded-2xl border border-gray-800 bg-[#12141d] p-5 lg:sticky lg:top-28">
          <div className="mb-6 flex items-center gap-3 border-b border-gray-800 pb-5">
            <Image
              src={profile.photoURL || session?.user?.image || `https://ui-avatars.com/api/?name=${profile.displayName}`}
              alt={profile.displayName}
              width={48}
              height={48}
              className="rounded-full object-cover"
            />
            <div className="min-w-0">
              <p className="truncate font-bold">{profile.displayName}</p>
              <p className="text-sm text-blue-400">{profile.role}</p>
              <p className="text-xs text-emerald-400">{profile.credits} credits</p>
            </div>
          </div>

          <nav className="space-y-2">
            <Link
              href="/dashboard"
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                pathname === '/dashboard' ? 'bg-blue-600/15 text-blue-300' : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              <LayoutDashboard size={18} />
              Dashboard
            </Link>
            {navItems.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                  pathname === href ? 'bg-blue-600/15 text-blue-300' : 'text-gray-300 hover:bg-gray-800'
                }`}
              >
                <Icon size={18} />
                {label}
              </Link>
            ))}
          </nav>
        </aside>

        <section className="min-w-0 pb-12">
          <div className="mb-6 flex items-center justify-between rounded-2xl border border-gray-800 bg-[#12141d] p-4">
            <div>
              <p className="text-sm text-gray-400">Available Credits</p>
              <p className="text-2xl font-bold text-emerald-400">{profile.credits}</p>
            </div>
            <div ref={popoverRef} className="relative">
              <button
                onClick={loadNotifications}
                className="relative rounded-xl border border-gray-700 p-3 text-gray-200 hover:bg-gray-800"
              >
                <Bell size={20} />
                {notifications.some(item => !item.read) && (
                  <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-emerald-400" />
                )}
              </button>
              {openNotifications && (
                <div className="absolute right-0 z-30 mt-3 w-80 rounded-2xl border border-gray-800 bg-[#0B0F19] p-4 shadow-2xl">
                  <h3 className="mb-3 font-bold">Notifications</h3>
                  <div className="max-h-80 space-y-3 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <p className="text-sm text-gray-400">No notifications yet.</p>
                    ) : (
                      notifications.map(item => (
                        <Link
                          key={item._id}
                          href={item.actionRoute || '/dashboard'}
                          className="block rounded-xl bg-[#12141d] p-3 text-sm text-gray-300 hover:text-white"
                        >
                          {item.message}
                        </Link>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          {children}
        </section>
      </div>
    </div>
  );
};

export default DashboardLayout;
