import sqlExe from "#db/dbFunctions.js";

/**
 * Checks if the user has a streak currently.
 * @param {Int} userId
 * @returns {Boolean}
 */
export async function hasStreak(userId) {
  const sqlCommand =
    "SELECT s.has_streak FROM streak s WHERE s.user_id = :userId";
  const params = {
    userId,
  };
  const result = await sqlExe.executeCommand(sqlCommand, params);
  if (!result[0]?.has_streak) {
    return 0;
  }
  return result[0].has_streak;
}

export async function getStreakData(userId) {
  const sqlCommand = "SELECT * FROM streak WHERE user_id = :userId";
  const params = {
    userId,
  };
  const result = await sqlExe.executeCommand(sqlCommand, params);
  return result[0];
}

export async function getTopStreaks(amt) {
  return await sqlExe.executeCommand(
    `SELECT s.user_id, s.current_streak, u.username FROM streak s INNER JOIN users u ON s.user_id = u.id
    ORDER BY s.current_streak DESC
    LIMIT :amt`,
    { amt }
  );
}
