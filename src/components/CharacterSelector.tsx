import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAssistantMessage } from '@/context/AssistantMessageContext'; // Імпорт хука

interface CharacterSelectorProps {
  onSelect: (character: 'robot' | 'cat' | 'owl') => void;
  selectedCharacter: 'robot' | 'cat' | 'owl';
}

const CharacterSelector: React.FC<CharacterSelectorProps> = ({ onSelect, selectedCharacter }) => {
  const { sendMessage } = useAssistantMessage();

  const handleCharacterSelect = (character: 'robot' | 'cat' | 'owl') => {
    onSelect(character);
    let message = "";
    switch (character) {
      case 'robot':
        message = "Чудовий вибір! Я Робот-помічник, готовий до кодування!";
        break;
      case 'cat':
        message = "Муррр! Я Кіт-помічник, давай разом досліджувати веб!";
        break;
      case 'owl':
        message = "Ух-ух! Я Мудра Сова, допоможу тобі розібратися у всіх тонкощах!";
        break;
    }
    sendMessage(message);
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-card shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl text-foreground text-center">Обери свого помічника!</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-4">
        <div className="grid grid-cols-3 gap-4 w-full">
          <Button
            variant={selectedCharacter === 'robot' ? 'default' : 'outline'}
            onClick={() => handleCharacterSelect('robot')}
            className="flex flex-col items-center justify-center p-4 h-28 text-lg font-semibold"
          >
            🤖 <span className="mt-1">Робот</span>
          </Button>
          <Button
            variant={selectedCharacter === 'cat' ? 'default' : 'outline'}
            onClick={() => handleCharacterSelect('cat')}
            className="flex flex-col items-center justify-center p-4 h-28 text-lg font-semibold"
          >
            🐱 <span className="mt-1">Кіт</span>
          </Button>
          <Button
            variant={selectedCharacter === 'owl' ? 'default' : 'outline'}
            onClick={() => handleCharacterSelect('owl')}
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