fetch('https://www.googleapis.com/books/v1/volumes?q=buku')


let katakunci = document.querySelector("input#search");

async function searchBooks() {
  console.log("Mencari...");
  const container = document.querySelector("div.container");
  container.innerText = "";
  const url = `https://www.googleapis.com/books/v1/volumes?q=${katakunci.value}`;
  try {
    const response = await fetch(url);
    const result = await response.json();
    // console.log(result)
    console.log("Berhasil");
    result.items.map((book) => {
      // biar pemanggilan attribut nya tidak terlalu panjang
      //   ini karena mau nampilin title, author sama thumbail nya saja
      //   bebas nantimah kalo mau manggil yang lainnya juga, ini hanya contoh
      // kalo mau liat properti yang lain, tinggal di console.log() aja 'book' nya
      //   console.log(book);
      const infoBook = book.volumeInfo;
      console.log(infoBook);

      const card = document.createElement("div");
      card.classList.add("card");

      const title = document.createElement("h4");
      title.textContent = infoBook.title;

      const author = document.createElement("p");
      author.textContent = infoBook.authors;

      // const description = document.createElement("p");
      // description.textContent = infoBook.description ? infoBook.description.slice(0, 200) + "..." : "No description available.";

      const cover = document.createElement("img");
      //   tanda tanya disini buat mencegah error di console log
      // jadi nanti properti nya di cek, jika ada properti yang namanya thumbnail, maka di tampilin isinya
      // jika gak ada, nanti jadi null isi nya atau kosong
      cover.src = infoBook.imageLinks?.thumbnail;

      card.appendChild(title);
      card.appendChild(author);
      card.appendChild(cover);
      // card.appendChild(description);
      container.appendChild(card);
    });
  } catch (error) {
    console.error(error);
  }
}
