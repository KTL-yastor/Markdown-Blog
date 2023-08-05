const express = require('express');
const mongoose = require('mongoose');
const Article = require('./models/article'); // importujemy model article.js
const articlesRouter = require('./routes/articles'); // importujemy router z pliku articles.js
const app = express();
mongoose.connect('mongodb://127.0.0.1/blog', { useNewUrlParser: true, useUnifiedTopology: true }).then(()=> console.log("Connected to database")) // połączenie z bazą danych
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false })); // pozwala na używanie req.body w pliku articles.js

// app.use() - używamy, aby dodać middleware do aplikacji, w tym przypadku zaimportowany router
app.use('/articles', articlesRouter) //dodajemy /articles, aby nie musieć go dodawać w każdym pliku w routes/articles.js 



app.get('/', async(req, res) => {

    //pobranie z bazy danych wszystkich artykułów i przekazanie ich do renderowania
    const asticles = await Article.find().sort({ createdAt: 'desc' });
    

    
    res.render('articles/index', { title: 'Home' , articles: asticles});
});


const port = 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
