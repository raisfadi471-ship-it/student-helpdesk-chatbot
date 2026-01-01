-- Create student registrations table
CREATE TABLE student_registrations (
  id BIGSERIAL PRIMARY KEY,
  student_name VARCHAR(255) NOT NULL,
  student_email VARCHAR(255) NOT NULL,
  student_phone VARCHAR(50),
  course_name VARCHAR(255) NOT NULL,
  registration_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status VARCHAR(50) DEFAULT 'pending'
);

-- Create indexes
CREATE INDEX idx_registrations_email ON student_registrations(student_email);
CREATE INDEX idx_registrations_course ON student_registrations(course_name);
CREATE INDEX idx_registrations_date ON student_registrations(registration_date DESC);

-- Insert sample registration
INSERT INTO student_registrations (student_name, student_email, student_phone, course_name, status) VALUES
('John Doe', 'john@example.com', '+91-9876543210', 'Web Development', 'confirmed');
