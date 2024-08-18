import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  FormState,
  IPayloadAddForm,
  FormType,
  PayloadResetIsNew,
} from '../types';

const initialState: FormState = {
  controlledForms: [],
  uncontrolledForms: [],
};

export const formsSlice = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    addFormData: (state, action: PayloadAction<IPayloadAddForm>) => {
      if (action.payload.formType === FormType.Controlled) {
        state.controlledForms.push({
          ...action.payload.form,
        });
      } else {
        state.uncontrolledForms.push({
          ...action.payload.form,
        });
      }
    },
    resetNewFlag: (state, action: PayloadAction<PayloadResetIsNew>) => {
      const id = action.payload.id;
      if (action.payload.formType === FormType.Controlled) {
        const form = state.controlledForms.find((form) => form.id === id);
        if (form) {
          form.isNew = false;
        }
      } else {
        const form = state.uncontrolledForms.find((form) => form.id === id);
        if (form) {
          form.isNew = false;
        }
      }
    },
  },
});

export const { addFormData, resetNewFlag } = formsSlice.actions;

export default formsSlice.reducer;
