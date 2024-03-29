import React, { useState, useEffect } from 'react';
import { getSavedForms } from '../services/formService'; // Função para buscar os formulários salvos
import './Dashboard.css';

const Dashboard = () => {
  const [savedForms, setSavedForms] = useState([]);
  const [filteredForms, setFilteredForms] = useState([]);
  const [filterStartDate, setFilterStartDate] = useState('');
  const [filterEndDate, setFilterEndDate] = useState('');

  useEffect(() => {
    // Carregar os formulários salvos quando o componente for montado
    fetchSavedForms();
  }, []);

  useEffect(() => {
    // Aplica o filtro por data quando a data de filtro for alterada
    filterFormsByDate();
  }, [filterStartDate, filterEndDate, savedForms]);

  const fetchSavedForms = async () => {
    try {
      const forms = await getSavedForms(); // Função para buscar os formulários salvos do backend
      setSavedForms(forms);
    } catch (error) {
      console.error('Erro ao buscar formulários salvos:', error);
    }
  };

  const filterFormsByDate = () => {
    const filtered = savedForms.filter(form => {
      const formDate = new Date(form.date);
      const startDate = new Date(filterStartDate);
      const endDate = new Date(filterEndDate);
      return (!filterStartDate || formDate >= startDate) && (!filterEndDate || formDate <= endDate);
    });
    setFilteredForms(filtered);
  };

  const handleFilterStartDateChange = (event) => {
    setFilterStartDate(event.target.value);
  };

  const handleFilterEndDateChange = (event) => {
    setFilterEndDate(event.target.value);
  };

  const handleSavePDF = (form) => {
    // Lógica para salvar o formulário em PDF
  };

  return (
    <div className="dashboard-container">
      <h1>Histórico de simulações</h1>
      <div className="form-group">
        <label>Data Inicial:</label>
        <input type="date" value={filterStartDate} onChange={handleFilterStartDateChange} />
      </div>
      <div className="form-group">
        <label>Data Final:</label>
        <input type="date" value={filterEndDate} onChange={handleFilterEndDateChange} />
      </div>
      <h2>Resumo:</h2>
      <ul>
        {filteredForms.map(form => (
          <li key={form.id}>
            <div>{form.clientName}</div>
            <div>{form.date}</div>
            {/* Resumo do formulário */}
            <div>
              <p><strong>Nome:</strong> {form.clientName}</p>
              <p><strong>Quantidade de Dependentes:</strong> {form.dependents.length}</p>
              <p><strong>Subtotal:</strong> R$ {calculateSubtotal(form)}</p>
            </div>
            {/* Botão para salvar em PDF */}
            <button onClick={() => handleSavePDF(form)}>Salvar em PDF</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Função para calcular o subtotal
const calculateSubtotal = (form) => {
  // Lógica para calcular o subtotal
  return 0; // Retorna 0 por enquanto, substitua pela lógica real
};

export default Dashboard;
