import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { AiOutlineControl } from 'react-icons/ai';
import { IoTrainOutline } from 'react-icons/io5';

function NavComponent() {

	const history = useHistory();

	return (
		<SideNav
			onSelect={(selected) => {
				history.push(`/${selected}`);
			}}
			style={{ background: "#1C4E80" }}
		>
			<SideNav.Toggle />
			<SideNav.Nav defaultSelected="CTC">
				<NavItem eventKey="CTC">
						<NavIcon>
							<AiOutlineControl size="1.75em" />
						</NavIcon>
						<NavText>
							CTC Dashboard
						</NavText>
				</NavItem>
				<NavItem eventKey="TrainController">
					<NavIcon>
						<IoTrainOutline size="1.75em" />
					</NavIcon>
					<NavText>
						Train Control
					</NavText>
				</NavItem>
			</SideNav.Nav>
		</SideNav>
	);
}

export default NavComponent