const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json'); 

const app = express();
const port = 3000;

// Configura la connessione al database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'store'
});

// Connetti al database
db.connect((err) => {
  if (err) {
    console.error('Errore di connessione al database:', err);
  } else {
    console.log('Connesso al database');
  }
});

app.use(cors());

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// Esempio di endpoint per ottenere tutti i prodotti
app.get('/prodotti', (req, res) => {
  const getProductsQuery = 'SELECT * FROM products';
  db.query(getProductsQuery, (err, results) => {
    if (err) {
      console.error('Errore durante la query:', err);
      res.status(500).send('Errore interno del server');
    } else {
      res.json(results);
    }
  });
});

app.get('/utenti', (req, res) => {
  const getProductsQuery = 'SELECT * FROM customers';
  db.query(getProductsQuery, (err, results) => {
    if (err) {
      console.error('Errore durante la query:', err);
      res.status(500).send('Errore interno del server');
    } else {
      res.json(results);
    }
  });
});

//crea endpoint per ottenere l'impiegato con email e password specifici
app.get('/impiegati/:email/:password', (req, res) => {
  const email = req.params.email;
  const password = req.params.password;
  const getProductsQuery = `SELECT * FROM employees WHERE email = '${email}' AND pwd = '${password}'`;
  db.query(getProductsQuery, (err, results) => {
    if (err) {
      console.error('Errore durante la query:', err);
      // res.render({ "employeeNumber": 111, "lastName": "admin", "firstName": "admin", "extension": "", "email": "admin@mail.it", "officeCode": "1", "reportsTo": null, "jobTitle": "Sistemista", "pwd": "627875803c550ed188130bada97e51aa11db572877cd9adc8c1aeced41b617c7" });

    } else {
      res.json(results);
    }
  });
});

app.get('/impiegati', (req, res) => {
  const getProductsQuery = 'SELECT * FROM employees';
  db.query(getProductsQuery, (err, results) => {
    if (err) {
      console.error('Errore durante la query:', err);
      res.status(500).send('Errore interno del server');
    } else {
      res.json(results);
    }
  });
});

app.listen(port, () => {
  console.log(`Server in ascolto sulla porta ${port}`);
});
