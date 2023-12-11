'use client';
import React, { useState } from 'react';
import s from './register.module.scss';


const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://6575af18b2fbb8f6509d5f97.mockapi.io/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (response.ok)  { alert('succesfully')
            } else {
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <> 
        <div className={s.cont1}>
            <form onSubmit={handleSubmit} className={s.register}>
                <h2>Register</h2>
                <label>
                    Username:
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Password:
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <button type="submit">Register</button>
            </form>
            </div>
        </>
    );
};

export default RegistrationForm;
