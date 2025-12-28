import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../redux/authslice';

export default function WelcomeScreen({ navigation }) {
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  return (
    <View className="flex-1 bg-blue-50 items-center justify-center px-6">
      <View className="w-full bg-white rounded-xl p-6 shadow-md items-center">
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1531123414780-f0b20a8a0c7a?w=600' }}
          className="w-20 h-20 rounded-full mb-4"
        />
        <Text className="text-2xl font-bold text-slate-800 mb-1">Welcome {user?.firstName || 'User'}!</Text>
        <Text className="text-sm text-slate-500 mb-4">Glad to see you back — choose where to go next  </Text>

        <TouchableOpacity className="w-full bg-blue-600 py-3 rounded-md items-center mb-3" onPress={() => navigation.navigate('Solar Unit Form')}>
          <Text className="text-white font-semibold">Open Solar Unit Form</Text>
        </TouchableOpacity>

        <TouchableOpacity className="w-full border border-slate-200 py-3 rounded-md items-center" onPress={() => { dispatch(logout()); navigation.navigate('Logout'); }}>
          <Text className="text-slate-700">Logout </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
