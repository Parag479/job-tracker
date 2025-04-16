import React from 'react';
import { Box, Card, Container, Typography, Paper } from '@mui/material';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler,
  ChartOptions,
  ChartData
} from 'chart.js';
import JobTable from './JobTable';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
);

// Define types for chart data and options for better type safety
type LineChartData = ChartData<'line'>;
type DoughnutChartData = ChartData<'doughnut'>;

const JobDashboard = () => {
  // Sample data for the line chart - styled like the image
  const lineChartData: LineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Applications',
        data: [12, 19, 15, 25, 22, 30],
        borderColor: 'var(--primary-purple)',
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 200);
          gradient.addColorStop(0, 'rgba(155, 110, 214, 0.4)');
          gradient.addColorStop(1, 'rgba(155, 110, 214, 0.05)');
          return gradient;
        },
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 0,
      },
    ],
  };

  // Sample data for the doughnut chart - styled like the image
  const statusData: DoughnutChartData = {
    labels: ['Applied', 'Interview', 'Offer', 'Rejected'],
    datasets: [
      {
        data: [40, 25, 20, 15],
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

  // Chart options for Line Chart
  const lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1000,
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: { 
          color: '#666',
          font: {
            size: 10,
          },
          padding: 10,
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: { 
          color: '#666',
          font: {
            size: 10,
          },
          padding: 10,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        padding: 10,
        displayColors: false,
        callbacks: {
          label: function(context: any) {
            return ` ${context.dataset.label}: ${context.parsed.y}`;
          }
        }
      },
    },
    interaction: {
      mode: 'index',
      intersect: false,
    },
  };

  // Chart options for Doughnut Chart
  const doughnutChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '65%',
    animation: {
      duration: 1000,
    },
    plugins: {
      legend: {
        display: true,
        position: 'right' as const,
        labels: {
          color: '#333',
          font: {
            size: 12,
          },
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 15,
          boxWidth: 10,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        padding: 10,
        displayColors: false,
        callbacks: {
          label: function(context: any) {
            const value = context.parsed;
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = Math.round((value * 100) / total);
            return ` ${context.label}: ${percentage}% (${value})`;
          }
        }
      },
    },
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4, bgcolor: '#f8f9fa', borderRadius: 2, p: { xs: 2, md: 4 } }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#333', mb: 4, textAlign: 'center', fontWeight: 'bold' }}>
        Job Tracking Dashboard
      </Typography>
      
      <Box sx={{ 
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        width: '100%'
      }}>
        {/* Status Cards - Updated with Gradients and Light Theme */}
        <Box sx={{ 
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' },
          gap: 3,
          width: '100%'
        }}>
          <Card sx={{ 
            p: 2.5, 
            color: '#fff',
            borderRadius: 2,
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            background: 'var(--gradient-purple)',
            position: 'relative',
          }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>125</Typography>
            <Typography variant="body2">Total Applications</Typography>
            <Typography sx={{ position: 'absolute', top: 12, right: 12, fontSize: '0.8rem', bgcolor: 'rgba(255,255,255,0.2)', borderRadius: '4px', px: 1 }}>+10%</Typography>
          </Card>
          <Card sx={{ 
            p: 2.5, 
            color: '#fff',
            borderRadius: 2,
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            background: 'var(--gradient-mint)',
            position: 'relative',
          }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>8</Typography>
            <Typography variant="body2">Active Interviews</Typography>
            <Typography sx={{ position: 'absolute', top: 12, right: 12, fontSize: '0.8rem', bgcolor: 'rgba(255,255,255,0.2)', borderRadius: '4px', px: 1 }}>+5%</Typography>
          </Card>
          <Card sx={{ 
            p: 2.5, 
            color: '#fff',
            borderRadius: 2,
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            background: 'var(--gradient-blue)',
            position: 'relative',
          }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>3</Typography>
            <Typography variant="body2">Offers Received</Typography>
            <Typography sx={{ position: 'absolute', top: 12, right: 12, fontSize: '0.8rem', bgcolor: 'rgba(255,255,255,0.2)', borderRadius: '4px', px: 1 }}>+2%</Typography>
          </Card>
        </Box>

        {/* Charts - Updated for Light Theme */}
        <Box sx={{ 
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' },
          gap: 3,
          width: '100%'
        }}>
          <Paper sx={{ 
            p: { xs: 2, md: 3 }, 
            bgcolor: '#fff',
            color: '#333',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            borderRadius: 2,
          }}>
            <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: '600' }}>
              Application Trends
            </Typography>
            <Box sx={{ height: 280 }}>
              <Line data={lineChartData} options={lineChartOptions} />
            </Box>
          </Paper>

          <Paper sx={{ 
            p: { xs: 2, md: 3 }, 
            bgcolor: '#fff',
            color: '#333',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            borderRadius: 2,
          }}>
            <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: '600' }}>
              Application Status
            </Typography>
            <Box sx={{ height: 280, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
              <Doughnut data={statusData} options={doughnutChartOptions} />
            </Box>
          </Paper>
        </Box>

        {/* Job Applications Table - Updated for Light Theme */}
        <Paper sx={{ 
          p: { xs: 2, md: 3 }, 
          bgcolor: '#fff', 
          color: '#333',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          borderRadius: 2,
        }}>
          <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: '600' }}>
            Recent Applications
          </Typography>
          <JobTable /> 
        </Paper>
      </Box>
    </Container>
  );
};

export default JobDashboard;