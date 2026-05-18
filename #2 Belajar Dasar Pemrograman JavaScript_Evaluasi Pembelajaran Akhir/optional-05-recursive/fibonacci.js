function fibonacci(n) {
  if(n === 0) {
    return [0];
  }

  if(n === 1){
    return [0, 1];
  }

  const deret = fibonacci(n - 1);
  const newDeret = deret[deret.length - 1] + deret[deret.length - 2];

  deret.push(newDeret);
  return deret;
}

// Jangan hapus kode di bawah ini!
export default fibonacci;
