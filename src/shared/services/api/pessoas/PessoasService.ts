import { Enviroment } from '../../../enviroments';
import { Api } from '../axios-config';

interface IListagemPessoa {
  id: number;
  email: string;
  cidadeId: number;
  nomeCompleto: string;
}

interface IDetalhePessoa {
  id: number;
  email: string;
  cidadeId: number;
  nomeCompleto: string;
}

type TPessoasComTotalCount = {
  data: IListagemPessoa[];
  totalCount: number;
}

const getAll = async (page = 1, filter = ''): Promise<TPessoasComTotalCount | Error> => {
  try {
    const urlRelativa = `/pessoas?_page=${page}&_limit=10${Enviroment.LIMITE_DE_LINHAS}&nomeCompleto_like=${filter}`;
    const { data, headers } = await Api.get(urlRelativa);

    if (data) {
      return {
        data,
        totalCount: Number(headers['x-total_count'] || Enviroment.LIMITE_DE_LINHAS),
      };
    }
    return new Error('Erro ao listar os registros.');
  } catch (error) {
    console.error(error); // pra depurar no console do navegador!
    return new Error((error as { message: string }).message || 'Erro ao listar os registros.');
  }
};

const getById = async (id: number): Promise<IDetalhePessoa | Error> => {
  try {
    const { data } = await Api.get(`/pessoas/${id}`);

    if (data) {
      return data;
    }
    return new Error('Erro ao obter o registro.');
  } catch (error) {
    console.error(error); // pra depurar no console do navegador!
    return new Error((error as { message: string }).message || 'Erro ao obter o registro.');
  }
};

const create = async (dados: Omit<IDetalhePessoa, 'id'>): Promise<number | Error> => {
  try {
    const { data } = await Api.post<IDetalhePessoa>('/pessoas', dados);

    if (data) {
      return data.id;
    }
    return new Error('Erro ao criar o registro.');
  } catch (error) {
    console.error(error); // pra depurar no console do navegador!
    return new Error((error as { message: string }).message || 'Erro ao criar o registro.');
  }
};

const updateById = async (id: number, dados: IDetalhePessoa): Promise<void | Error> => {
  try {
    await Api.put(`/pessoas/${id}`, dados);

  } catch (error) {
    console.error(error); // pra depurar no console do navegador!
    return new Error((error as { message: string }).message || 'Erro ao alterar o registro.');
  }
};

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await Api.delete(`/pessoas/${id}`);

  } catch (error) {
    console.error(error); // pra depurar no console do navegador!
    return new Error((error as { message: string }).message || 'Erro ao deletar o registro.');
  }
};

export const PessoaService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};