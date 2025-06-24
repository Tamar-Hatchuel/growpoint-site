
import PageLayout from "@/components/layout/PageLayout";
import ContactForm from "@/components/sections/ContactForm";

const Contact = () => {
  return (
    <PageLayout>
      <div className="py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-[#B5828C] mb-6">Request a Demo</h1>
          <p className="text-xl text-[#B5828C] max-w-2xl mx-auto">
            Get a personalized demonstration of how GrowPoint can transform your team dynamics and boost collaboration.
          </p>
        </div>

        <ContactForm />
      </div>
    </PageLayout>
  );
};

export default Contact;
