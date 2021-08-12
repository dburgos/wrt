const QUERY = `
    SELECT id, usergender AS gender, age, createdat AS createdAt, updatedat AS updatedAt
    FROM wr_user
    WHERE id = $1
    LIMIT 1`;
    
export default async function countClientsByCountry(db: any, userId: string): Promise<Object> {
    const { rows } = await db.query(QUERY, [userId])
    const hasRow = rows && rows.length
    return hasRow ? rows[0] : {}
}