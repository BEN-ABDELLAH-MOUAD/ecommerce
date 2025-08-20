'use client'

import { useEffect, useState } from 'react'
import Layout from '@/components/Layout'
import { useAuthStore, useCartStore, useProductsStore } from '@/store/useStore'

export default function Home() {
  const { isAuthenticated } = useAuthStore()
  const { addToCart } = useCartStore()
  const { products, loading, error, fetchProducts } = useProductsStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (isAuthenticated) {
      fetchProducts()
    }
  }, [isAuthenticated, fetchProducts])

  if (!mounted) return null

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
    })
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Our Store</h1>
          <p className="text-xl mb-8">Discover amazing products at great prices</p>
          {!isAuthenticated && (
            <div className="space-x-4">
              <a
                href="/login"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Login to Shop
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Featured Products</h2>

        {!isAuthenticated ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg mb-4">Please login to view products</p>
            <a
              href="/login"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Login Now
            </a>
          </div>
        ) : loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading products...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={fetchProducts}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Retry
            </button>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No products available</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gray-100 flex items-center justify-center">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="text-6xl">📦</div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>

                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-blue-600">${product.price}</span>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </Layout>
  )
}
