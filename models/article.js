const mongoose = require('mongoose');


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
    }
    
}); 

// eksportujemy model, który będzie zawierał schemat
module.exports = mongoose.model('Article', articleSchema); // model nazywa się Article, a schemat articleSchema