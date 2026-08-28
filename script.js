if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}

let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
});

document.getElementById('installApp').addEventListener('click', (e) => {
  e.preventDefault();
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choice) => {
      if (choice.outcome === 'accepted') {
        console.log('Ajaytraders app installed');
      } else {
        console.log('User dismissed install');
      }
      deferredPrompt = null;
    });
  } else {
    alert('Install prompt not available yet. Try refreshing.');
  }
});

document.addEventListener(
  'click',
  function (e) {
    var link = e.target.closest('a[href]');
    if (!link || link.id === 'installApp') return;
    try {
      var url = new URL(link.href, window.location.href);
      if (
        url.origin === window.location.origin &&
        (url.pathname === '/' || url.pathname === '/index.html')
      ) {
        e.preventDefault();
        e.stopPropagation();
        window.location.assign('/');
      }
    } catch (err) {}
  },
  true
);
