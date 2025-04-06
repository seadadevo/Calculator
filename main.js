const buttons = [
  { value: "+", class: "key-op" },
  { value: "-", class: "key-op" },
  { value: "*", class: "key-op" },
  { value: "/", class: "key-op" },
  { value: "7" },
  { value: "8" },
  { value: "9" },
  { value: "4" },
  { value: "5" },
  { value: "6" },
  { value: "1" },
  { value: "2" },
  { value: "3" },
  { value: "0" },
  { value: "." },
  { value: "C", action: "clear" },
  { value: "=", class: "key-ent", action: "solve" },
  {value: "+M", action: "memoryAdd"},
  {value: "+MC", action: "memoryClear", class: "key-op-2" },
];

const keysContainer = document.getElementById("keys");
const result = document.getElementById("result");

buttons.forEach((btn) => {
  const input = document.createElement("input");
  input.type = "button";
  input.value = btn.value;
  input.className = `key ${btn.class || ""}`.trim();

  input.addEventListener("click", () => {
    input.classList.add("active");
    setTimeout(() => {
      input.classList.remove("active");
    }, 150);
    if (btn.action === "clear") {
      clearScreen();
    } else if (btn.action === "solve") {
      solve();
    } else if(btn.action === "memoryAdd") {
        memoryAdd()
    } else if(btn.action === "memoryClear"){
        memoryClear()
    }
    else {
      display(btn.value);
    }
  });

  keysContainer.appendChild(input);
});

function display(val) {
  if (result.value === "0" || result.value === "Error") {
    result.value = val;
  } else {
    result.value += val;
  }
}

function clearScreen() {
  result.value = "";
}

const history = [];

function solve() {
  try {
    const expression = result.value;
    const answer = math.evaluate(result.value);
    history.push({ expression, answer });
    result.value = answer;
    renderHistory();
  } catch {
    result.value = "Error";
    disableButtons();
  }
}

function renderHistory() {
  const historyList = document.getElementById("history-list");
  historyList.innerHTML = "";

  history
    .slice()
    .reverse()
    .forEach((item) => {
      const li = document.createElement("li");
      li.textContent = `${item.expression} = ${item.answer}`;
      li.className = "listFont";
      historyList.appendChild(li);
    });
}

document.getElementById("toggle-history").addEventListener("click", () => {
  const panel = document.getElementById("history-panel");
  panel.classList.toggle("hidden");
});


let memory = 0;

function updateMemoryDisplay() {
    const memoryDisplay = document.getElementById("memory-display");
    memoryDisplay.textContent = `Memory: ${memory}`;
  }

  function memoryAdd() {
    try {
      const value = math.evaluate(result.value);
      memory += value;
      updateMemoryDisplay();
    } catch {
      result.value = "Error";
      disableButtons();
    }
  }
  
  function memoryClear() {
    memory = 0;
    updateMemoryDisplay();
    result.value = "0";
  }

function disableButtons() {
  const allButtons = document.querySelectorAll("input.key");
  const allNumbers = "0123456789";

  allButtons.forEach((btn) => {
    btn.disabled = true;
    if (allNumbers.includes(btn.value)) {
      btn.classList.add("active");
    }
  });

  setTimeout(() => {
    result.value = "0";
    allButtons.forEach((btn) => {
      btn.disabled = false;
      btn.classList.remove("active");
    });
  }, 1000);
}

document.addEventListener("keydown", function (e) {
  const allowedKeys = "0123456789+-*/.";

  if (allowedKeys.includes(e.key)) {
    display(e.key);
  } else if (e.key === "Enter") {
    solve();
  } else if (e.key === "Backspace") {
    result.value = result.value.slice(0, -1);
  } else if (e.key === "Escape" || e.key.toLowerCase() === "c") {
    clearScreen();
  }
});
const themeToggle = document.getElementById("theme-toggle");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");

  if (document.body.classList.contains("light-theme")) {
    themeToggle.textContent = "🌙 Dark Mode";
  } else {
    themeToggle.textContent = "🌞 Light Mode";
  }
});
