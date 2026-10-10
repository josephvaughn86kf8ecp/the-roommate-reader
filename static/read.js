// Read-aloud for The Roommate.
// Uses the Web Speech API (speechSynthesis), which on iPhone speaks through
// the device's own voices. Long chapters are split into sentence chunks so
// no single utterance gets cut off by the browser.
(function () {
  var readBtn = document.getElementById("read-btn");
  var stopBtn = document.getElementById("stop-btn");
  var rateInput = document.getElementById("rate");
  var statusEl = document.getElementById("read-status");
  var bodyEl = document.getElementById("chapter-body");
  if (!readBtn || !bodyEl || !("speechSynthesis" in window)) {
    if (readBtn) {
      readBtn.disabled = true;
      readBtn.textContent = "🔇 Read-aloud not supported here";
    }
    return;
  }

  var speaking = false;

  function chunks(text) {
    // Split on sentence boundaries, keeping the punctuation.
    var parts = text.match(/[^.!?]+[.!?]+["']?|\S[^.!?]*$/g) || [text];
    var out = [], buf = "";
    parts.forEach(function (p) {
      p = p.trim();
      if (!p) return;
      if ((buf + " " + p).length > 600) { out.push(buf.trim()); buf = p; }
      else { buf = (buf ? buf + " " : "") + p; }
    });
    if (buf.trim()) out.push(buf.trim());
    return out;
  }

  function setStatus(s) { if (statusEl) statusEl.textContent = s; }

  function speakAll() {
    window.speechSynthesis.cancel();
    var text = bodyEl.getAttribute("data-plain") || bodyEl.innerText;
    var parts = chunks(text);
    var rate = parseFloat(rateInput.value) || 1;
    speaking = true;
    readBtn.disabled = true;
    stopBtn.disabled = false;
    setStatus("Reading…");
    var i = 0;
    function next() {
      if (!speaking || i >= parts.length) { finish(); return; }
      var u = new SpeechSynthesisUtterance(parts[i]);
      u.rate = rate;
      u.onend = function () { i++; next(); };
      u.onerror = function () { i++; next(); };
      window.speechSynthesis.speak(u);
    }
    function finish() {
      speaking = false;
      window.speechSynthesis.cancel();
      readBtn.disabled = false;
      stopBtn.disabled = true;
      setStatus("");
    }
    window.__readerStop = finish;
    next();
  }

  readBtn.addEventListener("click", speakAll);
  stopBtn.addEventListener("click", function () {
    speaking = false;
    if (window.__readerStop) window.__readerStop();
  });
  rateInput.addEventListener("input", function () {
    // Applies on next press; note it in the status while reading.
    if (speaking) setStatus("Reading… (speed applies to next press)");
  });
})();
