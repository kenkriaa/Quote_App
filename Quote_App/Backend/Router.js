const bcrypt = require('bcrypt');

class Router {
    constructor(app, db) {
        this.login(app, db);
        this.logout(app, db);
        this.isLoggedIn(app, db);
    }


    login(app, db) {
        app.post('/login', (req, res) => {
            let username = req.body.username;
            let password = req.body.password;

            console.log(username);

            if (username.lenght > 12 || password.lenght > 12) {
                res.json({
                    success: false,
                    msg: 'Too long username or password. Please try again!'
                });
                return;
            }

            let cols = [username];
            db.query('SELECT * FROM User WHERE Username = ? LIMIT 1', cols, (error, data, fields) => {
                if (error) {
                    res.json({
                        success: false,
                        msg: 'An error occured, please try again.'
                    });
                    return;
                }
                console.log(data);
                if (data && data.length === 1) {
                    bcrypt.compare(password, data[0].Password, (bcryptError, verified) => {
                        if (verified) {
                            req.session.userID = data[0].idUser;
                            res.json({
                                success: true,
                                username: data[0].Username
                            });
                            return;
                        } else {
                            res.json({
                                success: false,
                                msg: 'Invalid password!'
                            });
                        }
                    });
                } else {
                    res.json({
                        sucess: false,
                        msg: 'User not found, please try again!'
                    });
                }
            });

        });
    }

    logout(app, db) {
        app.post('/logout', (req, res) => {
            if (req.session.userID) {
                req.session.destroy();
                res.json({
                    success: true
                });
                return true;
            } else {
                res.json({
                    success: false
                });
                return false;
            }

        });
    }

    isLoggedIn(app, db) {
        app.post('/isLoggedIn', (req, res) => {
            if (req.session.userID) {
                let cols = [req.session.userID];
                db.query('SELECT * FROM User WHERE idUser = ? LIMIT 1', cols, (error, data, fields) => {
                    if (data && data.length === 1) {
                        res.json({
                            success: true
                        });
                        return true;
                    } else {
                        res.json({
                            success: false
                        });
                    }
                });
            } else {
                res.json({
                    success: false
                });
            }
            return;
        });
    }
}
module.exports = Router;