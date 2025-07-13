import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CharacterSelectorProps {
  onSelect: (character: 'robot' | 'cat' | 'owl') => void;
  selectedCharacter: 'robot' | 'cat' | 'owl';
}

const CharacterSelector: React.FC<CharacterSelectorProps> = ({ onSelect, selectedCharacter }) => {
  return (
    <Card className="w-full max-w-md mx-auto bg-card shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl text-foreground text-center">Обери свого помічника!</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-4">
        <div className="grid grid-cols-3 gap-4 w-full">
          <Button
            variant={selectedCharacter === 'robot' ? 'default' : 'outline'}
            onClick={() => onSelect('robot')}
            className="flex flex-col items-center justify-center p-4 h-28 text-lg font-semibold"
          >
            🤖 <span className="mt-1">Робот</span>
          </Button>
          <Button
            variant={selectedCharacter === 'cat' ? 'default' : 'outline'}
            onClick={() => onSelect('cat')}
            className="flex flex-col items-center justify-center p-4 h-28 text-lg font-semibold"
          >
            🐱 <span className="mt-1">Кіт</span>
          </Button>
          <Button
            variant={selectedCharacter === 'owl' ? 'default' : 'outline'}
            onClick={() => onSelect('owl')}
            className="flex flex-col items-center justify-center p-4 h-28 text-lg font-semibold"
          >
            🦉 <span className="mt-1">Сова</span>
          </Button>
        </div>
        <p className="text-sm text-muted-foreground text-center mt-4">
          Твій помічник з'явиться в куті екрана і буде готовий відповідати на запитання!
        </p>
      </CardContent>
    </Card>
  );
};

export default CharacterSelector;