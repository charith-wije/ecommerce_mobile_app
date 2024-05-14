import 'react-native-gesture-handler';
import {View, Text, SafeAreaView, StatusBar} from 'react-native';
import React from 'react';
import HomeStack from './src/navigators/HomeStack';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaView
        style={{backgroundColor: 'white', width: '100%', height: '100%'}}>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        <HomeStack />
      </SafeAreaView>
    </Provider>
  );
};

export default App;
