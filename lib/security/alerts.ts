const SENSITIVE = [
  "DELETE_USER",
  "CHANGE_ROLE",
  "DELETE_POST",
];

export function isSensitiveAction(action: string) {
  return SENSITIVE.includes(action);
}