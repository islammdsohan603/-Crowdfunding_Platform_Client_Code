'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Code2,
  GitBranch,
  Rocket,
  ShieldCheck,
  Sparkles,
  Users,
  Workflow,
} from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: 'easeOut' },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14 },
  },
};

const benefits = [
  {
    icon: Code2,
    title: 'Campaign-ready tools',
    description:
      'Shape launch pages, funding flows, and supporter journeys with a platform built for real project momentum.',
  },
  {
    icon: ShieldCheck,
    title: 'Transparent funding',
    description:
      'Help creators earn trust with clear progress, credit-based backing, and visible campaign milestones.',
  },
  {
    icon: Users,
    title: 'Community growth',
    description:
      'Connect projects with supporters who care about startups, education, health, environment, and local impact.',
  },
  {
    icon: BarChart3,
    title: 'Impact tracking',
    description:
      'Turn campaign activity into simple signals creators can use to improve updates and keep backers engaged.',
  },
];

const steps = [
  {
    icon: CheckCircle2,
    title: 'Create your account',
    description:
      'Join Momentum and set up the profile you will use to build, support, and manage campaign activity.',
  },
  {
    icon: Rocket,
    title: 'Build or launch',
    description:
      'Create a campaign experience with goals, story, rewards, and the details supporters need to act.',
  },
  {
    icon: Workflow,
    title: 'Grow with supporters',
    description:
      'Track progress, share updates, and keep the community moving with transparent funding momentum.',
  },
];

const codeLines = [
  'const campaign = createMomentumProject({',
  "  category: 'Technology',",
  "  goal: '50,000 credits',",
  "  status: 'ready-to-launch',",
  '});',
];

const JoinDeveloperPage = () => {
  return (
    <main className="min-h-screen bg-[#0b0f1a] pt-28 font-sans text-white overflow-hidden">
      <section className="relative px-6 pb-20 pt-10 md:px-10 lg:pb-28">
        <div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-blue-700/10 blur-3xl" />
        <div className="absolute bottom-8 right-10 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />

        <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_0.9fr]">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="max-w-3xl"
          >
            <motion.div
              variants={fadeUp}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-[#12141d]/80 px-5 py-2 text-sm font-semibold text-[#38BDF8] shadow-[0_0_20px_rgba(56,189,248,0.12)]"
            >
              <Sparkles size={16} />
              Developer community for crowdfunding builders
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-4xl font-extrabold leading-tight tracking-tight text-white md:text-6xl lg:text-7xl"
            >
              Build the Future of{' '}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-emerald-400">
                Momentum
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-2xl text-base leading-relaxed text-gray-400 md:text-lg"
            >
              Join Momentum&apos;s creator and developer community to launch
              stronger crowdfunding experiences, scale project support, and
              bring transparent impact stories to life.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-9 flex flex-col gap-4 sm:flex-row"
            >
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-3 rounded-xl bg-blue-600 px-7 py-4 font-semibold text-white shadow-[0_0_24px_rgba(37,99,235,0.28)] transition-all duration-300 hover:-translate-y-1 hover:bg-blue-500"
              >
                Join Momentum
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/explors"
                className="inline-flex items-center justify-center gap-3 rounded-xl border border-gray-700 bg-[#12141d]/80 px-7 py-4 font-semibold text-gray-200 transition-all duration-300 hover:-translate-y-1 hover:border-gray-500 hover:bg-gray-800/70"
              >
                Explore Campaigns
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94, x: 24 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: 'easeOut' }}
            className="relative min-h-[460px]"
          >
            <div className="absolute inset-0 rounded-[2rem] border border-white/10 bg-[#12141d]/70 shadow-[0_20px_80px_rgba(0,0,0,0.38)] backdrop-blur-xl" />
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute left-5 right-5 top-6 rounded-2xl border border-gray-800 bg-[#0B0F19]/90 p-5"
            >
              <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-400" />
                  <span className="h-3 w-3 rounded-full bg-yellow-400" />
                  <span className="h-3 w-3 rounded-full bg-emerald-400" />
                </div>
                <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-300">
                  Live build
                </span>
              </div>
              <div className="space-y-3 font-mono text-sm text-slate-300">
                {codeLines.map((line, index) => (
                  <motion.div
                    key={line}
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.15, duration: 0.45 }}
                    className="rounded-lg bg-white/[0.03] px-3 py-2"
                  >
                    {line}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 14, 0] }}
              transition={{ duration: 4.6, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute bottom-7 left-6 right-6 rounded-2xl border border-white/10 bg-[#0B0F19]/90 p-5 shadow-2xl"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm font-bold uppercase tracking-widest text-blue-400">
                  Support formation
                </span>
                <span className="text-sm font-semibold text-white">
                  78% Ready
                </span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-gray-800">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '78%' }}
                  transition={{ duration: 1.8, delay: 1, ease: 'easeOut' }}
                  className="h-full rounded-full bg-linear-to-r from-blue-600 to-emerald-400"
                />
              </div>
            </motion.div>

            {[
              { label: 'API', className: 'left-2 top-48' },
              { label: 'UI', className: 'right-4 top-52' },
              { label: 'Impact', className: 'left-16 bottom-36' },
              { label: 'Credits', className: 'right-16 bottom-32' },
            ].map(node => (
              <motion.div
                key={node.label}
                animate={{ scale: [1, 1.08, 1], opacity: [0.72, 1, 0.72] }}
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className={`absolute ${node.className} rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-2 text-xs font-bold text-blue-200 backdrop-blur-md`}
              >
                {node.label}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="bg-[#0B0F19] px-6 py-20 md:px-10">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="mb-12 max-w-2xl"
          >
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              Tools for creators who move ideas forward
            </h2>
            <p className="mt-4 text-gray-400">
              Build inside the same Momentum ecosystem that powers campaigns,
              supporters, credits, and measurable project growth.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
          >
            {benefits.map(({ icon: Icon, title, description }) => (
              <motion.article
                key={title}
                variants={fadeUp}
                whileHover={{ y: -8 }}
                className="group rounded-2xl border border-gray-800 bg-[#12141d]/80 p-6 shadow-[0_8px_30px_rgba(0,0,0,0.25)] transition-colors duration-300 hover:border-blue-500/40"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400 transition-transform duration-300 group-hover:scale-110">
                  <Icon size={26} />
                </div>
                <h3 className="mb-3 text-xl font-bold text-white">{title}</h3>
                <p className="text-sm leading-relaxed text-gray-400">
                  {description}
                </p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="px-6 py-20 md:px-10">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65 }}
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm font-semibold text-emerald-300">
              <GitBranch size={16} />
              From account to impact
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              A simple path from builder to campaign growth
            </h2>
            <p className="mt-5 text-gray-400">
              Momentum keeps the journey clear: join the platform, build a
              campaign experience, and grow it with supporters who believe in
              the outcome.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-5"
          >
            {steps.map(({ icon: Icon, title, description }, index) => (
              <motion.article
                key={title}
                variants={fadeUp}
                className="flex gap-5 rounded-2xl border border-gray-800 bg-[#12141d]/80 p-6 shadow-lg"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400">
                  <Icon size={25} />
                </div>
                <div>
                  <p className="mb-1 text-sm font-bold uppercase tracking-widest text-blue-400">
                    Step {index + 1}
                  </p>
                  <h3 className="text-xl font-bold text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-400">
                    {description}
                  </p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="px-6 pb-24 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-gray-800 bg-linear-to-br from-[#12141d] to-[#0B0F19] p-8 text-center shadow-2xl md:p-14"
        >
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
            Start building with Momentum today
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-gray-400">
            Join the community helping creators launch better campaigns, earn
            support with clarity, and turn funding into visible impact.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center gap-3 rounded-xl bg-blue-600 px-7 py-4 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-blue-500"
            >
              Create Account
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center gap-3 rounded-xl border border-gray-700 px-7 py-4 font-semibold text-gray-200 transition-all duration-300 hover:-translate-y-1 hover:border-gray-500 hover:bg-gray-800/50"
            >
              Open Dashboard
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
};

export default JoinDeveloperPage;
