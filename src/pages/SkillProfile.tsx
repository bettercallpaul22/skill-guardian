import {
  TextInput, Avatar, Textarea, Button, Group, Select, NumberInput,
  BackgroundImage, Center, Text, Box, Image, SimpleGrid, UnstyledButton
} from '@mantine/core';
import { useForm } from '@mantine/form';
import "./SkillProfile.scss"
import { statesData } from '../assets/statesData';
import { StatesData } from '../model';
import { skillData } from '../assets/skillData';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { useUpdateSkillMutation } from '../services/api/authApiSlice';
import '@mantine/dropzone/styles.css';
import { Dropzone, IMAGE_MIME_TYPE, FileWithPath } from '@mantine/dropzone';
import { useState } from 'react';

const SkillProfile = () => {


  const [updateSkill, { isLoading }] = useUpdateSkillMutation()
  const [profileImg, setAvatar] = useState("");


  const form = useForm({
    initialValues: {
      avatar: '',
      bvn: '',
      bank_number: '',
      bank_name: '',
      charges: '',
      guarantor_number: '',
      about: '',
      mobile_number: '',
      termsOfService: false,
    },

    validate: {
      // email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      // bvn: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });


  const handleSkillUpdate = async () => {
    const {
      avatar,
      bvn,
      bank_number,
      bank_name,
      charges,
      guarantor_number,
      about,
      mobile_number,
    } = form.values
    try {
      console.log("avatarTest", profileImg)
      const response = await updateSkill({
        avatar:profileImg,
        bvn,
        bank_number,
        bank_name,
        charges,
        guarantor_number,
        about,
        mobile_number,
      })
      console.log(" update response", response)
    } catch (error) {

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
    console.log("img file", file)
    const base64Img = await convertToBase64(file) as string
    console.log("base64 file", base64Img)
    setAvatar(base64Img)


  }

  // console.log("preview", previews)

  return (
    <Box maw={600} mx="auto" className="skill-profile-form-container">
      <div className="avatar-box" style={{ display: "flex", justifyContent: "center", marginTop:40 }}>
        <div className="imagePreview">
         {profileImg && (<Avatar size={100} src={profileImg} alt="no image here" color="indigo" />)}
          {!profileImg && (<UnstyledButton><Avatar size={100} src={null} alt="no image here" color="indigo" /></UnstyledButton>)}
          <input type="file" src="" alt=""
            accept='.jpeg, .png, .jpg'
            onChange={(e) => {
              hSubmit(e)
            }}
          />
        </div>
      </div>




      {/* <Dropzone accept={IMAGE_MIME_TYPE} onDrop={setFiles}>
        <Text ta="center">Drop images here</Text>
      </Dropzone>

      <SimpleGrid cols={{ base: 1, sm: 4 }} mt={previews.length > 0 ? 'xl' : 0}>
        {previews}
      </SimpleGrid> */}

      {/* <BackgroundImage
        src="https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80"
        radius="sm"
      >
        <Center p="md">
          <Text c="white">
            BackgroundImage component can be used to add any content on image. It is useful for hero
            headers and other similar sections
          </Text>
        </Center>
      </BackgroundImage> */}



      <div className="skill-title">Skill Information</div>
      <form >
        <Select
          className="input"
          label="States"
          description="Choose a state where you can carry out a task"
          placeholder="Select Prefered State"
          data={statesData.map((state: StatesData) => state.name)}
          // defaultValue="React"
          withAsterisk
          {...form.getInputProps('state')}
          clearable
          allowDeselect
          mt="md"
        />

        <Select
          className="input"
          label="Skill"
          description="Your Skill and task to complete"
          placeholder="Select Prefered Skill"
          data={skillData?.map((skill: any) => skill.skill)}
          withAsterisk
          {...form.getInputProps('skill')}


          // defaultValue="React"
          clearable
          allowDeselect
          mt="md"
        />

        <TextInput
          type='text'
          className="input"
          withAsterisk
          label="Bvn"
          placeholder="1234567890"
          {...form.getInputProps('bvn')}
          maxLength={11}
        />

        <div className="guarantor-container">

          <TextInput
            type='text'
            className="input g-input-1"
            withAsterisk
            label="Account Number"
            placeholder="1234567890"
            {...form.getInputProps('bank_number')}
            maxLength={10}
          />
          <TextInput
            type='text'
            className="input g-input-2 "
            withAsterisk
            label="Bank Name"
            placeholder="Your Bank Name"
            {...form.getInputProps('bank_name')}
          />

        </div>
        <NumberInput
          description="A client may negociate your charges"
          className="input"
          withAsterisk
          prefix='₦'
          defaultValue={0}
          label="Per Hour Charges"
          placeholder="Naira"
          {...form.getInputProps('charges')}
          maxLength={6}
          allowDecimal={false}
        />

        <Textarea
          className="input"
          placeholder="Tell us about yourself, skills and experience"
          label="Skill Summary"
          autosize
          minRows={2}
          {...form.getInputProps('about')}

        />
        <div className="guarantor-container">
          <TextInput
            className="g-input-1 input"
            type='text'
            placeholder="Guarantor's full name"
            label="Guarantor's full name and mobile number"
            withAsterisk
            {...form.getInputProps('guarantor_number')}

          />

          <PhoneInput
            // country={'ng'}
            containerClass='g-input-2'
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
          />
        </div>




        <Group justify="flex-end" mt="md">
          <Button onClick={() => { handleSkillUpdate() }} className="btn" >Submit</Button>
          yn</Group>
      </form>
    </Box>
  );
}

export default SkillProfile

