import Footer from "@/components/personalized/footer";
import NavHeader from '@/components/personalized/nav-header';
import FixedBottom from '@/components/personalized/fixed-bottom';
import { Toaster } from 'sonner';
import { useFlashToast } from '@/hooks/use-flash-toast';
import CustomCursor from '@/components/personalized/custom-cursor';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  useFlashToast();

  return (
    <div className="min-h-screen !scroll-smooth flex flex-col items-center justify-center !bg-white">

      {/* Main scrollable area */}
      <main className="flex-grow w-full relative z-10">
        <CustomCursor />

        {/* notification toaster */}
        <Toaster className='!z-50' position="top-right" richColors />

        {/* nav bar */}
        <span className='fixed top-0 !z-40 w-full bg-black/50 backdrop-blur-sm mix-blend-difference'>
          <NavHeader />
        </span>

        {children}

        {/* Footer */}
        <footer className="sticky bottom-0 w-full -z-10">
          <Footer />
        </footer>
      </main>

      {/* Fixed bottom CTA */}
      <span className='fixed bottom-5 z-50 max-w-7xl mx-auto w-full mix-blend-difference'>
        <FixedBottom />
      </span>


    </div>
  );
}
