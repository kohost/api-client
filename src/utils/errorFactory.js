import * as Errors from "../Errors";

export function errorFactory(errName) {
  const AllErrors = Object.values(Errors);
  const TheError = AllErrors.find((E) => E.prototype.name === errName);
  if (!TheError) return new Error("Invalid error name: " + errName);
  return TheError;
}
