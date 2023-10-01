import { AlertColor } from '@mui/material';

export interface AlertSettings {
  display: boolean;
  message: string;
  severity: AlertColor;
}

export type useState<T> = [T, (setter: ((previous: T) => T) | T) => void];

export interface PrivateComponentProps {
  element: React.ReactElement;
}

export interface Movie {
  id: string;
  title: string;
  genre: string;
  year: number;
  created_at: string;
  updated_at: string;
  creator: string;
}

export interface GenericCrudTableProps<Data> {
  tableId: string;
  modelName: string;
  defaultModel: Data;
  modelId?: string;
  modelFields: string[];
  defaultSortColumn: string;
  modelData: {
    deleteModel: (id: string) => Promise<any>;
    postModel: (model: Data) => Promise<any>;
    putModel: (id: string, model: Data) => Promise<any>;
    getModels: () => Promise<Data[]>;
  };
  validatedModel: (enteredModel: Data) => {
    isValid: boolean;
    errorMessage?: string;
  };
  modalToString: (model: Data) => string;
}
