import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { twentyCRMService } from '../services/api'

const CRMContainer = styled.div`
  margin-bottom: 2rem;
`

const CRMTitle = styled.h1`
  font-family: 'Sora', Inter, sans-serif;
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #ffffff;
`

const CRMSubtitle = styled.p`
  color: #b0b0b0;
  font-size: 1.125rem;
  margin-bottom: 2rem;
`

const ActionsContainer = styled.div`
  margin-bottom: 2rem;
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

const ContactsCard = styled.div`
  background-color: #2d2d2d;
  border: 1px solid #404040;
  border-radius: 0.75rem;
  padding: 1.5rem;
`

const Table = styled.div`
  overflow-x: auto;
`

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr 2fr 1fr 1fr;
  gap: 1rem;
  padding: 1rem;
  border-bottom: 1px solid #3d3d3d;
  align-items: center;

  &:last-child {
    border-bottom: none;
  }
`

const TableHeader = styled(TableRow)`
  font-weight: 600;
  color: #b0b0b0;
  background-color: #3d3d3d;
  border-bottom: 2px solid #404040;
  border-radius: 0.5rem 0.5rem 0 0;
`

const ContactCell = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const Avatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #8b0000;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 0.875rem;
`

const StatusBadge = styled.span<{ status: string }>`
  background-color: ${props => {
    const colors = {
      'new': '#ffaa00',
      'contacted': '#4f46e5',
      'qualified': '#00ff88',
      'proposal': '#f59e0b',
      'won': '#00ff88',
      'lost': '#ff4444',
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

const ValueCell = styled.div`
  color: #8b0000;
  font-weight: 600;
`

const LoadingContainer = styled.div`
  padding: 2rem;
  text-align: center;
  color: #b0b0b0;
`

interface Contact {
  id: string
  name: string
  email: string
  company?: string
  status: string
  value?: number
}

export const TwentyCRM: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadContacts()
  }, [])

  const loadContacts = async () => {
    setLoading(true)
    try {
      const data = await twentyCRMService.getContacts()
      setContacts(data)
    } catch (error) {
      console.error('Error loading contacts:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSyncWithTwenty = async () => {
    try {
      await loadContacts()
      alert('Successfully synced with Twenty CRM!')
    } catch (error) {
      alert('Sync failed. Please try again.')
    }
  }

  return (
    <CRMContainer>
      <CRMTitle>📊 Twenty CRM Integration</CRMTitle>
      <CRMSubtitle>
        Native Twenty CRM interface with Tiny Sumo branding
      </CRMSubtitle>

      <ActionsContainer>
        <ActionButton variant="primary">
          <span>➕</span>
          Add Contact
        </ActionButton>
        <ActionButton variant="primary" onClick={handleSyncWithTwenty}>
          <span>🔄</span>
          Sync with Twenty
        </ActionButton>
        <ActionButton variant="secondary">
          <span>📤</span>
          Export Contacts
        </ActionButton>
      </ActionsContainer>

      <ContactsCard>
        <h2 style={{ 
          fontSize: '1.25rem', 
          fontWeight: 600, 
          marginBottom: '1rem',
          color: '#ffffff' 
        }}>
          Contacts
        </h2>
        
        {loading ? (
          <LoadingContainer>
            <div className="loading-spinner"></div>
            Loading contacts...
          </LoadingContainer>
        ) : contacts.length === 0 ? (
          <LoadingContainer>
            No contacts found. Add your first contact to get started!
          </LoadingContainer>
        ) : (
          <Table>
            <TableHeader>
              <div>Name</div>
              <div>Email</div>
              <div>Company</div>
              <div>Status</div>
              <div>Value</div>
            </TableHeader>
            {contacts.map((contact) => (
              <TableRow key={contact.id}>
                <ContactCell>
                  <Avatar>{contact.name.charAt(0)}</Avatar>
                  <span style={{ color: '#ffffff' }}>{contact.name}</span>
                </ContactCell>
                <div style={{ color: '#ffffff' }}>{contact.email}</div>
                <div style={{ color: '#ffffff' }}>{contact.company || 'N/A'}</div>
                <StatusBadge status={contact.status}>
                  {contact.status}
                </StatusBadge>
                <ValueCell>
                  ${contact.value?.toLocaleString() || 0}
                </ValueCell>
              </TableRow>
            ))}
          </Table>
        )}
      </ContactsCard>
    </CRMContainer>
  )
}
