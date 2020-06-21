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
import api from 'src/api';
import globalStyles from 'styles/styles';

// Helper functions

// Handle Signup
const handleSubmit = (values, actions, navigation, setUserInfo) => {
  const params = {
    fullname: values.name,
    username: values.username,
    email: values.email,
    password: values.password,
  };

  // TODO:
  // - fix the onSuccess callback, make it snazzy
  // - write a onError callback, make it also snazzy

  const onSuccess = () => {
    console.log('In onSuccess callback');
    navigation.navigate('ActivateAccount');
  };

  try {
    console.log('About to call redux function from Signup.js');
    setUserInfo(params, onSuccess);
  } catch (error) {
    // show the user some error messages
    alert('Something went very wrong');
  }

  actions.setSubmitting(false);

  // api.post('/user/create/', params)
  //   .then(({ data }) => {
  //     // Successfully signed up
  //     const userData = data;
  //     setUserInfo(userData);
  //     navigation.navigate('ActivateAccount');
  //   })
  //   .catch((err) => {
  //     // Error signing up
  //     if (err.code === 'ECONNABORTED') {
  //       // server timed out
  //       alert('Server took too long to respond');
  //     } else {
  //       // server returned an error
  //       switch (err.response.status) {
  //         case 400: {
  //           const serverValidErr = err.response.data;
  //           actions.setErrors(serverValidErr);
  //           break;
  //         }
  //         default:
  //           alert('Oops...Something went wrong');
  //           console.log(err.response);
  //       }
  //     }
  //   })
  //   .finally(() => {
  //     // in all cases, we want to set submitting to false to disable spinner
  //     actions.setSubmitting(false);
  //   });
};

// Validation Schema
const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  username: Yup.string().required('Username is required'),
  email: Yup.string()
    .required('Email is required')
    .email('Please enter a valid email address'),
  password: Yup.string().required('Password is required'),
  confirmPassword: Yup.string()
    .required('Enter password again')
    .equals([Yup.ref('password')], 'Passwords do not match'),
});

// Component
const Signup = ({ setUserInfo, navigation }) => (
  <View style={globalStyles.rootContainer}>
    <Logo />
    <View style={globalStyles.formContainer}>
      <Text style={globalStyles.formHeader}>Sign up</Text>
      <Formik
        initialValues={{
          name: '',
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => handleSubmit(values, actions, navigation, setUserInfo)}
      >
        {(formikProps) => (
          <>
            <FormInput
              formikProps={formikProps}
              formikKey="name"
              placeholder="Name"
            />
            <FormInput
              formikProps={formikProps}
              formikKey="username"
              placeholder="Username"
            />
            <FormInput
              formikProps={formikProps}
              formikKey="email"
              placeholder="Email"
            />
            <FormInput
              formikProps={formikProps}
              formikKey="password"
              placeholder="Password"
              secureTextEntry
            />
            <FormInput
              formikProps={formikProps}
              formikKey="confirmPassword"
              placeholder="Confirm Password"
              secureTextEntry
            />
            {formikProps.isSubmitting ? (
              <ActivityIndicator />
            ) : (
              <TouchableOpacity
                style={globalStyles.opaqueButton}
                onPress={formikProps.handleSubmit}
              >
                <Text style={{ color: '#fefffe' }}>
                  Sign up
                </Text>
              </TouchableOpacity>
            )}
          </>
        )}
      </Formik>
    </View>
  </View>
);

export default Signup;
