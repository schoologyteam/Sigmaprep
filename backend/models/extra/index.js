import sqlExe from "#db/dbFunctions.js";
import {
  getClassesBySchoolId,
  getSchoolByClassId,
  getSchools,
} from "#models/class/index.js";
import {
  getLastRowManipulated,
  verifyUserOwnsRowId,
} from "#utils/sqlFunctions.js";

export async function getAnnouncement() {
  return (await sqlExe.executeCommand(`SELECT * FROM announcements`))[0]?.text;
}

export async function selectPdfs(WHERE, params) {
  return await sqlExe.executeCommand(
    `SELECT p.id, p.link, p.name, p.class_id, cl.category as class_category, cl.school_id FROM pdfs p
    JOIN classes cl ON p.class_id = cl.id 
    WHERE p.deleted = 0 AND ${WHERE}
    ORDER BY p.class_id`,
    params
  );
}

export async function getPdfsByClassId(class_id) {
  const params = { class_id };
  return await selectPdfs(`p.class_id = :class_id`, params);
}

export async function getPdfsByUserId(user_id) {
  const params = { user_id };
  return await selectPdfs(`p.created_by = :user_id`, params);
}

export async function upsertPdf(user_id, id, link, class_id, name) {
  const params = { user_id, id, link, class_id, name };

  // TODO MAKES SURE USER OWNS CLASS THEY ARE INSERTING PDF INTO
  if (!id && !(await verifyUserOwnsRowId(class_id, user_id, "classes"))) {
    throw new Error("user is adding a pdf to a class which they do NOT own");
  }

  const pdf_id = (
    await sqlExe.executeCommand(
      `INSERT INTO pdfs (name, created_by, id, link, class_id)
     VALUES(:name,:user_id, :id, :link, :class_id)
     ON DUPLICATE KEY UPDATE
      link = :link,
      class_id = :class_id,
      name=:name
`,
      params,
      { verifyUserOwnsRowId: "pdfs" }
    )
  ).insertId;
  return await selectPdfs(`p.id=:pdf_id`, { pdf_id: id || pdf_id });
}

export async function generateSitemap() {
  // get all schools add those
  // get all classes add them
  // get all groups add them
  const schools = await getSchools();

  let urlEntries = "";
  const classes = [];

  // First loop – add each school and collect its classes
  for (const school of schools) {
    const curClasses = await getClassesBySchoolId(school.id);
    classes.push(
      ...curClasses.map((cla) => ({ ...cla, school_name: school.school_name }))
    );

    const loc = `https://quackprep.com/class/${school.school_name}`;
    urlEntries += `  <url>\n    <loc>${loc}</loc>\n    <changefreq>monthly</changefreq>\n  </url>\n`;
  }

  // Second loop – add each individual class
  for (const cls of classes) {
    const classLoc = `https://quackprep.com/class/${cls.school_name}/${cls.id}/group`;

    urlEntries += `  <url>\n    <loc>${classLoc}</loc>\n    <changefreq>monthly</changefreq>\n  </url>\n`;
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries}</urlset>`;
  return xml;
}
