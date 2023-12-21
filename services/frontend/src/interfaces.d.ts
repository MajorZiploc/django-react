import { AlertColor } from '@mui/material';
import { Dispatch } from 'react';
import { AnyAction } from '@reduxjs/toolkit';

export interface AlertSettings {
  display: boolean;
  message: string | JSX.Element | null;
  severity: AlertColor;
}

export type useState<T> = [T, React.Dispatch<React.SetStateAction<T>>];

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
  modelFields: {
    name: string;
    label: string;
  }[];
  defaultSortColumn: string;
  modelData: {
    deleteModel: (id: string) => Promise<any>;
    postModel: (model: Data) => Promise<any>;
    putModel: (id: string, model: Data) => Promise<any>;
    getModels: () => Promise<Data[]>;
  };
  validatedModel: (enteredModel: Data) => {
    isValid: boolean;
    errorMessage: string | JSX.Element | null;
  };
  modalToString: (model: Data) => string;
}

export interface ReduxState {
  counter: CountState;
}

export interface CounterState {
  value: number;
}

export type Dispatch = Dispatch<AnyAction>;
