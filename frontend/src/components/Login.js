import React from 'react';
import { Link } from 'react-router-dom';

function Login(props) {

    const {
        onSignIn
    } = props

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    function handleEmail(e) {
        setEmail(e.target.value);
    }

    function handlePassword(e) {
        setPassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!email || !password) {
            return;
        }

        onSignIn(email, password, setEmail, setPassword);
    }
    return (
        <form className="login" onSubmit={handleSubmit} >
            <h3 className="popup__title login__title">Вход</h3>
            <input
              className="popup__input login__input"
              name="userEmail"
              type="email"
              placeholder="Email"
              onChange={handleEmail}
              value={email || ''}
              required
            />
            <input
              className="popup__input login__input"
              name="userPassword"
              type="password"
              placeholder="Пароль"
              onChange={handlePassword}
              value={password || ''}
              required
            />
            <button className="popup__botton login__button" type="submit">Войти</button>
            <Link to='/sign-up' className="login__link">Ёще не зарегистрированы? Регистрация</Link>  

        </form>
    );
}

export default Login;