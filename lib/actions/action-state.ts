export type ActionState = {
  success?: boolean;
  errors?: {
    title?: string[];
    description?: string[];
    completed?: string[];
  };
};

export const initialActionState: ActionState = {};
