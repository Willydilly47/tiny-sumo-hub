import React from 'react'
import styled from '@emotion/styled'

const CampaignsContainer = styled.div`
  margin-bottom: 2rem;
`

const CampaignsTitle = styled.h1`
  font-family: 'Sora', Inter, sans-serif;
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #ffffff;
`

const CampaignsSubtitle = styled.p`
  color: #b0b0b0;
  font-size: 1.125rem;
  margin-bottom: 2rem;
`

const OverviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`

const OverviewCard = styled.div`
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

const OverviewNumber = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #8b0000;
  margin-bottom: 0.25rem;
`

const OverviewLabel = styled.div`
  color: #b0b0b0;
`

const CampaignsCard = styled.div`
  background-color: #2d2d2d;
  border: 1px solid #404040;
  border-radius: 0.75rem;
  padding: 1.5rem;
`

const CampaignList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const CampaignItem = styled.div`
  background-color: #3d3d3d;
  border: 1px solid #404040;
  border-radius: 0.5rem;
  padding: 1.5rem;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-1px);
  }
`

const CampaignHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 1rem;
`

const CampaignName = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 0.25rem;
`

const CampaignType = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #b0b0b0;
  font-size: 0.875rem;
  text-transform: uppercase;
`

const StatusBadge = styled.span<{ status: string }>`
  background-color: ${props => {
    const colors = {
      'draft': '#6b7280',
      'active': '#00ff88',
      'paused': '#ffaa00',
      'completed': '#8b0000',
    }
    return colors[props.status as keyof typeof colors] || '#6b7280'
  }};
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
`

const CampaignMetrics = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
`

const Metric = styled.div`
  text-align: center;
`

const MetricValue = styled.div`
  font-size: 1.125rem;
  font-weight: 700;
  color: #8b0000;
  margin-bottom: 0.25rem;
`

const MetricLabel = styled.div`
  color: #b0b0b0;
  font-size: 0.75rem;
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

// Mock campaign data
const mockCampaigns = [
  {
    id: '1',
    name: 'Q1 Email Newsletter',
    type: 'email',
    status: 'active',
    budget: 5000,
    spent: 3200,
    leads: 45,
    conversions: 8,
  },
  {
    id: '2',
    name: 'LinkedIn Lead Generation',
    type: 'social',
    status: 'active',
    budget: 3000,
    spent: 1800,
    leads: 32,
    conversions: 5,
  },
  {
    id: '3',
    name: 'Content Marketing Push',
    type: 'content',
    status: 'draft',
    budget: 2000,
    spent: 0,
    leads: 0,
    conversions: 0,
  },
]

export const Campaigns: React.FC = () => {
  const totalBudget = mockCampaigns.reduce((sum, c) => sum + c.budget, 0)
  const totalSpent = mockCampaigns.reduce((sum, c) => sum + c.spent, 0)
  const activeCampaigns = mockCampaigns.filter(c => c.status === 'active').length
  const totalLeads = mockCampaigns.reduce((sum, c) => sum + c.leads, 0)

  const getTypeIcon = (type: string) => {
    const icons = {
      'email': '📧',
      'social': '📱',
      'content': '📝',
      'event': '🎯',
    }
    return icons[type as keyof typeof icons] || '📊'
  }

  return (
    <CampaignsContainer>
      <CampaignsTitle>📢 Campaign Manager</CampaignsTitle>
      <CampaignsSubtitle>
        Marketing campaign orchestration with Twenty CRM integration
      </CampaignsSubtitle>

      <ActionsContainer>
        <ActionButton variant="primary">
          <span>➕</span>
          Create Campaign
        </ActionButton>
        <ActionButton variant="secondary">
          <span>🔄</span>
          Refresh
        </ActionButton>
        <ActionButton variant="secondary">
          <span>📤</span>
          Export Data
        </ActionButton>
      </ActionsContainer>

      <OverviewGrid>
        <OverviewCard>
          <OverviewNumber>{mockCampaigns.length}</OverviewNumber>
          <OverviewLabel>Total Campaigns</OverviewLabel>
        </OverviewCard>
        
        <OverviewCard>
          <OverviewNumber>{activeCampaigns}</OverviewNumber>
          <OverviewLabel>Active Campaigns</OverviewLabel>
        </OverviewCard>
        
        <OverviewCard>
          <OverviewNumber>${totalBudget.toLocaleString()}</OverviewNumber>
          <OverviewLabel>Total Budget</OverviewLabel>
        </OverviewCard>
        
        <OverviewCard>
          <OverviewNumber>{totalLeads}</OverviewNumber>
          <OverviewLabel>Total Leads</OverviewLabel>
        </OverviewCard>
      </OverviewGrid>

      <CampaignsCard>
        <h2 style={{ 
          fontSize: '1.25rem', 
          fontWeight: 600, 
          marginBottom: '1rem',
          color: '#ffffff' 
        }}>
          Campaign Performance
        </h2>
        
        <CampaignList>
          {mockCampaigns.map((campaign) => (
            <CampaignItem key={campaign.id}>
              <CampaignHeader>
                <div>
                  <CampaignName>{campaign.name}</CampaignName>
                  <CampaignType>
                    <span>{getTypeIcon(campaign.type)}</span>
                    <span>{campaign.type}</span>
                  </CampaignType>
                </div>
                <StatusBadge status={campaign.status}>
                  {campaign.status}
                </StatusBadge>
              </CampaignHeader>

              <CampaignMetrics>
                <Metric>
                  <MetricValue>${campaign.spent.toLocaleString()}</MetricValue>
                  <MetricLabel>
                    Spent / ${campaign.budget.toLocaleString()}
                  </MetricLabel>
                </Metric>
                
                <Metric>
                  <MetricValue>{campaign.leads}</MetricValue>
                  <MetricLabel>Leads</MetricLabel>
                </Metric>
                
                <Metric>
                  <MetricValue>{campaign.conversions}</MetricValue>
                  <MetricLabel>Conversions</MetricLabel>
                </Metric>
                
                <Metric>
                  <MetricValue>
                    {campaign.leads > 0 
                      ? ((campaign.conversions / campaign.leads) * 100).toFixed(1)
                      : 0}%
                  </MetricValue>
                  <MetricLabel>Conversion Rate</MetricLabel>
                </Metric>
              </CampaignMetrics>
            </CampaignItem>
          ))}
        </CampaignList>
      </CampaignsCard>
    </CampaignsContainer>
  )
}
