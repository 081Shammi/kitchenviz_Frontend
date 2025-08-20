import { Outlet } from "react-router-dom";
import AdminLayout from "../layout/Layout";

const RootOutlet = () => {
  return (
    <>
      <AdminLayout>
        <Outlet />
      </AdminLayout>
    </>
  );
};

export default RootOutlet;
