//THIS FILE USES ES5 PROTOTYPING
//Book constuctor

function Book(title,author,ISBN)
{
    this.title=title;
    this.author=author;
    this.ISBN=ISBN;
}

//UI Constructor
function UI() {}

// UI prototype for adding a book
 UI.prototype.addBookToList = function(book)
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

//Show Alerts
UI.prototype.showAlert= function(message,className)
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

//Delete book
UI.prototype.deleteBook = function(target)
{
    if (target.className ==='delete')
    {
        target.parentElement.parentElement.remove();
    }
}

//Clear Fields
UI.prototype.clearFields= function()
{
    document.getElementById('title').value='';
    document.getElementById('author').value='';
    document.getElementById('ISBN').value='';
}

//Event Listeners

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

    //sHOW DELETION ALERT
    ui.showAlert('Book removed from inventory!','removal');
    e.preventDefault();
})
