import { Request, Response } from "express";
import { Controller } from "../configs/decorators/Controller.decorator";
import { Get } from "../configs/decorators/Get.decorator";
import JsonRespone from '../models/Respone.model';
import {prefixConstant,apiPath,apiConstant} from '../constants/index';
import {specialModel} from '../models/Special.model';
interface ISpecialInfoRequest extends Request {
  query: {
    position: string,
    limit: string
  };
}
@Controller(prefixConstant.INDEX)
export default class CommonController {
  @Get(apiPath.GET_LIST_SPECIAL_INFO)
  public async getListSpecialInfo(req: ISpecialInfoRequest, res: Response){
    try {
      const limit: number = parseInt(req.query.limit);
      const position: string = req.query.position;
      const getSpecialFunc = specialModel.find({position:position}).sort({broadcast_date: -1,broadcast_time:-1}).limit(limit);
      const countSpecialFunc = specialModel.count({});
      const data: object = await getSpecialFunc;
      const count: number = await countSpecialFunc;
      return new JsonRespone('PY',apiConstant.DEFAULT_STATUS_CODE,count,0,limit,data)
    }
    catch (e) {
      return new JsonRespone('PY',500,null,null,null,{})
    }
  }
}