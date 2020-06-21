/* eslint-disable no-console */
/* eslint-disable no-alert */
import React from 'react';
import {
  View, Text, TouchableOpacity, ActivityIndicator,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import FormInput from 'components/forminput';
import Logo from 'components/logo';
import globalStyles from 'styles/styles';

// Helper functions

const activateUser = (formikValues, formikActions, uid, timestamp, navigation, verifyUser) => {
  const params = { uid, token: `${timestamp}-${formikValues.code}` };

  // signup success callback
  const onSuccess = () => {
    navigation.navigate('Login');
    formikActions.setSubmitting(false);
  };

  // signup failure callback
  const onFailure = (err) => {
    formikActions.setErrors(err.data);
    formikActions.setSubmitting(false);
  };

  try {
    verifyUser(params, onSuccess, onFailure);
  } catch (error) {
    alert('Something went very wrong');
  }
};

// Validation Schema
const validationSchema = Yup.object().shape({
  code: Yup.number()
    .required('Activation Code is required')
    .label('Activation Code'),
});

const ActivateAccount = ({
  uid, timestamp, navigation, verifyUser,
}) => (
  <View style={globalStyles.rootContainer}>
    <Logo />
    <View style={globalStyles.formContainer}>
      <Text style={globalStyles.formHeader}>Activate Account</Text>
      <Formik
        initialValues={{ code: '' }}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          activateUser(
            values,
            actions,
            uid,
            timestamp,
            navigation,
            verifyUser,
          );
        }}
      >
        {(formikProps) => (
          <>
            <FormInput
              formikProps={formikProps}
              formikKey="code"
              placeholder="Enter Activation Code sent to your email"
            />

            {formikProps.isSubmitting ? (
              <ActivityIndicator />
            ) : null}

            <TouchableOpacity
              style={globalStyles.opaqueButton}
              onPress={formikProps.handleSubmit}
            >
              <Text style={{ color: '#fefffe' }}>
                Activate Account
              </Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </View>
  </View>
);

export default ActivateAccount;
