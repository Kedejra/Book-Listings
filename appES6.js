//USING ES6 AND CLASSES INSTEAD OF PROTOTYPE

class Book
{
    constructor (title, author, ISBN)
    {
        this.title=title;
        this.author = author;
        this.ISBN=ISBN;
    }
}

class UI
{
    //ADD BOOK METHOD
    addBookToList(book)
    {
        const list = document.getElementById('book-list');

    //create a table row element
    const row = document.createElement('tr'); 

    //insert columns
    row.innerHTML= `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.ISBN}</td>
    <td> <a href="#" class="delete" style="text-decoration:none;"> x </a></td>
    `;
//adding the row to the table
    list.appendChild(row);

    }

    //SHOW ALERT METHOD
    showAlert(message, className)
    {
        //create div
    const div = document.createElement('div');
    
    //Add Classes
    div.className=`alert ${className}`;

    //Add Text
    div.appendChild(document.createTextNode(message));

    //get Parent element to add the alert into DOM
    const container= document.querySelector('.container');

    //get form element
    const form= document.getElementById('book-form');

    //inserting alert into container before form
    container.insertBefore(div,form);

    //alert timeout after 3 secs
    setTimeout(function()
    {
        document.querySelector('.alert').remove();
    }, 3000);
    }

    //DELETE BOOK METHOD
    deleteBook(target)
    {
        if (target.className ==='delete')
    {
        target.parentElement.parentElement.remove();
    }
    }

    //CLEAR FIELDS
    clearFields()
    {
        document.getElementById('title').value='';
        document.getElementById('author').value='';
        document.getElementById('ISBN').value='';
    }
}

//PERSISTING DATA TO STORAGE
class StoreData
{
    //fetch from local storage
    static getBooks()
    {
        let books;
        if (localStorage.getItem('books')===null)
        {
            books=[];
        }
        else{
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static addBookToLS(book)
    {
        const books = StoreData.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static displayBooks()
    {
        const books= StoreData.getBooks();

        books.forEach(function(book)
        {
            const ui= new UI;

            //Add book to UI
            ui.addBookToList(book);
        });
    }

    static removeBook(ISBN)
    {
        //get books from local storage
        const books = StoreData.getBooks();

        //looping through the list of books
        books.forEach(function(book,index)
        {
            if(book.ISBN === ISBN)
            {
                books.splice(index, 1);
            }
        });
        //updating local storage with the updated list
        localStorage.setItem('books', JSON.stringify(books));
    }
}

//Event Listeners

//DOM LOADER EVENT
//For loading in data from local storage to be displayed

document.addEventListener('DOMContentLoaded', StoreData.displayBooks);


//ADD BOOK EVENT LISTENER
document.getElementById('book-form').addEventListener('submit', function(e)
{
    //Retrieving data entered in form values
     const title = document.getElementById('title').value,
      author = document.getElementById('author').value,
     ISBN = document.getElementById('ISBN').value;
    
     //Instatiating obj of book
     const book = new Book(title,author,ISBN);
     

     //Instatiate UI object
    const ui = new UI();
    console.log(ui);
     //Validation
     if(title===''|| author==='' || ISBN==='')
     {
        //show error alert
        ui.showAlert('Please Fill the Fields', 'error');
     }
     else
     {

    // //Add book to list
     ui.addBookToList(book);

     //Add to local storage
     StoreData.addBookToLS(book);

        //Show success after book added 
        ui.showAlert('Great! The book has been added.', 'success');
    //Clear fields
    ui.clearFields();
     }
    e.preventDefault();
});

//EVENT LISTENER FOR DELETE 
//using event delegation
document.getElementById('book-list').addEventListener('click', function (e)
{
    //instantiatre UI
    const ui= new UI();
    

    //getting the target of the click and sending it to the delete book prototype function
    ui.deleteBook(e.target);

    //Delete from local storage
    //since the x isnt wrapped into any element like an i tag its apart of the a-tag and the parent of that is the td tag. we want the isbn num which is in the row beside
    // so that is the previous element sibling and to get the data in it we need to get the text content
    StoreData.removeBook(e.target.parentElement.previousElementSibling.textContent);

    //sHOW DELETION ALERT
    ui.showAlert('Book removed from inventory!','removal');
    e.preventDefault();
})
