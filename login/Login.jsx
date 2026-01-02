import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput } from 'react-native';
import { useDispatch } from 'react-redux';
import { setUser, setCompleteAddress, setHouseDetails, setArea, setPincode, setCity, setPropertyDoc, setIsBillOnYourName } from '../redux/authslice';
import { Alert } from 'react-native';

import axios from 'axios';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://dummyjson.com/auth/login', {
        username: email,
        password: password,
      });

      // Save user to redux
      dispatch(setUser(response.data));
      
      // Save test address data to Redux for auto-populate
      dispatch(setCompleteAddress('123 Main Street, Apartment 5B, New Delhi'));
      dispatch(setHouseDetails('Flat 5B'));
      dispatch(setArea('Sector 5'));
      dispatch(setPincode('110001'));
      dispatch(setCity('New Delhi'));
      dispatch(setPropertyDoc('true'));
      dispatch(setIsBillOnYourName('NO'));

      // After login, navigate to next screen
      navigation.navigate('Welcome');
    } catch (err) {
      console.log('Login error: ', err?.response?.data || err);
      Alert.alert('Login Failed', 'Invalid username or password!');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      className="flex-1 bg-blue-50"
    >
      <View className="flex-1 items-center justify-center px-6">
        <View className="items-center mb-6">
          <Image
            className="w-20 h-20 rounded-full"
            source={{
              uri: 'https://images.unsplash.com/photo-1584441405886-bc91be61e56a?w=600',
            }}
          />
          <Text className="mt-4 text-2xl font-bold text-slate-800">MyFirstApp</Text>
          <Text className="text-sm text-slate-500">Sign in to continue  </Text>
        </View>

        <View className="w-full bg-white rounded-xl p-6 shadow-md">
          <Text className="text-sm text-slate-600 mb-1">Email</Text>
          <TextInput
            className="h-12 border border-gray-200 rounded-md px-3 mb-4 text-slate-700"
            placeholder="Email"
            placeholderTextColor="#9ca3af"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <Text className="text-sm text-slate-600 mb-1">Password</Text>
          <TextInput
            secureTextEntry
            className="h-12 border border-gray-200 rounded-md px-3 mb-6 text-slate-700"
            placeholder="Password"
            placeholderTextColor="#9ca3af"
            value={password}
            onChangeText={setPassword}
          />

n          <TouchableOpacity
            className="bg-blue-600 py-3 rounded-md items-center"
            onPress={handleLogin}
          >
            <Text className="text-white font-semibold">Sign In</Text>
          </TouchableOpacity>
        </View>

n        <View className="mt-4 flex-row">
          <Text className="text-sm text-slate-500">Don't have an account? </Text>
          <TouchableOpacity onPress={() => Alert.alert('Info', 'Signup not implemented')}>
            <Text className="text-blue-600 font-semibold ml-2">Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
} 
