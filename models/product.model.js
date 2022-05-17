import pool from '../config/database/db.js';

class Product {

    static async saveData(query, data){
        const result = await pool.execute(query, [...Object.values(data)]);
        return result;
    }

    static async getDatas(query){
        const result = await pool.execute(query)
        return result;
    }
   
    static async getDataByValue(query, val){
        const result = await pool.execute(query, [val])
        return result;
    }

    static async updateDatas(query, val){
        const result = await pool.execute(query, [...Object.values(val)])
        return result;
    }

    static async deleteDatas(query, val){
        const result = await pool.execute(query, [val])
        return result;
    }



}

export default Product;