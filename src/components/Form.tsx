import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  FormGroup,
  FormLabel,
  FormControlLabel,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core';
import { Formik, Form as FormikForm, Field } from 'formik';
import { InvestmentDetails } from './types';

const initialFormValue: InvestmentDetails = {
  fullName: '',
  investmentRisk: [],
  investmentRiskComment: '',
  dependents: -1,
  termsAndConditionsAccepted: false,
  initialInvestment: undefined
};

function Form() {
  function handleFormSubmit(formValues: InvestmentDetails) {
    console.log(formValues);
  }

  return (
    <Card>
      <CardContent>
        <Typography>Fancy form</Typography>

        <Formik initialValues={initialFormValue} onSubmit={handleFormSubmit}>
          {form => {
            console.table(form.values);

            return (
              <FormikForm>
                <Field name="fullName" as={TextField} label="Full Name" />

                <Field
                  name="initialInvestment"
                  as={TextField}
                  label="Initial investment"
                  type="number"
                />

                <FormControl>
                  <FormLabel component="legend">Investment risk</FormLabel>
                  // TODO: CUSTOM CHECKBOX COMPONENT
                  <FormGroup>
                    <FormControlLabel
                      label="Low"
                      labelPlacement="start"
                      control={
                        <Field
                          name="investmentRisk"
                          value="low"
                          type="checkbox"
                          as={Checkbox}
                        />
                      }
                    />

                    <FormControlLabel
                      label="Medium"
                      labelPlacement="start"
                      control={
                        <Field
                          name="investmentRisk"
                          value="medium"
                          type="checkbox"
                          as={Checkbox}
                        />
                      }
                    />

                    <FormControlLabel
                      label="High"
                      labelPlacement="start"
                      control={
                        <Field
                          name="investmentRisk"
                          value="high"
                          type="checkbox"
                          as={Checkbox}
                        />
                      }
                    />
                  </FormGroup>
                </FormControl>

                <Field
                  name="investmentRiskComment"
                  as={TextField}
                  label="Investment Risk Comment"
                  multiline
                />

                <FormControl>
                  <InputLabel>Dependents</InputLabel>

                  <Field name="dependents" as={Select}>
                    <MenuItem></MenuItem>
                    <MenuItem value={0}>0</MenuItem>
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                  </Field>
                </FormControl>

                <FormControl>
                  <FormLabel component="legend">Investment risk</FormLabel>

                  <FormGroup>
                    <FormControlLabel
                      label="Accept Terms and Contitions"
                      labelPlacement="end"
                      control={
                        <Field
                          name="termsAndConditionsAccepted"
                          as={Checkbox}
                        />
                      }
                    />
                  </FormGroup>
                </FormControl>

                <button type="submit">Submit</button>
              </FormikForm>
            );
          }}
        </Formik>
      </CardContent>
    </Card>
  );
}

export default Form;
