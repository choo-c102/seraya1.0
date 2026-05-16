import { Redirect } from "expo-router";
import { defaultSenior, getQuestionnaireQuestions } from "../../lib/mock-data";

export default function CheckinEntry() {
  const questions = getQuestionnaireQuestions(defaultSenior);
  const first = questions[0];
  if (!first) {
    return <Redirect href="/checkin/complete" />;
  }
  return <Redirect href={`/checkin/question/${first.id}`} />;
}
