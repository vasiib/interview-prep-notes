function appendOutput(id, message) {
  const output = document.getElementById(id);
  if (!output) {
    return;
  }

  if (output.children.length === 0 && output.textContent.trim().length > 0) {
    output.textContent = "";
  }

  const entry = document.createElement("div");
  entry.textContent = message;
  output.appendChild(entry);
  output.scrollTop = output.scrollHeight;
}

const THEME_STORAGE_KEY = "pageTheme";

function applyTheme(theme) {
  const body = document.body;
  body.classList.toggle("dark-theme", theme === "dark");
  body.classList.toggle("light-theme", theme === "light");

  const button = document.getElementById("themeToggleButton");
  if (button) {
    button.textContent = theme === "dark" ? "Light theme" : "Dark theme";
  }

  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch (error) {
    // ignore localStorage errors in private mode
  }
}

function loadTheme() {
  let storedTheme = null;
  try {
    storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  } catch (error) {
    storedTheme = null;
  }

  const defaultTheme = "dark";
  applyTheme(storedTheme === "light" ? "light" : defaultTheme);
}

document.addEventListener("DOMContentLoaded", () => {
  loadTheme();

  const searchInput = document.getElementById("search");
  const throttleButton = document.getElementById("throttleButton");
  const searchImmediateInput = document.getElementById("searchImmediate");
  const clickImmediateButton = document.getElementById("clickImmediate");
  const themeToggleButton = document.getElementById("themeToggleButton");

  if (searchInput) {
    searchInput.addEventListener("input", (event) => {
      const value = event.target.value;
      if (typeof debouncedExpensiveFunction === "function") {
        debouncedExpensiveFunction(value);
      }
    });
  }

  if (throttleButton) {
    throttleButton.addEventListener("click", () => {
      if (typeof throttledExpensiveFunction === "function") {
        throttledExpensiveFunction();
      }
    });
  }

  if (searchImmediateInput) {
    searchImmediateInput.addEventListener("input", (event) => {
      const value = event.target.value;
      if (typeof expensiveFunctionImmediateSearch === "function") {
        expensiveFunctionImmediateSearch(value);
      }
    });
  }

  if (clickImmediateButton) {
    clickImmediateButton.addEventListener("click", () => {
      if (typeof expensiveFunctionImmediateClick === "function") {
        expensiveFunctionImmediateClick();
      }
    });
  }

  if (themeToggleButton) {
    themeToggleButton.addEventListener("click", () => {
      const isDark = document.body.classList.contains("dark-theme");
      applyTheme(isDark ? "light" : "dark");
    });
  }
});

function expensiveFunctionImmediateSearch(value) {
  const timestamp = new Date().toLocaleTimeString();
  appendOutput(
    "searchImmediateOutput",
    `Immediate search at ${timestamp} — Search term: "${value}"`,
  );
  console.log("Immediate search executed:", value);
}

function expensiveFunctionImmediateClick() {
  const timestamp = new Date().toLocaleTimeString();
  appendOutput(
    "clickImmediateOutput",
    `Immediate click at ${timestamp} — Button activated.`,
  );
  console.log("Immediate click executed at", timestamp);
}
