# 🔄 Refatoração Completa - Mapa de Lojas Mobile-First

**Data:** 2026-02-07  
**Arquivo:** `components/pages/lojas-page.tsx`  
**Status:** ✅ Reescrito do zero

---

## 🐛 Problemas Corrigidos

### 1. **Geolocalização Não Funcionava Corretamente**

#### ❌ Problema Anterior:
```tsx
// Sem opções de precisão
navigator.geolocation.getCurrentPosition(success, error)
```

#### ✅ Solução Implementada:
```tsx
navigator.geolocation.getCurrentPosition(
    success,
    error,
    {
        enableHighAccuracy: true,  // GPS preciso
        timeout: 10000,            // 10 segundos
        maximumAge: 0              // Sem cache
    }
)
```

**Resultado:** Localização precisa do dispositivo, sem usar cache antigo.

---

### 2. **Erros de Geolocalização Não Eram Tratados**

#### ❌ Problema Anterior:
```tsx
// Apenas console.error
(error) => {
    console.error('Location error:', error)
    setLocationStatus('error')
}
```

#### ✅ Solução Implementada:
```tsx
(error) => {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            setLocationError("Permissão negada. Ative nas configurações.")
            break
        case error.POSITION_UNAVAILABLE:
            setLocationError("Localização indisponível.")
            break
        case error.TIMEOUT:
            setLocationError("Tempo esgotado.")
            break
    }
}
```

**Resultado:** Usuário vê mensagem clara do que aconteceu + como resolver.

---

### 3. **Bottom Sheet Não Tinha Estados Intermediários**

#### ❌ Problema Anterior:
```tsx
// Apenas aberto/fechado
{showStoreDetail && <BottomSheet />}
```

#### ✅ Solução Implementada:
```tsx
// 3 estados: collapsed (120px), half (50%), full (90%)
const [bottomSheetHeight, setBottomSheetHeight] = useState<
    'collapsed' | 'half' | 'full'
>('collapsed')

animate={{
    y: bottomSheetHeight === 'collapsed' ? 'calc(100% - 120px)' :
       bottomSheetHeight === 'half' ? '50%' : '10%'
}}
```

**Resultado:** Bottom Sheet sempre visível, com 3 níveis de expansão.

---

### 4. **Ícones do Leaflet Não Carregavam**

#### ❌ Problema Anterior:
```tsx
// Tentava usar ícones sem configurar corretamente
const icon = L.default.icon({ ... })
```

#### ✅ Solução Implementada:
```tsx
// Fix do bug conhecido do Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/...',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/...',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/...',
})
```

**Resultado:** Markers aparecem corretamente no mapa.

---

### 5. **Responsividade Mobile Ruim**

#### ❌ Problema Anterior:
```tsx
// Layout desktop forçado em mobile
<div className="flex">
    <Sidebar />  {/* 400px fixo */}
    <Map />
</div>
```

#### ✅ Solução Implementada:
```tsx
// Mobile-first: Mapa em tela cheia + Bottom Sheet
<div className="h-screen flex flex-col">
    <Map />  {/* 100% da tela */}
    <BottomSheet />  {/* Sobre o mapa */}
</div>
```

**Resultado:** Mapa ocupa toda a tela em mobile, Bottom Sheet desliza sobre ele.

---

### 6. **Loja Mais Próxima Não Era Destacada**

#### ❌ Problema Anterior:
```tsx
// Apenas calculava distâncias, não mostrava qual era a mais próxima
```

#### ✅ Solução Implementada:
```tsx
// useMemo para calcular loja mais próxima
const nearestStore = useMemo(() => {
    let nearest = stores[0]
    let minDistance = distances[stores[0].id] || Infinity

    stores.forEach(store => {
        const distance = distances[store.id]
        if (distance && distance < minDistance) {
            minDistance = distance
            nearest = store
        }
    })

    return nearest
}, [distances])

// Badge verde destacando
{isNearest && (
    <span className="bg-green-50 text-green-600">
        Mais próxima
    </span>
)}
```

**Resultado:** Loja mais próxima tem badge verde + ícone de pin.

---

### 7. **Swipe Gestures Não Funcionavam Bem**

#### ❌ Problema Anterior:
```tsx
// Apenas drag sem lógica de velocidade
onDragEnd={(e, info) => {
    if (info.offset.y > 100) close()
}
```

#### ✅ Solução Implementada:
```tsx
onDragEnd={(e, info: PanInfo) => {
    const velocity = info.velocity.y
    const offset = info.offset.y

    // Considera velocidade E distância
    if (velocity > 500 || offset > 100) {
        // Swipe down rápido OU arraste longo
        if (bottomSheetHeight === 'full') setBottomSheetHeight('half')
        else if (bottomSheetHeight === 'half') setBottomSheetHeight('collapsed')
    }
}
```

**Resultado:** Swipe rápido fecha mesmo com pouco arraste. Swipe lento precisa arrastar mais.

---

## 🎯 Arquitetura Mobile-First

### Layout Hierárquico

```
┌─────────────────────────────────────────────┐
│ MAPA (100vh - Tela Cheia)                   │
│                                             │
│  ┌────┐  ← FAB (Localização)                │
│  │ 📍 │                                      │
│  └────┘                                      │
│                                             │
│     📍 Marker Loja 1                        │
│                                             │
│     📍 Marker Loja 2                        │
│                                             │
├─────────────────────────────────────────────┤
│ BOTTOM SHEET (3 Estados)                    │
│ ═══ ← Drag Handle                           │
│                                             │
│ [Estado Collapsed - 120px]                  │
│ Nossas Lojas                                │
│ 🔍 Buscar...                                │
│                                             │
│ [Estado Half - 50%]                         │
│ + Lista de lojas (scroll)                   │
│                                             │
│ [Estado Full - 90%]                         │
│ + Detalhes da loja selecionada              │
└─────────────────────────────────────────────┘
```

---

## 🧠 Princípios de UX Psychology Aplicados

### 1. **Fitts' Law - FAB no Canto**
```tsx
// Floating Action Button no canto superior direito
<div className="absolute top-4 right-4">
    <Button className="p-3 rounded-full">
        <Locate />
    </Button>
</div>
```

**Zona do Polegar:** Fácil de alcançar com o polegar direito.

---

### 2. **Peak-End Rule - Bottom Sheet Animado**
```tsx
// Animação spring suave
transition={{ type: "spring", damping: 30, stiffness: 300 }}
```

**Experiência Memorável:** Abertura suave do Bottom Sheet é o "peak" da interação.

---

### 3. **Von Restorff Effect - Loja Mais Próxima**
```tsx
// Badge verde + ícone de pin
{isNearest && (
    <>
        <MapPin className="text-green-600" />
        <span className="bg-green-50 text-green-600">Mais próxima</span>
    </>
)}
```

**Destaque Visual:** Impossível não perceber qual loja está mais perto.

---

### 4. **Natural Gestures - Swipe to Dismiss**
```tsx
// Swipe para cima/baixo muda estado
drag="y"
onDragEnd={(e, info) => {
    if (velocity > 500) {
        // Swipe rápido
    }
}}
```

**Gesto Intuitivo:** Usuário sabe instintivamente como expandir/recolher.

---

### 5. **Doherty Threshold - Feedback Instantâneo**
```tsx
// Estados visuais do botão de localização
{locationStatus === 'loading' ? <Loader2 /> :
 locationStatus === 'success' ? <Check /> :
 locationStatus === 'error' ? <AlertCircle /> :
 <Locate />}
```

**Feedback <400ms:** Usuário vê mudança visual imediatamente.

---

### 6. **Progressive Disclosure - 3 Estados**
```tsx
// Collapsed: Apenas título + busca
// Half: + Lista de lojas
// Full: + Detalhes completos da loja
```

**Informação Gradual:** Usuário não é sobrecarregado com tudo de uma vez.

---

## 📊 Estados do Bottom Sheet

| Estado | Altura | Conteúdo | Quando |
|--------|--------|----------|--------|
| **Collapsed** | 120px | Título + Busca | Inicial |
| **Half** | 50% | + Lista de lojas | Após buscar ou clicar em marker |
| **Full** | 90% | + Detalhes da loja | Após clicar em loja |

### Transições

```
Collapsed → Half:   Swipe up OU Clicar em marker
Half → Full:        Swipe up OU Clicar em loja
Full → Half:        Swipe down OU Botão "Voltar"
Half → Collapsed:   Swipe down
```

---

## 🗺️ Funcionalidades do Mapa

### Geolocalização Precisa

```tsx
{
    enableHighAccuracy: true,  // Usa GPS, não Wi-Fi
    timeout: 10000,            // 10 segundos máximo
    maximumAge: 0              // Sempre pega localização nova
}
```

**Precisão:** ±10 metros (GPS) vs ±100 metros (Wi-Fi).

---

### Zoom Automático

| Ação | Zoom | Duração |
|------|------|---------|
| **Detectar localização** | 13 | 1.5s |
| **Clicar em loja** | 16 | 1.5s |
| **Inicial** | 12 | - |

---

### Markers

- **Lojas:** Pin azul padrão do Leaflet
- **Usuário:** Pin azul padrão do Leaflet (com popup "Você está aqui")
- **Popup:** Clique no marker → Popup com botão "Ver detalhes"

---

## 🎨 Elementos Visuais

### Drag Handle
```tsx
<div className="w-12 h-1.5 bg-gray-300 rounded-full" />
```

**Visual:** Barra horizontal cinza no topo do Bottom Sheet.

---

### Badge "Mais Próxima"
```tsx
<span className="bg-green-50 text-green-600 px-2 py-0.5 rounded-full">
    Mais próxima
</span>
```

**Visual:** Pill verde claro com texto verde escuro.

---

### Error Toast
```tsx
<div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
    <AlertCircle className="text-red-600" />
    <p className="text-red-900">{locationError}</p>
</div>
```

**Visual:** Card vermelho no topo da tela com ícone de alerta.

---

## ✅ Checklist de Qualidade

### Funcionalidade
- [x] **Geolocalização precisa** - enableHighAccuracy: true
- [x] **Tratamento de erros** - Mensagens específicas por tipo de erro
- [x] **Loja mais próxima** - Calculada e destacada automaticamente
- [x] **Bottom Sheet 3 estados** - Collapsed, Half, Full
- [x] **Swipe gestures** - Considera velocidade e distância
- [x] **Zoom automático** - Voa para localização/loja
- [x] **Markers corretos** - Ícones do Leaflet carregam

### UX Psychology
- [x] **Fitts' Law** - FAB no canto (thumb zone)
- [x] **Peak-End Rule** - Animações suaves
- [x] **Von Restorff** - Loja mais próxima destacada
- [x] **Natural Gestures** - Swipe intuitivo
- [x] **Doherty Threshold** - Feedback <400ms
- [x] **Progressive Disclosure** - 3 níveis de informação

### Mobile-First
- [x] **Mapa tela cheia** - 100vh em mobile
- [x] **Bottom Sheet** - Padrão mobile nativo
- [x] **Touch targets** - Mínimo 44x44px
- [x] **Swipe friendly** - Drag handle visível
- [x] **Responsivo** - 320px a 1920px

---

## 🧪 Como Testar

### 1. Geolocalização
```
1. Abra no mobile ou DevTools (F12 + Ctrl+Shift+M)
2. Clique no FAB (botão de localização)
3. Permita acesso à localização
4. Observe:
   - Ícone muda para check verde
   - Mapa voa para sua localização (zoom 13)
   - Distâncias aparecem nos cards
   - Loja mais próxima tem badge verde
```

### 2. Bottom Sheet
```
1. Bottom Sheet inicia em "Collapsed" (120px)
2. Arraste para cima → Muda para "Half" (50%)
3. Clique em uma loja → Muda para "Full" (90%)
4. Arraste para baixo → Volta para "Half"
5. Arraste para baixo novamente → Volta para "Collapsed"
```

### 3. Swipe Rápido
```
1. Abra Bottom Sheet em "Full"
2. Dê um swipe rápido para baixo (flick)
3. Observe: Fecha mesmo com pouco arraste
```

### 4. Erro de Localização
```
1. Negue permissão de localização
2. Observe:
   - Ícone muda para alerta vermelho
   - Toast vermelho aparece no topo
   - Mensagem: "Permissão negada. Ative nas configurações."
3. Clique no X para fechar o toast
```

---

## 🚀 Melhorias vs. Versão Anterior

| Aspecto | Antes | Agora |
|---------|-------|-------|
| **Geolocalização** | ❌ Imprecisa | ✅ GPS preciso |
| **Erros** | ❌ Sem mensagem | ✅ Toast com explicação |
| **Layout Mobile** | ❌ Sidebar + Mapa | ✅ Mapa + Bottom Sheet |
| **Bottom Sheet** | ❌ 2 estados | ✅ 3 estados |
| **Loja Mais Próxima** | ❌ Não destacava | ✅ Badge verde |
| **Swipe** | ❌ Só distância | ✅ Velocidade + distância |
| **Ícones Leaflet** | ❌ Não carregavam | ✅ Carregam corretamente |
| **Responsividade** | ❌ Ruim em mobile | ✅ Mobile-first |

---

**Página completamente reescrita do zero com foco mobile-first e correção de todos os bugs!** 🎉📱

