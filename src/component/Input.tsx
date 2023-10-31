import React from 'react'
import "./Input.scss"
import { TextInput } from '@mantine/core'

interface InputProps{
value:string;
}

const Input:React.FC<InputProps> = ({value}) => {
  return (
    <TextInput
    style={{border:2, backgroundColor:"gray"}}
placeholder='test input'
    value={value}
    />
  )
}

export default Input