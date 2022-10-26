import React, { useState } from 'react';
import { Box, Flex, Image, Text, Spinner, useMediaQuery } from '@chakra-ui/react';

const AuthLayout = ({ children }) => {
	const [isNotSmallerScreen] = useMediaQuery('(min-width:600px)');
	const [fetching, setFetching] = useState(false);
	return (
		<div>
			<Flex flexWrap='wrap' h='100vh' bg='gray.100' alignItems='center' justifyContent='center' flexDirection='column'>
				{fetching ? (
					<Spinner />
				) : (
					<>
						<Box p='6' m='5' rounded='5' bg='white' w={isNotSmallerScreen ? '450px' : '400px'} shadow='xl'>
							{children}
						</Box>
					</>
				)}
			</Flex>
		</div>
	);
};

export default AuthLayout;
