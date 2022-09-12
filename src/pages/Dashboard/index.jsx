import React, { ReactNode } from 'react';
import {
	IconButton,
	Avatar,
	Box,
	CloseButton,
	Flex,
	HStack,
	VStack,
	Icon,
	useColorModeValue,
	Link,
	Drawer,
	DrawerContent,
	Text,
	useDisclosure,
	Menu,
	MenuButton,
	MenuDivider,
	MenuItem,
	MenuList,
} from '@chakra-ui/react';
import { FiEyeOff, FiMenu, FiLogOut } from 'react-icons/fi';
import { BsPersonFill } from 'react-icons/bs';
import { signout } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const LinkItems = [
	{ name: 'Overview', icon: '', path: '/home' },
	{ name: 'TO DO', icon: '', path: '/people' },
	// { name: 'People', icon: '', path: '/people' },
	{ name: 'Resources', icon: '', path: '/resources' },
	{ name: 'Customer Info', icon: <FiEyeOff />, path: '/people' },
];

export default function Dashboard({ children }) {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<Box minH='100vh' bg={useColorModeValue('gray.100', 'gray.900')}>
			<SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
			<Drawer
				autoFocus={false}
				isOpen={isOpen}
				placement='left'
				onClose={onClose}
				returnFocusOnClose={false}
				onOverlayClick={onClose}
				size='full'
			>
				<DrawerContent>
					<SidebarContent onClose={onClose} />
				</DrawerContent>
			</Drawer>

			{/* mobilenav */}
			<MobileNav onOpen={onOpen} />
			<Box ml={{ base: 0, md: 60 }} p='4'>
				{children}
			</Box>
		</Box>
	);
}

const SidebarContent = ({ onClose, ...rest }) => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.auth);
	const navigate = useNavigate();
	const handleSignOut = () => {
		dispatch(signout());
		navigate('/', { replace: true });
	};
	return (
		<Box
			transition='3s ease'
			bg={useColorModeValue('#536593', 'gray.900')}
			borderRight='1px'
			borderRightColor={useColorModeValue('gray.200', 'gray.700')}
			w={{ base: 'full', md: 60 }}
			pos='fixed'
			h='full'
			{...rest}
		>
			<Flex h='20' alignItems='center' mx='8' justifyContent='space-between'>
				<Text fontSize='2xl' fontFamily='monospace' fontWeight='bold' color='white'>
					Twilio
				</Text>
				{/* <MenuDivider /> */}
			</Flex>

			{LinkItems.map((link) =>
				link.name != 'TO DO' && link.name != 'Customer Info' ? (
					<NavItem key={link.name} to={link.path} color='white'>
						{link.name}
						{link.icon}
					</NavItem>
				) : link.name === 'Customer Info' ? (
					<NavItem key={link.name} to={link.path} color='white'>
						<Text mr={12}>{link.name}</Text>
						{link.icon}
					</NavItem>
				) : (
					<NavItem key={link.name} to={link.path} color='white'>
						{link.name}
						<Avatar name='5' bg='red.500' size='xs' ml={24} />
					</NavItem>
				)
			)}

			<NavItemAction color='white' mt={40}>
				<BsPersonFill />
				<Text ml={2}>Profile</Text>
			</NavItemAction>
			<NavItemAction color='white' onClick={handleSignOut}>
				<FiLogOut />
				<Text ml={2}>Sign out</Text>
			</NavItemAction>
		</Box>
	);
};

const NavItem = ({ icon, to, children, ...rest }) => {
	return (
		<Link href={to} style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
			<Flex
				align='center'
				p='4'
				mx='4'
				borderRadius='lg'
				role='group'
				cursor='pointer'
				_hover={{
					bg: 'white',
					color: 'blue',
				}}
				{...rest}
			>
				{icon && (
					<Icon
						mr='4'
						fontSize='16'
						_groupHover={{
							color: 'blue',
						}}
						as={icon}
					/>
				)}
				{children}
			</Flex>
		</Link>
	);
};

const NavItemAction = ({ icon, to, children, ...rest }) => {
	return (
		<Link href={to} style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
			<Flex
				align='center'
				p='4'
				mx='4'
				borderRadius='lg'
				role='group'
				cursor='pointer'
				_hover={{
					bg: 'white',
					color: 'blue',
				}}
				{...rest}
			>
				{icon && (
					<Icon
						mr='4'
						fontSize='16'
						_groupHover={{
							color: 'blue',
						}}
						as={icon}
					/>
				)}
				{children}
			</Flex>
		</Link>
	);
};

const MobileNav = ({ onOpen, ...rest }) => {
	return (
		<Flex
			ml={{ base: 0, md: 60 }}
			px={{ base: 4, md: 4 }}
			height='10'
			alignItems='center'
			justifyContent={{ base: 'space-between', md: 'flex-end' }}
			{...rest}
		>
			<IconButton
				display={{ base: 'flex', md: 'none' }}
				onClick={onOpen}
				variant='outline'
				aria-label='open menu'
				icon={<FiMenu />}
			/>

			<Text display={{ base: 'flex', md: 'none' }} fontSize='2xl' fontFamily='monospace' fontWeight='bold'>
				Twilio
			</Text>
		</Flex>
	);
};
