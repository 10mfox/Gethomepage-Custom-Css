import React from 'react';
import { Settings2 } from 'lucide-react';
import { GeneralSettings } from './';

export const StyleSettings = ({ darkMode, cssVars, setCssVars }) => (
  <div className="lg:col-span-5">
    <div className={`${
      darkMode ? 'bg-gray-800' : 'bg-white'
    } rounded-xl shadow-sm overflow-hidden`}>
      <div className={`px-4 py-3 border-b ${
        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-100'
      }`}>
        <div className="flex items-center space-x-2">
          <Settings2 className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
          <h2 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Style Settings
          </h2>
        </div>
      </div>
      
      <div className="p-4">
        <GeneralSettings
          darkMode={darkMode}
          cssVars={cssVars}
          setCssVars={setCssVars}
        />
      </div>
    </div>
  </div>
);