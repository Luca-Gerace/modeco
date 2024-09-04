import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { userLogin } from '../services/api';
import GoogleIcon from '@mui/icons-material/Google';
import Alert from '../../../frontend/src/components/Alert';
import { Input, Button } from "@material-tailwind/react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5003";

export default function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const navigate = useNavigate();
    const location = useLocation();

    const [alert, setAlert] = useState(null);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get('token');

        if (token) {
            localStorage.setItem('token', token);
            
            window.dispatchEvent(new Event('storage'));

            navigate('/');
        }

    }, [location, navigate])

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await userLogin(formData);

            localStorage.setItem('token', response.token);

            window.dispatchEvent(new Event('storage'));

            setTimeout(() => {
                navigate('/');
            }, 2000);

            setAlert({ message: 'Login successful!', type: 'success' });

        } catch (error) {
            console.error('Login error:', error);
            setAlert({ message: 'Login error. Please retry.', type: 'error' });
        }
    };

    const handleGoogleLogin = () => {
        window.location.href = `${API_URL}/api/auth/google?redirect=cms`;
    };
    
    return (
        <div className='px-4'>
            <div className='flex flex-col gap-4 w-full md:w-[500px] mx-auto p-6 bg-white border rounded-xl shadow-xl my-8'>
                <h1 className="text-[36px] font-bold text-center mb-4">Login</h1>
                {alert && <Alert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}
                <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
                    <Input label="Email" type="email" name="email" onChange={handleChange} required />
                    <Input label="Password" type="password" name="password" onChange={handleChange} required />
                    <Button type="submit" className="bg-green-500 rounded-full p-4 h-[58px] mt-3" size="sm">
                        Login
                    </Button>
                </form>
                <div className="flex flex-col mt-2 gap-3">
                    <span className="px-4 m-auto mb-2">or</span>
                    <Button onClick={handleGoogleLogin} variant='outlined' className="w-full justify-center flex items-center m-auto gap-3 rounded-full p-4" size="sm">
                        <GoogleIcon className="h-6 w-6" /> Login with Google
                    </Button>
                </div>
            </div>
        </div>
    );
}