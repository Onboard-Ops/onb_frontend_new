import {
	Button,
	FormControl,
	FormLabel,
	Input,
	useToast,
	VStack,
	Text,
	Code,
	HStack,
	InputRightElement,
	InputGroup,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import React, { useEffect, useState } from 'react';
import AuthLayout from '../Layout/AuthLayout';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';

//Redux Imports
import { LoginAction } from '../redux/actions/auth/auth.action';
import { useDispatch, useSelector } from 'react-redux';

export default function Login() {
	const [showPassword, setShowPassword] = useState(false);
	const [userLogin, SetUserLogin] = useState({
		email: '',
		password: '',
		error: '',
	});
	const dispatch = useDispatch();
	const user = useSelector((state) => state.auth);
	const toast = useToast();
	const navigate = useNavigate();

	const onChangeHandler = (e) => {
		SetUserLogin((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const onHandleSubmit = (event) => {
		event.preventDefault();
		let user = {
			email: userLogin.email,
			password: userLogin.password,
		};
		dispatch(LoginAction(user, navigate));
	};

	return (
		<AuthLayout>
			<Text fontSize='large' textAlign='center' color='gray.600' fontWeight='bold' mb='2'>
				Hello 👋 <br />
			</Text>
			<Text fontSize='large' textAlign='center' color='gray.500' mb='8'>
				Welcome to OnboardOps
			</Text>
			<form onSubmit={onHandleSubmit}>
				<VStack spacing='5' justify='space-between'>
					<FormControl isRequired>
						<FormLabel htmlFor='username'>Email</FormLabel>
						<Input
							size='lg'
							id='user-email'
							placeholder='Email'
							name='email'
							value={userLogin.email}
							onChange={onChangeHandler}
						/>
					</FormControl>
					<FormControl>
						<FormLabel htmlFor='user-password'>Password</FormLabel>
						<InputGroup>
							<Input
								size='lg'
								id='user-password'
								placeholder='Password'
								type={showPassword ? 'text' : 'password'}
								name='password'
								value={userLogin.password}
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
						isLoading={user?.isAuthenticating}
						// isLoading={signUpResult.fetching || loginResult.fetching}
						colorScheme='teal'
						size='lg'
						w='100%'
						d='block'
						type='submit'
					>
						Login
					</Button>
				</VStack>
				<HStack justify='space-between' spacing='24px'>
					<Text>
						<Code mt={4} color='blue' onClick={() => navigate('/forgot-password')}>
							Forget Password ?
						</Code>{' '}
						<Code color='blue' onClick={() => navigate('/')} ml={48} mt={4}>
							Sign up
						</Code>{' '}
					</Text>
				</HStack>
			</form>
		</AuthLayout>
	);
}
