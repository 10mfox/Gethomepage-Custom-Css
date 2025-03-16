import { elements, isSystemFont, generateCDNFontImport, generateFontFamilyDeclaration } from './Styles';

// Generate font styles including imports and definitions
export const generateFontStyles = (cssVars, toggles) => {
  if (!toggles.enable_font) return '';

  const fontFamily = cssVars.font_family;
  let styles = [];

  // Only add import if it's not a system font
  if (!isSystemFont(fontFamily)) {
    const cdnFontImport = generateCDNFontImport(fontFamily);
    if (cdnFontImport) {
      styles.push(`/*==================================
  FONT IMPORTS
==================================*/
${cdnFontImport}`);
    }
  }

  // Always add font family definition
  styles.push(`
/*==================================
  FONT FAMILY
==================================*/
:root {
  --my-font: ${generateFontFamilyDeclaration(fontFamily)};
}`);

  return styles.join('\n');
};

// Generate CSS variables
export const generateVariables = (cssVars, toggles) => {
  const variables = [];

  // Border variables for each element type
  ['tabs', 'widgets', 'cards', 'bookmarks'].forEach(element => {
    if (toggles[`enable_borders_${element}`]) {
      variables.push(`  --${element}-border-color: ${cssVars[`${element}_border_color`]};`);
    }
    
    if (toggles[`enable_rotating_borders_${element}`]) {
      variables.push(`  --rotating-${element}-color-1: ${cssVars[`rotating_${element}_color_1`]};`);
      variables.push(`  --rotating-${element}-color-2: ${cssVars[`rotating_${element}_color_2`]};`);
    }
  });

  // Interactive effects variables
  if (toggles.enable_hover_effects) {
    variables.push(`  --hover-border-color: ${cssVars.hover_border_color};`);
  }
  
  if (toggles.enable_rotating_hover) {
    variables.push(`  --rotating-hover-color-1: ${cssVars.rotating_hover_color_1};`);
    variables.push(`  --rotating-hover-color-2: ${cssVars.rotating_hover_color_2};`);
  }

  if (toggles.enable_focus_effects) {
    variables.push(`  --focus-border-color: ${cssVars.focus_border_color};`);
  }
  
  if (toggles.enable_rotating_focus) {
    variables.push(`  --rotating-focus-color-1: ${cssVars.rotating_focus_color_1};`);
    variables.push(`  --rotating-focus-color-2: ${cssVars.rotating_focus_color_2};`);
  }

  // Common variables
  if (toggles.enable_backdrop_filter) {
    variables.push(`  --backdrop-filter: ${cssVars.backdrop_filter};`);
  }

  variables.push(`  --border-width: ${cssVars.border_width};`);
  variables.push(`  --border-radius: ${cssVars.border_radius};`);
  variables.push(`  --animation-time: ${cssVars.animated_time_border};`);

  return variables;
};

// Generate keyframes for animations
export const generateKeyframes = (toggles) => {
  const hasRotatingEffects = Object.keys(toggles).some(key => 
    (key.startsWith('enable_rotating_borders_') || 
     key === 'enable_rotating_hover' || 
     key === 'enable_rotating_focus') && 
    toggles[key]
  );

  if (!hasRotatingEffects) return '';

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

@property --gradient-angle {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: false;
}`;
};

// Generate base styles
export const generateBaseStyles = (cssVars, toggles) => {
  const styles = [];

  // Global styles
  if (toggles.enable_font || toggles.enable_text_color) {
    styles.push(`
/* Global Styles */
* {
  ${toggles.enable_font ? `font-family: var(--my-font) !important;` : ''}
  ${toggles.enable_text_color ? `color: ${cssVars.text_color} !important;` : ''}
}`);
  }

  // Background styles
  if (toggles.enable_background) {
    styles.push(`
/* Background */
#page_container {
  background-color: ${cssVars.background_color};
}`);
  }

  // Backdrop filter
  if (toggles.enable_backdrop_filter) {
    styles.push(`
/* Backdrop Filter */
.backdrop-blur {
  backdrop-filter: var(--backdrop-filter);
  -webkit-backdrop-filter: var(--backdrop-filter);
}`);
  }

  return styles;
};

// Generate element-specific styles
export const generateElementStyles = (cssVars, toggles) => {
  const styles = [];

  Object.entries(elements).forEach(([name, { selector }]) => {
    // Static borders
    if (toggles[`enable_borders_${name}`]) {
      styles.push(`
/* Static Borders - ${name} */
${selector} {
  border: var(--border-width) solid var(--${name}-border-color);
  border-radius: var(--border-radius);
  ${toggles.enable_backdrop_filter ? `backdrop-filter: var(--backdrop-filter);` : ''}
  transition: border-color 0.3s ease;
}`);
    }

    // Rotating borders
    if (toggles[`enable_rotating_borders_${name}`]) {
      styles.push(`
/* Rotating Borders - ${name} */
${selector} {
  border: var(--border-width) solid transparent;
  border-radius: var(--border-radius);
  ${toggles.enable_backdrop_filter ? `backdrop-filter: var(--backdrop-filter);` : ''}
  background: 
    linear-gradient(${cssVars.background_color}, ${cssVars.background_color}) padding-box,
    linear-gradient(
      var(--angle), 
      var(--rotating-${name}-color-1), 
      var(--rotating-${name}-color-2)
    ) border-box;
  animation: rotate var(--animation-time) linear infinite;
}`);
    }
  });

  return styles;
};

// Generate interactive styles
export const generateInteractiveStyles = (cssVars, toggles) => {
  const styles = [];
  const interactiveElements = [
    'button[id$="-tab"]',
    '#information-widgets',
    '.service-card',
    '.bookmark'
  ];

  // Static hover effects
  if (toggles.enable_hover_effects) {
    styles.push(`
/* Static Hover Effects */
${interactiveElements.join(':hover,\n')}:hover {
  border-color: var(--hover-border-color);
  transform: translateY(-1px);
  transition: all 0.3s ease;
}`);
  }

  // Rotating hover effects
  if (toggles.enable_rotating_hover) {
    styles.push(`
/* Rotating Hover Effects */
${interactiveElements.join(':hover,\n')}:hover {
  border: var(--border-width) solid transparent;
  border-radius: var(--border-radius);
  transform: translateY(-1px);
  background: 
    linear-gradient(${cssVars.background_color}, ${cssVars.background_color}) padding-box,
    linear-gradient(
      var(--angle), 
      var(--rotating-hover-color-1), 
      var(--rotating-hover-color-2)
    ) border-box;
  animation: rotate var(--animation-time) linear infinite;
  transition: transform 0.3s ease;
}`);
  }

  // Static focus effects
  if (toggles.enable_focus_effects) {
    styles.push(`
/* Static Focus Effects */
button[id$="-tab"]:focus {
  border-color: var(--focus-border-color);
  outline: none;
  transition: all 0.3s ease;
}`);
  }

  // Rotating focus effects
  if (toggles.enable_rotating_focus) {
    styles.push(`
/* Rotating Focus Effects */
button[id$="-tab"]:focus {
  border: var(--border-width) solid transparent;
  border-radius: var(--border-radius);
  outline: none;
  background: 
    linear-gradient(${cssVars.background_color}, ${cssVars.background_color}) padding-box,
    linear-gradient(
      var(--angle), 
      var(--rotating-focus-color-1), 
      var(--rotating-focus-color-2)
    ) border-box;
  animation: rotate var(--animation-time) linear infinite;
}`);
  }

  return styles;
};

// Generate layout styles
export const generateLayoutStyles = (toggles) => {
  const styles = [];

  if (toggles.enable_centered_card_titles) {
    styles.push(`
.service-title,
.bookmark-text {
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
  text-align: center !important;
  width: 100% !important;
}`);
  }

  if (toggles.remove_refresh_button_and_version) {
    styles.push(`
#footer {
  display: none !important;
}`);
  }

  // Hide bookmark descriptions toggle
  if (toggles.hide_bookmark_descriptions) {
    styles.push(`
.bookmark-description {
  display: none !important;
}`);
  }

  // Hide bookmark names toggle
  if (toggles.hide_bookmark_names) {
    styles.push(`
.bookmark-name {
  display: none !important;
}`);
  }

  // Custom List Format
  if (toggles.custom_api_list_clean_format) {
    styles.push(`
/*==================================
  LIST STYLES
==================================*/
/* Recently Added Section */

/* Be Sure To Add (id: list) to custom api in services.yaml like this
- Recently Added:
     - Movies:
        icon: mdi-filmstrip
        id: list
        widget:
          type: customapi */

#list > div > div.relative.flex.flex-row.w-full.service-container > div > div {
  display: block;
  text-align: right;
}
#list > div > div.relative.flex.flex-row.w-full.service-container > div > div > div.flex.flex-row.text-right > div:nth-child(1),
#list > div > div.relative.flex.flex-row.w-full.service-container > div > div > div.flex.flex-row.text-right > div:nth-child(2) {
  white-space: wrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
#list > div > div.relative.flex.flex-row.w-full.service-container > div > div > div.flex.flex-row.text-right > div:nth-child(1) {
  text-align: left;
  margin-left: .5rem;
}
#list > div > div.relative.flex.flex-row.w-full.service-container > div > div > div.flex.flex-row.text-right > div:nth-child(2) {
  text-align: right;
  margin-left: auto;
}`);
  }

  return styles;
};

// Generate responsive styles
export const generateResponsiveStyles = () => `
@media screen and (max-width: 768px) {
  #myTab {
    padding: 5px;
    background: none;
    backdrop-filter: none;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
  }

  button[id$='-tab'] {
    padding: 10px;
    margin: 0;
    width: calc(50% - 5px);
    justify-content: center;
  }
}

@media screen and (max-width: 850px) and (orientation: landscape) {
  #widgets-wrap,
  .service-card {
    gap: 1em;
  }

  .information-widget-resource {
    margin-left: 20px;
    margin-right: 20px;
    flex-wrap: wrap;
    justify-content: center;
  }
}

@media screen and (max-width: 480px) and (orientation: portrait) {
  #widgets-wrap,
  .service-card {
    gap: 1em;
  }

  .information-widget-resource {
    margin-left: 20px;
    margin-right: 20px;
    flex-wrap: wrap;
    justify-content: center;
  }
}`;

// Main CSS generation function
export const generateCSS = (cssVars, toggles) => {
  const cssParts = [];

  // Header
  cssParts.push(`/*==================================
  GETHOMEPAGE CSS WIZARD
  Generated: ${new Date().toLocaleString()}
==================================*/

/*==================================
  GITHUB REPOSITORY
  https://github.com/10mfox/Gethomepage-Custom-Css
  If you find this tool helpful, please consider starring the repo!
==================================*/`);

  // Font Styles (including imports and definitions)
  if (toggles.enable_font) {
    const fontStyles = generateFontStyles(cssVars, toggles);
    if (fontStyles) {
      cssParts.push(fontStyles);
    }
  }

  // CSS Variables
  const variables = generateVariables(cssVars, toggles);
  if (variables.length > 0) {
    cssParts.push(`
/*==================================
  CSS VARIABLES
==================================*/
:root {
${variables.join('\n')}
}`);
  }

  // Keyframes
  const keyframes = generateKeyframes(toggles);
  if (keyframes) {
    cssParts.push(`
/*==================================
  ANIMATIONS
==================================*/
${keyframes}`);
  }

  // Base Styles
  const baseStyles = generateBaseStyles(cssVars, toggles);
  if (baseStyles.length > 0) {
    cssParts.push(`
/*==================================
  BASE STYLES
==================================*/
${baseStyles.join('\n')}`);
  }

  // Element Styles
  const elementStyles = generateElementStyles(cssVars, toggles);
  if (elementStyles.length > 0) {
    cssParts.push(`
/*==================================
  ELEMENT STYLES
==================================*/
${elementStyles.join('\n')}`);
  }

  // Interactive Styles
  const interactiveStyles = generateInteractiveStyles(cssVars, toggles);
  if (interactiveStyles.length > 0) {
    cssParts.push(`
/*==================================
  INTERACTIVE STYLES
==================================*/
${interactiveStyles.join('\n')}`);
  }

  // Layout Styles
  const layoutStyles = generateLayoutStyles(toggles);
  if (layoutStyles.length > 0) {
    cssParts.push(`
/*==================================
  LAYOUT STYLES
==================================*/
${layoutStyles.join('\n')}`);
  }

  // Responsive Styles
  cssParts.push(`
/*==================================
  RESPONSIVE STYLES
==================================*/
${generateResponsiveStyles()}`);

  return cssParts.join('\n');
};