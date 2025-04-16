import React from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Avatar,
  Box,
  Typography,
  IconButton,
  Tooltip,
} from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

interface Job {
  id: number;
  company: string;
  companyLogo: string;
  position: string;
  location: string;
  type: string;
  salary: string;
  skills: string[];
  experience: string;
  status: string;
  dateApplied: string;
  lastUpdate: string;
  jobUrl: string;
}

const sampleJobs: Job[] = [
  {
    id: 1,
    company: 'Google',
    companyLogo: 'G',
    position: 'Senior Frontend Engineer',
    location: 'Mountain View, CA (Hybrid)',
    type: 'Full-time',
    salary: '$150K - $220K',
    skills: ['React', 'TypeScript', 'GraphQL'],
    experience: '5+ years',
    status: 'Interview',
    dateApplied: '2024-03-15',
    lastUpdate: '2024-03-20',
    jobUrl: 'https://careers.google.com'
  },
  {
    id: 2,
    company: 'Meta',
    companyLogo: 'M',
    position: 'Frontend Developer',
    location: 'Remote',
    type: 'Full-time',
    salary: '$140K - $200K',
    skills: ['React', 'JavaScript', 'CSS3'],
    experience: '3+ years',
    status: 'Applied',
    dateApplied: '2024-03-14',
    lastUpdate: '2024-03-14',
    jobUrl: 'https://careers.meta.com'
  },
  {
    id: 3,
    company: 'Netflix',
    companyLogo: 'N',
    position: 'UI Engineer',
    location: 'Los Gatos, CA (On-site)',
    type: 'Full-time',
    salary: '$160K - $250K',
    skills: ['React', 'Node.js', 'Performance'],
    experience: '4+ years',
    status: 'Offer',
    dateApplied: '2024-03-10',
    lastUpdate: '2024-03-22',
    jobUrl: 'https://jobs.netflix.com'
  },
  {
    id: 4,
    company: 'Microsoft',
    companyLogo: 'M',
    position: 'React Developer',
    location: 'Seattle, WA (Hybrid)',
    type: 'Full-time',
    salary: '$130K - $190K',
    skills: ['React', 'Azure', 'TypeScript'],
    experience: '3+ years',
    status: 'Applied',
    dateApplied: '2024-03-18',
    lastUpdate: '2024-03-18',
    jobUrl: 'https://careers.microsoft.com'
  },
  {
    id: 5,
    company: 'Amazon',
    companyLogo: 'A',
    position: 'Frontend Engineer II',
    location: 'New York, NY (Hybrid)',
    type: 'Full-time',
    salary: '$140K - $210K',
    skills: ['React', 'AWS', 'JavaScript'],
    experience: '4+ years',
    status: 'Interview',
    dateApplied: '2024-03-12',
    lastUpdate: '2024-03-19',
    jobUrl: 'https://amazon.jobs'
  },
  {
    id: 6,
    company: 'Apple',
    companyLogo: 'A',
    position: 'Senior UI Developer',
    location: 'Cupertino, CA (On-site)',
    type: 'Full-time',
    salary: '$170K - $240K',
    skills: ['React', 'Swift', 'CSS3'],
    experience: '5+ years',
    status: 'Applied',
    dateApplied: '2024-03-17',
    lastUpdate: '2024-03-17',
    jobUrl: 'https://apple.com/careers'
  },
  {
    id: 7,
    company: 'Airbnb',
    companyLogo: 'A',
    position: 'Frontend Engineer',
    location: 'San Francisco, CA (Hybrid)',
    type: 'Full-time',
    salary: '$140K - $200K',
    skills: ['React', 'Node.js', 'Redux'],
    experience: '3+ years',
    status: 'Interview',
    dateApplied: '2024-03-11',
    lastUpdate: '2024-03-21',
    jobUrl: 'https://careers.airbnb.com'
  },
  {
    id: 8,
    company: 'Twitter',
    companyLogo: 'T',
    position: 'Senior Frontend Developer',
    location: 'Remote',
    type: 'Full-time',
    salary: '$130K - $190K',
    skills: ['React', 'TypeScript', 'Next.js'],
    experience: '4+ years',
    status: 'Applied',
    dateApplied: '2024-03-16',
    lastUpdate: '2024-03-16',
    jobUrl: 'https://careers.twitter.com'
  },
  {
    id: 9,
    company: 'Uber',
    companyLogo: 'U',
    position: 'Frontend Engineer III',
    location: 'San Francisco, CA (Hybrid)',
    type: 'Full-time',
    salary: '$150K - $220K',
    skills: ['React', 'GraphQL', 'TypeScript'],
    experience: '5+ years',
    status: 'Rejected',
    dateApplied: '2024-03-09',
    lastUpdate: '2024-03-20',
    jobUrl: 'https://careers.uber.com'
  },
  {
    id: 10,
    company: 'LinkedIn',
    companyLogo: 'L',
    position: 'Staff Frontend Engineer',
    location: 'Sunnyvale, CA (Hybrid)',
    type: 'Full-time',
    salary: '$180K - $250K',
    skills: ['React', 'TypeScript', 'System Design'],
    experience: '7+ years',
    status: 'Offer',
    dateApplied: '2024-03-13',
    lastUpdate: '2024-03-22',
    jobUrl: 'https://careers.linkedin.com'
  }
];

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'applied':
      return '#8b5cf6';
    case 'interview':
      return '#3b82f6';
    case 'offer':
      return '#10b981';
    case 'rejected':
      return '#ef4444';
    default:
      return '#6b7280';
  }
};

const getSkillColor = (skill: string) => {
  switch (skill.toLowerCase()) {
    case 'react':
      return '#61dafb';
    case 'typescript':
      return '#3178c6';
    case 'javascript':
      return '#f7df1e';
    case 'node.js':
      return '#339933';
    case 'graphql':
      return '#e535ab';
    default:
      return '#6b7280';
  }
};

const JobTable = () => {
  return (
    <TableContainer 
      component={Paper} 
      sx={{ 
        bgcolor: '#1f2937', 
        borderRadius: 2, 
        overflow: 'hidden',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
      }}
    >
      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: '#111827' }}>
            <TableCell sx={{ color: '#fff', fontWeight: 'bold', fontSize: '0.95rem' }}>Company</TableCell>
            <TableCell sx={{ color: '#fff', fontWeight: 'bold', fontSize: '0.95rem' }}>Position & Details</TableCell>
            <TableCell sx={{ color: '#fff', fontWeight: 'bold', fontSize: '0.95rem' }}>Skills & Status</TableCell>
            <TableCell sx={{ color: '#fff', fontWeight: 'bold', fontSize: '0.95rem' }}>Timeline</TableCell>
            <TableCell sx={{ color: '#fff', fontWeight: 'bold', fontSize: '0.95rem' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sampleJobs.map((job) => (
            <TableRow 
              key={job.id} 
              sx={{ 
                '&:hover': { bgcolor: '#374151' },
                transition: 'all 0.2s ease',
                cursor: 'pointer'
              }}
            >
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar 
                    sx={{ 
                      bgcolor: '#4b5563', 
                      width: 45, 
                      height: 45,
                      fontWeight: 'bold',
                      fontSize: '1.2rem'
                    }}
                  >
                    {job.companyLogo}
                  </Avatar>
                  <Typography sx={{ color: '#fff', fontWeight: 'bold', fontSize: '0.95rem' }}>
                    {job.company}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Typography sx={{ color: '#fff', fontWeight: 'bold', fontSize: '0.95rem' }}>
                    {job.position}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <LocationOnIcon sx={{ color: '#6b7280', fontSize: 18 }} />
                      <Typography sx={{ color: '#9ca3af', fontSize: '0.85rem' }}>
                        {job.location}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <WorkIcon sx={{ color: '#6b7280', fontSize: 18 }} />
                      <Typography sx={{ color: '#9ca3af', fontSize: '0.85rem' }}>
                        {job.experience}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <MonetizationOnIcon sx={{ color: '#6b7280', fontSize: 18 }} />
                      <Typography sx={{ color: '#9ca3af', fontSize: '0.85rem' }}>
                        {job.salary}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                    {job.skills.map((skill) => (
                      <Chip
                        key={skill}
                        label={skill}
                        size="small"
                        sx={{
                          bgcolor: getSkillColor(skill),
                          color: skill.toLowerCase() === 'javascript' ? '#000' : '#fff',
                          fontWeight: 'medium',
                          fontSize: '0.75rem'
                        }}
                      />
                    ))}
                  </Box>
                  <Chip
                    label={job.status}
                    sx={{
                      bgcolor: getStatusColor(job.status),
                      color: '#fff',
                      fontWeight: 'medium',
                      width: 'fit-content'
                    }}
                  />
                </Box>
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                  <Typography sx={{ color: '#9ca3af', fontSize: '0.85rem' }}>
                    Applied: {job.dateApplied}
                  </Typography>
                  <Typography sx={{ color: '#9ca3af', fontSize: '0.85rem' }}>
                    Updated: {job.lastUpdate}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Tooltip title="Open Job URL">
                  <IconButton 
                    size="small" 
                    sx={{ 
                      color: '#6b7280',
                      '&:hover': { 
                        color: '#fff',
                        bgcolor: 'rgba(255, 255, 255, 0.1)'
                      }
                    }}
                    onClick={() => window.open(job.jobUrl, '_blank')}
                  >
                    <LinkIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default JobTable; 