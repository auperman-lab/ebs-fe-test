const Footer = () => {
  return (
    <footer className="bg-green-800 text-white py-6 mt-10 border-t shadow-inner">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-centre">
        <div className="text-sm">
          © {new Date().getFullYear()} Auperman Labs. All rights reserved.
        </div>
        <div className="flex space-x-4 mt-4 sm:mt-0">
          <a href="https://theuselessweb.com/"   target="_blank"className="hover:text-green-700 transition">Privacy Policy</a>
          <a href="https://theuselessweb.com/" target="_blank" className="hover:text-green-700 transition">Terms</a>
          <a href="mailto:macriidani@gmail.com" target="_blank" className="hover:text-green-700 transition">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
