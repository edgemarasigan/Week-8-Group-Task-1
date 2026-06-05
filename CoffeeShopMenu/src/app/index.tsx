import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';

const menuItems = [
  { id: '1', name: 'Americano', category: 'Hot Drinks' },
  { id: '2', name: 'Latte', category: 'Hot Drinks' },
  { id: '3', name: 'Cappuccino', category: 'Hot Drinks' },
  { id: '4', name: 'Cheesecake', category: 'Desserts' },
  { id: '5', name: 'Brownie', category: 'Desserts' },
  { id: '6', name: 'Iced Coffee', category: 'Cold Drinks' },
  { id: '7', name: 'Frappuccino', category: 'Cold Drinks' },
  { id: '8', name: 'Matcha Latte', category: 'Cold Drinks' },
];

export default function Index() {
  const renderItem = ({ item }: { item: typeof menuItems[0] }) => (
    <View style={styles.card}>
      <Text style={styles.category}>{item.category}</Text>
      <Text style={styles.itemName}>{item.name}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => console.log(`Viewing: ${item.name}`)}
      >
        <Text style={styles.buttonText}>View Item</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.title}>My Café Menu</Text>
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  card: {
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    paddingVertical: 14,
  },
  category: {
    fontSize: 11,
    color: '#888',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  itemName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#333',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '500',
  },
});