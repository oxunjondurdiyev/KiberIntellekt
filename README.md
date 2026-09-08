# KiberIntellekt

Sun'iy intellekt va kiberxavfsizlik yo'nalishidagi shaxsiy portfolio, ta'lim platformasi va ijtimoiy tarmoq boshqaruv markazi.

3 tilda (o'zbek, rus, ingliz), kun/tun rejimi va animatsiyalar bilan qurilgan Next.js sayti.

## Kontent qo'shish / tahrirlash

Dasturchi bo'lmagan foydalanuvchilar uchun: yangi loyiha, kurs yoki sertifikat qo'shish bo'yicha bosqichma-bosqich qo'llanma — [`docs/content-guide.md`](./docs/content-guide.md).

## Texnologik stek

- **Next.js 16** (App Router) + TypeScript
- **next-intl** — 3 tilli marshrutlash va tarjima
- **Tailwind CSS v4** — uslublash
- **Motion** (Framer Motion) — scroll animatsiyalari, sahifa o'tishlari
- **next-themes** — kun/tun rejimi (View Transitions API bilan)
- **Radix UI** — accordion, dialog (lightbox, mobil menyu), dropdown
- **React Hook Form + Zod** — aloqa formasi va kontent validatsiyasi
- **Web3Forms** — aloqa formasi (backend talab qilmaydi)

## Lokal ishga tushirish

```bash
pnpm install
pnpm dev
```

Brauzerda [http://localhost:3000](http://localhost:3000) ochiladi (avtomatik `/uz` ga yo'naltiriladi).

Production build tekshiruvi:

```bash
pnpm build
pnpm start
```

## Muhit o'zgaruvchilari (Environment Variables)

`.env.local` fayl yarating (`.env.example`dan nusxa oling):

| O'zgaruvchi | Izoh |
|---|---|
| `NEXT_PUBLIC_WEB3FORMS_KEY` | Aloqa formasi ishlashi uchun kerak. [web3forms.com](https://web3forms.com)da bepul ro'yxatdan o'tib oling. Bo'sh qoldirilsa, forma o'rniga "hozircha sozlanmoqda" xabari ko'rsatiladi. |
| `NEXT_PUBLIC_SITE_URL` | Saytning haqiqiy domeni (masalan `https://kiberintellekt.uz`) — sitemap, SEO havolalari (hreflang) uchun ishlatiladi. Qo'yilmasa, placeholder domen ishlatiladi. |

## Loyiha strukturasi (qisqacha)

```
app/[locale]/     ← sahifalar (uz/ru/en marshrutlash)
components/        ← UI komponentlar
content/           ← loyihalar, kurslar, sertifikatlar, CV (JSON)
messages/          ← interfeys matnlari (tugmalar, menyu)
lib/content/       ← kontentni o'qish va tekshirish (Zod)
docs/              ← kontent qo'shish qo'llanmasi
```

## Deploy (Vercel)

1. Repozitoriyni [Vercel](https://vercel.com)ga ulang.
2. Yuqoridagi muhit o'zgaruvchilarini Vercel loyihasi sozlamalarida (`Settings → Environment Variables`) kiriting.
3. Har bir push avtomatik deploy qilinadi; Pull Request'lar uchun alohida "preview" havola yaratiladi — bu kontent o'zgarishlarini asosiy saytga chiqishdan oldin tekshirish uchun qulay.
