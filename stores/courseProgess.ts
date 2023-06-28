import { defineStore } from "pinia";
import { Chapter } from "@prisma/client";

export const useCourseProgressStore = defineStore("courseProgress", () => {
  // Initialize the progress from local storage
  const progress: any = ref<any>({});
  const initialized = ref(false);

  async function initialize() {
    // If the course has already been initialized, return
    if (initialized.value) return;
    initialized.value = true;

    // TODO: Fetch user progress from endping (lesson 6-5)
  }

  // Toggle the progress of a lesson based on chapter slug and lesson slug
  async function toggleComplete(chapter: string, lesson: string) {
    // If there's no user, we can't update the progress
    const user = useSupabaseUser();
    if (!user.value) return;

    // Grab chapter and lesson slugs from the route if they're not provided
    if (!chapter || !lesson) {
      const {
        params: { chapterSlug, lessonSlug },
      } = useRoute();
      chapter = chapterSlug as string;
      lesson = lessonSlug as string;
    }

    // Get the current progress for the lesson
    const currentProgress = progress.value[chapter]?.[lesson];

    // Optimistically update the progress value in the UI
    progress.value[chapter] = {
      ...progress.value[chapter],
      [lesson]: !currentProgress,
    };

    try {
      await $fetch(`/api/course/chapter/${chapter}/lesson/${lesson}/progress`, {
        method: "POST",
        body: {
          completed: !currentProgress,
          userEmail: user.value.email,
        },
      });
    } catch (error) {
      console.log(error);

      // If the request failed, revert the progress value
      progress.value[chapter] = {
        ...progress.value[chapter],
        [lesson]: currentProgress,
      };
    }
  }

  return {
    progress,
    initialize,
    toggleComplete,
  };
});
