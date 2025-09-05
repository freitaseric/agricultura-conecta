import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/components/AuthProvider";
import { Layout } from "@/components/Layout";
import Index from "./pages/Index";
import Produtores from "./pages/Produtores";
import CreditoRural from "./pages/CreditoRural";
import ATER from "./pages/ATER";
import Eventos from "./pages/Eventos";
import Documentos from "./pages/Documentos";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/produtores" element={
              <Layout>
                <Produtores />
              </Layout>
            } />
            <Route path="/credito" element={
              <Layout>
                <CreditoRural />
              </Layout>
            } />
            <Route path="/ater" element={
              <Layout>
                <ATER />
              </Layout>
            } />
            <Route path="/eventos" element={
              <Layout>
                <Eventos />
              </Layout>
            } />
            <Route path="/documentos" element={
              <Layout>
                <Documentos />
              </Layout>
            } />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
