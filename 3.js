const sortArry = (data) => {
  let ganjil = [];
  let genap = [];

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data.length - i - 1; j++) {
      if (data[j] > data[j + 1]) {
        let bubblesort = data[j];
        data[j] = data[j + 1];
        data[j + 1] = bubblesort;
      }
    }
  }

  for (let i = 0; i < data.length; i++) {
    let fields = data[i];

    if (fields % 2 == 0) {
      genap.push(fields);
    }

    if (fields % 2 != 0) {
      ganjil.push(fields);
    }
  }

  console.log("Array :", data);
  console.log("Ganjil :", ganjil);
  console.log("Genap :", genap);
};

sortArry([2, 24, 32, 22, 31]);
