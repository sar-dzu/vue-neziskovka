export function slugify(input) {
  return (input || "")
    .toString()
    .trim()
    .toLowerCase()
    // diakritika pre slovenčinu
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    // všetko okrem písmen/čísiel nahradiť pomlčkou
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function nowStamp() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const hh = String(d.getHours()).padStart(2, "0");
  const min = String(d.getMinutes()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd} ${hh}:${min}`;
}