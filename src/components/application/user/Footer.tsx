"use client"
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import ApplicationLogo from "../common/ApplicationLogo";

function Footer() {

    return (
        <footer className="text-muted-foreground bg-muted py-6">
            <div className="px-6 md:px-20 grid md:grid-cols-4 sm:grid-cols-2 gap-6 md:gap-20">
                {/* Branding */}
                <div>
                    <ApplicationLogo />
                    <p className="text-sm mt-3 leading-relaxed">
                        Learn Web helps you master modern web development through hands-on
                        training and real-world projects. Gain practical skills in HTML,
                        CSS, JavaScript, and more with expert-led courses. Learn at your own
                        pace, build portfolio-worthy projects, and join thousands of
                        learners transforming their careers with industry-ready knowledge.
                    </p>
                </div>

                {/* Navigation */}
                <div>
                    <h3 className="text-black dark:text-white text-lg font-semibold mb-4">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <Link href={"/"}>Home</Link>
                        </li>
                        <li>
                            <Link href={"/about"}>About</Link>
                        </li>
                        <li>
                            <div
                                className="cursor-pointer"
                            >
                                Products
                            </div>
                        </li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h3 className="text-black dark:text-white text-lg font-semibold mb-4">Contact Us</h3>
                    <p className="text-sm mb-2">
                        Email: deepakkumaryadav75100@gmail.com
                    </p>
                    <p className="text-sm mb-2">Phone: +91 7510064500</p>
                    <p className="text-sm">Address: Balrampur, India</p>
                </div>

                <div>
                    <h3 className="text-black dark:text-white text-lg font-semibold mb-4">help Center</h3>
                    <p className="text-sm mb-2">
                        Email: deepakkumaryadav75100@gmail.com
                    </p>
                    <p className="text-sm mb-2">Phone: +91 7510064500</p>
                    <p className="text-sm">Address: Balrampur, India</p>
                </div>
            </div>

            <Separator className="my-4 bg-gray-700" />

            <p className="text-center text-sm text-gray-500">
                © {new Date().getFullYear()} Learn Web. All rights reserved.
            </p>
        </footer>
    );
}


export default Footer