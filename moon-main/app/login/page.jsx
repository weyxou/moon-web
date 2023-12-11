'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import s from './login.module.scss';
import Nav from '@/components/nav/Nav';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {
            const response = await fetch('https://6575af18b2fbb8f6509d5f97.mockapi.io/user');
            const userData = await response.json();

            const existingUser = userData.find((user) => user.username === username);

            if (existingUser) {
                if (existingUser.password === password) {
                   alert(`welcome ${username}`);
                  
                } else {
                    setError('incorrect password');
                }
            } else {
                setError('incorrect password or username');
            }
        } catch (error) {
            alert('Error', error);
            setError('Error. Try again');
        }
    };

    return (
        <>
        <div className={s.cont1}>
            <div className={s.login}>
                <h2>Login</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <form>
                    <label>
                        Username
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            />
                    </label>
                    <br />
                    <label>
                        Password:
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            />
                    </label>
                    <br />
                    <button type="button" onClick={handleLogin}>
                    <Link href='/'>  <p>Log in</p> </Link>

                    </button>
                </form>
            </div>
            </div>
        </>
    );
};

export default LoginForm;
