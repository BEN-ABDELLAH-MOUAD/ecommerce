'use client'

import Link from 'next/link'
import { useAuthStore, useCartStore } from '@/store/useStore'
import { useRouter } from 'next/navigation'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const { user, isAuthenticated, logout } = useAuthStore()
  const { totalItems } = useCartStore()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-gray-900">
                E-Commerce Store
              </Link>
            </div>
            
            <nav className="flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-gray-900 transition-colors">
                Home
              </Link>
              
              {isAuthenticated ? (
                <>
                  {user?.role === 'ADMIN' && (
                    <Link href="/dashboard" className="text-gray-700 hover:text-gray-900 transition-colors">
                      Dashboard
                    </Link>
                  )}
                  <span className="text-gray-600">Welcome, {user?.email}</span>
                  <button
                    onClick={handleLogout}
                    className="text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link href="/login" className="text-gray-700 hover:text-gray-900 transition-colors">
                  Login
                </Link>
              )}
              
              <Link href="/cart" className="relative text-gray-700 hover:text-gray-900 transition-colors">
                <span className="flex items-center">
                  🛒 Cart
                  {totalItems > 0 && (
                    <span className="ml-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </span>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold mb-4">E-Commerce Store</h3>
          <p className="text-gray-400">Your one-stop shop for amazing products</p>
        </div>
      </footer>
    </div>
  )
}
