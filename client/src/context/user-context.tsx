import { StreamVideoClient } from "@stream-io/video-react-sdk";
import { ReactNode, createContext, useContext, useState } from "react";

interface User {
  username: string;
  name: string;
}

interface UserContextProps {
  user: User | null;
  setUser: (user: User | null) => void;
  client: StreamVideoClient | undefined;
  setClient: (client: StreamVideoClient | undefined) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [client, setClient] = useState<StreamVideoClient>();
  return (
    <UserContext.Provider value={{ user, setUser, client, setClient }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error("useUser must be within a provider");
  }
  return ctx;
}
