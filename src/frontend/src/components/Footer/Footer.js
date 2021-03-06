import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Footer.css';

class Footer extends Component {
  render() {
    return (
      <footer className="footer" style={{ overflowX: 'hidden' }}>
        <Row>
          <Col md={{ span: 2, offset: 1 }}>
            <h1 className="title">Hermit</h1>
          </Col>
          <Col md={{ span: 1.5, offset: 2 }}>
            <Link to="/contactus" className="footer-router-link contact-us-link">
              Contact Us
            </Link>
          </Col>
          <Col md={{ span: 1.5, offset: 0 }}>
            <Link to="/aboutus" className="footer-router-link about-us-link">
              About Us
            </Link>
          </Col>
          <Col md={{ span: 1.5, offset: 0 }}>
            <Link to="/tos" className="footer-router-link tos-link">
              Terms and Conditions
            </Link>
          </Col>
          <Col md={{ span: 2, offset: 3 }}>
            <Row>© 2021, Designed by The A Team. </Row>
            <Row>‏‏‎ ‎‏‏‎‎ ‎ ‎‏‏‎‎ ‎‏‏‎‎ ‎‏‏‎ ‎‏‏‎ ‎Coded by The A Team. </Row>
          </Col>
        </Row>
      </footer>
    );
  }
}

export default Footer;
