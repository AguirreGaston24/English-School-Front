import { ReactNode, createContext, useContext, useEffect, useState } from 'react'

import { Login, Register, UserLogin, UserRegister, Verify } from '../api/auth';
import { IUser } from '../interfaces/user';
import { useNavigate } from 'react-router-dom';

export type User = Pick<IUser, 'email' | 'username'>;

interface AuthContextProps {
  user: User | undefined | null;
  loading: boolean;
  uiLoading: boolean;
  loginErrors: any;
  registerErrors: any;
  handleLogin: (user: UserLogin) => void;
  handleRegister: (user: UserRegister) => void;
  handleLogout: () => void;
  handleGetUserToken: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const Context = createContext<AuthContextProps | undefined>(undefined);

export const useAuthContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error('Auth context debe ser utilizado dentro de un provider.');
  }
  return context;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | undefined | null>(undefined)
  const [loginErrors, setLoginErrors] = useState<any>(undefined)
  const [registerErrors, setRegisterErrors] = useState<any>(undefined);
  const [uiLoading, setUiLoading] = useState(true)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate();

  const token = localStorage.getItem('token')

  const handleLogin = (user: UserLogin) => {
    setLoading(true)
    Login(user)
      .then(({ data }) => {
        console.log(data)
        setUser(data)
        localStorage.setItem('token', data.token)
      })
      .catch((error) => {
        console.log(error)
        if (error.response) {
          const { data } = error.response
          const message = data.message;
          const errorsArray = Array.isArray(message) ? message : [message];
          setLoginErrors(errorsArray);
          setUser(null)
          setTimeout(() => {
            setLoginErrors([])
          }, 3000);
        }
      })
      .finally(() => setLoading(false))
  }

  const handleRegister = (user: UserRegister) => {
    setUiLoading(true);
    Register(user)
      .then(({ data }) => {
        setUser(data);
        localStorage.setItem('token', data.token);
        navigate('/');
      })
      .catch((error) => {
        if (error.response) {
          const { data } = error.response;
          const message = data.message;
          const errorsArray = Array.isArray(message) ? message : [message];
          setRegisterErrors(errorsArray);
          setTimeout(() => {
            setRegisterErrors([]);
          }, 3000);
        }
      })
      .finally(() => setUiLoading(false));
  };


  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('token')
    window.location.reload()
  }

  const handleGetUserToken = () => {
    setUiLoading(false)
    if (!token) return
    setUiLoading(true)
    Verify()
      .then(({ data }) => {
        localStorage.setItem('token', data.token)
        setUiLoading(false)
        setUser(data)
      })
      .catch((err) => {
        console.log(err)
        setUser(null)
        setUiLoading(false)
      })
      .finally(() => setUiLoading(false))
  }

  useEffect(() => {
    handleGetUserToken()
  }, [])

  const authContextValue: AuthContextProps = {
    user,
    loading,
    uiLoading,
    loginErrors,
    registerErrors,
    handleLogin,
    handleRegister,
    handleLogout,
    handleGetUserToken,
  };

  return (
    <Context.Provider value={authContextValue}>
      {children}
    </Context.Provider>
  )
}
