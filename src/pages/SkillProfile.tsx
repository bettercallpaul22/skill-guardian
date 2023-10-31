import {
  TextInput, Avatar, Textarea, Button, Select, NumberInput,
  UnstyledButton,
  Text
} from '@mantine/core';
import "./SkillProfile.scss"
import { statesData } from '../assets/statesData';
import { RegisterResponse, StatesData, User } from '../model';
import { skillData } from '../assets/skillData';
import 'react-phone-input-2/lib/style.css'
import { useUpdateSkillMutation } from '../services/api/authApiSlice';
// import '@mantine/dropzone/styles.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser, setCredientials } from '../services/features/userSlice';
import 'react-phone-number-input/style.css'
import MobilNumberInput from '../component/MobilNumberInput';
import { AuthService } from '../services/authServices';
import { useNavigate } from 'react-router-dom';
import { bank_list } from '../assets/bank_list';

interface BankTypes {
  id: string;
  name: string;
  code: string;
}





const SkillProfile = () => {
  const authService = new AuthService();
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const current_user: User = useSelector(selectCurrentUser)
  const [updateSkill, { isLoading }] = useUpdateSkillMutation()



  const [avatar, setAvatar] = useState("")
  const [state, setState] = useState("")
  const [skill, setSkill] = useState("")
  const [bvn, setBvn] = useState("")
  const [accNumber, setAccNumber] = useState("")
  const [charges, setCharges] = useState("")
  const [guarantorName, setGuarantorName] = useState("")
  const [about, setAbout] = useState("")
  const [guarantorNumber, setGuarantorNumber] = useState("")
  const [bankName, setBankName] = useState("")
  const [mobileNumber, setMobileNumber] = useState("")
  const [stateErr, setStateErr] = useState("")
  const [mobileNumErr, setMobileNumErr] = useState("")
  const [guarantorNameErr, setGuarantorNameErr] = useState("")
  const [skillErr, setSkillErr] = useState("")
  const [bankNameErr, SetBankNameErr] = useState("")
  const [accNumberErr, setAccNumberErr] = useState("")
  const [guarantorNumberErr, setGuarantorNumberErr] = useState("")
  const [cahargesErr, setChargesErr] = useState("")
  const [bvnErr, setBvnErr] = useState("")

  // useEffect(() => {
  //   setAvatar(current_user?.avatar)
  //   setState(current_user?.state)
  //   setSkill(current_user?.skills)
  //   setBvn(current_user?.bvn)
  //   setAccNumber(current_user?.bank_number)
  //   setCharges(current_user?.charges)
  //   setGuarantorName(current_user?.guarantor_name)
  //   setAbout(current_user?.about)
  //   setGuarantorNumber(current_user?.guarantor_number)
  //   setBankName(current_user?.bank_name)
  //   setMobileNumber(current_user?.mobile_number)
  // }, [current_user])
  const validateInput = () => {
    if (!state) return setStateErr("please select a state")
    if (!skill) return setSkillErr("please select a skill")
    if (bvn.length < 11) return setBvnErr("please fill in 11 digit bvn numbers")
    if (accNumber.length < 10) return setAccNumberErr("please fill in 11 digit account numbers")
    if (!bankName) return SetBankNameErr("please select prefered bank name")
    if (!charges) return setChargesErr("please fill in your charges")
    if (guarantorName.length < 5) return setGuarantorNameErr("please fill in your guarantor's name")
    if (guarantorNumber.length < 10) return setGuarantorNumberErr("please fill in your guarantor's number")
    if (mobileNumber.length < 10) return setMobileNumErr("please fill in your guarantor's number")
  }





  const handleSubmit = async () => {
    const validateInput = () => {
      if (!state) return setStateErr("please select a state")
      if (!skill) return setSkillErr("please select a skill")
      if (bvn.length < 11) return setBvnErr("please fill in 11 digit bvn numbers")
      if (accNumber.length < 10) return setAccNumberErr("please fill in 11 digit account numbers")
      if (!bankName) return SetBankNameErr("please select prefered bank name")
      if (!charges) return setChargesErr("please fill in your charges")
      if (guarantorName.length < 5) return setGuarantorNameErr("please fill in your guarantor's name")
      if (guarantorNumber.length < 10) return setGuarantorNumberErr("please fill in your guarantor's number")
      if (mobileNumber.length < 10) return setMobileNumErr("please fill in your guarantor's number")
    }

    if(
      stateErr ||
      skillErr ||
      bvnErr ||
      accNumberErr ||
      bankNameErr ||
      cahargesErr ||
      guarantorNameErr ||
      guarantorNumberErr ||
      mobileNumErr
    ) return 

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
      const response: RegisterResponse = await updateSkill(userData).unwrap()
      if (response.success === true) {
        authService.setUserId(response.user._id)
        authService.setUserDisplayName(response.user.firstName)
        authService.setUserToken(response.token)
        dispatch(setCredientials(response))
        navigate(`/account/${response.user._id}`, { replace: true })
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
    <div className="skill-profile-form-container">
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
        <h4 style={{ textAlign: "center" }}>UPDATE YOUR SKILL</h4>
        <h4 style={{ textAlign: "center", maxWidth: 300, color: "GrayText", marginTop: -20 }}>
          Update your skill and become a tasker,
          so other user can find you in you location.
        </h4>

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
        {stateErr && (<Text style={{ color: "red", fontSize: 14, paddingTop: 0, minWidth: 400 }}>
          {stateErr}
        </Text>)}


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
         {skillErr && (<Text style={{ color: "red", fontSize: 14, paddingTop: 0, minWidth: 400 }}>
          {skillErr}
        </Text>)}

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
         {bvnErr && (<Text style={{ color: "red", fontSize: 14, paddingTop: 0, minWidth: 400 }}>
          {bvnErr}
        </Text>)}

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
 {accNumberErr && (<Text style={{ color: "red", fontSize: 14, paddingTop: 0, minWidth: 400 }}>
          {accNumberErr}
        </Text>)}

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
         {bankNameErr && (<Text style={{ color: "red", fontSize: 14, paddingTop: 0, minWidth: 400 }}>
          {bankNameErr}
        </Text>)}

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
         {cahargesErr && (<Text style={{ color: "red", fontSize: 14, paddingTop: 0, minWidth: 400 }}>
          {cahargesErr}
        </Text>)}

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
         {guarantorNameErr && (<Text style={{ color: "red", fontSize: 14, paddingTop: 0, minWidth: 400 }}>
          {guarantorNameErr}
        </Text>)}

        <MobilNumberInput
          onChange={(val) => { setMobileNumber(val) }}
          value={mobileNumber}
          defaultCountry='NG'
          title="Please enter your guarantor's number"
        />
         {mobileNumErr && (<Text style={{ color: "red", fontSize: 14, paddingTop: 0, minWidth: 400 }}>
          {mobileNumErr}
        </Text>)}

        <MobilNumberInput
          onChange={(val) => { setGuarantorNumber(val) }}
          value={guarantorNumber}
          defaultCountry='NG'
          title='Please enter your mobile number'
        />
         {guarantorNumberErr && (<Text style={{ color: "red", fontSize: 14, paddingTop: 0, minWidth: 400 }}>
          {guarantorNumberErr}
        </Text>)}

        <Button style={{ minWidth: 400, marginTop: 20 }}
          onClick={() => { handleSubmit() }}
          disabled={isLoading}
        >
          {!isLoading ? "Submit" : "Submiting..."}
        </Button>

      </div>

    </div>
  );
}

export default SkillProfile

