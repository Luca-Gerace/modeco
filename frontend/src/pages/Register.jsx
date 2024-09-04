import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api';
import Alert from '../components/Alert';
import { Input, Button } from "@material-tailwind/react";

export default function Register() {
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        password: '',
    });

    const navigate = useNavigate();

    const [alert, setAlert] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await registerUser(formData);

            setAlert({ message: 'Registration successful!', type: 'success' });
            setTimeout(() => {
                navigate('/login');
            }, 3000);

        } catch (error) {
            console.error('Registration error:', error.response ? error.response.data : error);
            setAlert({ message: 'Registration error. Retry.', type: 'error' });
        }
    };

    return (
        <div className='px-4'>
            <div className='flex flex-col gap-4 w-full md:w-[500px] mx-auto p-6 bg-white border rounded-xl shadow-xl my-8'>
                <h1 className="text-[36px] font-bold text-center mb-4">Registrati</h1>
                {alert && <Alert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}
                <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
                    <Input label="Name" type="text" name="name" onChange={handleChange} required />
                    <Input label="Surname" type="text" name="surname" onChange={handleChange} required />
                    <Input label="Email" type="email" name="email" onChange={handleChange} required />
                    <Input label="Password" type="password" name="password" onChange={handleChange} required /> 
                    <Button type="submit" className="bg-green-500 rounded-full p-4 h-[58px] mt-3" size="sm">
                        Registrati
                    </Button>
                </form>
            </div>
        </div>
    );
}