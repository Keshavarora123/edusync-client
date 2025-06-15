import React, { useState, useEffect } from 'react';
import { Container, Card, Table, Button, Spinner, Alert, Badge } from 'react-bootstrap';
import { FaUserGraduate, FaSearch, FaDownload } from 'react-icons/fa';

const InstructorStudents = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchStudents = async () => {
        try {
            setLoading(true);
            const user = JSON.parse(localStorage.getItem('user'));
            const token = user?.token;

            if (!token) {
                throw new Error('No authentication token found');
            }

            const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:5109/api';
            console.log('Fetching students from:', `${baseUrl}/Courses/Students/${user.userId}`);

            const response = await fetch(`${baseUrl}/Courses/Students/${user.userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Students API error:', {
                    status: response.status,
                    statusText: response.statusText,
                    error: errorText
                });
                throw new Error(`Failed to fetch students: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            console.log('Students data received:', data);
            setStudents(data);
        } catch (err) {
            console.error('Error fetching students:', err);
            setError(err.message || 'Failed to load students');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    const filteredStudents = students.filter(student =>
        student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                    <Alert.Heading>Error Loading Students</Alert.Heading>
                    <p>{error}</p>
                    <div className="d-flex gap-2">
                        <Button variant="outline-danger" onClick={() => window.location.reload()}>
                            Retry
                        </Button>
                        <Button variant="outline-primary" onClick={fetchStudents}>
                            Refresh Data
                        </Button>
                    </div>
                </Alert>
            </Container>
        );
    }

    return (
        <Container fluid className="px-4 py-4">
            {/* Header Section */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h1 className="h2 mb-1">Students</h1>
                    <p className="text-muted mb-0">Manage your enrolled students</p>
                </div>
                <div className="d-flex align-items-center gap-3">
                    <div className="position-relative">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search students..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ paddingLeft: '2.5rem' }}
                        />
                        <FaSearch className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
                    </div>
                    <Button variant="outline-primary" className="d-flex align-items-center gap-2">
                        <FaDownload /> Export List
                    </Button>
                </div>
            </div>

            {/* Students Table */}
            <Card className="border-0 shadow-sm">
                <Card.Body>
                    {students.length === 0 ? (
                        <div className="text-center py-5">
                            <FaUserGraduate size={48} className="text-muted mb-3" />
                            <h5>No students found</h5>
                            <p className="text-muted mb-0">You don't have any enrolled students yet.</p>
                        </div>
                    ) : (
                        <div className="table-responsive">
                            <Table hover className="align-middle">
                                <thead className="bg-light">
                                    <tr>
                                        <th>Student Name</th>
                                        <th>Email</th>
                                        <th>Enrolled Courses</th>
                                        <th>Status</th>
                                        <th>Last Active</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredStudents.map((student) => (
                                        <tr key={student.id}>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <div className="flex-shrink-0">
                                                        <div className="bg-light rounded-circle p-2 me-3">
                                                            <FaUserGraduate className="text-primary" />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <h6 className="mb-0">{student.name}</h6>
                                                        <small className="text-muted">ID: {student.id}</small>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{student.email}</td>
                                            <td>{student.enrolledCourses?.length || 0}</td>
                                            <td>
                                                <Badge bg="success">Active</Badge>
                                            </td>
                                            <td>{new Date(student.lastActive).toLocaleDateString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
};

export default InstructorStudents; 