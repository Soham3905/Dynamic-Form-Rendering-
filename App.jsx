import 'react-native-gesture-handler';
import { Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './login/Login';
import Welcome from './DynamicFormRendering/SolarUnitForm/components/Welcome';
import Logout from './login/Logout';
import mainComponent from './DynamicFormRendering/SolarUnitForm/mainComponent';
import OtherForm from './DynamicFormRendering/OtherForm/otherForm';
import './global.css';
import { Provider } from 'react-redux';
import { store } from './redux/store';

const Stack = createStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <View className="flex-1 bg-white items-center justify-center px-6">
      <View className="items-center mb-6">
        <Text className="text-3xl font-bold text-slate-800">Welcome to MyFirstApp</Text>
        <Text className="text-sm text-slate-500 mt-2">A simple professional demo </Text>
      </View>

      <View className="w-full max-w-md">
        <TouchableOpacity className="bg-blue-600 py-3 rounded-md items-center mb-3" onPress={() => navigation.navigate('Login')}>
          <Text className="text-white font-semibold">Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity className="border border-slate-200 py-3 rounded-md items-center" onPress={() => navigation.navigate('Welcome')}>
          <Text className="text-slate-700">Open Welcome Page </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Logout" component={Logout} />
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="Solar Unit Form" component={mainComponent} />
          <Stack.Screen name="Other Forms" component={OtherForm} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
