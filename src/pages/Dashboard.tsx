import React from 'react'
import styled from '@emotion/styled'

const DashboardContainer = styled.div`
  margin-bottom: 2rem;
`

const DashboardTitle = styled.h1`
  font-family: 'Sora', Inter, sans-serif;
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #ffffff;
`

const DashboardSubtitle = styled.p`
  color: #b0b0b0;
  font-size: 1.125rem;
  margin-bottom: 2rem;
`

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`

const StatCard = styled.div`
  background-color: #2d2d2d;
  border: 1px solid #404040;
  border-radius: 0.75rem;
  padding: 1.5rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.5);
  }
`

const StatNumber = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #8b0000;
  margin-bottom: 0.25rem;
`

const StatLabel = styled.div`
  color: #b0b0b0;
`

const StatChange = styled.div<{ positive: boolean }>`
  font-size: 0.875rem;
  font-weight: 500;
  margin-top: 0.25rem;
  color: ${props => props.positive ? '#00ff88' : '#ff4444'};
`

const QuickActionsCard = styled.div`
  background-color: #2d2d2d;
  border: 1px solid #404040;
  border-radius: 0.75rem;
  padding: 1.5rem;
`

const ActionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
`

const ActionButton = styled.button`
  background-color: #8b0000;
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background-color: #ff4444;
    transform: translateY(-1px);
  }
`

export const Dashboard: React.FC = () => {
  const stats = [
    { label: 'Total Leads', value: '1,247', change: '+12%', positive: true },
    { label: 'Active Projects', value: '23', change: '+5%', positive: true },
    { label: 'Monthly Revenue', value: '$45,280', change: '+8%', positive: true },
    { label: 'Conversion Rate', value: '12.4%', change: '-2%', positive: false },
  ]

  const quickActions = [
    { id: 'new-lead', name: 'New Lead', icon: '➕' },
    { id: 'sync-twenty', name: 'Sync Twenty', icon: '🔄' },
    { id: 'view-analytics', name: 'Analytics', icon: '📈' },
    { id: 'export-data', name: 'Export', icon: '📤' },
  ]

  return (
    <DashboardContainer>
      <DashboardTitle>Welcome to Tiny Sumo Marketing Hub</DashboardTitle>
      <DashboardSubtitle>
        Your central command center for marketing operations with Huly and Twenty CRM integration
      </DashboardSubtitle>

      <StatsGrid>
        {stats.map((stat, index) => (
          <StatCard key={index}>
            <StatNumber>{stat.value}</StatNumber>
            <StatLabel>{stat.label}</StatLabel>
            <StatChange positive={stat.positive}>{stat.change}</StatChange>
          </StatCard>
        ))}
      </StatsGrid>

      <QuickActionsCard>
        <h2 style={{ 
          fontSize: '1.25rem', 
          fontWeight: 600, 
          marginBottom: '1rem',
          color: '#ffffff' 
        }}>
          Quick Actions
        </h2>
        
        <ActionGrid>
          {quickActions.map((action) => (
            <ActionButton key={action.id}>
              <span style={{ fontSize: '1.5rem' }}>{action.icon}</span>
              <span>{action.name}</span>
            </ActionButton>
          ))}
        </ActionGrid>
      </QuickActionsCard>
    </DashboardContainer>
  )
}
