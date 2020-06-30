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
        episode_id: string;
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
            let limit = parseInt(req.query.limit);
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
                episode_play_type: (() => {
                    let type: any = null;
                    switch (req.query.mode) {
                        case 'new':
                            type =  3;
                            break;
                        default:
                            type = null;
                    }
                    return type;
                })(),
                program_id: programId !== null ? {$in:programId}: null,
                corner_id: cornerId != null ?  {$in:cornerId}: null,
            };
            let filterOption: any = {};
            Object.keys(objc).forEach(function(key) {
                if (objc[key] !== null)
                    filterOption[key] = objc[key];
            });
            if(req.query.mode === 'lup'){
                limit = 999;
               await this.setFilterOptionInfo(filterOption,req.query.episode_id);
            }
            getDataFunc = episodeModel.find(filterOption).sort({broadcast_date: sort,broadcast_time:sort}).limit(limit);
            countDataFunc = episodeModel.count(filterOption);
            let data: object = await getDataFunc;
            let count: number = await  countDataFunc;
            return new JsonRespone('',apiConstant.DEFAULT_STATUS_CODE,count,0,limit,data)
        }catch (e) {
            console.log(e);
            return new JsonRespone('',500,null,null,null,{})
        }
    }
    private async setFilterOptionInfo(filterOption: any, episodeId: string): Promise<void>{
            let data: any = await  episodeModel.findOne({episode_id: parseInt(episodeId)});
            if(data){
                let {program_id,broadcast_date} = data._doc as {program_id: number,broadcast_date: string};
                filterOption.program_id = program_id;
                filterOption.broadcast_date = broadcast_date;
                filterOption.episode_id = {$ne:parseInt(episodeId)};
            }
    }
}