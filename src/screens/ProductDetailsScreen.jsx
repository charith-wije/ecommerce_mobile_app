import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {addItem} from '../redux/reducers/cartReducer';

const ProductDetailsScreen = ({route, navigation}) => {
  const {item} = route.params;
  const [choosedSizeBorderColor, setChoosedSizeBoederColor] = useState([]);
  const [choosedSize, setChoosedSize] = useState(item.sizes[0]);
  const [quantity, setQuantity] = useState(1);

  const {cartItems} = useSelector(state => state.cart);

  const dispatch = useDispatch();

  useEffect(() => {
    let arr = [];
    item.sizes.map((item, index) => {
      if (index == 0) {
        arr.push('green');
      } else {
        arr.push('#ceded2');
      }
    });
    setChoosedSizeBoederColor(arr);
  }, []);

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={{
          width: Dimensions.get('window').width * 0.1,
          aspectRatio: 1,
          borderColor: choosedSizeBorderColor[index],
          borderWidth: 2,
          alignItems: 'center',
          justifyContent: 'center',
          marginLeft: 15,
        }}
        onPress={() => {
          // Make a copy of the array
          const newArr = [...choosedSizeBorderColor];
          // Update the third element to 'green'
          newArr.map((newArrItem, newArrIndex) => {
            if (newArr[newArrIndex] == 'green') {
              newArr[newArrIndex] = '#ceded2';
            }
          });

          newArr[index] = 'green';
          // Set the state with the updated array
          setChoosedSizeBoederColor(newArr);
          setChoosedSize(item);
        }}>
        <Text>{item}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Image
        source={{uri: item.mainImage}}
        style={{
          width: Dimensions.get('window').width,
          aspectRatio: 1.4,
          resizeMode: 'contain',
        }}
      />
      <View
        style={{
          flex: 1,
          paddingHorizontal: 15,
          justifyContent: 'space-between',
        }}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 20 + Dimensions.get('window').width * 0.15,
          }}>
          <Text>{item.stockStatus}</Text>
          <Text style={{color: 'black', fontSize: 16, marginTop: 10}}>
            {item.name}
          </Text>
          <Text>Brand : {item.brandName}</Text>
          <Text>Colour : {item.colour}</Text>
          <Text>SKU : {item.SKU}</Text>
          <Text style={{marginBottom: 10}}>
            Price : {item.price.currency}
            {item.price.amount}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text>Sizes :</Text>
            <FlatList
              data={item.sizes}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              horizontal
            />
          </View>

          <View style={{flexDirection: 'row', marginTop: 10}}>
            <Text>Quantity :</Text>
            <TouchableOpacity
              style={{
                width: Dimensions.get('window').width * 0.1,
                aspectRatio: 1,
                borderColor: 'black',
                borderWidth: 1,
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: 15,
              }}
              onPress={() => {
                if (quantity > 1) {
                  setQuantity(quantity - 1);
                }
              }}>
              <MCIcon name="minus" size={20} color="#3b2eb0" />
            </TouchableOpacity>
            <View
              style={{
                width: Dimensions.get('window').width * 0.15,
                height: Dimensions.get('window').width * 0.1,
                borderColor: 'black',
                borderWidth: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text>{quantity}</Text>
            </View>
            <TouchableOpacity
              style={{
                width: Dimensions.get('window').width * 0.1,
                aspectRatio: 1,
                borderColor: 'black',
                borderWidth: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => {
                setQuantity(quantity + 1);
              }}>
              <MCIcon name="plus" size={20} color="#3b2eb0" />
            </TouchableOpacity>
          </View>
          <Text style={{marginTop: 10}}>{item.description}</Text>
        </ScrollView>
        <TouchableOpacity
          style={{
            width: '100%',
            height: Dimensions.get('window').width * 0.15,
            backgroundColor: '#000000',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 15,
            position: 'absolute',
            bottom: 10,
            alignSelf: 'center',
          }}
          onPress={() => {
            dispatch(addItem(item));
            navigation.navigate('Cart');
          }}>
          <Text style={{color: 'white'}}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});
