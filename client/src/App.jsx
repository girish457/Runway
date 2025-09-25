import { Route, Routes, Navigate } from "react-router-dom";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import AdminDashboardPage from "./pages/admin-view/AdminDashboard";
import AccountPage from "./pages/account/Account";
import AdminLayout from "./components/admin-view/layout";
import AdminProducts from "./pages/admin-view/products";
import AdminOrders from "./pages/admin-view/orders";
import AdminFeatures from "./pages/admin-view/features";
import ShoppingLayout from "./components/shopping-view/layout";
import NotFound from "./pages/not-found";
import ShoppingHome from "./pages/shopping-view/home";
import ShoppingListing from "./pages/shopping-view/listing";
import ShoppingCheckout from "./pages/shopping-view/checkout";
import ShoppingAccount from "./pages/shopping-view/account";
import ProductListing from "./pages/shopping-view/product-listing";
import ProductDetails from "./pages/shopping-view/product-details";
import CheckAuth from "./components/common/check-auth";
import UnauthPage from "./pages/unauth-page";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { checkAuth } from "./store/auth-slice";
import { Skeleton } from "./components/ui/skeleton";
import PaypalReturnPage from "./pages/shopping-view/paypal-return";
import PaymentSuccessPage from "./pages/shopping-view/payment-success";
import SearchProducts from "./pages/shopping-view/search";
import AboutUs from "./pages/shopping-view/about-us";
import ContactUs from "./pages/shopping-view/contact-us";
import FAQs from "./pages/shopping-view/faqs";
import Wishlist from "./pages/shopping-view/wishlist";

function App() {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const hasCheckedAuth = useRef(false);

  useEffect(() => {
    // Only check auth once on initial load
    if (!hasCheckedAuth.current) {
      console.log("App - Checking auth status...");
      dispatch(checkAuth()).then((result) => {
        console.log("App - Auth check result:", result);
      });
      hasCheckedAuth.current = true;
    }
  }, [dispatch]);

  if (isLoading) return <Skeleton className="w-[800] bg-black h-[600px]" />;

  console.log("App - isLoading:", isLoading);
  console.log("App - user:", user);
  console.log("App - isAuthenticated:", isAuthenticated);

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route path="/" element={<Navigate to="/shop/home" replace />} />
        {/* Top-level auth routes */}
        <Route path="/login" element={<AuthLogin />} />
        <Route path="/signup" element={<AuthRegister />} />
        {/* Admin dashboard */}
        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="features" element={<AdminFeatures />} />
        </Route>
        {/* User account page */}
        <Route
          path="/account"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout />
            </CheckAuth>
          }
        >
          <Route index element={<AccountPage />} />
        </Route>
        <Route
          path="/shop"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<ShoppingHome />} />
          <Route path="listing" element={<ShoppingListing />} />
          <Route path="products" element={<ProductListing />} />
          <Route path="product/:id" element={<ProductDetails />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
          <Route path="account" element={<ShoppingAccount />} />
          <Route path="paypal-return" element={<PaypalReturnPage />} />
          <Route path="payment-success" element={<PaymentSuccessPage />} />
          <Route path="search" element={<SearchProducts />} />
          <Route path="about-us" element={<AboutUs />} />
          <Route path="contact-us" element={<ContactUs />} />
          <Route path="faqs" element={<FAQs />} />
          <Route path="wishlist" element={<Wishlist />} />
        </Route>
        <Route path="/unauth-page" element={<UnauthPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;