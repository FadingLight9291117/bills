export const config = {
    host: "",
    port: 8080,
}

export class Api {
    constructor(config) {
        this.host = config.host && config.host !== '' ? config.host : 'localhost';
        this.port = config.port ? config.port : 8080;
        this.url = `http://${this.host}:${this.port}/api`
    }

    async getData(year, month) {
        const response = await fetch(`${this.url}/listBill?year=${year}&month=${month}`, {
            mode: 'cors'
        })
        return response.json()
    }

    async postData(data) {
        const response = await fetch(`${this.url}/addBill`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }, // 必须添加，否则后端接收不到json
            body: JSON.stringify(data)
        });
        return response.json();
    }

    async removeItemById(id) {
        const response = await fetch(`${this.url}/removeBill?id=${id}`, {
            method: 'DELETE',
            mode: 'cors'
        });
        return response.json();
    }

}


