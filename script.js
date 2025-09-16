// Elementos principales
let tabs, contents, templateSelect, previewBtn, previewBox, previewContent, sendForm, templateForm, templateList;

// Plantillas por defecto
let templates = [
  { name: 'ENJOY', text: 'ENJOY' },
  { name: 'ENJOY ESTUDIANTE', text: 'ENJOY ESTUDIANTE' },
  { name: 'FREE', text: 'FREE' },
  { name: 'FREE ESTUDIANTE', text: 'FREE ESTUDIANTE' },
  { name: 'FLEX', text: 'FLEX' },
  { name: 'FLEX ESTUDIANTE', text: 'FLEX ESTUDIANTE' },
  { name: 'BAJA', text: 'BAJA' },
  { name: '2 SEMANAS', text: '2 SEMANAS' },
  { name: 'MUSCULACIÓN', text: 'MUSCULACIÓN' },
  { name: 'CLASES DIRIGIDAS', text: 'CLASES DIRIGIDAS' },
  { name: 'SIN ASISTENCIA', text: 'SIN ASISTENCIA' },
  { name: 'INFORMACION', text: 'INFORMACION' },
  { name: 'ENTRENAMIENTO DE PRUEBA', text: 'ENTRENAMIENTO DE PRUEBA' },
  { name: 'PREINSCRIPCIÓN', text: 'PREINSCRIPCIÓN' },
  { name: 'DEUDA', text: 'DEUDA' },
  { name: 'FORMULARIO NUTRICIÓN', text: 'FORMULARIO NUTRICIÓN' }
];

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
  // Obtener elementos del DOM
  tabs = document.querySelectorAll('.tab');
  contents = document.querySelectorAll('.tab-content');
  templateSelect = document.getElementById('templateSelect');
  previewBtn = document.getElementById('previewBtn');
  previewBox = document.getElementById('previewBox');
  previewContent = document.getElementById('previewContent');
  sendForm = document.getElementById('sendForm');
  templateForm = document.getElementById('templateForm');
  templateList = document.getElementById('templateList');

  // Inicializar pestañas
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(tab.dataset.tab).classList.add('active');
    });
  });

  // Event listeners
  templateForm.addEventListener('submit', handleTemplateSubmit);
  previewBtn.addEventListener('click', handlePreview);
  sendForm.addEventListener('submit', handleSendSubmit);

  // Cargar plantillas iniciales
  updateTemplateOptions();
  renderTemplateList();
});

// Actualizar select con plantillas
function updateTemplateOptions() {
  if (!templateSelect) return;
  templateSelect.innerHTML = '<option value="">-- Selecciona --</option>';
  templates.forEach((tpl, i) => {
    templateSelect.innerHTML += `<option value="${i}">${tpl.name}</option>`;
  });
}

// Renderizar lista de plantillas
function renderTemplateList() {
  if (!templateList) return;
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
function handleTemplateSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('tplName').value.trim();
  const text = document.getElementById('tplText').value.trim();
  if (name && text) {
    templates.push({ name, text });
    updateTemplateOptions();
    renderTemplateList();
    templateForm.reset();
  }
}

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
function handlePreview() {
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
}

// Envío de formulario
function handleSendSubmit(e) {
  e.preventDefault();
  // Aquí coloca la integración con la API de WhatsApp
  alert('Mensaje enviado correctamente');
  sendForm.reset();
  previewBox.classList.add('hidden');
}
