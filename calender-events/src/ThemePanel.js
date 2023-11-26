import React from 'react';

const ThemePanel = ({ onThemeChange, onColorChange, onFontChange }) => {
  const themes = [
    { name: 'Default', backgroundColor: '#ffffff', color: '#000000', fontFamily: 'Arial, sans-serif' },
    { name: 'Theme 1', backgroundColor: '#3498db', color: '#ffffff', fontFamily: 'Helvetica, sans-serif' },
    { name: 'Theme 2', backgroundColor: '#e74c3c', color: '#ffffff', fontFamily: 'Georgia, serif' },
    { name: 'Theme 3', backgroundColor: '#27ae60', color: '#ffffff', fontFamily: 'Courier New, monospace' },
    { name: 'Theme 4', backgroundColor: '#f39c12', color: '#000000', fontFamily: 'Comic Sans MS, cursive' },
  ];

  return (
    <div className="theme-panel">
      <h3>Theme Panel</h3>
      <div className="form-group">
        <label htmlFor="themeSelect">Select Theme:</label>
        <select id="themeSelect" className="form-control" onChange={(e) => onThemeChange(themes[e.target.value])}>
          {themes.map((theme, index) => (
            <option key={index} value={index}>{theme.name}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="backgroundColor">Background Color:</label>
        <input
          type="color"
          id="backgroundColor"
          className="form-control"
          onChange={(e) => onColorChange('backgroundColor', e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="fontFamily">Font style:</label>
        <select
          id="fontFamily"
          className="form-control"
          onChange={(e) => onFontChange('fontFamily', e.target.value)}
        >
          <option value="Arial, sans-serif">Arial</option>
          <option value="Helvetica, sans-serif">Helvetica</option>
          <option value="Georgia, serif">Georgia</option>
          <option value="Courier New, monospace">Courier New</option>
          <option value="Comic Sans MS, cursive">Comic Sans MS</option>
        </select>
      </div>
    </div>

  );
};

export default ThemePanel;
