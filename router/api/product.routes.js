import express from 'express';
import { addProduct, addImg, findAllProduct, findOneProduct, findCategoriesName, updateProduct, deleteProduct } from '../../controllers/product.controller.js';
const router = express.Router();

//CREATE
// add one product
router.post('/add', addProduct); // http://localhost:9000/api/v1/product/add
router.post('/addImg', addImg);

// READ
// get all products
router.get('/', findAllProduct);
router.get('/categories', findCategoriesName);
// // get one product by param
router.get('/:id', findOneProduct);

// // UPDATE
// // update one product completly
router.put('/:id', updateProduct);
// // OR
// // update some field to one product 
router.patch('/:id', updateProduct);

// // DELETE
router.delete('/:id', deleteProduct);

export default router;