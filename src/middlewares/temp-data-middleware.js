export const tempData = (req, res, next) => {

    res.setError = (message) => {
        req.session.error = {
            message,
            isFirstReq: true,
        }
    }

    if (!req.session.error) {
        return next();
    }

    if (req.session.error.isFirstReq) {
        req.session.error.isFirstReq = false;
        res.locals.errMessage = req.session.error.message;
    } else {
        req.session.error = null;
    }

    next();
}