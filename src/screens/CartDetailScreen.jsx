import {
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import OcticonsIcon from 'react-native-vector-icons/Octicons';
import {
  addItem,
  removeItem,
  removeWholeItem,
} from '../redux/reducers/cartReducer';

const CartDetailScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {cartItems} = useSelector(state => state.cart);

  useEffect(() => {
    console.log(cartItems);
  }, []);

  const handleItemAdd = item => {
    console.log(item.units, 'ppppppppppppppppppp');
    dispatch(addItem(item));
  };

  const handleItemRemove = () => {};

  const totalSum = cartItems.reduce(
    (acc, item) => acc + parseFloat(item.sum),
    0,
  );

  const renderItem = ({item, index}) => {
    return (
      <View
        style={{
          width: '100%',
          height: Dimensions.get('window').width * 0.33,
          borderWidth: 2,
          borderRadius: 10,
          borderColor: 'red',
          padding: 5,
          marginBottom: 10,
        }}>
        <View style={{flexDirection: 'row', flex: 1}}>
          <View
            style={{
              width: '60%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{textAlign: 'center'}}>
              {item.name}
              {` Size ${item.choosedSize} `}
            </Text>
            <Text style={{textAlign: 'center'}}>
              {item.price.currency}
              {item.sum}
            </Text>
            <Image
              source={{uri: item.mainImage}}
              style={{
                height: '50%',
                aspectRatio: 1,
                resizeMode: 'contain',
              }}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                width: '40%',
                height: '100%',
                alignItems: 'center',
                paddingVertical: 10,
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                style={{
                  width: Dimensions.get('window').width * 0.07,
                  aspectRatio: 1,
                  borderRadius: 20,
                  borderWidth: 2,
                  borderColor: 'red',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
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
                style={{
                  width: Dimensions.get('window').width * 0.07,
                  aspectRatio: 1,
                  borderRadius: 20,
                  borderWidth: 2,
                  borderColor: 'red',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => {
                  dispatch(removeItem(item));
                }}>
                <MCIcon name="minus" size={20} color="#3b2eb0" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={{position: 'absolute', right: 10, top: 5}}
          onPress={() => {
            dispatch(removeWholeItem(item));
          }}>
          <OcticonsIcon name="x" size={30} color="#3b2eb0" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white', paddingHorizontal: 15}}>
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <TouchableOpacity
        style={{
          width: '100%',
          height: Dimensions.get('window').width * 0.15,
          backgroundColor: '#000000',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 15,
          alignSelf: 'center',
          bottom: 10,
        }}
        onPress={() => {}}>
        <Text style={{color: 'white'}}>
          Total Price :{' '}
          {cartItems.length == 0 ? 'GBP' : cartItems[0].price.currency}{' '}
          {totalSum.toFixed(2)}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          width: '100%',
          height: Dimensions.get('window').width * 0.15,
          backgroundColor: '#000000',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 15,
          alignSelf: 'center',
          bottom: 10,
        }}
        onPress={() => {
          //const {cartItems} = useSelector(state => state.cart);
          navigation.navigate('Home', {cartItems});
        }}>
        <Text style={{color: 'white'}}>Go To Store</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CartDetailScreen;
