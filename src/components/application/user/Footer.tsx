"use client"
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import ApplicationLogo from "../common/ApplicationLogo";

function Footer() {
    return (
        <footer className="bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-10">
            <div className="px-6 md:px-20 grid md:grid-cols-4 sm:grid-cols-2 gap-8 md:gap-20">

                {/* Branding */}
                <div>
                    <ApplicationLogo />
                    <p className="text-sm mt-3 leading-relaxed">
                        Learn Web helps you master modern web development through practical projects and hands-on training.
                    </p>
                    <div className="flex mt-4 space-x-3 text-gray-500">
                        {/* <a href="#"><FaFacebookF className="hover:text-blue-600 transition" /></a>
                        <a href="#"><FaInstagram className="hover:text-pink-500 transition" /></a>
                        <a href="#"><FaTwitter className="hover:text-blue-400 transition" /></a>
                        <a href="#"><FaLinkedinIn className="hover:text-blue-700 transition" /></a> */}
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-black dark:text-white text-lg font-semibold mb-4">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link href={"/"} className="hover:text-black dark:hover:text-white transition">Home</Link></li>
                        <li><Link href={"/about"} className="hover:text-black dark:hover:text-white transition">About</Link></li>
                        <li><Link href={"/products"} className="hover:text-black dark:hover:text-white transition">Products</Link></li>
                        <li><Link href={"/categories"} className="hover:text-black dark:hover:text-white transition">Categories</Link></li>
                    </ul>
                </div>

                {/* Help Center */}
                <div>
                    <h3 className="text-black dark:text-white text-lg font-semibold mb-4">Help Center</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link href={"/faq"} className="hover:text-black dark:hover:text-white transition">FAQ</Link></li>
                        <li><Link href={"/login"} className="hover:text-black dark:hover:text-white transition">Login</Link></li>
                        <li><Link href={"/register"} className="hover:text-black dark:hover:text-white transition">Register</Link></li>
                        <li><Link href={"/privacy-policy"} className="hover:text-black dark:hover:text-white transition">Privacy Policy</Link></li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h3 className="text-black dark:text-white text-lg font-semibold mb-4">Contact Us</h3>
                    <p className="text-sm mb-2">Email: deepakkumaryadav75100@gmail.com</p>
                    <p className="text-sm mb-2">Phone: +91 7510064500</p>
                    <p className="text-sm mb-2">Address: Balrampur, India</p>
                    <p className="text-sm">Support: Mon-Fri 9AM-6PM</p>
                </div>

            </div>

            <Separator className="my-6 border-gray-300 dark:border-gray-700" />

            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                © {new Date().getFullYear()} Learn Web. All rights reserved.
            </p>
        </footer>
    );
}

export default Footer;
