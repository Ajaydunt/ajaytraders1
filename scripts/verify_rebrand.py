import os
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PATS = ['ImoChat', 'imochat', 'star-hela', '254798106328', 'Deni Chat', 'flitchat']
found = []
for dp, dns, fns in os.walk(ROOT):
    dns[:] = [d for d in dns if d != 'node_modules']
    for f in fns:
        if f.endswith(('.html', '.js', '.xml', '.txt', '.webmanifest', '.json')) and f != 'package-lock.json':
            p = os.path.join(dp, f)
            c = open(p, encoding='utf-8').read()
            for pat in PATS:
                if pat in c:
                    found.append((os.path.relpath(p, ROOT), pat))
if found:
    for item in found:
        print(item)
else:
    print('All clear - no old branding found')
