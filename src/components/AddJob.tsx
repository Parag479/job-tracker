import React, { useState } from 'react';
import styled from 'styled-components';
import { FaBuilding, FaBriefcase, FaCalendar, FaLink, FaArrowLeft } from 'react-icons/fa';
import { IconContext } from 'react-icons';

const Container = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1.5rem;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  gap: 1rem;
`;

const BackButton = styled.button`
  background: var(--bg-secondary);
  border: none;
  color: var(--text-primary);
  cursor: pointer;
  padding: 0.8rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background: var(--gradient-purple);
    color: white;
    transform: translateX(-2px);
  }

  svg {
    width: 14px;
    height: 14px;
  }
`;

const Title = styled.h1`
  color: var(--text-primary);
  font-size: 2rem;
  margin: 0;
`;

const Form = styled.form`
  background: var(--bg-secondary);
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  color: var(--text-primary);
  margin-bottom: 0.8rem;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  background: var(--bg-primary);
  color: var(--text-primary);
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px var(--gradient-purple);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  background: var(--bg-primary);
  color: var(--text-primary);
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px var(--gradient-purple);
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: var(--gradient-purple);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  margin-top: 2rem;

  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }

  svg {
    width: 14px;
    height: 14px;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface AddJobProps {
  onAddJob: (job: any) => void;
  onBack: () => void;
}

const AddJob: React.FC<AddJobProps> = ({ onAddJob, onBack }) => {
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    status: 'applied',
    date: new Date().toISOString().split('T')[0],
    link: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddJob({
      ...formData,
      id: Date.now().toString(),
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <IconContext.Provider value={{ size: '14px', style: { verticalAlign: 'middle' } }}>
      <Container>
        <Header>
          <BackButton onClick={onBack}>
            {FaArrowLeft({})}
          </BackButton>
          <Title>Add New Job</Title>
        </Header>

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Company Name</Label>
            <Input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Enter company name"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Job Position</Label>
            <Input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
              placeholder="Enter job position"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Application Status</Label>
            <Select
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="applied">Applied</option>
              <option value="interview">Interview</option>
              <option value="offer">Offer</option>
              <option value="rejected">Rejected</option>
            </Select>
          </FormGroup>

          <FormGroup>
            <Label>Application Date</Label>
            <Input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Job Link (Optional)</Label>
            <Input
              type="url"
              name="link"
              value={formData.link}
              onChange={handleChange}
              placeholder="Enter job posting URL"
            />
          </FormGroup>

          <SubmitButton type="submit">
            <IconWrapper>
              {FaBriefcase({})}
            </IconWrapper>
            Add Job Application
          </SubmitButton>
        </Form>
      </Container>
    </IconContext.Provider>
  );
};

export default AddJob; 