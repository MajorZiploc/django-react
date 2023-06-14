import { AlertColor } from '@mui/material';

export interface AlertSettings {
  display: boolean;
  message: string;
  severity: AlertColor;
}

export type useState<T> = [T, React.Dispatch<React.SetStateAction<T>>];

export interface PrivateComponentProps {
  element: React.ReactElement;
}

export interface GenericCrudTableProps {
  tableId: string;
  modelName: string;
  defaultModel: any;
  modelId?: string;
  modelFields: string[];
  modelData: {
    deleteModel: (id: string) => Promise<any>;
    postModel: (model: any) => Promise<any>;
    putModel: (id: any, model: any) => Promise<any>;
    getModels: () => Promise<any>;
  };
  validatedModel: (enteredModal: any) => {
    isValid: boolean;
    errorMessage?: string;
  };
}
