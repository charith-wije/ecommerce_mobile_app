import {View, Text, Image, TouchableOpacity, FlatList} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import OcticonsIcon from 'react-native-vector-icons/Octicons';
import {
  addItem,
  removeItem,
  removeWholeItem,
} from '../redux/reducers/cartReducer';

import tw from 'twrnc';

const CartDetailScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {cartItems} = useSelector(state => state.cart);

  const handleItemAdd = item => {
    dispatch(addItem(item));
  };

  const totalSum = cartItems.reduce(
    (acc, item) => acc + parseFloat(item.sum),
    0,
  );

  const renderItem = ({item, index}) => {
    return (
      <View style={tw`w-full h-33 border-2 rounded-lg border-red-500 p-2 mb-3`}>
        <View style={tw`flex-row flex-1`}>
          <View style={tw`w-3/5 h-full items-center justify-between`}>
            <Text style={tw`text-center`}>
              {item.name}
              {` Size ${item.choosedSize} `}
            </Text>
            <Text style={tw`text-center`}>
              {item.price.currency}
              {item.sum}
            </Text>
            <Image
              source={{uri: item.mainImage}}
              style={tw`h-1/2 aspect-video resizeMode-contain`}
            />
          </View>
          <View style={tw`flex-row`}>
            <View style={tw`w-2/5 h-full items-center py-2 justify-between`}>
              <TouchableOpacity
                style={tw`w-7 h-7 rounded-full border-2 border-red-500 items-center justify-center`}
                onPress={() => {
                  let tempItem = item;
                  // Make a copy of the object to avoid mutating state directly
                  const updatedItem = {...tempItem};
                  // Modify the parameter
                  updatedItem.units = 1;
                  handleItemAdd(updatedItem);
                }}>
                <MCIcon name="plus" size={20} color="#3b2eb0" />
              </TouchableOpacity>
              <Text>{item.units}</Text>
              <TouchableOpacity
                style={tw`w-7 h-7 rounded-full border-2 border-red-500 items-center justify-center`}
                onPress={() => {
                  dispatch(removeItem(item));
                }}>
                <MCIcon name="minus" size={20} color="#3b2eb0" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={tw`absolute top-1 right-3`}
          onPress={() => {
            dispatch(removeWholeItem(item));
          }}>
          <OcticonsIcon name="x" size={30} color="#3b2eb0" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={tw`flex-1 bg-white px-5`}>
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <TouchableOpacity
        style={tw`w-full h-15 bg-black justify-center items-center mt-15 self-center bottom-10`}
        onPress={() => {}}>
        <Text style={tw`text-white`}>
          Total Price :{' '}
          {cartItems.length == 0 ? 'GBP' : cartItems[0].price.currency}{' '}
          {totalSum.toFixed(2)}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={tw`w-full h-15 bg-black justify-center items-center mt-5 self-center bottom-10`}
        onPress={() => {
          navigation.navigate('Home', {cartItems});
        }}>
        <Text style={tw`text-white`}>Go To Store</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CartDetailScreen;
