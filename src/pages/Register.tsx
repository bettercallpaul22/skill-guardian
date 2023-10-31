import { TextInput, Checkbox, Button, Group, Box, PasswordInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import "./Register.scss"
import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import bg from "../assets/construction-worker.avif"
import { useRegisterMutation } from '../services/api/authApiSlice';
import { useDispatch } from 'react-redux';
import { setCredientials } from '../services/features/userSlice';
import { AuthService } from '../services/authServices';
import { RegisterResponse } from '../model';
import PhoneInput from 'react-phone-input-2'

const Register:React.FC = () => {
  const authService = new AuthService()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [register, { isLoading }] = useRegisterMutation()
  const [error, setError] = useState("")

  const form = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      mobile_number: 0,
      password: '',
      termsOfService: false,
    },

    validate: {
      email: (value: string) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      mobile_number: (value: number) => (value < 3 ? "Mobile must be 11 characters length" : null),
      firstName: (value: string) => (value.length < 3 ? "first name must me at least 3 characters length" : null),
      lastName: (value: string) => (value.length < 3 ? "last name must me at least 3 characters length" : null),
      password: (value: string) => (value.length < 6 ? "password must me at least 6 characters length" : null),
    },
  });

  const validateForm = () => {
    if (
      form.errors.firstName ||
      form.errors.lastName ||
      form.errors.email ||
      form.errors.password ||
      form.values.firstName.length < 3 ||
      form.values.lastName.length < 3 ||
      form.values.email.length < 3 ||
      form.values.mobile_number < 11 ||
      form.values.password.length < 6
    ) return true
  }


  const handleRegister = async () => {
    // const result = validateForm()
    // if (result) return
    const { firstName, lastName, email, password, mobile_number } = form.values
    try {
      console.log("register")
      const response:RegisterResponse = await register({ 
        firstName,
         lastName,
          email,
           password,
            mobile_number,
            gender:"",
            city:"",
            state:"",
            country:"",
            avatar:"",
            skills:"",
            bvn:"",
            bank_number:"",
            guarantor_name:"",
            guarantor_number:"",
            bank_name:"",
            Skill_summary:"",

      }).unwrap()
      if (response.success) {
        authService.setUserId(response.user._id)
        authService.setUserDisplayName(response.user.firstName)
        authService.setUserToken(response.token)
        dispatch(setCredientials(response))
        navigate("/")
      }
      console.log("response", response)
    } catch (error: any) {
      setError(error.data)
    }
  }



  return (
    <div className='Register-main-container' style={{ backgroundImage: `url(${bg})` }}>
      <Box maw={340} mx="auto" className='Register-box'>
        <div className='title'>Skill Guardians</div>
        <form onSubmit={form.onSubmit((values) => { })}>
          <TextInput
            withAsterisk
            label="First Name"
            placeholder="First Name"
            {...form.getInputProps('firstName')}
          />
          <TextInput
            withAsterisk
            label="Last Name"
            placeholder="Last Name"
            {...form.getInputProps('lastName')}
          />
          {/* <PhoneInput
            country={'ng'}
            // containerClass='g-input-2'
            containerStyle={{ marginTop: 15 }}
            enableLongNumbers={false}
            enableAreaCodes={true}
           
            copyNumbersOnly
            {...form.getInputProps('mobile_number')}
            inputProps={{
              name: 'phone',
              required: true,
              autoFocus: true
            }}
          /> */}
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


          <Checkbox
            mt="md"
            label="I agree to sell my privacy"
            {...form.getInputProps('termsOfService', { type: 'checkbox' })}
          />

          <Group justify="center" mt="lg">
            <Button onClick={handleRegister} type="submit" loading={isLoading}>
              {isLoading ? "Please wait.." : "Register"}
            </Button>
          </Group>
        </form>
        <div className="have-account">
          <p className='text1'>Already have an account ?</p>
          <NavLink to="/login">
            <p className='text2' >Login</p>
          </NavLink>
        </div>
      </Box>
    </div>
  );
}

export default Register