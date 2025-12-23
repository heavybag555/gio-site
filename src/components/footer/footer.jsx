"use client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const Footer = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isProjectPage = pathname.startsWith("/projects");

  return (
    <>
      {!isProjectPage && (
        <nav className="fixed bottom-[var(--pageInsetBottom)] w-full px-4 flex items-center justify-between mix-blend-exclusion z-50">
          <a
            className="normal-txt cursor-pointer select-none hover:text-gray-400 transition-colors"
            onClick={() => {
              router.push("/");
            }}
          >
            Giovanni Sotomayor
          </a>
          <a
            className="normal-txt cursor-pointer select-none hover:text-gray-400 transition-colors"
            onClick={() => {
              router.push("/info");
            }}
          >
            Info
          </a>
        </nav>
      )}
    </>
  );
};

export default Footer;
