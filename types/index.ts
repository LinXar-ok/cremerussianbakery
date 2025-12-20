// Product and cart types
export interface Product {
  id: string;
  name: string;
  description?: string;
  price?: number;
  category?: string;
  image?: string;
  rating?: number;
  attributes: {
    sizes: string[];
    colors: string[];
    price: number;
    image: {
      data: {
        attributes: {
          url: string;
          formats: {
            thumbnail: { url: string };
            small: { url: string };
            medium: { url: string };
          };
        };
      }[];
    };
  };
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  size: string;
  color: string;
  count: number;
}

export interface CartState {
  isCartOpen: boolean;
  cart: CartItem[];
  items: Product[];
}

// Form data types
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  notes: string;
}

// Order types
export interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
  size: string;
  color: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  total: number;
  status: "pending" | "processing" | "completed" | "cancelled";
  createdAt: Date;
}

// Add this interface
export interface CakeItem {
  id: string;
  name: string;
  attributes: {
    sizes: string[];
    colors: string[];
    price: number;
    image: {
      data: {
        attributes: {
          url: string;
          formats: {
            thumbnail: { url: string };
            small: { url: string };
            medium: { url: string };
          };
        };
      }[];
    };
  };
}
