
import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface PageLayoutProps {
  children: ReactNode;
  showFooter?: boolean;
}

const PageLayout = ({ children, showFooter = true }: PageLayoutProps) => {
  return (
    <div className="min-h-screen relative">
      {/* Updated background to match app branding */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[#FFCDB2]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(181,130,140,0.1),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,180,162,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(229,152,155,0.15),transparent_50%)]" />
        <div className="absolute inset-0 opacity-20">
          <div className="h-full w-full bg-[linear-gradient(45deg,transparent_40%,rgba(255,255,255,0.1)_50%,transparent_60%)] bg-[size:60px_60px]" />
        </div>
      </div>
      
      <Navbar />
      <main className="pt-16">
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  );
};

export default PageLayout;
