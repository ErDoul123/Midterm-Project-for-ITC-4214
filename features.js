$(document).ready(function() {

    var books = [];

    //add a book to the list
    function addBook(name, rating) {
        var book = {name: name, rating: rating};
        books.push(book);
        updateList();
    }

    //delete a book from the list
    function deleteBook(index) {
        books.splice(index, 1);
        updateList();
    }

    //update the list of books
    function updateList() {

        // clear the list
        $('#book-list').empty();

        // add book to the list
        $.each(books, function(index, book) {

            var row = $('<tr>');
            row.append($('<td>').text(book.name));
            row.append($('<td>').text(book.rating));
            row.append($('<td>').html('<button class="delete-btn">Delete</button>'));
            $('#book-list').append(row);

        });
    }

    // sorts the list of books by name or rating
    function sortList(sortBy) {
        books.sort(function(a, b) {
            if (sortBy == 'name')
            {
                return a.name.localeCompare(b.name);
            }

            else if (sortBy == 'rating')
            {
                return b.rating - a.rating;
            }
        });
        
        updateList();
    }



    //form submission
    $('#add-form').submit(function(event) {
        event.preventDefault();
        var name = $('#name-input').val();
        var rating = parseFloat($('#rating-input').val());
        if (name && rating >= 0 && rating <= 10) {
            addBook(name, rating);
            $('#name-input').val('');
            $('#rating-input').val('');
        }
    });

    //delete button
    $(document).on('click', '.delete-btn', function() {
        var index = $(this).closest('tr').index();
        deleteBook(index);
    });

    //short button
    $('#sort-name-btn').click(function() {
        sortList('name');
    });

    $('#sort-rating-btn').click(function() {
        sortList('rating');
    });
});
