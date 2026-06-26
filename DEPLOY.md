# Deploy ke GitHub Pages — Panduan Git CLI

## Prasyarat

- Sudah punya repo GitHub Pages (`wildanrfq.github.io` atau repo dengan GH Pages aktif)
- Node.js & npm sudah terinstall
- Git sudah terinstall dan dikonfigurasi

---

## Setup Awal (sekali saja)

### 1. Install dependencies

```bash
npm install
```

### 2. Sesuaikan `vite.config.js`

Jika nama repo kamu bukan root domain (`wildanrfq.github.io`) melainkan project page seperti `github.com/wildanrfq/portfolio`, ubah `base` di `vite.config.js`:

```js
// untuk wildanrfq.github.io → base tetap '/'
base: '/',

// untuk repo project (misal: /portfolio/) → ganti jadi:
base: '/portfolio/',
```

### 3. Tambahkan `gh-pages` sebagai dev dependency

```bash
npm install --save-dev gh-pages
```

### 4. Tambahkan script deploy di `package.json`

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

---

## Deploy

### Opsi A — Pakai `gh-pages` package (recommended)

```bash
npm run deploy
```

Ini akan otomatis build dan push folder `dist/` ke branch `gh-pages`.

---

### Opsi B — Manual via Git CLI (tanpa package tambahan)

Kalau mau deploy manual ke branch `gh-pages`:

```bash
# 1. Build dulu
npm run build

# 2. Masuk ke folder dist
cd dist

# 3. Init git di dalam dist, commit, dan push ke branch gh-pages
git init
git add .
git commit -m "deploy"
git remote add origin https://github.com/wildanrfq/wildanrfq.github.io.git
git push --force origin HEAD:gh-pages

# 4. Kembali ke root project
cd ..
```

---

## Routing: Fix 404 pada `/projects`

GitHub Pages adalah static host — kalau user langsung buka `https://wildanrfq.github.io/projects`, akan dapat 404 karena GH Pages mencari file `projects/index.html` yang tidak ada.

**Solusinya: tambahkan file `404.html`**

Buat file `public/404.html` di root project dengan isi berikut:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <script>
      const path = window.location.pathname;
      sessionStorage.setItem('redirect', path);
      window.location.replace('/');
    </script>
  </head>
</html>
```

Dan tambahkan script ini di bagian `<head>` pada `index.html`:

```html
<script>
  const redirect = sessionStorage.getItem('redirect');
  if (redirect) {
    sessionStorage.removeItem('redirect');
    window.history.replaceState(null, null, redirect);
  }
</script>
```

Setelah ini, direct URL ke `/projects` akan redirect ke root dan React Router akan menangani routing-nya dengan benar.

---

## Push Source Code ke Repo (opsional tapi dianjurkan)

Kalau mau simpan source code di branch `main` dan hasil build di `gh-pages`:

```bash
git init
git add .
git commit -m "init portfolio"
git branch -M main
git remote add origin https://github.com/wildanrfq/wildanrfq.github.io.git
git push -u origin main
```

Kemudian deploy:

```bash
npm run deploy
```

---

## Summary

| Branch   | Isi                       |
|----------|---------------------------|
| `main`   | Source code (React + Vite)|
| `gh-pages` | Build output (`dist/`)  |

Pastikan di Settings > Pages repo kamu, source diset ke branch `gh-pages`, folder `/ (root)`.
