import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	GetAllProjectsByCurrentUser,
	AddProjectAction,
	signout,
	LeaveProject,
	DeleteAccountAction,
} from '../redux/actions';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { Link, useNavigate } from 'react-router-dom';
import { Modal as AntdModal, Select } from 'antd';
import Loader from '../components/Loader';
import {
	Tabs,
	Text,
	Avatar,
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
	FormControl,
	FormLabel,
	Input,
	Divider,
	Stack,
	VStack,
	useDisclosure,
	Spinner,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	MenuItemOption,
	MenuGroup,
	MenuOptionGroup,
	MenuDivider,
} from '@chakra-ui/react';
import SideBar from '../Layout/SideBar/SideBar';
import dayjs from 'dayjs';
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { DashboardTypes } from '../redux/actionTypes';
import { DeleteProject } from '../redux/actions/dashboard/dashboard.action';
import { FetchPeopleApi } from '../redux/actions/people/people.action';
const { DASHBOARD_CURRENT_PROJECT, DASHBOARD_CURRENT_PROJECT_NAME } = DashboardTypes;

const { confirm } = AntdModal;
const { Option } = Select;

const ProjectHome = () => {
	const toast = useToast();
	const [isNext, setIsNext] = useState(false);
	const [err, setErr] = useState(false);
	const [projectID, setProjectID] = useState('');
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showLeaveModal, setShowLeaveModal] = useState(false);
	const [owner, setOwner] = useState('');
	const [allProjects, setAllProjects] = useState([true]);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const projectStateData = useSelector((state) => state.project);
	const projectState = useSelector((state) => state.project.projectApiCall);
	const people = useSelector((state) => state?.people?.people);
	const roles = useSelector((state) => state?.roles);
	const dispatch = useDispatch();
	const initialRef = useRef();
	const finalRef = useRef();
	const navigate = useNavigate();
	const [project, setProject] = useState({
		title: '',
		kickOff: '',
		error: '',
	});
	const onChangeHandler = (e) => {
		setErr(false);
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
		dispatch(GetAllProjectsByCurrentUser());
		onClose();
	};

	const handleSignOut = () => {
		dispatch(signout());
		navigate('/login', { replace: true });
	};
	const handleAccountDelete = () => {
		dispatch(DeleteAccountAction(navigate));
	};

	useEffect(() => {
		dispatch(GetAllProjectsByCurrentUser());
	}, []);

	useEffect(() => {
		if (projectState?.apiCalled) {
			toast({
				title: projectState?.title,
				status: projectState?.status,
				isClosable: true,
			});
		}
	}, [projectStateData?.projectApiCall]);

	const currentProjectOwner = JSON.parse(localStorage.getItem('user'));
	const currentProjectOwnerId = currentProjectOwner?._id ? currentProjectOwner?._id : currentProjectOwner?._user?._id;
	// console.log('currentProjectOwner?._id', typeof currentProjectOwnerId);
	// console.log('would be owner', typeof owner);
	const handleLeaveProject = () => {
		dispatch(LeaveProject(owner, currentProjectOwnerId, projectID));
	};

	const showDeleteConfirm = (projectID) => {
		confirm({
			title: 'Are you sure delete this project?',
			icon: <ExclamationCircleOutlined />,
			content: "This action can't be undo!",
			okText: 'Yes',
			okType: 'danger',
			cancelText: 'No',

			onOk() {
				dispatch(DeleteProject(projectID));
				console.log('OK');
			},

			onCancel() {
				console.log('Cancel');
			},
		});
	};
	// console.log('uiiinnn', projectStateData);
	return (
		<>
			<AntdModal
				title={<p style={{ fontSize: 25, textAlign: 'center' }}>Delete Project</p>}
				footer={null}
				open={showDeleteModal}
				// onOk={handleOk}
				onCancel={() => setShowDeleteModal(false)}
			>
				<p style={{ textAlign: 'center', color: '#929292' }}>
					Are you sure? This cannot be undone. Everyone will be notified that the project was deleted by you.
				</p>
				<div
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						marginTop: 30,
					}}
				>
					<Button className='button_outline' onClick={() => setShowLeaveModal(true)}>
						Leave Project
					</Button>
					<Button
						className='button_outline_danger'
						onClick={() => {
							showDeleteConfirm(projectID);
						}}
					>
						Delete Project
					</Button>
				</div>
			</AntdModal>
			<AntdModal
				title={<p style={{ fontSize: 25, textAlign: 'center' }}>Leave Project</p>}
				footer={null}
				open={showLeaveModal}
				// onOk={handleOk}
				onCancel={() => setShowLeaveModal(false)}
			>
				<p style={{ textAlign: 'center', color: '#929292' }}>
					In order to leave this project, you must give full control to someone else.
				</p>
				<div style={{ display: 'flex', padding: 30 }}>
					<div>
						<p style={{ fontSize: 18 }}>Role Name</p>
						<p style={{ fontSize: 18 }}>Assigned to</p>
					</div>
					<div style={{ marginLeft: 40, fontSize: 16 }}>
						<p>Point of contact</p>
						<Select style={{ width: 150 }} onChange={(value) => setOwner(value)} placeholder='Choose a person'>
							{people &&
								people.length > 0 &&
								people?.map((ele) => {
									return (
										<Option value={ele?._id} key={ele?._id}>
											{ele?.fullName}
										</Option>
									);
								})}
						</Select>
					</div>
				</div>
				<div
					style={{
						display: 'flex',
						justifyContent: 'flex-end',
						marginTop: 30,
					}}
				>
					{/* <Button
						className='button_outline'
						onClick={() => {
							DeleteAccountAction(navigate);
						}}
					>
						Delete Account x
					</Button> */}
					<Button className='button_outline_danger' onClick={() => handleLeaveProject()}>
						Leave Project
					</Button>
				</div>
			</AntdModal>
			{projectStateData?.projectLoading ? (
				<Spinner
					style={{ display: 'flex', justifyContent: 'center', margin: 'auto' }}
					thickness='4px'
					speed='0.65s'
					emptyColor='gray.200'
					color='blue.500'
					size='xl'
				/>
			) : (
				<>
					<Tabs align='end' display='flex' justifyContent='space-between'>
						<Text mt={4} ml={48} fontSize='2xl' as='b'>
							My Projects
						</Text>
						<Stack direction='row' align='center' mr={8}>
							<Button onClick={onOpen} colorScheme='linkedin' variant='outline' mt={4} mr={8} mb={4}>
								Create project
							</Button>
							{/* <Button colorScheme='linkedin' mr={16} variant='outline' onClick={handleSignOut}>
								Logout
							</Button> */}
							<Menu>
								<MenuButton as={Avatar} mr={8} src='https://joeschmoe.io/api/v1/random' />
								<MenuList mr={8}>
									<VStack mb={4}>
										<Avatar size='xl' mt={4} mb={4} name='Dan Abrahmov' src='https://joeschmoe.io/api/v1/random' />
										<Text mt={2} as='b'>
											{projectStateData?.allProjects?.owner?.fullName}
										</Text>
										<Text mt={4}>{projectStateData?.allProjects?.owner?.email}</Text>
									</VStack>
									<MenuGroup>
										<MenuItem>My Account</MenuItem>
										<MenuItem to='/settings'>Settings </MenuItem>
									</MenuGroup>
									<MenuDivider />
									<MenuGroup>
										<MenuItem color='blue' onClick={handleSignOut}>
											Logout
										</MenuItem>
									</MenuGroup>
									<MenuGroup>
										<MenuItem color='red' onClick={handleAccountDelete}>
											Delete Account
										</MenuItem>
									</MenuGroup>
								</MenuList>
							</Menu>
						</Stack>
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
										<FormLabel>Project Name *</FormLabel>
										<Input
											ref={initialRef}
											placeholder='Title'
											id='title'
											onChange={onChangeHandler}
											required
											name='title'
											value={project.title}
										/>
										{err && <p style={{ color: 'tomato' }}>This field is requied!</p>}
									</FormControl>

									<FormControl mt={4}>
										<FormLabel>Project kickoff</FormLabel>
										<Input type='date' id='kickOff' onChange={onChangeHandler} name='kickOff' value={project.kickOff} />
									</FormControl>
								</ModalBody>
								<ModalFooter>
									<Button
										colorScheme='teal'
										onClick={() => {
											if (project.title === '') {
												return setErr(true);
											}
											setIsNext(!isNext);
										}}
									>
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
									<Button>Blank Project</Button>
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
						<Text ml={46}>No projects found</Text>
					) : (
						<>
							{projectStateData?.allProjects?.allProjectsByCurrentUser?.map((item, index) => {
								return (
									<div
										key={index}
										style={{
											display: 'flex',
											justifyContent: 'center',
											alignItems: 'center',
										}}
									>
										{/* <Link
                        onClick={() => {
                          localStorage.setItem("currentProject", item?._id);
                          localStorage.setItem(
                            "currentProjectName",
                            item?.title
                          );
                          dispatch({
                            type: DASHBOARD_CURRENT_PROJECT_NAME,
                            payload: item?.title,
                          });
                          dispatch({
                            type: DASHBOARD_CURRENT_PROJECT,
                            payload: item?._id,
                          });
                        }}
                        to={`/overview/${item?.magic_link}/${item?._id}`}
                      > */}
										<Box
											borderRadius='lg'
											display='flex'
											mt={4}
											ml={52}
											p={4}
											w='70%'
											color='vlue'
											justifyContent='space-between'
											_hover={{
												background: '#b2bcd6',
												color: 'white',
											}}
											key={item._id}
										>
											<Text
												style={{ cursor: 'pointer' }}
												onClick={() => {
													localStorage.setItem('currentProject', item?._id);
													localStorage.setItem('currentProjectName', item?.title);
													dispatch({
														type: DASHBOARD_CURRENT_PROJECT_NAME,
														payload: item?.title,
													});
													dispatch({
														type: DASHBOARD_CURRENT_PROJECT,
														payload: item?._id,
													});
													navigate(`/overview/${item?.magic_link}/${item?._id}`);
												}}
											>
												{item.title}
											</Text>{' '}
											<Text>{item.owner?.fullName}</Text> <Text>{dayjs(item.dueDate).format('MM-DD-YYYY h:mm A')}</Text>
										</Box>
										<DeleteOutlined
											onClick={() => {
												setShowDeleteModal(true);
												setProjectID(item?._id);
												dispatch(FetchPeopleApi());
											}}
											style={{ fontSize: 18, marginTop: 10, marginLeft: 20 }}
										/>
										{/* </Link> */}
									</div>
								);
							})}
						</>
					)}
				</>
			)}
		</>
	);
};

export default ProjectHome;
