// Ambil elemen input dengan id 'search'
let katakunci = document.querySelector("input#search");

// Fungsi untuk mencari buku berdasarkan kata kunci
async function searchBooks() {
  // Log ke konsol untuk menandakan awal pencarian
  console.log("Mencari...");

  // Ambil elemen div dengan kelas 'container' untuk menampilkan hasil pencarian
  const container = document.querySelector("div.container");
  // Kosongkan konten container sebelum menampilkan hasil baru
  container.innerText = "";

  // Buat URL untuk permintaan API dengan kata kunci pencarian dari input
  const url = `https://www.googleapis.com/books/v1/volumes?q=${katakunci.value}&maxResults=32`;

  try {
    // Lakukan permintaan fetch ke URL API
    const response = await fetch(url);
    // Konversi respons API menjadi JSON
    const result = await response.json();

    // Log ke konsol untuk menandakan bahwa data berhasil diambil
    console.log("Berhasil");

    // Iterasi melalui setiap buku dalam hasil pencarian
    result.items.map((book) => {
      // Ambil informasi buku dari volumeInfo
      const infoBook = book.volumeInfo;
      console.log(infoBook);

      // Buat elemen div untuk setiap buku dengan kelas 'card'
      const card = document.createElement("div");
      card.classList.add("card");

      // Buat elemen h4 untuk judul buku dan tambahkan ke card
      const title = document.createElement("h4");
      title.textContent = infoBook.title;

      // Buat elemen p untuk penulis buku dan tambahkan ke card
      const author = document.createElement("p");
      // Jika ada beberapa penulis, gabungkan mereka dengan koma
      author.textContent = infoBook.authors ? infoBook.authors.join(", ") : "Unknown author";

      // Buat elemen img untuk sampul buku dan tambahkan ke card
      const cover = document.createElement("img");
      //   tanda tanya disini buat mencegah error di console log
      // jadi nanti properti nya di cek, jika ada properti yang namanya thumbnail, maka di tampilin isinya
      // jika gak ada, nanti jadi null isi nya atau kosong
      cover.src = infoBook.imageLinks?.thumbnail || "default-image.jpg"; // Gunakan gambar default jika thumbnail tidak tersedia
      cover.alt = infoBook.title;

      // Tambahkan elemen title, author, dan cover ke dalam card
      card.appendChild(title);
      card.appendChild(author);
      card.appendChild(cover);

      // Tambahkan card ke dalam container
      container.appendChild(card);
    });
  } catch (error) {
    // Log error ke konsol jika terjadi masalah dengan fetch
    console.error("Terjadi kesalahan:", error);
  }
}

