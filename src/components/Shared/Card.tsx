import React from 'react'

interface CardProps {
  children: React.ReactNode
  reverse: boolean
}

function Card({ children, reverse }: CardProps) {
  return <div className={`card ${reverse && 'reverse'}`}>{children}</div>
}

Card.defaultProps = {
  reverse: false,
}

export default Card
