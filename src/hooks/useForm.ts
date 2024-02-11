import { Reducer, useReducer } from 'react';
import {
  ActionTypes,
  ChangeInputEvent,
  ReducerAction,
  SubmitFormEvent,
  FnSendForm,
  ContactFormState,
  ReportEstateFormState,
  NamePhoneFormState,
  FormInput
} from 'types/FormTypes';
import { useValidators } from './useValidators';
import { SelectChangeEvent } from '@mui/material/Select';

// @ts-ignore
const formReducer: Reducer<ContactFormState | NamePhoneFormState | ReportEstateFormState, ReducerAction> = (
  state,
  action
) => {
  switch (action.type) {
    case ActionTypes.inputChange:
      return {
        ...state,
        [action.field]: action.value
      };
    case ActionTypes.clearValues:
      return {
        ...action.initialValues
      };
    case ActionTypes.throwError:
      return {
        ...state,
        errorsInputs: {
          ...state.errorsInputs,
          [action.field]: action.errorValue
        }
      };
    default:
      return state;
  }
};

export const useForm = (initialValues: ContactFormState | NamePhoneFormState | ReportEstateFormState) => {
  const [formValues, dispatch] = useReducer(formReducer, initialValues);

  const handleThrowError = (inputName: string, errorMessage: string) => {
    dispatch({
      type: ActionTypes.throwError,
      field: inputName,
      errorValue: errorMessage
    });
  };

  const { validateEmpty, validateEmail, validatePhone, validateCheckbox } =
    useValidators(handleThrowError);
  
  const validateSelectInput = (target: { value: string, name: string }, defaultValue: string, id: string) => {
    const inputValueBox = document.querySelector(`#${id}`) as HTMLDivElement;
    const parent = inputValueBox.parentNode as HTMLDivElement;
    const nativeInput = parent.querySelector('.MuiSelect-nativeInput') as HTMLInputElement;
    
    if (parent.dataset.required === 'true') {
      nativeInput.setAttribute('placeholder', defaultValue);
      validateEmpty(nativeInput);
      if (target.value.toLowerCase() === defaultValue.toLowerCase()) handleThrowError(target.name, 'Wybierz opcję')
    }
  }

  const handleSelectInputChange = (e: SelectChangeEvent, defaultValue: string, id: string) => {
    validateSelectInput(e.target, defaultValue, id);
    
    dispatch({
      type: ActionTypes.inputChange,
      field: e.target.name,
      value: e.target.value
    })
  }
  
  const handleInputChange = (e: ChangeInputEvent) => {
    if (e.target.dataset.required === 'true') {
      if (e.target.type !== 'checkbox') validateEmpty(e.target);
      if (e.target.type === 'email') validateEmail(e.target);
      if (e.target.type === 'tel') validatePhone(e.target);
      if (e.target.type === 'checkbox') validateCheckbox(e.target as HTMLInputElement);
    }

    dispatch({
      type: ActionTypes.inputChange,
      field: e.target.name,
      value: e.target.value
    });
  };

  const handleClearForm = (initialValues: ContactFormState | NamePhoneFormState | ReportEstateFormState) => {
    dispatch({ type: ActionTypes.clearValues, initialValues });
  };

  const handleSubmitForm = (e: SubmitFormEvent, callbackSendForm: FnSendForm) => {
    e.preventDefault();
    const isFormValid: Array<boolean> = [];
    const formInputs = Array.from(
      e.target.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input, textarea')
    );

    formInputs.forEach((input) => {
      if (input.dataset.required === 'true') {
        if (input.type !== 'checkbox') validateEmpty(input);
        if (input.type === 'email') validateEmail(input);
        if (input.type === 'tel') validatePhone(input);
        if (input.type === 'checkbox') validateCheckbox(input as HTMLInputElement);
      } else if (input.classList.contains('MuiSelect-nativeInput')) {
        const id = input.dataset.id as string;
        validateSelectInput({ value: input.value, name: input.name }, input.dataset.placeholder as string, id);
      }
    });

    setTimeout(async () => {
      const errorsMessages = e.target.querySelectorAll('p');
      for (let i = 0; i < errorsMessages.length; i++) {
        if (errorsMessages[i].getAttribute('id') !== 'response')
          isFormValid[i] = errorsMessages[i].textContent === '';
      }

      const inputs = formInputs.map((input): FormInput => {
        return {
          name: input.name,
          //@ts-ignore
          value: input.type === 'checkbox' ? input.checked : input.value,
          isCheckbox: input.type === 'checkbox'
        };
      });

      if (!isFormValid.includes(false)) {
        await callbackSendForm(inputs);
      }
    }, 500);
  };

  return {
    formValues,
    handleInputChange,
    handleSelectInputChange,
    handleClearForm,
    handleThrowError,
    handleSubmitForm
  };
};
