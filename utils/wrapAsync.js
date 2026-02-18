// A utility function to wrap asynchronous route handlers and middleware
// to catch errors and pass them to the next middleware (error handler)
// This helps to avoid repetitive try-catch blocks in each async route handler
// and keeps the code clean and maintainable

// A utility function to wrap asynchronous route handlers and middleware
// to catch errors and pass them to the next middleware (error handler)
// This helps to avoid repetitive try-catch blocks in each async route handler
// and keeps the code clean and maintainable

// Example usage:
// const wrapAsync = require('./utils/wrapAsync');
// app.get('/route', wrapAsync(async (req, res, next) => {
//     // your async code here
// }));

// If an error occurs, it will be passed to the next middleware automatically
module.exports = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    }
};