import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../../common/error-handler";
import { authService } from "./auth.service";

export const checkToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer ")) {
        next(new UnauthorizedError("Unauthorized"));
        return;
    }

    const token = req.headers.authorization.split(" ")[1];
    
    if (!token) {
        next(new UnauthorizedError("Unauthorized"));
        return;
    }

    // res['locals'].accountId = await authService.getInformation(token);
    res.setHeader('access-token', token);
}