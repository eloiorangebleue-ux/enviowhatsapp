const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const GITHUB_TOKEN = 'TU_TOKEN_PERSONAL'; // Usa variables de entorno en producción
const OWNER = 'TU_USUARIO';
const REPO = 'TU_REPOSITORIO';
const FILE_PATH = 'plantillas.json'; // ruta en el repo donde guardas los datos
const BRANCH = 'main';

// Obtener SHA del archivo para update commit
async function getFileSha() {
  try {
    const res = await axios.get(`https://api.github.com/repos/${OWNER}/${REPO}/contents/${FILE_PATH}?ref=${BRANCH}`, {
      headers: { Authorization: `token ${GITHUB_TOKEN}` }
    });
    return res.data.sha;
  } catch (e) {
    if (e.response && e.response.status === 404) {
      return null; // Nuevo archivo
    }
    throw e;
  }
}

app.post('/save-plantillas', async (req, res) => {
  const plantillas = req.body.plantillas;
  if (!plantillas) return res.status(400).send('No hay plantillas');

  try {
    const content = Buffer.from(JSON.stringify(plantillas, null, 2)).toString('base64');
    const sha = await getFileSha();

    // Commit message
    const message = 'Actualizar plantillas desde app';

    const data = {
      message,
      content,
      branch: BRANCH,
      committer: {
        name: 'App Bot',
        email: 'app-bot@example.com'
      }
    };

    if (sha) data.sha = sha;

    const url = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${FILE_PATH}`;
    const response = await axios.put(url, data, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    res.json({ success: true, commit: response.data.commit.sha });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).send('Error guardando en GitHub');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
