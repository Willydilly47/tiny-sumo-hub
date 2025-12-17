import React from 'react'
import styled from '@emotion/styled'

interface TableProps {
  children: React.ReactNode
}

interface TableHeadProps {
  children: React.ReactNode
}

interface TableBodyProps {
  children: React.ReactNode
}

interface TableRowProps {
  children: React.ReactNode
}

interface TableCellProps {
  children: React.ReactNode
  style?: React.CSSProperties
}

const TableContainer = styled.table\`
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  background-color: transparent;
\`

const TableHeader = styled.thead\`
  background-color: #2d2d2d;
\`

const TableHeaderRow = styled.tr\`
  border-bottom: 1px solid #404040;
\`

const TableHeaderCell = styled.th\`
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  color: #b0b0b0;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
\`

const TableBody = styled.tbody\`
  background-color: transparent;
\`

const TableBodyRow = styled.tr\`
  border-bottom: 1px solid #2d2d2d;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(139, 0, 0, 0.05);
  }

  &:last-child {
    border-bottom: none;
  }
\`

const TableBodyCell = styled.td\`
  padding: 1rem;
  color: #ffffff;
  font-size: 0.875rem;
\`

export const TwentyTable: React.FC<TableProps> = ({ children }) => {
  return (
    <TableContainer>
      {children}
    </TableContainer>
  )
}

export const TwentyTableHead: React.FC<TableHeadProps> = ({ children }) => {
  return (
    <TableHeader>
      {children}
    </TableHeader>
  )
}

export const TwentyTableBody: React.FC<TableBodyProps> = ({ children }) => {
  return (
    <TableBody>
      {children}
    </TableBody>
  )
}

export const TwentyTableRow: React.FC<TableRowProps> = ({ children }) => {
  return (
    <TableBodyRow>
      {children}
    </TableBodyRow>
  )
}

export const TwentyTableCell: React.FC<TableCellProps> = ({ children, style }) => {
  return (
    <TableBodyCell style={style}>
      {children}
    </TableBodyCell>
  )
}

export const TwentyCard: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => {
  return (
    <div
      style={{
        backgroundColor: '#2d2d2d',
        border: '1px solid #404040',
        borderRadius: '0.75rem',
        padding: '1.5rem',
        ...style,
      }}
    >
      {children}
    </div>
  )
}

export const TwentyAvatarChip: React.FC<{ name: string; size?: 'small' | 'medium' | 'large' }> = ({ name, size = 'medium' }) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const sizeConfig = {
    small: { width: '24px', height: '24px', fontSize: '0.75rem' },
    medium: { width: '32px', height: '32px', fontSize: '0.875rem' },
    large: { width: '40px', height: '40px', fontSize: '1rem' },
  }

  const config = sizeConfig[size]

  return (
    <div
      style={{
        width: config.width,
        height: config.height,
        borderRadius: '50%',
        backgroundColor: '#8b0000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontWeight: 600,
        fontSize: config.fontSize,
        fontFamily: 'Inter, sans-serif',
      }}
    >
      {getInitials(name)}
    </div>
  )
}

export default TwentyTable
