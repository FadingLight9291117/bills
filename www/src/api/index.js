const config = {
    host: "localhost",
    port: 8080,
}

class Api {
    constructor(config) {
        this.host = config.host
        this.port = config.port
        this.url = `${this.host}:${this.port}`
    }

    async getData(year, month) {
        const response = await fetch(`http://${this.url}?year=${year}&month=${month}`, {
            mode: 'cors'
        })
        return response.json()
    }
}

const api = new Api(config)

export default api