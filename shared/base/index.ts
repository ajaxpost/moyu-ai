export type PartialPick<T, K extends keyof T> = Pick<T, K> & {
  [p in K]?: T[p];
};
