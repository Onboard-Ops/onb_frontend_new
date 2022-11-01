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
import React, { useEffect, useState } from 'react';
import AuthLayout from '../Layout/AuthLayout';
import { useNavigate } from 'react-router-dom';

//Redux Imports
import { EmailVerificationAction } from '../redux/actions/auth/auth.action';
import { useDispatch, useSelector } from 'react-redux';

export default function Verification() {
	const [otp, SetOtp] = useState('');
	const dispatch = useDispatch();
	const userData = useSelector((state) => state.auth);
	const toast = useToast();
	const navigate = useNavigate();

	const onChangeHandler = (e) => {
		SetOtp((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const onHandleSubmit = (event) => {
		event.preventDefault();
		const newOtp = parseInt(otp.otp);
		const updatedUserData = userData?.user?._user ? userData?.user?._user : userData?.user;
		dispatch(EmailVerificationAction(newOtp, updatedUserData, navigate));
	};
	console.log('User data', userData?.user);
	if (userData?.error) {
		toast({
			title: userData?.error,
			status: 'error',
			isClosable: true,
		});
	}
	return (
		<AuthLayout>
			<Text fontSize='large' textAlign='center' color='gray.500' mb='8'>
				Please enter the verification OTP you have received in your email
			</Text>
			<form onSubmit={onHandleSubmit}>
				<VStack spacing='5' justify='space-between'>
					<FormControl isRequired>
						{/* <FormLabel htmlFor='username'>Email</FormLabel> */}
						<NumberInput>
							<NumberInputField
								size='lg'
								id='otp'
								placeholder='Verification OTP'
								name='otp'
								type='number'
								value={otp}
								onChange={onChangeHandler}
							/>
						</NumberInput>
					</FormControl>

					<Button isLoading={userData?.isVeryfying} colorScheme='teal' size='md' w='100%' d='block' type='submit'>
						Verify
					</Button>
				</VStack>
			</form>
		</AuthLayout>
	);
}
