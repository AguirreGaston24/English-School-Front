import instance from ".";
import { IUser } from "../interfaces/user"

export type UserLogin = Pick<IUser, 'email' | 'password'>;
export type UserRegister = Pick<IUser, 'email' | 'username' | 'password'>;

export const Users = () => {
  return instance.get('/auth/users')
}

export const Login = (payload: UserLogin) => {
  return instance.post('/auth/login', payload)
}

export const Register = (payload: UserRegister) => {
  return instance.post('/auth/register', payload)
}

export const Verify = () => {
  return instance.get('/auth/verify')
}
