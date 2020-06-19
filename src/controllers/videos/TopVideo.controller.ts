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
        program_id: Array<any>;
        corner_id: Array<any>;
    };
}
@Controller(prefixConstant.EPISODE)
export default class TopVideoController {
    @Get(apiPath.GET_LIST_EPISODE)
    public async index(req: IEpisodeDetailRequest, res: Response) {
        console.log(req.query);
        try {
            let sort: number = req.query.sort === 'asc' ? 1 : -1;
            let programId : any = null;
            if(req.query.program_id !== undefined){
                programId = req.query.program_id.map(function(item) {
                    return parseInt(item);
                });
            };
            let cornerId : any = null;
            if(req.query.corner_id !== undefined){
                cornerId = req.query.corner_id.map(function(item) {
                    return parseInt(item);
                });
            };
            let getDataFunc: any;
            let countDataFunc: any;
            let objc: any = {
                episode_play_type: 3,
                program_id: programId !== null ? {$in:programId}: null,
                corner_id: cornerId != null ?  {$in:cornerId}: null,
            };
            let filterOption: any = {};
            Object.keys(objc).forEach(function(key) {
                if (objc[key] !== null)
                    filterOption[key] = objc[key];
            });
            console.log(filterOption);
                getDataFunc = episodeModel.find(filterOption).sort({_id: sort}).limit(parseInt(req.query.limit));
                countDataFunc = episodeModel.count(filterOption);
            let data: object = await getDataFunc;
            let count: number = await  countDataFunc;
            return new JsonRespone('',apiConstant.DEFAULT_STATUS_CODE,count,0,parseInt(req.query.limit),data)
        }catch (e) {
            return new JsonRespone('',500,null,null,null,{})
        }
    }
}