const {response, require}= require("express")
const {PagoModel}= require("../models")

const getPago = async (req= require, res= response)=>{

    await res.status(200).send("hola")

}

const postPago = async (req= require, res= response)=>{

    const{} = req.body
    await 
    
    
    res.status(200).send("hola")

}



modules.export={
    getPago,
    postPago
}
