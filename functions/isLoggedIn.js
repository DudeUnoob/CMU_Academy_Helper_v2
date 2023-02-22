

async function isLoggedIn (req, res, next) {
    req.session.auth_token != null ? next() : res.status(400).send("oops looks like your not logged in, <a href=/login>Login Here</a>" )
}

module.exports = isLoggedIn