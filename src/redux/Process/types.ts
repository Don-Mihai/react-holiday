export interface Process {
  id: number;
  title: string;
  description: string;
}

export type PProcessPost = Omit<Process, 'id'>;

export interface InitialState {
  processes: Process[];
  isLoading: boolean;
}
