import {useState, useEffect} from 'react'
import {Form, Button, Row, Col} from 'react-bootstrap'
import {FormContainer} from '../components/FormContainer'
import {Loader} from '../components/Loader'
import {Link, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {useRegisterMutation} from '../slices/userApiSlice'
import {setCredentials} from '../slices/authSlice'
import {toast} from 'react-toastify'

export const Register = () => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [password2, setPassword2] = useState('')

	const dispatch = useDispatch()
	const navigate = useNavigate()

	const [register, {isLoading}] = useRegisterMutation()

	const {userInfo} = useSelector(state => state.auth)

	useEffect(() => {
		if(userInfo)
			navigate('/')
	}, [navigate, userInfo])

	const handleSubmit = async e => {
		e.preventDefault()

		if(password !== password2){
			toast.error('Passwords do not match')
		}else{
			try{
				const res = await register({name, email, password}).unwrap()
				dispatch(setCredentials({...res}))
				navigate('/')
			}catch(err){
				toast.error(err?.data?.message || err.error)
			}
		}
	}

	const contents = (
		<FormContainer>
      <h1>Register</h1>
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
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password again'
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
          Register
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          Already have an account? <Link to={`/login`}>Login</Link>
        </Col>
      </Row>
    </FormContainer>
	)

	return contents
}
