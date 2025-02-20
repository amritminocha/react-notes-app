import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import AuthContext from '../../AuthContext'

const LoginContainer = styled.div`
    background-color: aliceblue;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`

const LoginBox = styled.div`
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    width: 300px;
    height: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Input = styled.input`
    width: 200px;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
`

const Button = styled.button`
    background-color: #28a745;
    color: white;
    border: none;
    margin-top: 30px;
    margin-bottom: 10px;
    padding: 10px 15px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;

    &:hover {
        background-color: #218838;
    }
`

const SignUpLink = styled(Link)` 
    color: blue;
    text-decoration: none;
    font-weight: bold;
    margin-top: 10px;

    &:hover {
        text-decoration: underline;
    }
`;

const Login = () => {
  const { login }  = useContext(AuthContext);
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      await login(credentials);
    } catch (err) {
      setError(err.message);
    }
  }

  const errorMessage = error && <div style={{color: 'red'}}>{error}</div>;

  return (
    <LoginContainer>
        <LoginBox>
            <h1 style={{marginBottom:'30px'}}>Login</h1>
            {errorMessage}
            <Input 
                type="text" 
                placeholder="Username" 
                value={credentials.username} 
                onChange={(e)=>{setCredentials({...credentials, username:e.target.value})}} />
            <Input 
                type="password" 
                placeholder="Password" 
                value={credentials.password} 
                onChange={(e)=>{setCredentials({...credentials, password:e.target.value})}} />
            <Button onClick={handleLogin}>Login</Button>
            <p>Not signed up yet? <SignUpLink to="/signup">SignUp</SignUpLink></p>
        </LoginBox>
    </LoginContainer>
  )
}

export default Login