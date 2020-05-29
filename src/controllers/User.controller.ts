import { Request, Response } from "express";
import { Controller } from "../configs/decorators/Controller.decorator";
import { Get } from "../configs/decorators/Get.decorator";
import JsonRespone from '../models/Respone.model';
import {apiConstant,prefixConstant,endpointConstant} from '../constants/index';
import {userModel} from '../models/User.model';
interface IUserDetailRequest extends Request {
    params: {
        id: string,
    };
}
@Controller(prefixConstant.USER_PREFIX)
export default class CatController {
    @Get(endpointConstant.GET_ALL_USER)
    public async index(req: Request, res: Response) {
        try {
            let data: object = await userModel.find({});
            return new JsonRespone(apiConstant.DEFAULT_STATUS_CODE,apiConstant.DEFAULT_MSG,data)
        }catch (e) {
            return new JsonRespone(500,apiConstant.DEFAULT_MSG,e.toString());
        }
    }
    @Get(endpointConstant.GET_USER_BY_ID)
    public details(req: IUserDetailRequest, res: Response) {
        return new JsonRespone(apiConstant.DEFAULT_STATUS_CODE,apiConstant.DEFAULT_MSG,{content:`hello ${req.params.id}`})
    }
}