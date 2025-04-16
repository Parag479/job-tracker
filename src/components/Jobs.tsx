import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaBriefcase, FaBuilding, FaCalendar, FaLink, FaPlus } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import AddJob from './AddJob';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1.5rem;
`;

const Header = styled.div`
  margin-bottom: 2rem;
  text-align: center;
`;

const Title = styled.h1`
  color: var(--text-primary);
  font-size: 2.5rem;
  margin-bottom: 1rem;
  font-weight: 600;
`;

const Subtitle = styled.p`
  color: var(--text-secondary);
  font-size: 1.1rem;
  max-width: 600px;
  margin: 0 auto;
`;

const SearchBar = styled.input`
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 12px;
  background: var(--bg-secondary);
  color: var(--text-primary);
  font-size: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }

  &::placeholder {
    color: var(--text-secondary);
  }
`;

const FilterBar = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const FilterButton = styled.button<{ active?: boolean }>`
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 20px;
  background: ${props => props.active ? 'var(--gradient-purple)' : 'var(--bg-secondary)'};
  color: ${props => props.active ? 'white' : 'var(--text-secondary)'};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

const JobsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const JobCard = styled.div`
  background: var(--bg-secondary);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  animation: ${fadeIn} 0.5s ease-out;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: var(--gradient-purple);
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  }
`;

const CompanyLogo = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 10px;
  background: var(--gradient-mint);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  color: white;
  font-size: 1.5rem;

  svg {
    width: 24px;
    height: 24px;
  }
`;

const JobTitle = styled.h3`
  color: var(--text-primary);
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

const CompanyName = styled.div`
  color: var(--text-secondary);
  font-size: 1rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const JobDetails = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
`;

const Detail = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-secondary);
  font-size: 0.9rem;
  padding: 0.5rem 1rem;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 20px;
`;

const StatusBadge = styled.div<{ status: string }>`
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  color: white;
  background: ${props => {
    switch (props.status) {
      case 'applied':
        return 'var(--gradient-purple)';
      case 'interview':
        return 'var(--gradient-mint)';
      case 'offer':
        return 'var(--gradient-blue)';
      case 'rejected':
        return 'linear-gradient(135deg, #FF6B6B 0%, #FF4949 100%)';
      default:
        return 'var(--gradient-purple)';
    }
  }};
`;

const ActionButton = styled.button`
  width: 100%;
  padding: 0.8rem;
  margin-top: 1rem;
  border: none;
  border-radius: 8px;
  background: var(--gradient-purple);
  color: white;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 14px;
    height: 14px;
  }
`;

const AddJobButton = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: var(--gradient-purple);
  color: white;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  svg {
    width: 24px;
    height: 24px;
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
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddJob, setShowAddJob] = useState(false);

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

  const handleAddJob = (newJob: Job) => {
    const updatedJobs = [...jobs, newJob];
    saveJobs(updatedJobs);
    setShowAddJob(false);
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
    setIsModalOpen(false);
  };

  const filteredJobs = jobs.filter(job => {
    const matchesFilter = filter === 'all' || job.status === filter;
    const matchesSearch = job.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (showAddJob) {
    return <AddJob onAddJob={handleAddJob} onBack={() => setShowAddJob(false)} />;
  }

  return (
    <IconContext.Provider value={{ size: '14px', style: { verticalAlign: 'middle' } }}>
      <Container>
        <Header>
          <Title>Job Applications</Title>
          <Subtitle>Track and manage your job applications in one place</Subtitle>
        </Header>

        <SearchBar 
          placeholder="Search jobs by title or company..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <FilterBar>
          <FilterButton active={filter === 'all'} onClick={() => setFilter('all')}>
            All Jobs
          </FilterButton>
          <FilterButton active={filter === 'applied'} onClick={() => setFilter('applied')}>
            Applied
          </FilterButton>
          <FilterButton active={filter === 'interview'} onClick={() => setFilter('interview')}>
            Interview
          </FilterButton>
          <FilterButton active={filter === 'offer'} onClick={() => setFilter('offer')}>
            Offer
          </FilterButton>
          <FilterButton active={filter === 'rejected'} onClick={() => setFilter('rejected')}>
            Rejected
          </FilterButton>
        </FilterBar>

        <JobsGrid>
          {filteredJobs.map(job => (
            <JobCard key={job.id}>
              <StatusBadge status={job.status}>
                {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
              </StatusBadge>
              
              <CompanyLogo>
                <IconWrapper>
                  {FaBuilding({})}
                </IconWrapper>
              </CompanyLogo>

              <JobTitle>{job.position}</JobTitle>
              <CompanyName>
                <IconWrapper>
                  {FaBuilding({})}
                </IconWrapper>
                {job.company}
              </CompanyName>

              <JobDetails>
                <Detail>
                  <IconWrapper>
                    {FaBriefcase({})}
                  </IconWrapper>
                  {job.status === 'interview' ? 'On-site' : job.status === 'offer' ? 'Full-time' : 'Contract'}
                </Detail>
                <Detail>
                  <IconWrapper>
                    {FaCalendar({})}
                  </IconWrapper>
                  {new Date(job.date).toLocaleDateString()}
                </Detail>
              </JobDetails>

              <ActionButton onClick={() => handleEdit(job)}>
                <IconWrapper style={{ marginRight: '0.5rem' }}>
                  {FaLink({})}
                </IconWrapper>
                View Application
              </ActionButton>
            </JobCard>
          ))}
        </JobsGrid>

        <AddJobButton onClick={() => setShowAddJob(true)}>
          {FaPlus({})}
        </AddJobButton>

        <EditModal
          job={selectedJob}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      </Container>
    </IconContext.Provider>
  );
};

export default Jobs; 