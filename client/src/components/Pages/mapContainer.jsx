import React, { Component } from 'react';
import Header from '../PageComponents/Header';
import styled from 'styled-components';
import Map from './map.jsx'
import Navbar from "../PageComponents/Navbar";

const Page = styled.div`
  display: inline-flex;
  align-items: flex-start;
  flex-direction: column;
  min-width: fit-content;
  height: 100%;
  width: 100%;
  background-color: #f3f3f3;
`;

class mapContainer extends Component {

	render() {
    return (
    	<div style={{display: 'flex', width:'100%'}} >
	      <Page>
        <div style={{ width: "100%" }}>
          <Navbar />
        </div>
		    <Map width={'1000px'} height={'300px'}/>
	      <div style={{padding:'250px'}}/>
		    </Page>
		  </div>

    );
  }
}

export default mapContainer;
