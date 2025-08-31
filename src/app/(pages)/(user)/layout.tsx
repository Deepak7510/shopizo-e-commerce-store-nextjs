import Navbar from "@/components/application/user/Navbar";
import Footer from "@/components/application/user/Footer";

export default function UserLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="max-w-[1600px] mx-auto">
            <Navbar />
            <main>{children}</main>
            {/* <Footer /> */}
        </div>
    );
}
