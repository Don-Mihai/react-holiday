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

export interface StepData {
  id: string;
  title: string;
  description?: string;
  imgUrl?: string;
  completed?: boolean;
  processId: string;
}

export type PStepPost = Omit<Step, 'id'>;

export interface InitialState {
  steps: Step[];
  isLoading: boolean;
}

export const emptyStep: Step = {
  id: '',
  data: {
    title: '',
    description: '',
    imgUrl: '',
    completed: false,
    processId: '',
  },
  position: {
    x: 0,
    y: 0,
  },
};
