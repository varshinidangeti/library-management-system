const db = require('../config/db');

const Book = {
    createBook: function (title, category, author, description, image, price, quantity, callback) {
        db.query('INSERT INTO books (book_name, book_category, book_author, book_desc, book_img, book_price, book_quantity) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [title, category, author, description, image, price, quantity],
            function (err, results) {
                if (err) {
                    return callback(err);
                }
                callback(null, results.insertId);
            }
        );
    },

    viewUsers: function (callback) {
        db.query('SELECT * FROM users', function (err, results) {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    viewBooks: function (callback) {
        db.query('SELECT * FROM books', function (err, results) {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    getBookDetails: function (bookId, callback) {
        db.query('SELECT * FROM books WHERE book_id = ?', [bookId], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            if (results.length === 0) {
                return callback('Book not found', null);
            }
            const book = results[0];
            console.log("edit book - ", book);
            callback(null, book);
        });
    },

    updateBook: function (bookId, title, category, author, description, image, price, quantity, callback) {
        let query = 'UPDATE books SET book_name = ?, book_category = ?, book_author = ?, book_desc = ?, book_price = ?, book_quantity = ?';
        const values = [title, category, author, description, price, quantity, bookId];

        // Only add the book_img to the query if an image is provided
        if (image) {
            query += ', book_img = ? WHERE book_id = ?';
            values.splice(-1, 0, image);
        } else {
            query += ' WHERE book_id = ?';
        }

        db.query(query, values, (err, result) => {
            if (err) {
                return callback(err);
            }
            callback(null, result);
        });
    },

    deleteBook: function (bookId, callback) {
        db.query('DELETE FROM books WHERE book_id = ?', [bookId], (err, result) => {
            if (err) {
                return callback(err);
            }
            callback(null, result);
        });
    },

    issueBook: function (bookId, userId, callback) {
        const query = `
            UPDATE book_issues
            SET is_issued  = 'Yes',
                issue_date = CURDATE(),
                due_date   = DATE_ADD(CURDATE(), INTERVAL 15 DAY)
            WHERE user_id = ?
              AND book_id = ?;
        `;

        db.query(query, [userId, bookId], function (err, results) {
            if (err) {
                return callback(err);
            }

            const query2 = `UPDATE books SET book_quantity = book_quantity-1 where book_id = ?`;
            db.query(query2, [bookId], function (err, results) {
                if (err) {
                    return callback(err);
                }
            })

            return callback(null, results);
        });
    },


    rejectIssue: function (bookId, userId, callback) {
        const query = `
            UPDATE book_issues
            SET is_issued = 'Rejected'
            WHERE user_id = ?
              AND book_id = ?;
        `;

        db.query(query, [userId, bookId], function (err, results) {
            if (err) {
                return callback(err);
            }
            return callback(null, results);
        });
    },


    getBookRequests: function (callback) {
        const query = `
            SELECT DISTINCT users.id,
                            users.name,
                            books.book_name,
                            books.book_id,
                            books.book_quantity,
                            books.book_img
            FROM book_issues
                     JOIN users ON book_issues.user_id = users.id
                     JOIN books ON book_issues.book_id = books.book_id
            WHERE book_issues.is_issued = 'No';

        `;

        db.query(query, function (err, results) {
            if (err) {
                return callback(err);
            }
            return callback(null, results);
        });
    },

    viewIssuedBooks: function (callback) {
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
        WHERE bi.is_issued = 'Yes'
        AND bi.is_returned = 'No';
    `;

        db.query(query, (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    },

    setFine: function (requestId, fineAmount, callback) {
        const query = `
        UPDATE book_issues 
        SET fine = ? 
        WHERE request_id = ?;
    `;

        db.query(query, [fineAmount, requestId], (err, result) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, result);
        });
    },

    getFines :function ( callback) {
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
        WHERE  bi.is_issued = 'Yes'
          AND bi.is_returned = 'No'
          AND bi.issue_date IS NOT NULL
          AND bi.due_date IS NOT NULL
          AND bi.fine IS NOT NULL
          AND bi.fine > 0;
    `;

        db.query(query,   function (err, results) {
            if (err) {
                console.error("Database query error:", err);
                return callback(err, null);
            }
            callback(null, results);
        });
    }



};

module.exports = Book;
