import Product from "../models/product.model.js";

export const addImg = async (req, res, next) => {
    console.log(req.file);
    if (!req.files || !Object.keys(req.files).length) {
        res.json({ status: 400, msg: "photo can't be recover" });
    }

    await req.files.image.mv(`public/images/${req.files.image.name}`, (err) => {
        console.log("ça passe", `/public/images/${req.files.image.name}`);

        if (err) {
            res.json({
                status: 500,
                msg: "photo can't be saved",
            });
        }
    });
    res.json({
        status: 200,
        msg: `it's good for UR pict' ${req.files.image.name} !!`,
        url: req.files.image.name,
    })
};

export const addProduct = async (req, res, next) => {
    console.log(req.body)
    const product = {
        title: req.body.title,
        description: req.body.description,
        img: req.body.img,
        id_category: req.body.id_category,
    };
    const query =
        "INSERT INTO `product`(`title`, `description`, `img_name`, `creation_date`, `updated_date`, `id_category`) VALUES (?,?,?,NOW(),NOW(),? )";
    try {
        await Product.saveData(query, product);
        res.json({
            status: 201,
            msg: "Product added to the database !",
        });
    } catch (error) {
        console.log(error);
        res.json({
            status: 404,
            msg: "problem with database or insertion",
        });
    }
};

export const findAllProduct = async (req,res,next) => {
    
    const query = 'SELECT product.id AS id_product, category.id AS id_category, product.title AS title_product, category.title AS title_category, description, img_name, creation_date, updated_date FROM product JOIN category ON product.id_category = category.id';
    try {
        const [result] = await Product.getDatas(query);
        res.json({
            status: 200,
            datas: result,
            msg: "Products retrieved !",
        });
    } catch (error) {
        console.log(error);
        res.json({
            status: 404,
            msg: "problem with database or insertion",
        });
    }
}

export const findOneProduct = async (req,res,next) => {
    console.log('first')
    const param = req.params.id;
    const query = 'SELECT product.id AS id_product, category.id AS id_category, category.title AS title_category, description, img_name, creation_date, updated_date FROM product JOIN category ON product.id_category = category.id WHERE product.id = ?';
    try {
        const [result] = await Product.getDataByValue(query, param);
        res.json({
            status: 200,
            datas: result,
            msg: "Product retrieved !",
        });
    } catch (error) {
        console.log(error);
        res.json({
            status: 404,
            msg: "problem with database or insertion",
        });
    }
}

export const findCategoriesName = async (req, res, next) => {
    const query = 'SELECT id, title from category';
    try {
        const [result] = await Product.getDatas(query);
        res.json({
            status: 200,
            msg: "categories name retrieved",
            result: result
        })
    } catch (error) {
        console.log(error);
        res.json({
            status: 404,
            msg: "problem with database or insertion",
        });
    }
}

export const updateProduct = async (req,res,next) =>{
    const id = req.params.id;
    let product = {};
    for (const key in req.body) {
        product[key] = req.body[key];
        // title: voiture
    }
    product = {...product, id: id};
    const query = `UPDATE product SET ${(typeof product.title !== 'undefined' ? 'title = ?,' : '' )}${(typeof product.description !== 'undefined' ? 'description = ?,' : '' )}${(typeof product.img !== 'undefined' ? 'img_name = ?,' : '' )} updated_date = NOW(), id_category = ? WHERE id = ?`;
    try {
        await Product.updateDatas(query, product);
        res.json({
            status: 200,
            msg: "Product updated !",
        });
    } catch (error) {
        console.log(error);
        res.json({
            status: 404,
            msg: "problem with database or insertion",
        });
    }
}

export const deleteProduct = async (req, res, next)  => {
    console.log('first')
    const id = req.params.id;
    const query1 = 'SELECT title from product WHERE id = ?';
    const query2 = 'DELETE FROM product WHERE id = ?';
    try {
        const [result] = await Product.getDataByValue(query1, id);
        console.log(result);
        if(result.length) {
            await Product.deleteDatas(query2, id);           
            res.json({
                status: 200,
                msg: "Product deleted !",
            });
        } else {
            res.json({
                status: 404,
                msg: "This product does not exist :'( !",
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            status: 404,
            msg: "problem with database or insertion",
        });
    }
}

