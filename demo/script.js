"use strict";
import Window from "../window.js";

const WoWWindow = new Window(1, 1, "World of Warcraft");
WoWWindow.setBackgroundImage(
  "https://sm.ign.com/ign_hu/screenshot/default/wow2_pzb2.jpg"
);

const SettingsWindow = new Window(1, 1, "Example title v1");
SettingsWindow.setBackgroundColor("gray");
