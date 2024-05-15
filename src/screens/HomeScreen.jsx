import {
  View,
  Text,
  TextInput,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import IIcon from 'react-native-vector-icons/Ionicons';
import {getProducts} from '../redux/Actions/ProductAction';
import tw from 'twrnc';

let eachUnitsOfCart = null;

const HomeScreen = ({navigation, route}) => {
  const {products, loader} = useSelector(state => state.products);
  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState('');
  const [rerender, setRerender] = useState(false);

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  useEffect(() => {
    if (!loader) {
      getCartUnitsInEachProduct();
    }
    setRerender(!rerender);
  }, [route.params?.cartItems, searchQuery]);

  const getCartUnitsInEachProduct = () => {
    if (!loader) {
      eachUnitsOfCart = [];
      filterData().map((item, index) => {
        eachUnitsOfCart.push(0);
        route.params?.cartItems.map((cartItem, cartItemIndex) => {
          if (cartItem.id[0] == item.id) {
            eachUnitsOfCart[index] = eachUnitsOfCart[index] + cartItem.units;
          }
        });
      });
    }
  };

  // Function to filter data based on search query
  const filterData = () => {
    return products.data.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  };

  // Update searchQuery state when input changes
  const handleSearch = text => {
    setSearchQuery(text);
  };

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={tw`w-43 aspect-square bg-white mb-4`}
        onPress={() => {
          navigation.navigate('ProductDetails', {item});
        }}>
        {eachUnitsOfCart !== null ? (
          eachUnitsOfCart[index] !== 0 ? (
            <View
              style={tw`w-7 aspect-square bg-black rounded-full justify-center items-center absolute right-3 top-3`}>
              <Text style={tw`text-white text-base`}>
                {eachUnitsOfCart !== null ? eachUnitsOfCart[index] : 0}
              </Text>
            </View>
          ) : null
        ) : null}
        <Image
          style={tw`w-full h-1/2`}
          source={{
            uri: item.mainImage,
          }}
          resizeMode="contain"
          onError={error => console.error('Error loading image:', error)}
        />
        <View style={tw`pl-4 h-1/2 justify-center`}>
          <Text style={tw`text-gray-700 font-medium text-base`}>
            {item.brandName}
          </Text>
          <Text style={tw`text-black font-medium`}>
            {'\u00A3'}
            {item.price.amount}
          </Text>
          <Text style={tw`text-black text-xs`}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      {loader && (
        <View style={tw`flex-1 justify-center items-center`}>
          <Text style={tw`text-xl font-semibold`}>Loading...</Text>
        </View>
      )}
      {!loader && (
        <>
          <View
            style={tw`w-90 h-1/15 justify-center items-center self-center mt-3 mb-3 flex-row`}>
            <TextInput
              style={tw`h-full w-80 mr-3 pl-5 border border-gray-400 rounded-lg`}
              onChangeText={handleSearch}
              value={searchQuery}
              placeholder="Search..."
              placeholderTextColor="grey"
            />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Cart');
              }}>
              <IIcon name="cart" size={35} color="#3b2eb0" />
              {route.params?.cartItems &&
                route.params?.cartItems.length !== 0 && (
                  <View
                    style={tw`bg-red-500 w-1/2 aspect-w-1 aspect-h-1 rounded-3xl absolute right-0 top-negative-5 justify-center items-center`}>
                    <Text style={{fontSize: 13}}>
                      {route.params?.cartItems
                        ? route.params?.cartItems.length
                        : 0}
                    </Text>
                  </View>
                )}
            </TouchableOpacity>
          </View>

          <View style={tw`w-90 h-90/100 self-center pb-4`}>
            <FlatList
              data={filterData()}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              numColumns={2}
              columnWrapperStyle={tw`justify-between`}
            />
          </View>
        </>
      )}
    </>
  );
};

export default HomeScreen;
