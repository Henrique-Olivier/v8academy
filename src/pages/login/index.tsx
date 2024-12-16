import Image from 'next/image';
import React from 'react';
import logo from '../../assets/v8_logo.svg';
import emailIcon from '../../assets/email_icon.svg';
import passwordIcon from '../../assets/password_icon.svg';
import { LoginContainer, MainContainer } from './styles';
import Link from 'next/link';
import useLogin from './hook';

const Login: React.FC = () => {

  const { inputEmail, inputPassword, handleLogin } = useLogin();

  return (
    <>
      <div>
        <Image src={logo} alt='Logo da v8' width={200} height={110}/>
      </div>
      <MainContainer>
        <LoginContainer>
          <h1>Seja bem-vindo!</h1>
          <h2>Preencha suas credenciais</h2>

          <label htmlFor="email">
            Email:
            <div className="input-group flex-nowrap">
              <span className="input-group-text" id="addon-wrapping"><Image src={emailIcon} width={24} height={20} alt='icone email'/></span>
              <input value={inputEmail.value} onChange={e => inputEmail.handle(e.currentTarget.value)} id='email' type="text" className="form-control" placeholder="E-mail" aria-label="E-mail" aria-describedby="addon-wrapping" />
            </div>
          </label>

          <label htmlFor="password">
            Senha:
            <div className="input-group flex-nowrap">
              <span className="input-group-text" id="addon-wrapping"><Image src={passwordIcon} width={24} height={20} alt='icone senha' /></span>
              <input value={inputPassword.value} onChange={e => inputPassword.handle(e.currentTarget.value)} id="password" type="text" className="form-control" placeholder="Senha" aria-label="Senha" aria-describedby="addon-wrapping" />
            </div>
          </label>

          <div className="forgotPassword">
            <Link href="#">Esqueci minha senha</Link>
          </div>

          <div className="btn-login">
            <button type="button" className="btn btn-danger" onClick={() => handleLogin}>Entrar</button>
          </div>
        </LoginContainer>
      </MainContainer>
    </>
  );
};

export default Login;