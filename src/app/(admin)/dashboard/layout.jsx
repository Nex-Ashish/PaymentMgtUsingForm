import AdminNavbar from "../../../../components/Navbar/AdminNavbar";

export default function Layout({ children }) {
  return (
    <div>
      <AdminNavbar /> 
      <main className="overflow-hidden">{children}</main>
    </div>
  );
}