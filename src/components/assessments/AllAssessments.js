import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Spinner, Alert, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaPlay, FaCalendarAlt, FaInfoCircle } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import config from '../../config';

const AllAssessments = () => {
    const [assessments, setAssessments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAssessments = async () => {
            try {
                setLoading(true);
                setError('');

                // First, fetch the student's enrolled courses
                console.log('Fetching enrolled courses...');
                const coursesResponse = await fetch(`${config.apiBaseUrl}/Courses/Student`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${user.token}`,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    credentials: 'include'
                });

                if (!coursesResponse.ok) {
                    throw new Error('Failed to fetch enrolled courses');
                }

                const courses = await coursesResponse.json();
                console.log('Fetched courses:', courses);

                // Then, fetch assessments for each course
                const allAssessments = [];
                for (const course of courses) {
                    try {
                        console.log(`Fetching assessments for course ${course.courseId}...`);
                        const assessmentsResponse = await fetch(`${config.apiBaseUrl}/Assessments/Course/${course.courseId}`, {
                            method: 'GET',
                            headers: {
                                'Authorization': `Bearer ${user.token}`,
                                'Content-Type': 'application/json',
                                'Accept': 'application/json'
                            },
                            credentials: 'include'
                        });

                        if (assessmentsResponse.ok) {
                            const courseAssessments = await assessmentsResponse.json();
                            // Add course information to each assessment
                            const assessmentsWithCourse = courseAssessments.map(assessment => ({
                                ...assessment,
                                courseId: course.courseId,
                                courseTitle: course.title
                            }));
                            allAssessments.push(...assessmentsWithCourse);
                        }
                    } catch (courseError) {
                        console.error(`Error fetching assessments for course ${course.courseId}:`, courseError);
                        // Continue with other courses even if one fails
                    }
                }

                console.log('All fetched assessments:', allAssessments);
                setAssessments(allAssessments);
            } catch (err) {
                console.error('Error fetching assessments:', {
                    error: err,
                    message: err.message,
                    stack: err.stack
                });
                setError(err.message || 'Failed to load assessments');
            } finally {
                setLoading(false);
            }
        };

        if (user?.token) {
            fetchAssessments();
        } else {
            setError('Not authenticated');
            setLoading(false);
        }
    }, [user]);

    if (loading) {
        return (
            <Container className="py-5 text-center">
                <Spinner animation="border" variant="primary" />
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="py-5">
                <Alert variant="danger">
                    <Alert.Heading>Error</Alert.Heading>
                    <p>{error}</p>
                    <Button variant="outline-danger" onClick={() => window.location.reload()}>
                        Try Again
                    </Button>
                </Alert>
            </Container>
        );
    }

    if (assessments.length === 0) {
        return (
            <Container className="py-5">
                <Card className="shadow-sm">
                    <Card.Body className="text-center py-5">
                        <FaInfoCircle size={48} className="text-muted mb-3" />
                        <h4>No Assessments Available</h4>
                        <p className="text-muted">
                            You don't have any assessments available at the moment.
                        </p>
                    </Card.Body>
                </Card>
            </Container>
        );
    }

    return (
        <Container className="py-4">
            <h2 className="mb-4">All Assessments</h2>
            <div className="row g-4">
                {assessments.map((assessment) => (
                    <div key={assessment.assessmentId} className="col-12">
                        <Card className="shadow-sm">
                            <Card.Body>
                                <div className="d-flex justify-content-between align-items-start">
                                    <div>
                                        <h5 className="mb-1">{assessment.title}</h5>
                                        <p className="text-muted small mb-2">
                                            {assessment.description || 'No description provided.'}
                                        </p>
                                        <div className="d-flex align-items-center text-muted small">
                                            <FaCalendarAlt className="me-2" />
                                            <span>
                                                Course: {assessment.courseTitle}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-end">
                                        <Badge bg="info" className="mb-2">
                                            {assessment.questions?.length || 0} Questions
                                        </Badge>
                                        <div className="text-muted small">
                                            Max Score: {assessment.maxScore}
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <Button
                                        variant="primary"
                                        className="w-100"
                                        onClick={() => navigate(`/student/courses/${assessment.courseId}/assessments/${assessment.assessmentId}`)}
                                    >
                                        <FaPlay className="me-2" /> Start Assessment
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>
        </Container>
    );
};

export default AllAssessments;
