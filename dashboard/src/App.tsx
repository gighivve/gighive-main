import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Analytics from './components/Analytics';
import Categories from './components/Categories';
import Notifications from './components/Notifications';
import Marketplace from './components/Marketplace';
import Revenue from './components/Revenue';
import Users from './components/Users';
import UserDetails from './components/UserDetails';
import Disputes from './components/Disputes';
import Settings from './components/Settings';
import SplashScreen from './components/SplashScreen';
import { ThemeProvider } from './lib/ThemeContext';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider>
      <AnimatePresence>
        {isLoading && <SplashScreen key="splash" />}
      </AnimatePresence>
      
      {!isLoading && (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="categories" element={<Categories />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="marketplace" element={<Marketplace />} />
              <Route path="disputes" element={<Disputes />} />
              <Route path="users" element={<Users />} />
              <Route path="users/:userId" element={<UserDetails />} />
              <Route path="revenue" element={<Revenue />} />
              <Route path="settings" element={<Settings />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      )}
    </ThemeProvider>
  );
}
