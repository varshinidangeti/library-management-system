const db = require('../config/db');
const {query} = require("express");

const User = {
    createUser: function (name, email, password, city, phone, gender, callback) {
        db.query('SELECT * FROM users WHERE email = ?', [email], (error, existingResults) => {
            if (error) {
                console.log(error)
                return callback(error);
            }
            if (existingResults.length > 0) {
                const errorMessage = "Email is already registered";
                return callback(errorMessage);
            }
            db.query('INSERT INTO users (name, email, password, city, phone, gender) VALUES (?, ?, ?, ?, ?, ?)', [name, email, password, city, phone, gender], function (err, results) {
                if (err) {
                    console.log(err)
                    return callback(err);
                }
                callback(null, results.insertId);
            });
        });
    },

    findByEmail: function (email) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM users WHERE email = ?', [email], (error, results) => {
                if (error) {
                    return reject(error);
                }
                if (results.length === 0) {
                    return resolve(null);
                }
                const user = results[0];
                resolve({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    password: user.password,
                    city: user.city,
                    phone: user.phone,
                    gender: user.gender
                });
            });
        });
    },

    viewBooks: function (callback) {
        db.query('SELECT * FROM books', (err, results) => {
            if (err) {
                return callback(err);
            }
            return callback(null, results);
        });
    },

    viewPopularBooks: function (callback) {
        db.query('SELECT * FROM books ORDER BY book_purchase DESC LIMIT 6', (err, results) => {
            if (err) {
                return callback(err);
            }
            return callback(null, results);
        });
    },

    getBookDetailsById: function (bookId, callback) {
        db.query('SELECT * FROM books WHERE book_id = ?', [bookId], (err, results) => {
            if (err) {
                return callback(err);
            }
            if (results.length === 0) {
                return callback(new Error('Book not found'));
            }
            const bookDetails = results[0];
            const category = bookDetails.book_category;
            db.query('SELECT * FROM books WHERE book_category = ? AND book_id != ?', [category, bookId], (err, categoryResults) => {
                if (err) {
                    return callback(err);
                }
                const response = {
                    bookDetails: bookDetails,
                    booksInSameCategory: categoryResults
                };
                return callback(null, response);
            });
        });
    },

    getFilteredBooks: function (priceRange, category, author, callback) {
        let query = 'SELECT * FROM books WHERE 1=1';
        const queryParams = [];

        if (priceRange) {
            const [minPrice, maxPrice] = priceRange.split('-').map(Number);
            query += ' AND book_price BETWEEN ? AND ?';
            queryParams.push(minPrice, maxPrice);
        }

        if (category) {
            const categories = category.split(',');
            query += ' AND book_category IN (?)';
            queryParams.push(categories);
        }

        if (author) {
            query += ' AND book_author LIKE ?';
            queryParams.push(`%${author}%`);
        }

        db.query(query, queryParams, (err, results) => {
            if (err) {
                return callback(err);
            }
            return callback(null, results);
        });
    },
    getAllUsers: function (callback) {
        db.query('SELECT * FROM users', function (err, results) {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    getUserById: function (userId, callback) {
        db.query('SELECT * FROM users WHERE id = ?', [userId], function (err, results) {
            if (err) {
                return callback(err);
            }
            if (results.length === 0) {
                return callback('User not found', null);
            }
            callback(null, results[0]);
        });
    },

    getUserOrders: function (userId, callback) {
        db.query(`SELECT DISTINCT
                bi.request_id,
                bi.book_id,
                bi.user_id,
                bi.issue_date,
                bi.due_date,
                bi.fine,
                b.book_name,
                b.book_img,
                b.book_author,
                bi.is_returned
            FROM book_issues AS bi
                     JOIN books AS b ON bi.book_id = b.book_id
            WHERE bi.user_id = ?
              AND bi.is_issued = 'Yes';`, [userId], function (err, results) {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },


    addBookRequest: function (bookId, userId, callback) {
        const requestId = Math.floor(100000 + Math.random() * 900000);
        db.query("INSERT INTO book_issues (request_id, book_id, user_id, is_issued) VALUES ( ?,?, ?, DEFAULT)", [requestId, bookId, userId], function (err, results) {
            if (err) {
                return callback(err);
            } else {
                return callback(null, results);
            }
        });
    }
    ,

    getRequestedBooks: function (userId, callback) {
        const query = `
            SELECT *
            FROM books
            WHERE book_id IN (SELECT book_id
                              FROM book_issues
                              WHERE user_id = ?
                                AND is_issued = 'No')
        `;

        db.query(query, [userId], function (err, results) {
            if (err) {
                return callback(err);
            }
            return callback(null, results);
        });
    },

    deleteBookRequest: function (bookId, userId, callback) {
        const query = "DELETE FROM book_issues WHERE book_id = ? AND user_id = ?";

        db.query(query, [bookId, userId], function (err, results) {
            if (err) {
                return callback(err);
            }
            return callback(null, results);
        });
    },

    viewIssuedBooks: function (userId, callback) {
        const query = `
            SELECT DISTINCT
                bi.request_id,
                bi.book_id,
                bi.user_id,
                bi.issue_date,
                bi.due_date,
                bi.fine,
                b.book_name,
                b.book_img,
                b.book_author,
                bi.is_returned
            FROM book_issues AS bi
                     JOIN books AS b ON bi.book_id = b.book_id
            WHERE bi.user_id = ?
              AND bi.is_issued = 'Yes';

        `;

        db.query(query, [userId], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    },

    returnBook: function (requestId, callback) {
        const query = `
        UPDATE book_issues 
        SET is_returned = 'Yes' 
        WHERE is_issued = 'Yes' 
        AND DATEDIFF(due_date, issue_date) <= 15 
        AND request_id = ?;
    `;
        db.query(query, [requestId], (err, result) => {
            if (err) {
                return callback(err, null);
            }
                const query2 = `UPDATE books set book_quantity = book_quantity +1  where book_id = (SELECT  book_id from book_issues where request_id = ?) `
                db.query(query2, [requestId], (err, results) => {
                    if (err) {
                        return callback(err,null);
                    }
                })
            callback(null, result);
        });
    },

    getFines :function (userId, callback) {
        const query = `
        SELECT DISTINCT
            bi.request_id,
            bi.book_id,
            bi.user_id,
            bi.issue_date,
            bi.due_date,
            bi.fine,
            b.book_name,
            b.book_img,
            b.book_author
        FROM book_issues AS bi
        JOIN books AS b ON bi.book_id = b.book_id
        WHERE bi.user_id = ?
          AND bi.is_issued = 'Yes'
          AND bi.is_returned = 'No'
          AND bi.issue_date IS NOT NULL
          AND bi.due_date IS NOT NULL
          AND bi.fine IS NOT NULL
          AND bi.fine > 0;
    `;

        db.query(query, [userId], function (err, results) {
            if (err) {
                console.error("Database query error:", err);
                return callback(err, null);
            }
            callback(null, results);
        });
    },

    payFine: function (requestId, callback) {
        const query = `
        UPDATE book_issues SET fine = NULL WHERE request_id = ?;`
        db.query(query, [requestId], function (err, results) {
            if (err){
                return callback(err, null);
            }
            callback(null, results);
        })

    },
    
    







};

module.exports = User;
