<script setup lang="ts">
import { useCartStore } from '../stores/cart'

const cartStore = useCartStore()

function remove(id: string) {
  cartStore.removeFromCart(id)
}
</script>

<template>
  <div class="checkout-page container">
    <h1>Checkout</h1>
    
    <div v-if="cartStore.items.length === 0" class="empty-cart">
      <p>Your cart is empty.</p>
      <router-link to="/" class="continue-shopping">Browse Products</router-link>
    </div>

    <div v-else class="cart-content">
      <div class="cart-items">
        <div v-for="(item, index) in cartStore.items" :key="index" class="cart-item">
          <div class="item-image">
            <img :src="item.image" :alt="item.name" />
          </div>
          <div class="item-details">
            <h3>{{ item.name }}</h3>
            <p class="item-type">{{ item.type }}</p>
          </div>
          <div class="item-price">
            ${{ item.price.toLocaleString() }}
          </div>
          <button class="remove-btn" @click="remove(item.id)">Remove</button>
        </div>
      </div>

      <div class="cart-summary">
        <h2>Order Summary</h2>
        <div class="summary-row total">
          <span>Total</span>
          <span>${{ cartStore.total.toLocaleString() }}</span>
        </div>
        <button class="checkout-btn">Proceed to Pay</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.checkout-page {
  padding: 2rem 20px;
}

h1 {
  margin-bottom: 2rem;
  color: var(--color-secondary);
}

.empty-cart {
  text-align: center;
  padding: 4rem;
  background: white;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
}

.continue-shopping {
  display: inline-block;
  margin-top: 1rem;
  color: var(--color-primary);
  font-weight: 500;
}

.cart-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
}

.cart-items {
  background: white;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
}

.cart-item {
  display: grid;
  grid-template-columns: 80px 2fr 1fr auto;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem;
  border-bottom: 1px solid #eee;
}

.cart-item:last-child {
  border-bottom: none;
}

.item-image img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
}

.item-details h3 {
  font-size: 1.1rem;
  margin-bottom: 0.2rem;
}

.item-type {
  font-size: 0.9rem;
  color: var(--color-text-light);
}

.item-price {
  font-weight: 600;
  font-size: 1.1rem;
  color: var(--color-secondary);
}

.remove-btn {
  background: transparent;
  color: var(--color-danger);
  font-weight: 500;
  padding: 0.5rem;
}

.remove-btn:hover {
  text-decoration: underline;
}

.cart-summary {
  background: white;
  padding: 2rem;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  height: fit-content;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.total {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-secondary);
  border-top: 2px solid #eee;
  padding-top: 1rem;
  margin-top: 1rem;
}

.checkout-btn {
  width: 100%;
  background-color: var(--color-primary);
  color: white;
  padding: 1rem;
  border-radius: 12px;
  font-size: 1.1rem;
  margin-top: 1.5rem;
  transition: background-color var(--transition-fast);
}

.checkout-btn:hover {
  background-color: var(--color-primary-dark);
}

@media (max-width: 900px) {
  .cart-content {
    grid-template-columns: 1fr;
  }
}
</style>
