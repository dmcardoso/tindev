import React, {useState} from 'react';
import logo from '../../assets/logo.svg';

import './login.css';

import api from '../../services/api';

const Login = ({history}) => {
    const [username, setUsername] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        const response = await api.post('/devs', {
            username
        });
    }

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <img src={logo} alt="Tindev"/>
                <input
                    placeholder="Digite seu usuário no github"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <button type="submit">Entrar</button>
            </form>
        </div>
    );
};

export default Login;
