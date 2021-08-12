const QUERY = `
    SELECT COUNT(client_id) AS count_clients, country
    FROM (SELECT DISTINCT client_id, country
            FROM log
            WHERE book_id = $1) AS temp
    GROUP BY country`;

export default async function countClientsByCountry(db: any, bookId: string): Promise<Object[]> {
    const { rows } = await db.query(QUERY, [bookId])
    return rows
}