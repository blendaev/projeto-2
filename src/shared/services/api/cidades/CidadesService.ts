import { Enviroment } from '../../../enviroments';
import { Api } from '../axios-config';

export interface IListagemCidade {
  id: number;
  nomeCidade: string;
}

export interface IDetalheCidade {
  id: number;
  nomeCidade: string;
}

type TCidadesComTotalCount = {
  data: IListagemCidade[];
  totalCount: number;
}

type TCidadesSomenteTotalCount = {
  totalCount: number;
}

const getTotal = async (page = 1, filter = ''): Promise<TCidadesSomenteTotalCount | Error> => {
  try {
    const urlRelativa = `/cidades?_page=${page}&_limit=${Enviroment.LIMITE_DE_LINHAS}&nomeCidade_like=${filter}`;
    const { headers } = await Api.get(urlRelativa);

    return {
      totalCount: Number(headers['x-total-count'] || Enviroment.LIMITE_DE_LINHAS),
    };
  } catch (error) {
    console.error(error); // pra depurar no console do navegador!
    return new Error((error as { message: string }).message || 'Erro ao listar os registros.');
  }
};

const getAll = async (page = 1, filter = ''): Promise<TCidadesComTotalCount | Error> => {
  try {
    const urlRelativa = `/cidades?_page=${page}&_limit=${Enviroment.LIMITE_DE_LINHAS}&nomeCidade_like=${filter}`;
    const { data, headers } = await Api.get(urlRelativa);

    if (data) {
      return {
        data,
        totalCount: Number(headers['x-total-count'] || Enviroment.LIMITE_DE_LINHAS),
      };
    }
    return new Error('Erro ao listar os registros.');
  } catch (error) {
    console.error(error); // pra depurar no console do navegador!
    return new Error((error as { message: string }).message || 'Erro ao listar os registros.');
  }
};

const getById = async (id: number): Promise<IDetalheCidade | Error> => {
  try {
    const { data } = await Api.get(`/cidades/${id}`);

    if (data) {
      return data;
    }
    return new Error('Erro ao obter o registro.');
  } catch (error) {
    console.error(error); // pra depurar no console do navegador!
    return new Error((error as { message: string }).message || 'Erro ao obter o registro.');
  }
};

const create = async (dados: Omit<IDetalheCidade, 'id'>): Promise<number | Error> => {
  try {
    const { data } = await Api.post<IDetalheCidade>('/cidades', dados);

    if (data) {
      return data.id;
    }
    return new Error('Erro ao criar o registro.');
  } catch (error) {
    console.error(error); // pra depurar no console do navegador!
    return new Error((error as { message: string }).message || 'Erro ao criar o registro.');
  }
};

const updateById = async (id: number, dados: IDetalheCidade): Promise<void | Error> => {
  try {
    await Api.put(`/cidades/${id}`, dados);

  } catch (error) {
    console.error(error); // pra depurar no console do navegador!
    return new Error((error as { message: string }).message || 'Erro ao alterar o registro.');
  }
};

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await Api.delete(`/cidades/${id}`);

  } catch (error) {
    console.error(error); // pra depurar no console do navegador!
    return new Error((error as { message: string }).message || 'Erro ao deletar o registro.');
  }
};

export const CidadeService = {
  getTotal,
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};