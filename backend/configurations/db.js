const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = prisma; // ✅ Exporting prisma instance
