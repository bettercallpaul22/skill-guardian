import { TextInput, Button, Group, Box, PasswordInput } from '@mantine/core';
import "./RegisterModal.scss"
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthResponse} from '../model';
import {useRegisterMutation } from '../services/api/authApiSlice';
import { AuthService } from '../services/authServices';
import { useDispatch } from 'react-redux';
import { useLayoutEffect, useState } from 'react';
import { setCredientials } from '../services/features/userSlice';




const RegisterModal: React.FC = () => {

  const [register, {isLoading}] = useRegisterMutation()
  const authService = new AuthService()
  useLayoutEffect(() => {
    authService.getUserToken() && window.location.replace('/dashboard')
  }, [])
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [serverError, setServerError] = useState("")
  const [emailServerErr, setEmailServerError] = useState("")
  const [emailErr, setEmailError] = useState("")
  const [passwordErr, setPasswordErr] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [firstNameErr, setFirstNameErr] = useState("")
  const [lastName, setLastName] = useState("")
  const [lastNameErr, setLastNameErr] = useState("")


  const validateInput = (value: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(value);
  }


  const handleRegister = async () => {

    if (!password || !email || !firstName || !lastName) return;
    const result = validateInput(email)
    if (!result) return setEmailError('Input a valid email address')
    if (firstName.length < 3) return setFirstNameErr('first name must be at least 3 characters')
    if (lastName.length < 3) return setLastNameErr('last name must be at least 3 characters')
    try {
      const res: AuthResponse = await register({ firstName, lastName, email, password }).unwrap()
      if (res.success) {
        dispatch(setCredientials(res))
        authService.setUserToken(res.token)
        authService.setUserId(res._id)
        authService.setUser(res.user)
        navigate('/skill-profile', {replace:true})
      }

    } catch (error: any) {
      if (error.status === 404) { setEmailServerError(error.data) }
      else if (error.status === 400) {
        setPasswordErr(error.data)
      } else {
        setServerError(error.data)

      }

    }
  }



  return (
    // <div className='register-main-container_' style={{ backgroundImage: `url(${bg})`, }}>
    //   <LoadingOverlayComp
    //     status={loading}
    //   />
      <Box maw={340} mx="auto" className='register-modal-box'>
        <div className='title'>Skill Guardians</div>
        <form >

          <TextInput
            withAsterisk
            label="First Name"
            placeholder="Enter your first name"
            onChange={(val) => {
              setFirstName(val.currentTarget.value)
              setFirstNameErr('')
            }}
          />
          {firstNameErr && (<p className="error-message">{firstNameErr}</p>)}


          <TextInput
            withAsterisk
            label="Last Name"
            placeholder="Enter your last name"
            onChange={(val) => {
              setLastName(val.currentTarget.value)
              setLastNameErr('')
            }}
          />
          {lastNameErr && (<p className="error-message">{lastNameErr}</p>)}

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
            <Button onClick={handleRegister}>{isLoading ? "Submitting..." : "Register"}</Button>
          </Group>
        </form>
        <div className="have-account">
          <p className='text1'>Don't have an account ?</p>
          <NavLink to="/register">
            <p className='text2' >Login</p>
          </NavLink>
        </div>
      </Box>
    // </div>
  );
}

export default RegisterModal



// validate: {
//     email: (value: string) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
//     password: (value: string) => (value.length < 6 ? "password must me at least 6 characters length" : null),
// },