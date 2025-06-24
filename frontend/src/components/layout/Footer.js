import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-1 mt-auto" style={{ fontSize: '0.7rem' }}>
      <div className="text-center" style={{ padding: '0.2rem 0' }}>
        <span style={{ fontSize: '0.95rem', fontWeight: 500, letterSpacing: '1px', color: '#fbbc05' }}>
          From Beginner to Pro, One Course at a Time.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
