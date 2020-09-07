var API_KEY = 1234
var express = require('express')
var router = express.Router()
var moment = require('moment')

// get
router.get('/', function (req, res, next) {
    res.send('Hello world')
})

//======================================================================
// User Table
// GET / POST
//=======================================================================
router.get('/user', function (req, res, next) {
    if (req.query.key == API_KEY) {
        var fbid = req.query.fbid  //fbid: fb id username
        if (fbid != null) {
            req.getConnection(function (err, conn) {
                conn.query('SELECT userPhone,name,address,fbid FROM User WHERE fbid=?', [fbid], function (err, rows, fields) {
                    if (err) {
                        res.status(500)
                        res.send(JSON.stringify({ success: false, message: err.message }))
                    }
                    else {
                        if (rows.length > 0) {
                            res.send(JSON.stringify({ success: true, result: rows }))
                        }
                        else {
                            res.send(JSON.stringify({ success: false, message:"Empty" }))//user invalable in database
                        }
                    }
                })
            })

        }
        else {
            res.send(JSON.stringify({ success: false, message: "Missing fbid in query" }))
        }
    }
    else {
        res.send(JSON.stringify({ success: false, message: "worng api key" }))
    }
})
router.post('/user', function (req, res, next) {
    if (req.body.key == API_KEY) {

        var fbid = req.body.fbid  //fbid: fb id username
        var user_phone = req.body.userPhone
        var user_name = req.body.userName
        var user_address = req.body.userAddress

        if (fbid != null) {
            req.getConnection(function (err, conn) {
                conn.query('INSERT INTO User(FBID,UserPhone,Name,Address) VALUES(?,?,?,?) ON DUPLICATE KEY UPDATE Name=VALUES(Name),Address=VALUES(Address)', [fbid,user_phone,user_name,user_address], function (err, rows, fields) {
                    if (err) {
                        res.status(500)
                        res.send(JSON.stringify({ success: false, message: err.message }))
                    }
                    else {
                        if (rows.affectedRows > 0) {
                            res.send(JSON.stringify({ success: true, message: "Success" }))
                        }
                    }
                })
            })

        }
        else {
            res.send(JSON.stringify({ success: false, message: "Missing fbid in body" }))
        }
    }
    else {
        res.send(JSON.stringify({ success: false, message: "worng api key" }))
    }
})

//======================================================================
// Favorite Table
// GET / POST / DELETE
//=======================================================================
router.get('/favoriteByUser', function (req, res, next) {
    if (req.query.key == API_KEY) {
        var fbid = req.query.fbid  //fbid: fb id username
        if (fbid != null) {
            req.getConnection(function (err, conn) {
                conn.query('SELECT fbid,foodId,restaurantId,restaurantName,foodName,foodImage,price FROM favorite WHERE fbid=?', [fbid], function (err, rows, fields) {
                    if (err) {
                        res.status(500)
                        res.send(JSON.stringify({ success: false, message: err.message }))
                    }
                    else {
                        if (rows.length > 0) {
                            res.send(JSON.stringify({ success: true, result: rows }))
                        }
                        else {
                            res.send(JSON.stringify({ success: false, message: "Empty" }))
                        }
                    }
                })
            })

        }
        else {
            res.send(JSON.stringify({ success: false, message: "Missing fbid in query" }))
        }
    }
    else {
        res.send(JSON.stringify({ success: false, message: "worng api key" }))
    }
})
router.get('/favoriteByRestaurant', function (req, res, next) {
    if (req.query.key == API_KEY) {

        var fbid = req.query.fbid  //fbid: fb id username
        var restaurant_id = req.query.restaurantId

        if (fbid != null) {
            req.getConnection(function (err, conn) {
                conn.query('SELECT fbid,foodId,restaurantId,restaurantName,foodName,foodImage,price FROM favorite WHERE fbid=? AND restaurantId=?', [fbid, restaurant_id], function (err, rows, fields) {
                    if (err) {
                        res.status(500)
                        res.send(JSON.stringify({ success: false, message: err.message }))
                    }
                    else {
                        if (rows.length > 0) {
                            res.send(JSON.stringify({ success: true, result: rows }))
                        }
                        else {
                            res.send(JSON.stringify({ success: false, message: "Empty" }))
                        }
                    }
                })
            })

        }
        else {
            res.send(JSON.stringify({ success: false, message: "Missing fbid in query" }))
        }
    }
    else {
        res.send(JSON.stringify({ success: false, message: "worng api key" }))
    }
})
router.post('/favorite', function (req, res, next) {
    if (req.body.key == API_KEY) {

        var fbid = req.body.fbid  //fbid: fb id username
        var food_id = req.body.foodId
        var restaurant_id = req.body.restaurantId
        var restaurant_name = req.body.restaurantName
        var food_name = req.body.foodName
        var food_image = req.body.foodImage
        var food_price = req.body.price

        if (fbid != null) {
            req.getConnection(function (err, conn) {
                conn.query('INSERT INTO Favorite(FBID,FoodId,RestaurantId,RestaurantName,FoodName,FoodImage,Price) VALUES(?,?,?,?,?,?,?)', [fbid, food_id, restaurant_id, restaurant_name, food_name, food_image, food_price], function (err, rows, fields) {
                    if (err) {
                        res.status(500)
                        res.send(JSON.stringify({ success: false, message: err.message }))
                    }
                    else {
                        if (rows.affectedRows > 0) {
                            res.send(JSON.stringify({ success: true, message: "Success" }))
                        }
                    }
                })
            })

        }
        else {
            res.send(JSON.stringify({ success: false, message: "Missing fbid in body" }))
        }
    }
    else {
        res.send(JSON.stringify({ success: false, message: "worng api key" }))
    }
})
router.delete('/favorite', function (req, res, next) {
    if (req.query.key == API_KEY) {

        var fbid = req.query.fbid  //fbid: fb id username
        var food_id = req.query.foodId
        var restaurant_id = req.query.restaurantId

        if (fbid != null) {
            req.getConnection(function (err, conn) {
                conn.query('DELETE FROM Favorite WHERE FBID=? AND FoodId=? AND RestaurantId=?', [fbid, food_id, restaurant_id], function (err, rows, fields) {
                    if (err) {
                        res.status(500)
                        res.send(JSON.stringify({ success: false, message: err.message }))
                    }
                    else {
                        if (rows.affectedRows > 0) {
                            res.send(JSON.stringify({ success: true, message:"Success" }))
                        }
                    }
                })
            })

        }
        else {
            res.send(JSON.stringify({ success: false, message: "Missing fbid in query" }))
        }
    }
    else {
        res.send(JSON.stringify({ success: false, message: "worng api key" }))
    }
})


//======================================================================
// Cart Table
// GET / POST / DELETE
//=======================================================================
router.get('/cartByRestaurant', function (req, res, next) {
    if (req.query.key == API_KEY) {

        var fbid = req.query.fbid
        var restaurant_id = req.query.restaurantId

        if (fbid != null) {
            req.getConnection(function (err, conn) {
                conn.query('SELECT fbid,foodId,restaurantId,foodName,foodImage,foodPrice,foodQte,foodSize,foodExtraPrice FROM cart WHERE fbid=? AND restaurantId=?', [fbid, restaurant_id], function (err, rows, fields) {
                    if (err) {
                        res.status(500)
                        res.send(JSON.stringify({ success: false, message: err.message }))
                    }
                    else {
                        if (rows.length > 0) {
                            res.send(JSON.stringify({ success: true, result: rows }))
                        }
                        else {
                            res.send(JSON.stringify({ success: false, message: "Empty" }))
                        }
                    }
                })
            })

        }
        else {
            res.send(JSON.stringify({ success: false, message: "Missing fbid in query" }))
        }
    }
    else {
        res.send(JSON.stringify({ success: false, message: "worng api key" }))
    }
})
router.get('/countCartbyRestaurant', function (req, res, next) {
    if (req.query.key == API_KEY) {

        var fbid = req.query.fbid
        var restaurant_id = req.query.restaurantId

        if (fbid != null) {
            req.getConnection(function (err, conn) {
                conn.query('SELECT COUNT(*) AS nbrItemCart FROM cart WHERE fbid=? AND restaurantId=?', [fbid, restaurant_id], function (err, rows, fields) {
                    if (err) {
                        res.status(500)
                        res.send(JSON.stringify({ success: false, message: err.message }))
                    }
                    else {
                        if (rows.length > 0) {
                            res.send(JSON.stringify({ success: true, result: rows }))
                        }
                        else {
                            res.send(JSON.stringify({ success: false, message: "Empty" }))
                        }
                    }
                })
            })

        }
        else {
            res.send(JSON.stringify({ success: false, message: "Missing fbid or restaurantId in query" }))
        }
    }
    else {
        res.send(JSON.stringify({ success: false, message: "worng api key" }))
    }
})
router.post('/cart', function (req, res, next) {
    if (req.body.key == API_KEY) {
        var fbid = req.body.fbid  //fbid: fb id username
        var food_id = req.body.foodId
        var restaurant_id = req.body.restaurantId
        var food_name = req.body.foodName
        var food_image = req.body.foodImage
        var food_price = req.body.foodPrice
        var food_qte = req.body.foodQte
        var food_size = req.body.foodSize
        var food_extraPrice = req.body.foodExtraPrice

        if (fbid != null) {
            req.getConnection(function (err, conn) {
                conn.query('INSERT INTO Cart(FBID,FoodId,RestaurantId,FoodName,FoodImage,foodPrice,foodQte,foodSize,foodExtraPrice) VALUES(?,?,?,?,?,?,?,?)', [fbid, food_id, restaurant_id, food_name, food_image, food_price, food_qte, food_size, food_extraPrice], function (err, rows, fields) {
                    if (err) {
                        res.status(500)
                        res.send(JSON.stringify({ success: false, message: err.message }))
                    }
                    else {
                        if (rows.affectedRows > 0) {
                            res.send(JSON.stringify({ success: true, message: "Success" }))
                        }
                    }
                })
            })

        }
        else {
            res.send(JSON.stringify({ success: false, message: "Missing fbid in body" }))
        }
    }
    else {
        res.send(JSON.stringify({ success: false, message: "worng api key" }))
    }
})
router.delete('/cart', function (req, res, next) {
    if (req.query.key == API_KEY) {

        var fbid = req.query.fbid  //fbid: fb id username
        var food_id = req.query.foodId
        var restaurant_id = req.query.restaurantId

        if (fbid != null) {
            req.getConnection(function (err, conn) {
                conn.query('DELETE FROM Cart WHERE FBID=? AND FoodId=? AND RestaurantId=?', [fbid, food_id, restaurant_id], function (err, rows, fields) {
                    if (err) {
                        res.status(500)
                        res.send(JSON.stringify({ success: false, message: err.message }))
                    }
                    else {
                        if (rows.affectedRows > 0) {
                            res.send(JSON.stringify({ success: true, message:"Success" }))
                        }
                    }
                })
            })

        }
        else {
            res.send(JSON.stringify({ success: false, message: "Missing fbid in query" }))
        }
    }
    else {
        res.send(JSON.stringify({ success: false, message: "worng api key" }))
    }
})



//======================================================================
// Restaurant Table
// GET
//=======================================================================
router.get('/restaurant', function (req, res, next) {
    if (req.query.key == API_KEY) {
        req.getConnection(function (err, conn) {
            conn.query('SELECT id,name,address,phone,lat,lng,userOwner,image,paymentUrl FROM Restaurant', function (err, rows, fields) {
                    if (err) {
                        res.status(500)
                        res.send(JSON.stringify({ success: false, message: err.message }))
                    }
                    else {
                        if (rows.length > 0) {
                            res.send(JSON.stringify({ success: true, result: rows }))
                        }
                        else {
                            res.send(JSON.stringify({ success: false, message: "Empty" }))
                        }
                    }
                })
            })

    }
    else {
        res.send(JSON.stringify({ success: false, message: "worng api key" }))
    }
})
router.get('/restaurantById', function (req, res, next) {
    if (req.query.key == API_KEY) {
        req.getConnection(function (err, conn) {
            var restaurant_id = req.query.restaurantId
            if (restaurant_id != null) {
                conn.query('SELECT id,name,address,phone,lat,lng,userOwner,image,paymentUrl FROM Restaurant WHERE id=?', [restaurant_id], function (err, rows, fields) {
                    if (err) {
                        res.status(500)
                        res.send(JSON.stringify({ success: false, message: err.message }))
                    }
                    else {
                        if (rows.length > 0) {
                            res.send(JSON.stringify({ success: true, result: rows }))
                        }
                        else {
                            res.send(JSON.stringify({ success: false, message: "Empty" }))
                        }
                    }
                })
            }
            else {
                res.send(JSON.stringify({ success: false, message: "Missing restaurantId in query" }))
            }
        })

    }
    else {
        res.send(JSON.stringify({ success: false, message: "worng api key" }))
    }
})
router.get('/nearByRestaurant', function (req, res, next) {
    if (req.query.key == API_KEY) {
        req.getConnection(function (err, conn) {

            var user_lat = parseFloat(req.query.lat)
            var user_lng = parseFloat(req.query.lng)
            var distance = parseFloat(req.query.distance)

            if (user_lat != Number.NaN && user_lng != Number.NaN) {

                conn.query('SELECT * FROM (SELECT id,name,address,phone,lat,lng,userOwner,image,paymentUrl,'
                    + 'ROUND(111.045 * DEGREES(ACOS(COS(RADIANS(?)) * COS(RADIANS(lat))'
                    + '* COS(RADIANS(lng) - RADIANS(?)) + SIN(RADIANS(?))'
                    + '* SIN(RADIANS(lat)))),2) AS distance_in_km FROM Restaurant)tempTable WHERE distance_in_km < ?', [user_lat,user_lng,user_lat,distance], function (err, rows, fields) {
                    if (err) {
                        res.status(500)
                        res.send(JSON.stringify({ success: false, message: err.message }))
                    }
                    else {
                        if (rows.length > 0) {
                            res.send(JSON.stringify({ success: true, result: rows }))
                        }
                        else {
                            res.send(JSON.stringify({ success: false, message: "Empty" }))
                        }
                    }
                })
            }
            else {
                res.send(JSON.stringify({ success: false, message: "Missing lat & lng in query" }))
            }
        })

    }
    else {
        res.send(JSON.stringify({ success: false, message: "worng api key" }))
    }
})

//======================================================================
// Menu Table + Restaurant_Menu Table
// GET
//=======================================================================
router.get('/menuByRestaurant', function (req, res, next) {
    if (req.query.key == API_KEY) {
        req.getConnection(function (err, conn) {
            var restaurant_id = req.query.restaurantId
            if (restaurant_id != null) {
                conn.query('SELECT id,name,description,image FROM Menu WHERE id in (SELECT menuId FROM Restaurant_Menu WHERE restaurantId=?)', [restaurant_id], function (err, rows, fields) {
                    if (err) {
                        res.status(500)
                        res.send(JSON.stringify({ success: false, message: err.message }))
                    }
                    else {
                        if (rows.length > 0) {
                            res.send(JSON.stringify({ success: true, result: rows }))
                        }
                        else {
                            res.send(JSON.stringify({ success: false, message: "Empty" }))
                        }
                    }
                })
            }
            else {
                res.send(JSON.stringify({ success: false, message: "Missing restaurantId in query" }))
            }
        })

    }
    else {
        res.send(JSON.stringify({ success: false, message: "worng api key" }))
    }
})

//======================================================================
// Food Table
// GET
//=======================================================================
router.get('/foodByMenu', function (req, res, next) {
    if (req.query.key == API_KEY) {
        req.getConnection(function (err, conn) {
            var menu_id = req.query.menuId
            if (menu_id != null) {
                conn.query('SELECT id,name,description,image,price,CASE WHEN isSize=1 THEN \'TRUE\' ELSE \'FALSE\' END as isSize,'
                    + 'discount FROM Food WHERE id in (SELECT foodId FROM Menu_Food WHERE menuId=?)', [menu_id], function (err, rows, fields) {
                    if (err) {
                        res.status(500)
                        res.send(JSON.stringify({ success: false, message: err.message }))
                    }
                    else {
                        if (rows.length > 0) {
                            res.send(JSON.stringify({ success: true, result: rows }))
                        }
                        else {
                            res.send(JSON.stringify({ success: false, message: "Empty" }))
                        }
                    }
                })
            }
            else {
                res.send(JSON.stringify({ success: false, message: "Missing menuId in query" }))
            }
        })

    }
    else {
        res.send(JSON.stringify({ success: false, message: "worng api key" }))
    }
})
router.get('/foodById', function (req, res, next) {
    if (req.query.key == API_KEY) {
        req.getConnection(function (err, conn) {
            var food_id = req.query.foodId
            if (food_id != null) {
                conn.query('SELECT id,name,description,image,price,CASE WHEN isSize=1 THEN \'TRUE\' ELSE \'FALSE\' END as isSize,'
                    + 'discount FROM Food WHERE id=?', [food_id], function (err, rows, fields) {
                        if (err) {
                            res.status(500)
                            res.send(JSON.stringify({ success: false, message: err.message }))
                        }
                        else {
                            if (rows.length > 0) {
                                res.send(JSON.stringify({ success: true, result: rows }))
                            }
                            else {
                                res.send(JSON.stringify({ success: false, message: "Empty" }))
                            }
                        }
                    })
            }
            else {
                res.send(JSON.stringify({ success: false, message: "Missing foodId in query" }))
            }
        })

    }
    else {
        res.send(JSON.stringify({ success: false, message: "worng api key" }))
    }
})
router.get('/searchFood', function (req, res, next) {
    if (req.query.key == API_KEY) {
        req.getConnection(function (err, conn) {
            var search_query ='%'+req.query.foodName+'%'
            var menu_id = req.query.menuId
            if (search_query != null) {
                conn.query('SELECT id,name,description,image,price,CASE WHEN isSize=1 THEN \'TRUE\' ELSE \'FALSE\' END as isSize,'
                    + 'discount FROM Food WHERE name LIKE ? AND id in (SELECT foodId FROM Menu_Food WHERE menuId=?)', [search_query,menu_id], function (err, rows, fields) {
                        if (err) {
                            res.status(500)
                            res.send(JSON.stringify({ success: false, message: err.message }))
                        }
                        else {
                            if (rows.length > 0) {
                                res.send(JSON.stringify({ success: true, result: rows }))
                            }
                            else {
                                res.send(JSON.stringify({ success: false, message: "Empty" }))
                            }
                        }
                    })
            }
            else {
                res.send(JSON.stringify({ success: false, message: "Missing foodName or menuId in query" }))
            }
        })

    }
    else {
        res.send(JSON.stringify({ success: false, message: "worng api key" }))
    }
})

//======================================================================
// Size Table
// GET
//=======================================================================
router.get('/size', function (req, res, next) {
    if (req.query.key == API_KEY) {
        req.getConnection(function (err, conn) {
            var food_id = req.query.foodId
            if (food_id != null) {
                conn.query('SELECT id,description,extraPrice FROM Size WHERE id in (SELECT sizeId FROM Food_Size WHERE foodId=?) ', [food_id], function (err, rows, fields) {
                        if (err) {
                            res.status(500)
                            res.send(JSON.stringify({ success: false, message: err.message }))
                        }
                        else {
                            if (rows.length > 0) {
                                res.send(JSON.stringify({ success: true, result: rows }))
                            }
                            else {
                                res.send(JSON.stringify({ success: false, message: "Empty" }))
                            }
                        }
                    })
            }
            else {
                res.send(JSON.stringify({ success: false, message: "Missing foodId in query" }))
            }
        })

    }
    else {
        res.send(JSON.stringify({ success: false, message: "worng api key" }))
    }
})

//======================================================================
// Order Table
// GET / POST
//=======================================================================
router.get('/order', function (req, res, next) {
    if (req.query.key == API_KEY) {
        req.getConnection(function (err, conn) {
            var order_fbid = req.query.orderFBID
            if (order_fbid != null) {
                conn.query('SELECT orderId,orderFBID,orderPhone,orderName,orderAddress,orderDate,'
                    + 'restaurantId,transactionId,'
                    + 'CASE WHEN cod=1 THEN \'TRUE\' ELSE \'FALSE\' END as cod,'
                    + 'totalPrice,numOfItem,orderStatus FROM `order` WHERE OrderFBID =? AND NumOfItem > 0'
                    + ' ORDER BY OrderId DESC', [order_fbid], function (err, rows, fields) {
                    if (err) {
                        res.status(500)
                        res.send(JSON.stringify({ success: false, message: err.message }))
                    }
                    else {
                        if (rows.length > 0) {
                            res.send(JSON.stringify({ success: true, result: rows }))
                        }
                        else {
                            res.send(JSON.stringify({ success: false, message: "Empty" }))
                        }
                    }
                })
            }
            else {
                res.send(JSON.stringify({ success: false, message: "Missing orderFBID in query" }))
            }
        })

    }
    else {
        res.send(JSON.stringify({ success: false, message: "worng api key" }))
    }
})
router.post('/createOrder', function (req, res, next) {
    if (req.body.key == API_KEY) {

        var order_phone = req.body.orderPhone
        var order_name = req.body.orderName
        var order_address = req.body.orderAddress
        var order_date = moment(req.body.orderDate, "DD/MM/YYYY").format("YYYY-MM-DD");
        var restaurant_id = req.body.restaurantId
        var transaction_id = req.body.transactionId
        var cod = req.body.cod
        var total_price = req.body.totalPrice
        var num_of_item = req.body.numOfItem
        var order_fbid = req.body.orderFBID

        if (order_fbid != null) {
            req.getConnection(function (err, conn) {
                conn.query('INSERT INTO  `order`(OrderFBID,OrderPhone,OrderName,OrderAddress,OrderDate,'
                    + 'RestaurantId,TransactionId,COD,TotalPrice, NumOfItem,orderStatus) VALUES(?,?,?,?,?,?,?,?,?,?,?)', [order_fbid, order_phone, order_name, order_address, order_date, restaurant_id, transaction_id, cod, total_price, num_of_item,0], function (err, rows, fields) {
                        if (err) {
                            res.status(500)
                            res.send(JSON.stringify({ success: false, message: err.message }))
                        }
                        else {
                            conn.query('SELECT OrderId as orderNumber  FROM `order` WHERE OrderFBID=? ORDER BY orderNumber DESC LIMIT 1', [order_fbid], function (err, rows, fields) {
                                if (err) {
                                    res.status(500)
                                    res.send(JSON.stringify({ success: false, message: err.message }))
                                }
                                else {
                                    res.send(JSON.stringify({ success: true, result: rows }))
                                }
                            })
                        }


                })
            })

        }
        else {
            res.send(JSON.stringify({ success: false, message: "Missing orderFBID in body" }))
        }
    }
    else {
        res.send(JSON.stringify({ success: false, message: "worng api key" }))
    }
})

//======================================================================
// token Table
// GET / POST
//=======================================================================

router.get('/token', function (req, res, next) {
    if (req.query.key == API_KEY) {
        var fbid = req.query.fbid  //fbid: fb id username
        if (fbid != null) {
            req.getConnection(function (err, conn) {
                conn.query('SELECT fbid, token FROM token WHERE fbid=?', [fbid], function (err, rows, fields) {
                    if (err) {
                        res.status(500)
                        res.send(JSON.stringify({ success: false, message: err.message }))
                    }
                    else {
                        if (rows.length > 0) {
                            res.send(JSON.stringify({ success: true, result: rows }))
                        }
                        else {
                            res.send(JSON.stringify({ success: false, message:"Empty" }))//user invalable in database
                        }
                    }
                })
            })

        }
        else {
            res.send(JSON.stringify({ success: false, message: "Missing fbid in query" }))
        }
    }
    else {
        res.send(JSON.stringify({ success: false, message: "worng api key" }))
    }
})
router.post('/token', function (req, res, next) {
    if (req.body.key == API_KEY) {

        var fbid = req.body.fbid
        var token = req.body.token

        if (fbid != null) {
            req.getConnection(function (err, conn) {
                conn.query('INSERT INTO token(FBID,token) VALUES(?,?) ON DUPLICATE KEY UPDATE token=VALUES(token)', [fbid,token], function (err, rows, fields) {
                    if (err) {
                        res.status(500)
                        res.send(JSON.stringify({ success: false, message: err.message }))
                    }
                    else {
                        if (rows.affectedRows > 0) {
                            res.send(JSON.stringify({ success: true, message: "Success" }))
                        }
                    }
                })
            })

        }
        else {
            res.send(JSON.stringify({ success: false, message: "Missing fbid in body" }))
        }
    }
    else {
        res.send(JSON.stringify({ success: false, message: "worng api key" }))
    }
})


module.exports = router
