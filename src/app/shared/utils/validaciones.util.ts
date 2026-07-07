export type ValidationType =
  | 'numero'
  | 'letraespacio'
  | 'alfanumerico'
  | 'letra'
  | 'decimal'
  | 'decimalP'
  | 'fecha';

export function validarInput(event: KeyboardEvent, type: ValidationType): void {
  const key = event.key;

  if (!key) return;

  if (teclasEspeciales(event)) return;

  switch (type) {
    case 'numero':
      if (!/^[0-9]$/.test(key)) {
        event.preventDefault();
      }
      break;

    case 'letraespacio':
      if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]$/.test(key)) {
        event.preventDefault();
      }
      break;

    case 'letra':
      if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ]$/.test(key)) {
        event.preventDefault();
      }
      break;

    case 'alfanumerico':
      if (!/^[a-zA-Z0-9]$/.test(key)) {
        event.preventDefault();
      }
      break;

    case 'decimal':
      validarDecimal(event);
      break;

    case 'decimalP':
      validarDecimalPositivo(event);
      break;

    case 'fecha':
      validarFecha(event);
      break;

    default:
      break;
  }
}

function teclasEspeciales(event: KeyboardEvent): boolean {
  const specialKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab', 'Delete'];
  return (
    specialKeys.includes(event.key) ||
    (event.ctrlKey && ['c', 'v', 'a', 'x'].includes(event.key.toLowerCase()))
  );
}

function validarDecimalPositivo(event: KeyboardEvent): void {
  const input = event.target as HTMLInputElement;
  const value = input.value;
  const key = event.key;

  if (!/[0-9.]$/.test(key)) {
    event.preventDefault();
    return;
  }

  // Bloquear "-" (negativo)
  if (key === '-') {
    event.preventDefault();
    return;
  }

  if (key === '.' && value.includes('.')) {
    event.preventDefault();
    return;
  }

  const parts = value.split('.');
  if (parts.length === 2 && input.selectionStart! > value.indexOf('.') && parts[1].length >= 2) {
    event.preventDefault();
  }
}

function validarDecimal(event: KeyboardEvent): void {
  const input = event.target as HTMLInputElement;
  const value = input.value;
  const key = event.key;

  if (!/[0-9.-]$/.test(key)) {
    event.preventDefault();
    return;
  }

  if (key === '.' && value.includes('.')) {
    event.preventDefault();
  }

  if (key === '-' && (value.includes('-') || input.selectionStart !== 0)) {
    event.preventDefault();
  }

  const parts = value.replace('-', '').split('.');
  if (parts.length === 2 && input.selectionStart! > value.indexOf('.') && parts[1].length >= 2) {
    event.preventDefault();
  }
}

function validarFecha(event: KeyboardEvent): void {
  const teclasPermitidas = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete', '/'];

  if (/^[0-9]$/.test(event.key)) return;
  if (teclasPermitidas.includes(event.key)) return;

  event.preventDefault();
}
