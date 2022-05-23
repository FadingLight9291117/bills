"use strict";
function setNowDate(node) {
    let now = new Date();
    node.setAttribute("value", now.toLocaleDateString());
}
