export interface Process {
  id: string;
  title: string;
  description: string;
}

export type PProcessPost = Omit<Process, 'id'>;

export interface InitialState {
  processes: Process[];
  currentProc: Process;
  isLoading: boolean;
}
