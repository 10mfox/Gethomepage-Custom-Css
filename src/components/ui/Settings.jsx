import React, { useEffect } from 'react';
import { Settings2 } from 'lucide-react';

// Style Settings Component
export const StyleSettings = ({ darkMode, cssVars, setCssVars, toggles }) => (
  <div className={`${
    darkMode ? 'bg-gray-800' : 'bg-white'
  } rounded-xl shadow-sm overflow-hidden flex flex-col`}>
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
    
    <div className="flex-1 p-4">
      <GeneralSettings
        darkMode={darkMode}
        cssVars={cssVars}
        setCssVars={setCssVars}
        toggles={toggles}
      />
    </div>
  </div>
);

// General Settings Component
export const GeneralSettings = ({ darkMode, cssVars, setCssVars, toggles = {} }) => {
  // Configuration options with CDNFonts list
  const GENERAL_SETTINGS = {
    font_family: {
      label: 'Font Family',
      toggle: 'enable_font',
      options: [
        // Modern Sans-Serif Fonts
        { value: "Inter", label: "Inter - Modern & Clean", category: "Modern Sans" },
        { value: "Roboto", label: "Roboto - Clean & Crisp", category: "Modern Sans" },
        { value: "Open Sans", label: "Open Sans - Friendly & Open", category: "Modern Sans" },
        { value: "Montserrat", label: "Montserrat - Modern Geometric", category: "Modern Sans" },
        { value: "Lato", label: "Lato - Balanced & Modern", category: "Modern Sans" },
        { value: "Poppins", label: "Poppins - Geometric Sans", category: "Modern Sans" },
        
        // Modern Serif Fonts
        { value: "Merriweather", label: "Merriweather - Modern Serif", category: "Modern Serif" },
        { value: "Playfair Display", label: "Playfair Display - Elegant", category: "Modern Serif" },
        { value: "Lora", label: "Lora - Contemporary Serif", category: "Modern Serif" },
        { value: "Crimson Text", label: "Crimson Text - Old Style", category: "Modern Serif" },
        
        // Coding & Technical Fonts
        { value: "Cascadia Code", label: "Cascadia Code - Microsoft", category: "Coding" },
        { value: "Fira Code", label: "Fira Code - With Ligatures", category: "Coding" },
        { value: "JetBrains Mono", label: "JetBrains Mono - IDE Font", category: "Coding" },
        { value: "Source Code Pro", label: "Source Code Pro - Adobe Code", category: "Coding" },
        { value: "IBM Plex Mono", label: "IBM Plex Mono - IBM's Code", category: "Coding" },
        
        // Display & Decorative Fonts
        { value: "Permanent Marker", label: "Permanent Marker - Marker Style", category: "Display" },
        { value: "Righteous", label: "Righteous - Modern Display", category: "Display" },
        { value: "Bangers", label: "Bangers - Comic Style", category: "Display" },
        
        // Script Fonts
        { value: "Dancing Script", label: "Dancing Script - Elegant Script", category: "Script" },
        { value: "Pacifico", label: "Pacifico - Fun Script", category: "Script" },
        { value: "Great Vibes", label: "Great Vibes - Calligraphy", category: "Script" },
        { value: "Caveat", label: "Caveat - Handwritten", category: "Script" },
        
        // System Fonts
        { value: "Arial", label: "Arial - System Sans", category: "System Fonts" },
        { value: "Helvetica", label: "Helvetica - System Sans", category: "System Fonts" },
        { value: "Times New Roman", label: "Times New Roman - System Serif", category: "System Fonts" },
        { value: "Georgia", label: "Georgia - System Serif", category: "System Fonts" },
        { value: "Courier New", label: "Courier New - System Mono", category: "System Fonts" }
      ]
    },
    border_width: {
      label: 'Border Width',
      toggle: 'enable_borders_tabs',
      options: [
        "1px", "2px", "3px", "4px", "5px",
        "6px", "8px", "10px", "12px", "16px"
      ]
    },
    border_radius: {
      label: 'Border Radius',
      toggle: 'enable_borders_tabs',
      options: [
        ".125rem", ".25rem", ".375rem",
        ".5rem", ".75rem", "1rem"
      ]
    },
    backdrop_filter: {
      label: 'Backdrop Filter',
      toggle: 'enable_backdrop_filter',
      options: [
        "blur(8px)", "blur(4px)",
        "blur(12px)", "blur(16px)"
      ]
    }
  };

  const handleChange = (setting, value) => {
    setCssVars(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  // Load selected font CSS
  useEffect(() => {
    const loadFont = async () => {
      const selectedFont = GENERAL_SETTINGS.font_family.options.find(
        font => font.value === cssVars.font_family
      );
      
      if (selectedFont && selectedFont.category !== 'System Fonts') {
        // Convert font name to CDNFonts format
        const fontUrl = `https://fonts.cdnfonts.com/css/${selectedFont.value.toLowerCase().replace(/\s+/g, '-')}`;
        
        // Check if the font link is already present
        const existingLink = document.head.querySelector(`link[href="${fontUrl}"]`);
        if (!existingLink) {
          const link = document.createElement('link');
          link.href = fontUrl;
          link.rel = 'stylesheet';
          document.head.appendChild(link);
        }
      }
    };

    if (toggles.enable_font) {
      loadFont();
    }
  }, [cssVars.font_family, toggles.enable_font]);

  // Group fonts by category
  const groupedFonts = React.useMemo(() => {
    return GENERAL_SETTINGS.font_family.options.reduce((acc, font) => {
      if (!acc[font.category]) {
        acc[font.category] = [];
      }
      acc[font.category].push(font);
      return acc;
    }, {});
  }, []);

  // Check if any settings are enabled
  const hasEnabledSettings = Object.values(GENERAL_SETTINGS).some(({ toggle }) => toggles[toggle]);

  if (!hasEnabledSettings) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className={`text-center ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Enable features in the Feature Toggles menu to configure their settings
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {Object.entries(GENERAL_SETTINGS).map(([setting, { label, toggle, options }]) => {
        // Skip if toggles is undefined or the specific toggle is not enabled
        if (!toggles || !toggles[toggle]) return null;

        if (setting === 'font_family') {
          return (
            <div key={setting}>
              <label className={`block mb-2 font-medium ${
                darkMode ? 'text-gray-200' : 'text-gray-700'
              }`}>
                {label}
              </label>
              <select
                value={cssVars[setting]}
                onChange={(e) => handleChange(setting, e.target.value)}
                className={`w-full p-2.5 rounded-lg border ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:ring-2 focus:ring-blue-500 transition-colors`}
              >
                {Object.entries(groupedFonts).map(([category, fonts]) => (
                  <optgroup key={category} label={category}>
                    {fonts.map(font => (
                      <option 
                        key={font.value} 
                        value={font.value}
                        style={{ fontFamily: font.value }}
                      >
                        {font.label}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
              {/* Font preview */}
              <div className="mt-2 space-y-1">
                <p 
                  className={`${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  } text-sm`}
                  style={{ fontFamily: cssVars.font_family }}
                >
                  Preview text in {cssVars.font_family}
                </p>
                <p 
                  className={`${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  } text-sm`}
                  style={{ fontFamily: cssVars.font_family }}
                >
                  The quick brown fox jumps over the lazy dog 0123456789
                </p>
              </div>
            </div>
          );
        }

        return (
          <div key={setting}>
            <label className={`block mb-2 font-medium ${
              darkMode ? 'text-gray-200' : 'text-gray-700'
            }`}>
              {label}
            </label>
            <select
              value={cssVars[setting]}
              onChange={(e) => handleChange(setting, e.target.value)}
              className={`w-full p-2.5 rounded-lg border ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:ring-2 focus:ring-blue-500 transition-colors`}
            >
              {options.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        );
      })}
    </div>
  );
};