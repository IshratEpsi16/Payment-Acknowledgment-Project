const express = require('express');
const util = require('util');
const jwt = require('jsonwebtoken');

const oracledb = require('oracledb');
const bcrypt = require('bcrypt');
require('dotenv').config();
const getConnectionAsync = util.promisify(oracledb.getConnection);
const cors = require('cors');
const app = express();
const queries = require('./sqlQueries');
oracledb.initOracleClient({ libDir: 'C:\\instantclient_19_19' });
const dbConfig = require('./dbConfig');

app.use(cors());
app.use(express.json());






app.get('/', verifyToken, checkRole("admin"), (req, res) => {
    oracledb.getConnection(dbConfig, (err, connection) => {
        if (err) {
            console.error('Error connecting to the database:', err.message);
            return;
        }

        const sql = queries.getAllData;
        connection.execute(sql, (err, result) => {
            if (err) {
                console.error('Error executing query:', err.message);
                connection.close();
                return;
            }

            // Get column names dynamically
            const columnNames = result.metaData.map(meta => meta.name);

            // Convert the result rows to JSON format dynamically
            const jsonData = result.rows.map(row => {
                const rowObject = {};
                columnNames.forEach((columnName, index) => {
                    rowObject[columnName] = row[index];
                });
                return rowObject;
            });

            // Send the JSON response
            res.json(jsonData);

            connection.close();
        });
    });
});
app.get('/fo', verifyToken, checkRole("admin"), (req, res) => {
    oracledb.getConnection(dbConfig, (err, connection) => {
        if (err) {
            console.error('Error connecting to the database:', err.message);
            return;
        }

        const sql = queries.getAllDataScblFo;
        connection.execute(sql, (err, result) => {
            if (err) {
                console.error('Error executing query:', err.message);
                connection.close();
                return;
            }

            // Get column names dynamically
            const columnNames = result.metaData.map(meta => meta.name);

            // Convert the result rows to JSON format dynamically
            const jsonData = result.rows.map(row => {
                const rowObject = {};
                columnNames.forEach((columnName, index) => {
                    rowObject[columnName] = row[index];
                });
                return rowObject;
            });

            // Send the JSON response
            res.json(jsonData);

            connection.close();
        });
    });
});
app.get('/sscml', verifyToken, checkRole("admin"), (req, res) => {
    oracledb.getConnection(dbConfig, (err, connection) => {
        if (err) {
            console.error('Error connecting to the database:', err.message);
            return;
        }

        const sql = queries.getAllDataSSCML;
        connection.execute(sql, (err, result) => {
            if (err) {
                console.error('Error executing query:', err.message);
                connection.close();
                return;
            }

            // Get column names dynamically
            const columnNames = result.metaData.map(meta => meta.name);

            // Convert the result rows to JSON format dynamically
            const jsonData = result.rows.map(row => {
                const rowObject = {};
                columnNames.forEach((columnName, index) => {
                    rowObject[columnName] = row[index];
                });
                return rowObject;
            });

            // Send the JSON response
            res.json(jsonData);

            connection.close();
        });
    });
});
app.get('/sscil', verifyToken, checkRole("admin"), (req, res) => {
    oracledb.getConnection(dbConfig, (err, connection) => {
        if (err) {
            console.error('Error connecting to the database:', err.message);
            return;
        }

        const sql = queries.getAllDataSSCIL;
        connection.execute(sql, (err, result) => {
            if (err) {
                console.error('Error executing query:', err.message);
                connection.close();
                return;
            }

            // Get column names dynamically
            const columnNames = result.metaData.map(meta => meta.name);

            // Convert the result rows to JSON format dynamically
            const jsonData = result.rows.map(row => {
                const rowObject = {};
                columnNames.forEach((columnName, index) => {
                    rowObject[columnName] = row[index];
                });
                return rowObject;
            });

            // Send the JSON response
            res.json(jsonData);

            connection.close();
        });
    });
});
app.get('/ctg', verifyToken, checkRole("admin"), (req, res) => {
    oracledb.getConnection(dbConfig, (err, connection) => {
        if (err) {
            console.error('Error connecting to the database:', err.message);
            return;
        }

        const sql = queries.getAllDataCtg;
        connection.execute(sql, (err, result) => {
            if (err) {
                console.error('Error executing query:', err.message);
                connection.close();
                return;
            }

            // Get column names dynamically
            const columnNames = result.metaData.map(meta => meta.name);

            // Convert the result rows to JSON format dynamically
            const jsonData = result.rows.map(row => {
                const rowObject = {};
                columnNames.forEach((columnName, index) => {
                    rowObject[columnName] = row[index];
                });
                return rowObject;
            });

            // Send the JSON response
            res.json(jsonData);

            connection.close();
        });
    });
});


app.get('/customTableData', verifyToken, checkRole("admin"), (req, res) => {
    oracledb.getConnection(dbConfig, (err, connection) => {
        if (err) {
            console.error('Error connecting to the database:', err.message);
            return;
        }

        const sql = queries.getCustomTableData;
        connection.execute(sql, (err, result) => {
            if (err) {
                console.error('Error executing query:', err.message);
                connection.close();
                return;
            }

            // Get column names dynamically
            const columnNames = result.metaData.map(meta => meta.name);

            // Convert the result rows to JSON format dynamically
            const jsonData = result.rows.map(row => {
                const rowObject = {};
                columnNames.forEach((columnName, index) => {
                    rowObject[columnName] = row[index];
                });
                return rowObject;
            });

            // Send the JSON response
            res.json(jsonData);

            connection.close();
        });
    });
});

app.get('/customTableDataScblFo', verifyToken, checkRole("admin"), (req, res) => {
    oracledb.getConnection(dbConfig, (err, connection) => {
        if (err) {
            console.error('Error connecting to the database:', err.message);
            return;
        }

        const sql = queries.getCustomTableDataScblFo;
        connection.execute(sql, (err, result) => {
            if (err) {
                console.error('Error executing query:', err.message);
                connection.close();
                return;
            }

            // Get column names dynamically
            const columnNames = result.metaData.map(meta => meta.name);

            // Convert the result rows to JSON format dynamically
            const jsonData = result.rows.map(row => {
                const rowObject = {};
                columnNames.forEach((columnName, index) => {
                    rowObject[columnName] = row[index];
                });
                return rowObject;
            });

            // Send the JSON response
            res.json(jsonData);

            connection.close();
        });
    });
});
app.get('/customTableDataSSCML', verifyToken, checkRole("admin"), (req, res) => {
    oracledb.getConnection(dbConfig, (err, connection) => {
        if (err) {
            console.error('Error connecting to the database:', err.message);
            return;
        }

        const sql = queries.getCustomTableDataSSCML;
        connection.execute(sql, (err, result) => {
            if (err) {
                console.error('Error executing query:', err.message);
                connection.close();
                return;
            }

            // Get column names dynamically
            const columnNames = result.metaData.map(meta => meta.name);

            // Convert the result rows to JSON format dynamically
            const jsonData = result.rows.map(row => {
                const rowObject = {};
                columnNames.forEach((columnName, index) => {
                    rowObject[columnName] = row[index];
                });
                return rowObject;
            });

            // Send the JSON response
            res.json(jsonData);

            connection.close();
        });
    });
});
app.get('/customTableDataSSCIL', verifyToken, checkRole("admin"), (req, res) => {
    oracledb.getConnection(dbConfig, (err, connection) => {
        if (err) {
            console.error('Error connecting to the database:', err.message);
            return;
        }

        const sql = queries.getCustomTableDataSSCIL;
        connection.execute(sql, (err, result) => {
            if (err) {
                console.error('Error executing query:', err.message);
                connection.close();
                return;
            }

            // Get column names dynamically
            const columnNames = result.metaData.map(meta => meta.name);

            // Convert the result rows to JSON format dynamically
            const jsonData = result.rows.map(row => {
                const rowObject = {};
                columnNames.forEach((columnName, index) => {
                    rowObject[columnName] = row[index];
                });
                return rowObject;
            });

            // Send the JSON response
            res.json(jsonData);

            connection.close();
        });
    });
});
app.get('/customTableDataCtg', verifyToken, checkRole("admin"), (req, res) => {
    oracledb.getConnection(dbConfig, (err, connection) => {
        if (err) {
            console.error('Error connecting to the database:', err.message);
            return;
        }

        const sql = queries.getCustomTableDataCtg;
        connection.execute(sql, (err, result) => {
            if (err) {
                console.error('Error executing query:', err.message);
                connection.close();
                return;
            }

            // Get column names dynamically
            const columnNames = result.metaData.map(meta => meta.name);

            // Convert the result rows to JSON format dynamically
            const jsonData = result.rows.map(row => {
                const rowObject = {};
                columnNames.forEach((columnName, index) => {
                    rowObject[columnName] = row[index];
                });
                return rowObject;
            });

            // Send the JSON response
            res.json(jsonData);

            connection.close();
        });
    });
});


// app.get('/notifications', (req, res) => {
//     oracledb.getConnection(dbConfig, (err, connection) => {
//         if (err) {
//             console.error('Error connecting to the database:', err.message);
//             return;
//         }

//         const sql = "select * from  XXCRM.NOTIFICATIONS"
//         connection.execute(sql, (err, result) => {
//             if (err) {
//                 console.error('Error executing query:', err.message);
//                 connection.close();
//                 return;
//             }

//             // Get column names dynamically
//             const columnNames = result.metaData.map(meta => meta.name);

//             // Convert the result rows to JSON format dynamically
//             const jsonData = result.rows.map(row => {
//                 const rowObject = {};
//                 columnNames.forEach((columnName, index) => {
//                     rowObject[columnName] = row[index];
//                 });
//                 return rowObject;
//             });

//             // Send the JSON response
//             res.json(jsonData);

//             connection.close();
//         });
//     });
// });





app.get('/notifications/:id', verifyToken, (req, res) => {
    const id = req.params.id;
    // console.log('Route hit:', req.url);
    // console.log('id', id);

    oracledb.getConnection(dbConfig, (err, connection) => {
        if (err) {
            console.error('Error connecting to the database:', err.message);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        const sql = queries.getNotificationsById;



        connection.execute(sql, [id], { outFormat: oracledb.OUT_FORMAT_OBJECT }, (err, result) => {
            if (err) {
                console.error('Error executing query:', err.message);
                res.status(500).json({ error: 'Internal Server Error' });
                connection.close();
                return;
            }

            if (result.rows.length === 0) {
                res.status(404).json({ error: 'ID not found' });
            } else {
                res.json(result.rows);
            }

            connection.close();
        });
    });
});

app.get('/profileInfo/:empId', verifyToken, (req, res) => {
    const empId = req.params.empId;
    // console.log('Route hit:', req.url);
    // console.log('emp_id', empId);

    oracledb.getConnection(dbConfig, (err, connection) => {
        if (err) {
            console.error('Error connecting to the database:', err.message);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        const sql = queries.getProfileInfoById;



        connection.execute(sql, [empId], { outFormat: oracledb.OUT_FORMAT_OBJECT }, (err, result) => {
            if (err) {
                console.error('Error executing query:', err.message);
                res.status(500).json({ error: 'Internal Server Error' });
                connection.close();
                return;
            }

            if (result.rows.length === 0) {
                res.status(404).json({ error: 'ID not found' });
            } else {

                res.json(result.rows[0]);

            }
            // console.log('Profile Info:', result.rows[0])

            connection.close();
        });
    });
});

app.put('/updateStatus/:payeeId/:currentPeriod/:response', verifyToken, (req, res) => {
    const payeeId = req.params.payeeId;
    const currentPeriod = req.params.currentPeriod;
    const response = req.params.response;


    oracledb.getConnection(dbConfig, async (err, connection) => {
        if (err) {
            console.error('Error connecting to the database:', err.message);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        let newStatus;
        if (response.toLowerCase() === 'yes') {
            newStatus = 'Accepted';
        } else if (response.toLowerCase() === 'no') {
            newStatus = 'Rejected';
        } else {
            res.status(400).json({ error: 'Invalid response value. Use "yes" or "no".' });
            connection.close();
            return;
        }

        const bindParams = {
            newStatus: newStatus,
            payeeId: payeeId,
            currentPeriod: currentPeriod

        };

        const sql = queries.updateStatus;

        try {
            const result = await connection.execute(sql, bindParams, { autoCommit: true });

            if (result.rowsAffected === 0) {
                res.status(404).json({ error: 'No matching record found for the given PAYEE_ID and status "Sent".' });
            } else {
                res.json({ message: 'Status updated successfully' });
            }
        } catch (error) {
            console.error('Error updating status:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        } finally {
            connection.close();
        }
    });
});
app.put('/updateStatusScblFO/:payeeId/:currentPeriod/:response', verifyToken, (req, res) => {
    const payeeId = req.params.payeeId;
    const currentPeriod = req.params.currentPeriod;
    const response = req.params.response;


    oracledb.getConnection(dbConfig, async (err, connection) => {
        if (err) {
            console.error('Error connecting to the database:', err.message);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        let newStatus;
        if (response.toLowerCase() === 'yes') {
            newStatus = 'Accepted';
        } else if (response.toLowerCase() === 'no') {
            newStatus = 'Rejected';
        } else {
            res.status(400).json({ error: 'Invalid response value. Use "yes" or "no".' });
            connection.close();
            return;
        }

        const bindParams = {
            newStatus: newStatus,
            payeeId: payeeId,
            currentPeriod: currentPeriod

        };

        const sql = queries.updateStatusScblFo;

        try {
            const result = await connection.execute(sql, bindParams, { autoCommit: true });

            if (result.rowsAffected === 0) {
                res.status(404).json({ error: 'No matching record found for the given PAYEE_ID and status "Sent".' });
            } else {
                res.json({ message: 'Status updated successfully' });
            }
        } catch (error) {
            console.error('Error updating status:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        } finally {
            connection.close();
        }
    });
});
app.put('/updateStatusSSCML/:payeeId/:currentPeriod/:response', verifyToken, (req, res) => {
    const payeeId = req.params.payeeId;
    const currentPeriod = req.params.currentPeriod;
    const response = req.params.response;


    oracledb.getConnection(dbConfig, async (err, connection) => {
        if (err) {
            console.error('Error connecting to the database:', err.message);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        let newStatus;
        if (response.toLowerCase() === 'yes') {
            newStatus = 'Accepted';
        } else if (response.toLowerCase() === 'no') {
            newStatus = 'Rejected';
        } else {
            res.status(400).json({ error: 'Invalid response value. Use "yes" or "no".' });
            connection.close();
            return;
        }

        const bindParams = {
            newStatus: newStatus,
            payeeId: payeeId,
            currentPeriod: currentPeriod

        };

        const sql = queries.updateStatusSSCML;

        try {
            const result = await connection.execute(sql, bindParams, { autoCommit: true });

            if (result.rowsAffected === 0) {
                res.status(404).json({ error: 'No matching record found for the given PAYEE_ID and status "Sent".' });
            } else {
                res.json({ message: 'Status updated successfully' });
            }
        } catch (error) {
            console.error('Error updating status:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        } finally {
            connection.close();
        }
    });
});
app.put('/updateStatusSSCIL/:payeeId/:currentPeriod/:response', verifyToken, (req, res) => {
    const payeeId = req.params.payeeId;
    const currentPeriod = req.params.currentPeriod;
    const response = req.params.response;


    oracledb.getConnection(dbConfig, async (err, connection) => {
        if (err) {
            console.error('Error connecting to the database:', err.message);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        let newStatus;
        if (response.toLowerCase() === 'yes') {
            newStatus = 'Accepted';
        } else if (response.toLowerCase() === 'no') {
            newStatus = 'Rejected';
        } else {
            res.status(400).json({ error: 'Invalid response value. Use "yes" or "no".' });
            connection.close();
            return;
        }

        const bindParams = {
            newStatus: newStatus,
            payeeId: payeeId,
            currentPeriod: currentPeriod

        };

        const sql = queries.updateStatusSSCIL;

        try {
            const result = await connection.execute(sql, bindParams, { autoCommit: true });

            if (result.rowsAffected === 0) {
                res.status(404).json({ error: 'No matching record found for the given PAYEE_ID and status "Sent".' });
            } else {
                res.json({ message: 'Status updated successfully' });
            }
        } catch (error) {
            console.error('Error updating status:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        } finally {
            connection.close();
        }
    });
});
app.put('/updateStatusCtg/:payeeId/:currentPeriod/:response', verifyToken, (req, res) => {
    const payeeId = req.params.payeeId;
    const currentPeriod = req.params.currentPeriod;
    const response = req.params.response;


    oracledb.getConnection(dbConfig, async (err, connection) => {
        if (err) {
            console.error('Error connecting to the database:', err.message);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        let newStatus;
        if (response.toLowerCase() === 'yes') {
            newStatus = 'Accepted';
        } else if (response.toLowerCase() === 'no') {
            newStatus = 'Rejected';
        } else {
            res.status(400).json({ error: 'Invalid response value. Use "yes" or "no".' });
            connection.close();
            return;
        }

        const bindParams = {
            newStatus: newStatus,
            payeeId: payeeId,
            currentPeriod: currentPeriod

        };

        const sql = queries.updateStatusCtg;

        try {
            const result = await connection.execute(sql, bindParams, { autoCommit: true });

            if (result.rowsAffected === 0) {
                res.status(404).json({ error: 'No matching record found for the given PAYEE_ID and status "Sent".' });
            } else {
                res.json({ message: 'Status updated successfully' });
            }
        } catch (error) {
            console.error('Error updating status:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        } finally {
            connection.close();
        }
    });
});
// Add a new route to handle updating the status to 'Sent' for a specific row
app.put('/updateStatus/:payeeId/:currentPeriod', verifyToken, (req, res) => {
    const payeeId = req.params.payeeId;
    const currentPeriod = req.params.currentPeriod;

    oracledb.getConnection(dbConfig, (err, connection) => {
        if (err) {
            console.error('Error connecting to the database:', err.message);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        const updateSql = queries.updateTable;

        const bindParams = {
            payeeId: payeeId,
            currentPeriod: currentPeriod
        };

        connection.execute(updateSql, bindParams, { autoCommit: true }, (err, result) => {
            if (err) {
                console.error('Error executing update query:', err.message);
                res.status(500).json({ error: 'Internal Server Error' });
                connection.close();
                return;
            }

            if (result.rowsAffected > 0) {
                res.json({ message: 'Status updated to "Sent" successfully' });
            } else {
                res.status(404).json({ error: 'No rows updated' });
            }

            connection.close();
        });
    });
});

app.put('/updateStatusScblFO/:payeeId/:currentPeriod', verifyToken, (req, res) => {
    const payeeId = req.params.payeeId;
    const currentPeriod = req.params.currentPeriod;

    oracledb.getConnection(dbConfig, (err, connection) => {
        if (err) {
            console.error('Error connecting to the database:', err.message);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        const updateSql = queries.updateTableScblFo;

        const bindParams = {
            payeeId: payeeId,
            currentPeriod: currentPeriod
        };

        connection.execute(updateSql, bindParams, { autoCommit: true }, (err, result) => {
            if (err) {
                console.error('Error executing update query:', err.message);
                res.status(500).json({ error: 'Internal Server Error' });
                connection.close();
                return;
            }

            if (result.rowsAffected > 0) {
                res.json({ message: 'Status updated to "Sent" successfully' });
            } else {
                res.status(404).json({ error: 'No rows updated' });
            }

            connection.close();
        });
    });
});
app.put('/updateStatusSSCML/:payeeId/:currentPeriod', verifyToken, (req, res) => {
    const payeeId = req.params.payeeId;
    const currentPeriod = req.params.currentPeriod;

    oracledb.getConnection(dbConfig, (err, connection) => {
        if (err) {
            console.error('Error connecting to the database:', err.message);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        const updateSql = queries.updateTableSSCML;

        const bindParams = {
            payeeId: payeeId,
            currentPeriod: currentPeriod
        };

        connection.execute(updateSql, bindParams, { autoCommit: true }, (err, result) => {
            if (err) {
                console.error('Error executing update query:', err.message);
                res.status(500).json({ error: 'Internal Server Error' });
                connection.close();
                return;
            }

            if (result.rowsAffected > 0) {
                res.json({ message: 'Status updated to "Sent" successfully' });
            } else {
                res.status(404).json({ error: 'No rows updated' });
            }

            connection.close();
        });
    });
});
app.put('/updateStatusSSCIL/:payeeId/:currentPeriod', verifyToken, (req, res) => {
    const payeeId = req.params.payeeId;
    const currentPeriod = req.params.currentPeriod;

    oracledb.getConnection(dbConfig, (err, connection) => {
        if (err) {
            console.error('Error connecting to the database:', err.message);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        const updateSql = queries.updateTableSSCIL;

        const bindParams = {
            payeeId: payeeId,
            currentPeriod: currentPeriod
        };

        connection.execute(updateSql, bindParams, { autoCommit: true }, (err, result) => {
            if (err) {
                console.error('Error executing update query:', err.message);
                res.status(500).json({ error: 'Internal Server Error' });
                connection.close();
                return;
            }

            if (result.rowsAffected > 0) {
                res.json({ message: 'Status updated to "Sent" successfully' });
            } else {
                res.status(404).json({ error: 'No rows updated' });
            }

            connection.close();
        });
    });
});
app.put('/updateStatusCtg/:payeeId/:currentPeriod', verifyToken, (req, res) => {
    const payeeId = req.params.payeeId;
    const currentPeriod = req.params.currentPeriod;

    oracledb.getConnection(dbConfig, (err, connection) => {
        if (err) {
            console.error('Error connecting to the database:', err.message);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        const updateSql = queries.updateTableCtg;

        const bindParams = {
            payeeId: payeeId,
            currentPeriod: currentPeriod
        };

        connection.execute(updateSql, bindParams, { autoCommit: true }, (err, result) => {
            if (err) {
                console.error('Error executing update query:', err.message);
                res.status(500).json({ error: 'Internal Server Error' });
                connection.close();
                return;
            }

            if (result.rowsAffected > 0) {
                res.json({ message: 'Status updated to "Sent" successfully' });
            } else {
                res.status(404).json({ error: 'No rows updated' });
            }

            connection.close();
        });
    });
});

// app.post('/login', (req, res) => {
//     oracledb.getConnection(dbConfig, (err, connection) => {
//         if (err) {
//             console.error('Error connecting to the database:', err.message);
//             return res.status(500).json({ error: 'Database connection error' });
//         }

//         const sql = queries.login;

//         const bindParams = {
//             employee_id: req.body.employeeId,
//             employee_password: req.body.employeePassword,
//         };


//         connection.execute(sql, bindParams, { autoCommit: true }, (err, result) => {
//             if (err) {
//                 console.error('Error executing query:', err.message);
//                 connection.close();
//                 return res.status(500).json({ error: 'Error executing query', details: err.message });
//             }

//             // Log the entire result object to inspect its structure
//             //  console.log('result:', result);

//             if (result.rows.length > 0) {
//                 const user1 = result.rows[0];

//                 // Check if the ROLE information exists in the user1 array
//                 const role = user1[2]; // Assuming ROLE is in the third position (index 2)


//                 const data = {
//                     role: role,
//                     userId: user1[0]
//                 }

//                 const token = generateToken(data)

//                 if (role === 'admin') {
//                     connection.close();
//                     return res.json({ status: 'success', role: 'admin', token });
//                 } else if (role == null) {
//                     connection.close();
//                     return res.json({ status: 'success', role: null, token });
//                 } else {
//                     connection.close();
//                     return res.status(401).json({ error: 'Invalid role', token });
//                 }
//             } else {
//                 // Invalid ID or password
//                 connection.close();
//                 return res.status(401).json({ error: 'Invalid ID or password' });
//             }

//         });
//     });
// });
///////////////running login code
// app.post('/login', (req, res) => {
//     oracledb.getConnection(dbConfig, (err, connection) => {
//         if (err) {
//             console.error('Error connecting to the database:', err.message);
//             return res.status(500).json({ error: 'Database connection error' });
//         }

//         const sql = queries.login;

//         const bindParams = {
//             employee_id: req.body.employeeId,
//             employee_password: req.body.employeePassword,
//         };

//         connection.execute(sql, bindParams, { autoCommit: true }, (err, result) => {
//             if (err) {
//                 console.error('Error executing query:', err.message);
//                 connection.close();
//                 return res.status(500).json({ error: 'Error executing query', details: err.message });
//             }

//             if (result.rows.length > 0) {
//                 const user = result.rows[0];
//                 const role = user[2]; // Assuming ROLE is in the third position (index 2)

//                 const data = {
//                     role: role,
//                     userId: user[0]
//                 };

//                 const token = generateToken(data);

//                 // Return the token to the client
//                 res.json({ status: 'success', role: role, token: token });
//             } else {
//                 // Invalid ID or password
//                 connection.close();
//                 return res.status(401).json({ error: 'Invalid ID or password' });
//             }
//         });
//     });
// });
app.post('/login', (req, res) => {
    oracledb.getConnection(dbConfig, (err, connection) => {
        if (err) {
            console.error('Error connecting to the database:', err.message);
            return res.status(500).json({ error: 'Database connection error' });
        }

        const sql = queries.login;

        const bindParams = {
            employee_id: req.body.employeeId,
            employee_password: req.body.employeePassword,
        };

        connection.execute(sql, bindParams, { autoCommit: true }, (err, result) => {
            if (err) {
                console.error('Error executing query:', err.message);
                connection.close();
                return res.status(500).json({ error: 'Error executing query', details: err.message });
            }

            if (result.rows.length > 0) {
                const user1 = result.rows[0];
                console.log('all', user1)
                const role = user1[6];
                const loc = user1[20];
                const admin_loc = user1[8]
                console.log('loc', user1[20])
                console.log('rol', user1[6])
                console.log('admin_loc', user1[8])
                const data = {
                    role: role,
                    userId: user1[0],
                    loc: loc
                };

                const token = generateToken(data);
                console.log('Generated Token:', token); // Log the generated token

                // Set the token as a cookie with a longer expiration time
                res.cookie('token', token, { maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true }); // 7 days

                if (role === 'admin' && admin_loc === 'Corporate Office') {
                    connection.close();
                    return res.json({ status: 'success', role: 'admin', token, admin_loc: 'Corporate Office' });
                } else if (role === 'admin' && admin_loc === 'Kaligonj Factory Office') {
                    connection.close();
                    return res.json({ status: 'success', role: 'admin', token, admin_loc: 'Kaligonj Factory Office' });
                }
                else if (role === 'admin' && admin_loc === 'Labanchora Factory office') {
                    connection.close();
                    return res.json({ status: 'success', role: 'admin', token, admin_loc: 'Labanchora Factory office' });
                }
                else if (role === 'admin' && admin_loc === 'Shikolbaha Office Factory') {
                    connection.close();
                    return res.json({ status: 'success', role: 'admin', token, admin_loc: 'Shikolbaha Office Factory' });
                }
                else if (role === 'admin' && admin_loc === 'Chittagong') {
                    connection.close();
                    return res.json({ status: 'success', role: 'admin', token, admin_loc: 'Chittagong' });
                }
                else if (role == null && loc === 'Corporate Office' || loc === 'Gazipur' || loc === 'Rangpur' || loc === 'Bogra' || loc === 'Comilla' || loc === 'Mymensing' || loc === 'Narshindi' || loc === 'Sylhet' || loc === 'Tongi' || loc === 'Khulna' || loc === 'Faridpur Office' || loc === 'Jhenaidah') {
                    connection.close();
                    return res.json({ status: 'success', role: null, token, loc: 'Corporate Office' || loc === 'Gazipur' || loc === 'Rangpur' || loc === 'Bogra' || loc === 'Comilla' || loc === 'Mymensing' || loc === 'Narshindi' || loc === 'Sylhet' || loc === 'Tongi' || loc === 'Khulna' || loc === 'Faridpur Office' || loc === 'Jhenaidah' });
                }
                else if (role == null && loc === 'Kaligonj Factory Office') {
                    connection.close();
                    return res.json({ status: 'success', role: null, token, loc: 'Kaligonj Factory Office' });
                }
                else if (role == null && loc === 'Labanchora Factory office') {
                    connection.close();
                    return res.json({ status: 'success', role: null, token, loc: 'Labanchora Factory office' });
                }
                else if (role == null && loc === 'Shikolbaha Office Factory') {
                    connection.close();
                    return res.json({ status: 'success', role: null, token, loc: 'Shikolbaha Office Factory' });
                }
                else if (role == null && loc === 'Chittagong') {
                    connection.close();
                    return res.json({ status: 'success', role: null, token, loc: 'Chittagong' });
                }
                else {
                    connection.close();
                    return res.status(401).json({ error: 'Invalid role', token });
                }
            } else {
                // Invalid ID or password
                connection.close();
                return res.status(401).json({ error: 'Invalid ID or password' });
            }

        });
    });
});




app.post('/signup', async (req, res) => {
    oracledb.getConnection(dbConfig, async (err, connection) => {
        if (err) {
            console.error('Error connecting to the database:', err.message);
            return res.status(500).json({ error: 'Database connection error' });
        }

        // Check if the employee ID already exists
        const checkIdExistsSql = queries.checkIdExists;
        try {
            const resultCheckId = await connection.execute(checkIdExistsSql, { employee_id: req.body.employeeId });
            if (resultCheckId.rows.length > 0) {
                return res.status(400).json({ error: 'Employee ID already exists' });
            }
        } catch (error) {
            console.error('Error checking employee ID:', error);
            connection.close();
            return res.status(500).json({ error: 'Error checking employee ID' });
        }

        // If the employee ID doesn't exist, proceed with signup
        const sql = queries.signup;

        const bindVars = {
            employee_id: req.body.employeeId,
            employee_name: req.body.employeeName,
            nid_no: req.body.nidNo,
            phone_number: req.body.phoneNumber,
            email: req.body.email,
            employee_password: req.body.employeePassword,
            confirm_password: req.body.confirmPassword
        };

        connection.execute(sql, bindVars, { autoCommit: true }, (err, result) => {
            if (err) {
                console.error('Error executing query:', err.message);
                connection.close();
                return res.status(500).json({ error: 'Database query error' });
            }

            res.json({ message: 'Record created successfully' });

            connection.close();
        });
    });
});




// app.post('/create', (req, res) => {
//     oracledb.getConnection(dbConfig, (err, connection) => {
//         if (err) {
//             console.error('Error connecting to the database:', err.message);
//             return res.status(500).json({ error: 'Database connection error' });
//         }

//         const payee_id = req.body.payeeId;
//         const current_period = req.body.currentPeriod;

//         // Check if a record with the same payee_id and current_period exists with status 'Sent' or 'Closed'
//         const checkSql = `
//             SELECT STATUS
//             FROM XXCRM.XXSSGIL_CASH_PAY_DET
//             WHERE PAYEE_ID = :payee_id
//             AND CURRENT_PERIOD = TO_CHAR(TO_DATE(:current_period, 'MM/DD/YYYY HH:MI:SS AM'), 'Mon-YY')
//             AND STATUS IN ('Sent', 'Accepted')
//         `;

//         const checkBindVars = {
//             payee_id: payee_id,
//             current_period: current_period
//         };

//         connection.execute(checkSql, checkBindVars, (err, result) => {
//             if (err) {
//                 console.error('Error executing query:', err.message);
//                 connection.close();
//                 return res.status(500).json({ error: 'Database query error' });
//             }

//             if (result.rows.length > 0) {
//                 // If a record with status 'Sent' or 'Closed' exists, return an error
//                 connection.close();
//                 return res.status(400).json({ error: 'Record already sent or closed' });
//             }

//             // If no such record exists, proceed with the insertion
//             const insertSql = queries.createRecord;

//             const insertBindVars = {
//                 payee_id: payee_id,
//                 payee_name: req.body.payeeName,
//                 cash_amount: req.body.cashAmount,
//                 mail_address: req.body.mailAddress,
//                 current_period: current_period
//             };

//             connection.execute(insertSql, insertBindVars, { autoCommit: true }, (err, result) => {
//                 if (err) {
//                     console.error('Error executing query:', err.message);
//                     connection.close();
//                     return res.status(500).json({ error: 'Database query error' });
//                 }

//                 res.json({ message: 'Record created successfully' });

//                 connection.close();
//             });
//         });
//     });
// });



// backend code
// Add this route to handle password reset
app.post('/forgetpassword', async (req, res) => {
    const { employeeId, nidNo } = req.body;

    // Query the database to check if the provided employee ID and NID exist
    const sql = queries.forgetpassword;
    const bindParams = { empId: employeeId, nid: nidNo };

    try {
        const connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute(sql, bindParams);

        if (result.rows.length > 0) {
            // If the user exists, navigate to '/authenticated'
            res.json({ message: 'User found. Password can be reset.', navigate: true });
        } else {
            // If the user does not exist, return unauthorized
            res.status(401).json({ error: 'Unauthorized. Invalid employee ID or NID number.', navigate: false });
        }

        connection.close();
    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



// Add a new route to update the user's password
// Add a new route to update the user's password
app.put('/updatepassword/:id', async (req, res) => {
    const { employeeId, newPassword, confirmPassword } = req.body;

    // Check if newPassword and confirmPassword match
    if (newPassword !== confirmPassword) {
        return res.status(400).json({ error: "New password and confirm password do not match" });
    }

    // Update the password in the database using bind variables

    const sql = queries.updatepassword;
    const bindParams = { newPassword, confirmPassword, empId: employeeId };

    try {
        const connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute(sql, bindParams, { autoCommit: true });

        // Check if the update was successful
        if (result.rowsAffected > 0) {
            res.json({ message: 'Password updated successfully' });
        } else {
            res.status(500).json({ error: 'Failed to update password' });
        }

        connection.close();
    } catch (error) {
        console.error('Error updating password:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});





app.listen(8081, () => {
    console.log('listening');
});


// Middlwares

const secretKey = process.env.SECRET_KEY

function verifyToken(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: 'Forbidden' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        req.user = decoded;
        next();
    });
}

function checkRole(role) {
    return (req, res, next) => {
        const userRole = req.user.role;
        if (userRole !== role) {
            return res.status(403).json({ message: 'Forbidden: You do not have permission to access this resource' });
        }

        next();
    };
}
console.log(secretKey)
function generateToken(data) {
    return jwt.sign(data, secretKey, { expiresIn: '7d' });
}
