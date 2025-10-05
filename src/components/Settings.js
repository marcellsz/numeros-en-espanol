// src/components/Settings.js

import React, { useState } from 'react';

function Settings({ onStart }) {
    const [settings, setSettings] = useState({
        mode: 'num-to-word',
        min: 0,
        max: 10,
        count: 10,
    });

    const handleChange = (e) => {
        setSettings({ ...settings, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onStart({
            ...settings,
            min: parseInt(settings.min),
            max: parseInt(settings.max),
            count: parseInt(settings.count)
        });
    };

    return (
        <div className="settings-container">
            <h2>Játékbeállítások</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Játékmód:</label>
                    <select name="mode" value={settings.mode} onChange={handleChange}>
                        <option value="num-to-word">Szám → Spanyol szó</option>
                        <option value="word-to-num">Spanyol szó → Szám</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Számtartomány:</label>
                    <input type="number" name="min" value={settings.min} onChange={handleChange} min="0" max="999" />
                    <span>-</span>
                    <input type="number" name="max" value={settings.max} onChange={handleChange} min="1" max="1000" />
                </div>
                <div className="form-group">
                    <label>Kérdések száma:</label>
                    <input type="number" name="count" value={settings.count} onChange={handleChange} min="1" max="50" />
                </div>
                <button type="submit" className="btn">Játék indítása</button>
            </form>
        </div>
    );
}

export default Settings;