
import squel from "squel";

const DEFAULT_PAGE_SIZE= 10;
    
export default async function getList(db: any, 
    nextId: string, 
    size: number = DEFAULT_PAGE_SIZE,
    gender: number,
    minAge: number,
    maxAge: number,
    sortBy: string): Promise<Object[]> 
{
    const query = squel.select()
    query.fields(['id', 'usergender AS gender', 'age', 'createdat AS createdAt', 'updatedat AS updatedAt'])
    query.from('wr_user')
    if (nextId) {
        query.where('id > ?', nextId)
    }
    if (gender) {
        query.where('usergender = ?', gender)
    }
    if (minAge) {
        query.where('age >= ?', minAge)
    }
    if (maxAge) {
        query.where('age <= ?', maxAge)
    }
    query.order('id')
    if (sortBy) {
        query.order(sortBy)
    }
    query.limit(size)
    const { rows } = await db.query(query.toString())
    return rows
}