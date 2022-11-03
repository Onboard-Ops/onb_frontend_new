import React, { useState } from 'react';
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
} from '@chakra-ui/react';
import AuthLayout from '../Layout/AuthLayout';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

const ForgetPassword = ({ history }) => {
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		email: '',
		textChange: 'Submit',
	});
	const { email, textChange } = formData;
	const handleChange = (text) => (e) => {
		setFormData({ ...formData, [text]: e.target.value });
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		if (email) {
			setLoading(true);
			setFormData({ ...formData, textChange: 'Submitting' });
			axios
				.put(`${API_URL}/forgotpassword`, {
					email,
				})
				.then((res) => {
					console.log('Data from forgotpassword', res?.data?.token);
					setFormData({
						...formData,
						email: '',
					});
					localStorage.setItem('token', res?.data?.token);
					toast.success(`Please check your email`);
					setLoading(false);
				})
				.catch((err) => {
					console.log(err.response);
					toast.error(err?.message);
					setLoading(false);
				});
		} else {
			toast.error('Please fill all fields');
			setLoading(false);
		}
	};
	return (
		<div>
			<ToastContainer />
			<AuthLayout>
				<Text fontSize='large' textAlign='center' color='gray.500' mb='8'>
					Forgot Password
				</Text>
				<Text fontSize='medium' textAlign='center' color='gray.500' mb='8'>
					Enter your email ID here
				</Text>
				<form onSubmit={handleSubmit}>
					<VStack spacing='5' justify='space-between'>
						<FormControl isRequired>
							{/* <FormLabel htmlFor='username'>Email</FormLabel> */}
							<Input type='email' placeholder='Email' onChange={handleChange('email')} value={email} />
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

export default ForgetPassword;
