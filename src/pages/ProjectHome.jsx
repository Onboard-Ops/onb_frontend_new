import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllProjectsByCurrentUser, AddProjectAction } from '../redux/actions';
import { ArrowBackIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Link, useNavigate } from 'react-router-dom';
import {
	Tabs,
	Text,
	Box,
	Button,
	Modal,
	useToast,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	InputRightElement,
	InputGroup,
	FormControl,
	FormLabel,
	Input,
	Divider,
	useDisclosure,
} from '@chakra-ui/react';
const ProjectHome = () => {
	const [isNext, setIsNext] = useState(false);
	const [allProjects, setAllProjects] = useState([true]);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const projectStateData = useSelector((state) => state.project);
	const dispatch = useDispatch();
	const initialRef = useRef();
	const finalRef = useRef();
	const navigate = useNavigate();
	const [project, setProject] = useState({
		title: '',
		kickOff: '',
		magic_link: '',
		error: '',
	});
	const onChangeHandler = (e) => {
		setProject((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const onHandleSubmit = async (event) => {
		event.preventDefault();
		let projectData = {
			title: project.title,
			kickOff: project.kickOff,
		};
		dispatch(AddProjectAction(projectData));
		onClose();
	};
	const onNavigate = (item) => {
		navigate(`/dashboard/${item?.magic_link}`, { replace: true });
	};
	useEffect(() => {
		dispatch(GetAllProjectsByCurrentUser());
	}, [projectStateData?.allProjects]);

	return (
		<>
			<Tabs align='end' display='flex' justifyContent='space-between'>
				<Text mt={4} ml={20} fontSize='2xl' as='b'>
					My Projects
				</Text>
				<Button onClick={onOpen} colorScheme='linkedin' variant='outline' mt={4} mr={20} mb={4}>
					Create project
				</Button>
			</Tabs>
			<Divider />
			<Modal initialFocusRef={initialRef} finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				{!isNext ? (
					<ModalContent>
						<ModalHeader fontSize={28}>Start Your First Project</ModalHeader>
						<ModalCloseButton />
						<ModalBody pb={5}>
							<FormControl>
								<FormLabel>Customer Name</FormLabel>
								<Input
									ref={initialRef}
									placeholder='Title'
									id='title'
									onChange={onChangeHandler}
									name='title'
									value={project.title}
								/>
							</FormControl>

							<FormControl mt={4}>
								<FormLabel>Project kickoff</FormLabel>
								<Input type='date' id='kickOff' onChange={onChangeHandler} name='kickOff' value={project.kickOff} />
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
							<Button colorScheme='teal' variant='outline' onClick={onHandleSubmit}>
								Create project using template
							</Button>
						</ModalBody>
						{/* <ModalFooter></ModalFooter> */}
					</ModalContent>
				)}
			</Modal>
			{projectStateData?.totalProjects === 0 ? (
				'No projects found'
			) : (
				<>
					{projectStateData?.allProjects?.allProjectsByCurrentUser?.map((item) => {
						return (
							<Box
								display='flex'
								mt={4}
								p={4}
								color='vlue'
								justifyContent='space-between'
								_hover={{
									background: '#b2bcd6',
									color: 'white',
								}}
							>
								<Link to={`/dashboard/${item?.magic_link}`}>
									<Text ml={16}>{item.title}</Text> <Text mr={16}>{item.dueDate}</Text>
								</Link>
							</Box>
						);
					})}
				</>
			)}
		</>
	);
};

export default ProjectHome;
