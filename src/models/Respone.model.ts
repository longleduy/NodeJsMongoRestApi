import {apiConstant} from '../constants/index';

export default class JsonRespone{
    public status_code: number = apiConstant.DEFAULT_STATUS_CODE;
    public data:object;
    public total_count: number | null;
    public page: number | null;
    public limit: number | null;
    public respone_status: string | null;
    constructor(respone_status: string,status_code: number,total_count: number | null,page:number | null,limit: number | null,data:object) {
        this.status_code = status_code;
        this.total_count = total_count;
        this.page = page;
        this.limit = limit;
        this.data = data;
        this.respone_status = respone_status;
    }
    public getStatusCode(): number{
        return this.status_code;
    }
    public getData(): object{
        if(this.respone_status === 'PY'){
            return {
                respone_code: 1,
                respone_msg: null,
                total_count: this.total_count,
                limit: this.limit,
                page: 1,
                data: this.data
            }
        }
        return {
            paging:{
                total_count: this.total_count,
                page: this.page,
                limit: this.limit
            },
            data: this.data
        };
    }
}