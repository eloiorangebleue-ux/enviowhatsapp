document.addEventListener('DOMContentLoaded', () => {
  // Pestañas
  const tabs = document.querySelectorAll('.tab');
  const contents = document.querySelectorAll('.tab-content');
  tabs.forEach(tab => tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    contents.forEach(c => c.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(tab.dataset.tab).classList.add('active');
  }));

  // SECCIÓN “Enviar”
  const sendForm = document.getElementById('form-send');
  const sendName = document.getElementById('send-name');
  const sendPhone = document.getElementById('send-phone');
  const sendTplSelect = document.getElementById('send-template');
  const sendOffer = document.getElementById('send-offer');
  const sendExtra = document.getElementById('send-extra');
  const previewText = document.getElementById('preview-text');
  const btnSend = document.getElementById('btn-send');

  // SECCIÓN “Plantillas”
  const tplForm = document.getElementById('form-templates');
  const tplName = document.getElementById('tpl-name');
  const tplText = document.getElementById('tpl-text');
  const tplList = document.getElementById('tpl-list');

  // Datos de plantillas
  let templates = [
    'ENJOY','ENJOY ESTUDIANTE','FREE','FREE ESTUDIANTE','FLEX','FLEX ESTUDIANTE',
    'BAJA','2 SEMANAS','MUSCULACIÓN','CLASES DIRIGIDAS','SIN ASISTENCIA',
    'INFORMACION','ENTRENAMIENTO DE PRUEBA','PREINSCRIPCIÓN','DEUDA','FORMULARIO NUTRICIÓN'
  ].map(name => ({ name, text: name }));

  // Render de plantillas en ambas secciones
  function renderTemplates() {
    // Opciones en “Enviar”
    sendTplSelect.innerHTML = '<option value="">-- Selecciona --</option>';
    // Lista en “Plantillas”
    tplList.innerHTML = '';
    templates.forEach((tpl, i) => {
      sendTplSelect.innerHTML += `<option value="${i}">${tpl.name}</option>`;
      tplList.innerHTML += `
        <li>
          ${tpl.name}
          <div>
            <button onclick="editTemplate(${i})">✎</button>
            <button onclick="deleteTemplate(${i})">🗑️</button>
          </div>
        </li>`;
    });
  }

  // Actualiza previsualización automáticamente
  function updatePreview() {
    const name = sendName.value || '…';
    const idx = sendTplSelect.value;
    let msg = idx !== '' ? templates[idx].text : 'selecciona una plantilla';
    if (sendOffer.value) msg += `\nOferta: ${sendOffer.value}`;
    if (sendExtra.value) msg += `\n${sendExtra.value}`;
    previewText.textContent = `Hola ${name}, ${msg}`;
  }
  [sendName, sendTplSelect, sendOffer, sendExtra].forEach(el =>
    el.addEventListener('input', updatePreview)
  );

  // Enviar WhatsApp real
  btnSend.addEventListener('click', () => {
    const phone = sendPhone.value.trim();
    if (!phone) return alert('Introduce un número válido');
    const text = encodeURIComponent(previewText.textContent);
    window.open(`https://api.whatsapp.com/send?phone=${phone}&text=${text}`, '_blank');
  });

  // CRUD Plantillas
  window.deleteTemplate = i => {
    templates.splice(i, 1);
    renderTemplates();
    updatePreview();
  };
  window.editTemplate = i => {
    tplName.value = templates[i].name;
    tplText.value = templates[i].text;
    templates.splice(i, 1);
    renderTemplates();
    updatePreview();
  };
  tplForm.addEventListener('submit', e => {
    e.preventDefault();
    templates.push({ name: tplName.value, text: tplText.value });
    tplForm.reset();
    renderTemplates();
    updatePreview();
  });

  // Inicialización
  renderTemplates();
  updatePreview();
});
