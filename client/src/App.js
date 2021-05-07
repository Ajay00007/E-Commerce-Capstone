import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import Footer from "./components/Footer";
import TopNav from "./components/TopNav";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import UpdateAccount from "./pages/UpdateAccount";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import AddProduct from "./pages/AddProduct";
import LoginAdmin from "./pages/LoginAdmin";
import EditProduct from "./pages/EditProduct";
import Checkout from "./pages/Checkout";
import Search from "./pages/Search";
import AdminDashboard from "./pages/AdminDashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css";

function App() {
  return (
    <Container fluid className="px-0">
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <TopNav />

            <Switch>
              <PrivateRoute path="/update-account" component={UpdateAccount} />
              <PrivateRoute path="/checkout" exact component={Checkout} />
              <PrivateRoute path="/add-product" component={AddProduct} />
              <PrivateRoute path="/edit-product/:id" component={EditProduct} />

              <AdminRoute
                path="/admin-dashboard"
                component={AdminDashboard}
              ></AdminRoute>

              <Route path="/product/:id" component={ProductDetail} />
              <Route path="/products" component={Products} />
              <Route path="/search" component={Search} />
              <Route path="/cart" component={Cart} />
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
              <Route path="/admin" component={LoginAdmin} />
              <Route path="/" component={Home} exact />
              <Route path="/*" component={NotFound} />
            </Switch>
          </CartProvider>
        </AuthProvider>

        <Footer />
      </BrowserRouter>
    </Container>
  );
}

export default App;
