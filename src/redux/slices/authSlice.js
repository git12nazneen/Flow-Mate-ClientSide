// authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';
import auth from '../../../Firebase/Firebase.config';

// Initialize Google Auth Provider
const googleProvider = new GoogleAuthProvider();

// Initial state
const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true,
  error: null,
};

// Async actions for Redux Toolkit
export const createUser = createAsyncThunk(
  'auth/createUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Extract serializable user data
      const userData = {
        uid: user.uid,
        email: user.email,
      };

      return userData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const signInWithGoogle = createAsyncThunk(
  'auth/signInWithGoogle',
  async (_, { rejectWithValue }) => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const userData = {
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName,
        photoURL: result.user.photoURL,
      };

      return userData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const signInWithEmail = createAsyncThunk(
  'auth/signInWithEmail',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const userData = {
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName,
        photoURL: result.user.photoURL,
      };

      return userData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  'auth/updateUserProfile',
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
      return rejectWithValue('No user is signed in.');
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Setup listener to manage user authentication state
export const fetchCurrentUser = createAsyncThunk(
  'auth/fetchCurrentUser',
  async (_, { dispatch }) => {
    return new Promise((resolve) => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const userData = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
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
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload; // Set isAuthenticated based on payload
      state.loading = false; // Set loading to false after setting user
    },
    clearUser: (state) => {
      state.user = null;
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