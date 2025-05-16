
import { Person } from "./Person"

export interface Comment {
  id?: number;
  postId: number;
  name: string;
  email: string;
  body: string;
  person?: Person;
}
