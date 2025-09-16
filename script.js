document.addEventListener('DOMContentLoaded', () => {
  // Elementos
  const tabs = document.querySelectorAll('.tab');
  const contents = document.querySelectorAll('.tab-content');
  const nameInput = document.getElementById('name');
  const phoneInput = document.getElementById('phone');
  const templateSelect = document.getElementById('templateSelect');
  const offerInput = document.getElementById('offer');
  const extraInput = document.getElementById('extraMsg');
  const previewText = document.querySelector('.msg-text');
  const sendBtn = document.getElementById('sendBtn');
  const tplForm = document.getElementById('templateForm');
  const tplName = document.getElementById('tplName');
  const tplText = document.getElementById('tplText');
  const tplList = document.getElementById('templateList');

  // Default Templates
  let templates = [
    'ENJOY','ENJOY ESTUDIANTE','FREE','FREE ESTUDIANTE','FLEX','FLEX ESTUDIANTE',
    'BAJA','2 SEMANAS','MUSCULACIÓN','CLASES DIRIGIDAS','SIN ASISTENCIA',
    'INFORMACION','ENTRENAMIENTO DE PRUEBA','PREINSCRIPCIÓN','DEUDA','FORMULARIO NUTRICIÓN'
  ].map(t => ({ name:t, text:t }));

  // Tab Switching
  tabs.forEach(tab => tab.addEventListener('click', () => {
    tabs.forEach(t=>t.classList.remove('active'));
    contents.forEach(c=>c.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(tab.dataset.tab).classList.add('active');
  }));

  // Render Options & List
  function renderTemplates() {
    templateSelect.innerHTML = '<option value="">-- Selecciona --</option>';
    tplList.innerHTML = '';
    templates.forEach((tpl,i) => {
      templateSelect.innerHTML += `<option value="${i}">${tpl.name}</option>`;
      tplList.innerHTML += `
        <li>
          ${tpl.name}
          <div>
            <button onclick="editTpl(${i})">✎</button>
            <button onclick="delTpl(${i})">🗑️</button>
          </div>
        </li>`;
    });
  }

  // Auto Preview
  function updatePreview() {
    const name = nameInput.value || '…';
    const idx = templateSelect.value;
    let msg = idx!=='' ? templates[idx].text : 'selecciona una plantilla';
    if (offerInput.value) msg += `\nOferta: ${offerInput.value}`;
    if (extraInput.value) msg += `\n${extraInput.value}`;
    previewText.textContent = `Hola ${name}, ${msg}`;
  }
  [nameInput, templateSelect, offerInput, extraInput].forEach(el =>
    el.addEventListener('input', updatePreview)
  );

  // Send WhatsApp
  sendBtn.addEventListener('click', () => {
    const phone = phoneInput.value.trim();
    if (!phone) return alert('Introduce un número válido');
    const text = encodeURIComponent(previewText.textContent);
    window.open(`https://api.whatsapp.com/send?phone=${phone}&text=${text}`, '_blank');
  });

  // Template CRUD
  window.delTpl = i => { templates.splice(i,1); renderTemplates(); updatePreview(); };
  window.editTpl = i => {
    tplName.value = templates[i].name;
    tplText.value = templates[i].text;
    templates.splice(i,1);
    renderTemplates(); updatePreview();
  };
  tplForm.addEventListener('submit', e => {
    e.preventDefault();
    templates.push({ name:tplName.value, text:tplText.value });
    tplForm.reset(); renderTemplates(); updatePreview();
  });

  // Initial Render
  renderTemplates();
  updatePreview();
});
