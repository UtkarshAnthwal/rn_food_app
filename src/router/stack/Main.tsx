import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {LoginScreen, SignupScreen} from '../../screens';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="login"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="signup" component={SignupScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default MainStack;
