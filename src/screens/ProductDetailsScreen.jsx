import {
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
import {useDispatch} from 'react-redux';
import {addItem} from '../redux/reducers/cartReducer';
import tw from 'twrnc';

const ProductDetailsScreen = ({route, navigation}) => {
  const {item} = route.params;
  const [choosedSizeBorderColor, setChoosedSizeBoederColor] = useState([]);
  const [choosedSize, setChoosedSize] = useState(item.sizes[0]);
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();

  useEffect(() => {
    let arr = [];
    item.sizes.map((item, index) => {
      if (index == 0) {
        arr.push('green');
      } else {
        arr.push('black');
      }
    });
    setChoosedSizeBoederColor(arr);
  }, []);

  const renderItem = ({item, index}) => {
    const color = choosedSizeBorderColor[index];
    return (
      <TouchableOpacity
        style={tw`w-10 aspect-square border-2 border-${color}-400 items-center justify-center ml-3 mb-2`}
        onPress={() => {
          // Make a copy of the array
          const newArr = [...choosedSizeBorderColor];
          // Update the third element to 'green'
          newArr.map((newArrItem, newArrIndex) => {
            if (newArr[newArrIndex] == 'green') {
              newArr[newArrIndex] = 'black';
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
    <View style={tw`flex-1 bg-white`}>
      <Image
        source={{uri: item.mainImage}}
        style={tw`w-3/5 aspect-video resizeMode-contain self-center`}
      />
      <View style={tw`flex-1 p-5 justify-between`}>
        <ScrollView style={tw`flex-1`}>
          <Text>{item.stockStatus}</Text>
          <Text style={tw`text-black text-base mt-3`}>{item.name}</Text>
          <Text>Brand : {item.brandName}</Text>
          <Text>Colour : {item.colour}</Text>
          <Text>SKU : {item.SKU}</Text>
          <Text style={tw`mb-3`}>
            Price : {item.price.currency}
            {item.price.amount}
          </Text>
          <View style={tw`flex-row`}>
            <Text>Sizes :</Text>
            <FlatList
              data={item.sizes}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              horizontal
            />
          </View>

          <View style={tw`flex-row mt-3`}>
            <Text>Quantity :</Text>
            <TouchableOpacity
              style={tw`w-10 aspect-square border border-black items-center justify-center ml-3`}
              onPress={() => {
                if (quantity > 1) {
                  setQuantity(quantity - 1);
                }
              }}>
              <MCIcon name="minus" size={20} color="#3b2eb0" />
            </TouchableOpacity>
            <View
              style={tw`w-15 h-10 border border-black items-center justify-center`}>
              <Text>{quantity}</Text>
            </View>
            <TouchableOpacity
              style={tw`w-10 aspect-square border border-black items-center justify-center`}
              onPress={() => {
                setQuantity(quantity + 1);
              }}>
              <MCIcon name="plus" size={20} color="#3b2eb0" />
            </TouchableOpacity>
          </View>
          <Text style={tw`mt-3`}>{item.description}</Text>
        </ScrollView>
        <TouchableOpacity
          style={tw`w-full h-15 bg-black justify-center items-center mt-5 bottom-3 self-center`}
          onPress={() => {
            let tempItem = item;
            // Make a copy of the object to avoid mutating state directly
            const updatedItem = {...tempItem};
            // Modify the parameter
            updatedItem.id = `${tempItem.id}${choosedSize}`;
            updatedItem.choosedSize = choosedSize;
            updatedItem.units = quantity;
            dispatch(addItem(updatedItem));
            navigation.navigate('Cart');
          }}>
          <Text style={tw`text-white`}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductDetailsScreen;
