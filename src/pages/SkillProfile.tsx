import {
  TextInput, Avatar, Textarea, Button, Select, NumberInput,
  UnstyledButton,
  LoadingOverlay
} from '@mantine/core';
import "./SkillProfile.scss"
import { statesData } from '../assets/statesData';
import { AuthResponse, StatesData } from '../model';
import { skillData } from '../assets/skillData';
import 'react-phone-input-2/lib/style.css'
import { useUpdateSkillMutation } from '../services/api/authApiSlice';
// import '@mantine/dropzone/styles.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser, setCredientials, setUser } from '../services/features/userSlice';
import 'react-phone-number-input/style.css'
import MobilNumberInput from '../component/MobilNumberInput';
import { AuthService } from '../services/authServices';
import { useNavigate } from 'react-router-dom';
import { bank_list } from '../assets/bank_list';
import axios from 'axios';
import { update_profile } from '../services2/features/userSlice';
import { useAppDispatch, useAppSelector } from '../services2/hooks';
import { get_my_profile } from '../services2/features/userSlice';
import LoadingOverlayComp from '../component/LoadingOverlay';
import { useUpdateMutation } from '../services/api/userApiSlice';

interface BankTypes {
  id: string;
  name: string;
  code: string;
}





const SkillProfile = () => {
  const authService = new AuthService()
  const current_user = useSelector(selectCurrentUser)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  // const current_user: User = useSelector(selectCurrentUser)
  const [update, { isLoading }] = useUpdateMutation()



  const [avatar, setAvatar] = useState<any>("")
  const [state, setState] = useState<any>("")
  const [skill, setSkill] = useState<any>("")
  const [bvn, setBvn] = useState<any>("")
  const [accNumber, setAccNumber] = useState<any>("")
  const [charges, setCharges] = useState<any>("")
  const [guarantorName, setGuarantorName] = useState<any>("")
  const [about, setAbout] = useState<any>("")
  const [guarantorNumber, setGuarantorNumber] = useState<any>("")
  const [bankName, setBankName] = useState<any>("")
  const [mobileNumber, setMobileNumber] = useState<any>("")


  // const getMe = async () => {
  //   try{
  //     const res = await dispatch(get_my_profile()).unwrap()

  //   }
  //   catch(err){

  //   }

  // }

  useEffect(() => {
    // getMe()
  }, [])


  const handleSubmit = async () => {

    const userData = {
      avatar,
      state,
      skills: skill,
      bvn,
      bank_number: accNumber,
      charges,
      guarantor_name: guarantorName,
      about,
      guarantor_number: guarantorNumber,
      bank_name: bankName,

    }
    try {

      const res:AuthResponse = await update(userData).unwrap()
      if (res.success === true) {
        dispatch(setUser(res))
        authService.setUser(res.user)
      // navigate(`/account/${res.user._id}`, { replace: true })
      }

    } catch (error) {
      console.log(" update error", error)
    }
  }

  function convertToBase64(file: any) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader()
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result)
      };
      fileReader.onerror = (error) => {
        reject(error)
      }
    })
  }

  const hSubmit = async (e: any) => {
    const file = e.target.files[0]
    const base64Img = await convertToBase64(file) as string
    setAvatar(base64Img)


  }



  return (
    <div className="skill-update-form-container">
      <LoadingOverlayComp
      status={isLoading}
      />
      <div className="wrapper">
        <div className="avatar-box" style={{ display: "flex", justifyContent: "center", marginTop: 40 }}>
          <div className="imagePreview">
            {avatar && (<Avatar size={100} src={avatar} alt="no image here" color="indigo" />)}
            {!avatar && (<UnstyledButton><Avatar size={100} src={null} alt="no image here" color="indigo" /></UnstyledButton>)}
            <input type="file" src="" alt=""
              accept='.jpeg, .png, .jpg'
              onChange={(e) => {
                hSubmit(e)
              }}
            />
          </div>
        </div>
        <h4 style={{ textAlign: "center" }}>UPDATE SKILL</h4>
        <Select
          className="input"
          label="States"
          description="Choose a state where you can carry out a task"
          placeholder="Select Prefered State"
          data={statesData.map((state: StatesData) => state.name)}
          withAsterisk
          clearable
          allowDeselect
          mt="md"
          value={state}
          onSelect={(event) => setState(event.currentTarget.value)}
        />


        <Select
          className="input"
          label="Skill"
          description="Your Skill and task to complete"
          placeholder="Select Prefered Skill"
          data={skillData?.map((skill: any) => skill.skill)}
          withAsterisk
          // defaultValue="React"
          clearable
          allowDeselect
          mt="md"
          value={skill}
          onSelect={(event) => setSkill(event.currentTarget.value)}

        />

        <TextInput
          type='text'
          className="input"
          withAsterisk
          label="Bvn"
          placeholder="1234567890"
          maxLength={11}
          value={bvn}
          onChange={(event) => setBvn(event.currentTarget.value)}
        />

        <TextInput
          type='text'
          className="input g-input-1"
          withAsterisk
          label="Account Number"
          placeholder="1234567890"
          maxLength={10}
          value={accNumber}
          onChange={(event) => setAccNumber(event.currentTarget.value)}
        />
        <Select
          className="input"
          label="Bank Name"
          placeholder="Choose your Bank Name"
          data={bank_list?.map((bank: BankTypes) => bank.name)}
          withAsterisk
          // defaultValue="React"
          clearable
          allowDeselect
          mt="md"
          value={bankName}
          onSelect={(event) => setBankName(event.currentTarget.value)}

        />

        <NumberInput
          description="A client may negociate your charges"
          className="input"
          withAsterisk
          prefix='₦'
          defaultValue={0}
          label="Per Hour Charges"
          placeholder="Naira"
          maxLength={6}
          allowDecimal={false}
          value={charges}
          onChange={(val: string) => setCharges(val)}
        />

        <Textarea
          className="input"
          placeholder="Tell us about yourself, skills and experience"
          label="Skill Summary"
          autosize
          minRows={2}
          value={about}
          onChange={(event) => setAbout(event.currentTarget.value)}

        /> 

        <TextInput
          className="g-input-1 input"
          type='text'
          placeholder="Guarantor's full name"
          label="Guarantor's full name and mobile number"
          withAsterisk
          value={guarantorName}
          onChange={(event) => setGuarantorName(event.currentTarget.value)}

        />

        <MobilNumberInput
          onChange={(val) => { setMobileNumber(val) }}
          value={mobileNumber}
          defaultCountry='NG'
          title="Please enter your guarantor's number"
        />

        <MobilNumberInput
          onChange={(val) => { setGuarantorNumber(val) }}
          value={guarantorNumber}
          defaultCountry='NG'
          title='Please enter your mobile number'
        /> 

      <Button style={{ minWidth: 330, marginTop: 20 }}
          onClick={() => { handleSubmit() }}
          disabled={isLoading}
        >
          {!isLoading ? "Update Skill" : "Updating Please wait..."}
        </Button>

      </div>

    </div>
  );
}

export default SkillProfile

