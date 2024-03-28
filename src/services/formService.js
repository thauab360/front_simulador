// Função fictícia para buscar formulários salvos
export const getSavedForms = async () => {
    try {
      // Lógica para buscar formulários salvos do backend
      // Por exemplo, você pode fazer uma requisição HTTP para uma API
      const response = await fetch('/api/savedForms'); // Substitua '/api/savedForms' pelo endpoint correto
      const data = await response.json();
      return data.forms; // Supondo que o backend retorne um array de formulários
    } catch (error) {
      console.error('Erro ao buscar formulários salvos:', error);
      throw error;
    }
  };
  