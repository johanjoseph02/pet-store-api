import { NextFunction, Request, Response, Router } from 'express';

import firestoreClient from "../../loaders/database";
import Logger from "../../loaders/logger";

const updateuserRoute = Router();

updateuserRoute.post(
    '/:petid',
    async(req: Request, res: Response, next: NextFunction): Promise<void> => {
        try
        {
            if(!req.params.petid) 
                throw( "!!! Enter Pet ID !!!" );

            const reqDoc = firestoreClient.collection("petDetails").doc(req.params.petid);
            let petDetail = await reqDoc.get();
            if((petDetail.data).length == 0)
            {
                throw '>> User does not exist <<';
            }

            await reqDoc.update({
                petname: req.body.petname,
                owner: req.body.owner,
                petage: req.body.petage,
                pettype: req.body.pettype,
                petgen: req.body.petgen,
            })
            
            res
                .status(200)
                .send(
                    {
                        status: "success",
                        message: "Data updated"
                    }
                );

            next();
        }
        catch (error)
        {
            console.log(error);
            Logger.warn(error);
            res
                .status(500)
                .send(
                    {
                        status: "failure",
                        message: error
                    }
                );
        }
    }
);

export default updateuserRoute;