import { Shield } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-borderLight dark:border-gray-700 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Shield size={22} className="text-primary" />
            <span className="font-heading font-semibold text-textDark dark:text-white">
              KSP AI Crime Analytics
            </span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Intelligent Crime Analytics & Conversational AI Platform for Karnataka State Police.
          </p>
        </div>

        <div>
          <h4 className="font-heading font-semibold text-sm text-textDark dark:text-white mb-3">
            Government Links
          </h4>
          <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
            <li>Contact Us</li>
          </ul>
        </div>

        <div>
          <h4 className="font-heading font-semibold text-sm text-textDark dark:text-white mb-3">
            Emergency Numbers
          </h4>
          <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
            <li>Police: 100</li>
            <li>Women Helpline: 1091</li>
            <li>Cyber Crime: 1930</li>
          </ul>
        </div>

        <div>
          <h4 className="font-heading font-semibold text-sm text-textDark dark:text-white mb-3">
            Platform
          </h4>
          <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
            <li>Version 1.0.0 (Hackathon Build)</li>
            <li>© {new Date().getFullYear()} Karnataka State Police</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;