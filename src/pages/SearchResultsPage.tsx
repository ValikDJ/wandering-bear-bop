import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { searchIndex, SearchItem } from "@/data/searchIndex";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const SearchResultsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentSearchTerm, setCurrentSearchTerm] = useState(searchParams.get("query") || "");
  const [filteredResults, setFilteredResults] = useState<SearchItem[]>([]);

  useEffect(() => {
    const query = searchParams.get("query") || "";
    setCurrentSearchTerm(query);
    if (query) {
      const lowerCaseQuery = query.toLowerCase();
      const results = searchIndex.filter(item =>
        item.title.toLowerCase().includes(lowerCaseQuery) ||
        item.description.toLowerCase().includes(lowerCaseQuery) ||
        item.keywords.some(keyword => keyword.toLowerCase().includes(lowerCaseQuery))
      );
      setFilteredResults(results);
    } else {
      setFilteredResults([]);
    }
  }, [searchParams]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentSearchTerm.trim()) {
      setSearchParams({ query: currentSearchTerm.trim() });
    } else {
      setSearchParams({}); // Clear search params if empty
    }
  };

  return (
    <div className="py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-primary">Результати Пошуку</h1>
      <p className="text-lg text-center mb-10 text-muted-foreground max-w-3xl mx-auto">
        Ось що я знайшов за твоїм запитом: "{currentSearchTerm}"
      </p>

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
        {filteredResults.length > 0 ? (
          filteredResults.map((item, index) => (
            <Card key={index} className="bg-card shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-xl text-primary">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{item.description}</p>
                <Link to={item.path} className="text-blue-600 hover:underline font-medium">
                  Перейти до уроку
                </Link>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="col-span-full text-center text-muted-foreground text-lg">
            Нічого не знайдено за запитом "{currentSearchTerm}". Спробуй інші ключові слова.
          </p>
        )}
      </div>
    </div>
  );
};

export default SearchResultsPage;