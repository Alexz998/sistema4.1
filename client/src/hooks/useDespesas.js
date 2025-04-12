import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = 'http://localhost:5002/api';

export const useDespesas = () => {
  const queryClient = useQueryClient();

  const fetchDespesas = async () => {
    const response = await axios.get(`${API_URL}/despesas`);
    return response.data;
  };

  const addDespesa = async (despesa) => {
    const response = await axios.post(`${API_URL}/despesas`, despesa);
    return response.data;
  };

  const updateDespesa = async ({ id, ...despesa }) => {
    const response = await axios.put(`${API_URL}/despesas/${id}`, despesa);
    return response.data;
  };

  const deleteDespesa = async (id) => {
    await axios.delete(`${API_URL}/despesas/${id}`);
    return id;
  };

  const { data: despesas, isLoading, error } = useQuery('despesas', fetchDespesas);

  const addMutation = useMutation(addDespesa, {
    onSuccess: () => {
      queryClient.invalidateQueries('despesas');
      toast.success('Despesa adicionada com sucesso!');
    },
    onError: (error) => {
      console.error('Erro ao adicionar despesa:', error);
      toast.error(error.response?.data?.message || 'Erro ao adicionar despesa');
    }
  });

  const updateMutation = useMutation(updateDespesa, {
    onSuccess: (data) => {
      queryClient.setQueryData('despesas', (oldData) => {
        if (!oldData) return [data];
        return oldData.map(despesa => 
          despesa._id === data._id ? data : despesa
        );
      });
      toast.success('Despesa atualizada com sucesso!');
    },
    onError: (error) => {
      console.error('Erro ao atualizar despesa:', error);
      toast.error(error.response?.data?.message || 'Erro ao atualizar despesa');
    }
  });

  const deleteMutation = useMutation(deleteDespesa, {
    onSuccess: () => {
      queryClient.invalidateQueries('despesas');
      toast.success('Despesa excluída com sucesso!');
    },
    onError: (error) => {
      console.error('Erro ao excluir despesa:', error);
      const mensagemErro = error.response?.data?.message || error.message || 'Erro ao excluir despesa';
      toast.error(mensagemErro);
    }
  });

  return {
    despesas,
    isLoading,
    error,
    addDespesa: addMutation.mutate,
    updateDespesa: updateMutation.mutate,
    deleteDespesa: deleteMutation.mutate,
    isAdding: addMutation.isLoading,
    isUpdating: updateMutation.isLoading,
    isDeleting: deleteMutation.isLoading
  };
}; 