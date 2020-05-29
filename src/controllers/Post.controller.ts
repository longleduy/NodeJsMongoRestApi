import { Request, Response } from "express";
import { Controller } from "../configs/decorators/Controller.decorator";
import { Get } from "../configs/decorators/Get.decorator";
import JsonRespone from '../models/Respone.model';
import {apiConstant,prefixConstant,endpointConstant} from '../constants/index';
import {postModel} from '../models/Post.model';
import {subPostModel} from '../models/SubPost.model';
@Controller(prefixConstant.POST_PREFIX)
export default class PostController {
    @Get(endpointConstant.GET_ALL_POST)
    public async index(req: Request, res: Response) {
        try {
            let data: object = await postModel.find({});
            return new JsonRespone(apiConstant.DEFAULT_STATUS_CODE,apiConstant.DEFAULT_MSG,data)
        }catch (e) {
            return new JsonRespone(500,apiConstant.DEFAULT_MSG,e.toString());
        }
    }
    @Get(endpointConstant.GET_ALL_SUB_POST)
    public async subPost(req: Request, res: Response) {
        try {
            let data: object = await subPostModel.find({});
            return new JsonRespone(apiConstant.DEFAULT_STATUS_CODE,apiConstant.DEFAULT_MSG,data)
        }catch (e) {
            return new JsonRespone(500,apiConstant.DEFAULT_MSG,e.toString());
        }
    }
}