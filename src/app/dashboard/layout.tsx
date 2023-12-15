import Footer from "@/components/Footer";
import Header from "@/components/Header";

export const metadata = {
  title: "Dialu",
  description: "A all in one platform for managing your retail business",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
