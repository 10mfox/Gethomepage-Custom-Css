import React, { useState } from 'react';
import { ArrowDown, ArrowUp, Trash2, X, Plus } from 'lucide-react';

// ColorPicker Component
export const ColorPicker = ({ label, value, onChange, darkMode }) => (
  <div>
    <label className={`block mb-1 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
      {label.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
    </label>
    <div className="flex space-x-2">
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-9 w-16 rounded cursor-pointer"
        title="Choose color"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="#000000"
        className={`flex-1 p-1 border rounded ${
          darkMode 
            ? 'bg-gray-600 border-gray-500 text-white placeholder-gray-400' 
            : 'bg-white border-gray-300 placeholder-gray-500'
        }`}
        title="Enter color value (HEX, RGB, or color name)"
      />
      <div 
        className="w-9 h-9 rounded border"
        style={{ 
          backgroundColor: value,
          borderColor: darkMode ? '#4B5563' : '#D1D5DB'
        }}
        title="Color preview"
      />
    </div>
  </div>
);

// PresetButton Component
export const PresetButton = ({ preset, onClick, onDelete, darkMode, showDelete = false }) => (
  <div className={`relative group ${
    darkMode 
      ? 'bg-gray-600 hover:bg-gray-500' 
      : 'bg-gray-200 hover:bg-gray-300'
  } rounded p-2 transition-all`}>
    <button
      onClick={onClick}
      className="w-full text-left"
      title={preset.description}
    >
      <div className="flex items-center">
        <div className="w-4 h-4 rounded mr-2" 
             style={{ backgroundColor: preset.colors.text_color }} />
        <span className={`${darkMode ? 'text-gray-200' : 'text-gray-700'} truncate`}>
          {preset.name}
        </span>
      </div>
      <div className="h-1 mt-1 rounded-full flex">
        {[
          preset.colors.widgets_border_color,
          preset.colors.hover_border_color,
          preset.colors.focus_border_color
        ].map((color, index) => (
          <div
            key={index}
            className="flex-1"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </button>
    {showDelete && onDelete && (
      <button
        onClick={onDelete}
        className={`absolute top-1 right-1 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity ${
          darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-400'
        }`}
        title="Delete preset"
      >
        <Trash2 className="w-4 h-4 text-red-500" />
      </button>
    )}
  </div>
);

// SavePresetDialog Component
export const SavePresetDialog = ({ darkMode, onSave, onClose, error }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSave = () => {
    onSave(name, description);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 max-w-md w-full`}>
        <div className="flex justify-between items-center mb-4">
          <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Save Custom Preset
          </h3>
          <button
            onClick={onClose}
            className={`text-gray-500 hover:text-gray-700 transition-colors`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className={`block mb-1 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
              Preset Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full p-2 border rounded ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300'
              }`}
              placeholder="My Custom Theme"
            />
          </div>
          
          <div>
            <label className={`block mb-1 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
              Description (optional)
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`w-full p-2 border rounded ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300'
              }`}
              placeholder="Describe your color theme"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <div className="flex justify-end space-x-2 mt-6">
            <button
              onClick={onClose}
              className={`px-4 py-2 rounded ${
                darkMode
                  ? 'bg-gray-600 hover:bg-gray-500'
                  : 'bg-gray-200 hover:bg-gray-300'
              } transition-colors`}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className={`px-4 py-2 rounded ${
                darkMode
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : 'bg-blue-500 hover:bg-blue-600'
              } text-white transition-colors`}
            >
              Save Preset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Element Color Settings Component
const ElementColorSettings = ({ darkMode, cssVars, setCssVars, toggles }) => {
  const [expandedGroups, setExpandedGroups] = useState(
    ['Border Styles', 'Interactive Effects'].reduce((acc, group) => {
      acc[group] = true;
      return acc;
    }, {})
  );

  // Define the color settings structure with groups for mutually exclusive toggles
  const elementColorSettings = {
    'Border Styles': {
      'widgets': {
        label: 'Widgets',
        options: [
          { toggle: 'enable_borders_widgets', colorKey: 'widgets_border_color', label: 'Static Border' },
          { toggle: 'enable_rotating_borders_widgets', 
            colorKeys: ['rotating_widgets_color_1', 'rotating_widgets_color_2'], 
            label: 'Rotating Border' }
        ]
      },
      'tabs': {
        label: 'Tabs',
        options: [
          { toggle: 'enable_borders_tabs', colorKey: 'tabs_border_color', label: 'Static Border' },
          { toggle: 'enable_rotating_borders_tabs', 
            colorKeys: ['rotating_tabs_color_1', 'rotating_tabs_color_2'], 
            label: 'Rotating Border' }
        ]
      },
      'cards': {
        label: 'Cards',
        options: [
          { toggle: 'enable_borders_cards', colorKey: 'cards_border_color', label: 'Static Border' },
          { toggle: 'enable_rotating_borders_cards', 
            colorKeys: ['rotating_cards_color_1', 'rotating_cards_color_2'], 
            label: 'Rotating Border' }
        ]
      },
      'bookmarks': {
        label: 'Bookmarks',
        options: [
          { toggle: 'enable_borders_bookmarks', colorKey: 'bookmarks_border_color', label: 'Static Border' },
          { toggle: 'enable_rotating_borders_bookmarks', 
            colorKeys: ['rotating_bookmarks_color_1', 'rotating_bookmarks_color_2'], 
            label: 'Rotating Border' }
        ]
      }
    },
    'Interactive Effects': {
      'hover': {
        label: 'Hover Effect',
        options: [
          { toggle: 'enable_hover_effects', colorKey: 'hover_border_color', label: 'Static Border' },
          { toggle: 'enable_rotating_hover',
            colorKeys: ['rotating_hover_color_1', 'rotating_hover_color_2'],
            label: 'Rotating Border' }
        ]
      },
      'focus': {
        label: 'Focus Effect',
        options: [
          { toggle: 'enable_focus_effects', colorKey: 'focus_border_color', label: 'Static Border' },
          { toggle: 'enable_rotating_focus',
            colorKeys: ['rotating_focus_color_1', 'rotating_focus_color_2'],
            label: 'Rotating Border' }
        ]
      }
    }
  };

  // Check if any options in a group are toggled on
  const hasToggledOptions = (settings) => {
    return Object.values(settings).some(element => 
      element.options.some(option => toggles[option.toggle])
    );
  };

  // Check if an element has any options toggled on
  const hasElementToggles = (element) => {
    return element.options.some(option => toggles[option.toggle]);
  };

  const handleColorChange = (key, value) => {
    setCssVars(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleBorderTypeToggle = (elementKey, toggleKey, groupName) => {
    // Get the option pair for this element
    const elementOptions = elementColorSettings[groupName][elementKey].options;
    
    const newToggles = { ...toggles };
    
    // Turn off all toggles for this element
    elementOptions.forEach(option => {
      newToggles[option.toggle] = false;
    });
    
    // Enable the selected toggle
    newToggles[toggleKey] = !toggles[toggleKey];
    
    setCssVars(cssVars);
  };

  const toggleGroup = (groupName) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupName]: !prev[groupName]
    }));
  };

  const renderElementOptions = (elementKey, element, groupName) => {
    if (!hasElementToggles(element)) return null;

    return (
      <div key={elementKey} className="space-y-4">
        <h4 className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          {element.label}
        </h4>
        <div className="space-y-4 ml-4">
          {element.options.map((option) => (
            <div key={option.toggle} className="space-y-2">
              <div className="flex items-center">
                <input
                  type="radio"
                  name={`border-type-${elementKey}-${groupName}`}
                  checked={toggles[option.toggle]}
                  onChange={() => handleBorderTypeToggle(elementKey, option.toggle, groupName)}
                  className="mr-2"
                />
                <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {option.label}
                </span>
              </div>
              {toggles[option.toggle] && (
                option.colorKeys ? (
                  <div className="space-y-2 ml-6">
                    <ColorPicker
                      label="Start Color"
                      value={cssVars[option.colorKeys[0]]}
                      onChange={(value) => handleColorChange(option.colorKeys[0], value)}
                      darkMode={darkMode}
                    />
                    <ColorPicker
                      label="End Color"
                      value={cssVars[option.colorKeys[1]]}
                      onChange={(value) => handleColorChange(option.colorKeys[1], value)}
                      darkMode={darkMode}
                    />
                  </div>
                ) : (
                  <div className="ml-6">
                    <ColorPicker
                      label="Color"
                      value={cssVars[option.colorKey]}
                      onChange={(value) => handleColorChange(option.colorKey, value)}
                      darkMode={darkMode}
                    />
                  </div>
                )
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {Object.entries(elementColorSettings).map(([groupName, settings]) => {
        // Skip groups that have no toggled options
        if (!hasToggledOptions(settings)) return null;

        return (
          <div 
            key={groupName}
            className={`rounded-lg border ${
              darkMode 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-200'
            }`}
          >
            <button
              onClick={() => toggleGroup(groupName)}
              className={`w-full px-4 py-3 flex items-center justify-between ${
                darkMode 
                  ? 'hover:bg-gray-700' 
                  : 'hover:bg-gray-50'
              } transition-colors rounded-t-lg`}
            >
              <h3 className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                {groupName}
              </h3>
              {expandedGroups[groupName] ? (
                <ArrowUp className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              ) : (
                <ArrowDown className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              )}
            </button>

            {expandedGroups[groupName] && (
              <div className="p-4 space-y-6 border-t border-gray-200 dark:border-gray-700">
                {Object.entries(settings).map(([elementKey, element]) => 
                  renderElementOptions(elementKey, element, groupName)
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

// Main Color Settings Component
export const ColorSettings = ({ darkMode, cssVars, setCssVars, toggles = {} }) => {
  const [expandedGroups, setExpandedGroups] = React.useState({
    'Basic Colors': true,
    'Animation Settings': true
  });

  // Define base color groups
  const baseColorGroups = {
    'Basic Colors': {
      'text_color': { label: 'Text Color', toggle: 'enable_text_color' },
      'background_color': { label: 'Background Color', toggle: 'enable_background' }
    }
  };

  // Handle updating a single color
  const handleColorChange = (key, value) => {
    setCssVars(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Toggle group expansion
  const toggleGroup = (groupName) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupName]: !prev[groupName]
    }));
  };

  // Handle animation timing change
  const handleTimingChange = (value) => {
    const newValue = Math.max(1, Math.min(60, parseInt(value)));
    
    // Update the CSS variables
    setCssVars(prev => ({
      ...prev,
      animated_time_border: `${newValue}s`
    }));

    // Force update of the CSS variable in :root
    document.documentElement.style.setProperty('--animated-time-border', `${newValue}s`);
  };

  // Get animation duration in seconds
  const getAnimationDuration = () => {
    const duration = cssVars.animated_time_border || '10s';
    return parseInt(duration.replace('s', ''));
  };

  // Check if any rotating effects or borders are enabled
  const hasRotatingEffects = Object.entries(toggles).some(([key, value]) => 
    value && (
      key.startsWith('enable_rotating_borders_') || 
      key === 'enable_rotating_hover' || 
      key === 'enable_rotating_focus'
    )
  );

  // Check if any color settings are enabled
  const hasEnabledColorSettings = React.useMemo(() => (
    Object.entries(toggles).some(([key, value]) => 
      value && (
        key.startsWith('enable_borders_') || 
        key.startsWith('enable_rotating_borders_') ||
        key === 'enable_rotating_hover' || 
        key === 'enable_rotating_focus' ||
        key === 'enable_hover_effects' ||
        key === 'enable_focus_effects' ||
        key === 'enable_text_color' ||
        key === 'enable_background'
      )
    )
  ), [toggles]);

  if (!hasEnabledColorSettings) {
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
      {/* Basic Colors Section */}
      {Object.entries(baseColorGroups).map(([groupName, colors]) => {
        // Only show if any toggles in the group are enabled
        const hasEnabledToggles = Object.values(colors).some(({ toggle }) => toggles[toggle]);
        if (!hasEnabledToggles) return null;

        return (
          <div 
            key={groupName} 
            className={`rounded-lg border ${
              darkMode 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-200'
            }`}
          >
            {/* Group Header */}
            <button
              onClick={() => toggleGroup(groupName)}
              className={`w-full px-4 py-3 flex items-center justify-between ${
                darkMode 
                  ? 'hover:bg-gray-700' 
                  : 'hover:bg-gray-50'
              } transition-colors rounded-t-lg`}
            >
              <h3 className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                {groupName}
              </h3>
              {expandedGroups[groupName] ? (
                <ArrowUp className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              ) : (
                <ArrowDown className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              )}
            </button>

            {/* Color Pickers */}
            {expandedGroups[groupName] && (
              <div className="p-4 space-y-4 border-t border-gray-200 dark:border-gray-700">
                {Object.entries(colors).map(([colorKey, colorInfo]) => {
                  if (!toggles[colorInfo.toggle]) return null;

                  return (
                    <div key={colorKey}>
                      <ColorPicker
                        label={colorInfo.label}
                        value={cssVars[colorKey]}
                        onChange={(value) => handleColorChange(colorKey, value)}
                        darkMode={darkMode}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}

      {/* Animation Timing Control */}
      {hasRotatingEffects && (
        <div 
          className={`rounded-lg border ${
            darkMode 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-white border-gray-200'
          }`}
        >
          <button
            onClick={() => toggleGroup('Animation Settings')}
            className={`w-full px-4 py-3 flex items-center justify-between ${
              darkMode 
                ? 'hover:bg-gray-700' 
                : 'hover:bg-gray-50'
            } transition-colors rounded-t-lg`}
          >
            <h3 className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
              Animation Settings
            </h3>
            {expandedGroups['Animation Settings'] ? (
              <ArrowUp className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            ) : (
              <ArrowDown className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            )}
          </button>

          {expandedGroups['Animation Settings'] && (
            <div className="p-4 space-y-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <input
                    type="range"
                    min="1"
                    max="60"
                    value={getAnimationDuration()}
                    onChange={(e) => handleTimingChange(e.target.value)}
                    className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${
                      darkMode ? 'bg-gray-700' : 'bg-gray-200'
                    }`}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    min="1"
                    max="60"
                    value={getAnimationDuration()}
                    onChange={(e) => handleTimingChange(e.target.value)}
                    className={`w-20 p-2 border rounded ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300'
                    }`}
                  />
                  <span className={`${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                    seconds
                  </span>
                </div>
              </div>
              <p className={`mt-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Adjust the rotation speed of animated borders (1-60 seconds per rotation)
              </p>
            </div>
          )}
        </div>
      )}

      {/* Element-specific Color Settings */}
      <ElementColorSettings
        darkMode={darkMode}
        cssVars={cssVars}
        setCssVars={setCssVars}
        toggles={toggles}
      />
    </div>
  );
};

// Built-in Presets Component
export const BuiltInPresets = ({ darkMode, presets, onApply }) => (
  <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg`}>
    <h3 className={`font-medium mb-3 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
      Built-in Presets
    </h3>
    <div className="grid grid-cols-2 gap-2">
      {presets.map(preset => (
        <PresetButton
          key={preset.name}
          preset={preset}
          onClick={() => onApply(preset)}
          darkMode={darkMode}
          showDelete={false}
        />
      ))}
    </div>
  </div>
);

// Custom Presets Component
export const CustomPresets = ({ darkMode, presets, onApply, onDelete, onSaveNew }) => (
  <div className="space-y-4">
    <button
      onClick={onSaveNew}
      className={`flex items-center px-4 py-2 rounded ${
        darkMode
          ? 'bg-blue-600 hover:bg-blue-700'
          : 'bg-blue-500 hover:bg-blue-600'
      } text-white transition-colors`}
    >
      <Plus className="w-4 h-4 mr-2" />
      Save Current Colors as Preset
    </button>

    {presets.length > 0 && (
      <div>
        <h3 className={`font-medium mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
          Custom Presets
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {presets.map(preset => (
            <PresetButton
              key={preset.name}
              preset={preset}
              onClick={() => onApply(preset)}
              onDelete={() => onDelete(preset.name)}
              darkMode={darkMode}
              showDelete={true}
            />
          ))}
        </div>
      </div>
    )}
  </div>
);