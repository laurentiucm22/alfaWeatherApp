# Handling Props in React Without Prop Drilling

Prop drilling occurs when you need to pass data through multiple component levels, even when intermediate components don't need the data. Here are several effective solutions:

## 1. React Context API

The Context API is React's built-in solution for sharing state across components without passing props through every level.

### Basic Context Setup

```jsx
// UserContext.js
import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ name: 'John Doe', email: 'john@example.com' });
  
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
```

### Using Context in Components

```jsx
// App.js
import React from 'react';
import { UserProvider } from './UserContext';
import Header from './Header';

function App() {
  return (
    <UserProvider>
      <div className="app">
        <Header />
        {/* Other components that might need user data */}
      </div>
    </UserProvider>
  );
}

// Header.js
import React from 'react';
import UserProfile from './UserProfile';

function Header() {
  return (
    <header>
      <h1>My App</h1>
      <UserProfile />
    </header>
  );
}

// UserProfile.js
import React from 'react';
import { useUser } from './UserContext';

function UserProfile() {
  const { user, setUser } = useUser();
  
  return (
    <div>
      <span>Welcome, {user.name}!</span>
      <button onClick={() => setUser({ ...user, name: 'Jane Doe' })}>
        Change Name
      </button>
    </div>
  );
}
```

## 2. Multiple Contexts for Different Concerns

```jsx
// ThemeContext.js
import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// App.js with multiple providers
function App() {
  return (
    <UserProvider>
      <ThemeProvider>
        <div className="app">
          <Header />
          <MainContent />
        </div>
      </ThemeProvider>
    </UserProvider>
  );
}
```

## 3. State Management Libraries

### Using Zustand (Lightweight Alternative)

```jsx
// store.js
import { create } from 'zustand';

export const useUserStore = create((set) => ({
  user: { name: 'John Doe', email: 'john@example.com' },
  setUser: (user) => set({ user }),
  updateUserName: (name) => set((state) => ({ 
    user: { ...state.user, name } 
  })),
}));

export const useThemeStore = create((set) => ({
  theme: 'light',
  toggleTheme: () => set((state) => ({ 
    theme: state.theme === 'light' ? 'dark' : 'light' 
  })),
}));

// Using in components
import React from 'react';
import { useUserStore, useThemeStore } from './store';

function UserProfile() {
  const { user, updateUserName } = useUserStore();
  const { theme } = useThemeStore();
  
  return (
    <div className={`user-profile ${theme}`}>
      <span>Welcome, {user.name}!</span>
      <button onClick={() => updateUserName('Jane Doe')}>
        Change Name
      </button>
    </div>
  );
}
```

### Using Redux Toolkit

```jsx
// store/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: { name: 'John Doe', email: 'john@example.com' }
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    updateUserName: (state, action) => {
      state.user.name = action.payload;
    }
  }
});

export const { setUser, updateUserName } = userSlice.actions;
export default userSlice.reducer;

// Using in components
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserName } from './store/userSlice';

function UserProfile() {
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();
  
  return (
    <div>
      <span>Welcome, {user.name}!</span>
      <button onClick={() => dispatch(updateUserName('Jane Doe'))}>
        Change Name
      </button>
    </div>
  );
}
```

## 4. Component Composition Patterns

### Render Props Pattern

```jsx
// DataProvider.js
import React, { useState, useEffect } from 'react';

function DataProvider({ children }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setData({ items: ['Item 1', 'Item 2', 'Item 3'] });
      setLoading(false);
    }, 1000);
  }, []);
  
  return children({ data, loading });
}

// Usage
function App() {
  return (
    <DataProvider>
      {({ data, loading }) => (
        <div>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ItemList items={data.items} />
          )}
        </div>
      )}
    </DataProvider>
  );
}
```

### Higher-Order Components (HOCs)

```jsx
// withUserData.js
import React from 'react';
import { useUser } from './UserContext';

function withUserData(WrappedComponent) {
  return function WithUserDataComponent(props) {
    const userData = useUser();
    
    return (
      <WrappedComponent 
        {...props} 
        userData={userData} 
      />
    );
  };
}

// Usage
const UserProfileWithData = withUserData(function UserProfile({ userData }) {
  return (
    <div>
      <span>Welcome, {userData.user.name}!</span>
    </div>
  );
});
```

## 5. Custom Hooks for Shared Logic

```jsx
// hooks/useLocalStorage.js
import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}

// hooks/useApi.js
import { useState, useEffect } from 'react';

export function useApi(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}

// Usage in components
function UserList() {
  const { data: users, loading, error } = useApi('/api/users');
  const [favorites, setFavorites] = useLocalStorage('favorites', []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {users.map(user => (
        <div key={user.id}>
          {user.name}
          <button 
            onClick={() => setFavorites([...favorites, user.id])}
          >
            Add to Favorites
          </button>
        </div>
      ))}
    </div>
  );
}
```

## 6. Advanced Context with useReducer

```jsx
// AppContext.js
import React, { createContext, useContext, useReducer } from 'react';

const AppContext = createContext();

const initialState = {
  user: null,
  theme: 'light',
  notifications: [],
  isLoading: false
};

function appReducer(state, action) {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'TOGGLE_THEME':
      return { ...state, theme: state.theme === 'light' ? 'dark' : 'light' };
    case 'ADD_NOTIFICATION':
      return { 
        ...state, 
        notifications: [...state.notifications, action.payload] 
      };
    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(n => n.id !== action.payload)
      };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
}

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const actions = {
    setUser: (user) => dispatch({ type: 'SET_USER', payload: user }),
    toggleTheme: () => dispatch({ type: 'TOGGLE_THEME' }),
    addNotification: (notification) => 
      dispatch({ type: 'ADD_NOTIFICATION', payload: notification }),
    removeNotification: (id) => 
      dispatch({ type: 'REMOVE_NOTIFICATION', payload: id }),
    setLoading: (loading) => 
      dispatch({ type: 'SET_LOADING', payload: loading })
  };

  return (
    <AppContext.Provider value={{ state, actions }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
```

## When to Use Each Approach

### Context API
- **Best for**: Theming, user authentication, app-wide settings
- **Pros**: Built into React, no external dependencies
- **Cons**: Can cause unnecessary re-renders if not optimized

### State Management Libraries (Redux, Zustand)
- **Best for**: Complex state logic, time-travel debugging, large applications
- **Pros**: Predictable state updates, dev tools, ecosystem
- **Cons**: Additional complexity, learning curve

### Component Composition
- **Best for**: Reusable logic, avoiding tight coupling
- **Pros**: Flexible, follows React patterns
- **Cons**: Can lead to complex component trees

### Custom Hooks
- **Best for**: Shared stateful logic, side effects
- **Pros**: Reusable, testable, follows React conventions
- **Cons**: Limited to functional components

## Best Practices

1. **Start Simple**: Use built-in React features (Context, composition) before reaching for external libraries
2. **Separate Concerns**: Create different contexts for different types of data
3. **Optimize Performance**: Use `React.memo`, `useMemo`, and `useCallback` to prevent unnecessary re-renders
4. **Error Boundaries**: Wrap context providers with error boundaries
5. **TypeScript**: Use TypeScript for better type safety with contexts and stores

## Performance Optimization Tips

```jsx
// Optimize Context with multiple providers
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  
  // Memoize the value to prevent unnecessary re-renders
  const value = useMemo(() => ({ user, setUser }), [user]);
  
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

// Split contexts to minimize re-renders
const UserDataContext = createContext();
const UserActionsContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  
  // Actions don't change, so they can be in a separate context
  const actions = useMemo(() => ({ setUser }), []);
  
  return (
    <UserActionsContext.Provider value={actions}>
      <UserDataContext.Provider value={user}>
        {children}
      </UserDataContext.Provider>
    </UserActionsContext.Provider>
  );
};
```

Choose the approach that best fits your application's complexity and requirements!