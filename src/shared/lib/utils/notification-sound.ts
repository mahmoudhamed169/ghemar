// Notification sound + the admin's mute preference (saved in localStorage).

const SOUND_SRC = "/sounds/notification.wav";
const MUTED_KEY = "ghemar:notification-sound-muted";

let audio: HTMLAudioElement | null = null;
const listeners = new Set<() => void>();

function getAudio() {
  if (!audio) {
    audio = new Audio(SOUND_SRC);
    audio.preload = "auto";
  }
  return audio;
}

export function subscribeToSoundMuted(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

export function isSoundMuted() {
  try {
    return window.localStorage.getItem(MUTED_KEY) === "1";
  } catch {
    return false;
  }
}

export function setSoundMuted(muted: boolean) {
  try {
    window.localStorage.setItem(MUTED_KEY, muted ? "1" : "0");
  } catch {
    // storage unavailable — the choice just won't survive a reload
  }
  listeners.forEach((listener) => listener());
}

// Browsers block audio until the user interacts with the page, so this runs on
// the first click / key press: a silent play "unlocks" the element for later.
export function primeNotificationSound() {
  try {
    const el = getAudio();
    el.muted = true;
    el.play()
      .then(() => {
        el.pause();
        el.currentTime = 0;
      })
      .catch(() => {})
      .finally(() => {
        el.muted = false;
      });
  } catch {
    // ignore — sound is best effort
  }
}

export function playNotificationSound() {
  if (isSoundMuted()) return;
  try {
    const el = getAudio();
    el.muted = false;
    el.currentTime = 0;
    el.play().catch(() => {});
  } catch {
    // ignore — sound is best effort
  }
}
