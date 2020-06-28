import React from 'react';
import {
  View, Text, TouchableOpacity, ActivityIndicator,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import FormInput from 'components/forminput';
import Logo from 'components/logo';
import globalStyles from 'styles/styles';

const handleResetPwd = (formikValues, formikActions, navigation) => {
  console.log(formikValues);
  console.log(formikActions);
  console.log(navigation);

  // Call the reset pwd api using a GET with the email the user has entered
  // write a onSuccess callback
  // write a onError callback
};

// Validation Schema
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Please enter your Email Address')
    .label('Email Address')
    .email('Please enter a valid email address'),
});

const ResetPassword = ({ navigation }) => (
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
          // Call reset password Api Here
          handleResetPwd(values, actions, navigation);
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
            ) : null}

            <TouchableOpacity
              style={globalStyles.opaqueButton}
              onPress={formikProps.handleSubmit}
            >
              <Text style={{ color: '#fefffe' }}>
                Reset Password
              </Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </View>
  </View>
);

export default ResetPassword;
