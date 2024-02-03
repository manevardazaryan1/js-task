class Singleton {
    /*
        class name: Singleton

        Key features:

            - getInstance: Preferred method to create and access the instance.
            - constructor: Allowed for flexibility(logs message... suggested the getInstance method insted)
            - uses callByGetInstance field to track the method of instantiation.
     */

    static #callByGetInstance = false;

    constructor(URL) {
        this.URL = URL;
        this.data = [];
        this.grouped = [];

        if (!Singleton.#callByGetInstance) {
            console.log("Please use getInstance method");
        }

        if (!Singleton.instance) {
            Singleton.instance = this;
       }

       return Singleton.instance;
    }

    static getInstance(URL) {
        if (!Singleton.instance) {
            Singleton.#callByGetInstance = true;
            Singleton.instance = new Singleton(URL);
            Singleton.#callByGetInstance = false;
        }

        return Singleton.instance;
    }

    async #get(URL) {
        try {
            const response = await fetch(URL);
            const data = await response.json();
            return data;
        } catch(error) {
            throw error;
        }
    }

    async group(someKey) {
        const grouped = {};
        const data = await this.#get(this.URL);

        for (let idx = 0; idx < data.length; ++idx) {
            if (!(data[idx][someKey] in grouped)) {
                grouped[data[idx][someKey]] = (data.filter((item) => item[someKey] === data[idx][someKey]));
            }
        }

        this.grouped = grouped;
    }

    groupByPostId(postId) {
        this.group(postId);
    }

    getData() {
        return this.grouped;
    }
}
