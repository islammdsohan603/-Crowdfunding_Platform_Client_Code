"use client";

import React from "react";
import { authClient, useSession } from "@/lib/auth-client";
import { motion } from "framer-motion";
import {
  FiMail,
  FiCalendar,
  FiShield,
  FiUser,
  FiLoader,
  FiLogOut,
} from "react-icons/fi";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("Logged out successfully!");
            router.push("/login");
          },
        },
      });
    } catch (err) {
      toast.error("Failed to logout!");
    }
  };

  // লোডিং স্টেট হ্যান্ডেল করা
  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0B0F19] text-white">
        <FiLoader className="animate-spin text-4xl text-blue-500" />
      </div>
    );
  }

  // যদি সেশন না থাকে
  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0B0F19] text-white">
        <p>Please login to view your profile.</p>
      </div>
    );
  }

  const { user } = session;

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg bg-[#111827] p-8 rounded-3xl border border-white/10 shadow-2xl"
      >
        {/* Profile Header */}
        <div className="flex flex-col items-center">
          <motion.img
            whileHover={{ scale: 1.05 }}
            src={user.image || "https://ui-avatars.com/api/?name=" + user.name}
            alt={user.name}
            className="w-32 h-32 rounded-full border-4 border-blue-600 mb-4 object-cover"
          />
          <h1 className="text-3xl font-bold capitalize">{user.name}</h1>
          <p className="text-gray-400 text-sm break-all">{user.id}</p>
        </div>

        {/* Profile Details */}
        <div className="mt-8 space-y-4">
          <div className="flex items-center gap-4 bg-[#1F2937] p-4 rounded-xl">
            <FiMail className="text-blue-500 text-xl" />
            <div>
              <p className="text-xs text-gray-400">Email Address</p>
              <p>{user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-[#1F2937] p-4 rounded-xl">
            <FiShield
              className={`text-xl ${user.emailVerified ? "text-green-500" : "text-yellow-500"}`}
            />
            <div>
              <p className="text-xs text-gray-400">Account Status</p>
              <p>{user.emailVerified ? "Verified" : "Not Verified"}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-[#1F2937] p-4 rounded-xl">
            <FiCalendar className="text-blue-500 text-xl" />
            <div>
              <p className="text-xs text-gray-400">Member Since</p>
              <p>
                {user.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 mt-8">
          <button className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 py-3 rounded-xl font-bold transition-all">
            Edit Profile
          </button>

          <button
            onClick={handleSignOut}
            className="w-full flex cursor-pointer items-center justify-center gap-2 bg-transparent border border-red-500/30 hover:bg-red-500/10 text-red-400 py-3 rounded-xl font-bold transition-all"
          >
            <FiLogOut /> Logout
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfilePage;
