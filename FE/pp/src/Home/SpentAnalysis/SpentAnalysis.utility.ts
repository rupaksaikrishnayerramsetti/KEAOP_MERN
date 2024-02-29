export type spentrecordstype = {
  [key: string]: number;
};

export type spentformtype = {
  spenttype: string;
  amount: string;
};

export type SpentErrortype = {
  amount?: string;
};

export const reset = {
  spenttype: "",
  amount: "",
};

export const colors = [
  "red",
  "orange",
  "yellow",
  "blue",
  "indigo",
  "violet",
  "green",
]