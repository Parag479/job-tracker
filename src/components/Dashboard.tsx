import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { IconContext } from 'react-icons';

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Tooltip, Legend, Title);

const DashboardContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  min-height: 100vh;
  background: var(--bg-primary);
  padding-top: 80px;
`;

const DashboardHeader = styled.div`
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: var(--bg-secondary);
  border-radius: 16px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const PageTitle = styled.h1`
  color: var(--text-primary);
  margin-bottom: 0.5rem;
  font-size: 2.5rem;
  font-weight: 700;
`;

const Subtitle = styled.p`
  color: var(--text-secondary);
  font-size: 1.1rem;
  opacity: 0.8;
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
  border-radius: 16px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  color: white;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }

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
  font-weight: 500;
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
  border-radius: 16px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }
`;

const MonthlyChartCard = styled.div`
  background-color: var(--bg-secondary);
  padding: 1.5rem;
  border-radius: 16px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  grid-column: 1 / -1;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }
`;

const ChartHeader = styled.h3`
  color: var(--text-primary);
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  font-weight: 600;
`;

const AddJobButton = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: var(--gradient-purple);
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  z-index: 10;

  &:hover {
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0) scale(0.95);
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

const Dashboard = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
          'rgba(147, 51, 234, 0.8)',  // Purple
          'rgba(59, 130, 246, 0.8)',  // Blue
          'rgba(16, 185, 129, 0.8)',  // Green
          'rgba(239, 68, 68, 0.8)',   // Red
        ],
        borderColor: [
          'rgba(147, 51, 234, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(16, 185, 129, 1)',
          'rgba(239, 68, 68, 1)',
        ],
        borderWidth: 2,
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
          'rgba(147, 51, 234, 0.8)',  // Purple
          'rgba(59, 130, 246, 0.8)',  // Blue
          'rgba(16, 185, 129, 0.8)',  // Green
          'rgba(245, 158, 11, 0.8)',  // Yellow
          'rgba(236, 72, 153, 0.8)',  // Pink
          'rgba(14, 165, 233, 0.8)',  // Sky Blue
        ],
        borderColor: [
          'rgba(147, 51, 234, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(16, 185, 129, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(236, 72, 153, 1)',
          'rgba(14, 165, 233, 1)',
        ],
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  };

  const monthlyChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Applications',
        data: [12, 19, 15, 8, 10, 14],
        backgroundColor: [
          'rgba(147, 51, 234, 0.8)',  // Purple
          'rgba(59, 130, 246, 0.8)',  // Blue
          'rgba(16, 185, 129, 0.8)',  // Green
          'rgba(245, 158, 11, 0.8)',  // Yellow
          'rgba(236, 72, 153, 0.8)',  // Pink
          'rgba(14, 165, 233, 0.8)',  // Sky Blue
        ],
        borderColor: [
          'rgba(147, 51, 234, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(16, 185, 129, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(236, 72, 153, 1)',
          'rgba(14, 165, 233, 1)',
        ],
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
      }
    ]
  };

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1000,
      easing: 'easeInOutQuart' as const
    },
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: 'var(--text-primary)',
          font: {
            size: 12,
            weight: 'normal' as const
          },
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle' as const
        }
      },
      tooltip: {
        backgroundColor: 'var(--bg-secondary)',
        titleColor: 'var(--text-primary)',
        bodyColor: 'var(--text-primary)',
        padding: 12,
        boxPadding: 4,
        usePointStyle: true,
        callbacks: {
          label: function(context: any) {
            return `${context.raw} applications`;
          }
        }
      }
    }
  };

  const barOptions = {
    ...commonOptions,
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: 'var(--text-secondary)',
          font: {
            size: 12,
            weight: 'normal' as const
          }
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        },
        ticks: {
          color: 'var(--text-secondary)',
          font: {
            size: 12,
            weight: 'normal' as const
          },
          stepSize: 5
        }
      }
    }
  };

  const pieOptions = {
    ...commonOptions,
    cutout: '60%',
    plugins: {
      ...commonOptions.plugins,
      legend: {
        ...commonOptions.plugins.legend,
        position: 'right' as const
      }
    }
  };

  if (loading) {
    return <DashboardContainer>Loading...</DashboardContainer>;
  }

  return (
    <IconContext.Provider value={{ size: '24px', style: { verticalAlign: 'middle' } }}>
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
            <ChartHeader>Application Status</ChartHeader>
            <div style={{ height: '300px', position: 'relative' }}>
              <Pie data={pieChartData} options={pieOptions} />
            </div>
          </ChartCard>
          <ChartCard>
            <ChartHeader>Monthly Applications</ChartHeader>
            <div style={{ height: '300px', position: 'relative' }}>
              <Bar data={barChartData} options={barOptions} />
            </div>
          </ChartCard>
        </ChartsGrid>

        <MonthlyChartCard>
          <ChartHeader>Monthly Applications Trend</ChartHeader>
          <div style={{ height: '300px', position: 'relative' }}>
            <Bar data={monthlyChartData} options={barOptions} />
          </div>
        </MonthlyChartCard>

        <AddJobButton onClick={() => navigate('/add-job')}>
          {FaPlus({})}
        </AddJobButton>
      </DashboardContainer>
    </IconContext.Provider>
  );
};

export default Dashboard; 