
#  GOPortal Backend API Dokümantasyonu

> Base URL: `http://localhost:3000/api`

Bu döküman, frontend geliştiricilerin GoPortal backend API'sini doğru ve etkili şekilde kullanmasını sağlamak amacıyla hazırlanmıştır.

---

##  POST `/games` — Yeni Oyun Oluştur

Yeni bir Go oyunu başlatmak için kullanılır.

###  İstek (Request Body)
```json
{
  "size": 19
}
```
> `size` isteğe bağlıdır. Değerler: `9`, `13`, `19` (varsayılan: 19)

###  Yanıt (Response)
```json
{
  "gameId": "uuid-1234",
  "gameState": { ... }
}
```

---

##  GET `/games/:gameId` — Oyun Durumunu Getir

Belirli bir oyunun anlık durumunu verir.

###  Parametre
- `gameId`: Oluşturulan oyunun ID'si

###  Yanıt
```json
{
  "id": "uuid-1234",
  "board": [[0, 0, ...]],
  "currentPlayer": 1,
  ...
}
```

---

##  POST `/games/:gameId/moves` — Hamle Yap

Oyuncu tarafından bir pozisyona taş koymak için kullanılır.

###  İstek
```json
{
  "x": 3,
  "y": 4
}
```

###  Başarılı Yanıt
```json
{
  "success": true,
  "captured": 1,
  "gameState": { ... }
}
```

###  Hatalı Yanıt
```json
{
  "error": "Suicide move not allowed"
}
```

---

##  POST `/games/:gameId/pass` — Pas Geç

Oyuncu sırasını pas geçmek isterse bu endpoint çağrılır.

###  Yanıt
```json
{
  "success": true,
  "gameEnded": false,
  "gameState": { ... }
}
```

---

##  POST `/games/:gameId/end` — Oyunu Sonlandır

Test veya zorla bitirme amacıyla oyunu bitirir.

###  Yanıt
```json
{
  "gameEnded": true,
  "finalScore": {
    "black": { "stones": 43, "territory": 21, "total": 64 },
    "white": { "stones": 38, "territory": 25, "total": 63 },
    "winner": "black"
  }
}
```

---

##  GET `/games/:gameId/history` — Hamle Geçmişi

Oyun süresince yapılan tüm hamleleri getirir.

###  Yanıt
```json
{
  "moves": [
    { "player": 1, "x": 3, "y": 4 },
    { "player": 2, "pass": true }
  ],
  "totalMoves": 2
}
```

---

##  GET `/games` — Oyunları Listele

Tüm aktif ve geçmiş oyunların özet bilgilerini getirir.

###  Yanıt
```json
{
  "games": [
    {
      "id": "uuid-1234",
      "size": 19,
      "currentPlayer": 1,
      "moveCount": 4,
      "gameEnded": false
    }
  ]
}
```

---

##  GET `/health` — Sunucu Durumu

API'nin çalışıp çalışmadığını kontrol etmek için.

###  Yanıt
```json
{
  "status": "OK",
  "timestamp": "2025-06-28T14:12:34.567Z"
}
```

---

##  Hatalar

API'den hata alındığında dönen yapı şudur:

```json
{
  "error": "Game not found"
}
```

---

##  Geliştirici Akışı Önerisi

1. `/games` ile oyun oluştur
2. `/games/:id` ile durumu kontrol et
3. `/games/:id/moves` ile hamle yap
4. `/games/:id/pass` ile pas geç
5. `/games/:id/history` ile geçmişi görüntüle
6. `/games/:id/end` ile oyunu bitir ve skoru al

---
