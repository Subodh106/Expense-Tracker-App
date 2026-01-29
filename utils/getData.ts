import axios from "axios"

const getData = async()=>{
    try{
        const response:any = await axios.get("/api/get-todo")
        return response;
    }catch(error:any){
        console.log("Error during get data:",error.message)
    }
}

export default getData