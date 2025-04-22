import { type ReactNode } from 'react';

import Footer from "@/components/personalized/footer";
import NavHeader from '@/components/personalized/nav-header';
import FixedBottom from '@/components/personalized/fixed-bottom';

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center">

      {/* Sticky Header */}
      <span className='fixed top-0 z-50 w-full bg-black/50 backdrop-blur-sm border-b mix-blend-difference'>
        <NavHeader />
      </span>

      {/* Main scrollable area with extra bottom padding to reveal footer */}
      <main className="flex-grow w-full relative z-10">
        {children}
      </main>

      {/* Fixed bottom button (like floating CTA) */}
      <span className='fixed bottom-5 z-50 max-w-5xl mx-auto w-full mix-blend-difference'>
        <FixedBottom />
      </span>

      {/* Drawer-style Footer revealed on scroll */}
      <footer className="sticky bottom-0 w-full z-0">
        <Footer />
      </footer>
    </div>
  );
}
