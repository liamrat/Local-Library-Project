function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((userA, userB) =>
    userA.name.last > userB.name.last ? 1 : -1
  );
}

function getTotalNumberOfBorrows(account, books) {
  let numberOfBooks = 0;
  books.forEach((book) =>
    book.borrows.forEach((borrow) => {
      if (account.id === borrow.id) numberOfBooks++;
    })
  );
  //let borrowedBooks = books.filter((account, book) => book.borrows.includes(account.id))
  return numberOfBooks;
}

function getBooksPossessedByAccount(account, books, authors) {
  //loops through books to see if account has said book chekcked out
  // if book is checked out by account, add book to return array WITH AUTHOR INFO
  let bookList = [];
  books.forEach((book) =>
    book.borrows.forEach((borrow) => {
      if (account.id === borrow.id && borrow.returned === false) {
        // add book to array
        bookList.push(book);
        //loop through authors to find matching author
        authors.forEach((author) => {
          if (author.id === book.authorId) {
            //add author info to book object
            book.author = author;
          }
        });
      }
    })
  );
  return bookList;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
