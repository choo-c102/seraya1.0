// Mock-data helpers for the caregiver app.
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

/** Latest completed check-in for the senior (or undefined). */
export function getLatestCheckin(senior: MockSenior): MockCheckin | undefined {
  return [...senior.checkins].reverse().find((c) => c.completed);
}

/** Returns scale-question scores for a senior across the last N days. */
export function getRecentScores(
  senior: MockSenior,
  questionId: string,
  days: number,
): { date: string; score: number | null }[] {
  const tail = senior.checkins.slice(-days);
  return tail.map((c) => {
    if (!c.completed || c.scores === null) {
      return { date: c.date, score: null };
    }
    const scores = c.scores as Record<string, number | string[] | undefined>;
    const raw = scores[questionId];
    if (typeof raw === "number") {
      return { date: c.date, score: raw };
    }
    return { date: c.date, score: null };
  });
}

/** Friendly relative time for last check-in: "Today, 9:14 AM" etc. */
export function formatLastCheckin(senior: MockSenior): string {
  const last = getLatestCheckin(senior);
  if (!last || !last.time) return "No data";
  const date = new Date(`${last.date}T${last.time}:00`);
  const today = new Date("2026-05-09T12:00:00"); // mock "now"
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  let dayLabel = last.date;
  if (last.date === todayStr(today)) {
    dayLabel = "Today";
  } else if (last.date === todayStr(yesterday)) {
    dayLabel = "Yesterday";
  } else {
    dayLabel = date.toLocaleDateString("en-SG", { month: "short", day: "numeric" });
  }
  const timeLabel = formatTime12h(last.time);
  return `${dayLabel}, ${timeLabel}`;
}

function todayStr(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function formatTime12h(hhmm: string): string {
  const parts = hhmm.split(":");
  const hStr = parts[0] ?? "0";
  const mStr = parts[1] ?? "0";
  const h = Number(hStr);
  const m = Number(mStr);
  const period = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(m).padStart(2, "0")} ${period}`;
}

/** Severity reduction for status pill: returns "urgent" | "monitor" | "positive". */
export function getSeniorStatus(senior: MockSenior): "urgent" | "monitor" | "positive" {
  if (senior.alerts.some((a) => a.severity === "urgent")) return "urgent";
  if (senior.alerts.some((a) => a.severity === "moderate" || a.severity === "monitor")) {
    return "monitor";
  }
  return "positive";
}

/** Days since a YYYY-MM-DD date, using the mock "today". */
export function daysSince(dateStr: string): number {
  const today = new Date("2026-05-09T12:00:00");
  const then = new Date(`${dateStr}T12:00:00`);
  return Math.floor((today.getTime() - then.getTime()) / 86_400_000);
}

/** Avatar color tokens → hex. */
export const avatarColors: Record<string, string> = {
  amber: "#E89346",
  blue: "#5A8FD4",
  green: "#2E9E5B",
};

export function avatarHex(color: string): string {
  return avatarColors[color] ?? "#A4A7D8";
}

/** Heatmap tone bucketing for a day. */
export function dayHeatmapTone(checkin: MockCheckin | undefined): "noData" | "low" | "mid" | "high" {
  if (!checkin || !checkin.completed || checkin.scores === null) return "noData";
  const scores = checkin.scores as Record<string, number | string[] | undefined>;
  const nums = Object.values(scores).filter((v): v is number => typeof v === "number");
  if (nums.length === 0) return "noData";
  const avg = nums.reduce((a, b) => a + b, 0) / nums.length;
  if (avg >= 4) return "high";
  if (avg >= 3) return "mid";
  return "low";
}
