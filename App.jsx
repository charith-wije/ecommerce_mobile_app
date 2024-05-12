import {View, Text, SafeAreaView, StatusBar} from 'react-native';
import React from 'react';
import HomeStack from './src/navigators/HomeStack';

const App = () => {
  return (
    <SafeAreaView
      style={{backgroundColor: 'white', width: '100%', height: '100%'}}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <HomeStack />
    </SafeAreaView>
  );
};

export default App;
