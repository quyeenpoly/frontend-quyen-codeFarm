import DashBoardPage from "../pages/admin/DashBoardPage";
import ProfilePage from "../pages/admin/ProfilePage";
import SettingsPage from '../pages/admin/SettingsPage';
import ProductListPage from "../pages/admin/ProductListPage";
import ProductForm from "../pages/admin/ProductForm";
import CategoryListPage from "../pages/admin/CategoryListPage";
import CategoryFormPage from "../pages/admin/CategoryFormPage";
import OrderListPage from '../pages/admin/OrderListPage';
import OrderDetailPage from "../pages/admin/OrderDetailPage";
import UserListPage from '../pages/admin/UserListPage';
import BlogListPage from '../pages/admin/BlogListPage';
import BlogFormPage from "../pages/admin/BlogFormPage";
import ProductDetailPage from "../pages/admin/ProductDetail";
import ProductsUpdatePage from "../pages/admin/ProductsEditPage";
import SubCategoryListPage from "../pages/admin/SubCategoryListPage";
import BrandListPage from "../pages/admin/BrandListPage";

const adminRoutes = [
 { index: true, element: <DashBoardPage /> },
	{ path: "settings", element: <SettingsPage /> },
	{ path: "me/profile", element: <ProfilePage /> }, // User profile page

	// * Products routes
	{ path: "products", element: < ProductListPage/> },
	{ path: "products/update/:id", element: < ProductsUpdatePage/> },
	{ path: "products/add", element: < ProductForm/> },
	{ path: "products/:id", element: < ProductDetailPage/> },

	// * Categories routes
	{ path: "categories", element: <CategoryListPage /> },
	{ path: "categories/edit/:id", element: <CategoryFormPage /> },
	{ path: "categories/add", element: <CategoryFormPage /> },

	// * Orders routes
	{ path: "orders", element: <OrderListPage /> },
	{ path: "orders/edit/:id", element: <OrderDetailPage /> },
	{ path: "orders/add", element: <OrderDetailPage /> },

	// * Users routes
	{ path: "users", element: <UserListPage /> },
	{ path: "users/edit/:id", element: <ProductForm /> },
	{ path: "users/add", element: <ProductForm/> },

	// * Blog routes
	{ path: "blogs", element: <BlogListPage /> }, 
	{ path: "blogs/edit/:id", element: <BlogFormPage /> },
	{ path: "blogs/add", element: <BlogFormPage /> },

	// * Sub-categories routes
	{ path: "sub-categories", element: <SubCategoryListPage /> },
	{ path: "brands", element: <BrandListPage /> },
];
export default adminRoutes;
