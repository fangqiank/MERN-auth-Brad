import {useState, useEffect} from 'react'
import {Form, Button} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { FormContainer } from '../components/FormContainer'
import { Loader } from '../components/Loader'
import {toast} from 'react-toastify'
import {useUpdateProfileMutation} from '../slices/userApiSlice'
import {setCredentials} from '../slices/authSlice'

export const Profile = () => {
	const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')

	const dispatch = useDispatch()

	const {userInfo} = useSelector(state => state.auth)

	const [updateProfile, {isLoading}] = useUpdateProfileMutation()

	const handleSubmit = async e => {
		e.preventDefault()

		if(password !== password2){
			toast.error('Passwords do not match!')
		}else{
			try{
				const res = await updateProfile({
					_id: userInfo._id,
					name,
					email,
					password
				}).unwrap()

				dispatch(setCredentials({...res}))
				toast.success('Updated successfully')
			}catch(err){
				toast.error(err?.data?.message || err.error)
			}
		}	
	}

	useEffect(() => {
		setName(userInfo.name)
		setEmail(userInfo.email)
	}, [userInfo.email, userInfo.name])

	const contents = (
		<FormContainer>
      <h1>Update Profile</h1>

      <Form onSubmit={handleSubmit}>
        <Form.Group className='my-2' controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className='my-2' controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className='my-2' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group className='my-2' controlId='confirmPassword'>
          <Form.Label>Enter Password again</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm password'
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
        </Form.Group>

        {isLoading && <Loader />}
        
        <Button 
					type='submit' 
					variant='primary' 
					className='mt-3'
				>
          Update
        </Button>
      </Form>
    </FormContainer>
	)

	return contents
}
