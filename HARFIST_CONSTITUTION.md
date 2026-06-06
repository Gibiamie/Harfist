# HARFIST_CONSTITUTION.md

Version: 1.0
Status: Binding Project Constitution

## 1. Purpose

Harfist is a premium Turkish 5-letter word puzzle game. It must feel trustworthy, modern, fast, mobile-first, and enjoyable.

## 2. Non-negotiable rules

1. The hidden answer must be a real Turkish word.
2. The game must never intentionally generate fake, meaningless, or non-Turkish answer words.
3. The answer list and guess validation dictionary must be separate.
4. A real Turkish 5-letter word must not be rejected only because it is not in the answer list.
5. Invalid guesses must not consume an attempt.
6. The same player must not receive the same answer again until the answer list is exhausted.
7. Internal word counts must not be shown to users.
8. Mobile usability is primary.
9. Dark grey alone must not be used for wrong keyboard letters; use a clearly visible coral/red state.
10. No release may be called final unless the QA checklist passes.

## 3. Dictionary architecture

### GOLD LIST

Used only for hidden answers.

Target: 2,000+ high-quality 5-letter Turkish answer words.

### MASTER DICTIONARY

Used only for validating player guesses.

Target: 10,000+ valid 5-letter Turkish words.

The player may enter words that are in MASTER DICTIONARY even if they are not in GOLD LIST.

## 4. Required QA words

The following must be accepted:

- ACEMİ
- ÇÖZÜM
- ASKER
- ŞEHİR
- TARİH

The following must be rejected:

- BBBBB
- REYRİ
- BANİK
- ZXCVB

## 5. Visual rules

- Green: correct letter, correct position.
- Yellow: letter exists, wrong position.
- Coral/red: letter does not exist in the answer.

## 6. Release checklist

Before publishing:

- Gold list loads.
- Master dictionary loads.
- Required accepted words pass.
- Required rejected words fail.
- Invalid guesses do not consume attempts.
- Correct row receives colors.
- Keyboard receives colors.
- Same answer does not repeat before list exhaustion.
- Statistics persist.
- Share output works.
- Mobile layout is usable.
