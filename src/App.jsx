import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './Components/HomePage';
import ActivityPage from './Components/ActivityPage';
import DynamicBackgrounds from './Components/DynamicBackgrounds';

export default function App() {
  
  return (
    <>
      <Router basename="/<repository-name>">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path='/awards' element={<DynamicBackgrounds />} />
          <Route path='/Activity' element={<ActivityPage />} />
        </Routes>
      </Router>
      
    </>
  )
}



