import mongoose from "mongoose"

export const To_objectid = (id)=>{
    try
    {
     let parcedId = mongoose.Types.ObjectId(id)
     return parcedId
    }
    catch(err)
    {
    console.log(err)
    return null
    }
}