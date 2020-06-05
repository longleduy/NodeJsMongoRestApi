import {apiConstant} from '../constants/index';

export default class JsonRespone{
    public status_code: number = apiConstant.DEFAULT_STATUS_CODE;
    public data:object;
    public total_count: number | null;
    public page: number | null;
    public limit: number | null;
    constructor(status_code: number,total_count: number | null,page:number | null,limit: number | null,data:object) {
        this.status_code = status_code;
        this.total_count = total_count;
        this.page = page;
        this.limit = limit;
        this.data = data;
    }
    public getStatusCode(): number{
        return this.status_code;
    }
    public getData(): object{
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