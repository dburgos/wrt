
const DEFAULT_FIRST_ITEM = 1;
const DEFAULT_PAGE_SIZE= 10;
const QUERY = `
    SELECT uuid, title, author, language, id 
    FROM book
    WHERE id > $1
    ORDER BY id ASC
    LIMIT $2`;
    
export default async function getList(db: any, 
    nextId: number = DEFAULT_FIRST_ITEM, 
    size: number = DEFAULT_PAGE_SIZE): Promise<Object[]> 
{
    const { rows } = await db.query(QUERY, [nextId, size])
    return rows
}