export interface Step {
  id: string;
  title: string;
  description: string;
  processId: string;
  completed: boolean;
  imgUrl?: string;
}

export type PStepPost = Omit<Step, 'id'>;

export interface InitialState {
  steps: Step[];
  isLoading: boolean;
}
