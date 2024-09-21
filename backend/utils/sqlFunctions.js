export function getLastRowManipulated(tableName, rowId = null) {
  if (rowId) {
    return `SELECT *
    FROM ${tableName} WHERE
    id = ${rowId};`;
  } else {
    return `SELECT * FROM ${tableName} WHERE id = LAST_INSERT_ID()`;
  }
}
