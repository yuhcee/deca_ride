import React, { useState, useEffect } from 'react';
import './Drivers.css';
import avatar from '../Dashboard/avatar.png';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

const Driver = () => {
  const [drivers, setDriver] = useState([]);
  const [driverState, setDriverState] = useState([]);

  useEffect(() => {
    axios.get('/api/drivers').then(({ data }) => {
      const drivers = Array.from(data.data, driver => driver);
      setDriver(drivers);
      setDriverState(drivers[0]);
      console.log(drivers);
    });
  }, []);

  const handleDriverClick = e => {
    const driverDetails = drivers.filter(
      driver => driver.driverID === e.target.id,
    );
    setDriverState(driverDetails[0]);
    console.log(driverDetails);
  };

  function getAgeString(dob) {
    const now = new Date().getFullYear();
    const ageString = now - new Date(dob).getFullYear();
    return `${ageString} Years Old`;
  }

  return (
    <div className="dashboard-view">
      <div className="aside-view">
        <h3>Dashboard</h3>

        {drivers.map(driver => (
          <div
            key={driver.driverID}
            id={driver.driverID}
            onClick={handleDriverClick}
            className="views"
          >
            <NavLink
              activeStyle="active"
              to={driver.driverID}
              id={driver.driverID}
            >
              {' '}
              {driver.name}
            </NavLink>
          </div>
        ))}
      </div>
      {driverState !== undefined && (
        <div className="main-view">
          <div className="dcharts">
            <div className="dpersonal">
              <h2> Personal Details</h2>
              <img src={avatar} alt="avatar" className="avatar" />
              <p>Name: {driverState.name}</p>

              <p>
                Date of Birth:{' '}
                {driverState.DOB !== undefined && driverState.DOB.slice(0, 10)}
              </p>
              <p>Age: {getAgeString(driverState.DOB)}</p>
              <p>Gender: {driverState.gender}</p>
            </div>

            <div className="dcontact">
              <h2>Contact Information</h2>
              <p>Email: {driverState.email}</p>
              <p>Address: {driverState.address}</p>
              <p>Phone Number: {driverState.phone}</p>
            </div>
          </div>

          <div className="dinfo">
            <h2>Company Information</h2>
            <p>driverID : {driverState.driverID}</p>
            <p>Agent: {driverState.agent}</p>
            <p>
              Number of Vehicle:{' '}
              {driverState.vehicleID !== undefined &&
                driverState.vehicleID.length}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Driver;
