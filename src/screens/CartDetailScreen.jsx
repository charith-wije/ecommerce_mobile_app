import {View, Text, Dimensions, Image} from 'react-native';
import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';

const CartDetailScreen = () => {
  const {cartItems} = useSelector(state => state.cart);

  useEffect(() => {
    console.log(cartItems);
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: 'white', paddingHorizontal: 15}}>
      <View
        style={{
          width: '100%',
          height: Dimensions.get('window').width * 0.33,
          borderWidth: 2,
          borderRadius: 10,
          borderColor: 'red',
          padding: 5,
        }}>
        <View style={{flexDirection: 'row', flex: 1}}>
          <View
            style={{
              width: '60%',
              height: '100%',
              alignItems: 'center',
            }}>
            <Text style={{textAlign: 'center'}}>
              {cartItems[0].name}
              {` (Size 8) `}
            </Text>
            <Text style={{textAlign: 'center'}}>
              {cartItems[0].price.currency}
              {cartItems[0].price.amount}
            </Text>
            <Image
              source={{uri: cartItems[0].mainImage}}
              style={{
                height: '50%',
                aspectRatio: 1,
                resizeMode: 'contain',
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default CartDetailScreen;
