import {useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {Form, Button, Row, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {useLoginMutation} from '../slices/userApiSlice'
import {setCredentials} from '../slices/authSlice'
import {toast} from 'react-toastify'
import {Loader} from '../components/Loader'
import { FormContainer} from '../components/FormContainer'

export const Login = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const dispatch = useDispatch()
	const navigate = useNavigate()

	const [login, {isLoading}] = useLoginMutation()
	//console.log(props)

	const {userInfo} = useSelector(state => state.auth)

	useEffect(() => {
		if(userInfo)
			navigate('/')

	},[navigate, userInfo])

	const handleSubmit = async e => {
		e.preventDefault()

		try{
			const res = await login({
				email, 
				password
			}).unwrap()
			dispatch(setCredentials({...res}))
			navigate('/')
		}catch(err){
			toast.error(err?.data?.message || err.error)
		}
	}

	const contents = (
		<FormContainer>
			<h1>Sign In</h1>

			<Form onSubmit={handleSubmit}>
				<Form.Group
					className='my-2'
					controlId='email'
				>
					<Form.Label>Email</Form.Label>
					<Form.Control
						type='email'
						placeholder='zhangsan@mail.com'
						value={email}
						onChange={e => setEmail(e.target.value)} 
					/>
				</Form.Group>

				<Form.Group
					className='my-2'
					controlId='password'
				>
					<Form.Label>Password</Form.Label>
					<Form.Control
						type='password'
						placeholder='******'
						value={password}
						onChange={e => setPassword(e.target.value)} 
					/>
				</Form.Group>

				<Button
					disabled={isLoading}
					type='submit'
					variant='primary'
					className='mt-3'
				>
					Sign In
				</Button>
			</Form>

			{isLoading && <Loader />}

			<Row className="py-3">
				<Col>
					New Customer? <Link  to='/register'>Register</Link>
				</Col>
			</Row>
		</FormContainer>
	)

	return contents
}
