import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

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




function Login() {
  return (
    <LoginContainer>
        <LoginBox>
            <h1 style={{marginBottom:'30px'}}>Login</h1>
            <Input type="text" placeholder="Username" />
            <Input type="password" placeholder="Password" />
            <Button>Login</Button>
            <p>Not signed up yet? <SignUpLink to="/signup">SignUp</SignUpLink></p>
        </LoginBox>
    </LoginContainer>
  )
}

export default Login