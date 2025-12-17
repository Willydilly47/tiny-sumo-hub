import React from 'react'
import styled from '@emotion/styled'
import { useNavigate, useLocation } from 'react-router-dom'

const LayoutContainer = styled.div`
  min-height: 100vh;
  background-color: #1a1a1a;
  color: #ffffff;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
`

const Header = styled.header`
  background-color: #2d2d2d;
  border-bottom: 1px solid #404040;
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
`

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
`

const Logo = styled.h1`
  font-family: 'Sora', Inter, sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  color: #8b0000;
  margin: 0;
`

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
`

const NavLink = styled.button<{ active?: boolean }>`
  background: none;
  border: none;
  color: ${props => props.active ? '#ffffff' : '#b0b0b0'};
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
  cursor: pointer;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    color: #ffffff;
    background-color: rgba(139, 0, 0, 0.1);
  }

  ${props => props.active && `
    background-color: rgba(139, 0, 0, 0.1);
    color: #ffffff;
  `}
`

const Main = styled.main`
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`

interface LayoutProps {
  children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/twenty-crm', label: 'Twenty CRM', icon: '👥' },
    { path: '/analytics', label: 'Analytics', icon: '📈' },
    { path: '/campaigns', label: 'Campaigns', icon: '📢' },
  ]

  return (
    <LayoutContainer>
      <Header>
        <HeaderContent>
          <Logo>🥋 Tiny Sumo Marketing Hub</Logo>
          
          <Nav>
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                active={location.pathname === item.path || (location.pathname === '/' && item.path === '/dashboard')}
                onClick={() => navigate(item.path)}
              >
                <span>{item.icon}</span>
                {item.label}
              </NavLink>
            ))}
          </Nav>
        </HeaderContent>
      </Header>
      
      <Main>
        {children}
      </Main>
    </LayoutContainer>
  )
}
