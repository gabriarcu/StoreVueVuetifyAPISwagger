const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const jwt = require('jsonwebtoken');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const verifyToken = require('./middleware/authMiddleware');

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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/login', (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  console.log(email);
  console.log(password)
  // Query the database to retrieve hashed password for the provided username
  db.query('SELECT * FROM employees WHERE email = ?', [email], (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const user = results[0];
    console.log(user);
    // Compare provided password with hashed password from the database
    if (password !== user.pwd) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    // Generate JWT token upon successful authentication
    const token = jwt.sign({ userId: user.employeeNumber, name: user.lastName }, process.env.JWT_KEY);
    // const token = jwt.sign({ userId: user.employeeNumber, name: user.lastName }, "paleocapa");
    res.json({ user, token });

  });
});

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
  db.query(getProductsQuery,verifyToken, (err, results) => {
    if (err) {
      console.error('Errore durante la query:', err);
      res.status(500).send('Errore interno del server');
      res.status(200).json({ message: 'Protected route accessed' });

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
