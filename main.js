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
  ];

  
const keysContainer = document.getElementById("keys");
const result = document.getElementById("result");

buttons.forEach((btn) => {
  const input = document.createElement("input");
  input.type = "button";
  input.value = btn.value;
  input.className = `key ${btn.class || ""}`.trim();

  input.addEventListener("click", () => {
    if (btn.action === "clear") {
      clearScreen();
    } else if (btn.action === "solve") {
      solve();
    } else {
      display(btn.value);
    }
  });

  keysContainer.appendChild(input);
});

function display(val) {
  result.value += val;
}

function clearScreen() {
  result.value = "";
}

function solve() {
  try {
    result.value = eval(result.value);
  } catch {
    result.value = "Error";
  }
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
