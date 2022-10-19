export const randomLightColorGenerator = (arrLength: number) => {
  const totalColor = [];

  for (let i = 0; i < arrLength; i++) {
    let color = '#';
    for (let j = 0; j < 3; j++) {
      color += (
        '0' +
        Math.floor(((1 + Math.random()) * Math.pow(16, 2)) / 2).toString(16)
      ).slice(-2);
    }
    totalColor.push(color);
  }
  return totalColor;
};
