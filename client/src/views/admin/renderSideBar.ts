import renderSideBar from "../../component/Sidebar/sidebar";
const sidebar = document.getElementById("sidebar-placeholder") as HTMLElement;
window.onload = async () => {
  renderSideBar(sidebar);
  console.log(sidebar);
};
