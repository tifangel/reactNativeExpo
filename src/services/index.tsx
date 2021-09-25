import client from './client';

const MovieService = {
    getList() {
        return client.get('/?apikey=ad3c5d82&s=batman');
    },
    getDetail(title: string) {
        return client.get(`/?apikey=ad3c5d82&t=${title}`)
    }
};

export default MovieService;