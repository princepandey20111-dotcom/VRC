/**
 * PWA Service Worker Registration & Lifecycle
 */
import { registerSW } from 'virtual:pwa-register';

export function setupPWA(onNeedRefresh?: () => void, onOfflineReady?: () => void) {
  if ('serviceWorker' in navigator) {
    const updateSW = registerSW({
      onNeedRefresh() {
        if (onNeedRefresh) onNeedRefresh();
      },
      onOfflineReady() {
        if (onOfflineReady) onOfflineReady();
        console.log('EquipCheck Pro is offline-ready for construction site use.');
      },
    });

    return updateSW;
  }
  return () => {};
}
