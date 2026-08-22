import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';

const ROOT = join(import.meta.dirname, '..');
const CHECKOUT = 'https://uhmkxvpy.mychariow.shop/activation-ajayd/checkout';
const WHATSAPP = 'https://wa.me/254705936641?text=Hello%20%F0%9F%91%8B%2C%20am%20interested';
const EMAIL = 'dansonswertz@gmail.com';
const ABOUT_TEXT =
  'Join Ajaytraders Chat Site, the trusted platform where Africans and people around the world get paid to chat with lonely foreigners. Enjoy instant withdrawals to , MoMo,crypto or any other mobile money account Over 80,000 users are earning daily.';
const HERO_SUBTITLE =
  'Join thousands of people earning daily by chatting with lonely foreigners from around the world.';
const SEO_TITLE = 'Ajaytraders – Official Get Paid to Chat Platform';
const SEO_DESC =
  'Join Ajaytraders and get paid to chat with lonely foreigners. Instant withdrawals to MoMo, crypto or any other mobile money account';
const FOOTER_COPY = '© 2026 Ajaytraders . All rights reserved.';

const EXTENSIONS = new Set(['.html', '.js', '.xml', '.txt', '.webmanifest', '.json']);

function walk(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    if (entry === 'node_modules' || entry === 'scripts') continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, files);
    else if (EXTENSIONS.has(extname(full)) && !full.endsWith('package-lock.json')) files.push(full);
  }
  return files;
}

function rebrand(content, filePath) {
  let s = content;

  // URLs and links
  s = s.replace(/https:\/\/star-hela\.com\/register\.php\?ref=MartinKe/g, CHECKOUT);
  s = s.replace(/https:\/\/wa\.me\/254798106328[^"'\s]*/g, WHATSAPP);
  s = s.replace(/https:\/\/imochat\.site/g, 'https://ajaytraders.site');
  s = s.replace(/imochat\.site/g, 'ajaytraders.site');

  // Brand names (order matters)
  s = s.replace(/ImoChat Site/g, 'Ajaytraders');
  s = s.replace(/ImoChat\.Site/g, 'Ajaytraders');
  s = s.replace(/ImoChat/g, 'Ajaytraders');
  s = s.replace(/Deni Chat/g, 'Ajaytraders');

  // Logo text patterns in HTML
  s = s.replace(
    /Ajaytraders<span class="text-coral">\.Site<\/span>/g,
    'Ajaytraders'
  );
  s = s.replace(
    /"Ajaytraders",e\.jsx\("span",\{className:"text-coral",children:"\.Site"\}\)/g,
    '"Ajaytraders"'
  );
  s = s.replace(
    /children:\["Ajaytraders",e\.jsx\("span",\{className:"text-coral",children:"\.Site"\}\)\]/g,
    'children:"Ajaytraders"'
  );
  s = s.replace(
    /"Ajaytraders",e\.jsx\("span",\{className:"text-coral",children:"\.Site"\}\)/g,
    '"Ajaytraders"'
  );

  // Footer domain label
  s = s.replace(/· ajaytraders\.site/g, '· ajaytraders.site');

  // Footer copyright
  s = s.replace(/© Ajaytraders(?! \. All rights reserved\.)/g, FOOTER_COPY);
  s = s.replace(/<div>© Ajaytraders<\/div>/g, `<div>${FOOTER_COPY}</div>`);
  s = s.replace(/children:"© Ajaytraders"/g, `children:"${FOOTER_COPY}"`);

  // Alt text
  s = s.replace(/alt="Ajaytraders logo"/g, 'alt="Ajaytraders logo"');

  // Homepage SEO (index.html)
  if (filePath.endsWith('index.html') && !filePath.includes(`${join('about', 'index')}`)) {
    const isRoot = filePath.endsWith(`${join(ROOT, 'index.html')}`.replace(/\\/g, '/')) ||
      filePath === join(ROOT, 'index.html');
    if (isRoot || filePath.replace(/\\/g, '/').endsWith('/index.html') && !filePath.includes('about') && !filePath.includes('contact') && !filePath.includes('terms') && !filePath.includes('privacy')) {
      if (filePath === join(ROOT, 'index.html')) {
        s = s.replace(/<title>[^<]*<\/title>/, `<title>${SEO_TITLE}</title>`);
        s = s.replace(
          /content="Join Ajaytraders[^"]*"/,
          `content="${SEO_DESC}"`
        );
        s = s.replace(
          /content="Ajaytraders - Official Get Paid to Chat Platform[^"]*"/g,
          `content="${SEO_TITLE}"`
        );

        // Hero title
        s = s.replace(
          /<h2 class="font-display text-\[28px\][^"]*"[^>]*>Get Paid to Chat with<!-- --> <span class="bg-gradient-to-r from-primary via-teal-500 to-coral bg-clip-text text-transparent">Lonely Foreigners<\/span><\/h2>/,
          `<h2 class="font-display text-[28px] leading-[1.05] font-extrabold tracking-tight text-text sm:text-4xl">Ajaytraders</h2>`
        );

        // Hero subtitle
        s = s.replace(
          /<p class="mx-auto mt-3 max-w-xl text-sm text-muted sm:text-base">Join 80,000\+ Africans earning daily\. Withdraw to M-Pesa, MoMo, bank, or crypto\.<\/p>/,
          `<p class="mx-auto mt-3 max-w-xl text-sm text-muted sm:text-base">${HERO_SUBTITLE}</p>`
        );

        // About section paragraph
        s = s.replace(
          /<p class="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">Ajaytraders is Kenya&#x27;s and Africa&#x27;s leading platform connecting you with genuine foreigners who want meaningful conversations\. Whether you&#x27;re in Nairobi, Accra, Lagos or Kampala, you can start earning real money from the comfort of your phone\.<\/p>/,
          `<p class="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">${ABOUT_TEXT.replace(/'/g, '&#x27;')}</p>`
        );
      }
    }
  }

  // Hero in JS bundle
  if (filePath.endsWith('index-BA91RANk.js')) {
    s = s.replace(
      /children:"Ajaytraders Site - Get Paid to Chat Online"/g,
      'children:"Ajaytraders - Get Paid to Chat Online"'
    );
    s = s.replace(
      /Get Paid to Chat with.*?Lonely Foreigners/s,
      'Ajaytraders'
    );
    s = s.replace(
      /Join 80,000\+ Africans earning daily\. Withdraw to M-Pesa, MoMo, bank, or crypto\./g,
      HERO_SUBTITLE
    );
    s = s.replace(
      /Ajaytraders is Kenya's and Africa's leading platform connecting you with genuine foreigners who want meaningful conversations\. Whether you're in Nairobi, Accra, Lagos or Kampala, you can start earning real money from the comfort of your phone\./g,
      ABOUT_TEXT
    );
  }

  // About page content
  if (filePath.includes('about')) {
    s = s.replace(
      /<p class="mt-4 text-base text-muted">Ajaytraders is the official Get Paid to Chat platform connecting Africans with lonely foreigners worldwide\. Members earn per message and withdraw instantly to M-Pesa, MoMo, PayPal, or bank\.<\/p>/,
      `<p class="mt-4 text-base text-muted">${ABOUT_TEXT}</p>`
    );
    s = s.replace(
      /Ajaytraders is the official Get Paid to Chat platform connecting Africans with lonely foreigners worldwide\. Members earn per message and withdraw instantly to M-Pesa, MoMo, PayPal, or bank\./g,
      ABOUT_TEXT
    );
  }

  // Emails - replace any email-like patterns
  s = s.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, (match) => {
    if (match.includes('schema.org') || match.includes('example')) return match;
    return EMAIL;
  });

  // Remove tel: links (keep WhatsApp only)
  s = s.replace(/href="tel:[^"]*"/g, `href="${WHATSAPP}"`);
  s = s.replace(/href='tel:[^']*'/g, `href='${WHATSAPP}'`);

  return s;
}

const files = walk(ROOT);
let count = 0;
for (const file of files) {
  const original = readFileSync(file, 'utf8');
  const updated = rebrand(original, file);
  if (updated !== original) {
    writeFileSync(file, updated, 'utf8');
    console.log('Updated:', file.replace(ROOT + '\\', '').replace(ROOT + '/', ''));
    count++;
  }
}
console.log(`Done. ${count} files updated.`);
