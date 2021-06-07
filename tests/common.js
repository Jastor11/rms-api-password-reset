const db = require("../db.js")
const { createUsers, jloToken, lebronToken, serenaAdminToken } = require("./users")
const { createPosts } = require("./posts")

const userIds = []
const postIds = []

async function commonBeforeAll() {
  // any database actions we want to take
  // before running all the tests like
  // seeding it with different dummy data
  // delete all current test data
  await db.query(`DELETE FROM users`)
  // insert fresh test data
  const createdUserIds = await createUsers()
  const createdPostIds = await createPosts(createdUserIds)

  createdUserIds.forEach((id) => userIds.push(id))
  createdPostIds.forEach((id) => postIds.push(id))
}

async function commonBeforeEach() {
  await db.query("BEGIN")
}

async function commonAfterEach() {
  await db.query("ROLLBACK")
}

async function commonAfterAll() {
  await db.end()
}

module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  jloToken,
  lebronToken,
  serenaAdminToken,
  userIds,
  postIds,
}
