import React from 'react';
import styled from 'styled-components';
import { ResponsivePie } from '@nivo/pie';
import { ResponsiveLine } from '@nivo/line';
import { ResponsiveBar } from '@nivo/bar';

const DashboardContainer = styled.div`
  display: grid;
  gap: 2rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const StatCard = styled.div<{ color?: string }>`
  background-color: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: ${props => props.color || '#4DA8DA'};
  }
`;

const StatTitle = styled.h3`
  color: #666;
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

const StatValue = styled.div`
  color: #333;
  font-size: 2.5rem;
  font-weight: bold;
`;

const ChartContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.5rem;
  margin-top: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const ChartCard = styled.div`
  background-color: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  height: 400px;
`;

const SmallChartCard = styled(ChartCard)`
  height: 400px;
`;

const ProgressSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
`;

const ProgressBar = styled.div<{ progress: number; color: string }>`
  width: 100%;
  height: 8px;
  background-color: #f0f0f0;
  border-radius: 4px;
  overflow: hidden;
  
  &::after {
    content: '';
    display: block;
    width: ${props => props.progress}%;
    height: 100%;
    background-color: ${props => props.color};
    transition: width 0.3s ease;
  }
`;

const ProgressLabel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #666;
  font-size: 0.875rem;
`;

const Dashboard = () => {
  // Mock data for demonstration
  const stats = {
    totalApplications: 80,
    interviewsScheduled: 60,
    offersReceived: 40,
    rejections: 20
  };

  const pieData = [
    { id: 'Applied', value: stats.totalApplications, color: '#FF00FF' },
    { id: 'Interviews', value: stats.interviewsScheduled, color: '#0088FE' },
    { id: 'Offers', value: stats.offersReceived, color: '#FFBB28' },
    { id: 'Rejected', value: stats.rejections, color: '#FF8042' }
  ];

  const lineData = [
    {
      id: 'applications',
      data: [
        { x: 'Jan', y: 10 },
        { x: 'Feb', y: 15 },
        { x: 'Mar', y: 20 },
        { x: 'Apr', y: 25 },
        { x: 'May', y: 30 },
        { x: 'Jun', y: 35 }
      ]
    }
  ];

  const progressData = [
    { label: 'Resume Response Rate', progress: 50, color: '#FF00FF' },
    { label: 'Interview Success Rate', progress: 80, color: '#0088FE' },
    { label: 'Offer Acceptance Rate', progress: 10, color: '#FFBB28' }
  ];

  return (
    <DashboardContainer>
      <h1>Dashboard</h1>
      <StatsGrid>
        <StatCard color="#FF00FF">
          <StatTitle>Total Applications</StatTitle>
          <StatValue>{stats.totalApplications}</StatValue>
        </StatCard>
        <StatCard color="#0088FE">
          <StatTitle>Interviews Scheduled</StatTitle>
          <StatValue>{stats.interviewsScheduled}</StatValue>
        </StatCard>
        <StatCard color="#FFBB28">
          <StatTitle>Offers Received</StatTitle>
          <StatValue>{stats.offersReceived}</StatValue>
        </StatCard>
        <StatCard color="#FF8042">
          <StatTitle>Rejections</StatTitle>
          <StatValue>{stats.rejections}</StatValue>
        </StatCard>
      </StatsGrid>

      <ChartContainer>
        <ChartCard>
          <h2>Application Timeline</h2>
          <div style={{ height: '320px' }}>
            <ResponsiveLine
              data={lineData}
              margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
              xScale={{ type: 'point' }}
              yScale={{ type: 'linear', min: 'auto', max: 'auto' }}
              curve="cardinal"
              axisTop={null}
              axisRight={null}
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0
              }}
              pointSize={10}
              pointColor={{ theme: 'background' }}
              pointBorderWidth={2}
              pointBorderColor={{ from: 'serieColor' }}
              enablePointLabel={true}
              pointLabel="y"
              pointLabelYOffset={-12}
              enableArea={true}
              areaOpacity={0.15}
              useMesh={true}
              legends={[
                {
                  anchor: 'bottom-right',
                  direction: 'column',
                  justify: false,
                  translateX: 100,
                  translateY: 0,
                  itemsSpacing: 0,
                  itemDirection: 'left-to-right',
                  itemWidth: 80,
                  itemHeight: 20,
                  symbolSize: 14,
                  symbolShape: 'circle'
                }
              ]}
              theme={{
                axis: {
                  ticks: {
                    text: {
                      fill: '#666666'
                    }
                  }
                },
                grid: {
                  line: {
                    stroke: '#dddddd',
                    strokeWidth: 1
                  }
                }
              }}
            />
          </div>
        </ChartCard>

        <SmallChartCard>
          <h2>Application Status</h2>
          <div style={{ height: '320px' }}>
            <ResponsivePie
              data={pieData}
              margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
              innerRadius={0.5}
              padAngle={0.7}
              cornerRadius={3}
              activeOuterRadiusOffset={8}
              borderWidth={1}
              borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
              arcLinkLabelsSkipAngle={10}
              arcLinkLabelsTextColor="#333333"
              arcLinkLabelsThickness={2}
              arcLinkLabelsColor={{ from: 'color' }}
              arcLabelsSkipAngle={10}
              arcLabelsTextColor="#ffffff"
              legends={[
                {
                  anchor: 'bottom',
                  direction: 'row',
                  justify: false,
                  translateX: 0,
                  translateY: 56,
                  itemsSpacing: 0,
                  itemWidth: 100,
                  itemHeight: 18,
                  itemTextColor: '#999',
                  itemDirection: 'left-to-right',
                  itemOpacity: 1,
                  symbolSize: 18,
                  symbolShape: 'circle'
                }
              ]}
            />
          </div>
        </SmallChartCard>
      </ChartContainer>

      <ProgressSection>
        <h2>Performance Metrics</h2>
        {progressData.map((item, index) => (
          <div key={index}>
            <ProgressLabel>
              <span>{item.label}</span>
              <span>{item.progress}%</span>
            </ProgressLabel>
            <ProgressBar progress={item.progress} color={item.color} />
          </div>
        ))}
      </ProgressSection>
    </DashboardContainer>
  );
};

export default Dashboard; 