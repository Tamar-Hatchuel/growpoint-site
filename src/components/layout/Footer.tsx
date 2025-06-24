
const Footer = () => {
  return (
    <footer className="mt-20 pt-8 border-t border-[#E5989B]/30">
      <div className="text-center text-[#B5828C]">
        <p className="mb-4">© 2024 GrowPoint. All rights reserved.</p>
        <div className="flex justify-center space-x-6 text-sm">
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Terms of Service</a>
          <a href="/contact" className="hover:underline">Contact</a>
          <a href="#" className="hover:underline">Support</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
