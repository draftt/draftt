/* eslint-disable no-alert */
/* eslint-disable no-console */
import React from 'react';
import {
  View, Text, TouchableOpacity, ActivityIndicator,
} from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import FormInput from 'components/forminput';
import Logo from 'components/logo';
import globalStyles from 'styles/styles';

// Helper Functions

// Handle Login
const handleLogin = async (
  formikValues,
  formikActions,
  loginUser,
) => {
  const onSuccess = () => {
    formikActions.setSubmitting(false);
  };

  const onFailure = () => {
    formikActions.setFieldError('password', 'Login failed. Invalid credentials');
    formikActions.setSubmitting(false);
  };

  try {
    loginUser(formikValues, onSuccess, onFailure);
  } catch (error) {
    alert('Something went very wrong');
    formikActions.setSubmitting(false);
  }
};

// Validation schema
const validationSchema = yup.object().shape({
  user: yup.string().required('Username/Email is required'),
  password: yup.string().required('Password is required'),
});

const Login = ({ navigation, loginUser }) => (
  <View style={globalStyles.rootContainer}>
    <Logo />

    <View style={globalStyles.formContainer}>
      <Text style={globalStyles.formHeader}>Login</Text>
      <Formik
        initialValues={{
          user: '',
          password: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          handleLogin(values, actions, loginUser);
        }}
      >
        {(formikProps) => (
          <>
            <FormInput
              formikProps={formikProps}
              formikKey="user"
              placeholder="Username"
            />
            <FormInput
              formikProps={formikProps}
              formikKey="password"
              placeholder="Password"
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
                  Sign In
                </Text>
              </TouchableOpacity>
            )}
          </>
        )}
      </Formik>

      <TouchableOpacity style={globalStyles.transparentButton}>
        <Text
          style={{ color: '#fd7719' }}
          onPress={() => {
            navigation.navigate('ResetPassword');
          }}
        >
          Forgot Password?
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={globalStyles.transparentButton}
        onPress={() => {
          navigation.navigate('Signup');
        }}
      >
        <Text style={{ color: '#fd7719' }}>
          No Account? Sign up!
        </Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default Login;
