import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDisclosure } from '@chakra-ui/react';
import { Modal as AntdModal, Select, Button } from 'antd';

const { confirm } = AntdModal;
const { Option } = Select;

const Settings = () => {
	const [showAccessModal, setshowAccessModal] = useState(false);
	const [owner, setOwner] = useState('');
	const people = useSelector((state) => state?.people?.people);
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<div>
			<Button onClick={setshowAccessModal(true)}>Change project admin</Button>
			<AntdModal
				title={<p style={{ fontSize: 25, textAlign: 'center' }}>Leave Project</p>}
				footer={null}
				open={showAccessModal}
				// onOk={handleOk}
				onCancel={() => setshowAccessModal(false)}
			>
				<p style={{ textAlign: 'center', color: '#929292' }}>
					In order to leave [Customer Name] project, you must give full control to someone else.
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
									return <Option value={ele?._id}>{ele?.fullName}</Option>;
								})}
						</Select>
					</div>
				</div>
				<div
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						marginTop: 30,
					}}
				>
					<Button className='button_outline'>Delete Account</Button>
					<Button className='button_outline_danger'>Leave Project</Button>
				</div>
			</AntdModal>
		</div>
	);
};

export default Settings;
