const z = require("zod");

const signupBody = z.object({

    username: z.string().email(),
    password: z.string(),
    firstName: z.string(),
    lastName: z.string()

})

const signinBody = z.object({

    username: z.string().email(),
    password: z.string()

})

const updateBody = z.object({

    firstName: z.string().optional(),
    lastName: z.string().optional(),
    password: z.string().optional()

});

module.exports = {
    signupBody,
    signinBody,
    updateBody
}