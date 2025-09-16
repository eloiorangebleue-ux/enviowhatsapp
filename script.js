document.addEventListener('DOMContentLoaded', () => {
  // Elementos
  const tabs = document.querySelectorAll('.tab');
  const contents = document.querySelectorAll('.tab-content');
  const templateSelect = document.getElementById('templateSelect');
  const previewBtn = document.getElementById('previewBtn');
  const previewBox = document.getElementById('previewBox');
  const previewContent = document.getElementById('previewContent');
  const sendForm = document.getElementById('sendForm');
  const sendBtn = document.getElementById('sendBtn');
  const templateForm = document.getElementById('templateForm');
  const templateList = document.getElementById('templateList');

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

  // Cambio de pestañas
  tabs.forEach(tab => tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    contents.forEach(c => c.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(tab.dataset.tab).classList.add('active');
  }));

  // Actualizar opciones y lista
  function updateTemplateOptions() {
    templateSelect.innerHTML = '<option value="">-- Selecciona --</option>';
    templates.forEach((tpl, i) => {
      templateSelect.innerHTML += `<option value="${i}">${tpl.name}</option>`;
    });
  }
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

  // CRUD Plantillas
  templateForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('tplName').value.trim();
    const text = document.getElementById('tplText').value.trim();
    if (name && text) {
      templates.push({ name, text });
      updateTemplateOptions(); renderTemplateList();
      templateForm.reset();
    }
  });
  window.deleteTemplate = index => {
    templates.splice(index, 1);
    updateTemplateOptions(); renderTemplateList();
  };
  window.editTemplate = index => {
    const tpl = templates[index];
    document.getElementById('tplName').value = tpl.name;
    document.getElementById('tplText').value = tpl.text;
    templates.splice(index, 1);
    updateTemplateOptions(); renderTemplateList();
  };

  // Previsualización
  previewBtn.addEventListener('click', () => {
    const name = document.getElementById('name').value;
    const idx = templateSelect.value;
    const offer = document.getElementById('offer').value;
    const extra = document.getElementById('extraMsg').value;
    if (idx !== '') {
      let msg = `Hola ${name}, ${templates[idx].text}`;
      if (offer) msg += `\nOferta: ${offer}`;
      if (extra) msg += `\n${extra}`;
      previewContent.textContent = msg;
      previewBox.classList.remove('hidden');
    }
  });

  // Envío a WhatsApp
  sendForm.addEventListener('submit', e => {
    e.preventDefault();
    const phone = document.getElementById('phone').value.trim();
    if (!phone) return alert('Introduce un teléfono válido');
    const text = encodeURIComponent(previewContent.textContent || '');
    const url = `https://api.whatsapp.com/send?phone=${phone}&text=${text}`;
    sendBtn.textContent = 'Abriendo WhatsApp…';
    sendBtn.disabled = true;
    window.open(url, '_blank');
    setTimeout(() => {
      sendBtn.textContent = 'Enviar';
      sendBtn.disabled = false;
      sendForm.reset();
      previewBox.classList.add('hidden');
    }, 1000);
  });

  // Inicializar interfaz
  updateTemplateOptions();
  renderTemplateList();
});
