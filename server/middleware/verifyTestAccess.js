import prisma from "../prisma.js";

export const verifyTestAccess = async (req, res, next) => {
  try {
    const { testId } = req.params;
    const userId = req.user.id;

    // Check if user is assigned to this test
    const access = await prisma.userTest.findFirst({
      where: { testId: Number(testId), userId: Number(userId) },
    });

    if (!access) {
      return res.status(403).json({ error: "Access denied! You are not invited to this test." });
    }

    next();
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
