+++
# BLOG POST FRONTMATTER
# All fields marked with TODO need to be customized for your post

# Title of the blog post (appears in browser tab and as page heading)
title = "Getting Started with React Hooks: A Complete Guide"

# Publication date (YYYY-MM-DD format)
# This determines the post's position in the blog feed
date = 2025-12-15

# Short description for SEO and post previews
# Keep it under 160 characters for best SEO
description = "Learn React Hooks from scratch with practical examples. This beginner-friendly guide covers useState, useEffect, useContext, and custom hooks."

# Tags: specific technologies, concepts (use lowercase, hyphenated)
[taxonomies]
tags = ["react", "javascript", "web-development", "frontend"]
categories = ["tutorial"]

# Author information
# TODO: Replace with actual author details
[extra]
author = "Sidharth Roy"
author_github = "ruanyf"

# Cover image for social media sharing and post preview
# Place image in static/images/blog/
# TODO: Add your cover image

# Estimated reading time (in minutes)
# Can be auto-calculated, but manual is more accurate
reading_time = 10

# Featured post (shows at top of blog page)
featured = false

# Badge for visual indicator
badge = "NEW"

+++

<!-- 
    BLOG POST CONTENT GUIDE
    
    Write your content below using Markdown syntax.
    
    MARKDOWN BASICS:
    - # Heading 1
    - ## Heading 2
    - ### Heading 3
    - **bold text**
    - *italic text*
    - [link text](URL)
    - ![alt text](image-url)
    - `inline code`
    - Lists: use - or 1., 2., 3.
    
    TIPS FOR GREAT BLOG POSTS:
    - Start with a clear introduction
    - Use headings to structure content
    - Include code examples with proper highlighting
    - Add images/diagrams where helpful
    - End with a conclusion or call-to-action
    - Link to relevant resources
-->

## Introduction

React Hooks revolutionized the way we write React components when they were introduced in React 16.8. They allow you to use state and other React features without writing class components, making your code more concise and easier to understand.

In this comprehensive guide, we'll explore the most commonly used React Hooks with practical examples. Whether you're new to React or looking to modernize your codebase, this tutorial will help you master Hooks.

**What you'll learn:**
- What are React Hooks and why they matter
- Understanding `useState` for state management
- Side effects with `useEffect`
- Context API with `useContext`
- Creating custom hooks
- Best practices and common pitfalls

## What Are React Hooks?

Hooks are **functions that let you "hook into" React features** from function components. Before Hooks, you had to use class components to access state and lifecycle methods. Now, you can do everything with functions.

**Key Benefits:**
- ✅ Simpler, more readable code
- ✅ Better code reusability with custom hooks
- ✅ Easier to test
- ✅ No need for `this` keyword
- ✅ Better separation of concerns

## useState: Managing Component State

The `useState` hook lets you add state to function components. It returns an array with two elements: the current state value and a function to update it.

### Basic Syntax

```javascript
import React, { useState } from 'react';

function Counter() {
  // Declare state variable 'count' with initial value 0
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

### Multiple State Variables

You can use `useState` multiple times in a single component:

```javascript
function UserProfile() {
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, age, email });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        placeholder="Name"
      />
      <input 
        type="number"
        value={age} 
        onChange={(e) => setAge(Number(e.target.value))} 
        placeholder="Age"
      />
      <input 
        type="email"
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        placeholder="Email"
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

### State with Objects and Arrays

When working with objects or arrays, always create a new reference:

```javascript
function TodoList() {
  const [todos, setTodos] = useState([]);

  const addTodo = (text) => {
    // Create new array with spread operator
    setTodos([...todos, { id: Date.now(), text, completed: false }]);
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id 
        ? { ...todo, completed: !todo.completed }
        : todo
    ));
  };

  return (
    <div>
      {todos.map(todo => (
        <div key={todo.id}>
          <input 
            type="checkbox" 
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
          />
          <span style={{ 
            textDecoration: todo.completed ? 'line-through' : 'none' 
          }}>
            {todo.text}
          </span>
        </div>
      ))}
    </div>
  );
}
```

## useEffect: Handling Side Effects

The `useEffect` hook lets you perform side effects in function components - things like data fetching, subscriptions, or manually changing the DOM.

### Basic Usage

```javascript
import React, { useState, useEffect } from 'react';

function UserData() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This runs after every render
    fetch('https://api.example.com/user/1')
      .then(response => response.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      });
  }, []); // Empty dependency array = run only once on mount

  if (loading) return <p>Loading...</p>;
  return <div>{user.name}</div>;
}
```

### Dependency Array

The second argument to `useEffect` is the **dependency array**. It controls when the effect runs:

```javascript
// Run on every render
useEffect(() => {
  console.log('Runs on every render');
});

// Run only once (on mount)
useEffect(() => {
  console.log('Runs once on mount');
}, []);

// Run when specific values change
useEffect(() => {
  console.log('Runs when count changes');
}, [count]);

// Multiple dependencies
useEffect(() => {
  console.log('Runs when count or name changes');
}, [count, name]);
```

### Cleanup Functions

Return a cleanup function to avoid memory leaks:

```javascript
useEffect(() => {
  // Subscribe to something
  const subscription = subscribeToData();

  // Cleanup function
  return () => {
    subscription.unsubscribe();
  };
}, []);
```

### Practical Example: Document Title

```javascript
function PageTitle() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  }, [count]); // Update title when count changes

  return (
    <button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </button>
  );
}
```

## useContext: Sharing Data Across Components

`useContext` makes it easy to share data between components without prop drilling.

### Creating Context

```javascript
import React, { createContext, useContext, useState } from 'react';

// Create context
const ThemeContext = createContext();

// Provider component
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to use the context
function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

// Using the context
function ThemedButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button 
      onClick={toggleTheme}
      style={{
        background: theme === 'light' ? '#fff' : '#333',
        color: theme === 'light' ? '#333' : '#fff'
      }}
    >
      Toggle Theme (Current: {theme})
    </button>
  );
}

// App component
function App() {
  return (
    <ThemeProvider>
      <ThemedButton />
    </ThemeProvider>
  );
}
```

## Custom Hooks: Reusable Logic

Custom hooks let you extract component logic into reusable functions. They must start with "use".

### Example: useFetch Hook

```javascript
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [url]);

  return { data, loading, error };
}

// Using the custom hook
function UserProfile() {
  const { data, loading, error } = useFetch('https://api.example.com/user/1');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return <div>{data.name}</div>;
}
```

### Example: useLocalStorage Hook

```javascript
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setStoredValue = (newValue) => {
    try {
      setValue(newValue);
      window.localStorage.setItem(key, JSON.stringify(newValue));
    } catch (error) {
      console.error(error);
    }
  };

  return [value, setStoredValue];
}

// Usage
function App() {
  const [name, setName] = useLocalStorage('name', '');

  return (
    <input 
      value={name}
      onChange={(e) => setName(e.target.value)}
      placeholder="Your name (persisted in localStorage)"
    />
  );
}
```

## Best Practices and Common Pitfalls

### ✅ Do's

1. **Always call hooks at the top level** - Don't call hooks inside loops, conditions, or nested functions
2. **Use descriptive names** - `[user, setUser]` is better than `[data, setData]`
3. **Keep effects focused** - One effect per concern
4. **Extract custom hooks** - Reuse logic across components
5. **Specify dependencies correctly** - Include all values used in the effect

### ❌ Don'ts

1. **Don't forget cleanup functions** - Prevents memory leaks
2. **Don't mutate state directly** - Always use setter functions
3. **Don't use stale closures** - Be careful with async functions in effects
4. **Don't skip the dependency array** - Leads to unexpected behavior

### Common Mistakes

```javascript
// ❌ Wrong: Mutating state directly
const [items, setItems] = useState([]);
items.push(newItem); // DON'T DO THIS

// ✅ Correct: Create new array
setItems([...items, newItem]);

// ❌ Wrong: Missing dependencies
useEffect(() => {
  console.log(count); // count is used but not in dependencies
}, []);

// ✅ Correct: Include all dependencies
useEffect(() => {
  console.log(count);
}, [count]);
```

## Conclusion

React Hooks have transformed how we write React applications. They make code more readable, reusable, and easier to test. Start with `useState` and `useEffect`, get comfortable with `useContext`, and then create your own custom hooks to encapsulate reusable logic.

**Key Takeaways:**
- Hooks let you use React features in function components
- `useState` manages component state
- `useEffect` handles side effects and lifecycle
- `useContext` shares data without prop drilling
- Custom hooks extract reusable logic
- Always follow the Rules of Hooks

## Further Resources

- [Official React Hooks Documentation](https://react.dev/reference/react)
- [React Hooks Cheat Sheet](https://react-hooks-cheatsheet.com/)
- [UseHooks - Collection of Custom Hooks](https://usehooks.com/)
- [React Hooks Course on FreeCodeCamp](https://www.freecodecamp.org/news/tag/react-hooks/)

**Ready to practice?** Try building a simple todo app or weather app using Hooks. The best way to learn is by doing!

---

**Questions or feedback?** Drop a comment below or reach out to me on [GitHub](https://github.com/arjun-dev) or [LinkedIn](https://linkedin.com/in/arjun-sharma-dev).

**Found this helpful?** Share it with your friends and fellow developers!

<!-- 
    WRITING YOUR OWN BLOG POST?
    
    Use this as a template! Here's what to keep:
    - Clear frontmatter with all required fields
    - Introduction that sets context
    - Well-structured sections with headings
    - Code examples with proper syntax highlighting
    - Practical examples readers can try
    - Best practices section
    - Conclusion summarizing key points
    - Links to further resources
    - Author bio/contact at the end
    
    TIPS:
    - Write for your target audience (beginner/intermediate/advanced)
    - Use real-world examples
    - Explain "why" not just "how"
    - Add images/diagrams where helpful
    - Proofread before submitting PR
-->
