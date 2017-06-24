const sqlite = require('sqlite');

function getDropApi(sqlite) {
  return {
    create(id, cipherText) {
      return sqlite.run('INSERT INTO drops(id, cipherText) VALUES(:id, :cipherText)', {':id':id, ':cipherText':cipherText});
    },
    get(id) {
      return sqlite.get('SELECT * FROM drops WHERE claimed = 0 AND created >= date(\'now\',\'-1 day\') id = ? LIMIT 1', id);
    },
    claim(id) {
      return sqlite.run('UPDATE drops SET claimed = 1 WHERE id = ?', id);
    }
  }
}

function getApi(sqlite) {
  return {
    drop: getDropApi(sqlite)
  }
}

module.exports = () => {
  const path = process.env.DB_DATABASE || './database.sqlite';
  const migrate = process.env.DB_MIGRATE || false;
  const force = process.env.DB_MIGRATE_FORCE || false;

  return sqlite.open(path, { Promise }).then(() => {
    if(migrate) return sql.migrate({ force: force});
    return Promise.resolve();
  }).then(() => {
    return getApi(sqlite);
  }).catch((err) => {
    throw err;
  })
};
