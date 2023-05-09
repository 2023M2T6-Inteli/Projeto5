function errorHandlingMiddleware(error, req, res, next) {
    if (error.type === "conflict") return res.status(409).send(error.message);

    if (error.type === "unauthorized")
        return res.status(401).send(error.message);

    if (error.type === "not found") return res.status(404).send(error.message);

    return res.sendStatus(500);
}

module.exports = errorHandlingMiddleware;
