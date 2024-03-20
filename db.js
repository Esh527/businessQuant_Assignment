const express = require("express");
const path = require("path");


const mysql = require('mysql');

const app = express();
const dbPath = path.join(__dirname, "stocks_db.db");
let db = null;

//DB initializetion

const initializeDBandServer = async () => {
    try {
        db = mysql.createConnection({
                host: "localhost",
                user: "root",
                password: "Hari_123",
                database: "stocks_db",
                connectionLimit: 10
        });

        db.connect((err) => {
            if (err) {
                console.error('Error connecting to database: ', err.message);
                process.exit(1);
            }
            console.log('Connected to the database.');
        });

        app.listen(3000, () => {
            console.log("Server is Running at http://localhost:3000/");
        });

    } catch (e) {
        console.log(`DB Error ${e.message}`);
        process.exit(1);
    }
};

initializeDBandServer();




//Get all Stocks API
app.get("/stocks", async (request, response) => {
   
        const getEducationDetails = `SELECT * FROM sample_data;`;
    db.query(getEducationDetails, (err, rows) => {
        if (err) {
            console.error('Error: ', err.message);
            response.status(500).send('Internal Server Error');
            return;
        }
        response.send(rows);
    });
});

//Get all the tickerfrom Stocks API
app.get("/stocks/ticker=:ticker/", async (req, res) => {
    const { ticker } = req.params;
    const getTicketQuery = `SELECT * FROM sample_data WHERE ticker = '${ticker}';`;
    db.query(getTicketQuery, (err, rows) => {
        if (err) {
            console.error('Error: ', err.message);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.send(rows);
    });
});

//Get all the revenue from Stocks API
app.get("/stocks/revenue=:revenue", async (req, res) => {
    try {
        const { revenue } = req.params;
       
        
        const getRevenueQuery = `SELECT * FROM sample_data WHERE revenue = ${revenue};`;
        console.log('SQL Query:', getRevenueQuery);

        db.query(getRevenueQuery, (err, rows) => {
            if (err) {
                console.error('Error: ', err.message);
                res.status(500).send('Internal Server Error');
                return;
            }
            res.send(rows);
        });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send('Internal Server Error');
    }
});

//Get all the ticker and  revenue from Stocks API
app.get("/stocks/ticker=:ticker/revenue=:revenue", async (req, res) => {
    try {
        const { ticker, revenue } = req.params;

        
        const revenueNumber = Number(revenue);

        
        const getTickerQuery = `SELECT * FROM sample_data WHERE ticker = '${ticker}' AND revenue = ${revenueNumber};`;

        
        console.log('SQL Query:', getTickerQuery);

        
        db.query(getTickerQuery, (err, result) => {
            if (err) {
                console.error('Error executing query:', err.message);
                res.status(500).send('Internal Server Error');
                return;
            }
        

            
            res.send(result);
        });
    } catch (error) {
        
        console.error('Error:', error.message);
        res.status(500).send('Internal Server Error');
    }
});



//Get all the ticker, revenue and period from Stocks API

app.get('/stocks/ticker=:ticker/revenue=:revenue/period=:period', async (req, res) => {
    try {
         const ticker = req.params.ticker.toUpperCase();
    const revenue = req.params.revenue.split(',').map(col => col.trim()).join(',');
    const period = req.params.period;
    const query = `SELECT ${revenue} FROM sample_data WHERE ticker = '${ticker}' AND date >= NOW() - INTERVAL ${period} YEAR`;
    db.query(query, (err, rows) => {
        if (err) {
                            console.error('Error: ', err.message);
                            res.status(500).send('Internal Server Error');
                            return;
                        }
                        res.send(rows);
                    });
                }catch (error) {
                                console.error('Error:', error.message);
                                res.status(500).send('Internal Server Error');
                            }
  });



// const express = require("express");
// try {
//     const [rows] = await pool.query(query, [ticker, period]);
//     res.json(rows);
//   } catch (error) {
//     console.error('Error executing query: ', error);
//     res.status(500).send('Error retrieving data');
//   }

// const path = require("path");

// const { open } = require('mysql')
// const app = express();
// const dbPath = path.join(__dirname, "my_details.db");
// let db = null;

// const initializeDBandServer= async ()=>{
//     try{
//         db= await open({
//             filename: dbPath,
//             driver: mysql.database,
        
//         });
//         app.listen(3000, ()=>{
//             console.log("Server is Running at http://localhost:3000/")
//         });

//     }catch (e){
//         console.log(`DB Error ${e.message}`);
//         process.exit(1);
//     }
// };
// initializeDBandServer();

// // const {createPool} = require("mysql");
// // const pool = createPool({
// //     host: "localhost",
// //     user: "root",
// //     password: "Hari_123",
// //     database: "my_details",
// //     connectionLimit: 10
// // })

// // pool.query('SELECT * FROM my_details.education WHERE Percentage>60;', (err, result, fields)=>{
// //     if(err){
// //         return console.log(err);
// //     }else{
// //         return console.log(result)
// //     }
// // })

// app.get("/education", async(request, response) =>{
//     const getEducationDetails =`SELECT * FROM my_details.education WHERE Percentage>60;`
//     const educationDetails = await db.all(getEducationDetails);
//     response.send(educationDetails);
// });