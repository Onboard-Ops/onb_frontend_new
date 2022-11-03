import React, { useState, useEffect } from 'react';
import AuthLayout from '../Layout/AuthLayout';
import { API_URL } from '../utils/url';
import {
	Button,
	FormControl,
	FormLabel,
	Input,
	useToast,
	VStack,
	Text,
	NumberInput,
	NumberInputField,
	InputRightElement,
	InputGroup,
} from '@chakra-ui/react';
import { ArrowBackIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = ({ match }) => {
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		password1: '',
		password2: '',
		token: '',
		textChange: 'Submit',
	});
	const navigate = useNavigate();
	const { password1, password2, textChange, token } = formData;

	useEffect(() => {
		let token = localStorage.getItem('token');
		console.log('reset token', token);
		if (token) {
			setFormData({ ...formData, token });
		}
	}, []);
	const handleChange = (text) => (e) => {
		setFormData({ ...formData, [text]: e.target.value });
	};
	const handleSubmit = (e) => {
		console.log(password1, password2);
		e.preventDefault();
		if (password1 === password2 && password1 && password2) {
			setLoading(true);
			setFormData({ ...formData, textChange: 'Submitting' });
			axios
				.put(`${API_URL}/resetpassword`, {
					newPassword: password1,
					resetPasswordLink: token,
				})
				.then((res) => {
					console.log(res.data.message);
					setFormData({
						...formData,
						password1: '',
						password2: '',
					});
					toast.success(res.data.message);
					setTimeout(() => {
						setLoading(false);
						navigate('/login');
					}, 3000);
				})
				.catch((err) => {
					toast.error('Something is wrong try again');
					setLoading(false);
				});
		} else {
			toast.error("Passwords don't matches");
			setLoading(false);
		}
	};
	return (
		<div>
			<ToastContainer />

			<AuthLayout>
				<Text fontSize='large' textAlign='center' color='gray.500' mb='8'>
					Reset password
				</Text>

				<form onSubmit={handleSubmit}>
					<VStack spacing='5' justify='space-between'>
						<FormControl isRequired>
							<InputGroup>
								<Input
									type='password'
									placeholder='New password'
									onChange={handleChange('password1')}
									value={password1}
								/>
								<InputRightElement h={'full'}>
									<Button variant={'ghost'} onClick={() => setShowPassword((showPassword) => !showPassword)}>
										{showPassword ? <ViewIcon /> : <ViewOffIcon />}
									</Button>
								</InputRightElement>
							</InputGroup>
						</FormControl>
						<FormControl isRequired>
							<InputGroup>
								<Input
									type='password'
									placeholder='Confirm password'
									onChange={handleChange('password2')}
									value={password2}
								/>
								<InputRightElement h={'full'}>
									<Button variant={'ghost'} onClick={() => setShowPassword((showPassword) => !showPassword)}>
										{showPassword ? <ViewIcon /> : <ViewOffIcon />}
									</Button>
								</InputRightElement>
							</InputGroup>
						</FormControl>

						<Button isLoading={loading} colorScheme='teal' size='md' w='100%' d='block' type='submit'>
							{textChange}
						</Button>
					</VStack>
				</form>
			</AuthLayout>
		</div>
	);
};

export default ResetPassword;
