import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { glossaryData } from "@/data/glossaryData";
import LessonNavigation from "@/components/LessonNavigation"; // Assuming you might want navigation here too

const GlossaryPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTerms = glossaryData.filter(item =>
    item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.definition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-primary">Словник Термінів</h1>
      <p className="text-lg text-center mb-10 text-muted-foreground max-w-3xl mx-auto">
        Тут ти знайдеш пояснення основних термінів з HTML та CSS. Використовуй пошук, щоб швидко знайти потрібне слово!
      </p>

      <div className="mb-6 max-w-xl mx-auto">
        <Input
          type="text"
          placeholder="Шукати термін..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 text-lg"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTerms.length > 0 ? (
          filteredTerms.map((item, index) => (
            <Card key={index} className="bg-card shadow-md">
              <CardHeader>
                <CardTitle className="text-xl text-primary">{item.term}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{item.definition}</p>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="col-span-full text-center text-muted-foreground text-lg">
            Терміни не знайдено. Спробуй інший запит.
          </p>
        )}
      </div>
      {/* LessonNavigation is not typically used for reference pages, but can be added if desired */}
      {/* <LessonNavigation /> */}
    </div>
  );
};

export default GlossaryPage;