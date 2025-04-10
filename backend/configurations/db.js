const { PrismaClient } = require("@prisma/client");

const prisma=new PrismaClient({
    log:["error","query"]
})

module.exports={prisma}