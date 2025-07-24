# No Surrender: Kart Geliştirme

## Proje Amacı

Bu proje, HTML5 tabanlı bir web uygulamasında kullanıcıların çeşitli kartları (silah, kalkan, kitap vb.) seviye atlatmasını ve geliştirmesini sağlayan, oyunlaştırılmış bir sistem sunar. Kullanıcılar, enerji harcayarak kartlarının progress bar'ını doldurur, progress %100 olduğunda kart bir üst seviyeye çıkar. Enerji sınırlı olup zamanla otomatik olarak yenilenir. Amaç, kullanıcıya akıcı, performanslı ve güvenli bir geliştirme deneyimi sunmaktır.

## Temel Özellikler

- Kartlar üzerinde "Geliştir" butonu ile progress artırma
- Her tıklamada progress %2 artar ve 1 enerji harcanır
- Progress %100 olunca kart otomatik seviye atlar, progress sıfırlanır
- Seviye atlamada enerji harcanmaz
- Enerji sınırlı ve zamanla otomatik yenilenir
- Enerji doluysa artmaz, sıfırsa butonlar disable olur
- Kartlar seviyeye göre filtrelenebilir (tablar)
- Kart koleksiyonu/katalog ekranı (tüm kartlar ve seviyeleri)
- Modern ve görsel olarak zengin arayüz
- Sunucu tarafında rate limit ve input validation ile güvenlik
- Tüm ana API endpointleri için otomatik testler
- Veri kalıcılığı (sunucu restart sonrası veri kaybolmaz)

## Kullanılan Yapılar ve Teknolojiler

- **Next.js**: React tabanlı, SSR destekli modern web framework'ü
- **React**: Bileşen tabanlı kullanıcı arayüzü
- **TypeScript**: Tip güvenliği ve daha iyi geliştirme deneyimi için
- **Tailwind CSS**: Hızlı ve modern arayüz tasarımı için utility-first CSS framework'ü
- **Node.js (API routes)**: Sunucu tarafı iş mantığı ve veri yönetimi
- **Dosya tabanlı mock veri**: Kalıcı veri saklama için JSON dosyası
- **Jest benzeri test scripti (node-fetch)**: API endpointlerinin otomatik test edilmesi
- **Figma**: UI/UX tasarım referansı

## Klasör Yapısı

- `src/pages/` : Ana sayfa, API endpointleri ve koleksiyon sayfası
- `src/components/` : Kart, progress bar, enerji barı gibi UI bileşenleri
- `src/data/` : Kart ve koleksiyon verileri
- `src/lib/` : Mock veri yönetimi ve kalıcılık
- `src/utils/` : Yardımcı fonksiyonlar
- `scripts/` : Otomatik test scriptleri

## Nasıl Çalışır?

1. Kullanıcı ana ekranda kartlarını görür, "Geliştir" butonuna tıklar.
2. Her tıklamada progress artar, enerji harcanır. Progress %100 olunca kart seviye atlar.
3. Enerji zamanla otomatik olarak yenilenir.
4. Kullanıcı, üstteki "Koleksiyon" butonuyla tüm kartları ve seviyelerini görebilir.
5. Tüm API endpointleri otomatik olarak test edilebilir.

## Kurulum & Çalıştırma

1. Bağımlılıkları yükleyin: `npm install`
2. Geliştirme sunucusunu başlatın: `npm run dev`
3. Testleri çalıştırmak için: `node scripts/testApi.js`

## Notlar

- Proje demo ve case study amaçlıdır. Gerçek kullanıcı kimlik doğrulama ve production veri tabanı içermez.
- Tüm görseller ve kartlar Figma tasarımına uygun olarak örneklenmiştir.

--
