import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import AuthContext from '../../AuthContext'

const SignUpContainer = styled.div`
    background-color: aliceblue;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`

const SignUpBox = styled.div`
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
    width: 250px;
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
    margin-top: 20px;
    margin-bottom: 10px;
    padding: 10px 15px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;

    &:hover {
        background-color: #218838;
    }
`

const LoginLink = styled(Link)` 
    color: blue;
    text-decoration: none;
    font-weight: bold;
    margin-top: 10px;

    &:hover {
        text-decoration: underline;
    }
`;

const SignUp = () => {
  const { signUp } = useContext(AuthContext)
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
  })
  const [error, setError] = useState(null)

  const handleSignUp = async () => {
    try {
        await signUp(userData)
    } catch (err) {
        setError(err.message)
    }
  }

  const errorMessage = error && <div style={{color: 'red'}}>{error}</div>;
  return (
    <SignUpContainer>
        <SignUpBox>
            <h1 style={{marginBottom:'20px'}}>SignUp</h1>
            {errorMessage}
            <Input 
                type="text" 
                placeholder="Name"
                value={userData.name}
                onChange={(e) => {setUserData(...userData, userData.name)}} />
            <Input 
                type="text" 
                placeholder="Email"
                value={userData.email}
                onChange={(e) => {setUserData(...userData, userData.email)}} />
            <Input 
                type="text" 
                placeholder="Username"
                value={userData.username}
                onChange={(e) => {setUserData(...userData, userData.username)}} />
            <Input 
                type="password" 
                placeholder="Password"
                value={userData.password}
                onChange={(e) => {setUserData(...userData, userData.password)}} />
            <Button onClick={handleSignUp}>Sign Up</Button>
            <p>Already signed up? <LoginLink to="/login">Login</LoginLink></p>
        </SignUpBox>
    </SignUpContainer>
  )
}

export default SignUp