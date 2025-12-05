// src/features/user/userSlice.ts
import { createSlice } from "@reduxjs/toolkit";

interface OrderItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
}

interface Order {
  id: number;
  userId: number;
  total: number;
  discountedTotal?: number; // Может отсутствовать
  totalProducts: number;
  totalQuantity: number;
  products: OrderItem[];
}


interface UserProfile {
  id: number;
  name: string;
  email: string;
  avatar: string;
  phone: string;
  createdAt: string;
}

interface UserState {
  isAuthenticated: boolean;
  profile: UserProfile | null;
  orders: Order[];
}

const initialState: UserState = {
  isAuthenticated: false,
  profile: null,
  orders: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginMock(state) {
      state.isAuthenticated = true;
      state.profile = {
        id: 1,
        name: "Алексей Иванов",
        email: "alex@example.com",
        avatar:
          "https://ui-avatars.com/api/?name=Алексей&background=3b82f6&color=fff",
        phone: "+7 (000) 00-00-000",
        createdAt: "2024-01-15",
      };
    },
    logout(state) {
      state.isAuthenticated = false;
      state.profile = null;
      state.orders = [];
    },
    setOrders(state, action) {
      state.orders = action.payload;
    },
  },
});

export const { loginMock, logout, setOrders } = userSlice.actions;
export default userSlice.reducer;
