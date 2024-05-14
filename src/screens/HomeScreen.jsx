import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {fetchData} from '../api/MainAPI';
import IIcon from 'react-native-vector-icons/Ionicons';

const HomeScreen = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState(null);

  // Get the width of the screen
  const screenWidth = Dimensions.get('window').width;
  const squareSize = screenWidth * 0.45; // Adjust the multiplier as needed

  useEffect(() => {
    getFullData();
  }, []);

  const getFullData = async () => {
    const res = await fetchData();
    console.log(res);
    setData(res.data.data);
  };

  // Function to filter data based on search query
  const filterData = () => {
    return data.filter(item =>
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
        style={{
          width: squareSize * 0.95,
          height: squareSize * 0.95,
          backgroundColor: 'white',
          marginBottom: '5%',
        }}
        onPress={() => {
          navigation.navigate('ProductDetails', {item});
        }}>
        <Image
          style={{width: '100%', height: '50%'}}
          source={{
            uri: item.mainImage,
          }}
          resizeMode="contain"
          onError={error => console.error('Error loading image:', error)}
        />
        <View
          style={{
            paddingLeft: '10%',
            height: '50%',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: '#50607a',
              fontWeight: '500',
              fontSize: 17,
            }}>
            {item.brandName}
          </Text>
          <Text style={{color: 'black', fontWeight: '500'}}>
            {'\u00A3'}
            {item.price.amount}
          </Text>
          <Text style={{color: 'black', fontSize: 12}}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      {data == null && (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 30, fontWeight: '600'}}>Loading...</Text>
        </View>
      )}
      {data !== null && (
        <>
          <View style={styles.mainContainer}>
            <TextInput
              style={styles.mainContainerSearchBar}
              onChangeText={handleSearch}
              value={searchQuery}
              placeholder="Search..."
              placeholderTextColor="grey"
            />
            <View>
              <IIcon name="cart" size={35} color="#3b2eb0" />
              <View
                style={{
                  backgroundColor: 'red',
                  width: '50%',
                  aspectRatio: 1,
                  borderRadius: 30,
                  position: 'absolute',
                  right: 0,
                  top: -5,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 13}}>0</Text>
              </View>
            </View>
          </View>

          <View
            style={{
              width: '90%',
              height: '94%',
              alignSelf: 'center',
              paddingBottom: 35,
            }}>
            <FlatList
              data={filterData()}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              numColumns={2}
              columnWrapperStyle={{justifyContent: 'space-between'}}
            />
          </View>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: '90%',
    height: '6%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    alignSelf: 'center',
    marginTop: 15,
    marginBottom: 15,
    flexDirection: 'row',
  },

  mainContainerSearchBar: {
    height: '100%',
    width: '87%',
    marginRight: '3%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 15,
    color: '#000',
  },
});

export default HomeScreen;
