import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Dashboard } from './pages/Dashboard'
import { TwentyCRM } from './pages/TwentyCRM'
import { Analytics } from './pages/Analytics'
import { Campaigns } from './pages/Campaigns'

export const App: React.FC = () => {
  return (
    <div className="tiny-sumo-theme">
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/twenty-crm" element={<TwentyCRM />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/campaigns" element={<Campaigns />} />
        </Routes>
      </Layout>
    </div>
  )
}
