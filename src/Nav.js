import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { AiOutlineControl } from 'react-icons/ai';
import { IoTrainOutline } from 'react-icons/io5';
import { BiSitemap } from 'react-icons/bi';
import { GiRailway } from 'react-icons/gi';
import { GiRadarDish } from 'react-icons/gi';

function NavComponent() {
  const history = useHistory();

  return (
    <SideNav
      onSelect={(selected) => {
        history.push(`/${selected}`);
      }}
      style={{
        background: '#1C4E80',
        boxShadow: '0px 0px 25px rgba(0,0,0,.5)',
      }}
    >
      <SideNav.Toggle />
      <SideNav.Nav defaultSelected='CTC'>
        <NavItem eventKey='CTC'>
          <NavIcon>
            <BiSitemap size='1.75em' />
          </NavIcon>
          <NavText>CTC Dashboard</NavText>
        </NavItem>
        <NavItem eventKey='WaysideController'>
          <NavIcon>
            <GiRadarDish size='1.75em' />
          </NavIcon>
          <NavText>Wayside Controller</NavText>
        </NavItem>
        <NavItem eventKey='TrackModel'>
          <NavIcon>
            <GiRailway size='1.75em' />
          </NavIcon>
          <NavText>Track Model</NavText>
        </NavItem>
        <NavItem eventKey='TrainModel'>
          <NavIcon>
            <IoTrainOutline size='1.75em' />
          </NavIcon>
          <NavText>Train Model</NavText>
        </NavItem>
        <NavItem eventKey='TrainControllerDriver'>
          <NavIcon>
            <AiOutlineControl size='1.75em' />
          </NavIcon>
          <NavText>Train Controller (Driver)</NavText>
        </NavItem>
        <NavItem eventKey='TrainControllerEngineer'>
          <NavIcon>
            <AiOutlineControl size='1.75em' />
          </NavIcon>
          <NavText>Train Controller (Engineer)</NavText>
        </NavItem>
      </SideNav.Nav>
    </SideNav>
  );
}

export default NavComponent;
