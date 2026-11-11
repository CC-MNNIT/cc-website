+++
title = "React Native & Expo Cross-platform Development Roadmap"
weight = 8
description = "A comprehensive, practical guide to mastering cross-platform mobile development with TypeScript, React Native, Expo, the New Architecture, and production deployment."

[extra]
difficulty = "Beginner to Advanced"
estimated_time = "Ongoing Practice (4-6 months for core foundation)"
prerequisites = "Basic JavaScript or programming fundamentals; prior React web knowledge is helpful but not mandatory"
badge = "CROSS-PLATFORM"
toc_expand = true

# Landing page carousel
carousel_image = "roadmaps/react-native-cyber.webp"
carousel_title = "React Native"
carousel_description = "Master cross-platform mobile development with TypeScript, React Native, Expo Router, the New Architecture (Fabric/TurboModules), Zustand, and EAS."
+++

React Native powers some of the most widely used mobile applications in the world—from Meta platforms (Instagram, Facebook Ads) and Microsoft apps (Teams, Skype) to Shopify, Discord, Coinbase, and Pinterest. By combining the declarative component model of **React** with native platform primitives, React Native allows developers to build truly native mobile applications for **Android and iOS** from a single **TypeScript** codebase.

However, the React Native ecosystem of 2026 is vastly different from the legacy tutorials of 2018. Today, modern React Native development is driven by **The New Architecture** (Fabric, TurboModules, and the high-performance Hermes JavaScript engine) and the **Expo application framework**, which provides file-based routing (**Expo Router**), native cloud and local build pipelines (**EAS**), and unified access to mobile hardware.

This roadmap is designed by the **Computer Coding Club (CC), MNNIT Allahabad** to guide both complete beginners and experienced web developers through the complete mobile engineering spectrum: mastering TypeScript, transitioning from DOM thinking to native primitives, structuring scalable offline-first apps, and shipping production binaries to the Google Play Store and Apple App Store.

---

## 1. Orientation: The Modern React Native Ecosystem

Before diving into components, you must establish an accurate mental model of what React Native actually is, how it renders on physical devices, and where Expo fits into the ecosystem.

### 1.1 What React Native Is (and Is Not)

* **What It IS**: React Native is a mobile framework that runs your application logic in an embedded, precompiled JavaScript engine (Hermes) and drives **real, platform-native UI widgets** (such as Android's `ViewGroup` and iOS's `UIView`). A button rendered in React Native is not a web element inside a WebView; it is a genuine, hardware-accelerated platform widget.
* **What It IS NOT**: React Native is not a hybrid wrapper like Cordova or Ionic. It does not render HTML inside an embedded browser window. There is no `document`, no `window`, and no DOM.

{% <mermaid> %}
graph TD
    App["Your TypeScript / React Code"] --> Engine["Hermes JavaScript Engine (Bytecode AOT)"]
    Engine --> JSI["JavaScript Interface (JSI - Direct C++ Memory)"]
    JSI --> Fabric["Fabric Rendering Engine (Native C++)"]
    JSI --> Turbo["TurboModules (Native Device Hardware)"]
    Fabric --> AndroidUI["Android Native Views (ViewGroup)"]
    Fabric --> AppleUI["iOS Native Views (UIView / CoreAnimation)"]
{% </mermaid> %}

### 1.2 The Evolution: Legacy Bridge vs. The New Architecture

Understanding the transition from the legacy architecture to the New Architecture prevents you from adopting obsolete patterns.

| Architectural Dimension | Legacy React Native (Pre-0.70) | Modern React Native (0.76+ & New Architecture) |
| :--- | :--- | :--- |
| **Communication Layer** | Asynchronous JSON **Bridge** (Serialized strings over a queue) | **JSI (JavaScript Interface)**: Direct C++ in-memory function calls with zero serialization |
| **UI Rendering Engine** | Legacy Paper Renderer (Asynchronous layout calculation) | **Fabric Renderer**: Synchronous UI measurements, concurrent rendering, 120Hz fluid layouts |
| **Native Modules** | Eagerly initialized on app launch (Slowing down startup) | **TurboModules**: Lazy-loaded native modules instantiated only on first invocation |
| **JavaScript Engine** | JavaScriptCore (Slow cold starts, uncompressed bundles) | **Hermes Engine**: Bytecode precompiled Ahead-of-Time (AOT), microsecond startup, minimal RAM |
| **Layout Math** | Yoga Engine over the Bridge | **Yoga C++ Engine** integrated directly into the host thread via JSI |

{% <alert_info> %}
**Why JSI Matters for Mobile Developers**: In the old architecture, every user swipe, scroll event, and animation frame had to be converted into a JSON string, queued across an asynchronous bridge, and deserialized in native Java/Objective-C. This caused noticeable frame drops and lag. With **JSI**, JavaScript code can directly hold C++ host references, making native communication as fast as calling a local function.
{% </alert_info> %}

### 1.3 Demystifying Expo: Toolchain vs. Framework

A common question among newcomers is: *"Should I learn React Native or Expo?"*

This is a false dichotomy. **Expo is the official, Meta-recommended framework for React Native** (analogous to how Next.js is the official production framework for React web).

{% <mermaid> %}
graph TD
    subgraph React_Native_Core["React Native Core"]
        Primitives["Core Components: View, Text, FlatList"]
        JSI_Arch["New Architecture: Fabric, TurboModules, Hermes"]
    end

    subgraph Expo_Framework["Expo Ecosystem"]
        Router["Expo Router (File-based typed routing)"]
        SDK["Expo SDK (50+ curated hardware modules: Camera, SecureStore, SQLite)"]
        CLI["Expo CLI (Metro bundler, dev server, prebuild)"]
        EAS["EAS (Cloud & Local builds, App Store submissions)"]
    end

    Expo_Framework -->|"Wraps, enhances, and powers"| React_Native_Core
{% </mermaid> %}

* **Expo Go**: A prebuilt sandbox client installed on your physical phone from the App Store. Excellent for beginners writing basic UI without custom native libraries.
* **Development Builds (`expo-dev-client`)**: A customized native binary compiled specifically for your app, containing all your custom C++, Kotlin, and Swift dependencies while retaining full Hot Reload. This is the **standard workflow for all professional React Native apps**.
* **Prebuild (`npx expo prebuild`)**: Continuously and deterministically generates standard `android/` and `ios/` folders from your project configuration. You get full access to native native projects without needing to maintain fragile native build files manually.

---

## 2. The Web-to-Mobile Transition Guide

If you already know React for the web, approximately **70% of your conceptual knowledge transfers immediately**. However, the remaining **30% involves mobile-specific paradigms** that will break your application if ignored.

### 2.1 The Concept Transfer Matrix

| Web Concept (React DOM) | Mobile Equivalent (React Native) | Key Differences & Gotchas |
| :--- | :--- | :--- |
| `<div>`, `<section>`, `<main>` | `<View>` | Containers do not inherit styles; they act as a layout box with Flexbox enabled by default. |
| `<p>`, `<span>`, `<h1>`–`<h6>` | `<Text>` | **Raw strings CANNOT exist inside `<View>`.** Any text not wrapped in `<Text>` triggers an immediate runtime crash! |
| `<button>`, `<input type="button">` | `<Pressable>` | React Native has no default hover states. `<Pressable>` gives fine-grained control over press in, press out, and ripple states. |
| `<img>` | `<Image>` or `Image` from `expo-image` | Images require explicit dimensions (`width` and `height`) in styles, or they collapse to 0x0 pixels. |
| `<input type="text">` | `<TextInput>` | Requires explicit handling for software keyboards (`KeyboardAvoidingView`), auto-capitalization, and secure text entry. |
| `<ul>`, `<li>` with `.map()` | `<FlatList>` | **Never render long lists using `.map()` inside a ScrollView.** `<FlatList>` virtualizes rows to protect memory. |
| `<a>` (Hyperlinks) | `<Link>` (Expo Router) or Navigation | Mobile navigation is a **stack of physical viewports**, not a flat browser URL replacement. |
| CSS Files, Tailwind Web | `StyleSheet.create({})` or NativeWind | No CSS cascade. Properties are camelCased (`backgroundColor`). No `px` or `rem` units; numbers represent density-independent pixels (`dp`). |

### 2.2 Critical Mental Shifts for Web Developers

#### 1. Flexbox Defaults to Columns, Not Rows
On the web, `display: flex` arranges child elements in a horizontal row by default (`flexDirection: 'row'`). Because mobile screens are portrait-oriented, **React Native defaults `flexDirection` to `'column'`**.

```tsx
// React Native: Children stack vertically by default!
const styles = StyleSheet.create({
  container: {
    flex: 1, // Takes up 100% of available screen space
    flexDirection: 'column', // Default in React Native
    justifyContent: 'center', // Aligns along the vertical axis
    alignItems: 'center', // Aligns along the horizontal axis
  },
});
```

#### 2. The Absence of CSS Cascading
In browser CSS, setting `color: red` on a parent `<div>` causes all nested paragraphs and spans to inherit the red text color. **In React Native, styles DO NOT cascade**. The only exception is nesting `<Text>` inside an outer `<Text>` component:

```tsx
// ❌ FAILS: The inner text will NOT inherit the red color!
<View style={ {  color: 'red'  } }>
  <Text>This text will be the default system color, NOT red!</Text>
</View>

// ✅ WORKS: Text styles cascade only when nested inside Text
<Text style={ {  color: 'red', fontSize: 16  } }>
  This is red, and <Text style={ {  fontWeight: 'bold'  } }>this is red and bold!</Text>
</Text>
```

#### 3. Mobile Navigation Stacks vs. Flat Browser URLs
On the web, clicking a link replaces the current DOM tree or changes a flat URL. On mobile, screens are pushed onto a **Navigation Stack**:
* When a user navigates from the Feed to a Profile, the Feed screen is **not unmounted**. It remains alive in memory beneath the Profile screen.
* State, active network subscriptions, and audio playback in the underlying screen continue running unless explicitly paused via mobile lifecycle hooks.

#### 4. The Software Keyboard & Screen Real Estate
On desktop browsers, keyboards are physical hardware peripherals that never obstruct viewport content. On mobile, tapping a text input raises a software keyboard that instantly obscures 40–50% of the screen. Mobile apps must wrap input forms in `<KeyboardAvoidingView>` to prevent inputs from being hidden behind the keyboard.

---

## 3. Stage 1: Modern JavaScript & TypeScript Foundations

Modern React Native applications are built with strict **TypeScript**. Solidifying your TypeScript foundations eliminates runtime type bugs before your code touches a device.

### 3.1 Essential ES6+ Concepts for React Native

```typescript
// 1. Destructuring with Default Fallbacks
const { username, role = 'Member', stats: { commits = 0 } = {} } = member;

// 2. Spread Operator for Immutable State Updates
const updatedUser = {
  ...currentUser,
  achievements: [...currentUser.achievements, 'Hackathon Finalist'],
};

// 3. Optional Chaining and Nullish Coalescing
const avatarUrl = user?.profile?.avatar ?? 'https://cc-club.in/default-avatar.png';
```

### 3.2 TypeScript for Mobile Applications

Avoid typing components with generic `any`. Statically typed props, navigation routes, and API responses ensure robust applications:

```typescript
// Strict Interface Declarations
interface Contributor {
  id: string;
  name: string;
  contributionsCount: number;
  isCoreTeam: boolean;
  avatarUrl?: string;
}

// Discriminated Unions for UI State
type RequestState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; errorMessage: string };

// Exhaustive pattern matching helper
function renderState(state: RequestState<Contributor[]>) {
  switch (state.status) {
    case 'idle':
      return null;
    case 'loading':
      return <ActivityIndicator size="large" />;
    case 'success':
      return <ContributorList contributors={state.data} />;
    case 'error':
      return <ErrorMessage message={state.errorMessage} />;
  }
}
```

---

## 4. Stage 2: Development Environment & The Expo Workflow

Setting up a mobile development environment involves configuring Node.js, watchmen, mobile emulators, and build engines.

### 4.1 Initializing a Modern Expo Project

Create a new project using the official template configured with TypeScript and Expo Router:

```bash
# Create a fresh production-ready app
npx create-expo-app@latest cc-pulse --template default
cd cc-pulse

# Launch the development server
npx expo start
```

### 4.2 The Three Expo Workflows Compared

{% <mermaid> %}
graph TD
    Choice["Which Expo Workflow should you use?"] --> W1["Workflow 1: Expo Go"]
    Choice --> W2["Workflow 2: Development Builds (expo-dev-client)"]
    Choice --> W3["Workflow 3: Bare / Prebuild Native Project"]

    W1 --> D1["Zero native setup. Scan QR code in Expo Go app.<br/>Limitation: Cannot use custom C++/Kotlin/Swift native libraries."]
    W2 --> D2["Industry Standard. Generates a custom debug binary for your device.<br/>Supports all native modules, custom SDKs, and full Hot Reload."]
    W3 --> D3["Continuous Native Generation (CNG).<br/>Generates deterministic android/ and ios/ folders via 'npx expo prebuild'."]
{% </mermaid> %}

{% <alert_success> %}
**The Modern Consensus**: Start simple with **Expo Go** while learning core UI, Flexbox, and state. When you need custom native hardware libraries (such as specialized Bluetooth SDKs or background services), transition seamlessly to **Development Builds (`npx expo run:android` or `npx expo run:ios`)** without rewriting any React code.
{% </alert_success> %}

### 4.3 Metro Bundler & Fast Refresh

React Native uses **Metro**, a dedicated JavaScript bundler optimized for mobile devices:
* **Fast Refresh**: React Native combines Hot Reloading with React Component state preservation. If you edit a component's JSX or CSS, Metro updates only that component in under a second without resetting your form fields or navigation stack.
* **Hermes Debugger**: Modern Expo includes built-in Hermes debugging. Press `j` in the Metro terminal to attach Chrome DevTools directly to the Hermes JavaScript runtime on your device.

---

## 5. Stage 3: Core React Native Components & Styling

React Native replaces browser DOM tags with native platform UI primitives.

### 5.1 The Core Primitive Catalog

```tsx
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Image } from 'expo-image'; // High-performance native image component

interface ProjectCardProps {
  title: string;
  stars: number;
  bannerUri: string;
  onPress: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  stars,
  bannerUri,
  onPress,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.cardContainer,
        pressed && styles.cardPressed, // Dynamic touch feedback
      ]}
      accessibilityRole="button"
      accessibilityLabel={`Open project ${title}`}
    >
      <Image
        source={ {  uri: bannerUri  } }
        style={styles.bannerImage}
        contentFit="cover"
        transition={300}
      />
      <View style={styles.contentPadding}>
        <Text style={styles.titleText} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.starsText}>⭐ {stars} Stars</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#1E1E24',
    borderRadius: 16,
    overflow: 'hidden',
    marginVertical: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  cardPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }], // Native subtle tactile feedback
  },
  bannerImage: {
    width: '100%',
    height: 140,
  },
  contentPadding: {
    padding: 16,
  },
  titleText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  starsText: {
    fontSize: 14,
    color: '#E67E22', // Warm amber
    fontWeight: '600',
  },
});
```

### 5.2 High-Performance List Virtualization with `FlatList`

In web browsers, you might render a list of 500 items by mapping an array into JSX (`items.map(...)`). Doing this on mobile creates 500 native views simultaneously, consuming hundreds of megabytes of RAM and causing severe frame rate drops.

**`FlatList`** renders only the items currently visible in the device viewport, lazily recycling off-screen views:

```tsx
<FlatList
  data={projects}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => (
    <ProjectCard
      title={item.title}
      stars={item.stars}
      bannerUri={item.bannerUrl}
      onPress={() => navigateToDetail(item.id)}
    />
  )}
  // Performance optimizations for 120Hz smooth scrolling:
  initialNumToRender={10}
  maxToRenderPerBatch={10}
  windowSize={5}
  removeClippedSubviews={true}
  ItemSeparatorComponent={() => <View style={ {  height: 8  } } />}
  ListEmptyComponent={<Text style={styles.emptyText}>No projects found</Text>}
/>
```

---

## 6. Stage 4: Navigation Architecture with Expo Router

Navigation on mobile is fundamentally hierarchical. In modern React Native, **Expo Router** brings file-based routing to mobile applications.

### 6.1 File-Based Mobile Routing

With Expo Router, every file inside the `app/` directory automatically becomes a navigation route:

```
app/
├── _layout.tsx           # Root navigation stack & global theme provider
├── index.tsx             # Root home screen (/)
├── (auth)/               # Route group (hidden from URL path)
│   ├── login.tsx         # /login
│   └── register.tsx      # /register
├── (tabs)/               # Bottom tab navigation group
│   ├── _layout.tsx       # Bottom tab bar configuration
│   ├── feed.tsx          # Feed tab
│   └── profile.tsx       # Profile tab
└── project/
    └── [id].tsx          # Dynamic route: /project/123
```

### 6.2 Nested Navigation: Stacks and Tabs

```tsx
// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={ { 
        tabBarActiveTintColor: '#E67E22', // Warm amber brand accent
        tabBarStyle: { backgroundColor: '#121214', borderTopColor: '#27272A' },
        headerStyle: { backgroundColor: '#121214' },
        headerTintColor: '#FFFFFF',
       } }
    >
      <Tabs.Screen
        name="feed"
        options={ { 
          title: 'Explore',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="compass-outline" size={size} color={color} />
          ),
         } }
      />
      <Tabs.Screen
        name="profile"
        options={ { 
          title: 'My Profile',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
         } }
      />
    </Tabs>
  );
}
```

#### Accessing Route Parameters
```tsx
// app/project/[id].tsx
import { useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native';

export default function ProjectDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View style={ {  flex: 1, padding: 16  } }>
      <Text style={ {  fontSize: 22, fontWeight: 'bold'  } }>Project ID: {id}</Text>
    </View>
  );
}
```

---

## 7. Stage 5: State Management & Data Fetching

State in mobile applications falls into two distinct categories: **Server State** (data owned by the backend that requires caching and syncing) and **Client State** (local UI settings and session flags).

{% <mermaid> %}
graph TD
    State["Application State"] --> ServerState["Server State (Cached Network Data)"]
    State --> ClientState["Client State (Local UI & Sessions)"]

    ServerState --> TQ["TanStack Query (React Query)"]
    TQ --> TQ_Features["Automatic background refetching<br/>Stale-while-revalidate caching<br/>Optimistic mutation updates"]

    ClientState --> LocalState["Local Component State: useState / useReducer"]
    ClientState --> GlobalState["Global Shared State: Zustand"]
{% </mermaid> %}

### 7.1 Server State with TanStack Query (React Query)

Avoid writing manual `useEffect` fetches with boilerplate `loading` and `error` states. **TanStack Query** manages mobile network caching, background synchronization, and automatic retry policies:

```tsx
import { useQuery } from '@tanstack/react-query';
import { ActivityIndicator, Text, View } from 'react-native';

interface Project {
  id: string;
  name: string;
}

async function fetchClubProjects(): Promise<Project[]> {
  const response = await fetch('https://api.cc-club.in/v1/projects');
  if (!response.ok) throw new Error('Network error loading projects');
  return response.json();
}

export function ProjectFeed() {
  const { data, isLoading, isError, error, refetch, isRefetching } = useQuery({
    queryKey: ['projects'],
    queryFn: fetchClubProjects,
    staleTime: 1000 * 60 * 5, // Cache valid for 5 minutes
  });

  if (isLoading) return <ActivityIndicator size="large" color="#E67E22" />;
  if (isError) return <Text style={ {  color: 'red'  } }>Error: {error.message}</Text>;

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      refreshing={isRefetching}
      onRefresh={refetch} // Native pull-to-refresh integration
      renderItem={({ item }) => <Text>{item.name}</Text>}
    />
  );
}
```

### 7.2 Global Client State with Zustand

For client-side global state (such as user session preferences, offline draft queue, or active theme), **Zustand** provides a lightweight, hook-based store without the boilerplate of Redux:

```typescript
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserPreferencesState {
  themeMode: 'dark' | 'light' | 'system';
  isBiometricsEnabled: boolean;
  setThemeMode: (mode: 'dark' | 'light' | 'system') => void;
  toggleBiometrics: () => void;
}

export const useUserPreferences = create<UserPreferencesState>()(
  persist(
    (set) => ({
      themeMode: 'dark',
      isBiometricsEnabled: false,
      setThemeMode: (mode) => set({ themeMode: mode }),
      toggleBiometrics: () =>
        set((state) => ({ isBiometricsEnabled: !state.isBiometricsEnabled })),
    }),
    {
      name: 'user-preferences-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
```

---

## 8. Stage 6: Local Persistence & Offline Storage

Mobile devices experience frequent network disconnections. Storing data locally ensures instant startup times and reliable offline experiences.

### 8.1 The Storage Matrix

| Storage Solution | Best Fit | Security & Performance |
| :--- | :--- | :--- |
| **`expo-secure-store`** | Sensitive JWTs, refresh tokens, encryption keys | **Hardware-backed**: Encrypted using Android Keystore and iOS Keychain. |
| **`AsyncStorage`** | Small key-value strings, user theme, onboarding flags | Unencrypted key-value store. Never store passwords or tokens here! |
| **`expo-sqlite`** | Structured relational data, offline databases, full-text search | High-performance native SQLite engine with type-safe queries. |

### 8.2 Relational Data with Modern `expo-sqlite`

Modern `expo-sqlite` supports asynchronous, promise-based query execution with full transaction integrity:

```typescript
import * as SQLite from 'expo-sqlite';

// Open or create the local database
const db = SQLite.openDatabaseSync('cc_notes.db');

export function initDatabase() {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS notes (
      id TEXT PRIMARY KEY NOT NULL,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      updated_at INTEGER NOT NULL
    );
  `);
}

export function saveNote(id: string, title: string, content: string) {
  const statement = db.prepareSync(
    'INSERT OR REPLACE INTO notes (id, title, content, updated_at) VALUES ($id, $title, $content, $time)'
  );
  statement.executeSync({
    $id: id,
    $title: title,
    $content: content,
    $time: Date.now(),
  });
}

export function getAllNotes() {
  return db.getAllSync<{ id: string; title: string; content: string }>(
    'SELECT * FROM notes ORDER BY updated_at DESC'
  );
}
```

---

## 9. Stage 7: Native Device Capabilities & Hardware

Mobile applications differentiate themselves from web pages through deep, hardware-level operating system integration.

{% <mermaid> %}
graph TD
    App["Your React Native Application"] --> ExpoSDK["Expo Hardware SDK Layer"]
    ExpoSDK --> Cam["expo-camera (Photos & QR Scanning)"]
    ExpoSDK --> Loc["expo-location (GPS & Geofencing)"]
    ExpoSDK --> Auth["expo-local-authentication (Face ID / Fingerprint)"]
    ExpoSDK --> Notif["expo-notifications (Push & Local Reminders)"]
    ExpoSDK --> Haptic["expo-haptics (Tactile Vibration Engines)"]
{% </mermaid> %}

### 9.1 Hardware Biometric Authentication

Using **`expo-local-authentication`**, you can prompt users for Face ID, Touch ID, or Android Biometric Prompt with just a few lines of code:

```typescript
import * as LocalAuthentication from 'expo-local-authentication';
import * as SecureStore from 'expo-secure-store';

export async function authenticateAndUnlockVault(): Promise<boolean> {
  // 1. Verify device supports hardware biometrics
  const hasHardware = await LocalAuthentication.hasHardwareAsync();
  const isEnrolled = await LocalAuthentication.isEnrolledAsync();

  if (!hasHardware || !isEnrolled) {
    throw new Error('Biometric hardware not available or enrolled on this device');
  }

  // 2. Trigger native OS biometric prompt
  const result = await LocalAuthentication.authenticateAsync({
    promptMessage: 'Unlock Computer Coding Club Vault',
    fallbackLabel: 'Use Device Passcode',
    cancelLabel: 'Cancel',
  });

  if (result.success) {
    // 3. Read sensitive secret from hardware-encrypted storage
    const secretKey = await SecureStore.getItemAsync('vault_encryption_key');
    return secretKey !== null;
  }

  return false;
}
```

### 9.2 Camera & Image Capture

Use **`expo-camera`** and **`expo-image-picker`** to capture media and handle system permissions cleanly:

```typescript
import * as ImagePicker from 'expo-image-picker';

export async function pickProfilePhoto(): Promise<string | null> {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== 'granted') {
    alert('Permission to access photos is required to update your avatar.');
    return null;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ['images'], // MediaTypeOptions is deprecated since SDK 52
    allowsEditing: true,
    aspect: [1, 1], // Square avatar
    quality: 0.8,
  });

  if (!result.canceled && result.assets[0]) {
    return result.assets[0].uri;
  }
  return null;
}
```

---

## 10. Stage 8: Testing, Debugging & Performance Optimization

Delivering a professional application requires structured testing and rigorous profiling.

### 10.1 The React Native Testing Pyramid

{% <mermaid> %}
graph TD
    E2E["10% End-to-End Tests (Maestro / Detox)"]
    Component["30% Component & Hook Tests (React Native Testing Library)"]
    Unit["60% Pure TypeScript Unit Tests (Jest / Logic / Repositories)"]
{% </mermaid> %}

#### Component Testing with React Native Testing Library
```tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ProjectCard } from '../components/ProjectCard';

test('ProjectCard displays title and fires onPress callback', () => {
  const mockPress = jest.fn();
  const { getByText, getByRole } = render(
    <ProjectCard
      title="CC Website"
      stars={142}
      bannerUri="https://cc-club.in/banner.png"
      onPress={mockPress}
    />
  );

  expect(getByText('CC Website')).toBeTruthy();
  expect(getByText('⭐ 142 Stars')).toBeTruthy();

  fireEvent.press(getByRole('button'));
  expect(mockPress).toHaveBeenCalledTimes(1);
});
```

#### Automated End-to-End Testing with Maestro
Use **Maestro** for fast, declarative mobile UI automation scripts:

```yaml
appId: in.cc_club.pulse
---
- launchApp
- assertVisible: "Explore Projects"
- tapOn: "Explore Projects"
- tapOn: "React Native Roadmap"
- assertVisible: "⭐ 142 Stars"
```

### 10.2 Performance Optimization: Eliminating Frame Drops

1. **Optimize Re-Renders**: Use `React.memo` for list row components. Wrap callback handlers passed to children in `useCallback` to prevent breaking referential equality.
2. **Upgrade to `@shopify/flash-list`**: If your lists contain thousands of items with complex card layouts, replace React Native's default `FlatList` with Shopify's **FlashList**, which recycles native views across scrolling viewports for smooth 120Hz scrolling.
3. **Avoid Inline Arrow Functions in Heavy Loops**: Avoid defining inline anonymous style objects or closures directly inside list item render loops.
4. **Use `react-native-reanimated` for Gestures**: Keep animations running at 60/120 FPS on the native UI thread without round-tripping to JavaScript.

---

## 11. Stage 9: Security & Production Release Pipelines

Shipping a production mobile application involves security hardening and store distribution.

### 11.1 Mobile Security (OWASP MASVS)

* **Never Hardcode Secrets**: Storing API keys or OAuth client secrets in `.env` files bundled inside client code means anyone who unzips your APK can inspect them. Sensitive API requests should route through a backend proxy or be obfuscated using **`react-native-dotenv`** with runtime token exchanges.
* **Network Security Configuration**: Enforce TLS 1.3/HTTPS across all endpoints. On Android, verify that cleartext HTTP traffic is disabled in `app.json`:
  ```json
  {
    "expo": {
      "android": {
        "usesCleartextTraffic": false
      }
    }
  }
  ```

### 11.2 The EAS Build & Submit Pipeline

Expo Application Services (**EAS**) automates building production Android App Bundles (`.aab`) and iOS binaries (`.ipa`) in the cloud or locally:

```bash
# 1. Install EAS CLI globally
npm install -g eas-cli

# 2. Configure build profiles (eas.json)
eas build:configure

# 3. Build a production Android App Bundle
eas build --platform android --profile production

# 4. Automatically submit to Google Play Console
eas submit --platform android
```

#### Understanding `eas.json`
```json
{
  "cli": { "version": ">= 10.0.0" },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal"
    },
    "production": {
      "autoIncrement": true
    }
  }
}
```

---

## 12. Stage 10: Cross-Platform Horizons: Web & Desktop

React Native's "Learn Once, Write Anywhere" philosophy extends beyond mobile phones.

* **React Native for Web**: Included natively in Expo. Run `npx expo start --web` to compile your React Native components into HTML5 primitives (`<View>` compiles to `<div>`, `<Text>` compiles to `<span>`).
* **Desktop Targets (macOS & Windows)**: Maintained by Microsoft, **React Native for Windows + macOS** brings React Native to native Win32/UWP and Cocoa desktop applications with support for native menus, multi-windowing, and mouse-hover states. For an architectural deep dive into desktop engineering, see our **[Desktop Application Development Roadmap](@/roadmaps/desktop-development.md)**.

---

## 13. Six Progressive Milestone Projects

Transform theoretical knowledge into engineering proficiency through these six progressive milestone projects:

{% <mermaid> %}
graph TD
    M1["Milestone 1: QuickMetrics Converter<br/>Focus: TypeScript, Core Primitives, StyleSheet"] --> M2["Milestone 2: PulseHabit Tracker<br/>Focus: SQLite, Local Notifications, Zustand"]
    M2 --> M3["Milestone 3: Chronicle Markdown Notes<br/>Focus: Audio Recording, SQLite Search, Gestures"]
    M3 --> M4["Milestone 4: DevPulse GitHub Explorer<br/>Focus: TanStack Query, FlatList, Pull-to-Refresh"]
    M4 --> M5["Milestone 5: BiometricVault Locker<br/>Focus: Face ID/Fingerprint, SecureStore, Camera"]
    M5 --> M6["Milestone 6 (Capstone): OmniMarket Multiplatform Store<br/>Focus: Expo Router Tabs, Zustand, Stripe, Maestro E2E, EAS"]
{% </mermaid> %}

### Milestone 1: QuickMetrics Converter
* **Goal**: Build an interactive currency, metric, and unit conversion calculator.
* **Core Concepts**: Core components (`View`, `Text`, `TextInput`, `Pressable`), custom numeric keypad, dynamic dark/light `StyleSheet`, and `KeyboardAvoidingView`.
* **Portfolio Value**: Demonstrates foundational mobile layout discipline, keyboard awareness, and clean typing without web DOM assumptions.

### Milestone 2: PulseHabit (Daily Routine Tracker)
* **Goal**: An offline-first habit tracker featuring custom streaks, completion calendars, and daily reminders.
* **Core Concepts**: **`expo-sqlite`** for relational habit storage, **`expo-notifications`** for scheduled local push alerts, and **Zustand** for user preference persistence.
* **Portfolio Value**: Proves your ability to manage relational offline data, background notifications, and lightweight client state.

### Milestone 3: Chronicle Notes & Voice Memos
* **Goal**: A multimedia journaling app supporting rich Markdown formatting and embedded audio recordings.
* **Core Concepts**: **`expo-audio`** for microphone audio recording and playback, SQLite Full-Text Search (FTS), and swipe-to-delete gestures using **`react-native-gesture-handler`**.
* **Portfolio Value**: Showcases audio hardware management, gesture physics, and advanced mobile data indexing.

### Milestone 4: DevPulse (GitHub & Tech News Explorer)
* **Goal**: A multi-tab developer news client and trending repository explorer with offline caching.
* **Core Concepts**: **TanStack Query** for server-state caching, **Expo Router** nested stack navigation, pull-to-refresh mechanics, and infinite scrolling **`FlatList`** with search filtering.
* **Portfolio Value**: Industrial-grade REST API consumption, caching strategies, and resilient network error handling.

### Milestone 5: BiometricVault (Encrypted Media Locker)
* **Goal**: A privacy-focused locker application that secures confidential files behind device biometric authentication.
* **Core Concepts**: **`expo-local-authentication`** (Face ID / Fingerprint prompt), **`expo-secure-store`** for cryptographic key storage, **`expo-camera`** for private photo capture, and file encryption via `expo-file-system`.
* **Portfolio Value**: Demonstrates mobile application security, cryptographic key protection, and native hardware access.

### Milestone 6 (Capstone): OmniMarket (Multiplatform E-Commerce Suite)
* **Goal**: A production-grade multiplatform shopping application compiling to Android, iOS, and Web.
* **Core Concepts**:
  * **Expo Router** file-based navigation with persistent `(tabs)` and authentication redirect guards.
  * **Zustand** shopping cart state synchronized with local persistence.
  * Real-time payment processing integration.
  * Comprehensive testing suite combining Jest component tests and **Maestro** automated E2E user flows.
  * Automated **EAS Build** pipeline generating signed release binaries.
* **Portfolio Value**: A definitive capstone application proving end-to-end mastery over the complete modern React Native & Expo mobile engineering lifecycle.

---

## 14. Curated Official Resources

Deepen your React Native engineering skills using these vetted, high-yield documentation sources and community hubs:

{{<pretty_link url="https://reactnative.dev/docs/getting-started" title="Official React Native Documentation" description="The definitive reference for React Native core components, APIs, TypeScript integration, and the New Architecture." />}}

{{<pretty_link url="https://docs.expo.dev/" title="Expo Official Documentation" description="Comprehensive guides covering the Expo framework, Expo Router, Development Builds, hardware SDKs, and EAS." />}}

{{<pretty_link url="https://reactnavigation.org/docs/getting-started/" title="React Navigation Documentation" description="Official manual for mobile routing patterns, stack animators, and navigation state lifecycle management." />}}

{{<pretty_link url="https://tanstack.com/query/latest/docs/framework/react/overview" title="TanStack Query (React Query)" description="The industry-standard asynchronous state management library for managing, caching, and syncing server data." />}}

{{<pretty_link url="https://docs.swmansion.com/react-native-reanimated/" title="React Native Reanimated" description="High-performance animation library running fluid 60/120 FPS animations directly on the native thread." />}}

{{<pretty_link url="https://maestro.mobile.dev/" title="Maestro Mobile UI Testing" description="The modern, declarative YAML-based mobile UI testing platform for reliable end-to-end app automation." />}}

{{<pretty_link url="https://www.youtube.com/@reactnative" title="React Native YouTube Channel" description="Keynotes, deep architectural breakdowns, and release overviews directly from the React Native and Expo engineering teams." />}}

---

## 15. Where to Next in the CC Ecosystem

This roadmap is one part of a connected learning system. Depending on where you want to go from here:

* **[Mobile Development Master Roadmap](@/roadmaps/mobile-development.md)** — revisit the full application-development landscape and the interactive Path Finder that helped you choose React Native.
* **[Flutter & Dart Roadmap](@/roadmaps/flutter.md)** — the direct cross-platform alternative: compare its custom Impeller canvas rendering against React Native's native views.
* **[Web Development Roadmap](@/roadmaps/web-development.md)** — deepen the React and backend-API skills that transfer directly into your React Native work.
