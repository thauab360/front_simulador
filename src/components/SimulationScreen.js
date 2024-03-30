import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SimulationScreen.css";
// import { TextField } from "@material-ui/core";
import { Autocomplete, TextField } from "@mui/material";

const SimulationScreen = () => {
  const [planos, setPlanos] = useState([]);
  const [seguroOpcoes, setSeguroOpcoes] = useState([]);
  const [idadeOpcoes, setIdadeOpcoes] = useState([]);
  const [cidades, setCidades] = useState([]);
  const [cidadeSelecionada, setCidadeSelecionada] = useState("");
  const [planoSelecionado, setPlanoSelecionado] = useState("");
  const [seguroSelecionado, setSeguroSelecionado] = useState("");
  const [idadeSelecionada, setIdadeSelecionada] = useState("");
  const [nome, setNome] = useState("");
  const [temPlano, setTemPlano] = useState(false);
  const [idade, setIdade] = useState("");
  const [planoDesejado, setPlanoDesejado] = useState("");
  const [desejaSeguro, setDesejaSeguro] = useState(false);
  const [desejaDependente, setDesejaDependente] = useState(false);
  const [dependentes, setDependentes] = useState([
    { nome: "", idade: "", parentesco: "" },
  ]);

  useEffect(() => {
    console.log(cidadeSelecionada);
  }, [cidadeSelecionada]);

  useEffect(() => {
    const fetchPlanos = async () => {
      try {
        const response = await fetch("URL_DO_BACKEND/planos");
        if (!response.ok) {
          throw new Error("Erro ao buscar os planos");
        }

        const data = await response.json();
        setPlanos(data);
      } catch (error) {
        console.error("Erro ao buscar os planos:", error);
      }
    };

    const fetchSeguroOpcoes = async () => {
      try {
        // Realiza uma solicitação ao backend para obter as opções de seguro
        const response = await fetch("URL_DO_BACKEND/opcoes-de-seguro");
        if (!response.ok) {
          throw new Error("Erro ao buscar as opções de seguro");
        }

        const data = await response.json();
        setSeguroOpcoes(data);
      } catch (error) {
        console.error("Erro ao buscar as opções de seguro:", error);
      }
    };

    const fetchIdadeOpcoes = async () => {
      try {
        const response = await fetch("URL_DO_BACKEND/faixas-etarias");
        if (!response.ok) {
          throw new Error("Erro ao buscar as faixas etárias");
        }

        const data = await response.json();
        setIdadeOpcoes(data);
      } catch (error) {
        console.error("Erro ao buscar as faixas etárias:", error);
      }
    };

    const fetchCidades = async () => {
      try {
        const response = await axios.get(
          "https://servicodados.ibge.gov.br/api/v1/localidades/estados/33/municipios"
        );
        if (response.status != 200) {
          throw new Error("Erro ao buscar as cidades");
        }

        const data = await response.data;

        const cidadesDoRioDeJaneiro = data.map((cidade) => cidade.nome);
        setCidades(cidadesDoRioDeJaneiro);
      } catch (error) {
        console.error("Erro ao buscar as cidades:", error);
      }
    };

    fetchPlanos();
    fetchSeguroOpcoes();
    fetchIdadeOpcoes();
    fetchCidades();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://seu-backend.com/salvar-dados",
        {
          nome,
          cidade: cidadeSelecionada,
          temPlano,
          plano: planoSelecionado,
          idade,
          planoDesejado,
          desejaSeguro,
          seguro: seguroSelecionado,
          dependentes,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      console.log("Dados salvos com sucesso:", response.data);
    } catch (error) {
      console.error("Erro ao salvar dados:", error);
    }
  };

  const handleAddDependente = () => {
    setDependentes([...dependentes, { nome: "", idade: "", parentesco: "" }]);
  };

  const handleRemoveDependente = (index) => {
    const novosDependentes = [...dependentes];
    novosDependentes.splice(index, 1);
    setDependentes(novosDependentes);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");

    window.location.href = "/";
  };

  return (
    <div className="main-container">
      <h2>Simulação</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <TextField
            label="Nome"
            id="typeText"
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="textfield"
            variant="standard"
          />
        </div>
        <div className="form-group">
          <Autocomplete
            id="cidade"
            options={cidades}
            getOptionLabel={(option) => option}
            value={cidadeSelecionada}
            onChange={(event, newValue) => setCidadeSelecionada(newValue)}
            renderInput={(params) => (
              <TextField {...params} label="Cidade" variant="standard" />
            )}
          />
        </div>
        <div className="form-group toggle-label">
          Tem outro plano?
          <div className="toggle-button" onClick={() => setTemPlano(!temPlano)}>
            <div className={`slider ${temPlano ? "checked" : ""}`}></div>
          </div>
        </div>

        {temPlano && (
          <div className="form-group">
            <TextField
              label="Qual plano?"
              id="typeText"
              type="text"
              // value={}
              onChange={(e) => setPlanoSelecionado(e.target.value)}
              className="textfield"
              variant="standard"
            />
          </div>
        )}
        <div className="form-group">
          <Autocomplete
            id="idade"
            options={idade} 
            getOptionLabel={(option) => option}
            value={idadeSelecionada}
            onChange={(event, newValue) => setIdadeSelecionada(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Idade"
                variant="standard"
                autoComplete="off" // Desativa o autocomplete apenas para este componente
              />
            )}
          />
        </div>
        <div className="form-group">
          <label htmlFor="plano">Plano desejado:</label>
          <select
            id="plano"
            value={planoSelecionado}
            onChange={(e) => setPlanoSelecionado(e.target.value)}
          >
            <option value="">Selecione...</option>
            {planos.map((plano) => (
              <option key={plano.id} value={plano.nome}>
                {plano.nome}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="seguro">Deseja seguro?</label>
          <select
            id="seguro"
            value={seguroSelecionado}
            onChange={(e) => setSeguroSelecionado(e.target.value)}
          >
            <option value="">Selecione...</option>
            {seguroOpcoes.map((opcao) => (
              <option key={opcao.id} value={opcao.valor}>
                {opcao.label}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group toggle-label">
          Deseja adicionar dependente?
          <div
            className="toggle-button"
            onClick={() => setDesejaDependente(!desejaDependente)}
          >
            <div
              className={`slider ${desejaDependente ? "checked" : ""}`}
            ></div>
          </div>
        </div>

        {desejaDependente && (
          <div>
            {dependentes.map((dependente, index) => (
              <div key={index} className="form-group dependent-card">
                <h3>Dependente {index + 1}</h3>
                <label>
                  Nome:
                  <input
                    type="text"
                    value={dependente.nome}
                    onChange={(e) => {
                      const novosDependentes = [...dependentes];
                      novosDependentes[index].nome = e.target.value;
                      setDependentes(novosDependentes);
                    }}
                  />
                </label>
                <label>
                  Idade:
                  <input
                    type="text"
                    value={dependente.idade}
                    onChange={(e) => {
                      const novosDependentes = [...dependentes];
                      novosDependentes[index].idade = e.target.value;
                      setDependentes(novosDependentes);
                    }}
                  />
                </label>
                <label>
                  Grau de Parentesco:
                  <input
                    type="text"
                    value={dependente.parentesco}
                    onChange={(e) => {
                      const novosDependentes = [...dependentes];
                      novosDependentes[index].parentesco = e.target.value;
                      setDependentes(novosDependentes);
                    }}
                  />
                </label>
                <button
                  type="button"
                  onClick={() => handleRemoveDependente(index)}
                >
                  Remover
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddDependente}
              className="form-group"
            >
              Adicionar Dependente
            </button>
          </div>
        )}
        <div className="button-group">
          <button onClick={handleSubmit}>Enviar</button>

          <button onClick={handleLogout}>Logout</button>
        </div>
      </form>
    </div>
  );
};

export default SimulationScreen;