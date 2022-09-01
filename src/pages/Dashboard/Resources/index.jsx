import React, { useState, useRef } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { API_URL } from '../../../utils/url';
import {
	Button,
	Flex,
	Box,
	Spacer,
	Heading,
	useDisclosure,
	Tabs,
	TabList,
	TabPanels,
	Tab,
	TabPanel,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Input,
} from '@chakra-ui/react';

// import { AddResourceAction } from '../../../redux/actions/resources/resources.action';
import Dashboard from '../';
import ShowAllFiles from './ShowAllFIles/';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// const fileData =
const Resource = (props) => {
	const [state, setState] = useState({
		title: '',
	});
	const [isNext, setIsNext] = useState(false);
	const [isNext2, setIsNext2] = useState(false);
	const [tempState, SetTempState] = useState([]);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [file, setFile] = useState(null); // state for storing actual image
	const [previewSrc, setPreviewSrc] = useState(''); // state for storing previewImage
	const [errorMsg, setErrorMsg] = useState('');
	const [isPreviewAvailable, setIsPreviewAvailable] = useState(false); // state to show preview only for images
	const dropRef = useRef(); // React ref for managing the hover state of droppable area

	const handleInputChange = (event) => {
		setState({
			...state,
			[event.target.name]: event.target.value,
		});
	};

	const onDrop = (files) => {
		const [uploadedFile] = files;
		setFile(uploadedFile);

		const fileReader = new FileReader();
		fileReader.onload = () => {
			setPreviewSrc(fileReader.result);
		};
		fileReader.readAsDataURL(uploadedFile);
		setIsPreviewAvailable(uploadedFile.name.match(/\.(jpeg|jpg|png)$/));
		dropRef.current.style.border = '2px dashed #e9ebeb';
	};

	const updateBorder = (dragState) => {
		if (dragState === 'over') {
			dropRef.current.style.border = '2px solid #000';
		} else if (dragState === 'leave') {
			dropRef.current.style.border = '2px dashed #e9ebeb';
		}
	};

	const handleOnSubmit = async (event) => {
		event.preventDefault();
		try {
			const { title } = state;
			if (title.trim() !== '') {
				if (file) {
					const formData = new FormData();
					formData.append('file', file);
					formData.append('title', title);

					setErrorMsg('');
					await axios.post(`${API_URL}/add-resource`, formData, {
						headers: {
							'Content-Type': 'multipart/form-data',
						},
					});
					onClose();
					props.history.push('/resources');
					// navigate('/resources');
				} else {
					setErrorMsg('Please select a file to add.');
				}
			} else {
				setErrorMsg('Please enter all the field values.');
			}
		} catch (error) {
			error.response && setErrorMsg(error.response.data);
		}
	};

	// const onChangeHandler = (e) => {
	// 	e.target.name !== 'resourceFile'
	// 		? SetResource({ ...resource, [e.target.name]: e.target.value })
	// 		: SetResource({ ...resource, [e.target.name]: e.target.files[0] });
	// };
	// const onHandleClickFile = () => {
	// 	SetResource({ file: 'DUMMY.TXT' });
	// 	setIsNext(!isNext);
	// };
	// const onHandleClickLink = () => {
	// 	SetResource({ file: resource.title });
	// 	setIsNext2(!isNext2);
	// };
	// const onHandleSubmit = (e) => {
	// 	e.preventDefault();
	// 	SetResource({ file: resource.link });
	// 	let res = {
	// 		title: resource.title,
	// 		file: resource.file,
	// 		link: resource.link,
	// 	};
	// 	SetTempState([...tempState, res]);
	// 	onClose();
	// };

	console.log('TEMP state', tempState);
	return (
		<Dashboard>
			<Flex minWidth='max-content' alignItems='center' gap='2'>
				<Box p='2'>
					<Heading size='lg'>Resources</Heading>
				</Box>
				<Spacer />
				<Button onClick={onOpen} colorScheme='blue'>
					Add resources
				</Button>
			</Flex>
			<form onSubmit={handleOnSubmit}>
				<Modal isOpen={isOpen} size='xs' onClose={onClose}>
					<ModalOverlay />
					<ModalContent>
						<Tabs>
							<TabList>
								<Tab>Upload</Tab>
								<Tab>Add link</Tab>
							</TabList>

							<TabPanels>
								{!isNext ? (
									<TabPanel>
										{/* <input
											type='file'
											id='myfile'
											name='resourceFile'
											value={resource.file}
											onChange={handleInputChange}
										/> */}
										{errorMsg && <p className='errorMsg'>{errorMsg}</p>}
										<Box border>
											{' '}
											<Dropzone
												onDrop={onDrop}
												onDragEnter={() => updateBorder('over')}
												onDragLeave={() => updateBorder('leave')}
											>
												{({ getRootProps, getInputProps }) => (
													<div {...getRootProps({ className: 'drop-zone' })} ref={dropRef}>
														<input {...getInputProps()} />
														<p style={{ border: '2px dashed grey', padding: '16px' }}>
															Drag OR click here to select a file
														</p>
														{file && (
															<div>
																<strong>Selected file:</strong> {file.name}
															</div>
														)}
													</div>
												)}
											</Dropzone>
										</Box>
										<Button colorScheme='teal' onClick={() => setIsNext(!isNext)} mt={5} ml={56}>
											Next
										</Button>
									</TabPanel>
								) : (
									<TabPanel>
										<Input
											placeholder='Resource title'
											type='text'
											name='title'
											value={state.title || ''}
											onChange={handleInputChange}
										/>
										<Button colorScheme='teal' onClick={handleOnSubmit} mt={5} ml={40}>
											Add resource
										</Button>
									</TabPanel>
								)}
								{!isNext2 ? (
									<TabPanel>
										<Input placeholder='Paste a link' name='link' />
										<Button colorScheme='teal' mt={5} ml={56}>
											Next
										</Button>
									</TabPanel>
								) : (
									<TabPanel>
										<Input placeholder='Resource title' name='title' />
										<Button colorScheme='teal' mt={5} ml={56} onClick={handleOnSubmit}>
											Add resource
										</Button>
									</TabPanel>
								)}
							</TabPanels>
						</Tabs>
					</ModalContent>
				</Modal>
			</form>
			<ShowAllFiles />
		</Dashboard>
	);
};

export default Resource;
