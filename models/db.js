const mongoose = require('mongoose');

// const url = "mongodb://localhost:27017";
const url = "mongodb+srv://stsweng-kubernetes:dadWym-mefseg-cuqhi2@cluster0.5z9xl.mongodb.net/stsweng-kubernetes?retryWrites=true&w=majority";
const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
};

// database functions (CRUD functions)
const database = {

    /*
        connects to database
    */
    connect: function () {
        mongoose.connect(url, options, function (error) {
            if (error) throw error;
            console.log('Connected to: ' + url);
        });
    },

    /*
        inserts a single `doc` to the database based on the model `model`
    */
    insertOne: function (model, doc, callback) {
        model.create(doc, function (error, result) {
            console.log(error);
            if (error) return callback(false);
            console.log('Added ' + result);
            return callback(true);
        });
    },

    /*
        inserts multiple `docs` to the database based on the model `model`
    */
    insertMany: function (model, docs) {
        model.insertMany(docs, function (error, result) {
            if (error) throw error;
            console.log('Added ' + result);
            return result;
        });
    },

    /*
        searches for a single document based on the model `model`
        filtered through the object `query`
        limits the fields returned based on the string `projection`
        callback function is called after the execution of findOne() function
    */
    findOne: function (model, query, projection, callback) {
        model.findOne(query, projection, function (error, result) {
            if (error) return callback(false);
            return callback(result);
        });
    },

    /*
        searches for multiple documents based on the model `model`
        filtered through the object `query`
        limits the fields returned based on the string `projection`
        callback function is called after the execution of findMany() function
    */
    findMany: function (model, query, projection, callback) {
        model.find(query, projection).lean().exec(function (error, result) {
            if (error) return callback(false);
            return callback(result);
        });
    },

    /*
        updates the value defined in the object `update`
        on a single document based on the model `model`
        filtered by the object `filter`
    */
    updateOne: function (model, filter, update, callback) {
        model.updateOne(filter, update, function (error, result) {
            if (error) return callback(false);
            console.log('Document modified: ' + result.nModified);
            return callback(result);
        });
    },

    /*
        updates the value defined in the object `update`
        on multiple documents based on the model `model`
        filtered using the object `filter`
    */
    updateMany: function (model, filter, update) {
        model.updateMany(filter, update, function (error, result) {
            if (error) return callback(false);
            console.log('Documents modified: ' + result.nModified);
            return callback(true);
        });
    },

    /*
        deletes a single document based on the model `model`
        filtered using the object `conditions`
    */
    deleteOne: function (model, conditions) {
        model.deleteOne(conditions, function (error, result) {
            if (error) throw error;
            console.log('Document deleted: ' + result.deletedCount);
            return result;
        });
    },

    /*
        deletes multiple documents based on the model `model`
        filtered using the object `conditions`
    */
    deleteMany: function (model, conditions, callback) {
        model.deleteMany(conditions, function (error, result) {
            if (error) return callback(false);
            console.log('Document deleted: ' + result.deletedCount);
            return callback(true);
        });
    }
}

/*
    exports the object `database` (defined above)
    when another script exports from this file
*/
module.exports = database;