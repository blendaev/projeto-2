import { Api } from '../axios-config';

interface IAuth {
  accessToken: string;
}

const auth = async (email: string, password: string): Promise<IAuth | Error> => {
  try {
    const { data } = await Api.get('/auth');

    if (data) {
      if (email === 'teste@gmail.com' && password === '123456') {
        return data;
      } else {
        return new Error('Erro de login!');
      }
    } else {
      return new Error('Erro de token!');
    }
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao autenticar!!');
  }
};

export const AuthService = {
  auth
};