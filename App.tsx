import React from 'react';
// import {SafeAreaView} from 'react-native';
import {MainStack} from './src/router';

if (__DEV__) {
  require('./src/services/config/Reactotron');
}
const App = () => {
  return (
    // <SafeAreaView>
    <MainStack />
    // </SafeAreaView>
  );
};
export default App;
