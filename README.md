# DUB SIREN

A browser instrument for dub-style sound effects and live mix recording.  
曲を流しながら、ダブサイレン、エアホーン、スプリングの破裂音を重ねて録音するブラウザー楽器です。

[Play DUB SIREN v0.3.3](https://masato-nasu.github.io/DUB-SIREN/)

[Open in English](https://masato-nasu.github.io/DUB-SIREN/?lang=en) · [日本語で開く](https://masato-nasu.github.io/DUB-SIREN/?lang=ja)

## Play

- **SIREN** — Hold FIRE and slide vertically for pitch or horizontally for modulation speed. Space also triggers FIRE on a keyboard.
- **AIR HORN** — Tap FIRE for a short horn hit. Tap repeatedly to play a rhythm.
- **THUNDER** — Tap FIRE for a sharp spring-reverb crash. The hit position controls its pitch and brightness.
- **TAPE DELAY** — Adjust the delay time, feedback and amount. Use the stop button to cut the tail.
- **MUSIC & REC** — Select a local audio file, play it, and record the mix. Preview the take and save it in the format available in your browser.

The app plays and mixes your selected file in the browser. The recording is generated locally and saved when you download it.

## Install and play offline

Open the public app in your browser while online. In Chrome on Android, use **インストール** if it appears in the app, or use the browser menu to add the app to your home screen. On iPhone, open the app in Safari and use the Share menu to add it to the home screen.

If a home-screen installation from the original ChatGPT Sites URL shows ERR_FAILED, open the [PWA recovery page](https://dub-siren.sunny-seed-0354.chatgpt.site/recover) online in the same browser and reopen the app after it updates.

Once the app has finished its first online load, the app interface and its built-in sounds are available offline. Use audio files already on the device for backing tracks.

## Run locally

From the repository root, run `python3 -m http.server 8000` and open [http://localhost:8000](http://localhost:8000). Keep both WAV files beside `index.html`.

## Audio credits

| Asset | Source | License | Edits |
| --- | --- | --- | --- |
| `air-horn.wav` | [air horn — the_mred](https://freesound.org/people/the_mred/sounds/741817/) | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) | Trimmed to a short hit and faded. |
| `thunder.wav` | [Spring tank reverb crashing noise.wav — Solar01](https://freesound.org/people/Solar01/sounds/662099/) | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) | A single impact was edited for a sharp attack and a more audible spring tail. |

THUNDER takes its cue from the spring-reverb crashes in King Tubby's “A Noisy Place,” the dub of Horace Andy's “Quiet Place.”

Design by Masato Nasu.
