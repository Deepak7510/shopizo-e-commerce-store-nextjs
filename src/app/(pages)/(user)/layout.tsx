import Footer from "@/components/application/user/Footer";
import Navbar from "@/components/application/user/Navbar";

export default function UserLayout({
    children,
}: {
    children: React.ReactNode;
}) {


    return (
        <div className="max-w-[1600px] mx-auto">
            <Navbar />
            <main className="mt-[72px] md:mt-[80px]">{children}</main>
            <Footer />
        </div>
    );
}
