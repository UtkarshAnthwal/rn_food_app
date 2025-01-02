import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors, fontSize} from '../../utils';
import {responsiveHeight} from 'react-native-responsive-dimensions';

const SignupScreen = () => {
  // const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  // For error messages
  const [errors, setErrors] = useState<any>({});

  const validateForm = () => {
    let valid = true;
    const newErrors: any = {};

    // Email validation (Basic format check)
    if (!email) {
      valid = false;
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      valid = false;
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation (Check if not empty)
    if (!password) {
      valid = false;
      newErrors.password = 'Password is required';
    }

    // Confirm password validation (Check if passwords match)
    if (!confirmPassword) {
      valid = false;
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      valid = false;
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return valid;
  };

  const loginHandler = () => {
    if (validateForm()) {
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Text
            style={{textAlign: 'center', marginBottom: 10, ...styles.boldText}}>
            Sign Up to Your Account
          </Text>

          {/* Email input */}
          <TextInput
            style={[styles.inputText, errors.email && styles.errorBorder]}
            value={email}
            onChangeText={(text: string) => setEmail(text)}
            placeholder="Enter your mail"
          />
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

          {/* Password input */}
          <TextInput
            secureTextEntry
            value={password}
            onChangeText={(text: string) => setPassword(text)}
            style={[styles.inputText, errors.password && styles.errorBorder]}
            placeholder="Enter your password"
          />
          {errors.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}

          {/* Confirm Password input */}
          <TextInput
            secureTextEntry
            value={confirmPassword}
            onChangeText={(text: string) => setConfirmPassword(text)}
            style={[
              styles.inputText,
              errors.confirmPassword && styles.errorBorder,
            ]}
            placeholder="Confirm your password"
          />
          {errors.confirmPassword && (
            <Text style={styles.errorText}>{errors.confirmPassword}</Text>
          )}

          {/* Register button */}
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={loginHandler}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignupScreen;

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
  errorBorder: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: fontSize.fs12,
    textAlign: 'left',
    marginTop: 5,
  },
});
