export const config = {
    host: "47.99.156.88",
    port: 8080,
}

export class Api {
    constructor(config) {
        this.host = config.host ? config.host : 'localhost';
        this.port = config.port ? config.port : 8080;
        this.url = `http://${this.host}:${this.port}`
    }

    async getData(year, month) {
        const response = await fetch(`${this.url}?year=${year}&month=${month}`, {
            mode: 'cors'
        })
        return response.json()
    }

    async postData(data) {
        const response = await fetch(`${this.url}/add`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }, // 必须添加，否则后端接收不到json
            body: JSON.stringify(data)
        });
        return response.json();
    }

}


