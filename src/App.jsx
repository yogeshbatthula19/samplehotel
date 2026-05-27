import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ResortPage from './components/ResortPage';
import InsurancePage from './components/InsurancePage';
import ChasePage from './components/ChasePage';

export default function App() {
  const [page, setPage] = useState('resort');

  // Automatically scroll to top on page transition
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [page]);

  // Dynamic style config for the floating master navigation dock
  const getDockStyles = () => {
    switch (page) {
      case 'resort':
        return {
          backgroundColor: 'rgba(250, 248, 245, 0.85)',
          border: '1px solid rgba(170, 132, 83, 0.3)',
          boxShadow: '0 8px 32px rgba(170, 132, 83, 0.15)',
          color: '#aa8453',
          fontFamily: "'Montserrat', sans-serif"
        };
      case 'insurance':
        return {
          backgroundColor: 'rgba(15, 41, 33, 0.95)',
          border: '1px solid rgba(226, 237, 231, 0.2)',
          boxShadow: '0 8px 32px rgba(15, 41, 33, 0.2)',
          color: '#e2ede7',
          fontFamily: "'Plus Jakarta Sans', sans-serif"
        };
      case 'chase':
        return {
          backgroundColor: '#FAF6EE',
          border: '3px solid #1C1C1C',
          boxShadow: '6px 6px 0px #1C1C1C',
          color: '#1C1C1C',
          fontFamily: "'Outfit', sans-serif"
        };
      default:
        return {};
    }
  };

  const getButtonStyles = (btnPage) => {
    const isActive = page === btnPage;
    switch (page) {
      case 'resort':
        return {
          color: isActive ? '#aa8453' : '#8c8880',
          fontWeight: isActive ? '700' : '400',
          letterSpacing: '0.05em',
          borderBottom: isActive ? '2px solid #aa8453' : '2px solid transparent'
        };
      case 'insurance':
        return {
          color: isActive ? '#e2ede7' : '#626865',
          fontWeight: isActive ? '700' : '500',
          backgroundColor: isActive ? 'rgba(226, 237, 231, 0.1)' : 'transparent',
          borderRadius: '20px'
        };
      case 'chase':
        return {
          color: '#1C1C1C',
          backgroundColor: isActive ? '#FF7A00' : 'transparent',
          border: isActive ? '2px solid #1C1C1C' : '2px solid transparent',
          borderRadius: isActive ? '4px' : '0px',
          fontWeight: '800'
        };
      default:
        return {};
    }
  };

  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      {/* Master Content Wrapper with slide/fade page animations */}
      <AnimatePresence mode="wait">
        <motion.div
          key={page}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
        >
          {page === 'resort' && <ResortPage onPageChange={setPage} />}
          {page === 'insurance' && <InsurancePage onPageChange={setPage} />}
          {page === 'chase' && <ChasePage onPageChange={setPage} />}
        </motion.div>
      </AnimatePresence>

      {/* Premium Floating Page Dock */}
      <div 
        style={{
          position: 'fixed',
          bottom: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 99999,
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: page === 'chase' ? '12px 18px' : '10px 20px',
          borderRadius: page === 'chase' ? '8px' : '40px',
          backdropFilter: page === 'chase' ? 'none' : 'blur(16px)',
          transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
          ...getDockStyles()
        }}
      >
        <span 
          style={{ 
            fontSize: '0.65rem', 
            fontWeight: 800, 
            textTransform: 'uppercase', 
            letterSpacing: '0.15em', 
            marginRight: '8px',
            opacity: 0.7 
          }}
        >
          PORTFOLIO DOCK
        </span>
        
        {/* Dock Selector Buttons */}
        <button
          onClick={() => setPage('resort')}
          style={{
            background: 'none',
            border: 'none',
            padding: '6px 12px',
            fontSize: '0.75rem',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            textTransform: 'uppercase',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            outline: 'none',
            ...getButtonStyles('resort')
          }}
        >
          {/* Palm Tree icon representation */}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M13 22H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8" />
            <path d="M18 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
            <path d="M18 10V4" />
            <path d="M4 18h8" />
          </svg>
          Resort
        </button>

        <button
          onClick={() => setPage('insurance')}
          style={{
            background: 'none',
            border: 'none',
            padding: '6px 12px',
            fontSize: '0.75rem',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            textTransform: 'uppercase',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            outline: 'none',
            ...getButtonStyles('insurance')
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          Insurance
        </button>

        <button
          onClick={() => setPage('chase')}
          style={{
            background: 'none',
            border: 'none',
            padding: '6px 12px',
            fontSize: '0.75rem',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            textTransform: 'uppercase',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            outline: 'none',
            ...getButtonStyles('chase')
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 10.5h-5.5l1.5-7.5L5 13.5h5.5L9 21l10-10.5z" />
          </svg>
          Chasey
        </button>
      </div>
    </div>
  );
}
