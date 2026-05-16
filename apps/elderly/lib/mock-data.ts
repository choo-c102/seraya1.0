// Mock-data helpers for the elderly app.
// Imports the seed JSON directly via Metro's resolveJsonModule support.
import data from "../../../supabase/seed-data/seraya-mock-data.json";

export type MockData = typeof data;
export type MockSenior = (typeof data.patients)[number];
export type MockCheckin = MockSenior["checkins"][number];
export type MockAlert = MockSenior["alerts"][number];
export type MockQuestionId = keyof typeof data.questions;
export type MockQuestion = (typeof data.questions)[MockQuestionId];

export const seniors = data.patients;
export const questions = data.questions;

export const getSenior = (slug: string): MockSenior | undefined =>
  data.patients.find((p) => p.id === slug);

export const getQuestion = (id: string): MockQuestion | undefined => {
  if (id in data.questions) {
    return data.questions[id as MockQuestionId];
  }
  return undefined;
};

/** Default senior used in the elderly app (acts as Siti). */
export const defaultSenior: MockSenior = data.patients[0] as MockSenior;

/**
 * Returns today's check-in for the senior if completed, otherwise the latest
 * completed check-in. We treat the senior's most recent check-in as the
 * "active" one for the elderly flow.
 */
export function getActiveCheckin(senior: MockSenior): MockCheckin | undefined {
  return [...senior.checkins].reverse().find((c) => c.completed);
}

/** Ordered list of question ids in the senior's active questionnaire. */
export function getQuestionnaireQuestions(senior: MockSenior): MockQuestion[] {
  return senior.questionnaire.questions
    .map((qid) => getQuestion(qid))
    .filter((q): q is MockQuestion => q !== undefined);
}
