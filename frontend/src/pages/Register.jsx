import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api';
import Alert from '../components/Alert';
import { Input } from "@material-tailwind/react";

export default function Register() {
    // Hook - form data
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        password: '',
    });

    // Hook - navigation
    const navigate = useNavigate();

    // Hook - alert
    const [alert, setAlert] = useState(null);

    // input handler
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // form handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            // register user function with form data
            await registerUser(formData);

            setAlert({ message: 'Registration successful!', type: 'success' });
            setTimeout(() => {
                navigate('/login');
            }, 3000);

        } catch (error) {
            console.error('Registration error:', error);
            setAlert({ message: 'Registration error. Retry.', type: 'error' });
        }
    };

    return (
        <>
            <h1 className="text-[36px] font-bold text-center mb-6">Sign up</h1>
            {alert && <Alert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}
            <form onSubmit={handleSubmit}>
                <Input label="Name" type="text" onChange={handleChange} required />
                <Input label="Surname" type="text" onChange={handleChange} required />
                <Input label="Email" type="email" onChange={handleChange} required />
                <Input label="Password" type="password" onChange={handleChange} required />      
                <button type="submit" className="w-full mt-4 p-4 text-white bg-[#646ECB] rounded-md">Sign up</button>
            </form>
        </>
    );
}