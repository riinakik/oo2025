import { Athlete } from "./Athlete";
import { Event } from "./Event";

export type Result = {
  id: number;
  athlete: Athlete;
  event: Event;
  result: number; // Nt sekundid jooksus või meetrid hüppes
  score: number;  // Punktid
}
