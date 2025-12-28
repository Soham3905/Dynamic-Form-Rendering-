import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/authslice';

export default function LogoutScreen({ navigation }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logout());
  }, [dispatch]);

  return (
    <View className="flex-1 bg-blue-50 items-center justify-center px-6">
      <View className="w-full bg-white rounded-xl p-6 shadow-md items-center">
        <Text className="text-2xl font-bold text-slate-800 mb-2">You're signed out </Text>
        <Text className="text-sm text-slate-500 mb-6">You have been logged out successfully.   </Text>

        <TouchableOpacity className="w-full bg-blue-600 py-3 rounded-md items-center" onPress={() => navigation.navigate('Login')}>
          <Text className="text-white font-semibold">Back to Login </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
