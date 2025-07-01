
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface TermsOfServiceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const TermsOfServiceModal = ({ open, onOpenChange }: TermsOfServiceModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto brand-card">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#B5828C] mb-4">
            Terms of Service
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 text-[#22223B]">
          <div>
            <h3 className="text-lg font-semibold text-[#B5828C] mb-3">Acceptance of Terms</h3>
            <p className="leading-relaxed">
              By accessing and using GrowPoint, you accept and agree to be bound by these Terms of Service. 
              These terms apply to all users of the service.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[#B5828C] mb-3">Use of Service</h3>
            <p className="leading-relaxed">
              GrowPoint is provided for team engagement and organizational analytics purposes. You agree to use 
              the service only for lawful purposes and in accordance with these terms. You are responsible for 
              maintaining the confidentiality of your account and any data you submit.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[#B5828C] mb-3">Disclaimer</h3>
            <p className="leading-relaxed">
              GrowPoint is designed to support team development and provide engagement insights. It is not a 
              substitute for professional consulting, legal, or HR advice. For organizational or personnel 
              matters, please consult with relevant professionals.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[#B5828C] mb-3">User Content</h3>
            <p className="leading-relaxed">
              You retain ownership of any content or feedback you submit to GrowPoint. By submitting content, 
              you grant us a limited license to use, store, and display your content solely for the purpose 
              of providing and improving the service.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[#B5828C] mb-3">Limitation of Liability</h3>
            <p className="leading-relaxed">
              GrowPoint provides the service "as is" without warranty of any kind. We are not liable for any 
              indirect, incidental, or consequential damages arising from your use of the service.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[#B5828C] mb-3">Contact Information</h3>
            <p className="leading-relaxed">
              Questions about these Terms of Service should be sent to us at{" "}
              <a href="mailto:GrowPointSales@gmail.com" className="text-[#E5989B] hover:underline">
                GrowPointSales@gmail.com
              </a>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TermsOfServiceModal;
