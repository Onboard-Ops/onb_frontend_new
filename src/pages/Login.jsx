import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { authenticate, isAuth } from '../utils/auth';
import { Link, Redirect } from 'react-router-dom';
import { auth } from '../utils/firebase';
import GoogleButton from 'react-google-button';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
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
import { API_URL } from '../utils/url';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { FcGoogle } from 'react-icons/fc';
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

	// GOOGLE AUTH HANDLER
	function googleSignIn() {
		const googleAuthProvider = new GoogleAuthProvider();
		return signInWithPopup(auth, googleAuthProvider);
	}
	const handleGoogleSignIn = async (e) => {
		e.preventDefault();
		try {
			const res = await googleSignIn();
			console.log('Google res', res);
			sendGoogleToken(res?.user?.accessToken);
		} catch (error) {
			console.log(error.message);
		}
	};

	const sendGoogleToken = (tokenId) => {
		axios
			.post(`${API_URL}/google-signin`, {
				idToken: tokenId,
			})
			.then((res) => {
				console.log('GOOGLE SIGNIN SUCCESS', res.data);
				localStorage.setItem('token', res?.data?.token);
				localStorage.setItem('user', JSON.stringify(res?.data?.user));
				navigate('/projects');
				// informParent(res);
			})
			.catch((error) => {
				console.log('GOOGLE SIGNIN ERROR', error.response);
			});
	};
	// const responseGoogle = (response) => {
	// 	console.log('GOOGLE RESPONSE', response);
	// 	sendGoogleToken(response?.tokenId);
	// };
	// const informParent = (response) => {
	// 	authenticate(response, () => {
	// 		isAuth() && navigate('/projects');
	// 	});
	// };
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
						colorScheme='linkedin'
						size='lg'
						w='100%'
						d='block'
						type='submit'
					>
						Login
					</Button>
				</VStack>

				{/* GOOGLE SIGN IN */}
				<GoogleButton className='g-btn' type='dark' onClick={handleGoogleSignIn} />
				<HStack justify='space-between' spacing='24px'>
					<Text>
						<Code mt={4} color='blue' onClick={() => navigate('/forgot-password')}>
							Forgot Password?
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
