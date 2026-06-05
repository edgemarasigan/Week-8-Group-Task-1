import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { cart } from './index';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';

export default function Cart() {
  const [items, setItems] = useState([...cart]);

  useFocusEffect(
    useCallback(() => {
      setItems([...cart]);
    }, [])
  );

  const removeItem = (id: string) => {
    const index = cart.findIndex((c) => c.id === id);
    if (index !== -1) cart.splice(index, 1);
    setItems([...cart]);
  };

  const total = items.reduce((sum, item) => sum + item.price, 0);

  if (items.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>Your cart is empty</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🛒 Your Cart</Text>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.price}>₱{item.price}</Text>
            </View>
            <TouchableOpacity style={styles.removeButton} onPress={() => removeItem(item.id)}>
              <Text style={styles.removeText}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalPrice}>₱{total}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fdf6f0' },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fdf6f0' },
  emptyText: { fontSize: 18, color: '#a0785a' },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#3b1a08',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0c9b0',
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0c9b0',
  },
  itemName: { fontSize: 16, color: '#3b1a08', fontWeight: '500' },
  price: { fontSize: 14, color: '#c0392b', marginTop: 4 },
  removeButton: {
    backgroundColor: '#c0392b',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  removeText: { color: '#fff', fontSize: 13, fontWeight: '500' },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderTopWidth: 2,
    borderTopColor: '#3b1a08',
  },
  totalLabel: { fontSize: 18, fontWeight: 'bold', color: '#3b1a08' },
  totalPrice: { fontSize: 18, fontWeight: 'bold', color: '#c0392b' },
});