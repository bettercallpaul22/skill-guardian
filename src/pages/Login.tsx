import { TextInput, Checkbox, Button, Group, Box, PasswordInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import "./Login.scss"
import { NavLink, useNavigate } from 'react-router-dom';
import bg from "../assets/construction-worker.avif"
import { RegisterResponse } from '../model';
import { useLoginMutation } from '../services/api/authApiSlice';
import { AuthService } from '../services/authServices';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { setCredientials } from '../services/features/userSlice';


const Login:React.FC = () => {

    const authService = new AuthService()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const [login, { isLoading }] = useLoginMutation()


    const form = useForm({
        initialValues: {
            email: '',
            password: '',
        },

        validate: {
            email: (value: string) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            password: (value: string) => (value.length < 6 ? "password must me at least 6 characters length" : null),
          },
    });

    const validateForm = () => {
        if (
          form.errors.email ||
          form.errors.password ||
          form.values.email.length < 3 ||
          form.values.password.length < 6
        ) return true
      }

      const handleLogin = async () => {
        const result = validateForm()
        if (result) return
        const { email, password } = form.values
        try {
          const response:RegisterResponse = await login({ email, password }).unwrap()
          if (response.success) {
            console.log("res", response)
            authService.setUserId(response.user._id)
            authService.setUserDisplayName(response.user.firstName)
            authService.setUserToken(response.token)
            dispatch(setCredientials(response))
            navigate("/")
          }
          console.log("response", response)
        } catch (error: any) {
            if(error.status === 404){
                setError(error.data)
            } else if(error.status === 401){
                setError(error.data.message)

            }
        }
      }
    

    // console.log('error', error)

    return (
        <div className='login-main-container' style={{ backgroundImage: `url(${bg})`,}}>
            <Box maw={340} mx="auto" className='login-box'>
                <div className='title'>Skill Guardians</div>
                <form onSubmit={form.onSubmit((values) => handleLogin())}>

                    <TextInput
                        withAsterisk
                        label="Email"
                        placeholder="your@email.com"
                        {...form.getInputProps('email')}
                    />

                    <PasswordInput
                        type="password"
                        withAsterisk
                        label="Password"
                        placeholder="Password"
                        {...form.getInputProps('password')}
                    />
          {error && (<p className="error-message">{error}</p>)}


                    <Group justify="center" mt="md">
                        <Button loading={isLoading} type="submit">Login</Button>
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