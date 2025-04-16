import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title as ChartTitle } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Tooltip, Legend, ChartTitle);

const DashboardContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const DashboardHeader = styled.div`
  margin-bottom: 2rem;
`;

const PageTitle = styled.h1`
  color: var(--text-primary);
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  color: var(--text-secondary);
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: var(--gradient-purple);
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  color: white;
  position: relative;
  overflow: hidden;

  &:nth-child(2) {
    background: var(--gradient-blue);
  }

  &:nth-child(3) {
    background: var(--gradient-mint);
  }

  &:nth-child(4) {
    background: var(--gradient-purple);
  }
`;

const StatTitle = styled.h3`
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const StatValue = styled.p`
  color: white;
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 0;
`;

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const ChartCard = styled.div`
  background-color: var(--bg-secondary);
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

interface Job {
  id: string;
  company: string;
  position: string;
  status: 'applied' | 'interview' | 'offer' | 'rejected';
  date: string;
}

const Dashboard = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch jobs from localStorage
    const storedJobs = localStorage.getItem('jobs');
    if (storedJobs) {
      setJobs(JSON.parse(storedJobs));
    }
    setLoading(false);
  }, []);

  const statusCounts = {
    applied: jobs.filter(job => job.status === 'applied').length,
    interview: jobs.filter(job => job.status === 'interview').length,
    offer: jobs.filter(job => job.status === 'offer').length,
    rejected: jobs.filter(job => job.status === 'rejected').length,
  };

  const pieChartData = {
    labels: ['Applied', 'Interview', 'Offer', 'Rejected'],
    datasets: [
      {
        data: [statusCounts.applied, statusCounts.interview, statusCounts.offer, statusCounts.rejected],
        backgroundColor: [
          'var(--primary-purple)',
          'var(--primary-mint)',
          'var(--primary-blue)',
          '#FF6B6B',
        ],
        borderWidth: 0,
        hoverOffset: 4,
      },
    ],
  };

  // Get monthly application counts for the last 6 months
  const getMonthlyData = () => {
    const months = [];
    const counts = [];
    const today = new Date();

    for (let i = 5; i >= 0; i--) {
      const month = new Date(today.getFullYear(), today.getMonth() - i, 1);
      months.push(month.toLocaleString('default', { month: 'short' }));
      
      const count = jobs.filter(job => {
        const jobDate = new Date(job.date);
        return jobDate.getMonth() === month.getMonth() && 
               jobDate.getFullYear() === month.getFullYear();
      }).length;
      
      counts.push(count);
    }

    return { months, counts };
  };

  const monthlyData = getMonthlyData();

  const barChartData = {
    labels: monthlyData.months,
    datasets: [
      {
        label: 'Applications',
        data: monthlyData.counts,
        backgroundColor: [
          'var(--primary-purple)',
          'var(--primary-mint)',
          'var(--primary-blue)',
          'var(--primary-purple)',
          'var(--primary-mint)',
          'var(--primary-blue)',
        ],
        borderRadius: 8,
        borderWidth: 0,
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Monthly Applications',
        color: 'var(--text-primary)',
        font: {
          size: 16,
          weight: 600,
        },
      },
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          color: 'var(--text-secondary)',
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
      x: {
        ticks: {
          color: 'var(--text-secondary)',
        },
        grid: {
          display: false,
        },
      },
    },
  } as const;

  if (loading) {
    return <DashboardContainer>Loading...</DashboardContainer>;
  }

  return (
    <DashboardContainer>
      <DashboardHeader>
        <PageTitle>Dashboard</PageTitle>
        <Subtitle>Track your job search progress</Subtitle>
      </DashboardHeader>

      <StatsGrid>
        <StatCard>
          <StatTitle>Total Applications</StatTitle>
          <StatValue>{jobs.length}</StatValue>
        </StatCard>
        <StatCard>
          <StatTitle>Active Applications</StatTitle>
          <StatValue>{statusCounts.applied + statusCounts.interview}</StatValue>
        </StatCard>
        <StatCard>
          <StatTitle>Success Rate</StatTitle>
          <StatValue>
            {jobs.length > 0
              ? Math.round((statusCounts.offer / jobs.length) * 100) + '%'
              : '0%'}
          </StatValue>
        </StatCard>
        <StatCard>
          <StatTitle>Interview Rate</StatTitle>
          <StatValue>
            {jobs.length > 0
              ? Math.round(((statusCounts.interview + statusCounts.offer) / jobs.length) * 100) + '%'
              : '0%'}
          </StatValue>
        </StatCard>
      </StatsGrid>

      <ChartsGrid>
        <ChartCard>
          <Pie data={pieChartData} />
        </ChartCard>
        <ChartCard>
          <Bar data={barChartData} options={barChartOptions} />
        </ChartCard>
      </ChartsGrid>
    </DashboardContainer>
  );
};

export default Dashboard; 