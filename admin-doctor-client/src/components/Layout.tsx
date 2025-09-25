import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Navbar />
      <Sidebar />
      

      {/* Main content (with left padding so it’s not hidden behind sidebar) */}
      <main className="flex-1 ml-64 p-6 bg-gray-50 min-h-screen">
        {children}
      </main>
    </div>
  );
};

export default Layout;
