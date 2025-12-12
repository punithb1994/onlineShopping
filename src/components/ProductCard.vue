<script setup lang="ts">
import { useCartStore, type Product } from '../stores/cart'

const props = defineProps<{
  product: Product
}>()

const cartStore = useCartStore()

function addToCart() {
  cartStore.addToCart(props.product)
}
</script>

<template>
  <div class="product-card">
    <div class="image-container">
      <img :src="product.image" :alt="product.name" />
    </div>
    <div class="details">
      <h3>{{ product.name }}</h3>
      <p class="price">${{ product.price.toLocaleString() }}</p>
      <button class="add-btn" @click.stop="addToCart">Add to Cart</button>
    </div>
  </div>
</template>

<style scoped>
.product-card {
  background: white;
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: transform var(--transition-fast), box-shadow var(--transition-fast);
  cursor: pointer;
  display: flex;
  flex-direction: column;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-md);
}

.image-container {
  height: 200px;
  overflow: hidden;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.product-card:hover .image-container img {
  transform: scale(1.05);
}

.details {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

h3 {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: var(--color-secondary);
}

.price {
  font-weight: 600;
  color: var(--color-primary);
  margin-bottom: 1rem;
  font-size: 1.2rem;
}

.add-btn {
  margin-top: auto;
  background-color: var(--color-secondary);
  color: white;
  padding: 0.8rem;
  border-radius: 8px;
  font-weight: 500;
  transition: background-color var(--transition-fast);
}

.add-btn:hover {
  background-color: var(--color-primary);
}
</style>
