const bgColorsByLetter = [
  {
    letter: 'A',
    color: 'red-500',
  },
  {
    letter: 'B',
    color: 'yellow-500',
  },
  {
    letter: 'C',
    color: 'green-500',
  },
  {
    letter: 'D',
    color: 'blue-500',
  },
  {
    letter: 'E',
    color: 'indigo-500',
  },
  {
    letter: 'F',
    color: 'purple-500',
  },
  {
    letter: 'G',
    color: 'pink-500',
  },
  {
    letter: 'H',
    color: 'red-600',
  },
  {
    letter: 'I',
    color: 'yellow-600',
  },
  {
    letter: 'J',
    color: 'green-600',
  },
  {
    letter: 'K',
    color: 'blue-600',
  },
  {
    letter: 'L',
    color: 'indigo-600',
  },
  {
    letter: 'M',
    color: 'purple-600',
  },
  {
    letter: 'N',
    color: 'pink-600',
  },
  {
    letter: 'O',
    color: 'red-700',
  },
  {
    letter: 'P',
    color: 'yellow-700',
  },
  {
    letter: 'Q',
    color: 'green-700',
  },
  {
    letter: 'R',
    color: 'blue-700',
  },
  {
    letter: 'S',
    color: 'indigo-700',
  },
  {
    letter: 'T',
    color: 'purple-700',
  },
  {
    letter: 'U',
    color: 'pink-700',
  },
  {
    letter: 'V',
    color: 'red-800',
  },
  {
    letter: 'W',
    color: 'yellow-800',
  },
  {
    letter: 'X',
    color: 'green-800',
  },
  {
    letter: 'Y',
    color: 'blue-800',
  },
  {
    letter: 'Z',
    color: 'indigo-800',
  },
];

export const getBgColorByLetter = (letter: string) => {
  if(!letter) return 'gray-500';
  const letterColor = bgColorsByLetter.find((item) => item.letter === letter.toUpperCase());
  if(!letterColor) return 'gray-500';
  return letterColor.color.toString();
}