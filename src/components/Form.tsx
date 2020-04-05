import React, { useMemo } from 'react';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  FormGroup,
  FormLabel,
  FormControl,
  MenuItem,
  Button,
  FormHelperText
} from '@material-ui/core';
import { Formik, Form as FormikForm, Field, FormikHelpers } from 'formik';
import * as yup from 'yup';
import { InvestmentDetails } from './types';
import CustomCheckbox from './CustomCheckbox';

const initialFormValue: InvestmentDetails = {
  fullName: '',
  investmentRisk: [],
  investmentRiskComment: '',
  dependents: -1,
  termsAndConditionsAccepted: false,
  initialInvestment: undefined
};

const formValidationSchema = yup.object().shape({
  fullName: yup
    .string()
    .required('Please provide your Full Name')
    .min(3, 'Please provied mnimum of 3 characters'),
  investmentRisk: yup
    .array(
      yup
        .string()
        .oneOf(
          ['high', 'medium', 'low'],
          'Invalid value provided to Investment risk'
        )
    )
    .required('Investment Risk is required!'),
  investmentRiskComment: yup.mixed().when('investmentRisk', {
    is: val => val.length,
    then: yup
      .string()
      .required('Please provide comment for Investment Risk')
      .min(5, 'Plese provide comment with at least 5 characters!')
  }),
  dependents: yup.number(),
  termsAndConditionsAccepted: yup
    .boolean()
    .oneOf([true], 'Please accept our Terms and Conditions'),
  initialInvestment: yup
    .number()
    .required('Initial investment is required')
    .min(100, 'Minimum investment value is 100')
});

function Form() {
  const prefilledFormValues = useMemo(() => {
    const storedValues = JSON.parse(localStorage.getItem('formData')!);

    return storedValues || initialFormValue;
  }, []);

  function handleFormSubmit(
    formValues: InvestmentDetails,
    formikHelpers: FormikHelpers<InvestmentDetails>
  ) {
    localStorage.setItem('formData', JSON.stringify(formValues));

    setTimeout(() => {
      formikHelpers.setSubmitting(false);
    }, 2000);
  }

  const formGroupStyles = {
    width: '50%',
    marginTop: '3rem'
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h4">Fancy form</Typography>

        <Formik
          initialValues={prefilledFormValues}
          onSubmit={handleFormSubmit}
          validationSchema={formValidationSchema}
        >
          {form => (
            <FormikForm>
              <FormGroup style={{ ...formGroupStyles }}>
                <Field
                  name="fullName"
                  as={TextField}
                  label="Full Name"
                  variant="outlined"
                  error={Boolean(form.errors.fullName)}
                  helperText={form.errors.fullName}
                />
              </FormGroup>

              <FormGroup style={{ ...formGroupStyles }}>
                <Field
                  name="initialInvestment"
                  as={TextField}
                  label="Initial investment"
                  type="number"
                  variant="outlined"
                  error={Boolean(form.errors.initialInvestment)}
                  helperText={form.errors.initialInvestment}
                />
              </FormGroup>

              <FormGroup style={{ ...formGroupStyles }}>
                <FormControl
                  error={Boolean(form.errors.investmentRisk)}
                  style={{ alignItems: 'flex-start' }}
                >
                  <FormLabel component="legend">Investment risk</FormLabel>

                  <FormGroup>
                    <CustomCheckbox
                      fieldConfig={{ name: 'investmentRisk', value: 'low' }}
                      labelProps={{ label: 'Low', labelPlacement: 'start' }}
                    />

                    <CustomCheckbox
                      fieldConfig={{
                        name: 'investmentRisk',
                        value: 'medium'
                      }}
                      labelProps={{
                        label: 'Medium',
                        labelPlacement: 'start'
                      }}
                    />

                    <CustomCheckbox
                      fieldConfig={{ name: 'investmentRisk', value: 'high' }}
                      labelProps={{ label: 'High', labelPlacement: 'start' }}
                    />
                  </FormGroup>

                  <FormHelperText>{form.errors.investmentRisk}</FormHelperText>
                </FormControl>
              </FormGroup>

              <FormGroup style={{ ...formGroupStyles }}>
                <Field
                  name="investmentRiskComment"
                  as={TextField}
                  label="Investment Risk Comment"
                  variant="outlined"
                  multiline
                  error={Boolean(form.errors.investmentRiskComment)}
                  helperText={form.errors.investmentRiskComment}
                />
              </FormGroup>

              <FormGroup style={{ ...formGroupStyles }}>
                <Field
                  name="dependents"
                  as={TextField}
                  label="Dependents"
                  select
                  variant="outlined"
                  error={Boolean(form.errors.dependents)}
                  helperText={form.errors.dependents}
                >
                  <MenuItem value={-1}></MenuItem>
                  <MenuItem value={0}>0</MenuItem>
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                </Field>
              </FormGroup>

              <FormGroup style={{ ...formGroupStyles }}>
                <FormControl
                  error={Boolean(form.errors.termsAndConditionsAccepted)}
                >
                  <FormLabel component="legend">Terms and Contitions</FormLabel>

                  <FormGroup style={{ ...formGroupStyles }}>
                    <CustomCheckbox
                      fieldConfig={{ name: 'termsAndConditionsAccepted' }}
                      labelProps={{
                        label: 'Accept Terms and Contitions',
                        labelPlacement: 'end'
                      }}
                    />
                  </FormGroup>

                  <FormHelperText>
                    {form.errors.termsAndConditionsAccepted}
                  </FormHelperText>
                </FormControl>
              </FormGroup>

              <FormGroup style={{ marginTop: '3rem' }}>
                <Button
                  style={{ alignSelf: 'flex-start' }}
                  type="submit"
                  variant="contained"
                  color="secondary"
                  disabled={form.isSubmitting}
                >
                  {form.isSubmitting ? 'Processing...' : 'Submit'}
                </Button>
              </FormGroup>
            </FormikForm>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
}

export default Form;
