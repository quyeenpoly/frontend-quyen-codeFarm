import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import "../../css/ProductListPage.css";


const ProductListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    category: "",
    priceRange: "",
    size: "",
    color: "",
    sort: "newest",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const productsPerPage = 12;

  // Mock data
  const mockProducts = [
    {
      id: 1,
      name: "Premium Sneaker",
      price: 29.99,
      image: "/images/sneaker1.jpg",
      category: "men",
      size: ["40", "41", "42", "43"],
      color: ["black", "white", "red"],
      rating: 4.5,
      reviews: 120,
      description: "Premium quality sneaker with comfortable fit",
    },
    {
      id: 2,
      name: "Classic Sneaker",
      price: 39.99,
      image: "/images/sneaker2.jpg",
      category: "men",
      size: ["39", "40", "41", "42"],
      color: ["white", "blue", "green"],
      rating: 4.8,
      reviews: 85,
      description: "Classic design with modern comfort",
    },
    {
      id: 3,
      name: "Sport Sneaker",
      price: 49.99,
      image: "/images/sneaker3.jpg",
      category: "women",
      size: ["36", "37", "38", "39"],
      color: ["pink", "purple", "white"],
      rating: 4.7,
      reviews: 95,
      description: "Perfect for sports and casual wear",
    },
    {
      id: 4,
      name: "Casual Sneaker",
      price: 34.99,
      image: "/images/sneaker4.jpg",
      category: "women",
      size: ["35", "36", "37", "38"],
      color: ["beige", "brown", "black"],
      rating: 4.6,
      reviews: 75,
      description: "Comfortable casual sneaker for everyday use",
    },
    {
      id: 5,
      name: "Running Sneaker",
      price: 44.99,
      image: "/images/sneaker5.jpg",
      category: "men",
      size: ["41", "42", "43", "44"],
      color: ["gray", "blue", "red"],
      rating: 4.9,
      reviews: 110,
      description: "Professional running shoes with advanced cushioning",
    },
    {
      id: 6,
      name: "Basketball Sneaker",
      price: 54.99,
      image: "/images/sneaker6.jpg",
      category: "men",
      size: ["42", "43", "44", "45"],
      color: ["black", "red", "white"],
      rating: 4.7,
      reviews: 90,
      description: "High-performance basketball shoes",
    },
    {
      id: 7,
      name: "Training Sneaker",
      price: 39.99,
      image: "/images/sneaker7.jpg",
      category: "women",
      size: ["37", "38", "39", "40"],
      color: ["purple", "pink", "white"],
      rating: 4.8,
      reviews: 80,
      description: "Versatile training shoes for all workouts",
    },
    {
      id: 8,
      name: "Lifestyle Sneaker",
      price: 45.99,
      image: "/images/sneaker8.jpg",
      category: "women",
      size: ["36", "37", "38", "39"],
      color: ["white", "beige", "pink"],
      rating: 4.6,
      reviews: 100,
      description: "Stylish lifestyle sneaker for everyday fashion",
    },
    {
      id: 9,
      name: "Hiking Boot",
      price: 69.99,
      image: "/images/sneaker1.jpg",
      category: "men",
      size: ["41", "42", "43", "44"],
      color: ["brown", "black", "green"],
      rating: 4.7,
      reviews: 65,
      description: "Durable hiking boots for outdoor adventures",
    },
    {
      id: 10,
      name: "Fashion Sneaker",
      price: 59.99,
      image: "/images/sneaker2.jpg",
      category: "women",
      size: ["36", "37", "38", "39"],
      color: ["white", "gold", "silver"],
      rating: 4.5,
      reviews: 85,
      description: "Fashion-forward sneaker with premium materials",
    },
    {
      id: 11,
      name: "Tennis Shoe",
      price: 49.99,
      image: "/images/sneaker3.jpg",
      category: "men",
      size: ["40", "41", "42", "43"],
      color: ["white", "blue", "red"],
      rating: 4.8,
      reviews: 70,
      description: "Professional tennis shoes with excellent grip",
    },
    {
      id: 12,
      name: "Skateboard Shoe",
      price: 44.99,
      image: "/images/sneaker4.jpg",
      category: "men",
      size: ["39", "40", "41", "42"],
      color: ["black", "gray", "red"],
      rating: 4.6,
      reviews: 55,
      description: "Durable skateboard shoes with great board feel",
    }
  ];

  useEffect(() => {
    // Simulate API call
    setProducts(mockProducts);
    setFilteredProducts(mockProducts);
  }, []);

  useEffect(() => {
    let result = [...products];

    // Apply category filter
    if (filters.category) {
      result = result.filter(
        (product) => product.category === filters.category
      );
    }

    // Apply price range filter
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split("-").map(Number);
      result = result.filter(
        (product) => product.price >= min && product.price <= max
      );
    }

    // Apply size filter
    if (filters.size) {
      result = result.filter((product) =>
        product.size.includes(filters.size)
      );
    }

    // Apply color filter
    if (filters.color) {
      result = result.filter((product) =>
        product.color.includes(filters.color)
      );
    }

    // Apply search query
    if (searchQuery) {
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(result);
    setCurrentPage(1);
  }, [filters, searchQuery, products]);

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="product-list-page">
      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      <div className="product-list-container">
        {/* Filters Sidebar */}
        <aside className="filters-sidebar">
          <div className="filter-section">
            <h3>Categories</h3>
            <div className="filter-options">
              <label>
                <input
                  type="radio"
                  name="category"
                  value=""
                  checked={filters.category === ""}
                  onChange={(e) => handleFilterChange("category", e.target.value)}
                />
                All
              </label>
              <label>
                <input
                  type="radio"
                  name="category"
                  value="men"
                  checked={filters.category === "men"}
                  onChange={(e) => handleFilterChange("category", e.target.value)}
                />
                Men
              </label>
              <label>
                <input
                  type="radio"
                  name="category"
                  value="women"
                  checked={filters.category === "women"}
                  onChange={(e) => handleFilterChange("category", e.target.value)}
                />
                Women
              </label>
            </div>
          </div>

          <div className="filter-section">
            <h3>Price</h3>
            <div className="filter-options">
              <label>
                <input
                  type="radio"
                  name="priceRange"
                  value=""
                  checked={filters.priceRange === ""}
                  onChange={(e) => handleFilterChange("priceRange", e.target.value)}
                />
                All
              </label>
              <label>
                <input
                  type="radio"
                  name="priceRange"
                  value="0-50"
                  checked={filters.priceRange === "0-50"}
                  onChange={(e) => handleFilterChange("priceRange", e.target.value)}
                />
                Under $50
              </label>
              <label>
                <input
                  type="radio"
                  name="priceRange"
                  value="50-100"
                  checked={filters.priceRange === "50-100"}
                  onChange={(e) => handleFilterChange("priceRange", e.target.value)}
                />
                $50 - $100
              </label>
            </div>
          </div>

          <div className="filter-section">
            <h3>Size</h3>
            <div className="filter-options">
              <label>
                <input
                  type="radio"
                  name="size"
                  value=""
                  checked={filters.size === ""}
                  onChange={(e) => handleFilterChange("size", e.target.value)}
                />
                All
              </label>
              <label>
                <input
                  type="radio"
                  name="size"
                  value="40"
                  checked={filters.size === "40"}
                  onChange={(e) => handleFilterChange("size", e.target.value)}
                />
                40
              </label>
              <label>
                <input
                  type="radio"
                  name="size"
                  value="41"
                  checked={filters.size === "41"}
                  onChange={(e) => handleFilterChange("size", e.target.value)}
                />
                41
              </label>
              <label>
                <input
                  type="radio"
                  name="size"
                  value="42"
                  checked={filters.size === "42"}
                  onChange={(e) => handleFilterChange("size", e.target.value)}
                />
                42
              </label>
            </div>
          </div>

          <div className="filter-section">
            <h3>Color</h3>
            <div className="filter-options">
              <label>
                <input
                  type="radio"
                  name="color"
                  value=""
                  checked={filters.color === ""}
                  onChange={(e) => handleFilterChange("color", e.target.value)}
                />
                All
              </label>
              <label>
                <input
                  type="radio"
                  name="color"
                  value="black"
                  checked={filters.color === "black"}
                  onChange={(e) => handleFilterChange("color", e.target.value)}
                />
                Black
              </label>
              <label>
                <input
                  type="radio"
                  name="color"
                  value="white"
                  checked={filters.color === "white"}
                  onChange={(e) => handleFilterChange("color", e.target.value)}
                />
                White
              </label>
            </div>
          </div>

          <div className="filter-section">
            <h3>Sort By</h3>
            <select name="sort" value={filters.sort} onChange={(e) => handleFilterChange("sort", e.target.value)}>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </aside>

        {/* Products Grid */}
        <main className="products-grid">
          {currentProducts.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <img src={product.image} alt={product.name} />
                <div className="product-overlay">
                  <button className="quick-view" ><Link to={`/products/${product.id}`} style={{textDecoration: "none", color: "red"}}>Quick View</Link></button>
                </div>
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="price">${product.price}</p>
                <div className="rating">
                  <span>{"★".repeat(Math.floor(product.rating))}</span>
                  <span>({product.reviews})</span>
                </div>
              </div>
            </div>
          ))}
        </main>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={currentPage === index + 1 ? "active" : ""}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductListPage; 