import React from 'react'
import styled from '@emotion/styled'

const AnalyticsContainer = styled.div`
  margin-bottom: 2rem;
`

const AnalyticsTitle = styled.h1`
  font-family: 'Sora', Inter, sans-serif;
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #ffffff;
`

const AnalyticsSubtitle = styled.p`
  color: #b0b0b0;
  font-size: 1.125rem;
  margin-bottom: 2rem;
`

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`

const MetricCard = styled.div`
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

const MetricNumber = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #8b0000;
  margin-bottom: 0.25rem;
`

const MetricLabel = styled.div`
  color: #b0b0b0;
`

const MetricChange = styled.div<{ positive: boolean }>`
  font-size: 0.875rem;
  font-weight: 500;
  margin-top: 0.25rem;
  color: ${props => props.positive ? '#00ff88' : '#ffaa00'};
`

const SourcesCard = styled.div`
  background-color: #2d2d2d;
  border: 1px solid #404040;
  border-radius: 0.75rem;
  padding: 1.5rem;
`

const SourceRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;

  &:last-child {
    margin-bottom: 0;
  }
`

const SourceName = styled.div`
  min-width: 120px;
  color: #ffffff;
  font-weight: 500;
`

const ProgressBar = styled.div`
  flex: 1;
  background-color: #3d3d3d;
  border-radius: 0.5rem;
  height: 24px;
  position: relative;
  overflow: hidden;
`

const ProgressFill = styled.div<{ percentage: number }>`
  width: ${props => props.percentage}%;
  height: 100%;
  background-color: #8b0000;
  border-radius: 0.5rem;
  transition: width 0.3s ease;
`

const SourceStats = styled.div`
  min-width: 100px;
  text-align: right;
  color: #b0b0b0;
  font-size: 0.875rem;
`

const ActionsContainer = styled.div`
  margin-bottom: 1rem;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`

const ActionButton = styled.button<{ variant?: 'primary' | 'secondary' }>`
  background-color: ${props => props.variant === 'primary' ? '#8b0000' : '#2d2d2d'};
  color: ${props => props.variant === 'primary' ? 'white' : '#ffffff'};
  border: ${props => props.variant === 'primary' ? 'none' : '1px solid #404040'};
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background-color: ${props => props.variant === 'primary' ? '#ff4444' : '#3d3d3d'};
  }
`

const LoadingContainer = styled.div`
  padding: 2rem;
  text-align: center;
  color: #b0b0b0;
`

export const Analytics: React.FC = () => {
  // Mock analytics data - in real implementation, this would come from Twenty CRM
  const mockAnalytics = {
    totalContacts: 156,
    qualifiedLeads: 23,
    pipelineValue: 125000,
    conversionRate: 12.4,
    monthlyGrowth: 8.5,
    topSources: [
      { source: 'website', count: 45, percentage: 28.8 },
      { source: 'referral', count: 32, percentage: 20.5 },
      { source: 'cold-call', count: 28, percentage: 17.9 },
      { source: 'social-media', count: 24, percentage: 15.4 },
      { source: 'other', count: 27, percentage: 17.3 },
    ],
  }

  const handleSyncWithHuly = async () => {
    try {
      alert('Successfully synced with Huly!')
    } catch (error) {
      alert('Sync failed. Please try again.')
    }
  }

  return (
    <AnalyticsContainer>
      <AnalyticsTitle>📈 Analytics Dashboard</AnalyticsTitle>
      <AnalyticsSubtitle>
        Marketing performance metrics from Huly and Twenty CRM integration
      </AnalyticsSubtitle>

      <ActionsContainer>
        <ActionButton variant="primary">
          <span>🔄</span>
          Refresh Data
        </ActionButton>
        <ActionButton variant="secondary" onClick={handleSyncWithHuly}>
          <span>🔗</span>
          Sync with Huly
        </ActionButton>
        <ActionButton variant="secondary">
          <span>📊</span>
          Export Report
        </ActionButton>
      </ActionsContainer>

      <MetricsGrid>
        <MetricCard>
          <MetricNumber>{mockAnalytics.totalContacts.toLocaleString()}</MetricNumber>
          <MetricLabel>Total Contacts</MetricLabel>
          <MetricChange positive={true}>
            +{mockAnalytics.monthlyGrowth}% from last month
          </MetricChange>
        </MetricCard>
        
        <MetricCard>
          <MetricNumber>{mockAnalytics.qualifiedLeads}</MetricNumber>
          <MetricLabel>Qualified Leads</MetricLabel>
          <MetricChange positive={true}>
            {((mockAnalytics.qualifiedLeads / mockAnalytics.totalContacts) * 100).toFixed(1)}% of total
          </MetricChange>
        </MetricCard>
        
        <MetricCard>
          <MetricNumber>${mockAnalytics.pipelineValue.toLocaleString()}</MetricNumber>
          <MetricLabel>Pipeline Value</MetricLabel>
          <MetricChange positive={true}>
            Total opportunity value
          </MetricChange>
        </MetricCard>
        
        <MetricCard>
          <MetricNumber>{mockAnalytics.conversionRate}%</MetricNumber>
          <MetricLabel>Conversion Rate</MetricLabel>
          <MetricChange positive={mockAnalytics.conversionRate > 10}>
            Contacts to customers
          </MetricChange>
        </MetricCard>
      </MetricsGrid>

      <SourcesCard>
        <h2 style={{ 
          fontSize: '1.25rem', 
          fontWeight: 600, 
          marginBottom: '1rem',
          color: '#ffffff' 
        }}>
          Lead Sources
        </h2>
        
        {mockAnalytics.topSources.map((source, index) => (
          <SourceRow key={index}>
            <SourceName>{source.source}</SourceName>
            <ProgressBar>
              <ProgressFill percentage={source.percentage} />
            </ProgressBar>
            <SourceStats>
              {source.count} ({source.percentage.toFixed(1)}%)
            </SourceStats>
          </SourceRow>
        ))}
      </SourcesCard>
    </AnalyticsContainer>
  )
}
