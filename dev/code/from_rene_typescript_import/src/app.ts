import express, { Application, Request, Response, NextFunction }from 'express';

const app: Application = express();
const add = (a: number, b: number): number => a+b;

app.get('/', (req: Request, res: Response, next: NextFunction) => {
	console.log(add(15,5))
	res.send('hello')
});

const port = 5000;
app.listen(port, () =>console.log(`⚡ Server is running here 👉 : ${port}`));