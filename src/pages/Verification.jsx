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
import OtpInput from 'react-otp-input';
import AuthLayout from '../Layout/AuthLayout';
import { useNavigate } from 'react-router-dom';

//Redux Imports
import { EmailVerificationAction } from '../redux/actions/auth/auth.action';
import { useDispatch, useSelector } from 'react-redux';

export default function Verification() {
	const [otp, SetOtp] = useState('');
	const dispatch = useDispatch();
	// const userData = useSelector((state) => state.auth);
	const toast = useToast();
	const navigate = useNavigate();
	const userData = JSON.parse(localStorage.getItem('user'));
	const onChangeHandler = (otp) => SetOtp(otp);
	const onHandleSubmit = (event) => {
		event.preventDefault();
		const newOtp = parseInt(otp);
		const userId = userData?._id;
		dispatch(EmailVerificationAction(newOtp, userId, navigate));
	};

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
					{/* <FormControl isRequired>
						<FormLabel htmlFor='username'>OTP</FormLabel>
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
					</FormControl> */}
					<OtpInput
						id='otp'
						value={otp}
						name='otp'
						onChange={onChangeHandler}
						numInputs={6}
						separator={<span style={{ width: '8px' }}></span>}
						isInputNum={true}
						shouldAutoFocus={true}
						inputStyle={{
							border: '1px solid transparent',
							borderRadius: '8px',
							width: '54px',
							height: '54px',
							fontSize: '12px',
							color: '#000',
							fontWeight: '400',
							caretColor: 'blue',
						}}
						focusStyle={{
							border: '1px solid #CFD3DB',
							outline: 'none',
						}}
					/>
					<Button isLoading={userData?.isVeryfying} colorScheme='linkedin' size='md' w='100%' d='block' type='submit'>
						Verify
					</Button>
				</VStack>
			</form>
		</AuthLayout>
	);
}
