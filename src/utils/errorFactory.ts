import * as Errors from "../Errors";

export default function errorFactory(errName: string) {
  const AllErrors = Object.values(Errors);
  const TheError = AllErrors.find((E) => E.prototype.name === errName);
  if (!TheError) return new Error("Invalid error name: " + errName);
  return TheError;
}
