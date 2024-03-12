import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { themeColors } from '../../theme';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../../config/config';

const VerificationInput = ({ length, onComplete, setVerificationCode }) => {
  const [values, setValues] = useState(Array(length).fill(''));

  const handleChange = (index, value) => {
    setValues(prevValues => {
      const newValues = [...prevValues];
      newValues[index] = value;
      return newValues;
    });

    if (value && index < length - 1) {
      // Automatically move focus to the next input box
      inputRefs[index + 1].focus();
    }

    if (!value && index > 0) {
      // Move focus to the previous input box if the user deletes a character
      inputRefs[index - 1].focus();
    }

    setValues(updatedValues => {
      const completedValue = updatedValues.join('');
      if (completedValue.length === length) {
        console.log("Verification code completed:", completedValue); // Add this line to log completed verification code
        onComplete(completedValue);
        setVerificationCode(completedValue); // Update verification code state
      }
      return updatedValues;
    });
  };

  const inputRefs = Array.from({ length }, () => React.createRef());

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
      {Array(length).fill().map((_, index) => (
        <TextInput
          key={index}
          ref={ref => inputRefs[index] = ref}
          style={{ borderWidth: 1, width: 40, height: 40, marginHorizontal: 5, textAlign: 'center' }}
          maxLength={1}
          keyboardType="numeric"
          value={values[index]}
          onChangeText={text => handleChange(index, text)}
        />
      ))}
    </View>
  );
};


export default function VerifyScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const [verificationCode, setVerificationCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const { email } = route.params;


  useEffect(() => {
    let interval;
    if (resendDisabled) {
      interval = setInterval(() => {
        if (countdown > 0) {
          setCountdown(prevCountdown => prevCountdown - 1);
        } else {
          setResendDisabled(false);
          clearInterval(interval);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [resendDisabled, countdown]);

  const handleResendToken = async () => {
    try {

      console.log("Verification email", email)

      const response = await fetch(`${API_BASE_URL}/api/auth/resend-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
        }),
      });
  
      const data = await response.json();
  
      console.log("Verification token resent", data.message)
  
      // For demonstration, simulate a delay
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 2000));
      setLoading(false);
  
      setResendDisabled(true);
      setCountdown(30);
    } catch (error) {
      console.error('Error resending token:', error);
    }
  };
  
  const handleVerification = async () => {
    try {

      console.log("verificationCode", verificationCode)
      setLoading(true);

      const response = await fetch(`${API_BASE_URL}/api/auth/verify-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          verificationCode,
        }),
      });

      const data = await response.json();

      console.log("response", data)


      if (data.success) {
        // Verification successful
        // Simulating verification process for demonstration purposes
        // Replace this with your actual verification logic
        await new Promise(resolve => setTimeout(resolve, 2000));

        setVerificationSuccess(true);
      } else {
        // Handle the case when registration fails
        Alert.alert('Error', data.error.message);
      }

    } catch (error) {
      console.error('Error during verification:', error);
      // Handle verification failure
      Alert.alert('Error', 'Verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    // Navigate to the login screen
    navigation.navigate('Login');
  };

  return (
    <View className="flex-1 bg-white" style={{ backgroundColor: themeColors.otherBg }}>
      <SafeAreaView className="flex">
        {/* Your existing code for navigation */}
      </SafeAreaView>
      <View style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50, marginTop: 200 }} className="flex-1 bg-white px-8 pt-8">
        <Text style={{ color: '#004D40', textAlign: 'center', marginBottom: 20 }}>Enter Verification Code</Text>
        <View style={{ marginBottom: 20 }}>
        <VerificationInput length={5} onComplete={handleVerification} setVerificationCode={setVerificationCode} />
        </View>
        {loading ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="yellow" />
          </View>
        ) : (
          !verificationSuccess ? (
            <View>
              <TouchableOpacity onPress={() => handleVerification(verificationCode)} className="py-3 bg-green-500 rounded-xl">
                <Text className="font-xl font-bold text-center text-white">Verify</Text>
              </TouchableOpacity>
              <View className="flex-row justify-center mt-7">
                <Text className="text-gray-500 font-semibold">Didnt receive code? </Text>
                <TouchableOpacity onPress={handleResendToken} >
                    <Text className="font-bold text-greenbg-600">{resendDisabled ? `Resend in ${countdown}s` : 'Resend'}</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={{ alignItems: 'center' }}>
              <Text style={{ color: '#004D40', fontSize: 18, marginBottom: 20 }}>Verification successful!</Text>
              <TouchableOpacity onPress={handleLogin} style={{ paddingVertical: 10, paddingHorizontal: 35, backgroundColor: '#004D40', borderRadius: 10 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white', textAlign: 'center' }}>Login</Text>
              </TouchableOpacity>

              
            </View>
          )
        )}
      </View>
    </View>
  );
}
