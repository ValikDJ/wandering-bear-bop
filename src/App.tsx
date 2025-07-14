import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import HtmlTags from "./pages/HtmlTags";
import CssProperties from "./pages/CssProperties";
import CssSelectors from "./pages/CssSelectors";
import Examples from "./pages/Examples";
import ProjectTemplate from "./pages/ProjectTemplate";
import QuizPage from "./pages/QuizPage";
import SearchResultsPage from "./pages/SearchResultsPage";
import GlossaryPage from "./pages/GlossaryPage";
import CssPlayground from "./pages/CssPlayground";
import React, { useState } from "react";
import { ThemeProvider } from "@/hooks/use-theme";

const queryClient = new QueryClient();
const appBasename = import.meta.env.BASE_URL;

// Визначення типів для режимів сайдбару
export type SidebarMode = 'pinned-full' | 'interactive-hover' | 'hidden';

const App = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  // Додаємо стан для режиму сайдбару, за замовчуванням 'pinned-full'
  const [sidebarMode, setSidebarMode] = useState<SidebarMode>('pinned-full');

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter basename={appBasename} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <Layout
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              sidebarMode={sidebarMode} // Передаємо режим сайдбару
              setSidebarMode={setSidebarMode} // Передаємо функцію для зміни режиму
            >
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/html-tags" element={<HtmlTags />} />
                <Route path="/css-properties" element={<CssProperties />} />
                <Route path="/css-selectors" element={<CssSelectors />} />
                <Route path="/examples" element={<Examples />} />
                <Route path="/project-template" element={<ProjectTemplate />} />
                <Route path="/quiz" element={<QuizPage />} />
                <Route path="/search" element={<SearchResultsPage />} />
                <Route path="/glossary" element={<GlossaryPage />} />
                <Route path="/css-playground" element={<CssPlayground />} />
                {/* ДОДАЙТЕ ВСІ ВЛАСНІ МАРШРУТИ НАД МАРШРУТОМ "*" */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;