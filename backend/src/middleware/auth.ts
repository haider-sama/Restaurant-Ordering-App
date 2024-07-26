import { auth } from "express-oauth2-jwt-bearer";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user";

declare global {
  namespace Express {
    interface Request {
      userId: string;
      auth0Id: string;
    }
  }
}

// Middleware to check JWT validity
export const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  tokenSigningAlg: "RS256",
});

// Middleware to parse and validate JWT
export const jwtParse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = authorization.split(" ")[1];

  try {
    // Decode token
    const decoded = jwt.decode(token) as jwt.JwtPayload;

    if (!decoded || !decoded.sub) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    const auth0Id = decoded.sub;

    // Verify token (if necessary)
    // Optionally verify token signature and expiration here

    // Fetch user from database
    const user = await User.findOne({ auth0Id });

    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    // Attach user details to request object
    req.auth0Id = auth0Id;
    req.userId = user._id.toString();
    next();
  } catch (error) {
    console.error("JWT Parsing Error:", error);
    return res.status(401).json({ message: "Unauthorized: Token parsing error" });
  }
};
