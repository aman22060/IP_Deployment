import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        <li style={{ display: 'outline', marginRight: '50px',marginTop: '10px' }}>
          <Link 
            to="/" 
            style={{
              display: 'inline-block', 
              padding: '10px 20px', 
              backgroundColor: '#007BFF', 
              color: '#fff', 
              textDecoration: 'none', 
              borderRadius: '5px', 
              textAlign: 'center', 
              cursor: 'pointer'
            }}
          >
            Dashboard
          </Link>
        </li>
        <li style={{ display: 'outline', marginRight: '50px', marginTop: '10px' }}>
          <Link 
            to="/team-member" 
            style={{
              display: 'inline-block', 
              padding: '10px 20px', 
              backgroundColor: '#28a745', 
              color: '#fff', 
              textDecoration: 'none', 
              borderRadius: '5px', 
              textAlign: 'center', 
              cursor: 'pointer'
            }}
          >
            Team Member
          </Link>
        </li>
        <li style={{ display: 'outline', marginRight: '50px', marginTop: '10px' }}>
          <Link 
            to="/talks" 
            style={{
              display: 'inline-block', 
              padding: '10px 20px', 
              backgroundColor: '#28a745', 
              color: '#fff', 
              textDecoration: 'none', 
              borderRadius: '5px', 
              textAlign: 'center', 
              cursor: 'pointer'
            }}
          >
            Talks Section
          </Link>
        </li>

        <li style={{ display: 'outline', marginRight: '50px', marginTop: '10px' }}>
          <Link 
            to="/newSection" 
            style={{
              display: 'inline-block', 
              padding: '10px 20px', 
              backgroundColor: '#28a745', 
              color: '#fff', 
              textDecoration: 'none', 
              borderRadius: '5px', 
              textAlign: 'center', 
              cursor: 'pointer'
            }}
          >
            News Section
          </Link>
        </li>
        <li style={{ display: 'outline', marginRight: '50px', marginTop: '10px' }}>
          <Link 
            to="/publication" 
            style={{
              display: 'inline-block', 
              padding: '10px 20px', 
              backgroundColor: '#28a745', 
              color: '#fff', 
              textDecoration: 'none', 
              borderRadius: '5px', 
              textAlign: 'center', 
              cursor: 'pointer'
            }}
          >
            Publication
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
