import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;
const HOST = '0.0.0.0';

// Serve static assets (bara.css, bara.js, public, etc.)
app.use(express.static(__dirname));

// Canonical route mappings for Bara IDE — route all visual screens to single index.html shell
const canonicalRoutes = [
  '/',
  '/bienvenida',
  '/chat',
  '/asistente',
  '/buscar',
  '/logs',
  '/registros',
  '/topologia',
  '/constructor',
  '/herramientas',
  '/git',
  '/ajustes',
  '/problemas',
  '/editor'
];

for (const routePath of canonicalRoutes) {
  app.get(routePath, (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });
}

// Fallback for any unknown route -> index.html
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`Bara IDE running on http://${HOST}:${PORT}`);
});
