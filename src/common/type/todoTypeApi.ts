export type Data = {
  todo: string;
  isCompleted: boolean;
  id: string | number;
  createdAt: string | Date;
};
export type Meta = {
  current_page: number;
  path: string;
  per_page: number;
};

export type Links = {
  first?: string;
  last?: string;
  prev?: string;
  next?: string | null;
};

export type TodoParams = {
  limit?: number;
  cursor?: number;
  startDate?: string;
  endDate?: string;
  search?: string;
  filter?: boolean | string;
};

export type ErrorType = {
  message?: string;
  status?: number;
};
