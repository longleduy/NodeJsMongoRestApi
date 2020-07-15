import { Request, Response } from "express";
import { Controller } from "../configs/decorators/Controller.decorator";
import { Get } from "../configs/decorators/Get.decorator";
import JsonRespone from '../models/Respone.model';
import {prefixConstant,apiPath,apiConstant} from '../constants/index';
import {episodeModel} from '../models/Episode.model';
import {episodeDetailModel} from '../models/EpisodeDetail.model';
interface IEpisodeDetailRequest extends Request {
  query: {
    program_id?: string,
    corner_id?: string,
    limit: string,
    page: string
  };
}
@Controller(prefixConstant.EPISODE_MULTI)
export default class EpisodeMultiController {
  @Get(apiPath.GET_LIST_EPISODE)
  public async getEpisodeMultiDetail(req: IEpisodeDetailRequest, res: Response){
    try {
      let programId : any = null;
      let limit = parseInt(req.query.limit);
      let skip = req.query.page || req.query.page !== "0" ? (Number(req.query.page) - 1)* limit : 0;
      if(req.query.program_id !== undefined){
        programId = req.query.program_id.split(",").map(function(item) {
          return parseInt(item);
        });
      };
      let cornerId : any = null;
      if(req.query.corner_id !== undefined){
        cornerId = req.query.corner_id.split(",").map(function(item) {
          return parseInt(item);
        });
      };
      let getDataFunc: any;
      let countDataFunc: any;
      let objc: any = {
        program_id: programId !== null ? {$in:programId}: null,
        corner_id: cornerId != null ?  {$in:cornerId}: null,
      };
      let filterOption: any = {};
      Object.keys(objc).forEach(function(key) {
        if (objc[key] !== null)
          filterOption[key] = objc[key];
      });
      getDataFunc = episodeModel.find(filterOption).sort({broadcast_date: -1,broadcast_time:-1}).skip(skip).limit(limit);
      countDataFunc = episodeModel.count(filterOption);
      let data: object = await getDataFunc;
      let count: number = await  countDataFunc;
      return new JsonRespone('',apiConstant.DEFAULT_STATUS_CODE,count,Number(req.query.page),limit,data)
    }catch (e) {
      console.log(e);
      return new JsonRespone('',500,null,null,null,{})
    }
  };
}