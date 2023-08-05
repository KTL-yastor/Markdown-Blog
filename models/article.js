const mongoose = require('mongoose');
const marked = require('marked', {mangle: false}); // konwertuje markdown na html
const slugify = require('slugify'); // tworzy linki do artykułów
const createDomPurify = require('dompurify'); // filtruje kod html
const { JSDOM } = require('jsdom'); // tworzy dom, który jest potrzebny do filtracji kodu html

const dompurify = createDomPurify(new JSDOM().window); // tworzymy dom, który jest potrzebny do filtracji kodu html


// tworzymy schemat, który będzie zawierał pola, które będą w bazie danych
const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true // pole jest wymagane
    },
    description: {
        type: String
    },
    markdown: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now // domyślna wartość, jeśli nie zostanie podana
    },
    slug: {
        type: String,
        required: true,
        unique: true // unikalny link do artykułu
    },
    sanitizedHtml: {
        type: String,
        required: true

    }
    
}); 

// tworzymy funkcję, która będzie wywoływana przed zapisaniem artykułu w bazie danych
articleSchema.pre('validate', function(next) {
    if (this.title) {
        this.slug = slugify(this.title, { lower: true, strict: true }); // tworzymy link do artykułu, który będzie zawierał tytuł artykułu
    }
    if (this.markdown) {
        this.sanitizedHtml = dompurify.sanitize(marked.parse(this.markdown)); // filtrujemy kod html
    }
    next(); // wywołujemy funkcję next, aby przejść do następnego middleware

}); 

// eksportujemy model, który będzie zawierał schemat
module.exports = mongoose.model('Article', articleSchema); // model nazywa się Article, a schemat articleSchema