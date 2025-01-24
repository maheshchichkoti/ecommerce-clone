const mockProducts = [
  {
    id: 1,
    title: "Mock Product 1",
    price: 29.99,
    description:
      "This is a description for Mock Product 1. It's a great product!",
    images: [
      "https://via.placeholder.com/400x300/007BFF/FFFFFF?text=Mock+Product+1",
    ], // Placeholder image
    category: { name: "Electronics" },
  },
  {
    id: 2,
    title: "Mock Product 2",
    price: 49.99,
    description: "Check out Mock Product 2! High quality and affordable.",
    images: [
      "https://via.placeholder.com/400x300/28A745/FFFFFF?text=Mock+Product+2",
    ], // Another placeholder image
    category: { name: "Books" },
  },
  {
    id: 3,
    title: "Mock Product 3",
    price: 19.99,
    description: "Mock Product 3 is perfect for everyday use.",
    images: [
      "https://via.placeholder.com/400x300/DC3545/FFFFFF?text=Mock+Product+3",
    ], // And another one
    category: { name: "Clothes" },
  },
  // Add more mock product objects as needed...
];

export default mockProducts;
