import Window from '../window.js';

const WoWWindow = new Window(1, 1, 'World of Warcraft');
const SettingsWindow = new Window(1, 1, 'Example title v1');

const emptyWindow = new Window();
emptyWindow.title = "New Window Title";

console.log(`${emptyWindow.width}x${emptyWindow.height}`)