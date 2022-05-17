import express from 'express';
import productRoutes from './api/product.routes.js';

import mail from '../lib/mailing.js';

const router = express.Router();

router.use('/api/v1/product', productRoutes);

router.get("/api/v1/sendMail", (req,res,next) => {
    mail("kynocc@gmail.com", "Bienvenue", "Salut toi", "On te souhaite la bienvenue chez nous, prends un bonbon et laisse toi faire :x");
    res.json({msg: 'mail envoyé'});
});

export default router;