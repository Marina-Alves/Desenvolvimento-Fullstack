import { Router } from "express";

const peopleRoute = Router();

peopleRoute.get('/people', (req, res) => {
	res.send('ok');
});

export default peopleRoute;