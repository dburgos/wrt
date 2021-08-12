const QUERY = `
    SELECT COUNT(DISTINCT client_id) AS count_clients, country
    FROM log
    WHERE book_id = $1
    GROUP BY country`;

export default async function countClientsByCountry(db: any, bookId: string): Promise<Object[]> {
    const { rows } = await db.query(QUERY, [bookId])
    return rows
}