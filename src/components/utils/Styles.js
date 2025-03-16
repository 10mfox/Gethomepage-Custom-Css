// Element selectors for styling
export const elements = {
  tabs: { 
    selector: 'button[id$="-tab"]', 
    staticToggle: 'enable_borders_tabs', 
    rotatingToggle: 'enable_rotating_borders_tabs' 
  },
  widgets: { 
    selector: '#information-widgets', 
    staticToggle: 'enable_borders_widgets', 
    rotatingToggle: 'enable_rotating_borders_widgets' 
  },
  bookmarks: { 
    selector: '.bookmark', 
    staticToggle: 'enable_borders_bookmarks', 
    rotatingToggle: 'enable_rotating_borders_bookmarks' 
  },
  cards: { 
    selector: '.service-card', 
    staticToggle: 'enable_borders_cards', 
    rotatingToggle: 'enable_rotating_borders_cards' 
  }
};

// System font stacks for fallbacks
export const SYSTEM_FONTS = {
  sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
  serif: 'Georgia, Cambria, "Times New Roman", Times, serif',
  mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
};

// Common system fonts that don't need imports
export const SYSTEM_FONT_NAMES = [
  'Arial',
  'Helvetica',
  'Times New Roman',
  'Times',
  'Courier New',
  'Courier',
  'Verdana',
  'Georgia',
  'Palatino',
  'Garamond',
  'Bookman',
  'Comic Sans MS',
  'Trebuchet MS',
  'Impact',
  'system-ui',
  '-apple-system'
];

// Font categories and their CDNFonts availability
export const CDNFONTS = {
  'Modern Sans': {
    'Inter': 'inter',
    'Roboto': 'roboto',
    'Open Sans': 'open-sans',
    'Montserrat': 'montserrat',
    'Lato': 'lato',
    'Poppins': 'poppins'
  },
  'Modern Serif': {
    'Merriweather': 'merriweather',
    'Playfair Display': 'playfair-display',
    'Lora': 'lora',
    'Crimson Text': 'crimson-text'
  },
  'Coding': {
    'Cascadia Code': 'cascadia-code',
    'Fira Code': 'fira-code',
    'JetBrains Mono': 'jetbrains-mono',
    'Source Code Pro': 'source-code-pro',
    'IBM Plex Mono': 'ibm-plex-mono'
  },
  'Display': {
    'Permanent Marker': 'permanent-marker',
    'Righteous': 'righteous',
    'Bangers': 'bangers'
  },
  'Script': {
    'Dancing Script': 'dancing-script',
    'Pacifico': 'pacifico',
    'Great Vibes': 'great-vibes',
    'Caveat': 'caveat'
  }
};

// Helper function to check if a font is a system font
export const isSystemFont = (fontFamily) => {
  return SYSTEM_FONT_NAMES.includes(fontFamily);
};

// Helper function to get the font category
export const getFontCategory = (fontFamily) => {
  for (const [category, fonts] of Object.entries(CDNFONTS)) {
    if (fonts[fontFamily]) return category;
  }
  return null;
};

// Helper function to get appropriate font fallbacks
export const getFontFallback = (fontFamily) => {
  const category = getFontCategory(fontFamily);
  if (category) {
    if (category === 'Coding' || fontFamily.includes('Mono')) return SYSTEM_FONTS.mono;
    if (category.includes('Serif')) return SYSTEM_FONTS.serif;
    return SYSTEM_FONTS.sans;
  }
  // For system fonts, determine based on font name
  if (fontFamily.includes('Mono') || fontFamily === 'Courier' || fontFamily === 'Courier New') {
    return SYSTEM_FONTS.mono;
  }
  if (['Times', 'Times New Roman', 'Georgia', 'Palatino', 'Garamond'].includes(fontFamily)) {
    return SYSTEM_FONTS.serif;
  }
  return SYSTEM_FONTS.sans;
};

// Helper function to generate CDN font import
export const generateCDNFontImport = (fontFamily) => {
  for (const category of Object.values(CDNFONTS)) {
    if (category[fontFamily]) {
      return `@import url('https://fonts.cdnfonts.com/css/${category[fontFamily]}');`;
    }
  }
  return null;
};

// Helper function to format font family declaration
export const generateFontFamilyDeclaration = (fontFamily) => {
  const fallback = getFontFallback(fontFamily);
  const formattedFontFamily = fontFamily.includes(' ') ? `"${fontFamily}"` : fontFamily;
  return `${formattedFontFamily}, ${fallback}`;
};