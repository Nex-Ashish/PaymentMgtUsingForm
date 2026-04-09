import UserNavbar from "../../../components/Navbar/UserNavbar";

export default function Layout({ children }) {
  return (
    <div>
      <UserNavbar /> 
      <main className="overflow-y-auto">{children}</main>
    </div>
  );
}