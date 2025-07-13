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
import React, { useState, useEffect, useCallback } from "react";
import { AssistantMessageProvider } from "@/context/AssistantMessageContext"; // Імпорт провайдера

const queryClient = new QueryClient();
// Використовуємо BASE_URL з Vite, який буде коректним як для розробки, так і для продакшену
const appBasename = import.meta.env.BASE_URL;
const CHARACTER_STORAGE_KEY = "selected-ai-character";

const App = () => {
  const [selectedCharacter, setSelectedCharacter] = useState<'robot' | 'cat' | 'owl' | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const storedCharacter = localStorage.getItem(CHARACTER_STORAGE_KEY) as 'robot' | 'cat' | 'owl' | null;
    if (storedCharacter) {
      setSelectedCharacter(storedCharacter);
    }
  }, []);

  const handleCharacterSelect = useCallback((character: 'robot' | 'cat' | 'owl') => {
    setSelectedCharacter(character);
    localStorage.setItem(CHARACTER_STORAGE_KEY, character);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <AssistantMessageProvider> {/* Обгортаємо тут */}
            <BrowserRouter basename={appBasename}>
              <Layout searchTerm={searchTerm} setSearchTerm={setSearchTerm} selectedCharacter={selectedCharacter}>
                <Routes>
                  <Route path="/" element={<Index selectedCharacter={selectedCharacter} onCharacterSelect={handleCharacterSelect} />} />
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
          </AssistantMessageProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;