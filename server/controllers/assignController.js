import prisma from "../prisma.js";
import { sendInviteEmail } from "../utils/testMail.js";


/**
*  Assign a User to a Test and send Invite
* Endpoint: POST /assign
*/
export const assignTest =  async (req, res) => {
  const { userId, testId } = req.body;

  // Ensure userId and testId are valid
  if (!userId || !testId || isNaN(userId) || isNaN(testId)) {
    return res.status(400).json({ error: "Invalid userId or testId" });
  }

  try {
    // ✅ Check if test exists
    const test = await prisma.test.findUnique({
      where: { TestID: Number(testId) },
    });
    if (!test) return res.status(404).json({ error: "Test not found" });

    // ✅ Prevent duplicate assignment
    const existingAssignment = await prisma.userTest.findFirst({
      where: { userId: Number(userId), testId: Number(testId) },
    });

    if (existingAssignment) {
      return res
        .status(400)
        .json({ error: "User is already assigned to this test" });
    }

    // ✅ Assign user to test
    const assignment = await prisma.userTest.create({
      data: {
        userId: Number(userId),
        testId: Number(testId),
        assignedAt: new Date(),
      },
    });

    // ✅ Fetch user details for email
    const user = await prisma.user.findUnique({
      where: { UserID: Number(userId) },
      select: { Email: true, FirstName: true },
    });

    if (!user) return res.status(404).json({ error: "User not found" });

    console.log(
      `✅ User ${user.FirstName} (${user.Email}) assigned. Sending invite...`
    );

    // ✅ Generate invite link
    const inviteLink = `http://localhost:5173/test/${testId}/user/${userId}`;

    // ✅ Send Email
    await sendInviteEmail(user.Email, inviteLink);

    res.status(201).json({
      message: `User assigned & invite sent to ${user.Email}`,
      assignment,
    });
  } catch (error) {
    console.error("❌ Error assigning user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}


export const getAllUsersOfATest = async (req, res) => {
  try {
    const testId = parseInt(req.params.testId);
    if (isNaN(testId)) return res.status(400).json({ error: "Invalid test ID" });
 
    // Check if test exists
    const test = await prisma.test.findUnique({ where: { TestID: testId } });
    if (!test) return res.status(404).json({ error: "Test not found" });
 
    // Get all assigned users
    const assignedUsers = await prisma.userTest.findMany({
      where: { testId },
      include: {
        user: {
          select: { UserID: true, FirstName: true, LastName: true, Email: true },
        },
      },
    });
 
    res.json({ testId, assignedUsers });
  } catch (error) {
    console.error("Error fetching assigned users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};