import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ClientLayout from "../layouts/ClientLayout";
import NotFoundPage from "../pages/common/NotFoundPage";
import AdminLayout from "../layouts/AdminLayout";

import ProtectedRoute from "../components/ProtectedRoute";
import LoginPage from "../pages/common/LoginPage";
import RegisterPage from "../pages/common/RegisterPage";
import clientRoutes from "./clientRoutes";
import adminRoutes from './adminRoutes';


const router = createBrowserRouter([
	// * Layout Client
	{
		path: "/",
		element: <ClientLayout />,
		children: clientRoutes
	},

	// * Layout Admin
	// {
	// 	path: "/admin",
	// 	element: <ProtectedRoute />,
	// 	children: [
			{
				path: "/admin",
				element: <AdminLayout />,
				children: adminRoutes
			},
		// ],
	// },

	// * Layout Empty
	{ path: "/auth/login", element: <LoginPage /> },
	{ path: "/auth/register", element: <RegisterPage /> },
	{ path: "*", element: <NotFoundPage /> },
]);

const AppRouter = () => {
	return <RouterProvider router={router} />;
};

export default AppRouter;
