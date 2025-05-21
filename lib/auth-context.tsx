"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

interface User {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  orders?: any[];
  wishlist?: any[];
  appointments?: any[];
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Load user from localStorage on initial render
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error);
      }
    }
  }, []);

  // Mock login function
  const login = async (email: string, password: string) => {
    // In a real app, this would make an API call to authenticate
    const mockUser: User = {
      id: "user1",
      name: "John Doe",
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
      orders: [
        {
          id: "ORD12345",
          date: "May 10, 2023",
          total: 14000,
          status: "Delivered",
          items: [
            {
              id: "1",
              name: "Submariner Date",
              brand: "Rolex",
              price: 14000,
              image: "https://picsum.photos/1280/720?height=64&width=64",
              quantity: 1,
            },
          ],
        },
        {
          id: "ORD12346",
          date: "April 22, 2023",
          total: 5200,
          status: "Shipped",
          items: [
            {
              id: "4",
              name: "Seamaster Diver 300M",
              brand: "Omega",
              price: 5200,
              image: "https://picsum.photos/1280/720?height=64&width=64",
              quantity: 1,
            },
          ],
        },
      ],
      wishlist: [
        {
          id: "2",
          name: "Royal Oak",
          brand: "Audemars Piguet",
          price: 32000,
          image: "https://picsum.photos/1280/720?height=300&width=300",
        },
        {
          id: "3",
          name: "Nautilus",
          brand: "Patek Philippe",
          price: 35000,
          image: "https://picsum.photos/1280/720?height=300&width=300",
        },
        {
          id: "7",
          name: "Reverso Classic",
          brand: "Jaeger-LeCoultre",
          price: 7000,
          image: "https://picsum.photos/1280/720?height=300&width=300",
        },
      ],
      appointments: [
        {
          id: "APT1001",
          date: "June 15, 2023",
          time: "2:00 PM",
          location: "New York Flagship",
          status: "Confirmed",
        },
        {
          id: "APT1002",
          date: "July 3, 2023",
          time: "11:30 AM",
          location: "New York Flagship",
          status: "Pending",
        },
      ],
    };

    setUser(mockUser);
    localStorage.setItem("user", JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const register = async (userData: Partial<User>) => {
    // In a real app, this would make an API call to register
    const newUser: User = {
      id: "user" + Math.floor(Math.random() * 1000),
      name: `${userData.firstName} ${userData.lastName}`,
      firstName: userData.firstName || "",
      lastName: userData.lastName || "",
      email: userData.email || "",
      phone: userData.phone || "",
      orders: [],
      wishlist: [],
      appointments: [],
    };

    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
