"use strict";

export const maximizeIcon1 = (color = "black") => {
  return `<div style=" width: 40px; height: 30px; position: relative;"> <div style=" width: 20px; height: 5px; background-color: ${color}; position: relative; top: 7px; left: 50%; transform: translateX(-50%); "></div> <div style=" width: 2px; height: 12px; background-color: ${color}; position:relative; top: 5px; left: 10px; "></div> <div style=" width: 2px; height: 12px; background-color: ${color}; position:relative; top: -7px; left: 28px; "></div> <div style=" width: 20px; height: 2px; background-color: ${color}; position:relative; top: -8px; left: 10px; "></div> </div>`;
};

export const maximizeIcon2 = (color = "black") => {
  return `<div style=" width: 40px; height: 30px; color: white; position: relative;"> <div style=" width: 14px; height: 3px; background-color: ${color}; position: relative; top: 13px; left: 10px; "></div> <div style=" width: 14px; height: 3px; background-color: ${color}; position: relative; top: 3px; left: 17px; "></div> <div style=" width: 2px; height: 10px; background-color: ${color}; position:relative; top: 0px; left: 17px; "></div> <div style=" width: 2px; height: 12px; background-color: ${color}; position:relative; top: -3px; left: 10px; "></div> <div style=" width: 2px; height: 12px; background-color: ${color}; position:relative; top: -15px; left: 22px; "></div> <div style=" width: 14px; height: 2px; background-color: ${color}; position:relative; top: -17px; left: 10px; "></div> <div style=" width: 9px; height: 2px; background-color: ${color}; position:relative; top: -26px; left: 22px; "></div> <div style=" width: 2px; height: 10px; background-color: ${color}; position:relative; top: -38px; left: 29px; "></div></div>`;
};

export const closeIcon = (color = "black") => {
  return `<div style=" width: 40px; height: 30px; color: white; position: relative;"> <div style=" background-color: ${color}; width: 60%; height: 3px; transform: rotate(45deg); position: relative; top: 14px; left: 8px; "></div> <div style=" background-color: ${color}; width: 60%; height: 3px; transform: rotate(135deg); position: relative; top: 11px; left: 8px; "></div></div>`;
};
