'use client';

import React from 'react';
import Link from 'next/link';
import {
  Wrench,
  Zap,
  MonitorSmartphone,
  Snowflake,
  ShieldCheck,
  Home as HomeIcon
} from 'lucide-react';
import WhyChooseUsSection from './components/WhyChooseUsSection';
import HowWeWorkSection from './components/hww';
import TopOfHome from './components/TopHome';

export default function HomePage() {
  return (
    <div>
      {/* Top of Home Section containing services card*/}
      <TopOfHome />
      
      {/* Why Choose Us Section */}
      <WhyChooseUsSection />

      {/* How We Work Section */}
      <HowWeWorkSection />
    </div>
  );
}