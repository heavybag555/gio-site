"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

const Footer = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isProjectPage = pathname.startsWith("/projects");
  const isHomePage = pathname === "/";
  const [showContact, setShowContact] = useState(false);

  useEffect(() => {
    if (!isHomePage) {
      setShowContact(false);
      return;
    }

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const scrollPercent = scrollTop / (docHeight - winHeight);
      
      // Show contact when user has scrolled to bottom 95%+
      setShowContact(scrollPercent > 0.95);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial state
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  return (
    <>
      {!isProjectPage && (
        <nav className="fixed bottom-[var(--pageInsetBottom)] w-full px-4 mix-blend-exclusion z-50">
          <div className="grid grid-cols-5 max-lg:grid-cols-2 items-end">
            {/* Column 1: Name */}
            <a
              href="https://www.instagram.com/yioyioyioyioyioyio/"
              target="_blank"
              rel="noopener noreferrer"
              className="normal-txt cursor-pointer select-none hover:text-gray-400 transition-colors col-span-1"
            >
              Giovanni Sotomayor
            </a>

            {/* Column 2: Empty (matches title column) */}
            <div className="col-span-1 max-lg:hidden" />

            {/* Column 3: Contact info */}
            <div 
              className={`col-span-1 flex flex-col gap-0 transition-all duration-500 max-lg:hidden ${
                showContact ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
              }`}
            >
              <span className="normal-txt">Contact</span>
              <a 
                href="mailto:gsotomayor1101@gmail.com" 
                className="normal-txt hover:text-gray-400 transition-colors"
              >
                gsotomayor1101@gmail.com
              </a>
              <a 
                href="tel:2014505446" 
                className="normal-txt hover:text-gray-400 transition-colors"
              >
                201.450.5446
              </a>
            </div>

            {/* Column 4: Empty (matches category column) */}
            <div className="col-span-1 max-lg:hidden" />

            {/* Column 5: Info link */}
            <a
              className="normal-txt cursor-pointer select-none hover:text-gray-400 transition-colors col-span-1 text-right max-lg:text-right"
              onClick={() => {
                router.push("/info");
              }}
            >
              Info
            </a>
          </div>
        </nav>
      )}
    </>
  );
};

export default Footer;
