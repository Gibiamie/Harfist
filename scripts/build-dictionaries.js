const fs = require('fs');
const path = require('path');

const root = process.cwd();
const dataDir = path.join(root, 'data');

const TURKISH_LETTERS = new Set('ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZ'.split(''));

const DEFAULT_EXTRA_ACCEPTED_WORDS = [
  'TARIM',
  'PEDAL',
  'NEZİH',
  'SABUN',
  'TİNER'
];

const HARD_REJECTED_WORDS = new Set([
  'AAAAA',
  'BBBBB',
  'CCCCC',
  'GGGGG',
  'MMMMM',
  'REYRİ',
  'BANİK',
  'MANTU',
  'RENKL',
  'ÇİFTÇ',
  'KÖTÜL',
  'YAPRA',
  'YÜKSE',
  'TAKİM',
  'ADINA',
  'ORASI',
  'ORAYA',
  'İTEĞİ',
  'ANALI',
  'TAÇLI',
  'YÜKLÜ',
  'EVDEŞ',
  'AÇMAK',
  'ATMAK',
  'UYMAK',
  'UÇMAK',
  'EŞMEK'
]);

function readJsonArray(filePath) {
  if (!fs.existsSync(filePath)) return [];
  const raw = fs.readFileSync(filePath, 'utf8');
  const parsed = JSON.parse(raw);
  if (!Array.isArray(parsed)) {
    throw new Error(`${filePath} must contain a JSON array`);
  }
  return parsed;
}

function normalizeWord(value) {
  return String(value || '')
    .trim()
    .normalize('NFC')
    .toLocaleUpperCase('tr-TR')
    .replaceAll('Â', 'A')
    .replaceAll('Î', 'İ')
    .replaceAll('Û', 'U');
}

function hasOnlyTurkishLetters(word) {
  return [...word].every((ch) => TURKISH_LETTERS.has(ch));
}

function hasValidLength(word) {
  const length = [...word].length;
  return length >= 3 && length <= 5;
}

function looksLikeRepeatedNoise(word) {
  return new Set([...word]).size === 1;
}

function looksLikeMastar(word) {
  return word.endsWith('MAK') || word.endsWith('MEK');
}

function isRejected(word) {
  if (!word) return true;
  if (!hasValidLength(word)) return true;
  if (!hasOnlyTurkishLetters(word)) return true;
  if (HARD_REJECTED_WORDS.has(word)) return true;
  if (looksLikeRepeatedNoise(word)) return true;
  if (looksLikeMastar(word)) return true;
  return false;
}

function cleanWords(words) {
  const seen = new Set();
  const result = [];

  for (const item of words) {
    const word = normalizeWord(item);
    if (isRejected(word)) continue;
    if (seen.has(word)) continue;
    seen.add(word);
    result.push(word);
  }

  return result.sort((a, b) => a.localeCompare(b, 'tr'));
}

function groupByLength(words) {
  return {
    3: words.filter((word) => [...word].length === 3),
    4: words.filter((word) => [...word].length === 4),
    5: words.filter((word) => [...word].length === 5)
  };
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
}

function main() {
  fs.mkdirSync(dataDir, { recursive: true });

  const existingAnswers = readJsonArray(path.join(dataDir, 'answers.json'));
  const existingAllowed = readJsonArray(path.join(dataDir, 'allowed_words.json'));
  const verifiedExtra = readJsonArray(path.join(dataDir, 'verified_extra_words.json'));

  const master = cleanWords([
    ...existingAllowed,
    ...existingAnswers,
    ...DEFAULT_EXTRA_ACCEPTED_WORDS,
    ...verifiedExtra
  ]);

  const grouped = groupByLength(master);

  const answers5 = cleanWords(existingAnswers)
    .filter((word) => [...word].length === 5);

  writeJson(path.join(dataDir, 'master_dictionary.json'), master);
  writeJson(path.join(dataDir, 'allowed_words.json'), master);
  writeJson(path.join(dataDir, 'answers_3.json'), grouped[3]);
  writeJson(path.join(dataDir, 'answers_4.json'), grouped[4]);
  writeJson(path.join(dataDir, 'answers_5.json'), answers5.length ? answers5 : grouped[5]);

  console.log('Dictionary build complete');
  console.log({
    master: master.length,
    answers3: grouped[3].length,
    answers4: grouped[4].length,
    answers5: (answers5.length ? answers5 : grouped[5]).length,
    includes: {
      TARIM: master.includes('TARIM'),
      PEDAL: master.includes('PEDAL'),
      NEZIH: master.includes('NEZİH'),
      SABUN: master.includes('SABUN'),
      TINER: master.includes('TİNER'),
      MMMMM: master.includes('MMMMM')
    }
  });
}

main();
