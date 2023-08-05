const express = require('express');
const router = express.Router(); // pozwala na tworzenie ścieżek w aplikacji 
const Article = require('./../models/article'); // importujemy model article.js

// ścieżka do strony głównej, czyli localhost:3000/articles')
router.get('/new', (req, res) => {
    res.render('articles/new', {title : 'New article', article: new Article()}); // renderujemy plik new.ejs z folderu articles, przekazujemy pusty obiekt, aby nie było błędu, że nie ma takiego obiektu

}); 

router.get('/:slug', async (req, res) => {
    const article = await Article.findOne({ slug: req.params.slug }); // szukamy artykułu po id
    if (article == null) res.redirect('/'); // jeśli nie ma artykułu, to przekierowujemy na stronę główną
    res.render('articles/show', { article: article }); // jeśli jest artykuł, to renderujemy stronę show.ejs z folderu articles, przekazujemy artykuł i tytuł artykułu
});

router.get('/edit/:id', async (req, res) => {

    const article = await Article.findById(req.params.id); // szukamy artykułu po id
    res.render('articles/edit', { article: article }); // renderujemy stronę edit.ejs z folderu articles, przekazujemy artykuł i tytuł artykułu


});

router.post('/edit/:id', async (req, res) => {

    //console.log(req.body);
    let article = await Article.findById(req.params.id); // szukamy artykułu po id
    // edytowanie znalezionego artykułu 

    article.title = req.body.title;
    article.description = req.body.description;
    article.markdown = req.body.markdown;

    try {
        article = await article.save(); // zapisujemy artykuł w bazie danych
        res.redirect(`/articles/${article.id}`); // przekierowujemy na stronę artykułu, który został dodany
    }
    catch (e) {
        console.log(e);
        res.render('articles/edit', { article: article }); // jeśli wystąpi błąd, to renderujemy stronę edit.ejs z błędem
    }

});

router.post('/delete/:id', async (req, res) => {

    await Article.findByIdAndDelete(req.params.id)
    
    res.redirect('/'); // przekierowujemy na stronę główną

});

router.post('/', async (req, res) => {
    const article = new Article({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown
        
    });

    try {
        const newArticle = await article.save(); // zapisujemy artykuł w bazie danych
        res.redirect(`/articles/${newArticle.slug}`); // przekierowujemy na stronę artykułu, który został dodany
    }
    catch (e) {
        console.log(e);
        res.render('articles/new', { article:article }); // jeśli wystąpi błąd, to renderujemy stronę new.ejs z błędem
    }

});

module.exports = router; // eksportujemy router, aby móc go użyć w innych plikach, czyli np w server.js musimy zaimportować ten plik, aby móc użyć router'a