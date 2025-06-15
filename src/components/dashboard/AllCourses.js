import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const AllCourses = () => {
    // Mock data for demonstration
    const courses = [
        { id: 1, title: 'Introduction to React', description: 'Learn the fundamentals of React.', enrolled: true },
        { id: 2, title: 'Advanced JavaScript', description: 'Deep dive into JavaScript concepts.', enrolled: false },
        { id: 3, title: 'Node.js for Beginners', description: 'Build backend applications with Node.js.', enrolled: true },
        { id: 4, title: 'Data Structures and Algorithms', description: 'Understand common data structures and algorithms.', enrolled: false },
    ];

    const handleEnroll = (courseId) => {
        // Placeholder for enroll functionality
        console.log(`Enrolling in course ${courseId}`);
    };

    return (
        <Container fluid>
            <h3 className="mb-4">All Available Courses</h3>
            <Row>
                {courses.map(course => (
                    <Col md={6} lg={4} key={course.id} className="mb-4">
                        <Card className="h-100 shadow-sm">
                            <Card.Body className="d-flex flex-column">
                                <Card.Title>{course.title}</Card.Title>
                                <Card.Text>{course.description}</Card.Text>
                                <div className="mt-auto">
                                    {course.enrolled ? (
                                        <Button variant="success" disabled>Enrolled</Button>
                                    ) : (
                                        <Button variant="primary" onClick={() => handleEnroll(course.id)}>Enroll</Button>
                                    )}
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default AllCourses; 