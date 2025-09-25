import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getGuestCart, clearGuestCart } from "@/lib/cartStorage";
import { addToCart as addToCartThunk, fetchCartItems as fetchCartItemsThunk } from "@/store/shop/cart-slice";
import { API_ENDPOINTS } from "@/config/api";

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

// Create an axios instance with default config that maintains cookies
const apiClient = axios.create({
  baseURL: API_ENDPOINTS.API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add response interceptor to handle errors
apiClient.interceptors.response.use(
  (response) => {
    console.log("API Response:", response);
    return response;
  },
  (error) => {
    console.log("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const registerUser = createAsyncThunk(
  "/auth/register",
  async (formData) => {
    console.log("Registering user with data:", formData);
    const response = await apiClient.post("/api/auth/register", formData);
    console.log("Register response:", response.data);
    return response.data;
  }
);

export const loginUser = createAsyncThunk(
  "/auth/login",
  async (formData, { dispatch }) => {
    console.log("Logging in user with data:", formData);
    const response = await apiClient.post("/api/auth/login", formData);
    console.log("Login response:", response.data);

    // After successful login, merge guest cart into server cart
    if (response.data?.success) {
      const guestItems = getGuestCart();
      const userId = response.data?.user?.id;
      for (const item of guestItems) {
        await dispatch(
          addToCartThunk({ userId, productId: item.productId, quantity: item.quantity })
        );
      }
      clearGuestCart();
      await dispatch(fetchCartItemsThunk(userId));
    }

    return response.data;
  }
);

export const logoutUser = createAsyncThunk(
  "/auth/logout",
  async () => {
    console.log("Logging out user");
    const response = await apiClient.post("/api/auth/logout", {});
    console.log("Logout response:", response.data);
    return response.data;
  }
);

export const checkAuth = createAsyncThunk(
  "/auth/checkauth",
  async () => {
    console.log("Checking auth...");
    const response = await apiClient.get("/api/auth/check-auth");
    console.log("Check auth response:", response.data);
    return response.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: () => {},
    // Add a new reducer to manually set authentication state
    setAuthState: (state, action) => {
      console.log("Setting auth state:", action.payload);
      state.isAuthenticated = action.payload.isAuthenticated;
      state.user = action.payload.user;
      state.isLoading = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log("Login fulfilled:", action);
        
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
        
        console.log("Auth state after login:", {
          user: state.user,
          isAuthenticated: state.isAuthenticated
        });
      })
      .addCase(loginUser.rejected, (state) => {
        console.log("Login rejected");
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        console.log("Check auth fulfilled:", action);
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
        console.log("Auth state after check auth:", {
          user: state.user,
          isAuthenticated: state.isAuthenticated
        });
      })
      .addCase(checkAuth.rejected, (state, action) => {
        console.log("Check auth rejected:", action);
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        console.log("Auth state after check auth rejected:", {
          user: state.user,
          isAuthenticated: state.isAuthenticated
        });
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { setUser, setAuthState } = authSlice.actions;
export default authSlice.reducer;