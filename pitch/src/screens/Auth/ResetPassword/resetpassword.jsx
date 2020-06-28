import React from 'react';
import {
  View, Text, TouchableOpacity, ActivityIndicator,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import FormInput from 'components/forminput';
import Logo from 'components/logo';
import globalStyles from 'styles/styles';

const handleResetPwd = (formikValues, formikActions, navigation, resetPwd) => {
  const onSuccess = () => {
    formikActions.setSubmitting(false);
    navigation.navigate('NewPassword');
  };

  const onFailure = () => {
    formikActions.setFieldError('email', 'Could not reset password. Please enter your Email Address again');
    formikActions.setSubmitting(false);
  };

  try {
    resetPwd(formikValues, onSuccess, onFailure);
  } catch (err) {
    alert('Something went very wrong');
  }
};

// Validation Schema
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Please enter your Email Address')
    .label('Email Address')
    .email('Please enter a valid email address'),
});

const ResetPassword = ({ navigation, resetPwd }) => (
  <View style={globalStyles.rootContainer}>
    <Logo />
    <View style={globalStyles.formContainer}>
      <Text style={globalStyles.formHeader}>
        Reset Password Screen
      </Text>
      <Formik
        initialValues={{ email: '' }}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          handleResetPwd(values, actions, navigation, resetPwd);
        }}
      >
        {(formikProps) => (
          <>
            <FormInput
              formikProps={formikProps}
              formikKey="email"
              placeholder="Enter Email Address"
            />

            {formikProps.isSubmitting ? (
              <ActivityIndicator />
            ) : (
              <TouchableOpacity
                style={globalStyles.opaqueButton}
                onPress={formikProps.handleSubmit}
              >
                <Text style={{ color: '#fefffe' }}>
                  Reset Password
                </Text>
              </TouchableOpacity>
            )}
          </>
        )}
      </Formik>
    </View>
  </View>
);

export default ResetPassword;
