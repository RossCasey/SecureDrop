import request from 'superagent';

export function postDrop(cipherText) {
    return request
        .post('/api/v1/drop')
        .send({cipherText: cipherText})
        .then((response) => {
            if(response.statusCode !== 200) {
                throw new Error('Invalid Status Code');
            }
            return Promise.resolve(response.body.id);
        });
}

export function getDropById(id) {
    return request
        .get(`/api/v1/drop/${id}`)
        .then((response) => {
            if(response.statusCode !== 200) {
                throw new Error('Invalid Status Code');
            }
            return Promise.resolve(response.body.cipherText);
        });
}