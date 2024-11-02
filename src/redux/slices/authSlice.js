// authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  getIdToken,
} from "firebase/auth";
import auth from "../../../Firebase/Firebase.config";

// Initialize Google Auth Provider
const googleProvider = new GoogleAuthProvider();

// Initial state
const initialState = {
  user: null,
  token: localStorage.getItem("authToken") || null,
  isAuthenticated: false,
  loading: true,
  error: null,
};

// Async actions for Redux Toolkit
export const createUser = createAsyncThunk(
  "auth/createUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Fetch token from Firebase
      const token = localStorage.getItem("authToken") || null;

      // Return both user data and token
      const userData = {
        uid: user.uid,
        email: user.email,
        token: token,
      };

      return userData;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to create user");
    }
  }
);

export const signInWithGoogle = createAsyncThunk(
  "auth/signInWithGoogle",
  async (_, { rejectWithValue }) => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Fetch token from Firebase
      const token = localStorage.getItem("authToken") || null;

      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        token: token,
      };

      return userData;
    } catch (error) {
      return rejectWithValue(error.message || "Google sign-in failed");
    }
  }
);

export const signInWithEmail = createAsyncThunk(
  "auth/signInWithEmail",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;

      // Fetch token from Firebase
      const token = await getIdToken(user);

      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        token: token,
      };

      return userData;
    } catch (error) {
      return rejectWithValue(error.message || "Email sign-in failed");
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
      localStorage.removeItem("authToken");
      return null;
    } catch (error) {
      return rejectWithValue(error.message || "Logout failed");
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "auth/updateUserProfile",
  async ({ name, photo }, { rejectWithValue }) => {
    try {
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: photo,
        });

        return {
          displayName: name,
          photoURL: photo,
        };
      }
      return rejectWithValue("No user is signed in.");
    } catch (error) {
      return rejectWithValue(error.message || "Profile update failed");
    }
  }
);

// Setup listener to manage user authentication state
export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, { dispatch }) => {
    return new Promise((resolve) => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        dispatch(clearUser());
        resolve();
        return;
      }
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const token = localStorage.getItem("authToken") || null;
          const userData = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            token: token,
          };

          dispatch(setUser(userData));
        } else {
          dispatch(clearUser());
        }
        resolve();
      });
    });
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.token = action.payload.token; // Store token in state
      state.isAuthenticated = !!action.payload; // Set isAuthenticated based on payload
      state.loading = false; // Set loading to false after setting user
    },
    clearUser: (state) => {
      state.user = null;
      state.token = null; // Clear token when logging out
      state.isAuthenticated = false; // Clear authentication state
      state.loading = false; // Set loading to false when clearing user
    },
    setLoading: (state, action) => {
      state.loading = action.payload; // Set loading state based on the action payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true; // Set loading to true when creating user
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.token = action.payload.token; // Set token after user creation
        state.error = null;
        state.loading = false; // Set loading to false when fulfilled
      })
      .addCase(createUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false; // Set loading to false when rejected
      })
      .addCase(signInWithGoogle.pending, (state) => {
        state.loading = true; // Set loading to true when signing in with Google
      })
      .addCase(signInWithGoogle.fulfilled, (state, action) => {
        state.user = action.payload;
        state.token = action.payload.token; // Set token after Google sign-in
        state.error = null;
        state.loading = false; // Set loading to false when fulfilled
      })
      .addCase(signInWithGoogle.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false; // Set loading to false when rejected
      })
      .addCase(signInWithEmail.pending, (state) => {
        state.loading = true; // Set loading to true when signing in with email
      })
      .addCase(signInWithEmail.fulfilled, (state, action) => {
        state.user = action.payload;
        state.token = action.payload.token; // Set token after email sign-in
        state.error = null;
        state.loading = false; // Set loading to false when fulfilled
      })
      .addCase(signInWithEmail.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false; // Set loading to false when rejected
      })
      .addCase(logout.pending, (state) => {
        state.loading = true; // Set loading to true when logging out
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null; // Clear token on logout
        state.error = null;
        state.loading = false; // Set loading to false when fulfilled
      })
      .addCase(logout.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false; // Set loading to false when rejected
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true; // Set loading to true when updating profile
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.user = { ...state.user, ...action.payload };
        state.error = null;
        state.loading = false; // Set loading to false when fulfilled
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false; // Set loading to false when rejected
      });
  },
});

export const { setUser, clearUser, setLoading } = authSlice.actions;

export default authSlice.reducer;
