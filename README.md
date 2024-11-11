# CSS Wizard for Homepage

A powerful CSS customization tool for Gethomepage, featuring live preview, color presets, and responsive design settings.

## 🚀 Features

- **Live Preview**: See your changes in real-time
- **Color Management**: Built-in color picker with preset themes
- **Style Customization**: Control fonts, borders, and effects
- **Dark/Light Mode**: Full support for both themes
- **Responsive Design**: Mobile-friendly interface
- **Import/Export**: Save and load your configurations

## Quick Start

### Prerequisites

- Gethomepage
- Docker
- Docker Compose

### Installation
```
---

services:
  homepage-css-editor-beta:
    container_name: Homepage-Css-Editor-Beta  
    image: ghcr.io/10mfox/gethomepage-custom-css:beta
    ports:
      - "5556:5556" 
    environment:
      - PORT=5556    
    restart: always    
    network_mode: bridge
```
4. Access the application at `http://localhost:5556`

## Configuration

### Configuration Files

When saving your configuration, two files are generated:
- `custom.css`: The generated CSS file to use with Homepage
- `custom.css.json`: Your configuration file that can be loaded back into the CSS Wizard

## 🎨 Usage

1. Toggle features using the control panel
2. Customize colors and styles
3. Preview changes in real-time
4. Export your CSS when satisfied

## 💾 Save/Load Configurations

- Click "Save CSS" to download your configuration
- Use the "Load" button to restore a previous configuration

## 🎯 Built-in Presets

Includes multiple pre-configured themes:
- Dark Matrix
- Solarized Dark
- Ocean Deep
- Dracula
- Monokai
- Nord
- Cyberpunk
- Forest
- Synthwave
- Tokyo Night
- Rose Gold
- Deep Space

## License

This project is licensed under the MIT License - see the LICENSE file for details

## 📦 Tech Stack

- React
- Vite
- Tailwind CSS
- Docker
- lucide-react
