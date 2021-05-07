// export const baseUrl = "https://sleepy-atoll-67256.herokuapp.com";
export const baseUrl = "http://localhost:5000"; // Local development

export const APIpaths = {
  // Prodcts
  // GET all (+?page=1&limit=10)
  getAllItems: `${baseUrl}/api/products`,
  // GET one (+ :id)
  getOneItem: `${baseUrl}/api/products/`,
  // GET search (+ ?q=)
  searchQuery: `${baseUrl}/api/products/search`,
  // POST
  createItem: `${baseUrl}/api/products`,
  // PUT (+ :id)
  updateItem: `${baseUrl}/api/products/`,
  // DELETE (+ :id)
  deleteItem: `${baseUrl}/api/products/`,

  // Authentication
  // POST
  loginUser: `${baseUrl}/api/auth/user`,
  // GET
  getUser: `${baseUrl}/api/auth/user`,

  // Admin Authentication
  // POST
  loginAdmin: `${baseUrl}/api/auth/admin`,
  // GET
  getAdmin: `${baseUrl}/api/auth/admin`,

  // Register
  // POST
  registerUser: `${baseUrl}/api/users`,

  // Update user info
  // PUT
  updateEmail: `${baseUrl}/api/users/update/email`,
  updatePass: `${baseUrl}/api/users/update/password`,
  updateAddress: `${baseUrl}/api/users/update/address`,
};
