
import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import ExitIntentPopup from '../ui/ExitIntentPopup';

interface PageLayoutProps {
  children: ReactNode;
  showFooter?: boolean;
}

const PageLayout = ({ children, showFooter = true }: PageLayoutProps) => {
  // Enable debug mode by checking URL params or localStorage
  const debugMode = new URLSearchParams(window.location.search).has('debug') || 
                   localStorage.getItem('popup-debug') === 'true';

  if (debugMode) {
    console.log('[PageLayout] Debug mode enabled for popups');
  }

  return (
    <div className="min-h-screen relative">
      {/* Hero background gradient matching the app */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFD6C9] to-[#FFFFFF]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(181,130,140,0.08),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,205,178,0.12),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(229,152,155,0.12),transparent_50%)]" />
        <div className="absolute inset-0 opacity-20">
          <div className="h-full w-full bg-[linear-gradient(45deg,transparent_40%,rgba(255,255,255,0.1)_50%,transparent_60%)] bg-[size:60px_60px]" />
        </div>
      </div>
      
      <Navbar />
      <main className="pt-16">
        {children}
      </main>
      {showFooter && <Footer />}
      
      <ExitIntentPopup debugMode={debugMode} />
      
      {debugMode && (
        <div className="fixed top-4 right-4 bg-green-500 text-white p-2 rounded text-xs z-50">
          🐛 DEBUG MODE ACTIVE<br/>
          Add ?debug to URL or set localStorage popup-debug=true
        </div>
      )}
    </div>
  );
};

export default PageLayout;
