import userModel from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Stripe from 'stripe';
import dotenv from 'dotenv';
dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const registerUser = async (req, res) => {
    try{
        const {name, email, password} = req.body;
        if (!name || !email || !password) {
            return res.json ({
                success: false, message: 'Please fill all the fields'
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        const userData = {
            name,
            email,
            password: hashPassword
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)

        res.json({success: true, token, user:{name : user.name} })
    }
    catch(error){
        console.log(error);
        res.json({success: false, message: error.message})
    }
}


const loginUser = async (req, res) => {
    try{
        const {email, password} = req.body;
        const user = await userModel.findOne({email})

        if (!user){
            return res.json({success: false, message: 'User does not exist'})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(isMatch){
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
            return res.json({success: true, token, user: {name: user.name}})
        } else{
            return res.json({success: false, message: 'Invalid Credentials'})
        }
    } 
    catch(error){
        console.log(error);
        res.json({success: false, message: error.message})
    }
}

    const userCredits = async (req, res) => {
        try{
            const userId = req.userId;
            const user = await userModel.findById(userId)
            if(!user){
                return res.json({success: false, message: 'User not found'})
            }
            res.json({success: true, credits: user.creditBalance, user: {name: user.name}})

        } catch(error){
            console.log(error.message)
            res.json({success: false, message: error.message})
        }
    }

export {registerUser, loginUser, userCredits};

// Payments
export const createCheckoutSession = async (req, res) => {
    try{
        const { planId } = req.body;
        // Basic plans mapping; adjust as needed
        const plans = {
            Basic: { price: 10, credits: 100 },
            Advanced: { price: 50, credits: 500 },
            Business: { price: 250, credits: 5000 }
        };
        const plan = plans[planId];
        if(!plan){
            return res.status(400).json({ success:false, message: 'Invalid plan' });
        }

        const session = await stripe.checkout.sessions.create({
            mode: 'payment',
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: { name: `${planId} Credits` },
                        unit_amount: plan.price * 100
                    },
                    quantity: 1
                }
            ],
            metadata: {
                userId: req.userId,
                credits: String(plan.credits)
            },
            success_url: `${process.env.CLIENT_URL}/result?status=success`,
            cancel_url: `${process.env.CLIENT_URL}/buy?status=cancelled`
        });

        res.json({ success:true, url: session.url });
    }catch(error){
        console.log(error);
        res.status(500).json({ success:false, message: error.message });
    }
}

export const stripeWebhook = async (req, res) => {
    try{
        const signature = req.headers['stripe-signature'];
        const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
        let event;
        try{
            event = stripe.webhooks.constructEvent(req.rawBody, signature, endpointSecret);
        }catch(err){
            return res.status(400).send(`Webhook Error: ${err.message}`);
        }

        if(event.type === 'checkout.session.completed'){
            const session = event.data.object;
            const credits = Number(session.metadata?.credits || 0);
            const userId = session.metadata?.userId;
            if(credits > 0 && userId){
                await userModel.findByIdAndUpdate(userId, { $inc: { creditBalance: credits } });
            }
        }
        res.json({ received: true });
    }catch(error){
        console.log(error);
        res.status(500).json({ success:false, message: error.message });
    }
}