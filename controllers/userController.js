const User = require("../models/user");
const {hashSync, genSaltSync, compareSync} = require("bcrypt");
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config/config");

const userController = {
    // register
    register: function (req, res) {
        const {name, email, password, city, phone, gender} = req.body;
        // const salt = "password";
        // const newPassword = hashSync(password, salt);
        User.createUser(name, email, password, city, phone, gender, (err, userId) => {

            if (err) {
                console.log(err);
                return res.render('message', {message: "Email already exist"});
                // return res.status(500).json({ error: "Failed to register" });
            }
            res.redirect("/user/userLogin");
        });
    },

    login: async function (req, res) {
        const {email, password} = req.body;
        try {
            const user = await User.findByEmail(email);
            console.log(user);
            // if (!user) return res.status(404).json({ error: "User not found" });
            if (!user) return res.render('message', {message: "User not found"});


            if (password === user.password) {
                const token = jwt.sign({id: user.id, email: user.email}, JWT_SECRET);
                res.cookie("token", token, {httpOnly: true});
                res.cookie("userId", user.id, {httpOnly: true});
                res.redirect("/user/index");

            } else {
                return res.render('message', {message: "Invalid Credentials"});
                // res.status(401).json({ error: "Invalid credentials" });
            }
        } catch (error) {
            console.error("Login Error:", error);
            res.status(500).json({error: "Internal server error"});
        }
    },

    logout: (req, res) => {
        const cookies = req.cookies;

        // If there are cookies, clear them
        if (cookies) {
            for (const cookieName in cookies) {
                // Clear each cookie by setting its value to an empty string and its maxAge to 0
                res.clearCookie(cookieName); //Or you can set maxAge to 0, which also works
                //res.cookie(cookieName, '', { maxAge: 0 });
            }
        }
        res.redirect('../');
    },
    getBookDetails: function (req, res) {
        User.viewBooks((err, books) => {
            if (err) {
                return res.status(500).json({error: "Failed to fetch Books"});
            }
            const cart = req.session.cart || [];
            return res.render("user/books", {books, cart, user: req.user});
        });
    },

    getBooksByPopular: function (req, res) {
        User.viewPopularBooks((err, books) => {
            if (err) {
                return res.status(500).json({error: "Failed to fetch Books"});
            }
            return res.render("user/index", {user: req.user, books});
        });
    },

    getBookDetailsById: function (req, res) {
        const bookId = req.params.bookId;
        User.getBookDetailsById(bookId, (err, book) => {
            if (err) {
                return res.status(500).json({error: "Failed to fetch book details"});
            }
            const {bookDetails, booksInSameCategory} = book;
            return res.render("user/book_details", {book: {bookDetails}, booksInSameCategory, user: req.user});
        });
    },


    
    // This url also works for request book
    addToCart: function (req, res) {
        const bookId = req.body.bookId;
        const userId = req.cookies.userId;
        User.getBookDetailsById(bookId, async (err, book) => {
            if (err) {
                return res.status(500).json({error: "Failed to fetch book details"});
            }
            if (!book) {
                return res.status(404).json({error: "Book not found"});
            }
            if (book.bookDetails.book_quantity <= 0) {
                return res.status(404).json({error: "Book not found"});
            }

            User.addBookRequest(bookId, userId, function (err, book) {
                if (err) {
                    return res.status(500).json({error: "Failed to add Book request"});
                }
            })
            if (!req.session.cart) {
                req.session.cart = [];
            }
            const existingBookIndex = req.session.cart.findIndex(item => item.bookDetails.book_id === book.bookDetails.book_id);
            if (existingBookIndex >= 0) {
                req.session.cart[existingBookIndex].bookDetails.quantity += 1;
            } else {
                book.bookDetails.quantity = 1;
                req.session.cart.push(book);
            }
            res.json({message: "Book added to cart successfully", cart: req.session.cart});
        });
    },


    getCart: function (req, res) {
        const cart = req.session.cart || [];
        res.render("user/cart", {cart, user: req.user});
    },

    updateCartQuantity: function (req, res) {
        const {bookId} = req.params;
        const {action} = req.body;
        const cart = req.session.cart;
        const item = cart.find(item => item.bookDetails.book_id == bookId);
        if (item) {
            if (action === "increase") {
                item.bookDetails.quantity += 1;
            } else if (action === "decrease" && item.bookDetails.quantity > 1) {
                item.bookDetails.quantity -= 1;
            }
            res.json({success: true, cart});
        } else {
            res.json({success: false});
        }
    },

    removeFromCart: function (req, res) {
        const {bookId} = req.params;
        const cart = req.session.cart;
        const itemIndex = cart.findIndex(item => item.bookDetails.book_id == bookId);
        if (itemIndex > -1) {
            cart.splice(itemIndex, 1);
            res.json({success: true, cart});
        } else {
            res.json({success: false});
        }
    },

    checkout: function (req, res) {
        const user = req.user;
        const cart = req.session.cart || [];
        res.render("user/checkout", {user, cart});
    },

    payForm: function (req, res) {
        const {userName, userEmail, userAddress, userCity, userPostalCode} = req.body;
        req.session.cart = [];
        res.redirect('/user/success');
    },

    getFilteredBooks: function (req, res) {
        const {priceRange, category, author} = req.query;
        User.getFilteredBooks(priceRange, category, author, (err, books) => {
            if (err) {
                return res.status(500).json({error: 'Failed to fetch Books'});
            }
            return res.json(books);
        });
    },

    getRequestedBooks: function (req, res) {
        const userId = req.cookies.userId;

        User.getRequestedBooks(userId, (err, books) => {
            if (err) {
                return res.status(500).json({error: 'Failed to fetch Books'});
            } else {
                // res.json(books);
                return res.render("user/requested_books", {books: books, user: req.user});
            }
        })
    },


    deleteBookIssueRequest: function (req, res) {
        const userId = req.cookies.userId;
        const bookId = req.params.bookId;
        User.deleteBookRequest(bookId, userId, (err, book) => {
            if (err) {
                return res.status(500).json({error: 'Failed to delete the book request'});
            } else {
                return res.status(200).json({success: true, message: 'Book issue request deleted'});
            }
        })
    },

    viewIssuedBooks: function (req, res) {
        const userId = req.cookies.userId;

        User.viewIssuedBooks(userId, (err, books) => {
            if (err) {
                return res.status(500).json({error: 'Failed to view the books'});
            }else{
                res.render("user/issuedBooks", {books: books, user: req.user});
            }
        })
    },

    returnBook: function (req, res) {
        const requestId = req.query.requestId;
        User.returnBook(requestId, (err, book) => {
            if (err) {
                return res.status(500).json({error: 'Failed to returnBook'});
            }else{
                res.json({success: true, book: book});
            }
        })

    },

    getFines: function (req, res) {
        const userId = req.cookies.userId;
        User.getFines(userId, (err, books) => {
            if (err) {
                return res.status(500).json({error: 'Failed to get fined books'});
            }
            else{
                return res.render("user/fines", {books: books, user: req.user});
            }
        })
    },

    payFine: function (req, res) {
        const requestId = req.params.requestId;

        console.log(requestId)
        User.payFine(requestId, (err, book) => {
            if (err) {
                return res.status(500).json({error: 'Failed to pay Fine'});
            }else{
                return res.send({success: true, book: book});
            }
        })
    }




};


module.exports = userController;
