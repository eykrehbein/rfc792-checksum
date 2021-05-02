/**
 * @see https://www.tutorialspoint.com/adding-binary-strings-together-javascript
 */
const addBinary = (str1, str2) => {
  let carry = 0;
  const res = [];
  let l1 = str1.length,
    l2 = str2.length;
  for (let i = l1 - 1, j = l2 - 1; 0 <= i || 0 <= j; --i, --j) {
    let a = 0 <= i ? Number(str1[i]) : 0,
      b = 0 <= j ? Number(str2[j]) : 0;
    res.push((a + b + carry) % 2);
    carry = 1 < a + b + carry;
  }
  if (carry) {
    res.push(1);
  }
  return res.reverse().join("");
};

// 16 Bit zero

function uint16(n) {
  return n & 0xffff;
}

document.querySelector("#words").addEventListener("input", (e) => {
  let binarySum = "0000000000000000";

  const words = document.querySelector("#words").value.toString();

  for (const line of words.split("\n")) {
    // Parse line into binary representation
    const bin = parseInt(line, 16).toString(2);

    if (Number(bin)) {
      const complement = uint16(~parseInt(bin.padStart(16, 0), 2) >>> 0)
        .toString(2)
        .padStart(16, 0);

      console.log("Bin: ", bin);
      console.log("Complement: ", complement);

      binarySum = addBinary(binarySum, complement);
    }
  }

  // Fill up bytes if the sum is too short
  let formattedSum = binarySum.padStart(
    binarySum.length + (4 - (binarySum.length % 4)),
    1
  );

  const inverted = uint16(~parseInt(formattedSum, 2) >>> 0).toString(2);

  document.querySelector("#checksum").textContent = `0x${parseInt(inverted, 2)
    .toString(16)
    .toUpperCase()}`;
});
