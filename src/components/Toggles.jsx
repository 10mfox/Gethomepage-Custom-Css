import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Settings, BookmarkPlus, ChevronRight, ToggleRight, ToggleLeft } from 'lucide-react';
import { PresetButton } from './ui/ColorUI';

// Feature Toggles Component
export const FeatureToggles = ({ darkMode, toggles, setToggles }) => (
  <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-lg shadow-sm`}>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2 p-3">
      {Object.entries(toggles).map(([key, value]) => (
        <button
          key={key}
          onClick={() => setToggles({...toggles, [key]: !value})}
          className={`flex items-center justify-between px-3 py-2 rounded-md transition-colors ${
            value
              ? darkMode
                ? 'bg-blue-500/20 text-blue-400'
                : 'bg-blue-50 text-blue-600'
              : darkMode
                ? 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <span className="text-sm">
            {key.replace(/_/g, ' ').replace(/enable /g, '').replace(/\b\w/g, l => l.toUpperCase())}
          </span>
          {value ? (
            <ToggleRight className="w-4 h-4 ml-2 flex-shrink-0" />
          ) : (
            <ToggleLeft className="w-4 h-4 ml-2 flex-shrink-0" />
          )}
        </button>
      ))}
    </div>
  </div>
);

// Nested Toggle Component for PresetTogglesBar
const NestedToggle = ({ darkMode, label, toggles, setToggles, toggleKeys }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Define mutually exclusive toggle groups
  const mutuallyExclusiveGroups = {
    tabs: ['enable_borders_tabs', 'enable_rotating_borders_tabs'],
    widgets: ['enable_borders_widgets', 'enable_rotating_borders_widgets'],
    bookmarks: ['enable_borders_bookmarks', 'enable_rotating_borders_bookmarks'],
    cards: ['enable_borders_cards', 'enable_rotating_borders_cards'],
    hover: ['enable_hover_effects', 'enable_rotating_hover'],
    focus: ['enable_focus_effects', 'enable_rotating_focus'],
    bookmarkDisplay: ['hide_bookmark_names', 'hide_bookmark_descriptions']	
  };

  // Get the group name for a given toggle key
  const getToggleGroup = (key) => {
    for (const [group, keys] of Object.entries(mutuallyExclusiveGroups)) {
      if (keys.includes(key)) {
        return group;
      }
    }
    return null;
  };

  const handleToggle = (key) => {
    const group = getToggleGroup(key);
    
    if (group) {
      // If this is a grouped toggle, turn off the other option in the group
      setToggles(prev => {
        const newToggles = { ...prev };
        // First, turn off all other toggles in the same group
        mutuallyExclusiveGroups[group].forEach(groupKey => {
          if (groupKey !== key) {
            newToggles[groupKey] = false;
          }
        });
        // Then toggle the clicked option
        newToggles[key] = !prev[key];
        return newToggles;
      });
    } else {
      // For non-grouped toggles, just toggle normally
      setToggles(prev => ({
        ...prev,
        [key]: !prev[key]
      }));
    }
  };

  const getLabelText = (key) => {
    return key
      .replace(/_/g, ' ')
      .replace(/enable /g, '')
      .replace(/borders /g, '')
      .replace(/rotating /g, 'Rotating ')
      .replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div className={`pl-4 ${isOpen ? 'pb-2' : ''}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-4 py-2.5 transition-colors ${
          darkMode 
            ? 'hover:bg-gray-700' 
            : 'hover:bg-gray-50'
        }`}
      >
        <div className="flex items-center space-x-2">
          <ChevronRight className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
          <span className={`text-sm ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
            {label}
          </span>
        </div>
      </button>

      {isOpen && (
        <div className="space-y-1">
          {toggleKeys.map(key => {
            const group = getToggleGroup(key);
            const otherGroupTogglesEnabled = group ? 
              mutuallyExclusiveGroups[group].some(k => k !== key && toggles[k]) : 
              false;

            return (
              <div key={key} className="relative">
                <button
                  onClick={() => !otherGroupTogglesEnabled && handleToggle(key)}
                  className={`w-full flex items-center justify-between px-8 py-2 transition-colors ${
                    darkMode 
                      ? 'hover:bg-gray-700' 
                      : 'hover:bg-gray-50'
                  } ${otherGroupTogglesEnabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                      {getLabelText(key)}
                    </span>
                    {group && (
                      <span className={`text-xs px-1.5 py-0.5 rounded ${
                        darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600'
                      }`}>
                        {group}
                      </span>
                    )}
                  </div>
                  <div className={`w-9 h-5 rounded-full transition-colors ${
                    toggles[key] 
                      ? (darkMode ? 'bg-blue-600' : 'bg-blue-500')
                      : (darkMode ? 'bg-gray-600' : 'bg-gray-300')
                  } ${otherGroupTogglesEnabled ? 'opacity-50' : ''}`}>
                    <div className={`w-4 h-4 rounded-full bg-white transform transition-transform ${
                      toggles[key] ? 'translate-x-4' : 'translate-x-1'
                    } mt-0.5`} />
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

// Dropdown Section Component for PresetTogglesBar
const DropdownSection = ({ 
  darkMode, 
  isOpen, 
  setIsOpen, 
  title, 
  icon: Icon, 
  count, 
  countLabel, 
  children 
}) => {
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-4 py-2 ${
          darkMode 
            ? 'bg-gray-800 hover:bg-gray-700 text-white' 
            : 'bg-white hover:bg-gray-50 text-gray-900'
        } border rounded-lg shadow-sm transition-colors`}
      >
        <div className="flex items-center space-x-2">
          <Icon className="w-5 h-5" />
          <span className="font-medium">{title}</span>
          {count !== undefined && (
            <span className={`text-sm px-2 py-0.5 rounded-full ${
              darkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'
            }`}>
              {count} {countLabel}
            </span>
          )}
        </div>
        <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className={`absolute z-50 w-full mt-2 py-2 rounded-lg shadow-lg border ${
          darkMode 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          <div className="max-h-96 overflow-y-auto">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

// PresetTogglesBar Component
export const PresetTogglesBar = ({
  darkMode,
  toggles,
  setToggles,
  customPresets,
  builtInPresets,
  onApplyPreset,
  onDeleteCustomPreset,
  onSaveNewPreset
}) => {
  const [togglesOpen, setTogglesOpen] = useState(false);
  const [customOpen, setCustomOpen] = useState(false);

  // Group toggles
  const toggleGroups = {
    staticBorders: {
      label: 'Static Border Elements',
      keys: ['enable_borders_widgets', 'enable_borders_tabs', 'enable_borders_cards', 'enable_borders_bookmarks']
    },
    animatedBorders: {
      label: 'Animated Border Elements',
      keys: ['enable_rotating_borders_widgets', 'enable_rotating_borders_tabs', 'enable_rotating_borders_cards', 'enable_rotating_borders_bookmarks']
    },
    hoverEffects: {
      label: 'Hover Effects',
      keys: ['enable_hover_effects', 'enable_rotating_hover']
    },
    focusEffects: {
      label: 'Focus Effects',
      keys: ['enable_focus_effects', 'enable_rotating_focus']
    },
    appearance: {
      label: 'Appearance',
      keys: ['enable_font', 'enable_text_color', 'enable_background', 'enable_backdrop_filter']
    },
    bookmarkDisplay: {
      label: 'Bookmark Display',
      keys: ['hide_bookmark_names', 'hide_bookmark_descriptions']
    },
    layout: {
      label: 'Layout',
      keys: ['enable_centered_card_titles', 'remove_refresh_button_and_version', 'custom_api_list_clean_format']
    }
  };

  const enabledCount = Object.values(toggles).filter(Boolean).length;

  return (
    <div className={`${
      darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white/50 border-gray-200'
    } border-b backdrop-blur-sm sticky top-16 z-40`}>
      <div className="max-w-[1600px] mx-auto px-4 py-3">
        <div className="flex flex-wrap gap-3 md:flex-nowrap">
          {/* Feature Toggles */}
          <div className="w-full md:w-1/2">
            <DropdownSection
              darkMode={darkMode}
              isOpen={togglesOpen}
              setIsOpen={setTogglesOpen}
              title="Feature Toggles"
              icon={Settings}
              count={enabledCount}
              countLabel="enabled"
            >
              {Object.entries(toggleGroups).map(([group, { label, keys }]) => (
                <NestedToggle
                  key={group}
                  darkMode={darkMode}
                  label={label}
                  toggles={toggles}
                  setToggles={setToggles}
                  toggleKeys={keys}
                />
              ))}
            </DropdownSection>
          </div>

          {/* Custom Presets */}
          <div className="w-full md:w-1/2">
            <DropdownSection
              darkMode={darkMode}
              isOpen={customOpen}
              setIsOpen={setCustomOpen}
              title="Custom Presets"
              icon={BookmarkPlus}
              count={customPresets.length}
              countLabel="saved"
            >
              <div className="p-2 space-y-2">
                <button
                  onClick={() => {
                    onSaveNewPreset();
                    setCustomOpen(false);
                  }}
                  className={`w-full flex items-center justify-center px-4 py-2 rounded ${
                    darkMode
                      ? 'bg-blue-600 hover:bg-blue-700'
                      : 'bg-blue-500 hover:bg-blue-600'
                  } text-white transition-colors`}
                >
                  Save Current Colors as Preset
                </button>

                {customPresets.length > 0 && (
                  <div className="grid grid-cols-1 gap-2">
                    {customPresets.map(preset => (
                      <PresetButton
                        key={preset.name}
                        preset={preset}
                        onClick={() => {
                          onApplyPreset(preset);
                          setCustomOpen(false);
                        }}
                        onDelete={() => onDeleteCustomPreset(preset.name)}
                        darkMode={darkMode}
                        showDelete={true}
                      />
                    ))}
                  </div>
                )}
              </div>
            </DropdownSection>
          </div>
        </div>
      </div>
    </div>
  );
};