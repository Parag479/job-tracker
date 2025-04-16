import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const JobListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SearchFilterContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SearchInput = styled.input`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  min-width: 300px;
  
  &:focus {
    outline: none;
    border-color: #4DA8DA;
    box-shadow: 0 0 0 2px rgba(77, 168, 218, 0.1);
  }
`;

const FilterSelect = styled.select`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  background-color: white;
  min-width: 200px;
  
  &:focus {
    outline: none;
    border-color: #4DA8DA;
    box-shadow: 0 0 0 2px rgba(77, 168, 218, 0.1);
  }
`;

const AddButton = styled(Link)`
  background-color: #4DA8DA;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background-color: #3a8cba;
    transform: translateY(-1px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
  }
`;

const Table = styled.div`
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1.5fr 1fr 1fr 1fr 2fr;
  padding: 1rem;
  background-color: #F5F5F5;
  border-bottom: 1px solid #eee;
  gap: 1rem;

  @media (max-width: 1024px) {
    display: none;
  }
`;

const TableHeaderCell = styled.div`
  color: #666;
  font-weight: 500;
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1.5fr 1fr 1fr 1fr 2fr;
  padding: 1rem;
  border-bottom: 1px solid #eee;
  gap: 1rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f8f9fa;
  }

  @media (max-width: 1024px) {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const TableCell = styled.div`
  @media (max-width: 1024px) {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &::before {
      content: attr(data-label);
      font-weight: 500;
      color: #666;
    }
  }
`;

const StatusBadge = styled.span<{ status: string }>`
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.875rem;
  background-color: ${props => {
    switch (props.status) {
      case 'Applied':
        return '#E3F2FD';
      case 'Interview':
        return '#FFF3E0';
      case 'Offer':
        return '#E8F5E9';
      case 'Rejected':
        return '#FFEBEE';
      default:
        return '#F5F5F5';
    }
  }};
  color: ${props => {
    switch (props.status) {
      case 'Applied':
        return '#1976D2';
      case 'Interview':
        return '#F57C00';
      case 'Offer':
        return '#388E3C';
      case 'Rejected':
        return '#D32F2F';
      default:
        return '#666';
    }
  }};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: #666;
`;

// Mock data for demonstration
const mockJobs = [
  {
    id: 1,
    title: 'Frontend Developer',
    company: 'Tech Corp',
    platform: 'LinkedIn',
    status: 'Applied',
    followUpDate: '2024-04-20',
    notes: 'Waiting for response'
  },
  {
    id: 2,
    title: 'Full Stack Engineer',
    company: 'Startup Inc',
    platform: 'Indeed',
    status: 'Interview',
    followUpDate: '2024-04-22',
    notes: 'Technical interview scheduled'
  },
  {
    id: 3,
    title: 'React Developer',
    company: 'Innovation Labs',
    platform: 'Company Website',
    status: 'Offer',
    followUpDate: '2024-04-25',
    notes: 'Received offer, reviewing terms'
  }
];

const JobList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [platformFilter, setPlatformFilter] = useState('');

  const filteredJobs = mockJobs.filter(job => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.notes.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = !statusFilter || job.status === statusFilter;
    const matchesPlatform = !platformFilter || job.platform === platformFilter;

    return matchesSearch && matchesStatus && matchesPlatform;
  });

  return (
    <JobListContainer>
      <Header>
        <h1>Job Applications</h1>
        <AddButton to="/add-job">
          <span>Add New Job</span>
          <span>+</span>
        </AddButton>
      </Header>

      <SearchFilterContainer>
        <SearchInput
          type="text"
          placeholder="Search jobs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FilterSelect
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </FilterSelect>
        <FilterSelect
          value={platformFilter}
          onChange={(e) => setPlatformFilter(e.target.value)}
        >
          <option value="">All Platforms</option>
          <option value="LinkedIn">LinkedIn</option>
          <option value="Indeed">Indeed</option>
          <option value="Company Website">Company Website</option>
        </FilterSelect>
      </SearchFilterContainer>

      <Table>
        <TableHeader>
          <TableHeaderCell>Job Title</TableHeaderCell>
          <TableHeaderCell>Company</TableHeaderCell>
          <TableHeaderCell>Platform</TableHeaderCell>
          <TableHeaderCell>Status</TableHeaderCell>
          <TableHeaderCell>Follow-Up Date</TableHeaderCell>
          <TableHeaderCell>Notes</TableHeaderCell>
        </TableHeader>
        {filteredJobs.length > 0 ? (
          filteredJobs.map(job => (
            <TableRow key={job.id}>
              <TableCell data-label="Job Title">{job.title}</TableCell>
              <TableCell data-label="Company">{job.company}</TableCell>
              <TableCell data-label="Platform">{job.platform}</TableCell>
              <TableCell data-label="Status">
                <StatusBadge status={job.status}>{job.status}</StatusBadge>
              </TableCell>
              <TableCell data-label="Follow-Up Date">{job.followUpDate}</TableCell>
              <TableCell data-label="Notes">{job.notes}</TableCell>
            </TableRow>
          ))
        ) : (
          <EmptyState>
            <h3>No jobs found</h3>
            <p>Try adjusting your search or filters</p>
          </EmptyState>
        )}
      </Table>
    </JobListContainer>
  );
};

export default JobList; 