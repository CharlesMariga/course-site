export type Lesson = {
  title: string;
  slug: string;
  number: number;
  videoId: number;
  sourceUrl?: string;
  downloadUrl: string;
  text: string;
};

export type LessonWithPath = Lesson & { path: string };

export type Chapter = {
  title: string;
  slug: string;
  number: number;
  lessons: Lesson[] | LessonWithPath[];
};

export type Course = {
  title: string;
  chapters: Chapter[];
};
