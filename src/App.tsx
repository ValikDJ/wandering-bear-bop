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
import { ThemeProvider } from "@/hooks/use-theme";
import React, { useState } from "react"; // Змінено імпорти React

const queryClient = new QueryClient();
const basename = import.meta.env.BASE_URL;

const App = () => {
  const [searchTerm, setSearchTerm] = useState<string>(""); // Стан для глобального пошукового запиту

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter basename={basename}>
            <Layout searchTerm={searchTerm} setSearchTerm={setSearchTerm}>
              <Routes>
                <Route path="/" element={<Index />} /> {/* Видалено пропси для Index */}
                <Route path="/html-tags" element={<HtmlTags />} />
                <Route path="/css-properties" element={<CssProperties />} />
                <Route path="/css-selectors" element={<CssSelectors />} />
                <Route path="/examples" element={<Examples />} />
                <Route path="/project-template" element={<ProjectTemplate />} />
                <Route path="/quiz" element={<QuizPage />} />
                <Route path="/search" element={<SearchResultsPage />} />
                <Route path="/glossary" element={<GlossaryPage />} />
                {/* ДОДАЙТЕ ВСІ ВЛАСНІ МАРШРУТИ НАД МАРШРУТОМ "*" */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </TooltipProvider>
        {/* Видалено компонент AIAssistant */}
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;