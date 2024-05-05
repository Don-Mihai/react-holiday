export interface Step {
  id: string;
  data: {
    title: string;
    description?: string;
    imgUrl?: string;
    completed?: boolean;
    processId: string;
  };
  position?: {
    x: number;
    y: number;
  };
}

export type PStepPost = Omit<Step, 'id'>;

export interface InitialState {
  steps: Step[];
  isLoading: boolean;
}
