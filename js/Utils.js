export default class Utils {
  static setCSS(css) {
    var stylesheet = Array.from(document.styleSheets).find(
      (t) => t.title === "js_css"
    );
    if (!stylesheet) {
      var style = document.createElement("style");
      style.title = "js_css";
      document.head.appendChild(style);
      stylesheet = document.styleSheets[document.styleSheets.length - 1];
    }
    css
      .replace(/\n|\b/g, "")
      .match(/.*?\{.*?\}/g)
      .forEach((t) => {
        stylesheet.insertRule(t.trim(), stylesheet.cssRules.length);
      });
  }
}
