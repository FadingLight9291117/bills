export const config = {
    host: "localhost",
    port: 8080,
}

export class Api {
    constructor(config) {
        this.host = config.host ? config.host : 'localhost';
        this.port = config.port ? config.port : 8080;
        this.url = `${this.host}:${this.port}`
    }

    async getData(year, month) {
        const response = await fetch(`http://${this.url}?year=${year}&month=${month}`, {
            mode: 'cors'
        })
        return response.json()
    }
}
