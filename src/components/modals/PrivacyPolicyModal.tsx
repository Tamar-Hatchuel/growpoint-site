
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface PrivacyPolicyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PrivacyPolicyModal = ({ open, onOpenChange }: PrivacyPolicyModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto brand-card">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#B5828C] mb-4">
            Privacy Policy
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 text-[#22223B]">
          <div>
            <h3 className="text-lg font-semibold text-[#B5828C] mb-3">Information We Collect</h3>
            <p className="leading-relaxed">
              GrowPoint collects information you provide directly to us, such as when you create an account, 
              participate in team surveys, or contact us for support. This may include your name, email address, 
              company information, and any team feedback or engagement data you submit.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[#B5828C] mb-3">How We Use Your Information</h3>
            <p className="leading-relaxed">
              We use the information we collect to deliver, maintain, and improve our services, communicate with you, 
              and personalize your team's experience on GrowPoint. Your feedback and engagement data remain private 
              and are never shared with third parties without your explicit consent.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[#B5828C] mb-3">Data Security</h3>
            <p className="leading-relaxed">
              We implement industry-standard technical and organizational measures to protect your personal and 
              company information against unauthorized access, alteration, disclosure, or destruction.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[#B5828C] mb-3">Your Rights</h3>
            <p className="leading-relaxed">
              You have the right to access, update, or delete your personal information at any time. You may also 
              request to export your data or close your account by contacting our support team.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[#B5828C] mb-3">Contact Us</h3>
            <p className="leading-relaxed">
              If you have questions about this Privacy Policy, please contact us at{" "}
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

export default PrivacyPolicyModal;
