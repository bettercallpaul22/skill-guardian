import { TextInput, Button, Group, Box, PasswordInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import "./Login.scss"
import { NavLink, useNavigate } from 'react-router-dom';
import bg from "../assets/construction-worker.avif"
import { RegisterResponse, User } from '../model';
import { useLoginMutation } from '../services/api/authApiSlice';
import { AuthService } from '../services/authServices';
import { useDispatch } from 'react-redux';
import { useLayoutEffect, useState } from 'react';
import { setCredientials } from '../services/features/userSlice';
import jwt_decode from 'jwt-decode'
import { loginUser } from '../services2/features/authSlice';
import { useAppDispatch, useAppSelector } from '../services2/hooks';
import axios from 'axios';
import LoadingOverlayComp from '../component/LoadingOverlay';



const Login: React.FC = () => {
    const authService = new AuthService()
    useLayoutEffect(() => {
        authService.getUserToken() && window.location.replace('/dashboard')
    }, [])

    const { loading, user, error } = useAppSelector((state) => state.auth)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [serverError, setServerError] = useState("")
    const [emailServerErr, setEmailServerError] = useState("")
    const [emailErr, setEmailError] = useState("")
    const [passwordErr, setPasswordErr] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    const validateInput = (value: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(value);
    }


    const handleLogin = async () => {
        if (!password || !email) return;
        const result = validateInput(email)
        if (!result) return setEmailError('Input a valid email address')
        try {
            const res: RegisterResponse = await dispatch(loginUser({ email, password })).unwrap()
            if (res.success) {
                authService.setUserToken(res.token)
                authService.setUserId(res._id)
                navigate('/dashboard', { replace: true })
            }

        } catch (error: any) {
            if (error.status === 404) { setEmailServerError(error.data) }
            else if (error.status === 401) {
                setPasswordErr(error.data.message)
            } else {
                setServerError(error.data.message)

            }

        }
    }


    return (
        <div className='login-main-container_' style={{ backgroundImage: `url(${bg})`, }}>
            <LoadingOverlayComp
            status={loading}
            />
            <Box maw={340} mx="auto" className='login-box'>
                <div className='title'>Skill Guardians</div>
                <form >

                    <TextInput
                        withAsterisk
                        label="Email"
                        placeholder="your@email.com"
                        onChange={(val) => {
                            setEmail(val.currentTarget.value)
                            setEmailError('')
                            setEmailServerError('')
                        }}
                    />
                    {emailErr && (<p className="error-message">{emailErr}</p>)}
                    {emailServerErr && (<p className="error-message">{emailServerErr}</p>)}


                    <PasswordInput
                        type="password"
                        withAsterisk
                        label="Password"
                        placeholder="Password"
                        onChange={(val) => {
                            setPassword(val.currentTarget.value)
                            setPasswordErr('')
                        }}
                    />
                    {passwordErr && (<p className="error-message">{passwordErr}</p>)}
                    {serverError && (<p className="error-message">{serverError}</p>)}


                    <Group justify="center" mt="md">
                        <Button onClick={handleLogin}>{loading ? "Submitting..." : "Login"}</Button>
                    </Group>
                </form>
                <div className="have-account">
                    <p className='text1'>Already have an account ?</p>
                    <NavLink to="/register">
                        <p className='text2' >Register</p>
                    </NavLink>
                </div>
            </Box>
        </div>
    );
}

export default Login

