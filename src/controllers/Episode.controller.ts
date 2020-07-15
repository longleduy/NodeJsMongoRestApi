import { Request, Response } from "express";
import { Controller } from "../configs/decorators/Controller.decorator";
import { Get } from "../configs/decorators/Get.decorator";
import JsonRespone from '../models/Respone.model';
import {prefixConstant,apiPath,apiConstant} from '../constants/index';
import {episodeModel} from '../models/Episode.model';
import {episodeDetailModel} from '../models/EpisodeDetail.model';
interface IEpisodeDetailRequest extends Request {
  params: {
    id: string
  };
}
@Controller(prefixConstant.EPISODE)
export default class EpisodeController {
  @Get(apiPath.GET_EPISODE_DETAIL)
  public async getEpisodeDetail(req: IEpisodeDetailRequest, res: Response){
    try {
      let episodeInfoFunc =  episodeModel.find({episode_id:parseInt(req.params.id)},{_id: 0 }).exec();
      let episodeDetailFunc =  episodeDetailModel.find({episode_id:parseInt(req.params.id)},{_id: 0, episode_id: 0}).exec();
      let episodeInfo:any = (await episodeInfoFunc)[0];
      let episodeDetail:any = (await episodeDetailFunc)[0];
      let episodeInfoRes = episodeInfo ? episodeInfo._doc : {};
      let episodeDetailRes = episodeDetail ? episodeDetail._doc : {};
      let data = {...episodeInfoRes,...episodeDetailRes};
      if(Object.keys(data).length === 0){
        data = null;
      }
      return new JsonRespone('',apiConstant.DEFAULT_STATUS_CODE,0,0,0,data)
    }
    catch (e) {
      console.log(e);
      return new JsonRespone('',500,null,null,null,{})
    }
  };
}