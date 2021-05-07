import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { APIpaths } from "../API";
import useLocalStorage from "../hooks/useLocalStorage";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const [authTokenUser, setAuthTokenUser] = useLocalStorage(
    "auth-token-user",
    null
  );
  const [authTokenAdmin, setAuthTokenAdmin] = useLocalStorage(
    "auth-token-admin",
    null
  );

  async function register(
    name,
    email,
    password,
    street,
    city,
    province,
    postalCode
  ) {
    const res = await axios.post(APIpaths.registerUser, {
      name,
      email,
      password,
      street,
      city,
      province,
      postalCode,
    });

    setCurrentUser(res.data.user);
    setAuthTokenUser(res.data.token);
  }

  async function loginUser(email, password) {
    const res = await axios.post(APIpaths.loginUser, {
      email,
      password,
    });
    setCurrentUser(res.data.user);
    setAuthTokenUser(res.data.token);
  }

  async function loginAdmin(email, password) {
    const res = await axios.post(APIpaths.loginAdmin, {
      email,
      password,
    });
    setCurrentUser(res.data.user);
    setIsAdmin(true);
    setAuthTokenAdmin(res.data.token);
  }

  function logout() {
    setIsAdmin(false);
    setCurrentUser(undefined);
    setAuthTokenUser(null);
    setAuthTokenAdmin(null);
  }

  async function getUserFromToken(tokenValue) {
    try {
      const res = await axios.get(APIpaths.getUser, {
        headers: { "x-auth-token": tokenValue },
      });
      setCurrentUser(res.data);
      return true;
    } catch (error) {
      return false;
    }
  }

  async function getAdminFromToken(tokenValue) {
    try {
      const res = await axios.get(APIpaths.getAdmin, {
        headers: { "x-auth-token": tokenValue },
      });
      setCurrentUser(res.data);
      setIsAdmin(true);
      return true;
    } catch (error) {
      return false;
    }
  }

  async function updateEmail(email) {
    const data = { email };
    const config = { headers: { "x-auth-token": authTokenUser } };

    const res = await axios.put(APIpaths.updateEmail, data, config);

    setCurrentUser(res.data);
  }

  async function updatePassword(password) {
    const data = { password };
    const config = { headers: { "x-auth-token": authTokenUser } };

    await axios.put(APIpaths.updatePass, data, config);
  }

  async function updateAddress(address) {
    const data = address;
    const config = { headers: { "x-auth-token": authTokenUser } };

    const res = await axios.put(APIpaths.updateAddress, data, config);

    setCurrentUser(res.data);
  }

  async function createProduct(productData) {
    const config = { headers: { "x-auth-token": authTokenAdmin } };

    try {
      await axios.post(APIpaths.createItem, productData, config);
    } catch (error) {
      console.log(error);
    }
  }

  async function updateProduct(productId, productData) {
    const config = { headers: { "x-auth-token": authTokenAdmin } };

    try {
      await axios.put(APIpaths.updateItem + productId, productData, config);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteProduct(productId) {
    const config = { headers: { "x-auth-token": authTokenAdmin } };

    try {
      await axios.delete(APIpaths.deleteItem + productId, config);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (!currentUser && authTokenUser !== null) {
      getUserFromToken(authTokenUser);
    }
    if (!currentUser && authTokenAdmin !== null) {
      getAdminFromToken(authTokenAdmin);
    }
    setCurrentUser(currentUser);
    setLoading(false);
  }, [authTokenUser, authTokenAdmin, currentUser]);

  const value = {
    currentUser,
    isAdmin,
    loginUser,
    loginAdmin,
    register,
    logout,
    updateEmail,
    updatePassword,
    updateAddress,
    createProduct,
    updateProduct,
    deleteProduct,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
