const AUTH_TOKEN_KEY = "auth_token";
const USER_KEY = "user_data";
const USER_ROLE_KEY = "user_role";

// USER LOGIN WITH API CALL
export const login = async (
  email: string,
  password: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    const response = await fetch("http://localhost:3000/loginUser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (data.success && data.data?.tokens) {
      // Store token
      localStorage.setItem(AUTH_TOKEN_KEY, data.data.tokens);
      localStorage.setItem(USER_ROLE_KEY, "user");

      // Store minimal user info manually (since backend does not return it)
      localStorage.setItem(
        USER_KEY,
        JSON.stringify({
          email,
          name: email.split("@")[0], // default name
        })
      );

      return { success: true };
    }

    return { success: false, error: data.message || "Invalid credentials" };
  } catch {
    return { success: false, error: "Server error. Try again later." };
  }
};
export const adminLogin = async (
  email: string,
  password: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    const response = await fetch("http://localhost:3000/loginAdmin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (data.success && data.data?.tokens) {
      // Store token
      localStorage.setItem(AUTH_TOKEN_KEY, data.data.tokens);
      localStorage.setItem(USER_ROLE_KEY, "admin");  // ✅ FIXED

      // Store minimal user info manually
      localStorage.setItem(
        USER_KEY,
        JSON.stringify({
          email,
          name: email.split("@")[0],
        })
      );

      return { success: true };
    }

    return { success: false, error: data.message || "Invalid credentials" };
  } catch {
    return { success: false, error: "Server error. Try again later." };
  }
};


// SAME FUNCTIONS
export const logout = () => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(USER_ROLE_KEY);
};

export const isAdmin = (): boolean => {
  return localStorage.getItem(USER_ROLE_KEY) === "admin";
};

export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem(AUTH_TOKEN_KEY);
};

export const getAuthToken = (): string | null => {
  return localStorage.getItem(AUTH_TOKEN_KEY);
};

export const getCurrentUser = () => {
  const userData = localStorage.getItem(USER_KEY);
  return userData ? JSON.parse(userData) : null;
};
