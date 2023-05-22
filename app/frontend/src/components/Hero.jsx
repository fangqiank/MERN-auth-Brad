import {Container, Card, Button} from 'react-bootstrap'
import {useSelector} from 'react-redux'

export const Hero = () => {
	const {userInfo} = useSelector(state => state.auth)

	const contents = (
		<Container className="d-flex justify-content-center">
			<Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75'>
				<h1 className='text-center mb-4'>MERN Auth</h1>
				<p className="text-center mb-4">
					Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor, minus. Beatae nemo exercitationem quisquam aliquid provident cupiditate quaerat tempore vero.
				</p>

				<div className="d-flex">
					<Button 
						className="me-3"
						variant='primary'
						href='/login'
						hidden={userInfo}
					>
						Sign In
					</Button>

					<Button
						variant='secondary'
						href='/register'
						hidden={userInfo}
					>
						Register
					</Button>

					<Button
						variant='outline-info'
						hidden={!userInfo}
					>
						More Info...
					</Button>
				</div>
			</Card>
		</Container>
	)

	return contents
}