// fonts.js

// Font categories with their CDN Fonts imports
const CDN_FONTS = {
  'Modern Sans': {
    'Inter': 'inter',
    'Roboto': 'roboto',
    'Open Sans': 'open-sans',
    'Noto Sans': 'noto-sans',
    'Source Sans Pro': 'source-sans-pro',
    'Montserrat': 'montserrat',
    'Lato': 'lato',
    'Poppins': 'poppins',
    'Work Sans': 'work-sans',
    'Ubuntu': 'ubuntu'
  },
  'Modern Serif': {
    'Merriweather': 'merriweather',
    'Playfair Display': 'playfair-display',
    'Lora': 'lora',
    'Crimson Text': 'crimson-text',
    'Libre Baskerville': 'libre-baskerville',
    'Source Serif Pro': 'source-serif-pro',
    'PT Serif': 'pt-serif',
    'Cormorant': 'cormorant'
  },
  'Coding': {
    'Fira Code': 'fira-code',
    'JetBrains Mono': 'jetbrains-mono',
    'Source Code Pro': 'source-code-pro',
    'IBM Plex Mono': 'ibm-plex-mono',
    'Inconsolata': 'inconsolata',
    'Cascadia Code': 'cascadia-code'
  },
  'Display': {
    'Permanent Marker': 'permanent-marker',
    'Righteous': 'righteous',
    'Bangers': 'bangers',
    'Philosopher': 'philosopher'
  },
  'Script': {
    'Dancing Script': 'dancing-script',
    'Pacifico': 'pacifico',
    'Great Vibes': 'great-vibes',
    'Sacramento': 'sacramento',
    'Caveat': 'caveat',
    'Indie Flower': 'indie-flower',
    'Satisfy': 'satisfy',
    'Kalam': 'kalam'
  }
};

// System font stacks for fallbacks
const SYSTEM_FONTS = {
  sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
  serif: 'Georgia, Cambria, "Times New Roman", Times, serif',
  mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
};

// All system fonts that don't need imports
const SYSTEM_FONT_NAMES = [
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

const isSystemFont = (fontFamily) => {
  return SYSTEM_FONT_NAMES.includes(fontFamily);
};

const getFontCategory = (fontFamily) => {
  for (const [category, fonts] of Object.entries(CDN_FONTS)) {
    if (fonts[fontFamily]) return category;
  }
  return null;
};

const getFontFallback = (fontFamily) => {
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

const generateCdnFontImport = (fontFamily) => {
  for (const category of Object.values(CDN_FONTS)) {
    if (category[fontFamily]) {
      const fontSlug = category[fontFamily];
      return `@import url('https://fonts.cdnfonts.com/css/${fontSlug}');`;
    }
  }
  return null;
};

const generateFontFamilyDeclaration = (fontFamily) => {
  const fallback = getFontFallback(fontFamily);
  const formattedFontFamily = fontFamily.includes(' ') ? `"${fontFamily}"` : fontFamily;
  return `${formattedFontFamily}, ${fallback}`;
};

export const generateFontStyles = (cssVars, toggles) => {
  if (!toggles.enable_font) return '';

  const fontFamily = cssVars.font_family;
  let styles = [];

  // Only add import if it's not a system font
  if (!isSystemFont(fontFamily)) {
    const cdnFontImport = generateCdnFontImport(fontFamily);
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
}
`);

  return styles.join('\n');
};

export const isCdnFont = (fontFamily) => {
  return Object.values(CDN_FONTS).some(category => 
    Object.hasOwnProperty.call(category, fontFamily)
  );
};

export const FONT_OPTIONS = Object.entries(CDN_FONTS).reduce((acc, [category, fonts]) => {
  Object.keys(fonts).forEach(font => {
    acc.push({
      value: font,
      label: `${font} - ${category}`,
      category: category
    });
  });
  return acc;
}, []);