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
    <footer className="bg-navy border-t border-white/[.06] pt-20 pb-8">
      <div className="container">
        <div className="responsive-override-exempt grid grid-cols-[2fr_1fr_1fr_1fr] max-md:grid-cols-[1fr_1fr] max-md:gap-8 gap-12 mb-16 max-md:mb-8">
          {/* Brand — spans full width on mobile */}
          <div className="max-md:col-span-2">
            <Link href="/" className="logo footer-logo" aria-label="Candron Energy Inc. — Home">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/logo.svg" alt="" className="logo-img" />
            </Link>
            <p className="text-[.85rem] text-white/50 leading-[1.85] mt-4 max-w-[300px]">
              Canadian-engineered power distribution equipment — designed,
              manufactured, assembled, and tested entirely in-house.
            </p>
            <div className="mt-7">
              {subscribed ? (
                <p className="text-blue-l text-[.82rem] font-semibold">
                  ✓ You&apos;re subscribed. Thanks!
                </p>
              ) : (
                <>
                  <p className="text-[.8rem] text-white/50 mb-3">Stay updated</p>
                  <form className="flex gap-2 max-sm:flex-col" onSubmit={handleSubscribe}>
                    <input
                      type="email"
                      placeholder="Your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      aria-label="Email address for newsletter"
                      className="flex-1 bg-white/[.07] border border-white/[.12] rounded-md py-[.6rem] px-4 text-white text-[.8rem] font-body outline-none transition-[border-color] duration-300 focus:border-blue max-sm:w-full"
                    />
                    <button
                      type="submit"
                      className="bg-blue border-0 rounded-md py-[.6rem] px-[1.1rem] text-white font-title text-[.72rem] font-bold tracking-[.05em] cursor-pointer transition-[background] duration-300 hover:bg-blue-h max-sm:w-full"
                    >
                      Subscribe
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>

          {/* Link columns — 3-col sub-grid on mobile */}
          <div className="max-md:col-span-2 responsive-override-exempt grid grid-cols-3 gap-6 max-md:gap-4">
            {/* Products */}
            <div>
              <h5 className="font-title text-[.72rem] font-bold tracking-[.16em] uppercase text-white mb-5 max-md:mb-3">Products</h5>
              <ul className="list-none flex flex-col gap-[.65rem] max-md:gap-2">
                <li><Link href="/products/switchgear" className="text-white/[.48] no-underline text-[.83rem] max-md:text-[.75rem] transition-colors duration-300 hover:text-blue-l">Switchgear</Link></li>
                <li><Link href="/products/switchboards" className="text-white/[.48] no-underline text-[.83rem] max-md:text-[.75rem] transition-colors duration-300 hover:text-blue-l">Switchboards</Link></li>
                <li><Link href="/products/control-panels" className="text-white/[.48] no-underline text-[.83rem] max-md:text-[.75rem] transition-colors duration-300 hover:text-blue-l">Control Panels</Link></li>
              </ul>
            </div>

            {/* Capabilities */}
            <div>
              <h5 className="font-title text-[.72rem] font-bold tracking-[.16em] uppercase text-white mb-5 max-md:mb-3">Capabilities</h5>
              <ul className="list-none flex flex-col gap-[.65rem] max-md:gap-2">
                <li><Link href="/manufacturing" className="text-white/[.48] no-underline text-[.83rem] max-md:text-[.75rem] transition-colors duration-300 hover:text-blue-l">Manufacturing</Link></li>
                <li><Link href="/testing" className="text-white/[.48] no-underline text-[.83rem] max-md:text-[.75rem] transition-colors duration-300 hover:text-blue-l">Testing</Link></li>
                <li><Link href="/commissioning" className="text-white/[.48] no-underline text-[.83rem] max-md:text-[.75rem] transition-colors duration-300 hover:text-blue-l">Commissioning</Link></li>
                <li><Link href="/about" className="text-white/[.48] no-underline text-[.83rem] max-md:text-[.75rem] transition-colors duration-300 hover:text-blue-l">About Us</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h5 className="font-title text-[.72rem] font-bold tracking-[.16em] uppercase text-white mb-5 max-md:mb-3">Contact</h5>
              <ul className="list-none flex flex-col gap-[.65rem] max-md:gap-2">
                <li><a href="tel:+16476162595" className="text-white/[.48] no-underline text-[.83rem] max-md:text-[.75rem] transition-colors duration-300 hover:text-blue-l">+1 (647) 616-2595</a></li>
                <li><a href="mailto:sales@candron.com" className="text-white/[.48] no-underline text-[.83rem] max-md:text-[.75rem] transition-colors duration-300 hover:text-blue-l">sales@candron.com</a></li>
                <li><Link href="/contact" className="text-white/[.48] no-underline text-[.83rem] max-md:text-[.75rem] transition-colors duration-300 hover:text-blue-l">Request a Quote</Link></li>
                <li>
                  <span className="text-[.8rem] max-md:text-[.7rem] text-gray leading-[1.5]">
                    Toronto, Ontario<br />Canada
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[.06] pt-8 flex justify-between items-center flex-wrap gap-4 max-sm:flex-col max-sm:gap-2 max-sm:text-center">
          <p className="font-mono text-[.63rem] text-white/[.28] tracking-[.04em]">
            © 2025 Candron Energy Inc. All rights reserved. Proudly Canadian.
          </p>
          <p className="font-mono text-[.63rem] text-white/[.28] tracking-[.04em]">
            Toronto, Ontario, Canada
          </p>
        </div>
      </div>
    </footer>
  );
}
