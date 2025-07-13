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
import Login from "./pages/Login"; // Import Login page
import { ThemeProvider } from "@/hooks/use-theme";
import { SessionContextProvider } from "@/components/SessionContextProvider"; // Import SessionContextProvider
import React, { useState } from "react";

const queryClient = new QueryClient();
const appBasename = import.meta.env.BASE_URL;

const App = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <SessionContextProvider> {/* Wrap the entire app with SessionContextProvider */}
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter basename={appBasename}>
              <Layout
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
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
                  <Route path="/login" element={<Login />} /> {/* Add Login route */}
                  {/* ДОДАЙТЕ ВСІ ВЛАСНІ МАРШРУТИ НАД МАРШРУТОМ "*" */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Layout>
            </BrowserRouter>
          </TooltipProvider>
        </SessionContextProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;