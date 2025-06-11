import AboutPage from "../pages/common/AboutPage";
import HomePage from "../pages/client/HomePage";
import ProfilePage from "../pages/client/ProfilePage";
import ContactPage from "../pages/client/ContactPage";
import FAQPage from "../pages/client/FAQPage";
import TermPrivacyPage from "../pages/client/TermPrivacyPage";
import ProductListPage from "../pages/client/ProductListPage";
import ProductDetailPage from "../pages/client/ProductDetailPage";
import CategoriesPage from "../pages/client/CategoriesPage";
import CartPage from "../pages/client/CartPage";
import CheckoutPage from "../pages/client/CheckoutPage";
import CheckoutSuccessPage from "../pages/client/CheckoutSuccessPage";
import BlogPage from "../pages/client/BlogPage";
import BlogDetailPage from "../pages/client/BlogDetailPage";
import OrderPage from "../pages/client/OrderPage";
import WishListPage from "../pages/client/WishListPage";


 const clientRoutes = [
  // common
	{ index: true, element: <HomePage /> },
	{ path: "about", element: <AboutPage /> },
	{ path: "contact", element: <ContactPage /> },
	{ path: "faq", element: <FAQPage /> },
	{ path: "terms", element: <TermPrivacyPage /> },

	// products & categories
	{ path: "products", element: <ProductListPage /> },
	{ path: "products/:id", element: <ProductDetailPage /> },
	{ path: "categories", element: <CategoriesPage /> },

	// cart & checkout
	{ path: "cart", element: <CartPage /> },
	{ path: "checkout", element: <CheckoutPage /> },
	{ path: "checkout-success", element: <CheckoutSuccessPage /> },

	// blog
	{ path: "blogs", element: <BlogPage /> },
	{ path: "blogs/:slug", element: <BlogDetailPage /> },

	// user
	{ path: "me/profile", element: <ProfilePage /> },
	{ path: "me/orders", element: <OrderPage /> },
	{ path: "me/wishlist", element: <WishListPage /> },
];
export default clientRoutes;
