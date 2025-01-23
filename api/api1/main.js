const express = require('express');
const app = express();

const mySql = require('mysql2');
const bodyParser = require('body-parser');

const con = mySql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'productsdata'
});

con.connect((err) => {
    if (err) throw err;
    console.log('connected successfully');
})



app.get('/', (req, res) => {
    let sql = `select id,name,price from productlist where id in(1,2,3)`;
    let real = [];
    con.query(sql, async (err, dt) => {
        if (err) throw err;
        for (let i in dt) {
            // console.log(dt[i]);
            var s = [];
            let sql = `select * from products_images where id= ${dt[i].id}`
            // console.log(sql);
            let promise = new Promise((res, rej) => {
                con.query(sql, (err, idt) => {
                    if (err) rej(err);
                    res(idt)
                })
            })

            let mydt = await promise;
            for (m in mydt) {
                s.push(mydt[m]);
            }

            let d = dt[i];
            d.pictures = s;

            


            var sql2 = `select * from product_reviews where pid = ${dt[i].id}`
            var r = [];
            let promise2 = new Promise((res,rej)=>{
                con.query(sql2, async (err , reviewdt)=>{
                    if(err) rej(err);
                    res(reviewdt)
                })
            })

            var newRevDt = await promise2
            for(x in newRevDt){
                // console.log(newRevDt[x]);
                r.push(newRevDt[x])
            }
            
            d.reviews = r;

            real.push(d)
            
            
        }
        console.log(real);

        res.send(real)


    })

});


app.listen(3000, () => {
    console.log('listening on port 3000');
})