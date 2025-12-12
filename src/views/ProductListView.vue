<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import productsData from '../data/products.json'
import ProductCard from '../components/ProductCard.vue'

const router = useRouter()
const categories = ref(productsData)

function goToDetail(productId: string) {
  router.push(`/products/${productId}`)
}
</script>

<template>
  <div class="product-list-page container">
    <div v-for="category in categories" :key="category.id" class="category-section">
      <h2 class="category-title">{{ category.title }}</h2>
      <div class="products-grid">
        <ProductCard
          v-for="product in category.products"
          :key="product.id"
          :product="product"
          @click="goToDetail(product.id)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-list-page {
  padding: 2rem 20px;
}

.category-section {
  margin-bottom: 4rem;
}

.category-title {
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: var(--color-secondary);
  border-bottom: 2px solid var(--color-primary);
  display: inline-block;
  padding-bottom: 5px;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
}
</style>
