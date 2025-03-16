import { useState } from 'react';
import { useConfig } from './Config';
import { generateCSS } from '../utils/CSSGenerator';

// FileActions hook for handling file operations
export const useFileActions = () => {
  const { 
    cssVars, 
    toggles, 
    setToggles, 
    setCssVars, 
    setDarkMode, 
    darkMode 
  } = useConfig();

  const handleSave = () => {
    try {
      // Save CSS file
      const css = generateCSS(cssVars, toggles);
      const cssBlob = new Blob([css], { type: 'text/css' });
      const cssUrl = URL.createObjectURL(cssBlob);
      const cssLink = document.createElement('a');
      cssLink.href = cssUrl;
      cssLink.download = 'custom.css';
      document.body.appendChild(cssLink);
      cssLink.click();
      document.body.removeChild(cssLink);
      URL.revokeObjectURL(cssUrl);

      // Save configuration file
      const config = { cssVars, toggles, darkMode };
      const configBlob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
      const configUrl = URL.createObjectURL(configBlob);
      const configLink = document.createElement('a');
      configLink.href = configUrl;
      configLink.download = 'custom.css.json';
      document.body.appendChild(configLink);
      configLink.click();
      document.body.removeChild(configLink);
      URL.revokeObjectURL(configUrl);
    } catch (error) {
      alert('Failed to save files. Please try again.');
    }
  };

  const handleLoad = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const config = JSON.parse(e.target.result);
        if (config.cssVars) {
          setCssVars(config.cssVars);
          setToggles(config.toggles || toggles);
          setDarkMode(config.darkMode ?? darkMode);
          localStorage.setItem('cssWizardConfig', JSON.stringify(config));
        }
      } catch (error) {
        alert('Failed to load configuration file. Please make sure it\'s a valid JSON file.');
      }
    };
    reader.onerror = () => {
      alert('Failed to read the configuration file. Please try again.');
    };
    reader.readAsText(file);
  };

  return { handleSave, handleLoad };
};

// PresetManager hook for handling preset operations
export const usePresetManager = () => {
  const { customPresets, setCustomPresets, cssVars, setCssVars } = useConfig();
  const [isAddingPreset, setIsAddingPreset] = useState(false);
  const [saveError, setSaveError] = useState('');

  const handleSavePreset = (name, description) => {
    if (!name.trim()) {
      setSaveError('Please enter a preset name');
      return;
    }

    if (customPresets.some(preset => preset.name === name.trim())) {
      setSaveError('A preset with this name already exists');
      return;
    }

    const newPreset = {
      name: name.trim(),
      description: description.trim(),
      colors: { ...cssVars },
      isCustom: true
    };

    setCustomPresets(prev => [...prev, newPreset]);
    setIsAddingPreset(false);
    setSaveError('');
  };

  const handleDeletePreset = (presetName) => {
    const shouldDelete = window.confirm(`Are you sure you want to delete the preset "${presetName}"?`);
    if (shouldDelete) {
      setCustomPresets(prev => prev.filter(preset => preset.name !== presetName));
    }
  };

  const handleApplyPreset = (preset) => {
    setCssVars(prev => ({ ...prev, ...preset.colors }));
  };

  return {
    isAddingPreset,
    setIsAddingPreset,
    saveError,
    setSaveError,
    handleSavePreset,
    handleDeletePreset,
    handleApplyPreset
  };
};