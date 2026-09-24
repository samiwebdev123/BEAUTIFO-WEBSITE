import React, { useState } from 'react';
import { Product } from '../types';
import { formatPKR } from '../utils/format';
import {
  Search,
  Filter,
  Plus,
  Edit2,
  Trash2,
  Tag,
  AlertTriangle,
  X,
  Image as ImageIcon,
  Check,
  Eye,
} from 'lucide-react';

interface AdminProductsProps {
  products: Product[];
  onAddProduct: (product: Product) => void;
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
}

const CATEGORY_OPTIONS = [
  { value: 'face', label: 'For face' },
  { value: 'body', label: 'For body' },
  { value: 'hair', label: 'For hair' },
  { value: 'accessories', label: 'Accessories' },
] as const;

// Preset sample cosmetic images for easy administrator selection
const SAMPLE_COSMETIC_IMAGES = [
  { name: 'Foaming Cleanser', url: '/images/pink-pump-bottle.jpg' },
  { name: 'Matte Liquid Lipstick', url: '/images/matte-lipstick.jpg' },
  { name: 'Round Compact / BB Cream', url: '/images/round-compact.jpg' },
  { name: 'Lotion Pump Bottle', url: '/images/clean-pump-bottle.jpg' },
  { name: 'Frosted Glass Dropper', url: '/images/frosted-dropper.jpg' },
  { name: 'Amber Essential Dropper', url: '/images/amber-dropper.jpg' },
];

export const AdminProducts: React.FC<AdminProductsProps> = ({
  products,
  onAddProduct,
  onEditProduct,
  onDeleteProduct,
}) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  // Modal states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  // Form state
  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState<'face' | 'body' | 'hair' | 'accessories'>('face');
  const [formPrice, setFormPrice] = useState<number>(2499);
  const [formOriginalPrice, setFormOriginalPrice] = useState<string>('');
  const [formImage, setFormImage] = useState('/images/pink-pump-bottle.jpg');
  const [formDescription, setFormDescription] = useState('');
  const [formVolume, setFormVolume] = useState('100 ml');
  const [formStock, setFormStock] = useState<number>(50);
  const [formStatus, setFormStatus] = useState<'Active' | 'Draft' | 'Out of Stock'>('Active');
  const [formError, setFormError] = useState<string | null>(null);

  const openAddModal = () => {
    setEditingProduct(null);
    setFormName('');
    setFormCategory('face');
    setFormPrice(2499);
    setFormOriginalPrice('');
    setFormImage('/images/pink-pump-bottle.jpg');
    setFormDescription('Gentle botanical cosmetic formula designed for smooth, radiant and nourished skin.');
    setFormVolume('100 ml');
    setFormStock(50);
    setFormStatus('Active');
    setFormError(null);
    setIsFormOpen(true);
  };

  const openEditModal = (prod: Product) => {
    setEditingProduct(prod);
    setFormName(prod.name);
    setFormCategory(prod.category);
    setFormPrice(prod.price);
    setFormOriginalPrice(prod.originalPrice ? String(prod.originalPrice) : '');
    setFormImage(prod.image);
    setFormDescription(prod.description);
    setFormVolume(prod.volume || '100 ml');
    setFormStock(prod.stockCount ?? (prod.inStock ? 45 : 0));
    setFormStatus(
      prod.status ?? (prod.inStock ? 'Active' : 'Out of Stock')
    );
    setFormError(null);
    setIsFormOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) {
      setFormError('Product name is required.');
      return;
    }
    if (formPrice <= 0) {
      setFormError('Please enter a valid price in PKR.');
      return;
    }

    const isInStock = formStatus === 'Active' && formStock > 0;

    if (editingProduct) {
      // Update existing
      const updated: Product = {
        ...editingProduct,
        name: formName.trim(),
        category: formCategory,
        price: Number(formPrice),
        originalPrice: formOriginalPrice ? Number(formOriginalPrice) : undefined,
        image: formImage.trim(),
        description: formDescription.trim(),
        volume: formVolume.trim() || undefined,
        stockCount: Number(formStock),
        status: formStatus,
        inStock: isInStock,
      };
      onEditProduct(updated);
    } else {
      // Add new
      const newProduct: Product = {
        id: `prod-${Date.now()}`,
        name: formName.trim(),
        category: formCategory,
        price: Number(formPrice),
        originalPrice: formOriginalPrice ? Number(formOriginalPrice) : undefined,
        image: formImage.trim(),
        description: formDescription.trim(),
        volume: formVolume.trim() || '100 ml',
        rating: 5,
        reviewsCount: 1,
        inStock: isInStock,
        stockCount: Number(formStock),
        status: formStatus,
      };
      onAddProduct(newProduct);
    }

    setIsFormOpen(false);
  };

  const confirmDelete = () => {
    if (productToDelete) {
      onDeleteProduct(productToDelete.id);
      setProductToDelete(null);
    }
  };

  // Filtering
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === 'all' || p.category === selectedCategory;

    const matchesStatus =
      selectedStatus === 'all' ||
      (selectedStatus === 'active' && p.inStock) ||
      (selectedStatus === 'out_of_stock' && !p.inStock) ||
      (selectedStatus === 'draft' && p.status === 'Draft');

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span className="text-[11px] font-semibold tracking-[0.2em] text-[#E3889B] uppercase font-mono">
            CATALOG MANAGEMENT
          </span>
          <h2 className="text-2xl font-serif text-[#1F1F1F] font-normal">Products Management</h2>
          <p className="text-xs text-neutral-500 mt-0.5">
            Add, update, or remove cosmetic products. Changes are reflected in the central catalog.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-neutral-600 bg-white px-3.5 py-2 rounded-xl border border-[#F7D6DC] shadow-2xs font-mono">
            {products.length} Products
          </span>
          <button
            onClick={openAddModal}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#1F1F1F] hover:bg-[#E3889B] text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-all shadow-xs cursor-pointer active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#F7D6DC] shadow-2xs flex flex-col lg:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative w-full lg:w-80">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products by name or category..."
            className="w-full pl-9 pr-4 py-2 bg-[#FAF5F6] rounded-xl border border-[#F7D6DC] text-xs text-neutral-800 placeholder:text-neutral-400 focus:outline-hidden focus:border-[#E3889B] focus:bg-white transition-all"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 w-full lg:w-auto overflow-x-auto pb-1 lg:pb-0">
          <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider font-mono mr-1">
            Category:
          </span>
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors whitespace-nowrap ${
              selectedCategory === 'all'
                ? 'bg-[#1F1F1F] text-white shadow-2xs'
                : 'bg-[#FAF5F6] text-neutral-600 hover:bg-[#FDF0F3] hover:text-[#E3889B] border border-[#F7D6DC]'
            }`}
          >
            All
          </button>
          {CATEGORY_OPTIONS.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors whitespace-nowrap ${
                selectedCategory === cat.value
                  ? 'bg-[#1F1F1F] text-white shadow-2xs'
                  : 'bg-[#FAF5F6] text-neutral-600 hover:bg-[#FDF0F3] hover:text-[#E3889B] border border-[#F7D6DC]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider font-mono">
            Status:
          </span>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-[#FAF5F6] border border-[#F7D6DC] text-xs rounded-xl px-3 py-1.5 text-neutral-700 focus:outline-hidden focus:border-[#E3889B] cursor-pointer"
          >
            <option value="all">All Statuses</option>
            <option value="active">In Stock / Active</option>
            <option value="out_of_stock">Out of Stock</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl border border-[#F7D6DC] shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-neutral-600">
            <thead className="bg-[#FAF5F6] border-b border-[#F7D6DC] text-neutral-500 uppercase tracking-wider font-mono text-[10px]">
              <tr>
                <th className="py-3.5 px-4">Product Name</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Price (PKR)</th>
                <th className="py-3.5 px-4">Stock</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#FDF0F3]">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-neutral-400 text-xs">
                    No products match the selected search or filter criteria.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => {
                  const stockDisplay = product.stockCount ?? (product.inStock ? 45 : 0);
                  const statusLabel =
                    product.status || (product.inStock ? 'Active' : 'Out of Stock');
                  const categoryLabel =
                    CATEGORY_OPTIONS.find((c) => c.value === product.category)?.label ||
                    product.category;

                  return (
                    <tr key={product.id} className="hover:bg-[#FAF5F6]/60 transition-colors">
                      {/* Product Name & Image */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-12 h-12 rounded-xl object-contain bg-[#FAF5F6] border border-[#F7D6DC] p-1 shrink-0"
                          />
                          <div className="min-w-0 max-w-xs">
                            <p className="font-semibold text-[#1F1F1F] truncate">{product.name}</p>
                            <p className="text-[11px] text-neutral-400 truncate mt-0.5">
                              {product.volume || 'Standard packaging'} &middot; {product.description.slice(0, 48)}...
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#FAF5F6] text-neutral-700 border border-[#F7D6DC] text-[11px] font-medium">
                          <Tag className="w-3 h-3 text-[#E3889B]" />
                          <span>{categoryLabel}</span>
                        </span>
                      </td>

                      {/* Price in PKR */}
                      <td className="py-3 px-4">
                        <span className="font-semibold text-[#1F1F1F] font-mono">
                          {formatPKR(product.price)}
                        </span>
                        {product.originalPrice && (
                          <span className="block text-[10px] text-neutral-400 line-through font-mono">
                            {formatPKR(product.originalPrice)}
                          </span>
                        )}
                      </td>

                      {/* Stock count */}
                      <td className="py-3 px-4">
                        <span className="font-mono text-neutral-700 font-medium">
                          {stockDisplay} units
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold border ${
                            statusLabel === 'Active'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : statusLabel === 'Draft'
                              ? 'bg-amber-50 text-amber-700 border-amber-200'
                              : 'bg-rose-50 text-rose-700 border-rose-200'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              statusLabel === 'Active'
                                ? 'bg-emerald-500'
                                : statusLabel === 'Draft'
                                ? 'bg-amber-500'
                                : 'bg-rose-500'
                            }`}
                          />
                          <span>{statusLabel}</span>
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            onClick={() => openEditModal(product)}
                            className="p-1.5 text-neutral-600 hover:text-[#E3889B] hover:bg-[#FDF0F3] rounded-lg transition-colors cursor-pointer border border-transparent hover:border-[#F7D6DC]"
                            title="Edit Product"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setProductToDelete(product)}
                            className="p-1.5 text-neutral-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-rose-200"
                            title="Delete Product"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-2xs">
          <div className="bg-white rounded-3xl border border-[#F7D6DC] shadow-xl max-w-xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="p-6 border-b border-[#F7D6DC] flex items-center justify-between sticky top-0 bg-white z-10">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#E3889B] font-mono font-semibold">
                  {editingProduct ? 'EDIT PRODUCT' : 'NEW PRODUCT'}
                </span>
                <h3 className="font-serif text-xl text-[#1F1F1F]">
                  {editingProduct ? 'Edit Catalog Product' : 'Add New Cosmetic Product'}
                </h3>
              </div>
              <button
                onClick={() => setIsFormOpen(false)}
                className="p-2 text-neutral-400 hover:text-neutral-700 rounded-xl cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSave} className="p-6 space-y-5">
              {formError && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Product Name */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Gentle Foaming Face Wash"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#F7D6DC] text-xs text-[#1F1F1F] focus:outline-hidden focus:border-[#E3889B] bg-[#FAF5F6]"
                />
              </div>

              {/* Category & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                    Category *
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) =>
                      setFormCategory(
                        e.target.value as 'face' | 'body' | 'hair' | 'accessories'
                      )
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#F7D6DC] text-xs text-[#1F1F1F] focus:outline-hidden focus:border-[#E3889B] bg-[#FAF5F6] cursor-pointer"
                  >
                    {CATEGORY_OPTIONS.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                    Status *
                  </label>
                  <select
                    value={formStatus}
                    onChange={(e) =>
                      setFormStatus(
                        e.target.value as 'Active' | 'Draft' | 'Out of Stock'
                      )
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#F7D6DC] text-xs text-[#1F1F1F] focus:outline-hidden focus:border-[#E3889B] bg-[#FAF5F6] cursor-pointer"
                  >
                    <option value="Active">Active (In Stock)</option>
                    <option value="Out of Stock">Out of Stock</option>
                    <option value="Draft">Draft (Hidden)</option>
                  </select>
                </div>
              </div>

              {/* Price (PKR) & Original Price */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                    Price (PKR) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-mono font-semibold text-neutral-500">
                      PKR
                    </span>
                    <input
                      type="number"
                      required
                      min={1}
                      value={formPrice}
                      onChange={(e) => setFormPrice(Number(e.target.value))}
                      placeholder="2499"
                      className="w-full pl-14 pr-3.5 py-2.5 rounded-xl border border-[#F7D6DC] text-xs font-mono text-[#1F1F1F] focus:outline-hidden focus:border-[#E3889B] bg-[#FAF5F6]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                    Original Price (PKR) (Optional)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-mono font-semibold text-neutral-500">
                      PKR
                    </span>
                    <input
                      type="number"
                      min={1}
                      value={formOriginalPrice}
                      onChange={(e) => setFormOriginalPrice(e.target.value)}
                      placeholder="3200"
                      className="w-full pl-14 pr-3.5 py-2.5 rounded-xl border border-[#F7D6DC] text-xs font-mono text-[#1F1F1F] focus:outline-hidden focus:border-[#E3889B] bg-[#FAF5F6]"
                    />
                  </div>
                </div>
              </div>

              {/* Stock Count & Volume */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                    Stock Quantity *
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={formStock}
                    onChange={(e) => setFormStock(Number(e.target.value))}
                    placeholder="50"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#F7D6DC] text-xs font-mono text-[#1F1F1F] focus:outline-hidden focus:border-[#E3889B] bg-[#FAF5F6]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                    Volume / Size
                  </label>
                  <input
                    type="text"
                    value={formVolume}
                    onChange={(e) => setFormVolume(e.target.value)}
                    placeholder="e.g. 150 ml or 15 g"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#F7D6DC] text-xs text-[#1F1F1F] focus:outline-hidden focus:border-[#E3889B] bg-[#FAF5F6]"
                  />
                </div>
              </div>

              {/* Product Image Selection */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                  Product Image URL *
                </label>
                <div className="flex gap-3 items-center">
                  <img
                    src={formImage}
                    alt="Preview"
                    className="w-12 h-12 rounded-xl object-contain bg-[#FAF5F6] border border-[#F7D6DC] p-1 shrink-0"
                  />
                  <input
                    type="text"
                    required
                    value={formImage}
                    onChange={(e) => setFormImage(e.target.value)}
                    placeholder="/images/pink-pump-bottle.jpg"
                    className="flex-1 px-3.5 py-2.5 rounded-xl border border-[#F7D6DC] text-xs text-[#1F1F1F] focus:outline-hidden focus:border-[#E3889B] bg-[#FAF5F6]"
                  />
                </div>

                {/* Quick cosmetic preset image pickers */}
                <div className="mt-2.5">
                  <span className="text-[10px] text-neutral-400 block mb-1.5">
                    Quick Pick Cosmetic Images:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {SAMPLE_COSMETIC_IMAGES.map((img) => (
                      <button
                        type="button"
                        key={img.url}
                        onClick={() => setFormImage(img.url)}
                        className={`text-[10px] px-2.5 py-1 rounded-lg border transition-colors cursor-pointer ${
                          formImage === img.url
                            ? 'bg-[#FDF0F3] border-[#E3889B] text-[#E3889B] font-semibold'
                            : 'bg-[#FAF5F6] border-[#F7D6DC] text-neutral-600 hover:text-neutral-900'
                        }`}
                      >
                        {img.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                  Description *
                </label>
                <textarea
                  rows={3}
                  required
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Provide rich botanical details, skin benefits, or usage instructions..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#F7D6DC] text-xs text-[#1F1F1F] focus:outline-hidden focus:border-[#E3889B] bg-[#FAF5F6] resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[#F7D6DC] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-[#F7D6DC] text-xs font-medium text-neutral-700 hover:bg-[#FAF5F6] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#1F1F1F] hover:bg-[#E3889B] text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer shadow-xs"
                >
                  {editingProduct ? 'Save Changes' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {productToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-2xs">
          <div className="bg-white rounded-3xl border border-[#F7D6DC] shadow-xl max-w-md w-full p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg text-[#1F1F1F]">Delete Product?</h3>
            <p className="text-xs text-neutral-500 mt-2 leading-relaxed">
              Are you sure you want to remove <strong className="text-neutral-900">{productToDelete.name}</strong> from the store catalog? This will remove it from the public storefront and administrative records.
            </p>

            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                onClick={() => setProductToDelete(null)}
                className="px-4 py-2.5 rounded-xl border border-[#F7D6DC] text-xs font-medium text-neutral-700 hover:bg-[#FAF5F6] transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer shadow-xs"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
