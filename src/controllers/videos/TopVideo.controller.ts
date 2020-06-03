import { Request, Response } from "express";
import { Controller } from "../../configs/decorators/Controller.decorator";
import { Get } from "../../configs/decorators/Get.decorator";
import JsonRespone from '../../models/Respone.model';
import {prefixConstant,apiPath,apiConstant} from '../../constants/index';
import {episodeModel} from '../../models/Episode.model';
interface IEpisodeDetailRequest extends Request {
    query: {
        mode: string,
        sort: string,
        limit: string;
    };
}
@Controller(prefixConstant.EPISODE)
export default class TopVideoController {
    @Get(apiPath.GET_LIST_EPISODE)
    public async index(req: IEpisodeDetailRequest, res: Response) {
        console.log(req.query);
        try {
            let mode : number = 1;
            switch (req.query.mode) {
                case 'back':
                    mode = 1;
                    break;
                case 'new':
                    mode = 3;
                    break;
                case 'reco':
                    mode = 2;
                    break;
                default:
                    mode = 4;
            }
            let sort: number = req.query.sort === 'asc' ? 1 : -1;
            let data: object = await episodeModel.find({episode_play_type:mode}).sort({_id: sort}).limit(parseInt(req.query.limit));
            return new JsonRespone(apiConstant.DEFAULT_STATUS_CODE,apiConstant.DEFAULT_MSG,data)
        }catch (e) {
            return new JsonRespone(500,apiConstant.DEFAULT_MSG,e.toString());
        }
    }
}