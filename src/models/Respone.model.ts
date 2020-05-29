import {apiConstant} from '../constants/index';

export default class JsonRespone{
    public status_code: number = apiConstant.DEFAULT_STATUS_CODE;
    public msg: string = apiConstant.DEFAULT_MSG;
    public data:object;
    constructor(status_code:number,msg:string,data:object) {
        this.status_code = status_code;
        this.msg = msg;
        this.data = data;
    }
    public getStatusCode(): number{
        return this.status_code;
    }
    public getData(): object{
        return {
            message: this.msg,
            data: this.data
        };
    }
}