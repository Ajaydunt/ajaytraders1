import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CHECKOUT = 'https://uhmkxvpy.mychariow.shop/activation-ajayd/checkout'
WHATSAPP = 'https://wa.me/254705936641?text=Hello%20%F0%9F%91%8B%2C%20am%20interested'
EMAIL = 'dansonswertz@gmail.com'
ABOUT_TEXT = (
    'Join Ajaytraders Chat Site, the trusted platform where Africans and people around the world '
    'get paid to chat with lonely foreigners. Enjoy instant withdrawals to , MoMo,crypto or any other '
    'mobile money account Over 80,000 users are earning daily.'
)
HERO_SUBTITLE = (
    'Join thousands of people earning daily by chatting with lonely foreigners from around the world.'
)
SEO_TITLE = 'Ajaytraders – Official Get Paid to Chat Platform'
SEO_DESC = (
    'Join Ajaytraders and get paid to chat with lonely foreigners. '
    'Instant withdrawals to MoMo, crypto or any other mobile money account'
)
FOOTER_COPY = '© 2026 Ajaytraders . All rights reserved.'
EXTENSIONS = {'.html', '.js', '.xml', '.txt', '.webmanifest', '.json'}


def walk():
    files = []
    for dirpath, dirnames, filenames in os.walk(ROOT):
        dirnames[:] = [d for d in dirnames if d not in ('node_modules', 'scripts', '.git')]
        for name in filenames:
            ext = os.path.splitext(name)[1]
            if ext in EXTENSIONS and name != 'package-lock.json':
                files.append(os.path.join(dirpath, name))
    return files


def rebrand(content, path):
    s = content

    s = s.replace('https://star-hela.com/register.php?ref=MartinKe', CHECKOUT)
    s = re.sub(r'https://wa\.me/254798106328[^"\']*', WHATSAPP, s)
    s = s.replace('https://imochat.site', 'https://ajaytraders.site')
    s = s.replace('imochat.site', 'ajaytraders.site')

    for old, new in [
        ('ImoChat Site', 'Ajaytraders'),
        ('ImoChat.Site', 'Ajaytraders'),
        ('ImoChat', 'Ajaytraders'),
        ('Deni Chat', 'Ajaytraders'),
    ]:
        s = s.replace(old, new)

    s = s.replace('Ajaytraders<span class="text-coral">.Site</span>', 'Ajaytraders')
    s = re.sub(
        r'"Ajaytraders",e\.jsx\("span",\{className:"text-coral",children:"\.Site"\}\)',
        '"Ajaytraders"',
        s,
    )
    s = re.sub(
        r'children:\["Ajaytraders",e\.jsx\("span",\{className:"text-coral",children:"\.Site"\}\)\]',
        'children:"Ajaytraders"',
        s,
    )

    s = re.sub(r'© Ajaytraders(?! \. All rights reserved\.)', FOOTER_COPY, s)
    s = s.replace('<div>© Ajaytraders</div>', f'<div>{FOOTER_COPY}</div>')
    s = s.replace('children:"© Ajaytraders"', f'children:"{FOOTER_COPY}"')

    norm = path.replace('\\', '/')
    if norm.endswith('/index.html') and '/about/' not in norm and '/contact/' not in norm and '/terms/' not in norm and '/privacy/' not in norm:
        s = re.sub(r'<title>[^<]*</title>', f'<title>{SEO_TITLE}</title>', s, count=1)
        s = re.sub(
            r'content="Join Ajaytraders[^"]*"',
            f'content="{SEO_DESC}"',
            s,
            count=1,
        )
        s = re.sub(
            r'<h2 class="font-display text-\[28px\][^>]*>Get Paid to Chat with<!-- --> <span class="bg-gradient-to-r from-primary via-teal-500 to-coral bg-clip-text text-transparent">Lonely Foreigners</span></h2>',
            '<h2 class="font-display text-[28px] leading-[1.05] font-extrabold tracking-tight text-text sm:text-4xl">Ajaytraders</h2>',
            s,
        )
        s = re.sub(
            r'<p class="mx-auto mt-3 max-w-xl text-sm text-muted sm:text-base">Join 80,000\+ Africans earning daily\. Withdraw to M-Pesa, MoMo, bank, or crypto\.</p>',
            f'<p class="mx-auto mt-3 max-w-xl text-sm text-muted sm:text-base">{HERO_SUBTITLE}</p>',
            s,
        )
        about_html = ABOUT_TEXT.replace("'", '&#x27;')
        s = re.sub(
            r"<p class=\"mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base\">Ajaytraders is Kenya&#x27;s and Africa&#x27;s leading platform connecting you with genuine foreigners who want meaningful conversations\. Whether you&#x27;re in Nairobi, Accra, Lagos or Kampala, you can start earning real money from the comfort of your phone\.</p>",
            f'<p class="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">{about_html}</p>',
            s,
        )

    if 'index-BA91RANk.js' in path:
        s = s.replace('Get Paid to Chat with', 'Ajaytraders')
        s = re.sub(
            r'Lonely Foreigners[^"]*',
            'Ajaytraders',
            s,
            count=1,
        )
        s = s.replace(
            'Join 80,000+ Africans earning daily. Withdraw to M-Pesa, MoMo, bank, or crypto.',
            HERO_SUBTITLE,
        )
        old_about = (
            "Ajaytraders is Kenya's and Africa's leading platform connecting you with genuine foreigners "
            "who want meaningful conversations. Whether you're in Nairobi, Accra, Lagos or Kampala, "
            "you can start earning real money from the comfort of your phone."
        )
        s = s.replace(old_about, ABOUT_TEXT)

    if '/about/' in norm.replace('\\', '/'):
        s = re.sub(
            r'<p class="mt-4 text-base text-muted">Ajaytraders is the official Get Paid to Chat platform connecting Africans with lonely foreigners worldwide\. Members earn per message and withdraw instantly to M-Pesa, MoMo, PayPal, or bank\.</p>',
            f'<p class="mt-4 text-base text-muted">{ABOUT_TEXT}</p>',
            s,
        )
        s = s.replace(
            'Ajaytraders is the official Get Paid to Chat platform connecting Africans with lonely foreigners worldwide. Members earn per message and withdraw instantly to M-Pesa, MoMo, PayPal, or bank.',
            ABOUT_TEXT,
        )

    def replace_email(match):
        m = match.group(0)
        if 'schema.org' in m or 'example.com' in m:
            return m
        return EMAIL

    s = re.sub(r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}', replace_email, s)
    s = re.sub(r'href="tel:[^"]*"', f'href="{WHATSAPP}"', s)
    s = re.sub(r"href='tel:[^']*'", f"href='{WHATSAPP}'", s)

    return s


def main():
    count = 0
    for path in walk():
        with open(path, 'r', encoding='utf-8') as f:
            original = f.read()
        updated = rebrand(original, path)
        if updated != original:
            with open(path, 'w', encoding='utf-8', newline='') as f:
                f.write(updated)
            print('Updated:', os.path.relpath(path, ROOT))
            count += 1
    print(f'Done. {count} files updated.')


if __name__ == '__main__':
    main()
