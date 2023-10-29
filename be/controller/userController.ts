import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import User from "../models/User";
import { compare, hash } from "../utils/hashPassword";


export const login = async (req: Request<{}, {}, { email: string, password: string }>, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const record = await User.findOne({ email });

    if (!record || !(await compare(password, record.password))) {
        return res.status(400).json({ success: false, message: 'Invalid Creadentials' });
    }

    // generate a token and send to client
    const token = jwt.sign({ _id: record._id, email }, process.env.JWT_SECRET!, {
        expiresIn: 60 * 60,
    });

    return res.status(200).json({ success: true, message: 'Login Successful', token })
}

export const signup = async (req: Request<{}, {}, { name: string, email: string, password: string }>, res: Response) => {
    const { name, email, password } = req.body
    const exists = await User.findOne({ email });
    if (exists) {
        return res.status(409).json({ success: false, message: "Email Already Exits.Please use other." })
    }
    const hashPassword = await hash(password);
    const record = new User({ name, email, password: hashPassword });

    await record.save();

    return res.status(200).json({ success: true, message: 'User Regestered Successfuly' })
};

export const logOut = (req: Request, res: Response) => {
    res.clearCookie("token");
    res.json({
        message: "Signout success",
    });
};

interface IAuthRequest extends Request {
    profile: any;
}
export const authMiddleware = async (req: IAuthRequest, res: Response, next: NextFunction) => {
    const authorizationHeader = req.headers['authorization'];

    if (authorizationHeader) {
        // The 'Authorization' header typically contains the token in the format "Bearer <token>"
        const token = authorizationHeader.split(' ')[1]; // Extract the token part
        console.log('token', token)
        jwt.verify(token, process.env.JWT_SECRET!, async (err: any, data: any) => {
            if (err) return res.status(403).json({ sucess: false, message: 'No vaid token found' });
            const user = await User.findById(data._id);
            console.log('user', user)
            req.profile = user;
            next();
        });

    }
    res.status(403).json({ sucess: false, message: 'No vaid token found' });
};