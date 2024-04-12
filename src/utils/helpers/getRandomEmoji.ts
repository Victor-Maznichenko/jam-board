export const getRandomEmoji = () => {
  const emojiArray = [
    '😊',
    '😄',
    '👽',
    '😂',
    '😎',
    '🥳',
    '😇',
    '😚',
    '🤓',
    '😋',
    '🤩',
    '👾',
    '🤖',
    '🎃',
    '👩‍💻',
    '🥴',
    '😬',
  ];
  const randomIndex = Math.floor(Math.random() * emojiArray.length);
  return emojiArray[randomIndex];
};
