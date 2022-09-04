import React, { useRef, useState } from 'react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { FcGoogle } from 'react-icons/fc';
import {
	Tabs,
	Text,
	Button,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	FormControl,
	FormLabel,
	Input,
	Divider,
	useDisclosure,
} from '@chakra-ui/react';
import { DatePicker } from 'chakra-ui-date-input';
import { Link } from 'react-router-dom';

const Frontpage = () => {
	const [isNext, setIsNext] = useState(false);
	const [isLogOpen, setIsLogOpen] = useState(false);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const initialRef = React.useRef();
	const finalRef = React.useRef();

	return (
		<div>
			<Tabs align='end'>
				<Button colorScheme='teal' variant='solid' mt={4} mr={4}>
					<Link to='/login'>Log in</Link>
				</Button>
				<Button onClick={onOpen} colorScheme='teal' variant='outline' mt={4} mr={4}>
					Create project
				</Button>
			</Tabs>

			<Modal initialFocusRef={initialRef} finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				{!isNext ? (
					<ModalContent>
						<ModalHeader fontSize={28}>Start Your First Project</ModalHeader>
						<ModalCloseButton />
						<ModalBody pb={5}>
							<FormControl display='flex'>
								<FormLabel>Customer Name</FormLabel>
								<Input ref={initialRef} placeholder='Name' />
							</FormControl>

							<FormControl mt={4} display='flex'>
								<FormLabel>Project kickoff</FormLabel>
								<Input type='date' id='start' name='trip-start' />
							</FormControl>
						</ModalBody>
						<ModalFooter>
							<Button colorScheme='teal' onClick={() => setIsNext(!isNext)}>
								Next
							</Button>
						</ModalFooter>
					</ModalContent>
				) : (
					<ModalContent>
						<ArrowBackIcon onClick={() => setIsNext(!isNext)} w={6} h={6} mt={4} ml={4} />
						<ModalHeader fontSize={28}>Choose a template</ModalHeader>
						<ModalCloseButton />
						<ModalBody pb={6}>
							<Button>Customer onboarding for B2B software</Button>
						</ModalBody>
						<ModalBody pb={6} mt={16}>
							<Button colorScheme='teal' variant='outline' onClick={() => setIsLogOpen(!isLogOpen)}>
								Create project using template
							</Button>
						</ModalBody>
						{/* <ModalFooter></ModalFooter> */}
					</ModalContent>
				)}
			</Modal>

			{isLogOpen ? (
				<Modal isOpen={isOpen} onClose={onClose}>
					<ModalContent>
						<ArrowBackIcon onClick={() => setIsLogOpen(!isLogOpen)} w={6} h={6} mt={4} ml={4} />
						<ModalHeader fontSize={28}>Howdy! It's time to Sign Up</ModalHeader>
						<ModalCloseButton />
						<ModalBody pb={5}>
							<FormControl>
								<Input ref={initialRef} placeholder='Full Name' />
							</FormControl>
							<FormControl mt={5}>
								<Input ref={initialRef} placeholder='Email' />
							</FormControl>
							<FormControl mt={5}>
								<Input ref={initialRef} placeholder='Password' />
							</FormControl>
						</ModalBody>
						<ModalFooter>
							<Button colorScheme='blue' w='100%'>
								Sign up
							</Button>
						</ModalFooter>
						<Divider />
						<ModalFooter>
							<Button colorScheme='blue' w='100%' variant='outline'>
								<FcGoogle size={28} />
								<Text ml={6}>Sign in with Google</Text>
							</Button>
						</ModalFooter>
					</ModalContent>
				</Modal>
			) : (
				''
			)}
		</div>
	);
};

export default Frontpage;
