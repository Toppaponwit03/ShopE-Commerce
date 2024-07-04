import mongoose , { Schema } from "mongoose"
const { ObjectId } = Schema.Types;
const postschema = new Schema(
    {
        user_id : String,
        date : Date,
        products : [
            {
                productId : ObjectId,
                quantity : String
            }
        ]
    }

)

const Carts = mongoose.models.carts || mongoose.model("carts",postschema)


export default Carts

