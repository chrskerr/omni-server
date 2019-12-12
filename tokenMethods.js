class token {
    getToken(args) {
    return output = {
        token: md5(`${args.licence}${args.prop}`), // cant be this, too easy to link the token back to licence, will do for now
        message: 'success'
    }
}
}