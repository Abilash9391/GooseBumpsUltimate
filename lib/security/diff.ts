import { diff } from "deep-diff";

export function getDiff(before: any, after: any) {
  return diff(before, after);
}