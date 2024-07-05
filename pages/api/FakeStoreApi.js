import axios from "axios"
import { connectMongoDB } from "../../lib/mongodb"
import Products from '../../model/fakeStore/Products'
import Carts from '../../model/fakeStore/Carts'
import { NextResponse } from "next/server"



export default async function handler(req,res){
    const isEmptyFilter = (filter) => {
        return Object.keys(filter).length === 0;
    };
    switch(req.method){
        case 'GET' :
            try{
                const {func ,id ,page , perpage , filter} = req.query
                // เรียกดูตาม Category
                if(func == 'category'){
                    let getData = '';
                        await connectMongoDB()

                        if(filter && !isEmptyFilter(JSON.parse(filter))){
                            getData = await Products.find(JSON.parse(filter)).skip(perpage * (page - 1)).limit(perpage)
                        }else{
                            getData = await Products.find({}).skip(perpage * (page - 1)).limit(perpage)
                        }

                    console.log(getData);
                    res.status(200).json({getData})

                }
                else if(func == 'firstProduct'){
                    await connectMongoDB()
                    let getData = await Products.find({'_id' : id})
                    console.log(getData);
                    res.status(200).json(getData)
                }
                else if(func == 'getReview'){ // from api dummy 
                    let urlReviews = `https://dummyjson.com/products`;
                    const response = await axios.get(urlReviews)
                    console.log(response.data)
                    res.status(200).json(response.data)
                } 

                else if(func == 'topFive'){ // topFive Product
                    let getData = await Products.find({}).limit(10)
                    res.status(200).json(getData)
                } 

                else if(func == 'getCartByUser'){ // topFive Product
                    await connectMongoDB()
                    const {user_id} = req.query
                    let dataCarts = await Carts.find({'userId' : parseInt(user_id)})
                    let dataAll = await Products.find({})
                    res.status(200).json({responseCarts : dataCarts ,responseAll :dataAll})
                } 

                else if(func == 'typeShipping'){ // ประเภทการส่ง
                    const typeShipping = [
                        "ส่งฟรี" , "ส่งด่วน"
                    ]
                    console.log(typeShipping);
                    return res.status(200).json(typeShipping)
                }

                else if(func == 'OrderBy'){ // จัดเรียงตาม
                    const OrderBy = [
                        {
                            name  : 'เกี่ยวข้อง',
                            txtEng : 'about'
                        },
                        {
                            name  : 'ล่าสุด',
                            txtEng : 'latest'
                        },
                        {
                            name  : 'สินค้าขายดี',
                            txtEng : 'bestSeller'
                        },
                        {
                            name  : 'ราคา : น้อยไปมาก',
                            txtEng : 'sortMintoMax'
                        },
                        {
                            name  : 'ราคา : มากไปน้อย',
                            txtEng : 'sortMaxtoMin'
                        }
                    ]
                    return res.status(200).json(OrderBy)
                }

                else if(func == 'ListCategory'){ // จัดเรียงตาม
                    const OrderBy = [
                        "electronics",
                        "jewelery",
                        "men's clothing",
                        "women's clothing"
                    ]
                    return res.status(200).json(OrderBy)
                }

                else if (func == 'getPage'){
                    await connectMongoDB()
                    let dataCount 
                    if(filter){
                        dataCount = await Products.find(JSON.parse(filter)).countDocuments({})
                    }else{
                        dataCount = await Products.countDocuments({})
                    }
                    res.status(200).json({count : dataCount})
                }

                else if (func == 'sortMintoMax'){
                    await connectMongoDB()
                   const getData = await Products.find({}).skip(perpage * (page - 1)).limit(perpage).sort({price : 1})
                   console.log(getData);
                    res.status(200).json({getData})
                }
                else if (func == 'sortMaxtoMin'){
                    await connectMongoDB()
                   const getData = await Products.find({}).skip(perpage * (page - 1)).limit(perpage).sort({price : -1})
                    res.status(200).json({getData})
                }

                else if (func == 'bestSeller'){
                    await connectMongoDB()
                   const getData = await Products.find({}).skip(perpage * (page - 1)).limit(perpage).sort({"rating.count" : -1})
                    res.status(200).json({getData})
                }

                else if (func == 'latest'){
                    await connectMongoDB()
                   const getData = await Products.find({}).skip(perpage * (page - 1)).limit(perpage).sort({id : -1})
                    res.status(200).json({getData})
                }

            }catch(error){
                console.log(error);
            }

        break;

        case 'POST' : 
             try{
                const {func,id} = await req.query
                if(func == 'addProduct'){
                    const data = req.body
                   await connectMongoDB()
                   await Products.create(data)
                   return res.status(200).json({data : data ,message : 'success' , status : 200})
                // return NextResponse.json({ message: "Post created"}, { status: 201 })
                }
                else if(func == 'addToCart'){

                    const newCart = {
                        productId: id,
                        quantity: 1
                      };
                    await connectMongoDB()
                    await Carts.updateOne(
                        { userId: 2 }, // Filter to find the correct cart
                        { $push: { products: newCart } } // Update operation
                      )
                   return res.status(200).json({data : newCart ,message : 'success' , status : 200})

                }

            }catch(error){
                console.log(error);
            }

        case 'PUT' :
            try{
                const {func , id} = await req.query
                const {title,price,description,category,image,typeShipping,shippngrate} = await req.body.formData
                if(func == 'updateProduct'){
                    await connectMongoDB()
                    await Products.updateOne(
                        {
                            _id : id
                        },
                        {
                            $set : {
                                title : title,
                                price : price,
                                description : description,
                                category : category,
                                image : image,
                                typeShipping:typeShipping,
                                shippngrate : shippngrate
                            }
                        }
                    )

                    return res.status(200).json({message : 'update Sucessfully'})
                }
                //
            }catch(error){
                console.log(error);
            }
        break;

        case 'DELETE' : 
            try {
                const {func , id} = await req.query
                if(func == 'DeleteProduct'){
                   await connectMongoDB()
                   await Products.deleteOne({_id : id})
                   let data = await Products.find({})
                   return res.status(200).json({message : 'delete successfully' , data : data})
                }
                else if(func == 'DeleteProductFromCart'){

                    const newCart = {
                        productId: id,
                        quantity: 1
                      };
                    await connectMongoDB()
                    await Carts.updateOne(
                        { userId: 2 }, // Filter to find the correct cart
                        { $pull: { products: newCart } } // Update operation
                      )
                   return res.status(200).json({data : newCart ,message : 'success' , status : 200})

                }

            }catch(error){
                console.log(error);
            }

        default:
            res.setHeader('Allow', ['GET','POST']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
        
}


