# IMPORTANTE 
instalar typeScript-- npm install -g typescript


# Paso 1
Creamos el package.json con -- npm init-y
# Paso 2 
Instalamos typeScript -- npm install typescript -D
# Paso 3
en el package.json en scripts colocamos para transformar los ficheros de typeScript a js "tsc": "tsc"
# Paso 4
Inicializamos el proyecto con npm run tsc -- --init ó      tsc --init
Para crear el tsconfig.json
# Paso 5 configurar el typscript
En el tsconfig.js buscamos el outDir lo descomentamos y lo dejamos asi:  "outDir": "./build",   descomentamos "noUnusedLocals": true,     "noImplicitReturns": true,          "noUnusedParameters": true, "resolveJsonModule": true,  en la configuracion para leer json
# Paso 6 instalar version exacta de express
npm install express -E 

# Paso 7 debemos instalar los tipos de express
npm install @types/express -D Arregla los errores que salen en express typescript

# Paso 8 instalamos la dependencia para no estar reiniciando el servidor
npm install ts-node-dev -D  ponemos en el package.json el script "dev":"ts-node-dev src/index.ts", copila y scucha los cambios para volver a copilar