export class RequestRepository<T>
{
    async Post(entidad : T, url : string) : Promise<boolean>
    {
        return await fetch(url, {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(entidad)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }

            return response.json() as Promise<boolean>
        })
        .then(json => {
            return json;
        })
    }

    async Get(url : string) : Promise<T[]>
    {
        return fetch(url, {
            method:'GET'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }

            return response.json() as Promise<T[]>
        })
        .then(json => {
            return json;
        })
    }

    async Put(entidadModificar : T, url : string) : Promise<boolean>
    {
        return await fetch(url, {
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(entidadModificar)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText)
            }

            return response.json() as Promise<boolean>
        })
        .then(json => {
            return json;
        })
    }
}