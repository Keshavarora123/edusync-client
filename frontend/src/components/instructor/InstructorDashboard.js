import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Alert, Modal, Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import {
  FaUsers,
  FaBookOpen,
  FaCalendarAlt,
  FaPlus,
  FaClipboardList,
  FaEllipsisV,
  FaBell,
  FaSearch,
  FaFilter,
  FaDownload,
  FaEye,
  FaEdit,
  FaTrash,
  FaFileAlt,
  FaChartBar,
  FaUserGraduate,
  FaCog
} from 'react-icons/fa';
import CreateCourseForm from './CreateCourseForm';

const InstructorDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateCourse, setShowCreateCourse] = useState(false);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Get the current user from localStorage
      const userJson = localStorage.getItem('user');
      if (!userJson) {
        throw new Error('User not authenticated');
      }

      const user = JSON.parse(userJson);
      const token = user?.token;

      if (!token) {
        throw new Error('No authentication token found');
      }

      const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:5109/api';
      console.log('Fetching dashboard data with base URL:', baseUrl);

      // Fetch all courses for the instructor
      const [activeCoursesResponse, allCoursesResponse] = await Promise.all([
        fetch(`${baseUrl}/Courses/ByInstructor/${user.userId}?activeOnly=true`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }).then(async (response) => {
          if (!response.ok) {
            const errorText = await response.text();
            console.error('Active courses API error:', {
              status: response.status,
              statusText: response.statusText,
              error: errorText
            });
            throw new Error(`Active courses API failed: ${response.status} ${response.statusText}`);
          }
          return response;
        }),
        fetch(`${baseUrl}/Courses/ByInstructor/${user.userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }).then(async (response) => {
          if (!response.ok) {
            const errorText = await response.text();
            console.error('All courses API error:', {
              status: response.status,
              statusText: response.statusText,
              error: errorText
            });
            throw new Error(`All courses API failed: ${response.status} ${response.statusText}`);
          }
          return response;
        })
      ]);

      console.log('All API responses received successfully');

      const [activeCourses, allCourses] = await Promise.all([
        activeCoursesResponse.json(),
        allCoursesResponse.json()
      ]);

      // Calculate total students from course data
      const totalStudents = allCourses.reduce((total, course) => {
        return total + (course.enrolledStudents || 0);
      }, 0);

      console.log('Dashboard data:', {
        activeCoursesCount: activeCourses.length,
        allCoursesCount: allCourses.length,
        totalStudents
      });

      setCourses(allCourses);

    } catch (err) {
      console.error('Error fetching dashboard data:', {
        message: err.message,
        stack: err.stack,
        name: err.name
      });
      setError(err.message || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <Container className="py-4">
        <Alert variant="danger" className="shadow-sm">
          <Alert.Heading>Error Loading Dashboard</Alert.Heading>
          <p>{error}</p>
          <Button variant="outline-danger" onClick={() => window.location.reload()}>
            Retry
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <Container fluid className="px-4 py-4">
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h2 mb-1">Instructor Dashboard</h1>
          <p className="text-muted mb-0">Manage your courses and assessments</p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <div className="position-relative">
            <input
              type="text"
              className="form-control"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ paddingLeft: '2.5rem' }}
            />
            <FaSearch className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
          </div>
          <Button
            variant="primary"
            size="lg"
            onClick={() => setShowCreateCourse(true)}
            className="d-flex align-items-center gap-2 shadow-sm"
          >
            <FaPlus /> Create New Course
          </Button>
        </div>
      </div>

      {/* Quick Actions */}
      <Row className="g-4 mb-4">
        <Col md={3}>
          <Card className="h-100 border-0 shadow-sm hover-shadow">
            <Card.Body className="d-flex flex-column align-items-center text-center p-4">
              <div className="bg-primary bg-opacity-10 p-3 rounded-circle mb-3">
                <FaBookOpen size={24} className="text-primary" />
              </div>
              <h5 className="mb-3">Manage Courses</h5>
              <p className="text-muted small mb-3">Create, edit, and organize your courses</p>
              <Button variant="outline-primary" className="w-100">
                View All Courses
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="h-100 border-0 shadow-sm hover-shadow">
            <Card.Body className="d-flex flex-column align-items-center text-center p-4">
              <div className="bg-success bg-opacity-10 p-3 rounded-circle mb-3">
                <FaClipboardList size={24} className="text-success" />
              </div>
              <h5 className="mb-3">Assessments</h5>
              <p className="text-muted small mb-3">Create and manage course assessments</p>
              <Button variant="outline-success" className="w-100">
                Manage Assessments
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="h-100 border-0 shadow-sm hover-shadow">
            <Card.Body className="d-flex flex-column align-items-center text-center p-4">
              <div className="bg-info bg-opacity-10 p-3 rounded-circle mb-3">
                <FaChartBar size={24} className="text-info" />
              </div>
              <h5 className="mb-3">Results</h5>
              <p className="text-muted small mb-3">View student assessment results</p>
              <Button
                variant="outline-info"
                className="w-100"
                onClick={() => navigate('/instructor/results')}
              >
                View Results
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="h-100 border-0 shadow-sm hover-shadow">
            <Card.Body className="d-flex flex-column align-items-center text-center p-4">
              <div className="bg-warning bg-opacity-10 p-3 rounded-circle mb-3">
                <FaChartBar size={24} className="text-warning" />
              </div>
              <h5 className="mb-3">Reports</h5>
              <p className="text-muted small mb-3">View course and student reports</p>
              <Button variant="outline-warning" className="w-100">
                View Reports
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Courses Section */}
      <Card className="border-0 shadow-sm">
        <Card.Header className="bg-white border-0 py-3">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0">My Courses</h5>
            <div className="d-flex align-items-center gap-2">
              <Dropdown>
                <Dropdown.Toggle variant="outline-secondary" size="sm" id="filter-dropdown">
                  <FaFilter className="me-1" /> Filter
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setFilterStatus('all')}>All Courses</Dropdown.Item>
                  <Dropdown.Item onClick={() => setFilterStatus('active')}>Active</Dropdown.Item>
                  <Dropdown.Item onClick={() => setFilterStatus('draft')}>Draft</Dropdown.Item>
                  <Dropdown.Item onClick={() => setFilterStatus('archived')}>Archived</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={fetchDashboardData}
                className="d-flex align-items-center gap-2"
              >
                <i className="bi bi-arrow-clockwise"></i> Refresh
              </Button>
            </div>
          </div>
        </Card.Header>
        <Card.Body>
          {courses.length === 0 ? (
            <div className="text-center py-5">
              <FaBookOpen size={48} className="text-muted mb-3" />
              <h5>No courses found</h5>
              <p className="text-muted mb-4">You haven't created any courses yet.</p>
              <Button variant="primary" onClick={() => setShowCreateCourse(true)}>
                Create Your First Course
              </Button>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="bg-light">
                  <tr>
                    <th>Course Title</th>
                    <th>Students</th>
                    <th>Status</th>
                    <th className="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course) => (
                    <tr key={course.courseId}>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="flex-shrink-0">
                            <div className="bg-light rounded-circle p-2 me-3">
                              <FaBookOpen className="text-primary" />
                            </div>
                          </div>
                          <div>
                            <h6 className="mb-0">{course.title}</h6>
                            <small className="text-muted">{course.description?.substring(0, 50)}...</small>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <FaUsers className="text-muted me-2" />
                          {course.enrolledStudents || 0}
                        </div>
                      </td>
                      <td>
                        <span className="badge bg-success">Active</span>
                      </td>
                      <td className="text-end">
                        <Dropdown>
                          <Dropdown.Toggle variant="light" size="sm" id={`dropdown-${course.courseId}`}>
                            <FaEllipsisV />
                          </Dropdown.Toggle>
                          <Dropdown.Menu align="end">
                            <Dropdown.Item onClick={() => navigate(`/instructor/courses/${course.courseId}/assessments`)}>
                              <FaClipboardList className="me-2" /> View Assessments
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => {
                              setSelectedCourse(course);
                              setShowCourseModal(true);
                            }}>
                              <FaEye className="me-2" /> View Details
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <FaEdit className="me-2" /> Edit Course
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <FaDownload className="me-2" /> Export Data
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item className="text-danger">
                              <FaTrash className="me-2" /> Delete Course
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card.Body>
      </Card>

      {/* Create Course Modal */}
      <CreateCourseForm
        show={showCreateCourse}
        onClose={() => setShowCreateCourse(false)}
        onCourseCreated={(newCourse) => {
          console.log('New course created:', newCourse);
          fetchDashboardData();
          setShowCreateCourse(false);
        }}
      />

      {/* Course Details Modal */}
      <Modal show={showCourseModal} onHide={() => setShowCourseModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Course Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedCourse && (
            <div>
              <div className="d-flex align-items-center mb-4">
                <div className="bg-light rounded-circle p-3 me-3">
                  <FaBookOpen size={24} className="text-primary" />
                </div>
                <div>
                  <h4 className="mb-1">{selectedCourse.title || 'Untitled Course'}</h4>
                  <p className="text-muted mb-0">Created on {new Date(selectedCourse.createdAt).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="mb-4">
                <h6 className="text-uppercase text-muted small mb-2">Description</h6>
                <p className="mb-0">{selectedCourse.description || 'No description available.'}</p>
              </div>

              {selectedCourse.mediaUrl && (
                <div className="mb-4">
                  <h6 className="text-uppercase text-muted small mb-2">Course Media</h6>
                  <div className="ratio ratio-16x9 rounded overflow-hidden">
                    <iframe
                      src={selectedCourse.mediaUrl}
                      title={selectedCourse.title || 'Course Media'}
                      allowFullScreen
                    />
                  </div>
                </div>
              )}

              <div className="row g-3">
                <div className="col-md-4">
                  <div className="bg-light rounded p-3">
                    <h6 className="text-uppercase text-muted small mb-2">Total Students</h6>
                    <h3 className="mb-0">{selectedCourse.enrolledStudents || 0}</h3>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="bg-light rounded p-3">
                    <h6 className="text-uppercase text-muted small mb-2">Assessments</h6>
                    <h3 className="mb-0">{selectedCourse.assessments?.length || 0}</h3>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="bg-light rounded p-3">
                    <h6 className="text-uppercase text-muted small mb-2">Status</h6>
                    <h3 className="mb-0">Active</h3>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              if (selectedCourse) {
                navigate(`/instructor/courses/${selectedCourse.courseId}/assessments`);
              }
            }}
          >
            <FaClipboardList className="me-2" /> View Assessments
          </Button>
          <Button variant="secondary" onClick={() => setShowCourseModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default InstructorDashboard;
