const QUERY = `
    SELECT COUNT(*) 
    FROM 
        (SELECT DISTINCT user_id 
            FROM log
            WHERE book_id = $1) AS temp`;
    
export default async function countUniqueReadUsers(db: any, bookId: string): Promise<Number> {
    const { rows } = await db.query(QUERY, [bookId])
    const hasCount = rows && rows.length
    return hasCount ? parseInt(rows[0].count) : 0
}