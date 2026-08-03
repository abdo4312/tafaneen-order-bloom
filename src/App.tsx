// src/App.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from "./pages/Dashboard";
import ContentManagement from "./pages/Dashboard/ContentManagement";
import GeneralSettings from './pages/Dashboard/GeneralSettings';
import VisitorStatistics from './pages/Dashboard/VisitorStatistics';
import LivePreview from './pages/Dashboard/LivePreview';
import DashboardOverview from "./pages/DashboardOverview";
import CategoriesManagement from "./pages/CategoriesManagement";
import BannersManagement from "./pages/BannersManagement";
import ProductsManagement from "./pages/ProductsManagement";
import HomepageSettings from "./pages/HomepageSettings";
import NotificationsMonitoring from "./pages/NotificationsMonitoring";
import UserNotificationsPage from "./pages/UserNotificationsPage";

// Core Page imports
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CategoriesPage from "./pages/CategoriesPage";
import CategoryProductsPage from "./pages/CategoryProductsPage";
import OrdersPage from "./pages/OrdersPage";
import CartPage from "./pages/CartPage";
import SettingsPage from "./pages/SettingsPage";
import AccountPage from "./pages/AccountPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import FavoritesPage from "./pages/FavoritesPage";
import OffersPage from "./pages/OffersPage";
import SearchPage from "./pages/SearchPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter
            future={{
              v7_startTransition: true,
              v7_relativeSplatPath: true,
            }}
          >
            <Routes>
              {/* Main App Pages */}
              <Route path="/" element={<Index />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/category/:categoryId" element={<CategoryProductsPage />} />
              <Route path="/product/:id" element={<ProductDetailsPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/notifications" element={<UserNotificationsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="/offers" element={<OffersPage />} />

              {/* Admin Dashboard */}
              <Route path="/dashboard" element={<DashboardOverview />} />
              <Route path="/dashboard/banners" element={<BannersManagement />} />
              <Route path="/dashboard/categories" element={<CategoriesManagement />} />
              <Route path="/dashboard/products" element={<ProductsManagement />} />
              <Route path="/dashboard/notifications" element={<NotificationsMonitoring />} />
              <Route path="/dashboard/homepage" element={<HomepageSettings />} />

              <Route path="/dashboard" element={<Dashboard />}>
                <Route path="content" element={<ContentManagement />} />
                <Route path="settings" element={<GeneralSettings />} />
                <Route path="statistics" element={<VisitorStatistics />} />
                <Route path="preview" element={<LivePreview />} />
              </Route>

              {/* Fallback */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
