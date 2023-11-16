import * as SQLite from 'expo-sqlite';

const database_name = 'CourseWork.db';
const database_version = '1.0';
const database_displayname = 'Coursework Database';
const database_size = 700000;

const db = SQLite.openDatabase(
  database_name,
  database_version,
  database_displayname,
  database_size
);
//DATA 1
const initDatabase = () => {
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS hikes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        location TEXT,
        date DATE,
        park TEXT,
        length INTEGER,
        level TEXT,
        des TEXT
      );`,
      [],
      () => console.log('Database and table created successfully.'),
      (error) => console.log('Error occurred while creating the table.', error)
    );
  });
};

const addHike = (name, location, date, park, length, level, des) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO hikes (name, location, date, park, length, level, des) VALUES (?, ?, ?, ?, ?, ? ,?)',
        [name, location, date, park, length, level, des],
        (_, { insertId }) => {
          resolve(insertId);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

const deleteAllHike = () => {
  db.transaction((tx) => {
    tx.executeSql(
      `DELETE FROM hikes`,
      [],
      () => console.log('Delete Successfully'),
      (error) => console.log('Error Deleteed.', error)
    );
  });
};

const getHikes = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM hikes',
        [],
        (_, { rows }) => {
          resolve(rows._array);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

const updateHike = (id, name, location, date, park, length, level, des) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `UPDATE hikes SET name = ?, location = ?, date = ?, park = ?, length = ?, level = ?, des = ? WHERE id = ?`,
        [name, location, date, park, length, level, des, id],
        (_, { updateId }) => {
          resolve(updateId);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

const deleteHike = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM hikes WHERE id = ?',
        [id],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

const Database = {
  initDatabase,
  addHike,
  getHikes,
  updateHike,
  deleteHike,
  deleteAllHike,
};

export default Database;
