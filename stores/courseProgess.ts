import { defineStore } from "pinia";
import { CourseProgress } from "~/types/course";

export const useCourseProgressStore = defineStore("courseProgress", () => {
  // Initialize the progress from local storage
  const progress = ref<CourseProgress>({});
  const initialized = ref(false);

  async function initialize() {
    // If the course has already been initialized, return
    if (initialized.value) return;
    initialized.value = true;

    const { data: userProgress } = await useFetch<CourseProgress>(
      "/api/user/progress",
      { headers: useRequestHeaders(["cookie"]) }
    );

    // Update progress value
    if (userProgress.value) progress.value = userProgress.value;
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

  const percentageCompleted = computed(() => {
    const chapters = Object.values(progress.value).map((chapter) => {
      const lessons = Object.values(chapter);
      const completedLessons = lessons.filter((lesson) => lesson);
      return Number((completedLessons.length / lessons.length) * 100).toFixed(
        0
      );
    });

    const totalLessons = Object.values(progress.value).reduce(
      (number, chapter) => number + Object.values(chapter).length,
      0
    );

    const totalCompletedLessons = Object.values(progress.value).reduce(
      (number, chapter) =>
        number + Object.values(chapter).filter((lesson) => lesson).length,
      0
    );

    const course = Number((totalCompletedLessons / totalLessons) * 100).toFixed(
      0
    );

    return { chapters, course };
  });

  return {
    progress,
    initialize,
    toggleComplete,
    percentageCompleted,
  };
});
