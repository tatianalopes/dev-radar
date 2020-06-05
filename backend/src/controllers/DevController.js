const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    async index(request, response) {
        const devs = await Dev.find();

        return response.json(devs);
    },

    async store(request, response) {
        const { github_username, techs, latitude, longitude } = request.body;
        const techsArray = parseStringAsArray(techs);
        const location = {
            type: 'Point',
            coordinates: [longitude, latitude],
        };

        // check if Dev is already registered
        let dev = await Dev.findOne({ github_username });
        if (!dev) {
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
            const { name = login, avatar_url, bio } = apiResponse.data;
    
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            });
        }

        return response.json(dev);
    },

    async update(request, response) {
        const { id } = request.params;
        const { techs, name, avatar_url, bio, latitude, longitude } = request.body;
        const techsArray = parseStringAsArray(techs);
        const location = {
            type: 'Point',
            coordinates: [longitude, latitude],
        };

        await Dev.findByIdAndUpdate(id, {
            name,
            avatar_url,
            bio,
            techs: techsArray,
            location,
        }, { useFindAndModify: false })

        return response.status(204).send();
    },

    async destroy(request, response) {
        const { id } = request.params;

        await Dev.findByIdAndRemove(id, { useFindAndModify: false });

        return response.status(204).send(); // response with no content
    }
};