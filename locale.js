"use strict";

const dubLocale = (() => {
  const english = {
    install: "Install", effects: "Sound effects", chooseTrack: "Choose audio file",
    play: "▶ Play", pause: "Ⅱ Pause", trackInitial: "Choose an MP3 or WAV saved on your device.",
    fileHelp: "File picker not opening?",
    fileHelpText: "If you opened this page inside another app, open it in Chrome to choose an audio file.",
    seek: "Track position", trackVolume: "Track volume",
    recordStart: "● Start recording", recordStop: "■ Stop recording",
    recordHint: "Record the track and effects together.", takePreview: "Preview recording",
    takeSave: "Save recording", soundControls: "Sound and delay controls", waveforms: "Waveforms",
    depth: "Mod depth", time: "Delay time", feedback: "Feedback", echo: "Echo level",
    volume: "FX volume", kill: "■ Cut echo",
    audioError: "Could not start audio. Check your connection and press FIRE again.",
    sirenNote: "Hold to play", hornNote: "Tap to fire the air horn", thunderNote: "Hit the spring tank",
    sirenHint: "Up and down for pitch, left and right for modulation speed. Release to let the echo ring out.",
    hornHint: "Tap at different spots for pitch and tone. Tap repeatedly to play a rhythm.",
    thunderHint: "Tap for a spring crash. Up and down for depth, left and right for bite.",
    keyboard: "On a keyboard, press Space to play.",
    trackLoading: "Loading audio file…", trackReady: "Track loaded. Press Play.",
    trackPlayError: "Could not play this file. Try another audio file.",
    trackReadError: "Could not read this file. Choose an MP3 or WAV saved on your device.",
    recordUnavailable: "This browser cannot record audio.", recording: "Recording",
    recordDone: "Recording ready", recordSaveError: "Could not save the recording.",
    recordStartError: "Could not start recording.",
    recoverTitle: "DUB SIREN Startup Repair", recoverStatus: "Updating the files needed to start the app.",
    recoverRetry: "Try again", recoverError: "Could not update. Check your connection and try again."
  };

  function initialLanguage() {
    const requested = new URLSearchParams(location.search).get("lang");
    if (requested === "ja" || requested === "en") return requested;
    try {
      const saved = localStorage.getItem("dub-siren-language");
      if (saved === "ja" || saved === "en") return saved;
    } catch {
      // The browser language still works when storage is unavailable.
    }
    return /^ja(?:-|$)/i.test(navigator.language) ? "ja" : "en";
  }

  let language = initialLanguage();
  const japanese = {};
  const translate = (key, fallback) => (language === "en" ? english : japanese)[key] ?? fallback;

  function remember(key, text) {
    if (key && japanese[key] === undefined) japanese[key] = text;
  }

  const entries = Array.from(document.querySelectorAll("[data-i18n], [data-i18n-label]"));
  for (const el of entries) {
    remember(el.dataset.i18n, el.textContent);
    remember(el.dataset.i18nLabel, el.getAttribute("aria-label"));
  }
  const switcher = document.getElementById("language");

  function render() {
    document.documentElement.lang = language;
    for (const el of entries) {
      const { i18n, i18nLabel } = el.dataset;
      if (i18n) el.textContent = translate(i18n, el.textContent);
      if (i18nLabel) el.setAttribute("aria-label", translate(i18nLabel, el.getAttribute("aria-label")));
    }
    if (switcher) {
      const japanesePage = language === "ja";
      switcher.textContent = japanesePage ? "EN" : "日本語";
      switcher.setAttribute("lang", japanesePage ? "en" : "ja");
      switcher.setAttribute("aria-label", japanesePage ? "Switch to English" : "日本語に切り替え");
    }
  }

  function set(el, key, fallback) {
    remember(key, fallback);
    el.dataset.i18n = key;
    if (!entries.includes(el)) entries.push(el);
    el.textContent = translate(key, fallback);
  }

  switcher?.addEventListener("click", () => {
    language = language === "ja" ? "en" : "ja";
    try { localStorage.setItem("dub-siren-language", language); } catch {}
    const url = new URL(location.href);
    if (url.searchParams.has("lang")) {
      url.searchParams.set("lang", language);
      history.replaceState(null, "", url);
    }
    render();
    document.dispatchEvent(new Event("dub-language-change"));
  });
  render();
  return { set, text: translate };
})();
