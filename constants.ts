import { Product } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'SNR 6000 ZZ',
    reference: '6000-ZZ',
    category: 'Rodamientos',
    price: 0.90,
    originalPrice: 7.05,
    stock: 0,
    description: 'Rodamiento rígido de bolas de una hilera, con obturación metálica en ambos lados.',
    specs: {
      'Diámetro interior': '10 mm',
      'Diámetro exterior': '26 mm',
      'Ancho': '8 mm',
      'Marca': 'SNR',
      'Juego radial': 'CN (Normal)'
    },
    imageUrl: 'https://picsum.photos/200/200?random=1',
    badge: '-87%'
  },
  {
    id: '2',
    name: 'SNR 6000 EE C3',
    reference: '6000-EE-C3',
    category: 'Rodamientos',
    price: 1.02,
    originalPrice: 8.00,
    stock: 352,
    description: 'Rodamiento rígido de bolas, juego C3 mayor que el normal, sellos de goma (estanqueidad reforzada).',
    specs: {
      'Diámetro interior': '10 mm',
      'Diámetro exterior': '26 mm',
      'Ancho': '8 mm',
      'Marca': 'SNR',
      'Juego radial': 'C3',
      'Sello': 'EE (Goma ambos lados)'
    },
    imageUrl: 'https://picsum.photos/200/200?random=2',
    badge: '-87%'
  },
  {
    id: '3',
    name: 'SNR 6204 2RS C3',
    reference: '6204-2RS-C3',
    category: 'Rodamientos',
    price: 2.15,
    originalPrice: 12.50,
    stock: 120,
    description: 'Rodamiento popular para maquinaria agrícola y motores eléctricos. Alta protección contra polvo.',
    specs: {
      'Diámetro interior': '20 mm',
      'Diámetro exterior': '47 mm',
      'Ancho': '14 mm',
      'Marca': 'SNR',
      'Juego radial': 'C3',
      'Sello': '2RS (Goma ambos lados)'
    },
    imageUrl: 'https://picsum.photos/200/200?random=3',
    badge: '-82%'
  },
  {
    id: '4',
    name: 'Soporte UCP 205',
    reference: 'UCP-205',
    category: 'Soportes',
    price: 5.40,
    originalPrice: 15.00,
    stock: 50,
    description: 'Soporte de pie con rodamiento inserto. Ideal para cintas transportadoras.',
    specs: {
      'Eje': '25 mm',
      'Tipo': 'Pedestal (Pillow Block)',
      'Material': 'Fundición',
      'Marca': 'Genérica'
    },
    imageUrl: 'https://picsum.photos/200/200?random=4',
    badge: '-64%'
  },
  {
    id: '5',
    name: 'Retén 35x52x7 WAS',
    reference: '35-52-7-WAS',
    category: 'Retenes',
    price: 1.50,
    originalPrice: 4.20,
    stock: 1000,
    description: 'Retén de aceite estándar con labio guardapolvo.',
    specs: {
      'Eje': '35 mm',
      'Alojamiento': '52 mm',
      'Ancho': '7 mm',
      'Material': 'NBR'
    },
    imageUrl: 'https://picsum.photos/200/200?random=5',
    badge: '-64%'
  },
  {
    id: '6',
    name: 'Correa SPA 1500',
    reference: 'SPA-1500',
    category: 'Correas',
    price: 8.20,
    originalPrice: 18.00,
    stock: 45,
    description: 'Correa trapezoidal estrecha de alto rendimiento.',
    specs: {
      'Perfil': 'SPA',
      'Longitud Primitiva': '1500 mm',
      'Material': 'Caucho con cuerdas de poliéster'
    },
    imageUrl: 'https://picsum.photos/200/200?random=6',
    badge: '-54%'
  },
  {
    id: '7',
    name: 'SNR 6002',
    reference: '6002',
    category: 'Rodamientos',
    price: 0.82,
    originalPrice: 7.24,
    stock: 15,
    description: 'Rodamiento abierto sin sellos.',
    specs: {
      'Diámetro interior': '15 mm',
      'Diámetro exterior': '32 mm',
      'Ancho': '9 mm',
      'Marca': 'SNR',
      'Juego radial': 'CN'
    },
    imageUrl: 'https://picsum.photos/200/200?random=7',
    badge: '-87%'
  },
  {
    id: '8',
    name: 'Cadena 08B-1',
    reference: '08B-1-BOX',
    category: 'Cadenas',
    price: 12.00,
    originalPrice: 25.00,
    stock: 200,
    description: 'Cadena de rodillos simple norma europea (Caja 5 metros).',
    specs: {
      'Paso': '12.7 mm (1/2")',
      'Norma': 'DIN 8187 / ISO 606',
      'Filas': '1'
    },
    imageUrl: 'https://picsum.photos/200/200?random=8',
    badge: '-52%'
  }
];

export const SYSTEM_INSTRUCTION = `
# Instrucciones para la Identificación y Documentación de Productos Industriales - Asistente Flownexion

## 1. Objetivo General
Eres el Asistente Técnico Oficial de Flownexion. Tu prioridad es ofrecer información técnica precisa y visualmente atractiva sobre productos de transmisión de potencia, y guiar al cliente a través de un proceso de compra profesional.

## 2. Base de Datos Interna
Utiliza EXCLUSIVAMENTE esta lista JSON para stock, precios y referencias:
${JSON.stringify(MOCK_PRODUCTS, null, 2)}

## 3. Protocolo de Compra (ESTRICTO)
Debes seguir este flujo de estados linealmente. NO te saltes pasos.

### FASE 1: Identificación
ANTES de dar precios finales o formalizar nada, debes obtener:
1. **Nombre del Cliente**
2. **Cargo/Empresa**
*Si el usuario pide comprar o presupuesto, solicita estos datos amablemente antes de proceder.*

### FASE 2: Cotización (Tabla Detallada)
Una vez identificado el cliente, genera una tabla de cotización con:
- Producto
- Referencia
- Cantidad
- Precio Unitario
- **TOTAL** (Calcula Precio x Cantidad con precisión matemática).

### FASE 3: Confirmación
Muestra el Gran Total y pregunta explícitamente:
*"¿Desea proceder con el pedido? Responda SÍ para confirmar."*

### FASE 4: Ejecución
Si el usuario confirma (SÍ), genera un **ID de Pedido** ficticio (ej. #ORD-2024-XXXX) y dale las gracias formalmente.
Si dice NO, pregunta qué desea modificar.

## 4. Formato de Respuesta Obligatorio

### A. Tablas de Producto
Cuando des información técnica, usa SIEMPRE una tabla Markdown:
| Especificación | Descripción |
|----------------|-------------|
| **Nombre** | SNR 6204 2RS C3 |
| **Referencia** | 6204-2RS-C3 |
| **Dimensiones** | Diámetro interior: **20 mm**<br>Diámetro exterior: **47 mm**<br>Ancho: **14 mm** |
| **Precio** | **2.15 €** |
| **Descuento** | -82% |

### B. Reglas de Estilo
- Usa **negritas** para resaltar cifras clave.
- Usa <br> para saltos de línea en celdas.
- Tono: Profesional, técnico, directo.
- "Badge" = "**Descuento**".
`;