# Background Images

Bu klasör QuizBot uygulaması için arka plan resimlerini içerir.

## Mevcut Görseller

- `1.jpg` - Background 1 (🖼️ Background 1)
- `2.jpg` - Background 2 (🖼️ Background 2)  
- `3.jpg` - Background 3 (🖼️ Background 3)
- `4.jpg` - Background 4 (🖼️ Background 4)
- `5.jpg` - Background 5 (🖼️ Background 5)

## Kullanım

Resimler `apps/web/src/store/background.ts` dosyasında tanımlanır:

```typescript
{
  type: 'image',
  value: '/backgrounds/1.jpg',
  name: '🖼️ Background 1'
}
```

## Önerilen Formatlar

- **Boyut**: 1920x1080 (Full HD)
- **Format**: JPG, PNG, WebP
- **Dosya Boyutu**: < 2MB (hızlı yükleme için)
- **Kalite**: Yüksek kalite ama optimize edilmiş

## Örnek Dosya İsimleri

- `space-galaxy.jpg`
- `neon-city.jpg`
- `matrix-code.jpg`
- `cosmic-nebula.jpg`
- `cyber-grid.jpg`
- `digital-waves.jpg`
- `abstract-particles.jpg`
- `futuristic-landscape.jpg`

## Notlar

- Resimlerin üzerine otomatik olarak `rgba(0,0,0,0.4)` overlay eklenir (okunabilirlik için)
- Tüm resimler `background-size: cover` ile kullanılır
- `background-position: center` ile ortalanır
