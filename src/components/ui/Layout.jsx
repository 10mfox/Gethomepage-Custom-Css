import React from 'react';
import { Moon, Sun, Save, Upload, Settings2, Code, Palette } from 'lucide-react';
import { StyleSettings } from './Settings';
import { ColorSettings } from './ColorUI';
import { LivePreview } from './Preview';
import { generateCSS } from '../utils/CSSGenerator';

// Header Component
export const Header = ({ darkMode, setDarkMode, handleSave, handleLoad }) => (
  <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b sticky top-0 z-50`}>
    <div className="max-w-[1600px] mx-auto px-4 h-16 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <Settings2 className={`w-6 h-6 ${darkMode ? 'text-white' : 'text-gray-900'}`} />
        <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Gethomepage CSS Wizard
        </h1>
      </div>
      
      <div className="flex items-center space-x-3">
        <button
          onClick={handleSave}
          className="px-4 py-2 flex items-center space-x-2 rounded bg-blue-500 hover:bg-blue-600 text-white transition-colors"
        >
          <Save className="w-4 h-4" />
          <span>Save CSS</span>
        </button>
        
        <label className="px-4 py-2 flex items-center space-x-2 rounded bg-green-500 hover:bg-green-600 text-white cursor-pointer transition-colors">
          <Upload className="w-4 h-4" />
          <span>Load</span>
          <input
            type="file"
            onChange={handleLoad}
            accept=".json"
            className="hidden"
          />
        </label>
        
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`p-2 rounded-lg ${
            darkMode 
              ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          } transition-colors`}
          title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>
    </div>
  </div>
);

// Generated CSS Component
export const GeneratedCSS = ({ darkMode, css }) => (
  <div className={`${
    darkMode ? 'bg-gray-800' : 'bg-white'
  } rounded-xl shadow-sm overflow-hidden`}>
    <div className={`px-4 py-3 border-b ${
      darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-100'
    }`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Code className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
          <h2 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Generated CSS
          </h2>
        </div>
      </div>
    </div>
    
    <div className="p-4">
      <pre className={`${
        darkMode ? 'bg-gray-900' : 'bg-gray-800'
      } text-gray-100 p-4 rounded-lg text-sm whitespace-pre-wrap break-words`}>
        {css}
      </pre>
    </div>
  </div>
);

// Main Content Component
export const MainContent = ({ darkMode, cssVars, setCssVars, toggles }) => (
  <div className="max-w-[1600px] mx-auto p-4 lg:p-6 space-y-6">
    {/* Settings and Preview Grid */}
    <div className="grid lg:grid-cols-12 gap-6">
      {/* Style Settings */}
      <div className="lg:col-span-4">
        <StyleSettings 
          darkMode={darkMode} 
          cssVars={cssVars} 
          setCssVars={setCssVars}
          toggles={toggles} 
        />
      </div>

      {/* Color Settings */}
      <div className="lg:col-span-4">
        <div className={`${
          darkMode ? 'bg-gray-800' : 'bg-white'
        } rounded-xl shadow-sm overflow-hidden`}>
          <div className={`px-4 py-3 border-b ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-100'
          }`}>
            <div className="flex items-center space-x-2">
              <Palette className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              <h2 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Color Settings
              </h2>
            </div>
          </div>
          
          <div className="p-4">
            <ColorSettings
              darkMode={darkMode}
              cssVars={cssVars}
              setCssVars={setCssVars}
              toggles={toggles}
            />
          </div>
        </div>
      </div>
      
      {/* Preview Panel */}
      <div className="lg:col-span-4">
        <div className={`${
          darkMode ? 'bg-gray-800' : 'bg-white'
        } rounded-xl shadow-sm overflow-hidden`}>
          <div className={`px-4 py-3 border-b ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-100'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Code className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                <h2 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Live Preview
                </h2>
              </div>
              <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Interactive Demo
              </span>
            </div>
          </div>
          
          <div className="p-4">
            <LivePreview
              darkMode={darkMode}
              cssVars={cssVars}
              toggles={toggles}
            />
          </div>
        </div>
      </div>
    </div>

    {/* Generated CSS */}
    <GeneratedCSS 
      darkMode={darkMode} 
      css={generateCSS(cssVars, toggles)} 
    />
  </div>
);