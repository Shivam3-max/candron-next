"use client";
import { useState } from "react";
import Link from "next/link";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="bg-navy border-t border-white/[.06] pt-20 max-md:pt-12 pb-8">
      <div className="container">
        <div className="footer-top grid grid-cols-[2fr_3fr] max-md:grid-cols-1 gap-12 max-md:gap-8 mb-16 max-md:mb-8">
          {/* Brand */}
          <div>
            <Link href="/" className="logo footer-logo" aria-label="CANDRON Energy Inc. — Home">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/logo.svg" alt="" className="logo-img" />
            </Link>
            <p className="text-[1.0625rem] text-white/[.68] leading-[1.85] mt-4 max-w-[300px] max-md:max-w-none">
              CANDRON is a Toronto-based provider of Canadian-made electrical equipment: switchgear, switchboards, transformers, portable power skids and substations, and remote power and control panels — engineered to your project, factory-tested and delivered with shorter lead times.
            </p>
            <div className="mt-7">
              {subscribed ? (
                <p className="text-blue-l text-[1.0625rem] font-semibold">
                  ✓ You&apos;re subscribed. Thanks!
                </p>
              ) : (
                <>
                  <p className="text-[1.0625rem] text-white/[.68] leading-[1.6] mb-3">
                    Subscribe to our inventory list for product availability updates, industry insights, and company news.
                  </p>
                  <form className="flex gap-2 max-md:flex-col" onSubmit={handleSubscribe}>
                    <input
                      type="email"
                      placeholder="Your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      aria-label="Email address for newsletter"
                      className="flex-1 bg-white/[.07] border border-white/[.12] rounded-md py-[.6rem] px-4 text-white text-[1.0625rem] font-body outline-none transition-[border-color] duration-300 focus:border-blue max-md:w-full"
                    />
                    <button
                      type="submit"
                      className="bg-blue border-0 rounded-md py-[.6rem] px-[1.1rem] text-white font-title text-[.9375rem] font-bold tracking-[.05em] cursor-pointer transition-[background] duration-300 hover:bg-blue-h max-md:w-full"
                    >
                      Subscribe
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>

          {/* Link columns */}
          <div className="footer-link-grid grid grid-cols-3 gap-6 max-md:gap-4">
            {/* Products */}
            <div>
              <h5 className="font-title text-[.9375rem] font-bold tracking-[.16em] uppercase text-white mb-5 max-md:mb-3">Products</h5>
              <ul className="list-none flex flex-col gap-[.65rem] max-md:gap-2">
                {/* Inventory navigation is temporarily disabled. */}
                <li><Link href="/products/switchgear" className="text-white/[.48] no-underline text-[1.0625rem] max-md:text-[1rem] transition-colors duration-300 hover:text-blue-l">Switchgear</Link></li>
                <li><Link href="/products/lv-switchgear" className="text-white/[.48] no-underline text-[1.0625rem] max-md:text-[1rem] transition-colors duration-300 hover:text-blue-l">LV Switchgear</Link></li>
                <li><Link href="/products/switchboards" className="text-white/[.48] no-underline text-[1.0625rem] max-md:text-[1rem] transition-colors duration-300 hover:text-blue-l">Switchboards</Link></li>
                <li><Link href="/products/transformers" className="text-white/[.48] no-underline text-[1.0625rem] max-md:text-[1rem] transition-colors duration-300 hover:text-blue-l">Transformers</Link></li>
                <li><Link href="/products/transformers/liquid-filled" className="text-white/[.48] no-underline text-[1.0625rem] max-md:text-[1rem] transition-colors duration-300 hover:text-blue-l">Liquid-Filled Transformers</Link></li>
                <li><Link href="/products/control-panels" className="text-white/[.48] no-underline text-[1.0625rem] max-md:text-[1rem] transition-colors duration-300 hover:text-blue-l">Control Panels</Link></li>
                <li><Link href="/products/integrated-power" className="text-white/[.48] no-underline text-[1.0625rem] max-md:text-[1rem] transition-colors duration-300 hover:text-blue-l">Integrated Power</Link></li>
                <li><Link href="/products/load-banks" className="text-white/[.48] no-underline text-[1.0625rem] max-md:text-[1rem] transition-colors duration-300 hover:text-blue-l">Load Banks</Link></li>
                <li><Link href="/products/remote-power-panels" className="text-white/[.48] no-underline text-[1.0625rem] max-md:text-[1rem] transition-colors duration-300 hover:text-blue-l">Remote Power Panels</Link></li>
                <li><Link href="/products/power-distribution-units" className="text-white/[.48] no-underline text-[1.0625rem] max-md:text-[1rem] transition-colors duration-300 hover:text-blue-l">Power Distribution Units</Link></li>
              </ul>
            </div>

            {/* Capabilities */}
            <div>
              <h5 className="font-title text-[.9375rem] font-bold tracking-[.16em] uppercase text-white mb-5 max-md:mb-3">Capabilities</h5>
              <ul className="list-none flex flex-col gap-[.65rem] max-md:gap-2">
                <li><Link href="/services" className="text-white/[.48] no-underline text-[1.0625rem] max-md:text-[1rem] transition-colors duration-300 hover:text-blue-l">Electrical Engineering Services</Link></li>
                <li><Link href="/commissioning" className="text-white/[.48] no-underline text-[1.0625rem] max-md:text-[1rem] transition-colors duration-300 hover:text-blue-l">Field Service &amp; Commissioning</Link></li>
                <li><Link href="/manufacturing"className="text-white/[.48] no-underline text-[1.0625rem] max-md:text-[1rem] transition-colors duration-300 hover:text-blue-l">Canadian-Made</Link></li>
                <li><Link href="/testing" className="text-white/[.48] no-underline text-[1.0625rem] max-md:text-[1rem] transition-colors duration-300 hover:text-blue-l">Testing</Link></li>
                <li><Link href="/project-process" className="text-white/[.48] no-underline text-[1.0625rem] max-md:text-[1rem] transition-colors duration-300 hover:text-blue-l">CANDRON Processes</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div className="footer-link-contact">
              <h5 className="font-title text-[.9375rem] font-bold tracking-[.16em] uppercase text-white mb-5 max-md:mb-3">Contact</h5>
              <ul className="list-none flex flex-col gap-[.65rem] max-md:gap-2">
                <li><a href="tel:+16476162595" className="text-white/[.48] no-underline text-[1.0625rem] max-md:text-[1rem] transition-colors duration-300 hover:text-blue-l">+1 (647) 616-2595</a></li>
                <li><a href="mailto:sales@candron.com" className="text-white/[.48] no-underline text-[1.0625rem] max-md:text-[1rem] transition-colors duration-300 hover:text-blue-l">sales@candron.com</a></li>
                <li><Link href="/contact" className="text-white/[.48] no-underline text-[1.0625rem] max-md:text-[1rem] transition-colors duration-300 hover:text-blue-l">Request a Quote</Link></li>
                <li>
                  <span className="text-[1.0625rem] max-md:text-[.9375rem] text-gray leading-[1.5]">
                    Toronto, Ontario<br />Canada
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[.06] pt-8 flex justify-between items-center flex-wrap gap-4 max-md:flex-col max-md:gap-2 max-md:text-center">
          <p className="font-mono text-[.875rem] text-white/[.28] tracking-[.04em]">
            © 2025 CANDRON Energy Inc. All rights reserved. Proudly Canadian.
          </p>
          <p className="font-mono text-[.875rem] text-white/[.28] tracking-[.04em]">
            Toronto, Ontario, Canada
          </p>
        </div>
      </div>
    </footer>
  );
}
