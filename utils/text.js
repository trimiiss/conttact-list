export function normalize(s) {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // strip diacritics
    .replace(/\s+/g, ' ') // collapse spaces
    .trim();
}

export function digitsOnly(s) {
  return (s || '').replace(/\D+/g, '');
}

export function formatPhone(n) {
  const d = digitsOnly(n);
  if (d.length === 10) return `(${d.slice(0,3)}) ${d.slice(3,6)}-${d.slice(6)}`;
  if (d.length === 11) return `+${d[0]} (${d.slice(1,4)}) ${d.slice(4,7)}-${d.slice(7)}`;
  return n;
}
