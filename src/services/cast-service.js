import Cast from "../models/Cast.js";

export default {
    createCast(castData) {
        return Cast.create(castData);
    },
    getAllCasts(filter = {}) {
        let query = Cast.find({});

        if (filter.exclude) {
            query.find({ _id: { $nin: filter.exclude } });
        } 
        return query;
    }
}