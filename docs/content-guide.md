# KiberIntellekt — Kontent qo'shish va tahrirlash qo'llanmasi

Bu qo'llanma dasturchi bo'lmaganlar uchun yozilgan. Saytga yangi loyiha, kurs, sertifikat qo'shish yoki mavjud matnlarni tahrirlash uchun kod yozish shart emas — GitHub'ning veb-saytida oddiy matn fayllarini tahrirlash kifoya.

---

## 1. Umumiy tushuncha: kontent qayerda saqlanadi

Saytning barcha "o'zgaruvchan" ma'lumotlari (loyihalar, kurslar, sertifikatlar, xizmatlar, CV, ijtimoiy tarmoq havolalari) `content/` papkasida, oddiy matn fayllari (`.json`) ko'rinishida saqlanadi:

```
content/
├── projects/          ← har bir loyiha — alohida fayl
├── courses/            ← har bir kurs — alohida fayl
├── certificates/        ← har bir sertifikat — alohida fayl
├── services.json        ← barcha xizmatlar bitta faylda
├── about/cv.json        ← "Men haqimda" sahifasi
└── social-links.json    ← Telegram/YouTube/Instagram/Facebook havolalari
```

Har bir fayl ichida bir xil matn **3 tilda** (`uz`, `ru`, `en`) birga saqlanadi:

```json
{
  "title": {
    "uz": "O'zbekcha matn",
    "ru": "Русский текст",
    "en": "English text"
  }
}
```

**Muhim qoida:** fayl nomini, `slug` maydonini va JSON strukturasini (qavslar, vergullar) o'zgartirmang — faqat qo'shtirnoq ichidagi matnlarni tahrirlang yoki butun faylni namuna sifatida nusxalab, yangi faylga joylashtiring.

---

## 2. GitHub'da tahrirlash (kompyuterga hech narsa o'rnatmasdan)

1. Repozitoriyga GitHub veb-saytida kiring.
2. Kerakli faylni toping (masalan `content/projects/`).
3. Fayl ustida qalam (✏️) belgisini bosing — bu "Edit" tugmasi.
4. Matnni tahrirlang.
5. Pastda "Commit changes" tugmasini bosing (yangi branch yaratib, "Propose changes" orqali ham qilish mumkin — bu xavfsizroq, chunki sayt darhol emas, avval "preview" havolada tekshiriladi).
6. Agar Vercel ulangan bo'lsa, har bir o'zgarish uchun avtomatik "preview" (oldindan ko'rish) havolasi yaratiladi — asosiy saytga chiqmasdan oldin natijani shu yerda tekshirasiz.

---

## 3. Yangi loyiha qo'shish

1. `content/projects/` papkasidagi istalgan faylni (masalan `iso-9001-ai-monitoring.json`) oching, **barcha matnini nusxalang**.
2. Yangi fayl yarating: `content/projects/yangi-loyiha-nomi.json` (nom lotin harflari va chiziqcha bilan, bo'sh joysiz — masalan `audit-tizimi-2025.json`).
3. Nusxalangan matnni joylashtirib, quyidagi maydonlarni to'ldiring:

| Maydon | Izoh |
|---|---|
| `slug` | Fayl nomi bilan bir xil bo'lsin (masalan `"audit-tizimi-2025"`) |
| `title` | Loyiha sarlavhasi, 3 tilda |
| `shortDescription` | Kartochkada ko'rinadigan qisqa tavsif (1-2 gap) |
| `detailedDescription` | Batafsil sahifadagi to'liq tavsif (bir necha gap yozish mumkin) |
| `technologies` | Texnologiya/mavzu nomlari ro'yxati, masalan `["Python", "ISO 27001"]` |
| `category` | Quyidagilardan biri: `ai-ml`, `cybersecurity`, `iso-quality-management`, `research`, `training`, `other` |
| `result` | Loyiha natijasi, 3 tilda |
| `coverImage` | Rasm yo'li (4-bo'limga qarang) — agar hozircha rasm bo'lmasa, bu qatorni butunlay o'chirib tashlashingiz mumkin, sayt avtomatik chiroyli placeholder ko'rsatadi |
| `gallery` | Qo'shimcha rasmlar ro'yxati (ixtiyoriy) |
| `externalLink` | Tashqi havola, masalan loyihaning o'zi (ixtiyoriy) |
| `featured` | `true` bo'lsa, bosh sahifada ko'rinadi |
| `order` | Tartib raqami (kichik raqam — birinchi) |
| `publishedAt` | Sana, `"2025-06-15"` formatida |

4. Faylni saqlang (commit qiling). Tayyor — loyiha avtomatik ravishda "Loyihalarim" sahifasida paydo bo'ladi.

---

## 4. Yangi kurs qo'shish

`content/courses/` papkasida xuddi shu tartibda ishlang. Qo'shimcha maydonlar:

- `level`: `beginner`, `intermediate`, yoki `advanced`
- `status`: `available` (mavjud) yoki `coming-soon` (tez orada)
- `syllabus`: modul va darslar ro'yxati. Har bir dars uchun:
  - `type`: `"video"` yoki `"text"`
  - `videoUrl` yoki `content` maydoni **bo'sh qoldirilsa**, sayt avtomatik "Bu dars kontenti tez orada qo'shiladi" deb ko'rsatadi.
  - Video/matn tayyor bo'lgach, shu maydonlarni to'ldirib qo'yish kifoya — struktura o'zgarmaydi.

---

## 5. Yangi sertifikat qo'shish

`content/certificates/` papkasida yangi fayl yarating:

| Maydon | Izoh |
|---|---|
| `title` | Sertifikat nomi, 3 tilda |
| `issuer` | Bergan tashkilot nomi (bitta tilda, masalan `"PECB"`) |
| `issueDate` | Berilgan sana, `"2024-03-10"` formatida |
| `category` | `ai`, `cybersecurity`, `iso-standardization`, `teaching`, yoki `other` |
| `image` | Sertifikat rasmining yo'li |
| `credentialUrl` | Tasdiqlash havolasi (ixtiyoriy) |

---

## 6. Rasm qo'shish qoidalari

1. Rasmni `public/images/projects/`, `public/images/courses/`, yoki `public/images/certificates/` papkasiga yuklang (GitHub'da "Add file → Upload files" orqali).
2. JSON faylida rasm yo'lini shu ko'rinishda yozing: `"/images/projects/audit-tizimi-2025/cover.jpg"`.
3. Tavsiya etiladigan o'lcham: eni ~1600px gacha, `.jpg` yoki `.webp` format, fayl hajmi 300-500 KB atrofida (sayt tezligini saqlash uchun).
4. Rasm hali tayyor bo'lmasa — muammo emas: `coverImage`/`image` maydonini shunchaki qo'ymang, sayt o'rniga chiroyli gradient placeholder ko'rsatadi.

---

## 7. Xizmatlar, "Men haqimda" va ijtimoiy tarmoqlarni yangilash

- **Xizmatlar**: `content/services.json` — bitta fayl ichida barcha xizmatlar ro'yxati. Yangi xizmat qo'shish uchun mavjud blokni nusxalab, `slug`ni almashtiring. `icon` maydoni uchun quyidagilardan birini yozing: `GraduationCap`, `Lightbulb`, `ShieldCheck`, `FlaskConical`.
- **Men haqimda**: `content/about/cv.json` — bio, ta'lim, ish tajribasi, mutaxassislik sohalari, tadqiqot yo'nalishlari. Yangi ish/ta'lim joyini qo'shish uchun `education` yoki `experience` ro'yxatiga yangi blok qo'shing. Davom etayotgan ish/ta'lim uchun `"end": null` qoldiring — sayt buni avtomatik "hozirgacha" (yoki mos tilda) deb ko'rsatadi.
- **Ijtimoiy tarmoqlar**: `content/social-links.json` — bitta faylda barcha havolalar. Bu yerda o'zgartirish butun sayt bo'ylab (bosh sahifa, footer, aloqa sahifasi) avtomatik yangilanadi.

---

## 8. Interfeys matnlarini tahrirlash (tugmalar, menyu)

Sayt menyusi, tugmalar va sarlavhalar kabi qisqa matnlar `messages/uz/`, `messages/ru/`, `messages/en/` papkalaridagi fayllarda saqlanadi (masalan `messages/uz/nav.json`). Bu yerni juda kamdan-kam tahrirlashingiz kerak bo'ladi — asosan `content/` papkasi bilan ishlaysiz.

---

## 9. Aloqa formasini ishga tushirish (Web3Forms)

Hozircha aloqa formasi "hozircha sozlanmoqda" degan xabar ko'rsatadi, chunki u hali ulanmagan. Ishga tushirish uchun:

1. [web3forms.com](https://web3forms.com) saytiga kirib, bepul ro'yxatdan o'ting (faqat elektron pochtangiz kerak).
2. Sizga "Access Key" (kalit) beriladi.
3. Vercel loyihangiz sozlamalarida (Settings → Environment Variables) yangi o'zgaruvchi qo'shing:
   - Nomi: `NEXT_PUBLIC_WEB3FORMS_KEY`
   - Qiymati: sizga berilgan kalit
4. Saytni qayta deploy qiling (Vercel buni odatda avtomatik qiladi).

Shundan so'ng forma orqali kelgan xabarlar to'g'ridan-to'g'ri sizning elektron pochtangizga keladi — alohida server yoki dastur kerak emas.

---

## 10. Tez-tez uchraydigan xatolar

- **JSON'da vergul yoki qavs unutilsa** — sayt qurilishi (build) xato bilan to'xtaydi va aniq qaysi faylda, qaysi maydonda xato borligini ko'rsatadi. Xavotir olmang — bu ishlab chiquvchiga (yoki Claude Code'ga) yuboriladigan xato xabari, saytga hech narsa buzilgan holda chiqmaydi.
- **3 tildan birini yozishni unutish** — xuddi shunday, build xato beradi. Har doim `uz`, `ru`, `en` — uchalasini ham to'ldiring.
- **`slug` ikkita faylda bir xil bo'lib qolsa** — ikkinchisi ustidan yozilib ketishi mumkin. Har bir fayl uchun noyob nom tanlang.

Har qanday savol yoki noaniqlik bo'lsa, ushbu faylni yoki repozitoriydagi kodni Claude Code'ga ko'rsatib, tushuntirib berishni so'rashingiz mumkin.
