import React from 'react';
import { Container, Row, Col, Nav, Card, Badge, ProgressBar, Button } from 'react-bootstrap';
import { Link, useLocation, Outlet } from 'react-router-dom';
import {
  FaBook,
  FaClipboardCheck,
  FaHome,
  FaCalendarAlt,
  FaBell,
  FaChartLine,
  FaGraduationCap,
  FaClock,
  FaCheckCircle,
  FaUserCircle,
  FaSignOutAlt,
  FaTrophy,
  FaBookmark,
  FaStar,
  FaFire
} from 'react-icons/fa';

const StudentDashboard = () => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user')) || { name: 'Student' };
  const userName = user.name || 'Student';

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  // Mock data for demonstration
  const stats = {
    coursesEnrolled: 4,
    completedCourses: 2,
    averageScore: 85,
    upcomingAssessments: 3,
    learningStreak: 5,
    totalPoints: 1250,
    achievements: 8
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  // Modern color scheme
  const colors = {
    primary: '#7C3AED', // Vibrant purple
    primaryLight: '#A78BFA',
    primaryDark: '#5B21B6',
    secondary: '#10B981', // Emerald green
    accent: '#F59E0B', // Amber
    background: '#F9FAFB',
    text: '#1F2937',
    textLight: '#6B7280',
    border: '#E5E7EB',
    white: '#FFFFFF'
  };

  return (
    <div className="min-vh-100" style={{ background: colors.background }}>
      {/* Header */}
      <div className="text-white py-4" style={{
        background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
      }}>
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <h2 className="mb-1 fw-bold">{getGreeting()}, {userName}!</h2>
              <p className="mb-0 opacity-75">Welcome back to your learning journey</p>
            </Col>
            <Col md={6} className="text-md-end mt-3 mt-md-0">
              <Badge bg={colors.white} text="primary" className="p-2 me-2 shadow-sm" style={{ color: colors.primary }}>
                <FaCalendarAlt className="me-1" /> {new Date().toLocaleDateString()}
              </Badge>
              <Badge bg={colors.white} text="primary" className="p-2 me-2 shadow-sm" style={{ color: colors.primary }}>
                <FaBell />
              </Badge>
              <Button
                variant="light"
                size="sm"
                className="shadow-sm"
                onClick={handleLogout}
                style={{
                  backgroundColor: colors.white,
                  color: colors.primary,
                  border: 'none'
                }}
              >
                <FaSignOutAlt className="me-1" /> Logout
              </Button>
            </Col>
          </Row>
        </Container>
      </div>

      <Container className="py-4">
        <Row>
          {/* Sidebar */}
          <Col lg={3} className="mb-4">
            <Card className="shadow-sm border-0 rounded-4 overflow-hidden">
              <Card.Body className="p-0">
                <div className="text-center p-4" style={{
                  background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <div className="position-absolute top-0 start-0 w-100 h-100 opacity-10">
                    <div className="position-absolute" style={{ top: '-50%', left: '-50%', width: '200%', height: '200%', background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)' }}></div>
                  </div>
                  <div className="mb-3 position-relative">
                    <div
                      className="rounded-circle bg-white d-inline-flex align-items-center justify-content-center shadow-sm"
                      style={{
                        width: '90px',
                        height: '90px',
                        fontSize: '2.5rem',
                        color: colors.primary
                      }}
                    >
                      <FaUserCircle />
                    </div>
                  </div>
                  <h5 className="mb-1 text-white">{userName}</h5>
                  <p className="text-white-50 mb-0">Student</p>
                </div>

                {/* Quick Stats */}
                <div className="p-3 border-bottom">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="text-muted small">Learning Streak</span>
                    <Badge bg="success" className="d-flex align-items-center">
                      <FaFire className="me-1" /> {stats.learningStreak} days
                    </Badge>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="text-muted small">Total Points</span>
                    <Badge bg="primary" className="d-flex align-items-center">
                      <FaStar className="me-1" /> {stats.totalPoints}
                    </Badge>
                  </div>
                </div>

                <Nav variant="pills" className="flex-column p-3">
                  <Nav.Item className="mb-2">
                    <Nav.Link
                      as={Link}
                      to="/student"
                      className="d-flex align-items-center rounded-pill px-3 py-2"
                      active={location.pathname === '/student'}
                      style={{
                        transition: 'all 0.3s ease',
                        backgroundColor: location.pathname === '/student' ? colors.primary : 'transparent',
                        color: location.pathname === '/student' ? colors.white : colors.text,
                        border: '1px solid',
                        borderColor: location.pathname === '/student' ? colors.primary : colors.border
                      }}
                    >
                      <FaHome className="me-2" /> Home
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className="mb-2">
                    <Nav.Link
                      as={Link}
                      to="/student/courses"
                      className="d-flex align-items-center rounded-pill px-3 py-2"
                      active={location.pathname.startsWith('/student/courses')}
                      style={{
                        transition: 'all 0.3s ease',
                        backgroundColor: location.pathname.startsWith('/student/courses') ? colors.primary : 'transparent',
                        color: location.pathname.startsWith('/student/courses') ? colors.white : colors.text,
                        border: '1px solid',
                        borderColor: location.pathname.startsWith('/student/courses') ? colors.primary : colors.border
                      }}
                    >
                      <FaBook className="me-2" /> My Courses
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className="mb-2">
                    <Nav.Link
                      as={Link}
                      to="/student/results"
                      className="d-flex align-items-center rounded-pill px-3 py-2"
                      active={location.pathname === '/student/results'}
                      style={{
                        transition: 'all 0.3s ease',
                        backgroundColor: location.pathname === '/student/results' ? colors.primary : 'transparent',
                        color: location.pathname === '/student/results' ? colors.white : colors.text,
                        border: '1px solid',
                        borderColor: location.pathname === '/student/results' ? colors.primary : colors.border
                      }}
                    >
                      <FaClipboardCheck className="me-2" /> Results
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className="mb-2">
                    <Nav.Link
                      as={Link}
                      to="/student/available-courses"
                      className="d-flex align-items-center rounded-pill px-3 py-2"
                      active={location.pathname === '/student/available-courses'}
                      style={{
                        transition: 'all 0.3s ease',
                        backgroundColor: location.pathname === '/student/available-courses' ? colors.primary : 'transparent',
                        color: location.pathname === '/student/available-courses' ? colors.white : colors.text,
                        border: '1px solid',
                        borderColor: location.pathname === '/student/available-courses' ? colors.primary : colors.border
                      }}
                    >
                      <FaGraduationCap className="me-2" /> All Courses
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className="mb-2">
                    <Nav.Link
                      as={Link}
                      to="/student/achievements"
                      className="d-flex align-items-center rounded-pill px-3 py-2"
                      active={location.pathname === '/student/achievements'}
                      style={{
                        transition: 'all 0.3s ease',
                        backgroundColor: location.pathname === '/student/achievements' ? colors.primary : 'transparent',
                        color: location.pathname === '/student/achievements' ? colors.white : colors.text,
                        border: '1px solid',
                        borderColor: location.pathname === '/student/achievements' ? colors.primary : colors.border
                      }}
                    >
                      <FaTrophy className="me-2" /> Achievements
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className="mb-2">
                    <Nav.Link
                      as={Link}
                      to="/student/bookmarks"
                      className="d-flex align-items-center rounded-pill px-3 py-2"
                      active={location.pathname === '/student/bookmarks'}
                      style={{
                        transition: 'all 0.3s ease',
                        backgroundColor: location.pathname === '/student/bookmarks' ? colors.primary : 'transparent',
                        color: location.pathname === '/student/bookmarks' ? colors.white : colors.text,
                        border: '1px solid',
                        borderColor: location.pathname === '/student/bookmarks' ? colors.primary : colors.border
                      }}
                    >
                      <FaBookmark className="me-2" /> Bookmarks
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Card.Body>
            </Card>
          </Col>

          {/* Main Content */}
          <Col lg={9}>
            <Outlet />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default StudentDashboard;
