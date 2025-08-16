import userModel from '../models/userModel.js';
import axios from 'axios';
import FormData from 'form-data';

export const generateImage = async (req, res) => {
    try{
        const { prompt } = req.body;
        const userId = req.userId;
        const user = await userModel.findById(userId);

        if(!user || !prompt){
            return res.json({ success:false, message: 'Missing Details'})
        }

        if(!Number.isFinite(user.creditBalance) || user.creditBalance <= 0){
            return res.status(402).json({ success:false, message: 'No Credit Balance', creditBalance: user.creditBalance })
        }
        
        const formData = new FormData();
        formData.append('prompt', prompt);

        const { data } = await axios.post(
            'https://clipdrop-api.co/text-to-image/v1',
            formData,
            {
                headers: {
                    'x-api-key': process.env.CLIPDROP_API,
                    ...formData.getHeaders?.()
                },
                responseType: 'arraybuffer'
            }
        );

        const base64Image = Buffer.from(data, 'binary').toString('base64');
        const resultImage = `data:image/png;base64,${base64Image}`;
        const updated = await userModel.findByIdAndUpdate(
            user._id,
            { $inc: { creditBalance: -1 } },
            { new: true }
        );
        res.json({ success: true, message: 'Image Generated', creditBalance: updated.creditBalance, resultImage });

    } catch(error){
        console.log(error.message)
        res.json({success:false, message: error.message})
    }
}