import {apiConstant} from '../constants/index';

export default class JsonRespone{
    public status_code: number = apiConstant.DEFAULT_STATUS_CODE;
    public data:object;
    public respone_code: number;
    public respone_msg: string | null;
    public total_fetch_count: number | null;
    public request_fetch_count: number | null;
    constructor(status_code: number,respone_code: number, respone_msg: string | null,total_fetch_count: number | null,request_fetch_count:number | null,data:object) {
        this.status_code = status_code;
        this.respone_msg = respone_msg;
        this.respone_code = respone_code | 1;
        this.total_fetch_count = total_fetch_count;
        this.request_fetch_count = request_fetch_count;
        this.data = data;
    }
    public getStatusCode(): number{
        return this.status_code;
    }
    public getData(): object{
        return {
            respone_code: this.respone_code,
            respone_msg: this.respone_msg,
            total_fetch_count: this.total_fetch_count,
            request_fetch_count: this.request_fetch_count,
            data: this.data
        };
    }
}