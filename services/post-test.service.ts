import { prisma } from "../config/prisma.js";

const REQUIRED_CHAPTERS = [1, 2, 3, 4, 5, 6, 7];

type SubmittedAnswer = {
  questionId: string;
  optionId: string;
};

type PostTestOption = {
  id: string;
  label: string;
};

async function ensurePostTestAvailable(childId: string) {
  const completedChapterCount = await prisma.chapterProgress.count({
    where: {
      childId,
      chapterNumber: {
        in: REQUIRED_CHAPTERS,
      },
      completedAt: {
        not: null,
      },
    },
  });

  if (completedChapterCount !== REQUIRED_CHAPTERS.length) {
    throw new Error("POST_TEST_LOCKED");
  }
}

async function getCurrentQuestionSet() {
  const latestQuestion = await prisma.postTestQuestion.findFirst({
    where: {
      isActive: true,
    },
    orderBy: {
      contentVersion: "desc",
    },
    select: {
      contentVersion: true,
    },
  });

  if (!latestQuestion) {
    throw new Error("POST_TEST_NOT_READY");
  }

  const questions = await prisma.postTestQuestion.findMany({
    where: {
      isActive: true,
      contentVersion: latestQuestion.contentVersion,
    },
    orderBy: {
      order: "asc",
    },
  });

  if (questions.length === 0) {
    throw new Error("POST_TEST_NOT_READY");
  }

  return {
    contentVersion: latestQuestion.contentVersion,
    questions,
  };
}

function readOptions(value: unknown): PostTestOption[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter(
    (option): option is PostTestOption =>
      typeof option === "object" &&
      option !== null &&
      "id" in option &&
      "label" in option &&
      typeof option.id === "string" &&
      typeof option.label === "string",
  );
}

export async function getPostTestForChild(childId: string) {
  await ensurePostTestAvailable(childId);

  const [{ contentVersion, questions }, previousProgress] =
    await Promise.all([
      getCurrentQuestionSet(),
      prisma.postTestProgress.findUnique({
        where: {
          childId,
        },
        select: {
          score: true,
          correctAnswers: true,
          totalQuestions: true,
          completedAt: true,
        },
      }),
    ]);

  return {
    contentVersion,
    questions: questions.map((question) => ({
      id: question.id,
      order: question.order,
      chapterNumber: question.chapterNumber,
      type: question.type,
      prompt: question.prompt,
      options: readOptions(question.options),
    })),
    previousResult:
      previousProgress?.completedAt != null
        ? previousProgress
        : null,
  };
}

export async function gradePostTest(
  childId: string,
  contentVersion: number,
  answers: SubmittedAnswer[],
) {
  await ensurePostTestAvailable(childId);

  if (
    !Number.isInteger(contentVersion) ||
    !Array.isArray(answers) ||
    answers.some(
      (answer) =>
        typeof answer?.questionId !== "string" ||
        typeof answer?.optionId !== "string",
    )
  ) {
    throw new Error("INVALID_ANSWERS");
  }

  const { contentVersion: currentVersion, questions } =
    await getCurrentQuestionSet();

  if (contentVersion !== currentVersion) {
    throw new Error("QUESTION_SET_CHANGED");
  }

  const answerMap = new Map(
    answers.map((answer) => [answer.questionId, answer.optionId]),
  );

  if (
    answers.length !== questions.length ||
    answerMap.size !== questions.length ||
    questions.some((question) => !answerMap.has(question.id))
  ) {
    throw new Error("INVALID_ANSWERS");
  }

  let correctAnswers = 0;
  const chapterMap = new Map<
    number,
    { chapterNumber: number; correct: number; total: number }
  >();

  const review = questions.map((question) => {
    const selectedOptionId = answerMap.get(question.id) ?? "";
    const options = readOptions(question.options);
    const selectedOption = options.find(
      (option) => option.id === selectedOptionId,
    );
    const correctOption = options.find(
      (option) => option.id === question.correctOptionId,
    );

    if (!selectedOption || !correctOption) {
      throw new Error("INVALID_ANSWERS");
    }

    const isCorrect = selectedOptionId === question.correctOptionId;

    if (isCorrect) {
      correctAnswers += 1;
    }

    const chapterResult = chapterMap.get(question.chapterNumber) ?? {
      chapterNumber: question.chapterNumber,
      correct: 0,
      total: 0,
    };

    chapterResult.total += 1;
    chapterResult.correct += isCorrect ? 1 : 0;
    chapterMap.set(question.chapterNumber, chapterResult);

    return {
      questionId: question.id,
      order: question.order,
      chapterNumber: question.chapterNumber,
      prompt: question.prompt,
      selectedOptionId,
      selectedOptionLabel: selectedOption.label,
      correctOptionId: question.correctOptionId,
      correctOptionLabel: correctOption.label,
      isCorrect,
      explanation: question.explanation,
    };
  });

  const totalQuestions = questions.length;
  const score = Math.round((correctAnswers / totalQuestions) * 100);
  const chapterResults = [...chapterMap.values()].sort(
    (a, b) => a.chapterNumber - b.chapterNumber,
  );
  const recommendedChapters = chapterResults
    .filter((chapter) => chapter.correct < chapter.total)
    .map((chapter) => chapter.chapterNumber);

  const previousProgress = await prisma.postTestProgress.findUnique({
    where: {
      childId,
    },
  });
  const isBestScore =
    previousProgress?.score == null || score > previousProgress.score;
  const completedAt = previousProgress?.completedAt ?? new Date();

  await prisma.postTestProgress.upsert({
    where: {
      childId,
    },
    create: {
      childId,
      score,
      correctAnswers,
      totalQuestions,
      contentVersion,
      completedAt,
    },
    update: isBestScore
      ? {
          score,
          correctAnswers,
          totalQuestions,
          contentVersion,
          completedAt,
        }
      : {
          completedAt,
        },
  });

  return {
    score,
    correctAnswers,
    totalQuestions,
    contentVersion,
    isBestScore,
    chapterResults,
    recommendedChapters,
    review,
  };
}
