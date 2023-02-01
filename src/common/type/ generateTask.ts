export enum TaskType {
  feature = "featuer",
  bug = "bug",
}

type Task<T = TaskType> = {
  name: string;
  type: T;
};

const whatEver: Task = { name: "show on", type: TaskType.feature };
