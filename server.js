const express = require('express');
const articlesRouter = require('./routes/articles'); // importujemy router z pliku articles.js
const app = express();

app.set('view engine', 'ejs');

// app.use() - używamy, aby dodać middleware do aplikacji, w tym przypadku zaimportowany router

app.use('/articles', articlesRouter) //dodajemy /articles, aby nie musieć go dodawać w każdym pliku w routes/articles.js 



app.get('/', (req, res) => {
    const asticles = [{
        title: 'Test Article',
        createdAt: new Date(),
        description: 'Test Description'

    }];
    res.render('index', { title: 'Home' , articles: asticles});
});


const port = 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
