function hitungDiskon(voucher, totalBelanja) {
  let diskon = 0;
  let biayaBayar = totalBelanja;

  // Perhitungan Voucher
  if (voucher === "DumbWaysJos") {
    if (totalBelanja >= 50000) {
      diskon = (totalBelanja * 21.1) / 100;
      if (diskon > 20000) {
        diskon = 20000;
      }
      biayaBayar = totalBelanja - diskon;
    }
  } else if (voucher === "DumbWaysMantap") {
    if (totalBelanja >= 80000) {
      diskon = (totalBelanja * 30) / 100;
      if (diskon > 40000) {
        diskon = 40000;
      }
      biayaBayar = totalBelanja - diskon;
    }
  }

  return { diskon, biayaBayar };
}

function hitungKembalian(voucher, totalBelanja, uangBayar) {
  const { diskon, biayaBayar } = hitungDiskon(voucher, totalBelanja);
  const kembalian = uangBayar - biayaBayar;
  return { diskon, biayaBayar, kembalian };
}

const voucher = "DumbWaysJos";
const totalBelanja = 100000;
const uangBayar = 100000;

const { diskon, biayaBayar, kembalian } = hitungKembalian(
  voucher,
  totalBelanja,
  uangBayar
);

console.log(`Uang yang harus dibayar: Rp ${biayaBayar}`);
console.log(`Diskon: Rp ${diskon}`);
console.log(`Total Kembalian: Rp ${kembalian}`);
