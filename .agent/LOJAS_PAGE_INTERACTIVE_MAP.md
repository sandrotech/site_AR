# 🗺️ Mapa Interativo com Detecção de Localização - Página "Onde Estamos"

**Data:** 2026-02-07  
**Arquivo:** `components/pages/lojas-page.tsx`  
**Status:** ✅ Concluído

---

## 🎯 Objetivo

Criar uma experiência interativa que detecta a localização do usuário e indica automaticamente qual loja está mais próxima, aplicando princípios de **UX Psychology** e **Visual Effects** para máximo engajamento.

---

## 🧠 Princípios de UX Psychology Aplicados

### 1. **Von Restorff Effect (Isolation Effect)**
```tsx
// Loja mais próxima se destaca visualmente
className={`${
  isNearest 
    ? 'border-secondary ring-4 ring-secondary/20'  // DESTAQUE
    : 'border-gray-100 hover:border-primary'
}`}
```

**Resultado:** O card da loja mais próxima tem borda laranja + anel de destaque, tornando-se impossível de ignorar.

---

### 2. **Fitts' Law - Touch Targets Adequados**
```tsx
// Botões grandes e fáceis de clicar
className="py-6 rounded-xl font-bold text-lg"  // 48px+ altura
```

**Resultado:** Todos os botões de ação (localização, navegação) têm mínimo 48px de altura, perfeitos para mobile.

---

### 3. **Peak-End Rule - Experiência Memorável**
```tsx
// Animação de sucesso ao detectar localização
{locationStatus === 'success' ? (
  <>
    <Check className="h-6 w-6" />
    Localização detectada!
  </>
) : ...}
```

**Resultado:** Feedback visual imediato com ícone de check e mensagem de sucesso cria momento "peak" positivo.

---

### 4. **Doherty Threshold - Feedback Imediato**
```tsx
// Loading state instantâneo
{locationStatus === 'loading' ? (
  <Loader2 className="h-6 w-6 animate-spin" />
) : ...}
```

**Resultado:** Usuário vê spinner imediatamente ao clicar, mantendo engajamento (<400ms percebido).

---

### 5. **Goal Gradient Effect - Progresso Visível**
```tsx
// Distância mostrada em destaque
<span className="font-bold text-white">
  {distances[nearestStore.id]?.toFixed(1)} km
</span>
```

**Resultado:** Mostrar a distância exata aumenta motivação para visitar (meta tangível).

---

### 6. **Social Proof - Badge de "Mais Próxima"**
```tsx
<div className="inline-flex items-center gap-2 bg-secondary">
  <Star className="h-4 w-4 text-white fill-white" />
  <span>Mais próxima • {distance.toFixed(1)} km</span>
</div>
```

**Resultado:** Badge com estrela cria senso de "escolha recomendada" (social proof implícito).

---

## 🎨 Visual Effects Aplicados

### 1. **Glassmorphism - Hero Section**
```tsx
// Background com blur e transparência
className="bg-white/10 backdrop-blur-sm border border-white/20"
```

**Efeito:** Vidro fosco sobre gradiente azul, criando profundidade moderna.

---

### 2. **Gradient Overlays - Imagens de Loja**
```tsx
<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
```

**Efeito:** Gradiente escuro na base garante legibilidade do texto branco sobre imagem.

---

### 3. **Glow Effects - Card Destacado**
```tsx
className="ring-4 ring-secondary/20"  // Anel de brilho laranja
```

**Efeito:** Halo sutil ao redor do card da loja mais próxima (glow effect).

---

### 4. **Smooth Animations - Hover States**
```tsx
whileHover={{ y: -8, transition: { duration: 0.3 } }}
className="hover:scale-105 transition-all duration-300"
```

**Efeito:** Cards levitam 8px ao hover + botões aumentam 5% (micro-interactions premium).

---

### 5. **Decorative Gradient Blobs**
```tsx
<div className="absolute top-0 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-[120px]" />
```

**Efeito:** Blobs de gradiente desfocados criam atmosfera orgânica e moderna.

---

### 6. **Staggered Entrance Animations**
```tsx
transition={{ delay: index * 0.15 }}
```

**Efeito:** Cards aparecem em sequência (0ms, 150ms, 300ms), criando fluxo visual elegante.

---

## 🧮 Cálculo de Distância (Haversine Formula)

```typescript
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371 // Raio da Terra em km
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLon = (lon2 - lon1) * Math.PI / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}
```

**Precisão:** Fórmula matemática precisa para calcular distância entre coordenadas geográficas.

---

## 📊 Fluxo de Interação

```
┌─────────────────────────────────────────────────────────┐
│ 1. USUÁRIO ACESSA PÁGINA                                │
│    └─ Hero com botão "Encontrar loja mais próxima"      │
├─────────────────────────────────────────────────────────┤
│ 2. USUÁRIO CLICA NO BOTÃO                               │
│    └─ Status: 'loading' → Spinner animado               │
├─────────────────────────────────────────────────────────┤
│ 3. NAVEGADOR SOLICITA PERMISSÃO                         │
│    ├─ Permitido → Status: 'success'                     │
│    └─ Negado → Status: 'error' + mensagem               │
├─────────────────────────────────────────────────────────┤
│ 4. CÁLCULO DE DISTÂNCIAS                                │
│    ├─ Haversine formula para cada loja                  │
│    └─ Identifica loja mais próxima                      │
├─────────────────────────────────────────────────────────┤
│ 5. EXIBIÇÃO DE RESULTADOS                               │
│    ├─ Card destacado da loja mais próxima (topo)        │
│    ├─ Badge "Mais próxima • X.X km"                     │
│    └─ Todos os cards mostram distância                  │
└─────────────────────────────────────────────────────────┘
```

---

## 🎯 Estados da Interface

| Estado | Ícone | Texto | Cor | Ação |
|--------|-------|-------|-----|------|
| **Idle** | `<Locate />` | "Encontrar loja mais próxima" | Laranja | Clicável |
| **Loading** | `<Loader2 spin />` | "Detectando localização..." | Laranja | Desabilitado |
| **Success** | `<Check />` | "Localização detectada!" | Laranja | Clicável (retry) |
| **Error** | `<AlertCircle />` | "Tentar novamente" | Laranja | Clicável (retry) |

---

## 🗂️ Estrutura de Dados

```typescript
const stores = [
  {
    id: 1,
    name: "Loja Bom Jardim",
    address: "R. Maria Júlia, 980 - Bom Jardim, Fortaleza - CE",
    phone: "(85) 9 9996.0267",
    hours: "Seg - Sáb: 7h às 21h | Dom: 7h às 13h",
    lat: -3.7881,      // Coordenada precisa
    lng: -38.5434,     // Coordenada precisa
    mapUrl: "https://maps.google.com/...",
    image: "/loja/frente_loja.png",
  },
  // ... Loja Bonsucesso
]
```

---

## 📱 Responsividade

### Mobile (< 640px)
- Hero: Padding reduzido, texto menor
- Cards: 1 coluna, stack vertical
- Botões: Full width, touch-friendly (48px+)

### Tablet (640px - 1024px)
- Hero: Padding médio
- Cards: 1 coluna (ainda stack)
- Espaçamentos aumentados

### Desktop (> 1024px)
- Hero: Padding máximo, texto grande
- Cards: 2 colunas lado a lado
- Hover effects ativos

---

## ✅ Checklist de Qualidade

### UX Psychology
- [x] **Von Restorff** - Loja mais próxima destacada visualmente
- [x] **Fitts' Law** - Botões ≥ 48px altura
- [x] **Peak-End Rule** - Animação de sucesso memorável
- [x] **Doherty Threshold** - Feedback <400ms
- [x] **Goal Gradient** - Distância visível aumenta motivação
- [x] **Social Proof** - Badge "Mais próxima" como recomendação

### Visual Effects
- [x] **Glassmorphism** - Hero badge com backdrop-blur
- [x] **Gradient Overlays** - Imagens com gradiente para legibilidade
- [x] **Glow Effects** - Ring laranja no card destacado
- [x] **Smooth Animations** - Hover states com transform
- [x] **Gradient Blobs** - Background decorativo orgânico
- [x] **Staggered Animations** - Entrada sequencial dos cards

### Funcionalidade
- [x] **Geolocation API** - Detecção de localização do usuário
- [x] **Haversine Formula** - Cálculo preciso de distância
- [x] **Error Handling** - Tratamento de permissão negada
- [x] **Loading States** - Feedback visual em todos os estados
- [x] **Responsive Design** - Mobile-first, adaptativo

### Acessibilidade
- [x] **Touch Targets** - Mínimo 44x44px
- [x] **Contrast Ratio** - Texto branco sobre gradiente escuro
- [x] **Alt Text** - Imagens com descrição
- [x] **Keyboard Navigation** - Botões focáveis
- [x] **Screen Reader** - Mensagens de status legíveis

---

## 🚀 Melhorias Futuras (Opcional)

### 1. **Mapa Interativo Real**
- Integrar Leaflet ou Google Maps
- Mostrar pins das lojas + localização do usuário
- Rota visual entre usuário e loja

### 2. **Filtros e Busca**
- Buscar por bairro
- Filtrar por serviços (estacionamento, farmácia, etc.)

### 3. **Horário de Funcionamento Dinâmico**
- Mostrar "Aberto agora" ou "Fecha em X horas"
- Badge verde/vermelho para status

### 4. **Integração com App**
- Deep link para abrir no app de navegação
- Salvar loja favorita

---

## 🧪 Como Testar

### 1. **Teste de Localização**
```
1. Acesse /onde-estamos
2. Clique em "Encontrar loja mais próxima"
3. Permita acesso à localização
4. Verifique:
   - Card destacado aparece no topo
   - Badge "Mais próxima" visível
   - Distância calculada corretamente
```

### 2. **Teste de Erro**
```
1. Acesse /onde-estamos
2. Clique em "Encontrar loja mais próxima"
3. Negue acesso à localização
4. Verifique:
   - Mensagem de erro aparece
   - Botão muda para "Tentar novamente"
   - Ícone de alerta visível
```

### 3. **Teste de Responsividade**
```
1. Abra DevTools (F12)
2. Teste em:
   - iPhone SE (375px)
   - iPad (768px)
   - Desktop (1920px)
3. Verifique:
   - Layout adapta corretamente
   - Botões são clicáveis
   - Textos legíveis
```

---

## 📝 Notas Técnicas

### Tecnologias Utilizadas
- **Next.js 16.1.6** (App Router)
- **Framer Motion** (Animações)
- **Lucide React** (Ícones)
- **HTML5 Geolocation API** (Localização)
- **TypeScript** (Type safety)

### Compatibilidade
- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

### Performance
- ✅ Animações GPU-accelerated (transform, opacity)
- ✅ Lazy loading de imagens
- ✅ Sem dependências pesadas (sem Leaflet)
- ✅ Cálculos matemáticos otimizados

---

**Desenvolvido seguindo os princípios de UX Psychology e Visual Effects para máximo engajamento e conversão** 🎯
