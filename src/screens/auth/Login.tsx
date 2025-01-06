import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {Colors, fontSize} from '../../utils';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {useNavigation} from '@react-navigation/native';
import {OtpVerificationScreen} from '../../components';

 GoogleSignin.configure({
  webClientId: '341941366942-eso5o839990agfqser44fp92phi3d700.apps.googleusercontent.com'
})

const LoginScreen = () => {
  const navigation = useNavigation<any>();
  const [otpStatus, setOtpStatus] = useState<boolean>(false);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<any>({}); // State to store validation errors

  // Email validation regex
  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Password validation
  const validatePassword = (password: string) => {
    return password.length >= 6; // Minimum length of 6 characters
  };

  // Handler for login validation
  const loginHandler = () => {
    let valid = true;
    const errorsObj: any = {};

    // Validate email
    if (!email || !validateEmail(email)) {
      errorsObj.email = 'Please enter a valid email address';
      valid = false;
    }

    // Validate password
    if (!password || !validatePassword(password)) {
      errorsObj.password = 'Password must be at least 6 characters';
      valid = false;
    }

    // Set errors state if validation fails
    if (!valid) {
      setErrors(errorsObj);
      return;
    }

    // Clear errors if validation passes
    setErrors({});

    // Proceed with login logic (e.g., calling an API or navigating)
    setTimeout(() => {
      setOtpStatus(true);
    }, 5000);
  };

  // Navigate to signup screen
  const navigationHandler = () => {
    navigation.navigate('signup');
  };

  const googleSignInHandler = async () =>  {
    // Ensure the device supports Google Play services
    // await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    // Obtain the user's ID token
    const {idToken}: any = await GoogleSignin.signIn();
    console.log('Id Token', idToken);

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Link the user's account with the Google credential
    // const firebaseUserCredential = await auth().currentUser.linkWithCredential(
    //   googleCredential,
    // );
    //  Handle the linked account as needed in your app
    try { 
      let loginUser = await auth().signInWithCredential(googleCredential);
      console.log('Login User', loginUser);
    } catch (error) {
      console.log('Error', error);
    }
  }

  return (
    <SafeAreaView>
      <ScrollView>
        {otpStatus ? (
          <OtpVerificationScreen />
        ) : (
          <View style={styles.container}>
            <Text
              style={{
                textAlign: 'center',
                marginBottom: 10,
                ...styles.boldText,
              }}>
              Log In to Your Account
            </Text>

            {/* Email input with error message */}
            <TextInput
              style={[
                styles.inputText,
                errors.email && {borderColor: Colors.Red},
              ]}
              value={email}
              onChangeText={(text: string) => setEmail(text)}
              placeholder="Enter your mail"
            />
            {errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}

            {/* Password input with error message */}
            <TextInput
              secureTextEntry
              value={password}
              onChangeText={(text: string) => setPassword(text)}
              style={[
                styles.inputText,
                errors.password && {borderColor: Colors.Red},
              ]}
              placeholder="Enter your password"
            />
            {errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}

            <Text style={styles.forgotText}>Forgot password?</Text>

            {/* Login button */}
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={loginHandler}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            {/* Google login button */}
            <TouchableOpacity
              style={styles.googleButtonContainer}
              onPress={googleSignInHandler}>
              <Image source={{uri: '../../assets/images/google.png'}} />
              <Text style={styles.googleButtonText}>Continue with Google</Text>
            </TouchableOpacity>

            {/* Signup navigation */}
            <Text
              style={{
                marginTop: 20,
                textAlign: 'center',
                color: Colors.Grey,
                fontSize: fontSize.fs12,
              }}>
              Don't have an account?{' '}
              <Text
                style={{color: Colors.Red, fontSize: fontSize.fs12}}
                onPress={navigationHandler}>
                Create an account
              </Text>
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    margin: 20,
    marginTop: responsiveHeight(15),
  },
  boldText: {
    fontSize: fontSize.fs24,
    fontWeight: 'bold',
  },
  inputText: {
    borderColor: Colors.LightGrey,
    borderWidth: 1,
    borderRadius: 20,
    padding: 15,
    marginTop: 15,
  },
  buttonContainer: {
    marginTop: 15,
    borderRadius: 20,
    backgroundColor: Colors.Red,
    padding: 15,
  },
  buttonText: {
    color: Colors.White,
    textAlign: 'center',
    fontSize: fontSize.fs14,
    fontWeight: 'bold',
  },
  googleButtonContainer: {
    marginTop: 15,
    borderRadius: 20,
    backgroundColor: Colors.White,
    padding: 15,
    borderWidth: 1,
    borderColor: Colors.Black,
  },
  googleButtonText: {
    color: Colors.Black,
    textAlign: 'center',
    fontSize: fontSize.fs14,
    fontWeight: 'bold',
  },
  forgotText: {
    margin: 10,
    textAlign: 'right',
    color: Colors.Primary,
    fontSize: fontSize.fs12,
  },
  errorText: {
    color: Colors.Red,
    fontSize: fontSize.fs12,
    marginTop: 5,
    textAlign: 'left',
  },
});
