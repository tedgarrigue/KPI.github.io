export const FRENCH_STOPWORDS = new Set([
  'le', 'la', 'les', 'du', 'de', 'des', 'un', 'une', 'des',
  'et', 'ou', 'mais', 'donc', 'car', 'ni', 'soit',
  'à', 'en', 'au', 'aux', 'par', 'pour', 'sur', 'avec', 'sans', 'sous',
  'dans', 'entre', 'chez', 'derrière', 'avant', 'devant', 'depuis',
  'je', 'tu', 'il', 'elle', 'nous', 'vous', 'ils', 'elles', 'on',
  'me', 'te', 'se', 'moi', 'toi', 'soi', 'lui', 'leur',
  'mon', 'ton', 'son', 'ma', 'ta', 'sa', 'nos', 'vos', 'leurs', 'mes', 'tes', 'ses',
  'ce', 'cet', 'cette', 'ces', 'celui', 'celui-ci', 'celui-là',
  'qui', 'que', 'quoi', 'où', 'comment', 'pourquoi', 'quel', 'quelle',
  'est', 'être', 'avoir', 'aller', 'faire', 'pouvoir', 'devoir', 'vouloir', 'savoir',
  'a', 'au', 'c', 'd', 'l', 'n', 'q', 's', 't',
]);

export function filterStopwords(words: string[]): string[] {
  return words.filter(word => !FRENCH_STOPWORDS.has(word.toLowerCase()));
}
