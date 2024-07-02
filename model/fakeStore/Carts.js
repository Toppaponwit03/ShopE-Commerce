import mongoose , { Schema } from "mongoose"

const postschema = new Schema(
    {
        user_id : String,
        date : Date,
        products : [
            {
                productId : String,
                quantity : String
            }
        ]
    }

)

const Carts = mongoose.models.carts || mongoose.model("carts",postschema)


export default Carts

