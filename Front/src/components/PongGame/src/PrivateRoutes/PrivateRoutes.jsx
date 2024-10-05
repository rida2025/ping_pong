

import { Navigate, Outlet } from "react-router-dom";

function PrivateRoutes() {
      let auth = { token: true};
      return !auth.token ? <Navigate to="/login" /> : <Outlet />;
}
export default PrivateRoutes;