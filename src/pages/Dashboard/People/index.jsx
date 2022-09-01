import React, { useState, useEffect } from 'react';
import Dashboard from '../';
import axios from 'axios';
import { API_URL } from '../../../utils/url';
import {
	Text,
	Select,
	Menu,
	MenuList,
	MenuButton,
	MenuItem,
	Button,
	Modal,
	ModalContent,
	Input,
	useDisclosure,
	ModalBody,
	FormControl,
	ModalCloseButton,
	ModalOverlay,
	ModalHeader,
	ModalFooter,
	FormLabel,
	Divider,
} from '@chakra-ui/react';
import { QuestionIcon, ChevronDownIcon } from '@chakra-ui/icons';
const People = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [gotorole, seTGoToRole] = useState(false);
	const [role, setRole] = useState([]);

	const fetchData = async () => {
		const { data } = await axios.get(`${API_URL}/get-all-role`);
		setRole(data?.data.allRoles);
	};
	console.log('Role data', role);
	useEffect(() => {
		fetchData();
	}, []);
	return (
		<Dashboard>
			<Button colorScheme='blue' onClick={onOpen}>
				Add People
			</Button>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader size='xl'>Add Person</ModalHeader>
					<Text ml={6} mt={-3} mb={5} size={10}>
						This won't sent an invite, you can do that later
					</Text>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<FormControl>
							<FormLabel>Full name</FormLabel>
							<Input placeholder='First name' />
						</FormControl>

						<FormControl mt={4}>
							<FormLabel>Email</FormLabel>
							<Input placeholder='Last name' type='email' />
						</FormControl>

						<FormControl mt={4}>
							<FormLabel>Role</FormLabel>
							{/* <Select placeholder='Role'>
								{role?.map((item) => {
									return (
										<option value={item.name} key={item.id}>
											{item.name}
										</option>
									);
								})}
								<Divider />
								<option onClick={() => seTGoToRole(!gotorole)}>
									Add role <QuestionIcon color='red.500' />
								</option>
							</Select> */}

							<Menu>
								<MenuButton as={Button} rightIcon={<ChevronDownIcon />} w='100%'>
									Roles
								</MenuButton>
								<MenuList>
									{role?.map((item) => {
										return <MenuItem key={item.id}>{item.name}</MenuItem>;
									})}
									<Divider />
									<MenuItem onClick={() => seTGoToRole(!gotorole)}>
										Add role <QuestionIcon ml={2} />
									</MenuItem>
								</MenuList>
							</Menu>
						</FormControl>
					</ModalBody>

					<ModalFooter>
						<Button colorScheme='blue' mr={3}>
							Save
						</Button>
						<Button onClick={onClose}>Cancel</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>

			{gotorole ? (
				<Modal isOpen={isOpen} onClose={onClose}>
					<ModalOverlay />
					<ModalContent>
						<ModalHeader size='xl'>Add role</ModalHeader>
						<Text ml={6} mt={-3} mb={5} size={10}>
							This won't sent an invite, you can do that later
						</Text>
						<ModalCloseButton onClick={() => seTGoToRole(!gotorole)} />
						<ModalBody pb={6}>
							<FormControl>
								<FormLabel>Role Name</FormLabel>
								<Input placeholder='First name' />
							</FormControl>

							<FormControl mt={4}>
								<FormLabel>Role access</FormLabel>
								<Input placeholder='Last name' type='email' />
							</FormControl>
						</ModalBody>

						<ModalFooter>
							<Button colorScheme='blue' mr={3} onClick={() => seTGoToRole(!gotorole)}>
								Done
							</Button>
						</ModalFooter>
					</ModalContent>
				</Modal>
			) : (
				''
			)}
		</Dashboard>
	);
};

export default People;
