import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

function BlankPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center text-gray-200 text-3xl">
        Edit <code>main.tsx</code>
      </div>
    </div>
  )
}


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BlankPage />
  </StrictMode>,
)
