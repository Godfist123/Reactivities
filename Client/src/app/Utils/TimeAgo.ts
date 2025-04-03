import { DateArg, formatDistanceToNow } from "date-fns";

export const timeAgo = (date: DateArg<Date>) => {
  return formatDistanceToNow(date) + " ago";
};
