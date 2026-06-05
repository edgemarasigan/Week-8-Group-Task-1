import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { cart, menuItems } from './index';

export default function Detail() {
  const { name, category, price, description, id } = useLocalSearchParams();
  const router = useRouter();

  const handleAddToCart = () => {
    const item = menuItems.find((i) => i.id === id);
    if (item) {
      const exists = cart.find((c) => c.id === item.id);
      if (!exists) cart.push(item);
      alert(`${item.name} added to cart!`);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.category}>{category}</Text>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.price}>₱{price}</Text>
        <Text style={styles.description}>{description}</Text>
        <TouchableOpacity style={styles.cartButton} onPress={handleAddToCart}>
          <Text style={styles.cartButtonText}>+ Add to Cart</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>← Back to Menu</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fdf6f0', padding: 24 },
  content: { flex: 1, justifyContent: 'center' },
  category: { fontSize: 12, color: '#a0785a', letterSpacing: 1, marginBottom: 8 },
  name: { fontSize: 32, fontWeight: 'bold', color: '#3b1a08', marginBottom: 8 },
  price: { fontSize: 20, color: '#c0392b', marginBottom: 16 },
  description: { fontSize: 15, color: '#555', lineHeight: 22, marginBottom: 24 },
  cartButton: {
    backgroundColor: '#c0392b',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  cartButtonText: { color: '#fff', fontSize: 15, fontWeight: '600' },
  backButton: {
    backgroundColor: '#3b1a08',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  backText: { color: '#fff', fontSize: 15, fontWeight: '600' },
});