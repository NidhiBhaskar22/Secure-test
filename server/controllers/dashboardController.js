import prisma from '../prisma.js';


export const getAdminDashboardData = async (req, res) => {
  try {
    // Total tests created
    const totalTests = await prisma.test.count();

    // Total users
    const totalUsers = await prisma.user.count();

    // Tests assigned to users
    const testsAssigned = await prisma.userTest.findMany({
      include: {
        test: {
          select: {
            Title: true
          }
        },
        user: {
          select: {
            FirstName: true,
            LastName: true
          }
        }
      }
    });

    // Aggregate data for tests per user
    const testsPerUser = await prisma.userTest.groupBy({
      by: ['userId'],
      _count: {
        testId: true
      },
      where: {
        user: {
          Role: 'USER'
        }
      },
    });

    // Fetch user details for aggregated data
    const userDetails = await prisma.user.findMany({
      where: {
        UserID: {
          in: testsPerUser.map((userTest) => userTest.userId),
        },
      },
      select: {
        UserID: true,
        FirstName: true,
        LastName: true,
      },
    });

    // Map user details to aggregated data
    const testsPerUserWithDetails = testsPerUser.map((userTest) => {
      const user = userDetails.find((user) => user.UserID === userTest.userId);
      return {
        ...userTest,
        user,
      };
    });

    // Aggregate data for users per test
    const usersPerTest = await prisma.userTest.groupBy({
      by: ['testId'],
      _count: {
        userId: true
      },
    });

    // Fetch test details for aggregated data
    const testDetails = await prisma.test.findMany({
      where: {
        TestID: {
          in: usersPerTest.map((userTest) => userTest.testId),
        },
      },
      select: {
        TestID: true,
        Title: true,
      },
    });

    // Map test details to aggregated data
    const usersPerTestWithDetails = usersPerTest.map((userTest) => {
      const test = testDetails.find((test) => test.TestID === userTest.testId);
      return {
        ...userTest,
        test,
      };
    });

    // User activity data
    const userActivity = await prisma.session.findMany({
      include: {
        user: {
          select: {
            FirstName: true,
            LastName: true,
          },
        },
      },
    });

    // Proctoring data
    const proctoringData = await prisma.warning.findMany({
      include: {
        warningSessions: {
          include: {
            session: {
              include: {
                user: {
                  select: {
                    FirstName: true,
                    LastName: true,
                  },
                },
                test: {
                  select: {
                    Title: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    // Session details
    const sessionDetails = await prisma.session.findMany({
      include: {
        user: {
          select: {
            FirstName: true,
            LastName: true,
          },
        },
        test: {
          select: {
            Title: true,
          },
        },
      },
    });

    res.status(200).json({
      totalTests,
      totalUsers,
      testsAssigned,
      testsPerUser: testsPerUserWithDetails,
      usersPerTest: usersPerTestWithDetails,
      userActivity,
      proctoringData,
      sessionDetails,
    });
  } catch (error) {
    console.error('Error fetching admin dashboard data:', error);
    res.status(500).json({ error: 'Failed to fetch admin dashboard data' });
  }
};

export const getUserDashboardData = async (req, res) => {
  try {
    const userId = req.user.UserID;

    // Assigned tests
    const assignedTests = await prisma.userTest.findMany({
      where: { userId },
      include: {
        test: {
          select: {
            Title: true,
            Description: true,
            Duration: true,
            TotalMarks: true,
          },
        },
      },
    });

    // Upcoming tests (assuming future tests have a startDate)
    const upcomingTests = await prisma.test.findMany({
      where: {
        Sessions: {
          some: {
            userId,
            startTime: {
              gt: new Date(),
            },
          },
        },
      },
      select: {
        Title: true,
        Description: true,
        Duration: true,
        TotalMarks: true,
      },
    });

    // Test attempts
    const testAttempts = await prisma.session.findMany({
      where: { userId },
      include: {
        test: {
          select: {
            Title: true,
          },
        },
      },
    });

    // Proctoring warnings
    const proctoringWarnings = await prisma.warningSessions.findMany({
      where: { session: { userId } },
      include: {
        warning: {
          select: {
            warningType: true,
          },
        },
        session: {
          select: {
            test: {
              select: {
                Title: true,
              },
            },
          },
        },
      },
    });

    // Session details
    const sessionDetails = await prisma.session.findMany({
      where: { userId },
      include: {
        test: {
          select: {
            Title: true,
          },
        },
      },
    });

    res.status(200).json({
      assignedTests,
      upcomingTests,
      testAttempts,
      proctoringWarnings,
      sessionDetails,
    });
  } catch (error) {
    console.error('Error fetching user dashboard data:', error);
    res.status(500).json({ error: 'Failed to fetch user dashboard data' });
  }
};