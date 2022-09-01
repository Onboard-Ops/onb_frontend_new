import { useEffect } from 'react';
import {
	Flex,
	Box,
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	HStack,
	InputRightElement,
	Stack,
	Button,
	Heading,
	Text,
	VStack,
	useToast,
} from '@chakra-ui/react';
import AuthLayout from '../Layout/AuthLayout';
import Loader from '../components/Loader';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

//Redux Imports
import { SignupAction } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';

export default function Signup() {
	const [showPassword, setShowPassword] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const toast = useToast();
	const auth = useSelector((state) => state.auth);
	const [signup, setSignUp] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		role: '',
		error: '',
	});
	const onChangeHandler = (e) => {
		setSignUp((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const onHandleSubmit = (event) => {
		event.preventDefault();
		let user = {
			firstName: signup.firstName,
			lastName: signup.lastName,
			email: signup.email,
			password: signup.password,
			// role: signup.role,
		};
		console.log('User from Add user', user);
		dispatch(SignupAction(user));
	};
	useEffect(() => {
		if (auth?.isSignedUp) {
			toast({
				title: `🎉 ${auth.message}`,
				status: 'success',
				duration: 3000,
				isClosable: true,
			});
			navigate('/login', { replace: true });
		}
	}, [auth, navigate]);
	if (auth?.isSigningIn) {
		return <Loader />;
	}
	return (
		<div>
			{' '}
			<AuthLayout>
				<Text fontSize='large' textAlign='center' color='gray.600' fontWeight='bold' mb='2'>
					Hello Admin 👋 <br />
				</Text>
				<Text fontSize='large' textAlign='center' color='gray.500' mb='8'>
					Add your favorite people here
				</Text>

				<form onSubmit={onHandleSubmit}>
					<VStack spacing='5' justify='space-between'>
						<HStack>
							<FormControl id='firstName' isRequired>
								<FormLabel>First Name</FormLabel>
								<Input
									type='text'
									placeholder='First name'
									value={signup.firstName}
									name='firstName'
									onChange={onChangeHandler}
								/>
							</FormControl>

							<FormControl id='lastName'>
								<FormLabel>Last Name</FormLabel>
								<Input
									type='text'
									placeholder='Last name'
									value={signup.lastName}
									name='lastName'
									onChange={onChangeHandler}
								/>
							</FormControl>
						</HStack>

						<FormControl isRequired>
							<FormLabel htmlFor='admin-username'>Email Id</FormLabel>
							<Input
								id='user-email'
								placeholder='Email'
								type='email'
								value={signup.email}
								name='email'
								onChange={onChangeHandler}
							/>
						</FormControl>
						<FormControl isRequired>
							<FormLabel htmlFor='admin-secret'>Password</FormLabel>
							<InputGroup>
								<Input
									placeholder='Password'
									type={showPassword ? 'text' : 'password'}
									value={signup.password}
									name='password'
									onChange={onChangeHandler}
								/>
								<InputRightElement h={'full'}>
									<Button variant={'ghost'} onClick={() => setShowPassword((showPassword) => !showPassword)}>
										{showPassword ? <ViewIcon /> : <ViewOffIcon />}
									</Button>
								</InputRightElement>
							</InputGroup>
						</FormControl>

						<Button
							size='lg'
							w='100%'
							d='block'
							type='submit'
							loadingText='Submitting'
							bg='teal'
							color={'white'}
							_hover={{
								bg: 'blue.500',
							}}
						>
							Sign up
						</Button>

						<Stack pt={6}>
							<Text align={'center'}>
								Already a user?{' '}
								<Link color={'red.400'} to='/login'>
									Login
								</Link>
							</Text>
						</Stack>
						{/* {login ? (
							<Text color='gray.600' fontSize='sm'>
								<b>Note:</b> Some note <code>Note</code> Some note{' '}
							</Text>
						) : (
							<Text color='gray.600' fontSize='sm'>
								<b>Note:</b> Configure the password to start using your dashboard.
							</Text>
						)} */}
					</VStack>
				</form>
			</AuthLayout>
			{/* +++++++++++++++++++++++++++++++++++++++++ */}
		</div>
	);
}
