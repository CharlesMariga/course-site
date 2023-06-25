import courseData from "./courseData";
import { Chapter, LessonWithPath, Course } from "~/types/course";

export const useCourse = (): Course => {
  const chapters: Chapter[] = courseData.chapters.map((chapter) => {
    const lessons: LessonWithPath[] = chapter.lessons.map((lesson) => ({
      ...lesson,
      path: `/course/chapter/${chapter.slug}/lesson/${lesson.slug}`,
    }));
    return {
      ...chapter,
      lessons,
    };
  });

  return {
    ...courseData,
    chapters,
  };
};
