import { Request, Response } from "express";
import { Controller } from "../configs/decorators/Controller.decorator";
import { Get } from "../configs/decorators/Get.decorator";
import JsonRespone from '../models/Respone.model';
import {prefixConstant,apiPath,apiConstant} from '../constants/index';
import {tagModel} from '../models/Tag.model';
import {episodeModel} from "../models/Episode.model";
interface ITagInfoRequest extends Request {
  query: {
    limit: string
  };
};
interface ITagDetailRequest extends Request {
  query: {
    tag_title: string;
    limit: string;
    page: string;
  };
}
@Controller('/tags')
export default class TagController {
  @Get('/')
  public async getListSpecialInfo(req: ITagInfoRequest, res: Response){
    try {
      const limit: number = parseInt(req.query.limit);
      const getSpecialFunc = tagModel.find().limit(limit);
      const countSpecialFunc = tagModel.count({});
      const data: object = await getSpecialFunc;
      const count: number = await countSpecialFunc;
      return new JsonRespone('PY',apiConstant.DEFAULT_STATUS_CODE,count,0,limit,data)
    }
    catch (e) {
      return new JsonRespone('PY',500,null,null,null,{})
    }
  };
  @Get('/detail')
  public async getTagDetail(req: ITagDetailRequest){
    try {
      const limit: number = parseInt(req.query.limit);
      let episodeListFunc =  episodeModel.find({episode_tag:req.query.tag_title}).sort({broadcast_date: -1,broadcast_time:-1}).limit(limit);
      let countFunc =  episodeModel.count({episode_tag:req.query.tag_title});
      const data = await episodeListFunc;
      const count = await countFunc;
      console.log(count);
      return new JsonRespone('PY',apiConstant.DEFAULT_STATUS_CODE,count,0,limit,data)
    }
    catch (e) {
      return new JsonRespone('PY',500,null,null,null,{})
    }
  }
}