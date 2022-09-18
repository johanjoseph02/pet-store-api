import { NextFunction, Request, Response, Router } from 'express';

import firestoreClient from "../../loaders/database";
import Logger from "../../loaders/logger";

const newuserRoute = Router();

newuserRoute.post(
    '/',
    async(req: Request, res: Response, next: NextFunction): Promise<void> => {
        try
        {
            if(
                !req.body.petname ||
                !req.body.owner ||
                !req.body.petage ||
                !req.body.pettype ||
                !req.body.petgen
            ) throw( "!!! Enter all fields !!!" );

            const petid = (req.body.petname).slice(0,-1)+(req.body.owner).slice(0,-1)+(req.body.petgen).slice(0,-1);
            const reqDoc = firestoreClient.collection("petDetails").doc(petid);
            let petDetail = await reqDoc.get();

            if((petDetail.data).length != 0)
            {
                throw '>> Pet already exists <<';
            }

            await firestoreClient
                .collection("petDetails")
                .doc(petid)
                .create(
                    {
                        id: petid,
                        petname: req.body.petname,
                        owner: req.body.owner,
                        petage: req.body.petage,
                        pettype: req.body.pettype,
                        petgen: req.body.petgen,
                    }
                );
            
            res
                .status(200)
                .send(
                    {
                        status: "success",
                        message: "✅ Entry added successfully"
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

export default newuserRoute;