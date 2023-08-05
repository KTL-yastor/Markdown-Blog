const express = require('express');
const router = express.Router(); // pozwala na tworzenie ścieżek w aplikacji 

// ścieżka do strony głównej, czyli localhost:3000/articles')
router.get('/', (req, res) => {
    res.send('In articles');

}); 


module.exports = router; // eksportujemy router, aby móc go użyć w innych plikach, czyli np w server.js musimy zaimportować ten plik, aby móc użyć router'a