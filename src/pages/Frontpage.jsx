import React, { useRef, useState } from 'react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import {
	Tabs,
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
	useDisclosure,
} from '@chakra-ui/react';
import { DatePicker } from 'chakra-ui-date-input';
import { Link } from 'react-router-dom';

const Frontpage = () => {
	const [isNext, setIsNext] = useState(false);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const initialRef = React.useRef();
	const finalRef = React.useRef();

	return (
		<div>
			<Tabs align='end'>
				<Button colorScheme='teal' variant='solid' mt={4} mr={4}>
					<Link to='/signup'>Sign up</Link>
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
						<ModalBody pb={6}>
							<FormControl>
								<FormLabel>Customer Name</FormLabel>
								<Input ref={initialRef} placeholder='First name' />
							</FormControl>

							<FormControl mt={4}>
								<FormLabel>Project kickoff</FormLabel>
								<input type='date' id='start' name='trip-start' />
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
							<Button colorScheme='teal' variant='outline'>
								Create project using template
							</Button>
						</ModalBody>
						{/* <ModalFooter></ModalFooter> */}
					</ModalContent>
				)}
			</Modal>
		</div>
	);
};

export default Frontpage;
