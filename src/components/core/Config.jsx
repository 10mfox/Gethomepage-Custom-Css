import React, { createContext, useContext, useState, useEffect } from 'react';
import { BUILT_IN_PRESETS } from '../utils/Presets';

const ConfigContext = createContext(undefined);

const defaultCssVars = {
  // Basic settings
  backdrop_filter: 'blur(8px)',
  border_width: '5px',
  border_radius: '.375rem',
  font_family: 'Arial',
  text_color: '#FFD700',
  background_color: '#000000',
  animated_time_border: '10s',

  // Static border colors for each element
  tabs_border_color: '#1B5E20',
  widgets_border_color: '#1B5E20',
  bookmarks_border_color: '#1B5E20',
  cards_border_color: '#1B5E20',

  // Rotating border colors for each element
  rotating_tabs_color_1: '#1B5E20',
  rotating_tabs_color_2: '#DC143C',
  rotating_widgets_color_1: '#1B5E20',
  rotating_widgets_color_2: '#DC143C',
  rotating_bookmarks_color_1: '#1B5E20',
  rotating_bookmarks_color_2: '#DC143C',
  rotating_cards_color_1: '#1B5E20',
  rotating_cards_color_2: '#DC143C',

  // Hover colors
  hover_border_color: '#DC143C',
  rotating_hover_color_1: '#1B5E20',
  rotating_hover_color_2: '#DC143C',

  // Focus colors
  focus_border_color: '#4169E1',
  rotating_focus_color_1: '#1B5E20',
  rotating_focus_color_2: '#DC143C',
};

const defaultToggles = {
  // Static Border Controls
  enable_borders_tabs: false,
  enable_borders_widgets: false,
  enable_borders_bookmarks: false,
  enable_borders_cards: false,
  
  // Animated Border Controls
  enable_rotating_borders_tabs: false,
  enable_rotating_borders_widgets: false,
  enable_rotating_borders_bookmarks: false,
  enable_rotating_borders_cards: false,

  // Interactive Effects
  enable_hover_effects: false,
  enable_rotating_hover: false,
  enable_focus_effects: false,
  enable_rotating_focus: false,

  // Appearance
  enable_font: false,
  enable_text_color: false,
  enable_background: false,
  enable_backdrop_filter: false,

  // Layout
  enable_centered_card_titles: false,
  remove_refresh_button_and_version: false,
  hide_bookmark_descriptions: false,
  hide_bookmark_names: false,
  custom_api_list_clean_format: false,  
};

const loadStoredConfig = () => {
  try {
    const storedConfig = localStorage.getItem('cssWizardConfig');
    return storedConfig ? JSON.parse(storedConfig) : null;
  } catch (error) {
    console.error('Error loading stored config:', error);
    return null;
  }
};

export const ConfigProvider = ({ children }) => {
  // Dark mode state
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem('cssWizardDarkMode');
    return stored ? JSON.parse(stored) : true;
  });

  // CSS Variables state
  const [cssVars, setCssVars] = useState(() => {
    const stored = loadStoredConfig();
    if (stored?.cssVars) {
      // Merge stored values with default values to ensure all new properties exist
      return {
        ...defaultCssVars,
        ...stored.cssVars
      };
    }
    return defaultCssVars;
  });

  // Feature toggles state
  const [toggles, setToggles] = useState(() => {
    const stored = loadStoredConfig();
    if (stored?.toggles) {
      // Merge stored values with default values to ensure all new properties exist
      return {
        ...defaultToggles,
        ...stored.toggles
      };
    }
    return defaultToggles;
  });

  // Custom presets state
  const [customPresets, setCustomPresets] = useState(() => {
    try {
      const stored = localStorage.getItem('cssWizardCustomPresets');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Save config to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('cssWizardConfig', JSON.stringify({ cssVars, toggles }));
    
    // Update animation timing CSS variable
    document.documentElement.style.setProperty('--animated-time-border', cssVars.animated_time_border);
  }, [cssVars, toggles]);

  // Save custom presets to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('cssWizardCustomPresets', JSON.stringify(customPresets));
    } catch {
      // Silently fail if localStorage is not available
    }
  }, [customPresets]);

  // Handle dark mode changes
  useEffect(() => {
    localStorage.setItem('cssWizardDarkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const value = {
    darkMode,
    setDarkMode,
    cssVars,
    setCssVars,
    toggles,
    setToggles,
    customPresets,
    setCustomPresets,
    builtInPresets: BUILT_IN_PRESETS
  };

  return (
    <ConfigContext.Provider value={value}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (context === undefined) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  return context;
};