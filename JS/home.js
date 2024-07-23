async function get() {
    await fetch('https://www.googleapis.com/books/v1/volumes?q=buku&maxResults=40')
      .then((response) => response.json())
      .then((result) => {
        result.items.forEach((book) => {
          const box = document.createElement('div');
          box.classList.add('box');
  
          const thumbnailUrl = book.volumeInfo.imageLinks?.thumbnail;
          const title = book.volumeInfo.title;
  
          if (thumbnailUrl && title) {
            const bookImage = document.createElement('img');
            bookImage.classList.add('book-image');
            bookImage.src = thumbnailUrl;
  
            const bookTitle = document.createElement('h6');
            bookTitle.classList.add('book-title');
            bookTitle.textContent = title;
  
            box.addEventListener('click', () => {
              console.log(book);
              localStorage.setItem('selectedBook', JSON.stringify(book));
              // window.location.reload();
            });
  
            box.appendChild(bookImage);
            box.appendChild(bookTitle);
            container.appendChild(box);
          }
        });
      });
  }
  get();