export type obj = {id: number, name: string, ranking: number}


export function csv(raw:string) {
    const rows = raw.split('\n')
    const titles = rows.shift()
    const arr = [] as obj[]
    for (const element of rows) {
        const [_id, name, _ranking] = element.split(',')
        const id=+_id;
        const ranking = +_ranking
        arr.push({
            id,
            ranking,
            name
        })
    }
    return arr
}