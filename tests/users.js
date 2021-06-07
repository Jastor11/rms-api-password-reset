const bcrypt = require("bcrypt")
const db = require("../db")
const tokens = require("../utils/tokens")
const { BCRYPT_WORK_FACTOR } = require("../config")

const createUsers = async () => {
  await db.query(`
    INSERT INTO users (username, email, password, is_admin)
    VALUES (
      'jlo',
      'jennifer@lopez.io',
      '${await bcrypt.hash("password", BCRYPT_WORK_FACTOR)}',
      FALSE  
    ), (
      'lebron',
      'lebron@james.io',
      '${await bcrypt.hash("password1", BCRYPT_WORK_FACTOR)}',
      FALSE  
    ), (
      'serena',
      'serena@williams.io',
      '${await bcrypt.hash("password2", BCRYPT_WORK_FACTOR)}',
      TRUE  
    );  
  `)

  const results = await db.query(`SELECT id FROM users ORDER BY id ASC`)

  const ids = results.rows.map((row) => row.id)
  return ids
}

const jloToken = tokens.createUserJwt({ username: "jlo", isAdmin: false })
const lebronToken = tokens.createUserJwt({ username: "lebron", isAdmin: false })
const serenaAdminToken = tokens.createUserJwt({ username: "serena", isAdmin: true })

module.exports = {
  createUsers,
  jloToken,
  lebronToken,
  serenaAdminToken,
}
