"use strict";

var menuItems = [
  {
    id: "checkin",
    title: "Check In",
    icon: "#checkin",
    
  },
  {
    id: "CRM",
    title: "CRM",
    icon: "#CRM",
  },
  {
    id: "HRM",
    title: "HRM",
    icon: "#HRM",
  },
  {
    id: "timesheet",
    title: "Timesheet",
    icon: "#timesheet",
  },
  {
    id: "finfast",
    title: "Finfast",
    icon: "#Finfast",
  },
  {
    id: "checkpoin",
    title: "Check point",
    icon: "#Check point",
  },
  {
    id: "LMS",
    title: "LMS",
    icon: "#LMS",
  },
  {
    id: "talent",
    title: "Talent",
    icon: "#Talent",
  },
  {
    id: "project",
    title: "Project",
    icon: "#Project",
  },
  {
    id: "IMS",
    title: "IMS",
    icon: "#IMS",
  },
];

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var svgMenu = new RadialMenu({
  parent: document.querySelector(".row .test"),
  size: 400,
  closeOnClick: true,
  menuItems: menuItems,
  onClick: function (item) {
    console.log("You have clicked:", item.id, item.title);
  },
  
});
svgMenu.open();

