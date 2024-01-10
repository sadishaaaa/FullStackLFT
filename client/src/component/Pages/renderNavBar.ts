import "../../styles/style.css";
import renderNavBar from "../Navbar/navbar";
const navBar = document.getElementById("navbar") as HTMLElement;
window.onload = async () => {
  renderNavBar(navBar, "navbar");
};
