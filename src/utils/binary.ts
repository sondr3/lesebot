const zero = 0n;
const shift = 8n;
const bigShift = 16n;
const byte = 255n;

export const unicodeToBinary = (str: string): string => {
  const len = str.length;
  let n = zero;
  for (let i = 0; i < len; i++) {
    const bits = BigInt(str.codePointAt(i));
    n = (n << (bits > byte ? bigShift : shift)) + bits;
  }
  const bin = n.toString(2);
  return chunkString(bin.padStart(8 * Math.ceil(bin.length / 8), "0"));
};

const chunkString = (str: string): string => {
  const chunked = str.match(/.{1,8}/g);
  if (chunked === null) return "";
  return chunked.join(" ");
};

export const binaryToString = (input: string): string => {
  let bytesLeft = input;
  let result = "";

  // Check if we have some bytes left
  while (bytesLeft.length) {
    // Get the first digits
    const byte = bytesLeft.substr(0, 8);
    bytesLeft = bytesLeft.substr(8);

    result += String.fromCharCode(parseInt(byte, 2));
  }

  return result;
};

console.log(binaryToString(unicodeToBinary("hei på deg!")));
