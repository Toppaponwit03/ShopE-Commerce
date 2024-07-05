import mongoose , { Schema } from "mongoose"

const postschema = new Schema(
    {
        title : String,
        price : Number,
        description : String,
        category: String,
        image: String,
        category : String,
        typeShipping : String,
        shippngrate:String
    },
    {
        timestamps : true
    }
)

const products = mongoose.models.products || mongoose.model("products",postschema)


export default products

