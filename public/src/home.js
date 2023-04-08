function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  return books.filter(bookCheckedOut).length;
}

function getMostCommonGenres(books) {
  let result = [];
  //create array for just genres
  const bookGenres = books.map((book) => book.genre);
  bookGenres.map((genre) => {
    //create function to see if genre is already in array
    const genreIndex = result.findIndex((obj) => obj.name === genre);
    //if genre is already in array, increase count by 1, else create new object for said genre
    if (genreIndex >= 0) {
      result[genreIndex].count = result[genreIndex].count + 1;
    } else {
      result.push({
        name: genre,
        count: 1,
      });
    }
  });
  result.sort((a, b) => b.count - a.count);
  return result.slice(0, 5);
}

function getMostPopularBooks(books) {
  const result = books.map((book) => ({
    name: book.title,
    count: book.borrows.length,
  }));
  result.sort((a, b) => b.count - a.count);
  return result.slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
  //create array of authors
  const result = authors.map((author) => ({
    //use spread operator
    ...author,
    //filter through books to find matching author and use reduce to add sum of borrows
    borrowCount: books
      .filter((book) => book.authorId === author.id)
      .reduce((total, book) => total + book.borrows.length, 0),
  }));
  // sort into numerical order from borrowCount
  result.sort((b, a) => a.borrowCount - b.borrowCount);
  //return new array with proper formaating
  return result
    .map((author) => ({
      name: `${author.name.first} ${author.name.last}`,
      count: author.borrowCount,
    }))
    //make array less than or equal to 5 objects
    .slice(0, 5);
}

function bookCheckedOut(book) {
  return book.borrows.some((borrow) => borrow.returned === false);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
