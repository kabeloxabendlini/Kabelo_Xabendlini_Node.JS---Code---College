"use strict"; 
// Enables strict mode to catch common JavaScript errors 
// and enforce safer coding practices

// Export an object containing common MIME types for different file formats
module.exports = {
    html: {
        "Content-Type": "text/html"  // MIME type for HTML files
    },
    text: {
        "Content-Type": "text/plain" // MIME type for plain text files
    },
    js: {
        "Content-Type": "text/js"    // MIME type for JavaScript files
    },
    jpg: {
        "Content-Type": "image/jpg"  // MIME type for JPEG image files
    },
    png: {
        "Content-Type": "image/png"  // MIME type for PNG image files
    },
    css: {
        "Content-Type": "text/css"   // MIME type for CSS files
    }
};

// Notes:
// 1. module.exports allows this object to be imported and used in other modules.
// 2. Each key (html, text, js, jpg, png, css) represents a type of content your server might serve.
// 3. The "Content-Type" property is used in HTTP headers to tell the browser what type of content is being sent.
//    This ensures the browser handles the content correctly (e.g., rendering HTML, executing JS, displaying images, or applying CSS).