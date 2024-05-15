import 'react-native-gesture-handler';
import {View, Text, SafeAreaView, StatusBar} from 'react-native';
import React from 'react';
import HomeStack from './src/navigators/HomeStack';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import tw from 'twrnc';

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaView style={tw`bg-white w-full h-full`}>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        <HomeStack />
      </SafeAreaView>
    </Provider>
  );
};

export default App;
