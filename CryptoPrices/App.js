import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
} from 'react-native';
import io from 'socket.io-client';
const socket = io('http://192.168.0.100:3000');

socket.on('connect', data => {
  console.log('Socket bağlandı');
});

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    name: 'BTC',
    price: 5000,
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    name: 'ETH',
    price: 2500,
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    name: 'DOGE',
    price: 0.666,
  },
];

const Item = ({name, price}) => (
  <View style={styles.item}>
    <Text style={styles.name}>{name}</Text>
    <Text style={styles.price}>{price}</Text>
  </View>
);

const App = () => {
  // eslint-disable-next-line no-undef
  [data, setData] = useState();

  useEffect(() => {
    socket.on('crypto', cryptoData => {
      // eslint-disable-next-line no-undef
      setData(cryptoData);
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        // eslint-disable-next-line no-undef
        data={data}
        renderItem={({item}) => (
          <Item name={item.name} price={Math.round(item.price * 100) / 100} />
        )}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f6f6f6',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#ccc',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 32,
  },
  price: {
    fontSize: 32,
  },
});

export default App;
