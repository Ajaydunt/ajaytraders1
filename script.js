(function () {
  const CHECKOUT = 'https://uhmkxvpy.mychariow.shop/activation-ajayd/checkout';

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('/sw.js').catch(function () {});
    });
  }

  function isStandalone() {
    return (
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone === true
    );
  }

  function ensureInstallButton() {
    var btn = document.getElementById('installApp');
    if (btn) return btn;

    btn = document.createElement('a');
    btn.href = '#';
    btn.className = 'download-app';
    btn.id = 'installApp';
    btn.setAttribute('aria-label', 'Download Ajaytraders App');
    btn.textContent = '📲 Download Our App';
    document.body.appendChild(btn);
    return btn;
  }

  var deferredPrompt = null;
  var installBound = false;

  function bindInstall(btn) {
    if (installBound || !btn) return;
    installBound = true;

    btn.addEventListener('click', function (e) {
      e.preventDefault();

      if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then(function (choice) {
          if (choice.outcome === 'accepted') {
            btn.classList.add('is-hidden');
          }
          deferredPrompt = null;
        });
        return;
      }

      window.location.href = CHECKOUT;
    });
  }

  function init() {
    var btn = ensureInstallButton();
    if (isStandalone()) {
      btn.classList.add('is-hidden');
      return;
    }
    bindInstall(btn);
  }

  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault();
    deferredPrompt = e;
    var btn = ensureInstallButton();
    btn.classList.remove('is-hidden');
    bindInstall(btn);
  });

  window.addEventListener('appinstalled', function () {
    deferredPrompt = null;
    var btn = document.getElementById('installApp');
    if (btn) btn.classList.add('is-hidden');
  });

  document.addEventListener(
    'click',
    function (e) {
      var link = e.target.closest('a[href]');
      if (!link) return;
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

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
