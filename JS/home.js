async function get() {
  await fetch('https://www.googleapis.com/books/v1/volumes?q=buku&maxResults=32')
    .then((response) => response.json())  // Mengonversi respons API menjadi JSON
    .then((result) => {
      result.items.forEach((book) => {  // Iterasi setiap buku dalam hasil pencarian
        const box = document.createElement('div');  // Membuat elemen div untuk setiap buku
        box.classList.add('box');  // Menambahkan kelas 'box' pada elemen div

        const thumbnailUrl = book.volumeInfo.imageLinks?.thumbnail;  // Mengambil URL gambar sampul buku
        const title = book.volumeInfo.title;  // Mengambil judul buku

        if (thumbnailUrl && title) {  // Memastikan terdapat URL gambar sampul dan judul buku
          const bookImage = document.createElement('img');  // Membuat elemen img untuk gambar sampul
          bookImage.classList.add('book-image');  // Menambahkan kelas 'book-image' pada elemen img
          bookImage.src = thumbnailUrl;  // Mengatur sumber gambar sampul
          bookImage.alt = title;  // Mengatur atribut alt dengan judul buku

          const bookTitle = document.createElement('h6');  // Membuat elemen h6 untuk judul buku
          bookTitle.classList.add('book-title');  // Menambahkan kelas 'book-title' pada elemen h6
          bookTitle.textContent = title;  // Mengatur teks judul buku

          // Menambahkan event listener untuk menangani klik pada kotak buku
          box.addEventListener('click', () => {
            console.log(book);  // Menampilkan informasi buku ke konsol
            localStorage.setItem('selectedBook', JSON.stringify(book));  // Menyimpan buku terpilih ke localStorage
            // window.location.reload();  // Opsional: reload halaman jika diperlukan
          });

          // Menyusun elemen img dan h6 ke dalam elemen div 'box'
          box.appendChild(bookImage);
          box.appendChild(bookTitle);

          // Menyusun elemen 'box' ke dalam kontainer yang ada di halaman
          const container = document.querySelector('#container');  // Mengambil elemen kontainer
          container.appendChild(box);  // Menyusun 'box' ke dalam kontainer
        }
      });
    });
}

get();  // Memanggil fungsi 'get' untuk mengambil dan menampilkan daftar buku
/*  */