export default class GithubRepository {

    constructor() { }

    BASE_URL = 'https://api.github.com/'
    SEARCH_USER = `${this.BASE_URL}search/users?q=`
    SEARCH_REPOSITORY = `${this.BASE_URL}search/repositories?q=`

    async searchUser(searchText) {

        try {
            const response = await fetch(`${this.SEARCH_USER}${searchText}`);
            const json = await response.json();

            return JSON.parse(JSON.stringify(json));
        } catch (error) {
            console.error(error);
            return null
        }

    }

    async searchRepository(searchText) {

        try {
            const response = await fetch(`${this.SEARCH_REPOSITORY}${searchText}`);
            const json = await response.json();

            return JSON.parse(JSON.stringify(json));
        } catch (error) {
            console.error(error);
            return null
        }

    }
}
