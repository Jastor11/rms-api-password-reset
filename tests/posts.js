const db = require("../db")

const createPosts = async (userIds) => {
  await db.query(`
    INSERT INTO posts (user_id, caption, image_url)
    VALUES (
      ${userIds[0]},
      'My fancy workstation',
      'https://images.unsplash.com/photo-1596443019365-eb263a588404?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2089&q=80'
    ), (
      ${userIds[1]},
      'Very, very sweet setup',
      'https://images.unsplash.com/photo-1572314493295-09c6d5ec3cdf?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80'
    );
  `)

  const results = await db.query(`SELECT id FROM posts ORDER BY id ASC`)

  const ids = results.rows.map((row) => row.id)
  return ids
}

module.exports = { createPosts }
