import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import FormInput from 'components/forminput';
import Logo from 'components/logo';
import globalStyles from 'styles/styles';

const handleNewPwd = (formikValues, formikActions, uid, timestamp, navigation, setNewPwd) => {
  const params = { uid, token: `${timestamp}-${formikValues.code}`, password: formikValues.password };

  const onSuccess = () => {
    formikActions.setSubmitting(false);
    navigation.navigate('Login');
  };

  const onFailure = () => {
    // TODO: Maybe set errors from the response object
    formikActions.setSubmitting(false);
    formikActions.setFieldError('confirmPassword', 'Could not reset password. Please make sure you have entered the correct reset code');
  };

  try {
    setNewPwd(params, onSuccess, onFailure);
  } catch (error) {
    alert('SOMETHING WENT VERY WRONG');
  }
};

// Validation Schema
const validationSchema = Yup.object().shape({
  code: Yup.number().required('Please enter the reset code you received in your email'),
  password: Yup.string().required(),
  confirmPassword: Yup.string()
    .required()
    .equals([Yup.ref('password')], 'Passwords do not match'),
});

const NewPassword = ({
  uid, timestamp, navigation, setNewPwd,
}) => (
  <View style={globalStyles.rootContainer}>
    <Logo />
    <View style={globalStyles.formContainer}>
      <Text style={globalStyles.formHeader}>New Password Screen</Text>
      <Formik
        initialValues={{
          code: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          handleNewPwd(values, actions, uid, timestamp, navigation, setNewPwd);
        }}
      >
        {(formikProps) => (
          <>
            <FormInput
              formikProps={formikProps}
              formikKey="code"
              placeholder="Enter Password reset code"
            />
            <FormInput
              formikProps={formikProps}
              formikKey="password"
              placeholder="Enter New Password"
              secureTextEntry
            />
            <FormInput
              formikProps={formikProps}
              formikKey="confirmPassword"
              placeholder="Re-Enter New Password"
              secureTextEntry
            />
            {formikProps.isSubmitting ? (
              <ActivityIndicator />
            ) : null}

            <TouchableOpacity
              style={globalStyles.opaqueButton}
              onPress={formikProps.handleSubmit}
            >
              <Text style={{ color: '#fefffe' }}>Submit</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </View>
  </View>
);

export default NewPassword;
