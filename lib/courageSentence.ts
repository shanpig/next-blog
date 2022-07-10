const courageSentences = [
  'Learn how to learn',
  'Learn to fail before perfect',
  'You’re right when it’s hard',
  'Do now, think later',
  'Challenge makes perfect',
];

const getCourage = () => {
  const index = Math.floor(Math.random() * (courageSentences.length - 1));
  return courageSentences[index];
};

export default getCourage;
