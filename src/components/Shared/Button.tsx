import React from 'react'

interface Button {
  children: React.ReactNode
  version?: string
  isDisabled?: boolean
  type?: 'submit' | 'reset' | 'button'
}

function Button({ children, version, type, isDisabled }: Button) {
  return (
    <button type={type} disabled={isDisabled} className={`btn btn-${version}`}>
      {children}
    </button>
  )
}

Button.defaultProps = {
  version: 'primary',
  type: 'button',
  disabled: false,
}

export default Button
