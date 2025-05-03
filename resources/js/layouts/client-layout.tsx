import { type ReactNode } from 'react';

import Footer from "@/components/personalized/footer";
import NavHeader from '@/components/personalized/nav-header';
import FixedBottom from '@/components/personalized/fixed-bottom';
import { Toaster } from 'sonner';
import { useFlashToast } from '@/hooks/use-flash-toast';

export default function ClientLayout({ children }: { children: ReactNode }) {

  useFlashToast();

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center !bg-white">

      <Toaster
        className='!z-50'
        position={'top-right'}
        richColors />

      {/* Sticky Header */}
      <span className='fixed top-0 !z-40 w-full bg-black/50 backdrop-blur-sm mix-blend-difference'>
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
