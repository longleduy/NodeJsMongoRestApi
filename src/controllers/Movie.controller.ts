import { Request, Response } from "express";
import { Controller } from "../configs/decorators/Controller.decorator";
import { Get } from "../configs/decorators/Get.decorator";
import JsonRespone from '../models/Respone.model';
import {prefixConstant,apiPath,apiConstant} from '../constants/index';
import {episodeModel} from '../models/Episode.model';
import {episodeDetailModel} from '../models/EpisodeDetail.model';
import {movieModel} from "../models/Movie.model";
// @ts-ignore
interface IMovieDetailRequest extends Request {
  query: {
    episode_id: number;
    program_id: string;
    take_mode: number;
  };
}
@Controller(prefixConstant.MOVIE)
export default class MovieController {
  @Get(apiPath.GET_MOVIE_DETAIL)
  public async getMovieDetail(req: IMovieDetailRequest, res: Response){
    try {
      let movieData: any = await movieModel.findOne({episode_id:req.query.episode_id},{_id: 0 });
      let data: any = {};
      if(movieData){
        data.response_code = 0;
        data.movie_url = movieData._doc.movie_url;
      }
      else{
        data.response_code = 9;
      }
      return new JsonRespone('',apiConstant.DEFAULT_STATUS_CODE,0,0,0,data)
    }
    catch (e) {
      console.log(e);
      return new JsonRespone('',500,null,null,null,{})
    }
  }
}