import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container } from '@mui/material';
import './registerStyles.css';
import { callSignUp, validateEmail } from '../../utils/helpers';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const navigator = useNavigate();



    const handleSubmit = async () => {
        // Validate input
        if (!name) {
            alert('Name is required.');
        } else if (password.length < 8) {
            alert('Password must be at least 8 characters long.');
        } else if (!validateEmail(email)) {
            alert('Please enter a valid email address.');
        } else {
            // Call your API here
            const result: any = await callSignUp(name, email, password);
            console.log(result)
            alert(result.message);
            if (result.success === true) {
                localStorage.setItem('token', result.token)
                navigator('/login')
            }

        }
    };


    return (
        <Container>
            <div className='rbox'>
                <h1>Register</h1>
                <TextField
                    label="Name"
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    margin="normal"
                />
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
                    Register
                </Button>
                <Button variant="contained" className='rbutton' sx={{ marginLeft: '20px' }} color="secondary" onClick={() => navigator('/register')}>
                    Login
                </Button>
            </div>
        </Container>

    )
}

export default Register