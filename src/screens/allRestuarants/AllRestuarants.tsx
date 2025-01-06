import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {responsiveWidth} from 'react-native-responsive-dimensions';

const AllRestuarants = () => {
  const [restraunts, setRestraunts] = useState<any[]>([]);

  const testHandler = async () => {
    const response = await axios.get('http://localhost:3000/pizza');
    setRestraunts(response?.data);
  };

  useEffect(() => {
    testHandler();
  }, []);

  return (
    <SafeAreaView>
      <View>
        <Text>Product Page</Text>
        <FlatList
          horizontal
          data={restraunts}
          renderItem={({item, index}: any) => (
            <View style={{margin: 10}} key={index}>
              <Image
                source={{
                  uri: item?.image_url,
                }}
                style={styles.imageContainer}
              />
              <Text>{item?.pizza_name}</Text>
              <Text>{item?.restaurant?.rating}</Text>
              <Text>
                {item?.restaurant?.location?.country},{' '}
                {item?.restaurant?.location?.state}
              </Text>
              <Text>{item?.restaurant?.location?.address}</Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};
export default AllRestuarants;

const styles = StyleSheet.create({
  imageContainer: {
    width: responsiveWidth(95),
    height: 150,
    borderRadius: 10,
  },
});
