import React from 'react';
import { FormControlLabel, FormControlLabelProps, Checkbox } from '@material-ui/core';
import { FieldConfig, useField } from 'formik';

type CustomCheckboxProps = {
  fieldConfig: Omit<FieldConfig, 'type' | 'as'>;
  labelProps?: Omit<FormControlLabelProps, 'control'>;
};

function CustomCheckbox(props: CustomCheckboxProps) {
  const [field] = useField({...props.fieldConfig, type: 'checkbox'});

  return (
    <FormControlLabel {...props.labelProps} label={props.labelProps?.label} control={<Checkbox {...field} />} />
  );
}

export default CustomCheckbox;
