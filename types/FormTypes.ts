import { ChangeEvent, FormEvent } from 'react';

interface ErrorsInputs extends Object {
  name?: string;email?: string;
  contactPhone?: string;
  message?: string;
  checked?: string;
}

export type ContactFormState = {
  name?: string;
  topic?: string;
  email?: string;
  message?: string;
  errorsInputs?: ErrorsInputs;
};

export type NamePhoneFormState = {
  name?: string;
  contactPhone?: string;
  errorsInputs?: ErrorsInputs;
}

export enum ActionTypes {
  inputChange = 'INPUT CHANGE',
  clearValues = 'CLEAR VALUES',
  throwError = 'THROW ERROR'
}

export type ReducerAction = {
  type: ActionTypes;
  field?: string | number | symbol | any;
  value?: string;
  initialValues?: ContactFormState;
  errorValue?: string;
};

export interface ChangeInputEvent extends ChangeEvent {
  target: HTMLInputElement | HTMLTextAreaElement;
}

export interface SubmitFormEvent extends FormEvent<HTMLFormElement> {
  target: HTMLFormElement;
}

export type FormInput = {
  name: string;
  value: string | boolean;
  isCheckbox: boolean;
}

export type FnSendForm = (formState: FormInput[]) => void;

export type HandleSubmitForm = (e: SubmitFormEvent, callbackSendForm: FnSendForm) => void;

export type ResError = {
  status: number;
  isOfflineError: boolean;
}
