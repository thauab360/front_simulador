import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import './SummaryScreen.css';

const SummaryScreen = ({ formData }) => {
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    calculateSubtotal();
  }, [formData]);

  const calculateSubtotal = () => {
    let total = 0;

    // Verifica se formData existe e possui os valores esperados
    if (formData && formData.temPlano && formData.plano) {
      total += getPlanoValue(formData.plano);
    }

    if (formData && formData.desejaSeguro && formData.seguro) {
      total += getSeguroValue(formData.seguro);
    }

    setSubtotal(total);
  };

  const getPlanoValue = (plano) => {
    const planoValues = {
      'Plano A': 100,
      'Plano B': 150,
      // Adicione mais planos conforme necessário
    };

    return planoValues[plano] || 0;
  };

  const getSeguroValue = (seguro) => {
    const seguroValues = {
      'Seguro A': 50,
      'Seguro B': 75,
      // Adicione mais seguros conforme necessário
    };

    return seguroValues[seguro] || 0;
  };

  const handleSavePDF = () => {
    const doc = new jsPDF();
    let yOffset = 10;

    doc.text('Resumo do Formulário', 10, yOffset);
    yOffset += 10;

    if (formData) { // Verifica se formData existe antes de tentar acessá-lo
      for (const [key, value] of Object.entries(formData)) {
        doc.text(`${key}: ${value}`, 10, yOffset);
        yOffset += 10;
      }
    }

    doc.text(`Subtotal: R$${subtotal.toFixed(2)}`, 10, yOffset);

    doc.save('resumo_formulario.pdf');
  };

  const handleCreateNewSimulation = () => {
    
  };

  return (
    <div className="summary-container">
      <h2>Resumo da Simulação</h2>
      <div className="summary-details">
        {formData && ( // Verifica se formData existe antes de tentar acessá-lo
          <>
            <p><strong>Nome:</strong> {formData.nome}</p>
            <p><strong>Cidade:</strong> {formData.cidade}</p>
            <p><strong>Tem plano?</strong> {formData.temPlano ? 'Sim' : 'Não'}</p>
            {formData.temPlano && <p><strong>Plano:</strong> {formData.plano}</p>}
            <p><strong>Idade:</strong> {formData.idade}</p>
            <p><strong>Plano Desejado:</strong> {formData.planoDesejado}</p>
            <p><strong>Deseja Seguro?</strong> {formData.desejaSeguro ? 'Sim' : 'Não'}</p>
            {formData.desejaSeguro && <p><strong>Seguro:</strong> {formData.seguro}</p>}
            <p><strong>Deseja Dependente?</strong> {formData.desejaDependente ? 'Sim' : 'Não'}</p>
            {formData.desejaDependente && (
              <div>
                <p><strong>Dependentes:</strong></p>
                {formData.dependentes.map((dependente, index) => (
                  <div key={index}>
                    <p><strong>Nome:</strong> {dependente.nome}</p>
                    <p><strong>Idade:</strong> {dependente.idade}</p>
                    <p><strong>Grau de Parentesco:</strong> {dependente.parentesco}</p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
      <div className="subtotal">
        <p><strong>Subtotal:</strong> R${subtotal.toFixed(2)}</p>
      </div>
      <div className="buttons-container">
        <button onClick={handleSavePDF}>Salvar</button>
        <Link to="/simulation">
          <button onClick={handleCreateNewSimulation}>Criar Nova Simulação</button>
        </Link>
      </div>
    </div>
  );
};

export default SummaryScreen;
