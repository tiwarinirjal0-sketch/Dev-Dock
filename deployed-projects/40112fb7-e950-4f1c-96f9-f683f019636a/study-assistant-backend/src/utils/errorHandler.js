export const errorHandler = (err, req, res, next) => {
    console.log(err.message)
    return res.status(err.statusCode || 500).json({
        success: false,
        message : err.message || "Internal server error",
        stack : err.stack || "Crashed somewhere go and fig out"
    })
}