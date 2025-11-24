import React from 'react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  const footerLinks = [
    { label: "About Us", path: "/about-us" },
    { label: "Privacy Policy", path: "/privacy-policy" },
    { label: "Terms & Conditions", path: "/terms-conditions" },
    { label: "Return Policy – Physical Damage During Shipping", path: "/return-policy" }, 
    { label: "Refund Policy ", path: "/refund-policy" }, 
    { label: "Exchange Policy – Technical Issues Under Warranty", path: "/exchange-policy" },
    { label: "Exclusions", path: "/exclusions" },
    { label: "How to Reach Us", path: "/contact-us" },
    { label: "Important Notes", path: "/important-notes" },
  ];

  return (
    <footer className="mt-auto bg-gray-900 w-full text-white">
      <div className="w-full max-w-7xl py-10 px-4 sm:px-6 lg:px-8 mx-auto">
        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1 - Brand Info */}
          <div>
            <span
              className="text-2xl font-extrabold tracking-wide cursor-pointer inline-block mb-4"
              tabIndex={0}
              role="button"
              onClick={() => navigate('/')}
              onKeyDown={(e) => e.key === 'Enter' && navigate('/')}
              aria-label="OVENIA Pvt Ltd Home"
            >
              OVENIA Pvt Ltd
            </span>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Bringing innovative kitchen gadgets and tech to your home. Modernize your daily life with our carefully curated products.
            </p>
            {/* Social Media (optional) */}
            {/* <div className="flex space-x-4 mt-2">
              <a href="#" className="text-gray-400 hover:text-white transition" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
            </div> */}
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <div className="space-y-3">
              {footerLinks.slice(0, 4).map(link => (
                <span
                  key={link.label}
                  tabIndex={0}
                  role="button"
                  className="block text-gray-400 hover:text-yellow-400 cursor-pointer transition"
                  onClick={() => navigate(link.path)}
                  onKeyDown={(e) => e.key === 'Enter' && navigate(link.path)}
                >
                  {link.label}
                </span>
              ))}
            </div>
          </div>

          {/* Column 3 - Legal/Support */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Legal & Support</h3>
            <div className="space-y-3">
              {footerLinks.slice(4).map(link => (
                <span
                  key={link.label}
                  tabIndex={0}
                  role="button"
                  className="block text-gray-400 hover:text-yellow-400 cursor-pointer transition"
                  onClick={() => navigate(link.path)}
                  onKeyDown={(e) => e.key === 'Enter' && navigate(link.path)}
                >
                  {link.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          <div>
            © {new Date().getFullYear()} OVENIA Pvt Ltd. All rights reserved.
          </div>
          <div className="flex space-x-3 mt-2 md:mt-0">
            {/* Optional: more footer links or social icons */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;