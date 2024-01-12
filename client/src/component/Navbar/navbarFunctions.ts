export function openSidebar() {
  const sidebar = document.getElementById("sidebar");
  if (sidebar) {
    sidebar.style.width = "250px";
  }
}

export function closeSidebar() {
  const sidebar = document.getElementById("sidebar");
  if (sidebar) {
    sidebar.style.width = "0";
  }
}
