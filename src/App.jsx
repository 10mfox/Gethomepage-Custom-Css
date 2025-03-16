import React from 'react';
import { Header, MainContent } from './components/ui/Layout';
import { SavePresetDialog } from './components/ui/ColorUI';
import { PresetTogglesBar } from './components/Toggles';
import { ConfigProvider, useConfig } from './components/core/Config';
import { useFileActions, usePresetManager } from './components/core/Actions';

const AppContent = () => {
  const { 
    darkMode, setDarkMode, 
    cssVars, setCssVars, 
    toggles, setToggles, 
    customPresets, builtInPresets 
  } = useConfig();
  
  const { handleSave, handleLoad } = useFileActions();
  const { 
    isAddingPreset, setIsAddingPreset, 
    saveError, setSaveError, 
    handleSavePreset, handleDeletePreset 
  } = usePresetManager();

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-100'}`}>
      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        handleSave={handleSave}
        handleLoad={handleLoad}
      />
      
      <PresetTogglesBar
        darkMode={darkMode}
        toggles={toggles}
        setToggles={setToggles}
        customPresets={customPresets}
        builtInPresets={builtInPresets}
        onApplyPreset={preset => setCssVars(prev => ({ ...prev, ...preset.colors }))}
        onDeleteCustomPreset={handleDeletePreset}
        onSaveNewPreset={() => setIsAddingPreset(true)}
      />
      
      <MainContent
        darkMode={darkMode}
        cssVars={cssVars}
        setCssVars={setCssVars}
        toggles={toggles}
      />
      
      {isAddingPreset && (
        <SavePresetDialog
          darkMode={darkMode}
          onSave={handleSavePreset}
          onClose={() => {
            setIsAddingPreset(false);
            setSaveError('');
          }}
          error={saveError}
        />
      )}
    </div>
  );
};

const App = () => (
  <ConfigProvider>
    <AppContent />
  </ConfigProvider>
);

export default App;