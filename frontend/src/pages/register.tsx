import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import api from '../api/axios';
import {useAuth} from '../auth/AuthContext';
import './register.css';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const [error, setError] = useState('');

    const navigate = useNavigate();
    const {login} = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try{
            const res = await api.post('/auth/register', {
                name,
                email,
                password,
            });

            login(res.data.token, res.data.user);
            navigate('/dashboard');
            console.log('Registration successful');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }catch (err: any) {
            setError(err.response?.data?.message || 'Registration failed');
        }

    };
    return (
        <div className="register-container">
            <form className="register-card" onSubmit={handleSubmit}>
                <h2>Create Account</h2>
                {error && <p className="error">{error}</p>}

                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <div className="password-field">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button
                        type="button"
                        className="eye-icon"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? '🙈' : '👁️'}
                    </button>
                </div>

               

                <button type="submit">Register</button>
            </form>
        </div>
    );

}

export default Register;