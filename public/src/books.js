function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  // total of 3 arrays: [ [currentlyCheckedOut], [currentlyReturned]]
  let allBooks = [];
  let currentlyCheckedOut = [];
  let currentlyReturned = [];
  //loop through books. if book returned === false, add to currentlyCheckedOut. if book returned === true, add to cuurentlyReturned
  books.forEach((book) => {
    if (book.borrows.some((borrow) => borrow.returned === false)) {
      currentlyCheckedOut.push(book);
    } else {
      currentlyReturned.push(book);
    }
  });
  allBooks.push(currentlyCheckedOut, currentlyReturned);
  return allBooks;
}

function getBorrowersForBook(book, accounts) {
  //loop through book borrows array 10 times, add account object to array and add returned status in account object
  //return an array
  let bookBorrowers = [];
  let tenBookBorrowers = [];
  book.borrows.forEach((borrow) =>
    accounts.forEach((account) => {
      if (account.id === borrow.id) {
        bookBorrowers.push(account);
        account.returned = borrow.returned;
      }
    })
  );
  for (let i = 0; i < 10; i++) {
    tenBookBorrowers.push(bookBorrowers[i])
  }
  return tenBookBorrowers;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
