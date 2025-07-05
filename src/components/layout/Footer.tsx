import { useState } from "react";
import PrivacyPolicyModal from "@/components/modals/PrivacyPolicyModal";
import TermsOfServiceModal from "@/components/modals/TermsOfServiceModal";
const Footer = () => {
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [termsModalOpen, setTermsModalOpen] = useState(false);
  return <>
      <footer className="mt-20 pt-8 border-t border-[#E5989B]/30">
        <div className="text-center text-[#B5828C]">
          <p className="mb-4">© 2025 GrowPoint. All rights reserved.</p>
          <div className="flex justify-center space-x-6 text-sm">
            <button onClick={() => setPrivacyModalOpen(true)} className="hover:underline hover:text-[#E5989B] transition-colors cursor-pointer">
              Privacy Policy
            </button>
            <button onClick={() => setTermsModalOpen(true)} className="hover:underline hover:text-[#E5989B] transition-colors cursor-pointer">
              Terms of Service
            </button>
            <a href="/contact" className="hover:underline hover:text-[#E5989B] transition-colors">Contact</a>
          </div>
        </div>
      </footer>

      <PrivacyPolicyModal open={privacyModalOpen} onOpenChange={setPrivacyModalOpen} />
      
      <TermsOfServiceModal open={termsModalOpen} onOpenChange={setTermsModalOpen} />
    </>;
};
export default Footer;