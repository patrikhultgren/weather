import { BrowserRouter } from 'react-router-dom'

import App from './App'

export default function PreApp() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
}
