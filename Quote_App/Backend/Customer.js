class Customer {
    constructor(app, db) {
        this.getCustomers(app, db);
    }

    //get all customer record from the DB
    getCustomers(app, db) {
        app.get('/getCustomers', (req, res) => {
            db.query('SELECT idCustomer, CompanyName, TaxNumber, City FROM Customer', (error, data, fields) => {
                console.log('Customer data: ' + JSON.stringify(data));
                let columns = {
                    idCustomer: 'Azonosító',
                    CompanyName: 'Cégnév',
                    TaxNumber: 'Adószám',
                    City: 'Város'
                };

                if (data && data.length > 0) {
                    res.json({
                        success: true,
                        data: JSON.stringify(data),
                        columnNames: JSON.stringify(columns)
                    });
                    return true;
                } else {
                    res.json({
                        success: false,
                        msg: 'Nem található vevő a rendszerben!'
                    });
                }
            });
            return;
        });
    }

    //insert new customer in the DB
    newCustomers(app, db) {
        app.get('/newCustomer', (req, res) => {
            db.query('SELECT key FROM Parameter WHERE key = lastCustomerId LIMIT 1', (error, data) => {
                //insert query
                console.log(JSON.stringify(data));
                let newId = (parseInt(data) + 1).toString();
                let insertQuery = `INSERT INTO Customer (idCustomer, CompanyName, TaxNumber, City, Country, Address, PostalCode, BankAccount, Website) 
                VALUES (${newId}, ${req.session.CompanyName}, ${req.session.TaxNumber}, 
                ${req.session.City}, ${req.session.Country}, ${req.session.Address}, ${req.session.PostalCode}, 
                ${req.session.BankAccount}, ${req.session.Website})`;

                db.query(insertQuery, (error, result) => {
                    console.log('Customer inserted: ' + result);
                    if (!err) {
                        res.json({
                            success: true,
                            data: JSON.stringify(result),
                        });
                        return true;
                    } else {
                        res.json({
                            success: false,
                            msg: 'Hiba a beszúrás során: ' + error
                        });
                    }
                });
            });
            return;
        });
    }
}
module.exports = Customer;