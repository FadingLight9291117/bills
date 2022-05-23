function setNowDate(node: HTMLElement) {
  let now = new Date();
  node.setAttribute("value", now.toLocaleDateString());
}
