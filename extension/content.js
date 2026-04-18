// EnviroX content script — placeholder scanner
(function () {
  const RED_FLAGS = ["100% natural", "eco-friendly", "green", "sustainable", "biodegradable"];
  const found = RED_FLAGS.filter((k) => document.body && document.body.innerText.toLowerCase().includes(k));
  if (found.length) console.log("[EnviroX] potential greenwashing terms:", found);
})();
