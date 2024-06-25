import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import LoginForm from './components/Login/LoginForm';
import ProtectedRoute from './components/Routes/ProtectedRoutes';
import Dashboard from './components/Dashboard/Dashboard';
import Welcome from './components/Welcome/Welcome';
import NotFound from './components/NotFound/NotFound';
import Products from './components/Products/ProductsPage/ProductsPage';
import ProductDetails from './components/Products/ProductDetails/ProductDetailts';

const App: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = (status: boolean): void => {
    setLoggedIn(status);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            loggedIn ? (
              <Navigate to="/dashboard/welcome" />
            ) : (
              <LoginForm onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute loggedIn={loggedIn}>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route path="welcome" element={<Welcome />} />
          <Route path="products" element={<Products />} />
        </Route>
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
