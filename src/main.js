import app from "./app/index.js";

const PORT = 8000;

app.listen(PORT,()=>{
    console.log(`server sudah jalan di http://localhost:${PORT}`);
});
