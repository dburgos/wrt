const QUERY = `
    SELECT id, iconcolor, iconurl, name, description, parent_id, listorder
    FROM category`;
    
export default async function getList(db: any): Promise<Object[]> {
    const { rows } = await db.query(QUERY)
    return rows
}