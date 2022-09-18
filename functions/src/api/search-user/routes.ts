import { NextFunction, Request, Response, Router } from 'express';

import firestoreClient from "../../loaders/database";
import Logger from "../../loaders/logger";

const searchuserRoute = Router();

searchuserRoute.post(
    '/:petid',
    async(req: Request, res: Response, next: NextFunction): Promise<void> => {
        try
        {
            if(!req.params.petid) 
                throw( "!!! Enter Pet ID !!!" );

            const reqDoc = firestoreClient.collection("petDetails").doc(req.params.petid);
            let petDetail = await reqDoc.get();
            let searchResult = petDetail.data();
            
            res
                .status(200)
                .send(
                    {
                        status: "success",
                        message: searchResult
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

export default searchuserRoute;