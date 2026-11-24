// Bilingual content check (Task 11, steps 1–3).
// Verifies: English is the default language, navigation is in English,
// Spanish is available as a selectable locale, and a language selector exists.
// Run: npm run test:i18n
import { build } from 'esbuild';
import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const failures = [];
const check = (ok, msg) => {
  if (ok) console.log(`  ok   ${msg}`);
  else {
    console.log(`  FAIL ${msg}`);
    failures.push(msg);
  }
};

// Bundle src/config.ts (and whatever it imports) into an ESM string and import it.
const result = await build({
  entryPoints: [path.join(root, 'src/config.ts')],
  bundle: true,
  format: 'esm',
  platform: 'node',
  write: false,
  logLevel: 'silent',
});
const code = result.outputFiles[0].text;
const config = await import(`data:text/javascript;base64,${Buffer.from(code).toString('base64')}`);

console.log('Default language');
check(config.siteConfig?.language === 'en', `siteConfig.language is "en" (got "${config.siteConfig?.language}")`);
check(config.defaultLocale === 'en', `defaultLocale is "en" (got "${config.defaultLocale}")`);

const en = config.contentByLocale?.en;
const es = config.contentByLocale?.es;

console.log('English navigation');
const enLabels = en?.navigationConfig?.links?.map((l) => l.label) ?? [];
for (const label of ['Home', 'About', 'Services', 'Projects', 'Blog', 'Contact']) {
  check(enLabels.includes(label), `EN nav has "${label}"`);
}
const spanishWords = /\b(Inicio|Sobre|Servicios|Proyectos|Contacto|Agendar)\b/;
check(enLabels.length > 0 && !enLabels.some((l) => spanishWords.test(l)), 'EN nav has no Spanish labels');

console.log('Spanish locale');
const esLabels = es?.navigationConfig?.links?.map((l) => l.label) ?? [];
check(esLabels.includes('Inicio') && esLabels.includes('Contacto'), 'ES nav has "Inicio" and "Contacto"');
check(es?.siteConfig?.language === 'es', 'ES siteConfig.language is "es"');

console.log('Same structure in both locales');
const sections = ['siteConfig', 'navigationConfig', 'heroConfig', 'aboutConfig', 'institutionsConfig',
  'servicesConfig', 'portfolioConfig', 'testimonialsConfig', 'ctaConfig', 'footerConfig', 'uiText', 'projectsPage'];
for (const s of sections) check(Boolean(en?.[s]) && Boolean(es?.[s]), `"${s}" exists in en and es`);
check(en?.servicesConfig?.services?.length === es?.servicesConfig?.services?.length, 'same number of services');
check(en?.navigationConfig?.links?.every((l, i) => l.href === es?.navigationConfig?.links?.[i]?.href),
  'nav hrefs (routes) are identical across locales');

console.log('Key parity between en and es');
// Compare object shape (keys + array lengths), ignoring free-form maps (none today).
const FREE_FORM = new Set([]);
const shape = (v, p = '') => {
  if (Array.isArray(v)) return v.flatMap((x, i) => shape(x, `${p}[${i}]`));
  if (v && typeof v === 'object')
    return Object.keys(v).flatMap((k) => (FREE_FORM.has(k) ? [`${p}.${k}`] : [`${p}.${k}`, ...shape(v[k], `${p}.${k}`)]));
  return [];
};
const ignoreOptional = (keys) => keys.filter((k) => !k.endsWith('.translated'));
const enKeys = new Set(ignoreOptional(shape(en ?? {})));
const esKeys = new Set(ignoreOptional(shape(es ?? {})));
const onlyEn = [...enKeys].filter((k) => !esKeys.has(k));
const onlyEs = [...esKeys].filter((k) => !enKeys.has(k));
check(enKeys.size > 0 && onlyEn.length === 0 && onlyEs.length === 0,
  `en/es keys match${onlyEn.length + onlyEs.length ? ` (only en: ${onlyEn.slice(0, 5)}; only es: ${onlyEs.slice(0, 5)})` : ''}`);

console.log('No Spanish left in English primary sections');
// Heuristic: Spanish-only characters or very common Spanish words.
// Proper nouns that are legitimately Spanish/Bolivian are stripped first.
const ALLOWED = [/Gabriel Max Antonio Escobari Quiroga/g, /Escobari/g];
const SPANISH = /[áéíóúñ¿¡]|\b(de|del|la|las|los|y|para|con|en|sobre|mí|años|proyectos|servicios|gestión|experiencia|hablemos|agendar|consulta|contacto|inicio)\b/i;
const collectStrings = (v) =>
  typeof v === 'string' ? [v] : Array.isArray(v) ? v.flatMap(collectStrings)
  : v && typeof v === 'object' ? Object.entries(v).filter(([k]) => !['href', 'src', 'logo', 'image', 'backgroundImage', 'buttonHref', 'email', 'iconName', 'categoryKey', 'initials'].includes(k)).flatMap(([, x]) => collectStrings(x))
  : [];
for (const s of ['navigationConfig', 'heroConfig', 'aboutConfig', 'servicesConfig', 'portfolioConfig', 'ctaConfig', 'footerConfig', 'uiText', 'projectsPage']) {
  const hits = collectStrings(en?.[s]).filter((t) => SPANISH.test(ALLOWED.reduce((acc, re) => acc.replace(re, ''), t)));
  check(en?.[s] && hits.length === 0, `EN ${s} has no Spanish text${hits.length ? ` → "${hits[0].slice(0, 70)}"` : ''}`);
}

console.log('Blog category slugs unchanged');
// posts.ts builds category slugs from the (legacy, Spanish) servicesConfig titles.
const slugify = (s) => s.normalize('NFD').replace(/[^\x00-\x7f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const expectedSlugs = ['arquitectura-de-soluciones', 'desarrollo-de-software', 'gestion-de-proyectos-ti', 'implementacion-itil', 'gemelos-digitales', 'ia-agentica'];
const legacySlugs = config.servicesConfig?.services?.map((s) => slugify(s.title)) ?? [];
check(JSON.stringify(legacySlugs) === JSON.stringify(expectedSlugs), `legacy servicesConfig slugs = ${expectedSlugs.join(', ')}`);
for (const loc of ['en', 'es']) {
  const keys = config.contentByLocale?.[loc]?.servicesConfig?.services?.map((s) => s.categoryKey) ?? [];
  check(JSON.stringify(keys) === JSON.stringify(expectedSlugs), `${loc} services categoryKey matches blog slugs`);
}

console.log('Experience figure');
const enText = JSON.stringify(en ?? {});
const esText = JSON.stringify(es ?? {});
check(!/\b30\s*\+?\s*(years|años)/i.test(enText + esText), 'no "30 years" claim');

console.log('Projects (src/data/projects.ts)');
const projBuild = await build({
  entryPoints: [path.join(root, 'src/data/projects.ts')],
  bundle: true, format: 'esm', platform: 'node', write: false, logLevel: 'silent',
});
const { projects = [] } = await import(`data:text/javascript;base64,${Buffer.from(projBuild.outputFiles[0].text).toString('base64')}`);
check(projects.length === 6, `6 projects (got ${projects.length})`);
const PROJECT_ALLOWED = [...ALLOWED, /Medicus Mundi/g];
for (const p of projects) {
  const pe = p.text?.en;
  const ps = p.text?.es;
  check(Boolean(pe && ps), `${p.slug}: has en and es text`);
  const a = new Set(shape(pe ?? {}));
  const b = new Set(shape(ps ?? {}));
  const diff = [...a].filter((k) => !b.has(k)).concat([...b].filter((k) => !a.has(k)));
  check(a.size > 0 && diff.length === 0, `${p.slug}: en/es shape matches${diff.length ? ` (${diff.slice(0, 4)})` : ''}`);
  const hits = collectStrings(pe).filter((t) => SPANISH.test(PROJECT_ALLOWED.reduce((acc, re) => acc.replace(re, ''), t)));
  check(hits.length === 0, `${p.slug}: EN text has no Spanish${hits.length ? ` → "${hits[0].slice(0, 70)}"` : ''}`);
  check(pe?.gallery?.length === p.images.gallery.length, `${p.slug}: one caption per gallery image`);
  const files = [p.images.cover, ...p.images.gallery].map((src) => path.join(root, 'public', src));
  const missing = files.filter((f) => !existsSync(f));
  check(missing.length === 0, `${p.slug}: cover + gallery images exist${missing.length ? ` (missing ${missing.length})` : ''}`);
}
check(!/\b30\s*\+?\s*(years|años)\s+(of\s+experience|de\s+experiencia)/i.test(JSON.stringify(projects)),
  'projects: no "30 years of experience" claim');

console.log('Language selector');
const switcher = path.join(root, 'src/components/LanguageSwitcher.tsx');
check(existsSync(switcher), 'src/components/LanguageSwitcher.tsx exists');
const nav = readFileSync(path.join(root, 'src/components/Navigation.tsx'), 'utf8');
check(nav.includes('LanguageSwitcher'), 'Navigation renders LanguageSwitcher');

if (failures.length) {
  console.log(`\n${failures.length} check(s) failed.`);
  process.exit(1);
}
console.log('\nAll i18n checks passed.');
