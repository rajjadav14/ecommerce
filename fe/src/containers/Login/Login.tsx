import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container } from '@mui/material';
import '../Register/registerStyles.css';
import { callLogin, validateEmail } from '../../utils/helpers';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigator = useNavigate();


    const handleSubmit = async () => {
        // Validate input
        if (password.length < 8) {
            alert('Password must be at least 8 characters long.');
        } else if (!validateEmail(email)) {
            alert('Please enter a valid email address.');
        } else {
            // Call your API here
            const result: any = await callLogin(email, password);
            console.log(result)
            alert(result.message);
            if (result.success) {
                localStorage.setItem('token', result.token);
                navigator('/')
            }
        }
    };


    return (
        <Container>
            <div className='rbox'>
                <h1>Login</h1>

                <TextField
                    label="Email"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Password"
                    variant="outlined"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <Button variant="contained" className='rbutton' color="primary" onClick={handleSubmit}>
                    Login
                </Button>
                <Button variant="contained" className='rbutton' sx={{ marginLeft: '20px' }} color="secondary" onClick={() => navigator('/register')}>
                    Register
                </Button>
            </div>
        </Container>

    )
}

export default Login