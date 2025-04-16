import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import * as Icons from 'react-icons/fa';

const JobsContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const JobsHeader = styled.div`
  margin-bottom: 2rem;
`;

const PageTitle = styled.h1`
  color: var(--text-primary);
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  color: var(--text-secondary);
`;

const JobsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
`;

const JobCard = styled.div`
  background-color: var(--bg-secondary);
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 1rem;
`;

const JobInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Company = styled.h3`
  color: var(--text-primary);
  font-size: 1.2rem;
  margin: 0;
`;

const Position = styled.p`
  color: var(--text-secondary);
  font-size: 1rem;
  margin: 0;
`;

const Status = styled.span<{ status: string }>`
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
  color: white;
  display: inline-block;
  width: fit-content;
`;

const DateText = styled.p`
  color: var(--text-secondary);
  font-size: 0.875rem;
  margin: 0;
`;

const Actions = styled.div`
  display: flex;
  gap: 1rem;
  align-items: flex-start;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 0.25rem;
  transition: color 0.2s;

  &:hover {
    color: var(--primary-color);
  }

  svg {
    font-size: 1.25rem;
  }
`;

interface Job {
  id: string;
  company: string;
  position: string;
  status: 'applied' | 'interview' | 'offer' | 'rejected';
  date: string;
}

interface EditModalProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (job: Job) => void;
}

const Modal = styled.div<{ isOpen: boolean }>`
  display: ${props => props.isOpen ? 'flex' : 'none'};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: var(--bg-secondary);
  padding: 2rem;
  border-radius: 8px;
  width: 100%;
  max-width: 500px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: var(--text-primary);
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  background-color: var(--bg-primary);
  color: var(--text-primary);
`;

const Select = styled.select`
  padding: 0.5rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  background-color: var(--bg-primary);
  color: var(--text-primary);
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: ${props => props.variant === 'primary' ? 'var(--primary-color)' : 'var(--bg-primary)'};
  color: ${props => props.variant === 'primary' ? 'white' : 'var(--text-primary)'};

  &:hover {
    background-color: ${props => props.variant === 'primary' ? 'var(--primary-hover)' : 'var(--border-color)'};
  }
`;

const EditModal: React.FC<EditModalProps> = ({ job, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState<Job>({
    id: '',
    company: '',
    position: '',
    status: 'applied',
    date: new Date().toISOString().slice(0, 10),
  });

  useEffect(() => {
    if (job) {
      setFormData(job);
    } else {
      setFormData({
        id: '',
        company: '',
        position: '',
        status: 'applied',
        date: new Date().toISOString().slice(0, 10),
      });
    }
  }, [job]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen}>
      <ModalContent>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Company</Label>
            <Input
              type="text"
              value={formData.company}
              onChange={e => setFormData({ ...formData, company: e.target.value })}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Position</Label>
            <Input
              type="text"
              value={formData.position}
              onChange={e => setFormData({ ...formData, position: e.target.value })}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Status</Label>
            <Select
              value={formData.status}
              onChange={e => setFormData({ ...formData, status: e.target.value as Job['status'] })}
            >
              <option value="applied">Applied</option>
              <option value="interview">Interview</option>
              <option value="offer">Offer</option>
              <option value="rejected">Rejected</option>
            </Select>
          </FormGroup>
          <FormGroup>
            <Label>Date</Label>
            <Input
              type="date"
              value={formData.date}
              onChange={e => setFormData({ ...formData, date: e.target.value })}
              required
            />
          </FormGroup>
          <ButtonGroup>
            <Button type="button" onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="primary">Save</Button>
          </ButtonGroup>
        </Form>
      </ModalContent>
    </Modal>
  );
};

const Jobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const storedJobs = localStorage.getItem('jobs');
    if (storedJobs) {
      setJobs(JSON.parse(storedJobs));
    }
  }, []);

  const saveJobs = (newJobs: Job[]) => {
    setJobs(newJobs);
    localStorage.setItem('jobs', JSON.stringify(newJobs));
  };

  const handleEdit = (job: Job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleDelete = (jobId: string) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      const newJobs = jobs.filter(job => job.id !== jobId);
      saveJobs(newJobs);
    }
  };

  const handleSave = (job: Job) => {
    const newJobs = selectedJob
      ? jobs.map(j => j.id === job.id ? job : j)
      : [...jobs, { ...job, id: String(Date.now()) }];
    saveJobs(newJobs);
  };

  return (
    <JobsContainer>
      <JobsHeader>
        <PageTitle>Jobs</PageTitle>
        <Subtitle>Manage your job applications</Subtitle>
      </JobsHeader>

      <Button
        variant="primary"
        onClick={() => {
          setSelectedJob(null);
          setIsModalOpen(true);
        }}
        style={{ marginBottom: '2rem' }}
      >
        Add New Job
      </Button>

      <JobsGrid>
        {jobs.map(job => (
          <JobCard key={job.id}>
            <JobInfo>
              <Company>{job.company}</Company>
              <Position>{job.position}</Position>
              <Status status={job.status} className={`status-${job.status}`}>
                {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
              </Status>
              <DateText>{new Date(job.date).toLocaleDateString()}</DateText>
            </JobInfo>
            <Actions>
              <ActionButton onClick={() => handleEdit(job)} aria-label="Edit job">
                {Icons.FaEdit({})}
              </ActionButton>
              <ActionButton onClick={() => handleDelete(job.id)} aria-label="Delete job">
                {Icons.FaTrash({})}
              </ActionButton>
            </Actions>
          </JobCard>
        ))}
      </JobsGrid>

      <EditModal
        job={selectedJob}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />
    </JobsContainer>
  );
};

export default Jobs; 