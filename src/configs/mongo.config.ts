import mongoose from 'mongoose';
export class Mongo {
    public connect(): void{
        try {
            mongoose.set('useCreateIndex', true);
            mongoose.set('useFindAndModify', false);
            mongoose.set('useNewUrlParser', true);
            mongoose.connect(process.env.MONGODB_PATH as string, {useNewUrlParser: true, useUnifiedTopology: true}).then(r =>{
                console.log('MongoDB connected');
            }) ;
        } catch (error) {
            throw error;
        }
    }
}