import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import WeatherUI from './weather-ui'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WeatherUI />
  </StrictMode>,
)
