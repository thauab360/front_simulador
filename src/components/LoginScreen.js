import React, { useState } from 'react';
import axios from 'axios';
import './LoginScreen.css'
import LogoSCC from './Assets/logoSCC.png'
import { Link } from '@material-ui/core';

const LoginScreen = () => {
  const [username] = useState('');
  const [password] = useState('');
  const [loading] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://seu-backend.com/login', { username, password });
      const { accessToken } = response.data;
      // Armazene o token JWT em localStorage ou sessionStorage
      localStorage.setItem('accessToken', accessToken);
      // Redirecione o usuário para a próxima página, por exemplo, a página de simulação
      window.location.href = '/simulation';
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      // Lidar com erros de autenticação, por exemplo, exibindo uma mensagem de erro para o usuário
    }
  };

  return (
    <div className="container">
      <div className="screen">
        <div className="screen__content">
        <img src={LogoSCC} alt="Logo da Empresa" className="logo" />
          <form className="login">
            <div className="login__field">
              <i className="login__icon fas fa-user"></i>
              <input type="text" className="login__input" placeholder="Usuário" />
            </div>
            <div className="login__field">
              <i className="login__icon fas fa-lock"></i>
              <input type="password" className="login__input" placeholder="Senha" />
            </div>
            <Link to="/Dashboard">
              <button className="button login__submit" onClick={handleLogin} disabled={loading}>
                <span className="button__text">{loading ? 'Carregando...' : 'ENTRAR'}</span>
                <i className="button__icon fas fa-chevron-right"></i>
              </button>
            </Link>
          </form>
        </div>
        <div className="screen__background">
          <span className="screen__background__shape screen__background__shape4"></span>
          <span className="screen__background__shape screen__background__shape3"></span>
          <span className="screen__background__shape screen__background__shape2"></span>
          <span className="screen__background__shape screen__background__shape1"></span>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
