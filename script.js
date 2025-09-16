// Elementos principales
const tabs = document.querySelectorAll('.tab');
const contents = document.querySelectorAll('.tab-content');
const templateSelect = document.getElementById('templateSelect');
const previewBtn = document.getElementById('previewBtn');
const previewBox = document.getElementById('previewBox');
const previewContent = document.getElementById('previewContent');
const sendForm = document.getElementById('sendForm');
const templateForm = document.getElementById('templateForm');
const templateList = document.getElementById('templateList');

let templates = [];

// Cambiar pestañas
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t=>t.classList.remove('active'));
    contents.forEach(c=>c.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(tab.dataset.tab).classList.add('active');
  });
});

// Actualizar select con plantillas
function updateTemplateOptions() {
  templateSelect.innerHTML = '<option value="">-- Selecciona --</option>';
  templates.forEach((tpl, i) => {
    templateSelect.innerHTML += `<option value="${i}">${tpl.name}</option>`;
  });
}

// Renderizar lista de plantillas
function renderTemplateList() {
  templateList.innerHTML = '';
  templates.forEach((tpl, i) => {
    templateList.innerHTML += `
      <li>
        <span>${tpl.name}</span>
        <div>
          <button onclick="editTemplate(${i})">✎</button>
          <button onclick="deleteTemplate(${i})">🗑️</button>
        </div>
      </li>`;
  });
}

// Guardar nueva plantilla
templateForm.addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('tplName').value.trim();
  const text = document.getElementById('tplText').value.trim();
  if (name && text) {
    templates.push({ name, text });
    updateTemplateOptions();
    renderTemplateList();
    templateForm.reset();
  }
});

// Eliminar plantilla
function deleteTemplate(index) {
  templates.splice(index, 1);
  updateTemplateOptions();
  renderTemplateList();
}

// Editar plantilla
function editTemplate(index) {
  const tpl = templates[index];
  document.getElementById('tplName').value = tpl.name;
  document.getElementById('tplText').value = tpl.text;
  deleteTemplate(index);
}

// Previsualizar mensaje
previewBtn.addEventListener('click', () => {
  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const idx = templateSelect.value;
  const offer = document.getElementById('offer').value;
  const extra = document.getElementById('extraMsg').value;
  if (idx !== '') {
    let tpl = templates[idx].text;
    let message = `Hola ${name}, ${tpl}`;
    if (offer) message += `\nOferta: ${offer}`;
    if (extra) message += `\n${extra}`;
    previewContent.textContent = message;
    previewBox.classList.remove('hidden');
  }
});

// Envío de formulario (ejemplo de acción)
sendForm.addEventListener('submit', e => {
  e.preventDefault();
  // Lógica de integración con API de WhatsApp aquí
  alert('Mensaje enviado correctamente');
  sendForm.reset();
  previewBox.classList.add('hidden');
});
