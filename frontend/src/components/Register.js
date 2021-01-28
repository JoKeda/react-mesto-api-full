import React from 'react';
import { Link } from 'react-router-dom';

function Register(props) {

    const {
      onSignUp
    } = props

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function handleEmailRegister(e) {
        setEmail(e.target.value);
    }

    function handlePasswordRegister(e) {
        setPassword(e.target.value);
    }

    function handleSubmitRegister(e) {
        e.preventDefault();
        onSignUp(email, password)
    }

    return (
        <form className="login" onSubmit={handleSubmitRegister}>
            <h3 className="popup__title login__title">Регистрация</h3>
            <input
              className="popup__input login__input"
              name="userEmail"
              type="email"
              placeholder="Email"
              onChange={handleEmailRegister}
              value={email || ''}
              required
            />
            <input
              className="popup__input login__input"
              name="userPassword"
              type="password"
              placeholder="Пароль"
              onChange={handlePasswordRegister}
              value={password || ''}
              required
            />
            <button className="popup__botton login__button" type="submit">Зарегистрироваться</button>
            <Link to='/sign-in' className="login__link">Уже зарегистрированы? Войти</Link>  

        </form>
    )
}

export default Register;