'use client'

import { useTheme } from '@/context/ThemeContext'
import { FaSun, FaMoon } from 'react-icons/fa'

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle-btn"
      aria-label="Toggle theme"
    >
      <div className={`toggle-track ${theme === 'dark' ? 'dark' : 'light'}`}>
        <div className="toggle-thumb">
          {theme === 'light' ? (
            <FaSun className="icon sun-icon" />
          ) : (
            <FaMoon className="icon moon-icon" />
          )}
        </div>
      </div>

      <style jsx>{`
        .theme-toggle-btn {
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .theme-toggle-btn:hover {
          transform: scale(1.05);
        }

        .toggle-track {
          width: 60px;
          height: 30px;
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          border-radius: 50px;
          position: relative;
          transition: all 0.3s ease;
          box-shadow: 0 2px 8px rgba(99, 102, 241, 0.3);
        }

        .toggle-track.dark {
          background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
        }

        .toggle-thumb {
          width: 26px;
          height: 26px;
          background: white;
          border-radius: 50%;
          position: absolute;
          top: 2px;
          left: 2px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .toggle-track.dark .toggle-thumb {
          transform: translateX(30px);
          background: #0f172a;
        }

        .icon {
          font-size: 14px;
          transition: all 0.3s ease;
        }

        .sun-icon {
          color: #f59e0b;
          animation: rotate 20s linear infinite;
        }

        .moon-icon {
          color: #fbbf24;
        }

        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 991px) {
          .theme-toggle-btn {
            margin: 10px 0;
          }
        }
      `}</style>
    </button>
  )
}

export default ThemeToggle
