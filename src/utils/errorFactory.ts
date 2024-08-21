import * as Errors from "../Errors";

export function errorFactory(errName: string) {
  const AllErrors = Object.values(Errors);
  const TheError = AllErrors.find((E) => E.prototype.name === errName);
  if (!TheError) throw new Error("Invalid error name: " + errName);
  return TheError;
}
