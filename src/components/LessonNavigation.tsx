import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface Lesson {
  path: string;
  title: string;
}

const lessons: Lesson[] = [
  { path: "/html-tags", title: "HTML Теги" },
  { path: "/css-selectors", title: "CSS Селектори" },
  { path: "/css-properties", title: "CSS Властивості" },
  { path: "/examples", title: "Практичні Приклади" },
  // ProjectTemplate is more of a utility, not a sequential lesson
  // { path: "/project-template", title: "Шаблон Проекту" },
];

const LessonNavigation: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const currentIndex = lessons.findIndex((lesson) => lesson.path === currentPath);

  const prevLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null;

  if (currentIndex === -1) {
    // If current page is not a defined lesson, don't show navigation
    return null;
  }

  return (
    <div className="flex justify-between items-center mt-12 pt-6 border-t border-border">
      {prevLesson ? (
        <Button asChild variant="outline" className="flex items-center gap-2">
          <Link to={prevLesson.path}>
            <ArrowLeft className="h-4 w-4" />
            <span>Попередній: {prevLesson.title}</span>
          </Link>
        </Button>
      ) : (
        <div /> // Empty div to maintain spacing
      )}
      {nextLesson ? (
        <Button asChild className="flex items-center gap-2">
          <Link to={nextLesson.path}>
            <span>Наступний: {nextLesson.title}</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      ) : (
        <div /> // Empty div to maintain spacing
      )}
    </div>
  );
};

export default LessonNavigation;