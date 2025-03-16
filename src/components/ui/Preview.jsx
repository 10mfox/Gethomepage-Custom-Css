import React, { useState } from 'react';
import { Link, Cpu, Server, Database, Cloud, Activity } from 'lucide-react';

// Generate rotation keyframes
export const getRotateKeyframes = (cssVars) => {
  const animationTime = cssVars?.animated_time_border || '10s';
  return `
    @keyframes rotate {
      to {
        --angle: 360deg;
      }
    }
    @property --angle {
      syntax: "<angle>";
      initial-value: 0deg;
      inherits: false;
    }
    :root {
      --animated-time-border: ${animationTime};
    }
  `;
};

// Get base styles for an element type
export const getBaseStyles = (elementType, darkMode, cssVars, toggles) => {
  let styles = {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    ...(toggles.enable_backdrop_filter && {
      backdropFilter: cssVars.backdrop_filter,
      WebkitBackdropFilter: cssVars.backdrop_filter,
    }),
    transition: 'all 0.2s ease-in-out',
    fontFamily: toggles.enable_font ? cssVars.font_family : 'inherit',
    color: toggles.enable_text_color ? cssVars.text_color : 'inherit',
    position: 'relative',
    zIndex: 1,
  };

  // Add static borders
  if (toggles[`enable_borders_${elementType}`]) {
    styles = {
      ...styles,
      borderWidth: cssVars.border_width,
      borderStyle: 'solid',
      borderRadius: cssVars.border_radius,
      borderColor: cssVars[`${elementType}_border_color`],
    };
  }

  // Add rotating borders
  if (toggles[`enable_rotating_borders_${elementType}`]) {
    styles = {
      ...styles,
      borderWidth: cssVars.border_width,
      borderStyle: 'solid',
      borderRadius: cssVars.border_radius,
      borderColor: 'transparent',
      backgroundImage: `linear-gradient(${darkMode ? '#1f2937' : '#ffffff'}, ${darkMode ? '#1f2937' : '#ffffff'}), linear-gradient(var(--angle), ${cssVars[`rotating_${elementType}_color_1`]}, ${cssVars[`rotating_${elementType}_color_2`]})`,
      backgroundOrigin: 'border-box',
      backgroundClip: 'padding-box, border-box',
      animation: 'rotate var(--animated-time-border) linear infinite',
    };
  }

  return styles;
};

// Get hover styles for an element
export const getHoverStyles = (isHovered, elementType, darkMode, cssVars, toggles) => {
  if (!isHovered) return {};

  let hoverStyles = {};

  // Check for enabled hover effects
  const useRotatingHover = toggles.enable_rotating_hover;
  const useStaticHover = toggles.enable_hover_effects;

  if (useRotatingHover) {
    hoverStyles = {
      borderWidth: cssVars.border_width,
      borderStyle: 'solid',
      borderRadius: cssVars.border_radius,
      borderColor: 'transparent',
      transform: 'translateY(-1px)',
      backgroundImage: `linear-gradient(${darkMode ? '#1f2937' : '#ffffff'}, ${darkMode ? '#1f2937' : '#ffffff'}), linear-gradient(var(--angle), ${cssVars.rotating_hover_color_1}, ${cssVars.rotating_hover_color_2})`,
      backgroundOrigin: 'border-box',
      backgroundClip: 'padding-box, border-box',
      animation: 'rotate var(--animated-time-border) linear infinite',
    };
  } else if (useStaticHover) {
    hoverStyles = {
      borderWidth: cssVars.border_width,
      borderStyle: 'solid',
      borderRadius: cssVars.border_radius,
      borderColor: cssVars.hover_border_color,
      transform: 'translateY(-1px)',
    };
  }

  return hoverStyles;
};

// Get focus styles for an element
export const getFocusStyles = (isFocused, elementType, darkMode, cssVars, toggles) => {
  if (!isFocused) return {};

  let focusStyles = {};

  // Check for enabled focus effects
  const useRotatingFocus = toggles.enable_rotating_focus;
  const useStaticFocus = toggles.enable_focus_effects;

  if (useRotatingFocus) {
    focusStyles = {
      borderWidth: cssVars.border_width,
      borderStyle: 'solid',
      borderRadius: cssVars.border_radius,
      borderColor: 'transparent',
      outline: 'none',
      backgroundImage: `linear-gradient(${darkMode ? '#1f2937' : '#ffffff'}, ${darkMode ? '#1f2937' : '#ffffff'}), linear-gradient(var(--angle), ${cssVars.rotating_focus_color_1}, ${cssVars.rotating_focus_color_2})`,
      backgroundOrigin: 'border-box',
      backgroundClip: 'padding-box, border-box',
      animation: 'rotate var(--animated-time-border) linear infinite',
    };
  } else if (useStaticFocus) {
    focusStyles = {
      borderWidth: cssVars.border_width,
      borderStyle: 'solid',
      borderRadius: cssVars.border_radius,
      borderColor: cssVars.focus_border_color,
      outline: 'none',
    };
  }

  return focusStyles;
};

// Get common style objects
export const getCommonStyles = (darkMode, cssVars, toggles) => ({
  icon: {
    color: toggles.enable_text_color ? cssVars.text_color : darkMode ? '#fff' : '#000',
  },
  container: {
    backgroundColor: toggles.enable_background ? cssVars.background_color : 'transparent',
    padding: '1.5rem',
    borderRadius: '0.75rem',
    minHeight: '420px',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    position: 'relative',
    overflow: 'hidden',
  },
  centeredTitle: toggles.enable_centered_card_titles ? {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    padding: '.1rem',
    width: '100%'
  } : {},
  decorativeBlob: {
    position: 'absolute',
    borderRadius: '50%',
    filter: 'blur(25px)',
    opacity: 0.5,
    zIndex: 0,
  }
});

// Background Component
const Background = ({ styles }) => (
  <>
    <div
      style={{
        ...styles.decorativeBlob,
        width: '200px',
        height: '200px',
        background: 'linear-gradient(45deg, #FF59F8, #BD00FF)',
        top: '10%',
        left: '20%',
      }}
    />
    <div
      style={{
        ...styles.decorativeBlob,
        width: '250px',
        height: '250px',
        background: 'linear-gradient(45deg, #FFB86C, #FF4D4D)',
        bottom: '20%',
        right: '15%',
      }}
    />
    <div
      style={{
        ...styles.decorativeBlob,
        width: '180px',
        height: '180px',
        background: 'linear-gradient(45deg, #4DD4FF, #4DFF91)',
        top: '40%',
        right: '25%',
      }}
    />
  </>
);

// Navigation Tabs Component
const NavigationTabs = ({ darkMode, cssVars, toggles }) => {
  const [hoveredTab, setHoveredTab] = useState(null);
  const [focusedTab, setFocusedTab] = useState(null);
  const [activeTab, setActiveTab] = useState('Services');  // Track active tab

  const tabs = ['Services', 'Settings'];

  const handleKeyDown = (e, tab) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setActiveTab(tab);
    }
  };

  return (
    <div className="flex justify-center relative z-10" role="tablist">
      <div className="flex gap-4 w-full max-w-sm justify-center">
        {tabs.map((tab) => (
          <button
            key={tab}
            role="tab"
            aria-selected={activeTab === tab}
            aria-controls={`${tab.toLowerCase()}-panel`}
            tabIndex={0}
            style={{
              ...getBaseStyles('tabs', darkMode, cssVars, toggles),
              ...getHoverStyles(hoveredTab === tab, 'tabs', darkMode, cssVars, toggles),
              ...getFocusStyles(focusedTab === tab, 'tabs', darkMode, cssVars, toggles),
            }}
            className={`flex-1 py-2.5 px-4 max-w-[150px] transition-all hover:scale-105 ${
              activeTab === tab 
                ? darkMode 
                  ? 'bg-gray-700/50' 
                  : 'bg-gray-100/50'
                : ''
            }`}
            onMouseEnter={() => setHoveredTab(tab)}
            onMouseLeave={() => setHoveredTab(null)}
            onFocus={() => setFocusedTab(tab)}
            onBlur={() => setFocusedTab(null)}
            onClick={() => setActiveTab(tab)}
            onKeyDown={(e) => handleKeyDown(e, tab)}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};

// Service Cards Component
const ServiceCards = ({ darkMode, cssVars, toggles, styles }) => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [focusedCard, setFocusedCard] = useState(null);

  const services = [
    { icon: Server, name: 'Server', status: 'Online' },
    { icon: Database, name: 'Database', status: 'Connected' },
    { icon: Cloud, name: 'Storage', status: '75% Used' },
    { icon: Activity, name: 'Monitoring', status: 'Active' }
  ];

  return (
    <div className="grid grid-cols-2 gap-3 relative z-10">
      {services.map(service => (
        <div
          key={service.name}
          style={{
            ...getBaseStyles('cards', darkMode, cssVars, toggles),
            ...getHoverStyles(hoveredCard === service.name, 'cards', darkMode, cssVars, toggles),
            ...getFocusStyles(focusedCard === service.name, 'cards', darkMode, cssVars, toggles),
          }}
          className={`p-4 cursor-pointer ${
            toggles.enable_centered_card_titles 
              ? 'flex flex-col items-center' 
              : 'flex items-center space-x-3'
          }`}
          onMouseEnter={() => setHoveredCard(service.name)}
          onMouseLeave={() => setHoveredCard(null)}
          onFocus={() => setFocusedCard(service.name)}
          onBlur={() => setFocusedCard(null)}
          tabIndex={0}
        >
          <service.icon style={styles.icon} className={`w-5 h-5 flex-shrink-0 ${
            toggles.enable_centered_card_titles ? 'mb-2' : ''
          }`} />
          <div style={styles.centeredTitle} className="min-w-0 flex-1">
            <h3 className="font-medium truncate">{service.name}</h3>
            <p className="text-sm opacity-80 truncate">{service.status}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

// Bookmarks Component
const Bookmarks = ({ darkMode, cssVars, toggles, styles }) => {
  const [hoveredLink, setHoveredLink] = useState(null);
  const [focusedLink, setFocusedLink] = useState(null);

  // Demo bookmarks with both name and description
  const bookmarks = [
    {
      name: 'Dashboard',
      description: 'http://1.1.1.1:1234'
    },
    {
      name: 'Documentation',
      description: 'http://1.1.1.1:1234'
    }
  ];

  return (
    <div className="mt-auto relative z-10">
      <h3 
        style={{ color: toggles.enable_text_color ? cssVars.text_color : 'inherit' }} 
        className="text-sm font-medium mb-2 opacity-80"
      >
        Bookmarks
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {bookmarks.map(bookmark => (
          <div key={bookmark.name} className="flex items-center group cursor-pointer">
            <Link 
              style={styles.icon}
              className="w-4 h-4 flex-shrink-0 mr-2"
            />
            <div
              style={{
                ...getBaseStyles('bookmarks', darkMode, cssVars, toggles),
                ...getHoverStyles(hoveredLink === bookmark.name, 'bookmarks', darkMode, cssVars, toggles),
                ...getFocusStyles(focusedLink === bookmark.name, 'bookmarks', darkMode, cssVars, toggles),
              }}
              className="py-2.5 px-3 flex-1"
              onMouseEnter={() => setHoveredLink(bookmark.name)}
              onMouseLeave={() => setHoveredLink(null)}
              onFocus={() => setFocusedLink(bookmark.name)}
              onBlur={() => setFocusedLink(null)}
              tabIndex={0}
            >
              <div style={styles.centeredTitle} className="space-y-0.5">
                {/* Bookmark Name - hidden if hide_bookmark_names is enabled */}
                {!toggles.hide_bookmark_names && (
                  <span className="text-sm font-medium block truncate">
                    {bookmark.name}
                  </span>
                )}
                
                {/* Bookmark Description - hidden if hide_bookmark_descriptions is enabled */}
                {!toggles.hide_bookmark_descriptions && (
                  <span className="text-xs opacity-75 block truncate">
                    {bookmark.description}
                  </span>
                )}

                {/* Show at least one element if both are hidden */}
                {toggles.hide_bookmark_names && toggles.hide_bookmark_descriptions && (
                  <span className="text-sm font-medium block truncate">
                    {bookmark.name}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Footer Component
const Footer = ({ darkMode, cssVars, toggles, styles }) => {
  if (toggles.remove_refresh_button_and_version) {
    return null;
  }

  return (
    <div className="mt-4 flex justify-between items-center px-2 relative z-10">
      <span 
        style={{ color: toggles.enable_text_color ? cssVars.text_color : 'inherit' }}
        className="text-xs opacity-60"
      >
        Version 2.0.0
      </span>
      <button
        className={`text-xs hover:scale-105 transition-transform flex items-center gap-2 px-2 py-1 ${
          darkMode ? 'text-gray-300' : 'text-gray-700'
        }`}
        onClick={() => console.log('Refresh clicked')}
      >
        <svg
          style={styles.icon}
          className="w-3 h-3"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 2v6h-6"></path>
          <path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path>
          <path d="M3 22v-6h6"></path>
          <path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path>
        </svg>
        <span>Refresh</span>
      </button>
    </div>
  );
};

// Widgets Component
const Widgets = ({ darkMode, cssVars, toggles }) => {
  const [hoveredWidget, setHoveredWidget] = useState(null);
  const [focusedWidget, setFocusedWidget] = useState(null);

  const textColor = toggles.enable_text_color ? cssVars.text_color : darkMode ? 'text-gray-200' : 'text-gray-700';
  const subTextColor = toggles.enable_text_color ? cssVars.text_color : darkMode ? 'text-gray-400' : 'text-gray-500';

  return (
    <div className="relative z-10">
      <div
        style={{
          ...getBaseStyles('widgets', darkMode, cssVars, toggles),
          ...getHoverStyles(hoveredWidget === 'cpu', 'widgets', darkMode, cssVars, toggles),
          ...getFocusStyles(focusedWidget === 'cpu', 'widgets', darkMode, cssVars, toggles),
        }}
        className="p-4 flex items-center gap-4"
        onMouseEnter={() => setHoveredWidget('cpu')}
        onMouseLeave={() => setHoveredWidget(null)}
        onFocus={() => setFocusedWidget('cpu')}
        onBlur={() => setFocusedWidget(null)}
        tabIndex={0}
      >
        <div style={{ color: toggles.enable_text_color ? cssVars.text_color : darkMode ? '#9CA3AF' : '#6B7280' }}>
          <Cpu className="w-6 h-6" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-sm font-medium truncate" style={{ color: textColor }}>
              CPU Usage
            </h3>
            <span className="text-sm ml-2" style={{ color: subTextColor }}>
              45%
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
            <div
              className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
              style={{ 
                width: '45%',
                backgroundColor: toggles.enable_text_color ? cssVars.text_color : '#3B82F6'
              }}
            />
          </div>
          <p className="text-xs mt-1 truncate" style={{ color: subTextColor }}>
            4 cores at 2.4GHz
          </p>
        </div>
      </div>
    </div>
  );
};

// Main LivePreview Component
export const LivePreview = ({ darkMode, cssVars, toggles }) => {
  const commonStyles = getCommonStyles(darkMode, cssVars, toggles);

  return (
    <>
      <style>{getRotateKeyframes(cssVars)}</style>
      <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg transition-colors`}>
        <div style={commonStyles.container} className="rounded-lg">
          {/* Decorative Background Elements */}
          <Background styles={commonStyles} />
          
          {/* Widgets Area */}
          <Widgets
            darkMode={darkMode}
            cssVars={cssVars}
            toggles={toggles}
          />

          {/* Navigation Tabs */}
          <NavigationTabs
            darkMode={darkMode}
            cssVars={cssVars}
            toggles={toggles}
          />

          {/* Service Cards */}
          <ServiceCards
            darkMode={darkMode}
            cssVars={cssVars}
            toggles={toggles}
            styles={commonStyles}
          />

          {/* Bookmarks */}
          <Bookmarks
            darkMode={darkMode}
            cssVars={cssVars}
            toggles={toggles}
            styles={commonStyles}
          />

          {/* Footer */}
          <Footer
            darkMode={darkMode}
            cssVars={cssVars}
            toggles={toggles}
            styles={commonStyles}
          />
        </div>
      </div>
    </>
  );
};