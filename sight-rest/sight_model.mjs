import mongoose from 'mongoose';

mongoose.connect(
    "mongodb://localhost:27017/sight_db",
    { useNewUrlParser: true, useUnifiedTopology: true }
);

const db = mongoose.connection;
db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

mongoose.set("useCreateIndex", true);

/**
 * Define the schema
 */
const sightSchema = mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    weather: { type: String, required: true },
    crimeRate: { type: String, required: true },
});


const Sight = mongoose.model("Sight", sightSchema);

/**
 * Create an exercise
 * @param {String} name 
 * @param {Number} location 
 * @param {Number} weather 
 * @param {String} crimeRate 
 * @returns A promise. Resolves to the JSON object for the document created by calling save
 */
const createSight = async (name, location, weather, crimeRate) => {
    const sight = new Sight({ name: name, location: location, weather: weather, crimeRate: crimeRate });
    return sight.save();
}

/**
 * Retrive exercises based on the filter, projection and limit parameters
 * @param {Object} filter 
 * @param {String} projection 
 * @param {Number} limit 
 * @returns 
 */
const findSight = async (filter, projection, limit) => {
    const query = Sight.find(filter)
        .select(projection)
        .limit(limit);
    return query.exec();
}

/**
 * Find the exercise with the given ID value
 * @param {String} _id 
 * @returns 
 */
const findSightById = async (_id) => {
    const query = Sight.findById(_id);
    return query.exec();
}

/**
 * @param {String} _id 
 * @param {Number} reps 
 * @param {Number} weight 
 * @param {String} unit 
 * @param {String} date
 * @returns A promise. Resolves to the number of documents modified
 */
const replaceSight = async (_id, name, location, weather, crimeRate) => {
    const result = await Sight.replaceOne({ _id: _id }, { name: name, location: location, weather: weather, crimeRate: crimeRate });
    console.log(typeof (result.nModified), result.nModified)

    return result.nModified;
}


/**
 * Delete the exercise with provided id value
 * @param {String} _id 
 * @returns A promise. Resolves to the count of deleted documents
 */
const deleteById = async (_id) => {
    const result = await Sight.deleteOne({ _id: _id });
    return result.deletedCount;
}

export { deleteById, replaceSight, findSightById, createSight, findSight };