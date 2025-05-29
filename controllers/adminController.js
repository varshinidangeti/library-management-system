const Book = require('../models/book'); // Import the Book model
const User = require('../models/user'); // Import the User model

const AdminController = {
    allUsers: function (req, res) {
        User.getAllUsers((err, users) => {
            if (err) {
                return res.status(500).json({error: 'Failed to fetch users'});
            }
            res.render('admin/dashboard', {users});
        });
    },

    getUserOrders: function (req, res) {
        const userId = req.params.userId;
        User.getUserById(userId, (err, user) => {
            if (err) {
                return res.status(500).json({error: 'Failed to fetch user details'});
            }
            User.getUserOrders(userId, (err, orders) => {
                if (err) {
                    return res.status(500).json({error: 'Failed to fetch orders'});
                }
                console.log(orders);
                // return res.send(orders);
                res.render('admin/viewOrders', {user, orders});
            });
        });
    },

    addBook: function (req, res) {
        const {title, category, author, description, price, quantity} = req.body;
        const image = req.file.filename;

        Book.createBook(title, category, author, description, image, price, quantity, (err, bookId) => {
            if (err) {
                return res.status(500).json({error: 'Failed to add book'});
            }

            Book.viewBooks((err, books) => {
                if (err) {
                    return res.status(500).json({error: 'Failed to fetch Books'});
                }
                res.render('admin/addBook', {books});
            });
        });
    },

    getBookDetails: function (req, res) {
        const bookId = req.params.bookId;
        Book.getBookDetails(bookId, (err, book) => {
            if (err) {
                return res.status(500).json({error: 'Failed to fetch book details'});
            }
            res.json(book);
        });
    },

    updateBook: function (req, res) {
        const bookId = req.params.bookId;
        const {title, category, author, description, price, quantity} = req.body;
        const image = req.file ? req.file.filename : null;

        Book.updateBook(bookId, title, category, author, description, image, price, quantity, (err) => {
            if (err) {
                return res.status(500).json({error: 'Failed to update book'});
            }
            res.redirect('/admin/addBook');
        });
    },

    deleteBook: function (req, res) {
        const bookId = req.params.bookId;
        Book.deleteBook(bookId, (err) => {
            if (err) {
                return res.status(500).json({error: 'Failed to delete book'});
            }
            res.status(204).end();
        });
    },

    issueBook: function (req, res) {
        const bookId = req.body.bookId;
        const userId = req.body.userId;
        Book.issueBook(bookId, userId, (err, book) => {
            if (err) {
                return res.status(500).json({error: 'Failed to update book'});
            } else {
                res.send("Issue " + bookId);
            }
        })
    },


    rejectBook: function (req, res) {
        const bookId = req.body.bookId;
        const userId = req.body.userId;

        Book.rejectIssue(bookId, userId, (err) => {
            if (err) {
                return res.status(500).json({error: 'Failed to delete book'});
            } else {
                res.send("Rejected " + bookId);
            }
        })
    },

    getIssueRequests(req, res) {
        Book.getBookRequests((err, books) => {
            if (err) {
                return res.status(500).json({error: 'Failed to get books'});
            } else {
                // res.json(books);
                res.render('admin/book_requests', {books});
            }
        })
    },

    viewIssuedBooks: function (req, res) {
        Book.viewIssuedBooks((err, books) => {
            if (err) {
                return res.status(500).json({error: 'Failed to get books'});
            }else{
                res.render('admin/issuedBooks', {books});
                // res.send(books);
            }
        })
    },

    setFine: function (req, res) {
        const requestId = req.body.requestId;
        const fine = req.body.fine;
        Book.setFine(requestId, fine,(err, book) => {
            if (err) {
                return res.status(500).json({error: 'Failed to set Fine'});
            }else{
                res.status(200).json({success: true});
            }
        });
    },

    getFines: function (req, res) {
        Book.getFines((err, books) => {
            if (err) {
                return res.status(500).json({error: 'Failed to get books'});
            }else{
                res.render('admin/fines', {books});
            }
        })
    }



};

module.exports = AdminController;













