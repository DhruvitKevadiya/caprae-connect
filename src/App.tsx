import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { initializeLocalStorage } from "@/utils/localStorage";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import BuyerOnboarding from "./pages/BuyerOnboarding";
import SellerOnboarding from "./pages/SellerOnboarding";
import Matches from "./pages/Matches";
import Messages from "./pages/Messages";
import AcquisitionProcess from "./pages/AcquisitionProcess";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

// Initialize localStorage when app starts
initializeLocalStorage();

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/onboarding/buyer" element={<BuyerOnboarding />} />
          <Route path="/onboarding/seller" element={<SellerOnboarding />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/acquisition-process" element={<AcquisitionProcess />} />
          <Route path="/settings" element={<Settings />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
