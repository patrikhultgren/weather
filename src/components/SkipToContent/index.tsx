import React from 'react'

const SkipToContent: React.FC = () => {
  const onClick = (event: React.SyntheticEvent) => {
    event.preventDefault()

    const container: HTMLElement | null =
      document.querySelector('main:first-of-type')

    if (container) {
      container.tabIndex = -1
      container.focus()
      setTimeout(() => container.removeAttribute('tabindex'), 1000)
    }
  }

  return (
    <button type="button" className="sr-only block p-3" onClick={onClick}>
      Gå direkt till innehållet
    </button>
  )
}

export default SkipToContent
