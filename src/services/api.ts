// Backend service to connect to Twenty's backend
import axios from 'axios'

const TWENTY_API_BASE_URL = import.meta.env.VITE_TWENTY_API_URL || 'http://localhost:3000'

// Twenty CRM API client
export class TwentyCRMService {
  private baseURL: string
  private apiKey: string

  constructor(baseURL: string = TWENTY_API_BASE_URL, apiKey?: string) {
    this.baseURL = baseURL
    this.apiKey = apiKey || import.meta.env.VITE_TWENTY_API_KEY || 'demo-key'
  }

  async getContacts() {
    try {
      const response = await axios.get(`${this.baseURL}/contacts`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      })
      return response.data
    } catch (error) {
      console.warn('Twenty CRM API not available, using mock data')
      return this.getMockContacts()
    }
  }

  async createContact(contact: any) {
    try {
      const response = await axios.post(`${this.baseURL}/contacts`, contact, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      })
      return response.data
    } catch (error) {
      console.warn('Twenty CRM API not available, creating mock contact')
      return {
        ...contact,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    }
  }

  async getAnalytics() {
    try {
      const response = await axios.get(`${this.baseURL}/analytics/dashboard`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      })
      return response.data
    } catch (error) {
      console.warn('Twenty CRM API not available, using mock analytics')
      return this.getMockAnalytics()
    }
  }

  private getMockContacts() {
    return [
      {
        id: '1',
        name: 'John Smith',
        email: 'john@techcorp.com',
        company: 'TechCorp Solutions',
        status: 'qualified',
        value: 15000,
        source: 'website',
        phone: '+1-555-0123',
        position: 'CTO',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: '2',
        name: 'Sarah Johnson',
        email: 'sarah@startup.com',
        company: 'StartupCo',
        status: 'proposal',
        value: 25000,
        source: 'referral',
        phone: '+1-555-0124',
        position: 'CEO',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ]
  }

  private getMockAnalytics() {
    return {
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
  }
}

// Service instance
export const twentyCRMService = new TwentyCRMService()
