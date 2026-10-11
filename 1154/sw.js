// Minimal service worker — required by Chrome on Android to display notifications.
// Chrome for Android refuses `new Notification()` from a regular page; it only
// allows notifications shown via a registered ServiceWorkerRegistration.
self.addEventListener('install', ()=>{ self.skipWaiting(); });
self.addEventListener('activate', (e)=>{ e.waitUntil(self.clients.claim()); });

// Click handling: focus/open the app and let it route to the Matches tab.
self.addEventListener('notificationclick', (event)=>{
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList=>{
      for(const client of clientList){
        if('focus' in client) return client.focus();
      }
      if(self.clients.openWindow) return self.clients.openWindow('./');
    })
  );
});
