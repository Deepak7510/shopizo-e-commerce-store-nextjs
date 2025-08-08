import Navbar from "@/components/application/user/Navbar";
import Footer from "@/components/application/user/Footer";

export default function UserLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <Navbar />
            <main>{children}</main>
            <Footer />
        </div>
    );
}
