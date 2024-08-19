import { Command } from "./Command";

export interface GetCategoriesOptions {
  id: string;
}

export class GetCategories extends Command {
  constructor(opts: GetCategoriesOptions & { [key: string]: any }) {
    super(opts);
  }

  get name() {
    return "GetCategories";
  }
}

export default GetCategories;
