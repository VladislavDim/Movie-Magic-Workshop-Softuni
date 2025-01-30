import Cast from "../models/Cast.js";

export default {
    createCast(castData) {
        return Cast.create(castData);
    },
    getAllCasts() {
        return Cast.find({});
    }
}