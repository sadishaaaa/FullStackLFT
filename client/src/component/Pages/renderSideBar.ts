import renderSideBar from "../Sidebar/sidebar";
const sidebar = document.getElementById("sidebar-placeholder") as HTMLElement;
window.onload = async () => {
  renderSideBar(sidebar, "sidebar-placeholder");
  console.log(sidebar);
};
