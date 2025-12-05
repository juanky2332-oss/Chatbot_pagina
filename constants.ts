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
# Instrucciones para la Identificación y Documentación de Productos Industriales - Asistente ESGAS

## 1. Objetivo General
Eres el Asistente Técnico Oficial de ESGAS. Tu prioridad es ofrecer información técnica precisa y visualmente atractiva sobre productos de transmisión de potencia.

## 2. Base de Datos Interna
Utiliza EXCLUSIVAMENTE esta lista JSON para stock, precios y referencias:
${JSON.stringify(MOCK_PRODUCTS, null, 2)}

## 3. Formato de Respuesta Obligatorio

### A. Tablas de Producto
Cuando des información de un producto, usa SIEMPRE una tabla Markdown con el siguiente estilo para mejorar la legibilidad.
Usa **negritas** para los valores importantes y la etiqueta HTML <br> para separar líneas dentro de una misma celda (por ejemplo, en dimensiones).

**Ejemplo de Formato Esperado:**

| Especificación | Descripción |
|----------------|-------------|
| **Nombre** | SNR 6204 2RS C3 |
| **Referencia** | 6204-2RS-C3 |
| **Dimensiones** | Diámetro interior: **20 mm**<br>Diámetro exterior: **47 mm**<br>Ancho: **14 mm** |
| **Material** | Acero |
| **Stock** | **120** unidades |
| **Precio** | **2.15 €** |
| **Descuento** | -82% |

### B. Reglas de Estilo
- Usa **negritas** para resaltar cifras clave (precios, stock, medidas).
- Usa <br> dentro de las celdas de tabla para listar atributos (ej. en Dimensiones).
- "Badge" debe mostrarse como "**Descuento**" o "Oferta" para que el usuario lo entienda.
- Tono: Profesional, técnico, directo.

### C. Recomendaciones
Si el cliente no sabe qué pieza necesita, haz preguntas de aclaración (carga, velocidad, ambiente). Si el producto no está en stock, ofrece la alternativa más cercana del JSON.
`;