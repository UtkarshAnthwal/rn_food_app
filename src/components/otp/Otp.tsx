import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import {Colors, fontSize} from '../../utils';

const OtpVerificationScreen = () => {
  // Define the state type explicitly
  const [otp, setOtp] = useState<any>({
    otp1: '',
    otp2: '',
    otp3: '',
    otp4: '',
    otp5: '',
  });

  // Corrected otpHandler function to update specific field
  const otpHandler = (field: string, value: string) => {
    setOtp((prev: any) => ({
      ...prev,
      [field]: value, // Update only the specific OTP field
    }));
  };

  // Placeholder for OTP verification handler
  const otpVerificationHandler = () => {
    console.log('OTP Verified:', otp);
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Image
          source={{
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7zG5tTSZvM38FSJMYPdPn9lBU0eZ3vsoCDA&s',
          }}
          style={styles.image}
        />
        <Text style={styles.heading}>OTP Verification</Text>
        <Text style={styles.normalText}>Enter the verification code</Text>

        <View style={styles.otpContainer}>
          {['otp1', 'otp2', 'otp3', 'otp4', 'otp5']?.map(field => (
            <TextInput
              key={field}
              style={styles.otpField}
              value={otp[field]}
              onChangeText={text => otpHandler(field, text)}
              keyboardType="numeric"
              maxLength={1} // Ensure each input only accepts 1 character
            />
          ))}
        </View>

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={otpVerificationHandler}>
          <Text style={styles.buttonText}>Verify</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default OtpVerificationScreen;

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  otpField: {
    borderRadius: 10,
    width: 50,
    height: 50,
    borderColor: Colors.LightGrey,
    borderWidth: 1,
    textAlign: 'center',
    fontSize: fontSize.fs20,
  },
  heading: {
    fontSize: fontSize.fs24,
    color: Colors.Black,
    fontWeight: 'bold',
  },
  normalText: {
    fontSize: fontSize.fs14,
    color: Colors.Grey,
    marginTop: 10,
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
  image: {
    width: 360,
    height: 250,
  },
});
