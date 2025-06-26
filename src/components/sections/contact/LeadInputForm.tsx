
import { Input } from "@/components/ui/input";

interface LeadInputFormProps {
  formData: {
    name: string;
    company: string;
    email: string;
    teamSize: string;
    message: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

const LeadInputForm = ({ formData, onChange }: LeadInputFormProps) => {
  const teamSizeOptions = [
    '2-10 employees',
    '11-50 employees', 
    '51-200 employees',
    '201-500 employees',
    '500+ employees'
  ];

  return (
    <>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          Full Name *
        </label>
        <Input
          id="name"
          name="name"
          type="text"
          required
          value={formData.name}
          onChange={onChange}
          className="border-[#FFB4A2] focus:ring-[#B5828C] focus:border-[#B5828C]"
          placeholder="Your full name"
        />
      </div>

      <div>
        <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
          Company Name *
        </label>
        <Input
          id="company"
          name="company"
          type="text"
          required
          value={formData.company}
          onChange={onChange}
          className="border-[#FFB4A2] focus:ring-[#B5828C] focus:border-[#B5828C]"
          placeholder="Your company name"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Work Email *
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={onChange}
          className="border-[#FFB4A2] focus:ring-[#B5828C] focus:border-[#B5828C]"
          placeholder="your.email@company.com"
        />
      </div>

      <div>
        <label htmlFor="teamSize" className="block text-sm font-medium text-gray-700 mb-2">
          Team Size *
        </label>
        <select
          id="teamSize"
          name="teamSize"
          required
          value={formData.teamSize}
          onChange={onChange}
          className="w-full px-3 py-2 border border-[#FFB4A2] rounded-md focus:ring-[#B5828C] focus:border-[#B5828C] bg-white"
        >
          <option value="">Select your team size</option>
          {teamSizeOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
          Tell us about your team challenges (optional)
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={onChange}
          className="w-full px-3 py-2 border border-[#FFB4A2] rounded-md focus:ring-[#B5828C] focus:border-[#B5828C] resize-none"
          placeholder="What team dynamics challenges are you facing? What would you like to see in the demo?"
        />
      </div>
    </>
  );
};

export default LeadInputForm;
