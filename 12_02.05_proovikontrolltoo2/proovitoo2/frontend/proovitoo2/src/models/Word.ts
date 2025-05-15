import { Parent } from "./Parent"

export interface Word {
    typeID?: number;
    type: string;
    description: string;
    parent: Parent
  }