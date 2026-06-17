// widgets.js — Grassoni & Associates
// Reusable: Rich Text Editor, Client Picker (autocomplete), PNG Export

/* ════════════════════════════════════════
   RICH TEXT EDITOR
   Usage: initRTE('container-id', placeholder)
   Get value: getRTEValue('container-id')  -> returns HTML string
   Set value: setRTEValue('container-id', html)
════════════════════════════════════════ */
function initRTE(containerId, placeholder) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = `
    <div class="rte-wrapper">
      <div class="rte-toolbar">
        <button type="button" class="rte-btn" data-cmd="bold" title="Gras"><b>G</b></button>
        <button type="button" class="rte-btn" data-cmd="italic" title="Italique"><i>I</i></button>
        <button type="button" class="rte-btn" data-cmd="underline" title="Souligné"><u>S</u></button>
        <div class="rte-sep"></div>
        <button type="button" class="rte-btn" data-cmd="insertUnorderedList" title="Liste à puces">☰</button>
        <button type="button" class="rte-btn" data-cmd="insertOrderedList" title="Liste numérotée">#</button>
        <div class="rte-sep"></div>
        <button type="button" class="rte-btn" data-cmd="formatBlock" data-val="blockquote" title="Citation">❝</button>
        <button type="button" class="rte-btn" data-cmd="formatBlock" data-val="p" title="Paragraphe">¶</button>
        <div class="rte-sep"></div>
        <button type="button" class="rte-btn" data-cmd="justifyLeft" title="Aligner à gauche">⇤</button>
        <button type="button" class="rte-btn" data-cmd="justifyCenter" title="Centrer">⇔</button>
        <div class="rte-sep"></div>
        <button type="button" class="rte-btn" data-cmd="undo" title="Annuler">↺</button>
        <button type="button" class="rte-btn" data-cmd="removeFormat" title="Effacer le format">⌫</button>
      </div>
      <div class="rte-content" id="${containerId}-editable" contenteditable="true" data-placeholder="${placeholder || 'Rédigez ici…'}"></div>
    </div>`;

  const toolbar = container.querySelector('.rte-toolbar');
  const editable = container.querySelector('.rte-content');

  toolbar.querySelectorAll('.rte-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      editable.focus();
      const cmd = btn.dataset.cmd;
      const val = btn.dataset.val || null;
      document.execCommand(cmd, false, val);
    });
  });
}

function getRTEValue(containerId) {
  const el = document.getElementById(containerId + '-editable');
  return el ? el.innerHTML : '';
}
function setRTEValue(containerId, html) {
  const el = document.getElementById(containerId + '-editable');
  if (el) el.innerHTML = html || '';
}
function getRTEText(containerId) {
  const el = document.getElementById(containerId + '-editable');
  return el ? el.innerText : '';
}

/* ════════════════════════════════════════
   CLIENT PICKER (autocomplete dropdown)
   Usage: initClientPicker('field-id', clientsArray, onSelectCallback)
   - field-id: id of a text input
   - clientsArray: array of {id, numero, nom, prenom, type, ville}
   - onSelectCallback(client): called when user picks one
════════════════════════════════════════ */
function initClientPicker(fieldId, getClientsFn, onSelect) {
  const input = document.getElementById(fieldId);
  if (!input) return;
  input.classList.add('client-picker-input');
  input.setAttribute('autocomplete', 'off');

  // Wrap in picker container if not already
  let wrapper = input.closest('.client-picker');
  if (!wrapper) {
    wrapper = document.createElement('div');
    wrapper.className = 'client-picker';
    input.parentNode.insertBefore(wrapper, input);
    wrapper.appendChild(input);
  }

  const dropdown = document.createElement('div');
  dropdown.className = 'client-dropdown';
  dropdown.id = fieldId + '-dropdown';
  wrapper.appendChild(dropdown);

  function renderDropdown(filterText) {
    const clients = getClientsFn();
    const q = (filterText || '').toLowerCase();
    const filtered = clients.filter(c => {
      const label = `${c.numero || ''} ${c.nom || ''} ${c.prenom || ''} ${c.ville || ''}`.toLowerCase();
      return !q || label.includes(q);
    }).slice(0, 30);

    if (filtered.length === 0) {
      dropdown.innerHTML = '<div class="client-dropdown-empty">— Aucun client trouvé dans le registre —</div>';
    } else {
      dropdown.innerHTML = filtered.map(c => `
        <div class="client-dropdown-item" data-id="${c.id}">
          <span class="cdi-num">${c.numero || '—'}</span>
          <div>
            <div class="cdi-name">${c.nom || ''}${c.prenom ? ' ' + c.prenom : ''}</div>
            <div class="cdi-sub">${c.type || ''}${c.ville ? ' · ' + c.ville : ''}</div>
          </div>
        </div>`).join('');
    }
    dropdown.innerHTML += `<div class="client-dropdown-new" data-action="goto-clients">+ Créer un nouveau client dans le registre</div>`;

    dropdown.querySelectorAll('.client-dropdown-item').forEach(item => {
      item.addEventListener('click', () => {
        const client = clients.find(c => c.id === item.dataset.id);
        if (client) {
          input.value = `${client.nom}${client.prenom ? ' ' + client.prenom : ''}`;
          input.dataset.clientId = client.id;
          input.dataset.clientNumero = client.numero || '';
          dropdown.classList.remove('open');
          if (onSelect) onSelect(client);
        }
      });
    });
    const newBtn = dropdown.querySelector('[data-action="goto-clients"]');
    if (newBtn) newBtn.addEventListener('click', () => { window.location.href = 'clients.html'; });
  }

  input.addEventListener('focus', () => { renderDropdown(input.value); dropdown.classList.add('open'); });
  input.addEventListener('input', () => {
    delete input.dataset.clientId;
    delete input.dataset.clientNumero;
    renderDropdown(input.value);
    dropdown.classList.add('open');
  });
  document.addEventListener('click', (e) => {
    if (!wrapper.contains(e.target)) dropdown.classList.remove('open');
  });
}

/* ════════════════════════════════════════
   PNG EXPORT
   Loads html2canvas dynamically, renders a hidden DOM node, exports as PNG download.
   Usage: exportNodeAsPNG(htmlString, filename)
════════════════════════════════════════ */
let _html2canvasLoading = null;
function loadHtml2Canvas() {
  if (window.html2canvas) return Promise.resolve();
  if (_html2canvasLoading) return _html2canvasLoading;
  _html2canvasLoading = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
  return _html2canvasLoading;
}

async function exportNodeAsPNG(innerHtml, filename) {
  await loadHtml2Canvas();
  const holder = document.createElement('div');
  holder.style.position = 'fixed';
  holder.style.left = '-99999px';
  holder.style.top = '0';
  holder.style.zIndex = '-1';
  holder.innerHTML = innerHtml;
  document.body.appendChild(holder);
  const sheet = holder.querySelector('.doc-export-sheet') || holder.firstElementChild;
  try {
    const canvas = await window.html2canvas(sheet, { scale: 2, backgroundColor: '#f5eedc', useCORS: true });
    const link = document.createElement('a');
    link.download = (filename || 'document') + '.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  } finally {
    document.body.removeChild(holder);
  }
}

window.GrassoniWidgets = { initRTE, getRTEValue, setRTEValue, getRTEText, initClientPicker, exportNodeAsPNG, loadHtml2Canvas };
