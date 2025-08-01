import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { searchIndex, SearchItem } from "@/data/searchIndex";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { glossaryData, GlossaryTerm } from "@/data/glossaryData";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { highlightText, escapeRegExp } from "@/lib/utils";
import Fuse from 'fuse.js';
import type { FuseResult } from 'fuse.js'; // Додано імпорт типу FuseResult
import { expandQueryWithSynonyms } from "@/data/synonymMap";

const getEmojiForType = (type: SearchItem['type']) => {
  switch (type) {
    case 'lesson': return '📚';
    case 'example': return '💡';
    case 'quiz': return '🎮';
    case 'project-template': return '🚀';
    case 'glossary': return '📖';
    default: return '';
  }
};

const fuseOptions = {
  keys: [
    { name: 'title', weight: 0.7 },
    { name: 'description', weight: 0.5 },
    { name: 'keywords', weight: 0.9 },
  ],
  includeScore: true,
  includeMatches: true,
  threshold: 0.1,
  distance: 5,
  ignoreLocation: true,
  minMatchCharLength: 1,
};

const fuse = new Fuse(searchIndex, fuseOptions);

const SearchResultsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentSearchTerm, setCurrentSearchTerm] = useState(searchParams.get("query") || "");
  const [filteredPageResults, setFilteredPageResults] = useState<SearchItem[]>([]);
  const [directTermDefinition, setDirectTermDefinition] = useState<GlossaryTerm | null>(null);

  useEffect(() => {
    const query = searchParams.get("query") || "";
    setCurrentSearchTerm(query);
    const lowerCaseQuery = query.toLowerCase();

    const foundTerm = glossaryData.find(item => item.term.toLowerCase() === lowerCaseQuery);
    setDirectTermDefinition(foundTerm || null);

    if (query) {
      const expandedQueryArray = expandQueryWithSynonyms(query);
      // НЕ ЕКРАНУЄМО тут, Fuse.js обробляє спеціальні символи самостійно
      const queryForFuse = expandedQueryArray.join(' ').trim();
      
      let results: FuseResult<SearchItem>[] = []; // Виправлено: використовуємо імпортований тип FuseResult
      if (queryForFuse) { // Шукаємо тільки якщо запит не порожній
        try {
          results = fuse.search(queryForFuse);
        } catch (error) {
          console.error("Помилка під час пошуку Fuse.js у SearchResultsPage:", error);
          // Продовжуємо з порожніми результатами, не викликаючи збою
        }
      }

      const mappedResults = results.map(result => result.item);

      const finalResults = mappedResults.filter(item =>
        !(item.type === 'glossary' && item.title.toLowerCase().includes(lowerCaseQuery) && directTermDefinition)
      );

      setFilteredPageResults(finalResults);

    } else {
      setFilteredPageResults([]);
    }
  }, [searchParams]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentSearchTerm.trim()) {
      setSearchParams({ query: currentSearchTerm.trim() });
    } else {
      setSearchParams({});
    }
  };

  const hasResults = directTermDefinition || filteredPageResults.length > 0;
  const totalResultsCount = (directTermDefinition ? 1 : 0) + filteredPageResults.length;

  return (
    <div className="py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-foreground">Результати Пошуку</h1>
      <p className="text-lg text-center mb-4 text-muted-foreground max-w-3xl mx-auto">
        Ось що я знайшов за твоїм запитом: "<span className="font-semibold text-foreground">{currentSearchTerm}</span>"
      </p>
      {hasResults && (
        <p className="text-md text-center mb-10 text-muted-foreground">
          Знайдено {totalResultsCount} {totalResultsCount === 1 ? "результат" : "результатів"}.
        </p>
      )}

      <div className="mb-6 max-w-xl mx-auto">
        <form onSubmit={handleSearchSubmit} className="relative flex items-center">
          <Input
            type="text"
            placeholder="Шукати ще..."
            value={currentSearchTerm}
            onChange={(e) => setCurrentSearchTerm(e.target.value)}
            className="w-full p-3 text-lg pl-10"
          />
          <Search className="absolute left-3 h-5 w-5 text-muted-foreground" />
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {directTermDefinition && (
          <Card className="bg-card shadow-lg border-2 border-blue-500 col-span-full mb-6">
            <CardHeader>
              <CardTitle className="text-2xl text-card-foreground flex items-center gap-2">
                {getEmojiForType('glossary')} Термін: {highlightText(directTermDefinition.term, currentSearchTerm)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-lg mb-4">{highlightText(directTermDefinition.definition, currentSearchTerm)}</p>
              {directTermDefinition.codeExample && directTermDefinition.language && (
                <div className="mt-4">
                  <h4 className="font-semibold mb-2 text-lg text-secondary-foreground">Приклад коду:</h4>
                  <SyntaxHighlighter language={directTermDefinition.language} style={atomDark} customStyle={{ borderRadius: '8px', padding: '16px', fontSize: '0.9em' }}>
                    {directTermDefinition.codeExample}
                  </SyntaxHighlighter>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {filteredPageResults.length > 0 && (
          <>
            {directTermDefinition && <h2 className="col-span-full text-2xl font-bold text-foreground mt-8 mb-4">Також знайдено в уроках та прикладах:</h2>}
            {filteredPageResults.map((item, index) => (
              <Card key={index} className="bg-card shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-xl text-card-foreground flex items-center gap-2">
                    {getEmojiForType(item.type)} {highlightText(item.title, currentSearchTerm)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{highlightText(item.description, currentSearchTerm)}</p>
                  <Link
                    to={`${item.path}${item.sectionId ? `#${item.sectionId}` : ''}`}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    Перейти до {item.type === 'lesson' ? 'уроку' : item.type === 'example' ? 'прикладу' : item.type === 'quiz' ? 'тесту' : item.type === 'project-template' ? 'шаблону' : 'словника'}
                  </Link>
                </CardContent>
              </Card>
            ))}
          </>
        )}

        {!hasResults && (
          <p className="col-span-full text-center text-muted-foreground text-lg">
            Нічого не знайдено за запитом "<span className="font-semibold text-foreground">{currentSearchTerm}</span>". Спробуй інші ключові слова.
          </p>
        )}
      </div>
    </div>
  );
};

export default SearchResultsPage;