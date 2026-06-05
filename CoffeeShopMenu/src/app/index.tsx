import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';

export const menuItems = [
  { id: '1', name: 'Americano', category: 'HOT DRINKS', price: 120, description: 'Bold and strong black coffee brewed with espresso shots.' },
  { id: '2', name: 'Cappuccino', category: 'HOT DRINKS', price: 150, description: 'Espresso with steamed milk foam on top.' },
  { id: '3', name: 'Latte', category: 'HOT DRINKS', price: 160, description: 'Smooth espresso with lots of steamed milk.' },
  { id: '4', name: 'Iced Coffee', category: 'COLD DRINKS', price: 130, description: 'Classic coffee served over ice.' },
  { id: '5', name: 'Frappuccino', category: 'COLD DRINKS', price: 180, description: 'Blended iced coffee with whipped cream.' },
  { id: '6', name: 'Matcha Latte', category: 'COLD DRINKS', price: 170, description: 'Creamy matcha blended with milk.' },
];

export const cart: typeof menuItems = [];

export default function Index() {
  const router = useRouter();
  const [toastMessage, setToastMessage] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const showToast = (message: string) => {
    setToastMessage(message);
    setToastVisible(true);
    Animated.sequence([
      Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
      Animated.delay(1500),
      Animated.timing(fadeAnim, { toValue: 0, duration: 300, useNativeDriver: true }),
    ]).start(() => setToastVisible(false));
  };

  const handleAddToCart = (item: typeof menuItems[0]) => {
    const exists = cart.find((c) => c.id === item.id);
    if (!exists) {
      cart.push(item);
      showToast(`${item.name} added to cart!`);
    } else {
      showToast(`${item.name} is already in cart`);
    }
  };

  const renderItem = ({ item }: { item: typeof menuItems[0] }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        router.push({
          pathname: '/detail',
          params: {
            id: item.id,
            name: item.name,
            category: item.category,
            price: item.price,
            description: item.description,
          },
        })
      }>
      <Text style={styles.category}>{item.category}</Text>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.price}>₱{item.price}</Text>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.viewButton}
          onPress={() =>
            router.push({
              pathname: '/detail',
              params: {
                id: item.id,
                name: item.name,
                category: item.category,
                price: item.price,
                description: item.description,
              },
            })
          }>
          <Text style={styles.viewButtonText}>View Item</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => handleAddToCart(item)}>
          <Text style={styles.cartButtonText}>+ Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>☕ EJ's Coffee Shop Menu</Text>
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
      {toastVisible && (
        <Animated.View style={[styles.toast, { opacity: fadeAnim }]}>
          <Text style={styles.toastText}>✓ {toastMessage}</Text>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fdf6f0' },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#3b1a08',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0c9b0',
  },
  list: { paddingBottom: 20 },
  card: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0c9b0',
  },
  category: { fontSize: 11, color: '#a0785a', letterSpacing: 1 },
  itemName: { fontSize: 18, fontWeight: '600', color: '#3b1a08', marginTop: 2 },
  price: { fontSize: 14, color: '#c0392b', marginTop: 4, marginBottom: 10 },
  buttonRow: { flexDirection: 'row', gap: 10 },
  viewButton: {
    backgroundColor: '#3b1a08',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  viewButtonText: { color: '#fff', fontSize: 13, fontWeight: '500' },
  cartButton: {
    backgroundColor: '#c0392b',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  cartButtonText: { color: '#fff', fontSize: 13, fontWeight: '500' },
  toast: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    backgroundColor: '#3b1a08',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  toastText: { color: '#fff', fontSize: 14, fontWeight: '500' },
});
