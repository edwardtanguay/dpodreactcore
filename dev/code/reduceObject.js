const books = [
  {
    title: "Title One",
    author: "author one",
    page: 345,
    price: 43,
  },
  {
    title: "Title Two",
    author: "author two",
    page: 464,
    price: 45,
  },
  {
    title: "Title Three",
    author: "author three",
    page: 574,
    price: 23,
  },
  {
    title: "Title Four",
    author: "author Four",
    page: 353,
    price: 65,
  },
];
const getBookGroupInformation = books => {
    return books.reduce((acc,book) => {
        acc.titles.push(book.title);
        acc.authors.push(book.author);
        acc.totalPrice += book.price;
        return acc;
    }, { titles: [], authors: [], totalPrice: 0 });
}
console.log(getBookGroupInformation(books));

/* OUTPUT: 
{
  Titles: [ 'Title One', 'Title Two', 'Title Three', 'Title Four' ],
  Authors: [ 'author one', 'author two', 'author three', 'author Four' ],
  'Total Price': 158.4
}
*/

