import AdminNavbar from "../../../../components/layout/Navbar/AdminNavbar";

export default function Layout({ children }) {
  return (
    <div>
      <AdminNavbar /> 
      <main className="overflow-hidden">{children}</main>
    </div>
  );
}