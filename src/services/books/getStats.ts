import countUniqueReadClients from "./countUniqueReadClients"
import countUniqueReadUsers from "./countUniqueReadUsers"
import countClientsByCountry from "./countClientsByCountry"
    
export default async function getList(db: any, bookId: string): Promise<Object> 
{
    const [
        uniqueClients, uniqueUsers, clientsByCountry
    ] = await Promise.all([
        countUniqueReadClients(db, bookId),
        countUniqueReadUsers(db, bookId),
        countClientsByCountry(db, bookId)
    ])
    const out = {
        uniqueClients,
        uniqueUsers,
        clientsByCountry
    }
    return out
}