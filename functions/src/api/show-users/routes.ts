import { NextFunction, Request, Response, Router } from 'express';

import firestoreClient from "../../loaders/database";
import Logger from "../../loaders/logger";

const showusersRoute = Router();

showusersRoute.post(
    '/',
    async(req: Request, res: Response, next: NextFunction): Promise<void> => {
        try
        {

            const query = firestoreClient.collection("petDetails");
            let searchResult = [];

            await query.get().then( (data) => {
                let docs = data.docs;

                docs.map((doc) => {
                    const selectedData = {
                        petname: doc.data().petname,
                        owner: doc.data().owner,
                        petage: doc.data().petage,
                        pettype: doc.data().pettype,
                        petgen: doc.data().petgen
                    };

                    searchResult.push(selectedData);
                });

                return searchResult;
            });
            
            res
                .status(200)
                .send(
                    {
                        status: "success",
                        data: searchResult
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

export default showusersRoute;