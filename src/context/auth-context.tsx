import React, { ReactNode, useState } from "react";
import * as auth from "auth-provider";
import { IUser } from "screens/project-list/search-panel";

interface IAuthForm {
  username: string;
  password: string;
}

const AuthContext = React.createContext<
  | {
      user: IUser | null;
      register: (form: IAuthForm) => Promise<void>;
      login: (form: IAuthForm) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);

AuthContext.displayName = "AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);

  // point free
  const login = (form: IAuthForm) =>
    auth.login(form).then((user) => setUser(user));
  const register = (form: IAuthForm) => auth.register(form).then(setUser);
  const logout = () => auth.logout().then(() => setUser(null));

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout }}
      children={children}
    />
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth必须在AuthProvider中使用");
  }
  return context;
};
