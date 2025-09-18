# Proyecto Frontend - Insalud

Este es un proyecto de **Next.js** desarrollado con **TypeScript**, utilizando **WebStorm** como entorno de desarrollo. El frontend consume el backend para la gestión de la información médica.

## Tecnologías utilizadas

- **Next.js**: Framework para aplicaciones React con renderizado en el lado del servidor.
- **TypeScript**: Superset de JavaScript que añade tipado estático.
- **TailwindCSS**: Framework de CSS para diseño responsivo.
- **JWT (JSON Web Token)**: Para la autenticación con el backend.
- **WebStorm**: IDE utilizado para el desarrollo.

## Iniciar el proyecto

Para comenzar con el desarrollo, sigue estos pasos:

### 1. Clonar el repositorio

Clona el repositorio o descarga el archivo `.zip` del proyecto:

```bash
git clone https://github.com/tu_usuario/frontend.git
```

2. Instalar dependencias

Asegúrate de tener Node.js instalado y ejecuta el siguiente comando para instalar las dependencias necesarias:


```
npm install
# o si usas Yarn:
yarn install
# o si usas pnpm:
pnpm install
# o si usas Bun:
bun install
```
3. Ejecutar el servidor de desarrollo

Para iniciar el servidor de desarrollo, ejecuta el siguiente comando:

```
npm run dev
# o si usas Yarn:
yarn dev
# o si usas pnpm:
pnpm dev
# o si usas Bun:
bun dev
```

El servidor se ejecutará en http://localhost:3000
. Abre esta URL en tu navegador para ver el resultado.

4. Edición de la página

Puedes comenzar a editar la página modificando el archivo app/page.tsx. La página se actualizará automáticamente a medida que edites el archivo.

### Dependencias

Este proyecto utiliza las siguientes dependencias:


```
Dependencias:
{
  "jwt-decode": "^4.0.0",
  "next": "15.5.3",
  "react": "19.1.0",
  "react-dom": "19.1.0"
}

Dependencias de desarrollo:
{
  "@eslint/eslintrc": "^3",
  "@tailwindcss/postcss": "^4",
  "@types/node": "^20",
  "@types/react": "^19",
  "@types/react-dom": "^19",
  "eslint": "^9",
  "eslint-config-next": "15.5.3",
  "tailwindcss": "^4",
  "typescript": "^5"
}
```

# VIDEO DE EJECUCION

En el siguiente enlace se puede ver una demo ejecutada por mí para que se pude validar el uso del proyecto y se tenga de referencia al momento de clonarlo y correrlo.

https://youtu.be/VNSyaN5dVPs