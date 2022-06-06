/**
 * Defines constructor for Tutorial model using
 * db.js connection to write CRUD functions
 */

const sql = require('./db.js');

// Constructor
const Tutorial = function (tutorial) {
  this.title = tutorial.title;
  this.description = tutorial.description;
  this.published = tutorial.published;
};

const handleError = function (error) {
  if (error) {
    console.log('error: ', error);
    result(error, null);
    return;
  }
};

Tutorial.create = (newTutorial, result) => {
  sql.query('INSERT INTO tutorials SET ?', newTutorial, (err, res) => {
    handleError('error: ', err);
    console.log('created tutorial: ', { id: res.insertId, ...newTutorial });
    result(null, { id: res.insertId, ...newTutorial });
  });
};
Tutorial.findById = (id, result) => {
  sql.query(`SELECT * FROM tutorials WHERE id = ${id}`, (err, res) => {
    handleError(err);
    if (res.length) {
      console.log('found tutorial: ', res[0]);
      result(null, res[0]);
      return;
    }
    result({ kind: 'not_found' }, null);
  });
};

Tutorial.getAll = (title, result) => {
  let query = 'SELECT * FROM tutorials';
  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }
  sql.query(query, (err, res) => {
    handleError(err);
    console.log('tutorials: ', res);
  });
};

Tutorial.getAllPublished = (result) => {
  sql.query('SELECT * FROM tutorials WHERE published=true', (err, res) => {
    handleError(err);
    console.log('tutorials: ', res);
    result(null, res);
  });
};

Tutorial.updateById = (id, tutorial, result) => {
  sql.query(
    'UPDATE tutorials SET title = ?, description = ?, published = ? WHERE id = ?',
    [tutorial.title, tutorial.description, tutorial.published, id],
    (err, res) => {
      handleError(err);
      if (res.affectedRows == 0) {
        // Not found tutorial with id
        result({ kind: 'not_found' }, null);
        return;
      }
      console.log('Updated tutorial: ', { id: id, ...tutorial });
      result(null, { id: id, ...tutorial });
    }
  );
};

Tutorial.remove = (id, result) => {
  sql.query('DELETE FROM tutorials WHERE id = ?', id, (err, res) => {
    handleError(err);
    if (res.affectedRows == 0) {
      // Not found Tutorial with id
      result({ kind: 'not_found' }, null);
      return;
    }
    console.log('Deleted tutorial with id: ', id);
    result(null, res);
  });
};

Tutorial.removeAll = (result) => {
  sql.query('DELETE FROM tutorials', (err, res) => {
    handleError(err);
    console.log(`Deleted ${res.affectedRows} tutorials`);
    result(null, res);
  });
};

module.exports = Tutorial;
