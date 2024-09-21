import sqlExe from "#db/dbFunctions.js";
export async function getTopicsByClassId(class_id) {
  const params = { class_id };
  return await sqlExe.executeCommand(
    `SELECT * FROM topics WHERE class_id = :class_id ORDER BY id ASC`,
    params
  );
}

export async function getTopicIdByClassNameAndTopicName(topicName, className) {
  const params = { topicName, className };
  return await sqlExe.executeCommand(
    `SELECT t.id,t.name FROM topics t JOIN classes c on t.class_id = c.id WHERE t.name = :topicName AND c.name = :className`,
    params
  );
}
