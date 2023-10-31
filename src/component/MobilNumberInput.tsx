import React from 'react'
import './MobilNumberInput.scss'
import PhoneInput from 'react-phone-number-input'
import { Text } from '@mantine/core';

interface MobileInputProps{
    onChange:(val:string)=> void;
    defaultCountry:string | any;
    value:string;
    title:string;

}

const MobilNumberInput:React.FC<MobileInputProps> = ({onChange, title, defaultCountry,value}) => {
  return (
    <div className='m-number-input'>
        <Text style={{fontSize:14, fontWeight:600}}>{title}</Text>
         <PhoneInput
          onChange={onChange}
          defaultCountry={defaultCountry}
          className='phone-input'
          limitMaxLength
          withCountryCallingCode
          useNationalFormatForDefaultCountryValue
          value={value}
          
        />
    </div>
  )
}

export default MobilNumberInput