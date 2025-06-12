import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"
import userModel from '../models/userModel.js';
import sendMail from '../config/nodemailer.js';


export const register = async (req, res) => {
    const {name, email, password} =req.body;

    if(!name  || !email || !password)
        return res.json({success: false, message : 'Missing Details'})
    try {
        const existingUser = await userModel.findOne({email})

        if(existingUser) {
            return res.json({success: false, message : 'User already exists'})
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = new userModel ({name, email, password: hashedPassword})
        await user.save();

        const token =  jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'})
        res.cookie ('token', token, {
            httpOnly : true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        //Sending Welcome email
        await sendMail(
            email,
            'Bienvenue sur notre site',
            `Bonjour ${name}, bienvenue ! Merci pour votre inscription.`
          );   
        
        return res.json({success: true})

    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const login = async (req, res) => {
    const {email, password} =req.body;
    if(!email || !password) {
        return res.json({success: false, message : 'Email and password are required'})
    }
    try {
        const user = await userModel.findOne({email})

        if (!user) {
            return res.json({success: false, message : 'Invalid email'})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch) {
            return res.json({success: false, message : 'Invalid password'})
        }

        const token =  jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'})
        
        res.cookie ('token', token, {
            httpOnly : true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        return res.json({success: true})

    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const logout = async (req, res) => {

    try {
        res.clearCookie('token',{
            httpOnly : true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict'
        })
        return res.json({success: true, message: 'Logged Out'})

    } catch (error) {
        res.json({success: false, message: error.message})
    }
}


export const sendverifyOtp = async (req, res) => {
    try {
        /* const {userId} = req.body*/
        const user = await userModel.findById(req.userId)
        if (!user) {
            return res.json({ success: false, message: 'Utilisateur introuvable' });
          }
        if(user.isAccountVerified){
            return res.json({success: false, message: 'Account Already verified'}) 
        }
        const otp = String(Math.floor(100000 + Math.random() * 900000))
        user.verifyOpt = otp
        user.verifyOptExpiredAt = Date.now() + 24 * 60 * 60 * 1000;
        console.log('OTP:', otp);
        console.log('OTP Expired At:', user.verifyOptExpiredAt);

        await user.save();

        //Sending Welcome email
        await sendMail(
            user.email,
            'Account Verification OTP',
            `Your OTP is  ${otp}. Verify your account using this OTP`,
            otp
          );
          res.json({success: true, message: 'VErification OTP sent on Email '})

        
    } catch (error) {
        res.json({success: false, message: error.message})
        
    }
}


//verify the amail using the OTP 
export const verifyEmail = async (req, res) => {
  try {
     const { otp } = req.body;
    const userId = req.userId;

    // Check if the required fields are provided
    if (!userId || !otp) {
      return res.json({ success: false, message: 'User ID et OTP sont requis' });
    }

    // Find the user by ID
    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "Utilisateur introuvable" });
    }

    // Check if an OTP has been generated for this user
    if (!user.verifyOpt || !user.verifyOptExpiredAt) {
      return res.json({ success: false, message: "Aucun OTP n'a été généré" });
    }

    // Check if the OTP has expired
    const now = Date.now();
    if (user.verifyOptExpiredAt < now) {
      return res.json({ success: false, message: "OTP expiré. Demandez un nouveau code." });
    }

    // Vérifier si l'OTP correspond
    if (user.verifyOpt !== otp) {
      return res.json({ success: false, message: "OTP incorrect" });
    }

    // All checks passed: validate the account
    user.isAccountVerified = true;
    user.verifyOpt = '';
    user.verifyOptExpiredAt = 0;
    console.log('OTP:', otp);
    console.log('OTP Expired At:', user.verifyOptExpiredAt);


    await user.save();

    return res.json({ success: true, message: "Compte vérifié avec succès" });
  

  } catch (error) {
    
    return res.json({ success: false, message: error.message });
  }
};


//check if user authenticated
export const isAuthenticated = async ( req, res) => {
    try {
            return res.json({ success: true });

    } catch (error) {
            return res.json({ success: false, message: error.message });
    }

}

export const sendResetOtp = async (req, res) => {
    const {email} = req.body;
    if(!email) {
        return res.json({success: false, message: 'Email is required'})
    }
    try {
        const user = await userModel.findOne({email})
        if(!user){
            return res.json({success: false, message: 'User not found'})
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000))
        user.resetOtp = otp
        user.resetOtpExpiredAt = Date.now() + 15 * 60 * 1000;
        
        console.log('OTP:', otp);
        console.log('OTP Expired At:', user.resetOtpExpiredAt);

        await user.save();

        //Sending Welcome email
        await sendMail(
            user.email,
            'Password Reset OTP',
            `Your OTP for resetting your passwword is ${otp}. Use this OTP to proceed with resetting your password`,
            otp
          );
          return res.json({success: true, message: 'OTP sent to your email'})

    } catch (error) {
        return res.json({success: false, message: error.message})
    }

}

//Reset User Password

export const resetPassword = async (req, res) => {
    const {email, otp, newPassword} = req.body;
    if(!email || !otp || !newPassword){
        return res.json({ success:  false, message: 'Email, OTP, and new passsword are required'})
    }
    try {
        const user = await userModel.findOne({email})

        if(!user) {
            return res.json({success: false, message: 'User not found'})
        }
        if(user.resetOtp === ''|| user.resetOtp !== otp){
            return res.json({success: false, message: 'User not found'})
        }
        if(user.resetOtpExpiredAt < Date.now()){
            return res.json({success: false, message: 'OTP Expired'})
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;
        user.reset = '';
        user.resetOtpExpiredAt = 0

        await user.save();
        return res.json({ success: true, message: 'Mot de passe modifié avec succès' });

    } catch (error) {
                return res.json({success: false, message: error.message})
    }
}