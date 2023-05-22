import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

export const protect = asyncHandler(async (req, res, next) => {
	let token

	token = req.cookies.mernAuth

	if(token){
		try{
			const decoded = jwt.verify(token, process.env.JWT_SECRET)

			req.user = await User.findById(decoded.userId).select('-password')

			next()
		}catch(err){
			console.error(err)
			res.status(401)
			throw new Error('Not authorized, token failed')
		}
	}else{
		res.status(401);
    throw new Error('Not authorized, no token')
	}
})