const express=require('express');
const productRouter=require('./routes/product');
const userRouter=require('./routes/user');
const root=require('./routes/root')

const app=express();
app.use(express.json());

app.use('/api/product',productRouter);
app.use('/api/user',userRouter);
app.use(root);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});