import mongoose from 'mongoose';
export class Mongo {
    public connect(): void{
        try {
            mongoose.set('useCreateIndex', true);
            mongoose.set('useFindAndModify', false);
            mongoose.set('useNewUrlParser', true);
            mongoose.set("debug", (collectionName: any, method: any, query: any, doc: any) => {
                console.log(`MONGOOSE: ${collectionName}.${method}`, JSON.stringify(query), doc);
            });
            mongoose.connect(process.env.MONGODB_PATH as string, {useNewUrlParser: true, useUnifiedTopology: true}).then(r =>{
                console.log('MongoDB connected');
            }) ;
        } catch (error) {
            throw error;
        }
    }
}