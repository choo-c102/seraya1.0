// Tiny in-memory store for the question wizard. State is keyed by
// `${seniorId}:${questionnaireId}` so two parallel wizards (unlikely in
// practice) won't clobber each other. Cleared on app reload — that's fine
// because we don't persist questions to a backend in this scaffold.

export type WizardResponseType = "scale" | "binary" | "multiselect";

export type WizardDraft = {
  emoji?: string;
  description?: string;
  responseType?: WizardResponseType;
  consecutiveDays?: number;
};

const store = new Map<string, WizardDraft>();

const key = (seniorId: string, questionnaireId: string) => `${seniorId}:${questionnaireId}`;

export function getDraft(seniorId: string, questionnaireId: string): WizardDraft {
  return store.get(key(seniorId, questionnaireId)) ?? {};
}

export function updateDraft(
  seniorId: string,
  questionnaireId: string,
  patch: Partial<WizardDraft>,
): WizardDraft {
  const k = key(seniorId, questionnaireId);
  const next = { ...(store.get(k) ?? {}), ...patch };
  store.set(k, next);
  return next;
}

export function resetDraft(seniorId: string, questionnaireId: string): void {
  store.delete(key(seniorId, questionnaireId));
}
